import { extractSceneDirectives, classifySceneKey, resolveCharacterKey } from '../../scene/scene-directives.js';
import { resolveBackgroundAsset, resolveNudeSpriteAsset, resolveSpriteAsset, isNonSpriteSpeaker } from '../../scene/asset-match.js';
import { OUTFIT_RESET, createOutfitResolver, outfitsOfCharacter, resolveSpriteOutfit } from '../../scene/character-outfits.js';
import { resolveCharacterDna } from '../../scene/character-dna.js';
import { fuzzyResolveMoodGroup, resolveMoodGroup } from '../../scene/mood-groups.js';
import { isSystemRole } from './system-role.js';

function pushUrl(urls, seen, url) {
    const source = String(url || '').trim();
    if (!source || seen.has(source)) return;
    seen.add(source);
    urls.push(source);
}

function sceneBefore(directives, offset, inheritedScene) {
    let scene = inheritedScene && inheritedScene.scene ? String(inheritedScene.scene) : '';
    let nsfw = Boolean(inheritedScene && inheritedScene.nsfw);
    for (const directive of directives) {
        if (directive.type !== 'scene') continue;
        if (Number.isFinite(offset) && Number(directive.offset) > offset) break;
        scene = String(directive.scene || scene);
        nsfw = directive.nsfw === true;
    }
    return { scene, nsfw };
}

// 逐条读台词 / 心理指令（要按原文顺序调用）：这句是谁、什么表情、当时穿哪套（'' 为原装）、场景是不是 NSFW。
// 旁白、系统角色返回 null。服装栏写了还没登记的服装时带上 pendingOutfit：显示照旧，补表情时要按这套新服装画，不能当成原来那套。
function spriteUseReader({ directives, sceneAssets, inheritedOutfits, inheritedScene, systemRole, readClues }) {
    const outfitMap = sceneAssets.characterOutfits;
    const hasOutfits = Boolean(outfitMap && Object.keys(outfitMap).length);
    const outfitFor = (character, offset) => {
        if (!hasOutfits) return '';
        const sceneRaw = sceneBefore(directives, offset, inheritedScene).scene;
        return resolveSpriteOutfit({
            directives,
            character,
            offset: Number.isFinite(offset) ? offset : Number.NaN,
            inheritedOutfits,
            sceneAssets,
            scene: [classifySceneKey(sceneAssets.scenes, sceneRaw).key || '', sceneRaw],
            readClues: typeof readClues === 'function' ? readClues : () => null,
            resolveDna: (name) => {
                const hit = resolveCharacterDna(sceneAssets.characterDna, name);
                return hit ? hit.dna : null;
            },
        }).outfit;
    };
    const pending = new Map();
    return (directive) => {
        if (!directive || (directive.type !== 'char' && directive.type !== 'thought')) return null;
        const name = String(directive.character || '').trim();
        if (!name || isNonSpriteSpeaker(name) || isSystemRole(name, systemRole)) return null;
        const key = resolveCharacterKey(sceneAssets.characters, sceneAssets.characterAliases, name) || name;
        if (directive.unknownOutfit) pending.set(key, directive.unknownOutfit);
        else if (directive.outfit) pending.delete(key);
        const offset = Number(directive.offset);
        return {
            name,
            mood: String(directive.mood || '').trim(),
            outfit: outfitFor(name, offset),
            nsfw: sceneBefore(directives, offset, inheritedScene).nsfw,
            pendingOutfit: pending.get(key) || '',
        };
    };
}

// 这一楼会用到的立绘和背景。翻页前一次性取齐，不在轮到出场时才去读。
export function collectFloorAssetUrls({
    source = '',
    sceneAssets = null,
    inheritedOutfits = null,
    inheritedScene = null,
    assetMatchCtx = null,
    imageSlots = [],
    systemRole = null,
    readClues = null,
} = {}) {
    const urls = [];
    const seen = new Set();
    for (const slot of Array.isArray(imageSlots) ? imageSlots : []) {
        pushUrl(urls, seen, slot && slot.url);
    }
    if (!sceneAssets || !sceneAssets.enabled) return urls;
    const ctx = assetMatchCtx || { sceneAssets };
    const directives = extractSceneDirectives(String(source || ''), { outfitResolver: createOutfitResolver(sceneAssets) }).directives;
    const useOf = spriteUseReader({ directives, sceneAssets, inheritedOutfits, inheritedScene, systemRole, readClues });
    if (inheritedScene && inheritedScene.scene) {
        pushUrl(urls, seen, resolveBackgroundAsset(inheritedScene, ctx).url);
    }
    for (const directive of directives) {
        if (directive.type === 'scene' && directive.scene) {
            pushUrl(urls, seen, resolveBackgroundAsset(directive, ctx).url);
            continue;
        }
        const use = useOf(directive);
        if (!use) continue;
        pushUrl(urls, seen, resolveSpriteAsset(use.name, use.mood, ctx, use.outfit).url);
        if (use.nsfw) pushUrl(urls, seen, resolveNudeSpriteAsset(use.name, use.mood, ctx).url);
    }
    return urls;
}

// 「补全立绘与背景」给已登记角色补表情：本楼每句用到的「角色 + 当时那套服装（或原装）+ 表情」，
// 那一格（表情词本身，或它归入的情绪组）空着就记下；只记这一楼真用到的，按出场先后排。没登记的角色交给素材补全，不在这里。
// 服装栏写了这个角色还没建的服装（「白色泳装」「墨绿泳装-孕中期」）记成 create 组：先建这套再画，不拿原装或前半段那套顶替。
// 表情词归不进任何情绪组的列进 unmapped，不画。
export function collectMissingExpressions({
    source = '',
    sceneAssets = null,
    inheritedOutfits = null,
    inheritedScene = null,
    systemRole = null,
    readClues = null,
} = {}) {
    const result = { groups: [], unmapped: [] };
    if (!sceneAssets || !sceneAssets.enabled) return result;
    const characters = sceneAssets.characters || {};
    const directives = extractSceneDirectives(String(source || ''), { outfitResolver: createOutfitResolver(sceneAssets) }).directives;
    const useOf = spriteUseReader({ directives, sceneAssets, inheritedOutfits, inheritedScene, systemRole, readClues });
    const groups = new Map();
    const unmapped = new Set();
    for (const directive of directives) {
        const use = useOf(directive);
        if (!use || !use.mood) continue;
        const character = resolveCharacterKey(characters, sceneAssets.characterAliases, use.name);
        if (!character) continue;
        const create = Boolean(use.pendingOutfit);
        const outfit = create ? use.pendingOutfit : (use.outfit && use.outfit !== OUTFIT_RESET ? use.outfit : '');
        const entry = outfit && !create ? outfitsOfCharacter(sceneAssets.characterOutfits, sceneAssets.characterAliases, character).outfits[outfit] : null;
        if (outfit && !create && !entry) continue;
        const slots = create ? {} : outfit ? entry.moods || {} : characters[character] || {};
        if (String(slots[use.mood] || '').trim()) continue;
        const label = resolveMoodGroup(use.mood, sceneAssets.moodGroups)
            || (sceneAssets.moodFuzzyMatch === true ? fuzzyResolveMoodGroup(use.mood, sceneAssets.moodGroups) : null);
        if (!label) {
            if (!unmapped.has(use.mood)) result.unmapped.push({ character, mood: use.mood });
            unmapped.add(use.mood);
            continue;
        }
        // 「默认」是底图：原装那张本来就有，服装没有「默认」格（没对上的表情退回这一套的「平和」）。
        if (label === OUTFIT_RESET || String(slots[label] || '').trim()) continue;
        const id = `${character}\u0001${outfit}`;
        if (!groups.has(id)) groups.set(id, { character, outfit, ...(create && { create: true }), moods: [] });
        const group = groups.get(id);
        if (!group.moods.includes(label)) group.moods.push(label);
    }
    result.groups = Array.from(groups.values());
    return result;
}
