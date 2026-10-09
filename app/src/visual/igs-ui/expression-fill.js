// 表情差分的共用步骤：设置页「表情差分」和阅读器「补全立绘与背景」（给已登记角色补本楼用到的表情）都走这里。
// 这里只算画哪几格、怎么画，以及把结果记进一份素材库；写进草稿还是存档、写到本卡还是全局由调用方决定。
import { pendingExpressionCaptions } from './settings-outfit-fields.js';
import { collectCharacterSources, formatCharacterSources } from '../../host/character-sources.js';
import { generatedAssetIdOf, isGeneratedAssetUrl, normalizeGeneratedLibrary, setGeneratedExpressionNote } from '../../scene/asset-match.js';
import { normalizeCharacterDna, resolveCharacterDna } from '../../scene/character-dna.js';
import { isBuiltinNudeOutfit, resolveWardrobePrompt } from '../../scene/character-outfits.js';
import { resolveCharacterKey } from '../../scene/scene-directives.js';

export const characterAliasesOf = (sceneAssets, name) => (sceneAssets.characterAliases && Array.isArray(sceneAssets.characterAliases[name]) ? sceneAssets.characterAliases[name] : []);

export function characterExpressionDna(sceneAssets, name) {
    const hit = resolveCharacterDna(
        sceneAssets.characterDna,
        name,
        (raw) => resolveCharacterKey(sceneAssets.characters || {}, sceneAssets.characterAliases || {}, raw) || '',
    );
    return hit ? hit.dna : null;
}

// 「性格与表情习惯」：从角色卡 / 世界书 / 数据库收集提到这个角色的资料，交给副 LLM 提炼。
export async function extractCharacterPersona({ service, globalObj, sceneAssets, name }) {
    if (!service || typeof service.summarizeCharacterPersona !== 'function') return { ok: false, error: '当前不能提炼性格' };
    const sources = await collectCharacterSources(globalObj, { name, aliases: characterAliasesOf(sceneAssets, name) });
    const sourcesText = formatCharacterSources(sources);
    if (!sourcesText) {
        return { ok: false, error: `角色卡、世界书和数据库里都没找到「${name}」的资料${sources.notes.length ? `（${sources.notes.join('，')}）` : ''}` };
    }
    const written = await service.summarizeCharacterPersona({ name, sourcesText });
    if (!written || !written.ok) return { ok: false, error: (written && written.error) || '提炼失败' };
    if (written.insufficient) return { ok: false, error: `资料里看不出「${name}」的性格` };
    return { ok: true, persona: written.persona };
}

// 存进这个角色的 DNA（和 DNA 一起跟着角色走）；返回更新后的 DNA。
// 这一份素材库里还没有这个角色的 DNA 时以 base 为底（DNA 在另一边时别只剩一句性格，把那边的长相盖掉）。
export function saveCharacterPersona(sceneAssets, name, persona, base = null) {
    const map = sceneAssets.characterDna && typeof sceneAssets.characterDna === 'object' && !Array.isArray(sceneAssets.characterDna)
        ? sceneAssets.characterDna : (sceneAssets.characterDna = {});
    map[name] = normalizeCharacterDna({ ...normalizeCharacterDna(Object.hasOwn(map, name) ? map[name] : base), persona });
    return map[name];
}

// 进度条写明在画谁：写词和出图分开说，一批多张带上第几张。
export function expressionProgressText(who, event) {
    if (event && event.phase === 'write') return `写提示词：${who}`;
    if (event && event.phase === 'persona') return `提炼性格：${who}`;
    if (event && event.phase === 'world') return `提炼世界设定：${who}`;
    const total = Number(event && event.total) || 0;
    if (total > 1) return `生图中：${who}·${event.mood || ''} ${Number(event.done) || 0}/${total}`;
    return `生图中：${who}`;
}

export function expressionNoteKey(name, outfit) {
    return outfit ? `${name}\u0001${outfit}` : name;
}

export function firstGeneratedOutfitUrl(entry) {
    const base = String(entry && entry.base || '').trim();
    if (isGeneratedAssetUrl(base)) return base;
    const moods = entry && entry.moods && typeof entry.moods === 'object' ? entry.moods : {};
    for (const url of Object.values(moods)) {
        const text = String(url || '').trim();
        if (isGeneratedAssetUrl(text)) return text;
    }
    return '';
}

export function clearExpressionNote(library, key, mood) {
    if (!library.expressionNotes[key]) return library;
    const notes = { ...library.expressionNotes[key] };
    delete notes[mood];
    if (Object.keys(notes).length) library.expressionNotes[key] = notes;
    else delete library.expressionNotes[key];
    return library;
}

export function applyCharacterExpression(sceneAssets, name, item) {
    const characters = { ...(sceneAssets.characters || {}) };
    const current = { ...(characters[name] || {}) };
    let library = normalizeGeneratedLibrary(sceneAssets.generated);
    if (item && item.ok && item.imageId) {
        current[item.mood] = `igs-gen:${item.imageId}`;
        library = clearExpressionNote(library, name, item.mood);
    } else {
        // 停下没画的不建空槽，只把写好的词记在注记里，给「继续生图」用。
        if (!Object.prototype.hasOwnProperty.call(current, item.mood) && item.error !== '已停止') current[item.mood] = '';
        const noted = setGeneratedExpressionNote(library, name, item.mood, {
            positive: item && item.prompt ? item.prompt.positive : '',
            negative: item && item.prompt ? item.prompt.negative : '',
            error: (item && item.error) || '出图失败',
            caption: item && item.caption,
        });
        if (noted.ok) library = noted.library;
    }
    characters[name] = current;
    sceneAssets.characters = characters;
    sceneAssets.generated = library;
}

export function applyOutfitExpression(sceneAssets, name, outfitName, item) {
    const mood = item && item.mood;
    if (!mood || mood === '默认') return;
    const all = { ...(sceneAssets.characterOutfits || {}) };
    const outfits = { ...(all[name] || {}) };
    const entry = { ...(outfits[outfitName] || { words: [], moods: {} }) };
    const moods = { ...(entry.moods && typeof entry.moods === 'object' ? entry.moods : {}) };
    const noteKey = expressionNoteKey(name, outfitName);
    let library = normalizeGeneratedLibrary(sceneAssets.generated);
    if (item.ok && item.imageId) {
        moods[mood] = `igs-gen:${item.imageId}`;
        library = clearExpressionNote(library, noteKey, mood);
    } else {
        if (!Object.prototype.hasOwnProperty.call(moods, mood) && item.error !== '已停止') moods[mood] = '';
        const noted = setGeneratedExpressionNote(library, noteKey, mood, {
            positive: item && item.prompt ? item.prompt.positive : '',
            negative: item && item.prompt ? item.prompt.negative : '',
            error: (item && item.error) || '出图失败',
            caption: item && item.caption,
        });
        if (noted.ok) library = noted.library;
    }
    entry.moods = moods;
    outfits[outfitName] = entry;
    all[name] = outfits;
    sceneAssets.characterOutfits = all;
    sceneAssets.generated = library;
}

// 写表情时照着画的那张图的提示词：这套服装自己的第一张生成图，没有（或读不到词）就用原装「默认」那张。
export async function expressionBasePrompt(service, character, ownUrl = '') {
    const originUrl = String((character && character['默认']) || '');
    const read = async (url) => {
        const id = generatedAssetIdOf(url);
        if (!id) return null;
        try { return await service.getImagePrompt(id); } catch (error) { return null; }
    };
    const own = await read(ownUrl || originUrl);
    if (own || !ownUrl || generatedAssetIdOf(originUrl) === generatedAssetIdOf(ownUrl)) return own;
    return read(originUrl);
}

// 写表情时交代的这套服装：衣柜里的衣服提示词、词池词、是不是裸体、自己有没有图（没有就照原装换衣服）。原装返回 null。
export function expressionOutfitSpec(wardrobe, outfitName, outfitEntry, ownUrl = '') {
    if (!outfitName || !outfitEntry) return null;
    const nude = isBuiltinNudeOutfit(outfitEntry.wardrobe);
    const clothes = nude ? null : resolveWardrobePrompt(wardrobe || {}, outfitEntry, outfitName);
    return { name: outfitName, words: nude ? [] : outfitEntry.words, ownImage: Boolean(ownUrl), prompt: nude ? '' : (clothes ? clothes.prompt : ''), nude, nsfwBoost: Boolean(!nude && clothes && clothes.nsfwBoost) };
}

// 已有提示词的先补画，不重写；剩下没有词的再写再画。补画中途停下就不再写。
export async function paintThenWriteExpressions({ service, name, paintItems, writeLabels, basePrompt, dna, outfit, note, nsfw, world = null, onProgress, signal }) {
    const paint = paintItems.length && typeof service.paintExpressionCaptions === 'function'
        ? await service.paintExpressionCaptions({ name, items: paintItems, basePrompt, dna, outfit, nsfw, onProgress, signal })
        : null;
    if (paint && !paint.ok) return paint;
    if (paint && (paint.stopped || (signal && signal.aborted))) return paint;
    if (!writeLabels.length) return paint || { ok: true, items: [] };
    const written = await service.generateExpressionSet({ name, basePrompt, moods: writeLabels, dna, outfit, note, nsfw, world, onProgress, signal });
    if (!paint) return written;
    const paintedItems = paint.items || [];
    const wroteItems = written && written.items;
    const failedWrite = !written || !written.ok
        ? writeLabels.map((mood) => ({ mood, ok: false, error: (written && written.error) || '写提示词失败' }))
        : [];
    return {
        ok: Boolean(written && written.ok) || paintedItems.some((item) => item.ok),
        stopped: Boolean(written && written.stopped),
        items: paintedItems.concat(wroteItems || failedWrite),
        error: written && written.ok ? '' : (written && written.error),
    };
}

// 给一个角色的某套服装（outfitName 为空是原装）补指定的几格：已经有图的跳过；之前写好词没画出来的直接补画，其余要写词。
// 返回 { ok, paintItems, writeLabels, basePrompt, outfit }；要写词却没有带提示词的生成立绘时 ok 为 false。
export async function planExpressionGroup({ service, assets, name, outfitName = '', moods = [] }) {
    const character = (assets.characters || {})[name];
    const outfitEntry = outfitName ? ((assets.characterOutfits || {})[name] || {})[outfitName] : null;
    if (!character || (outfitName && !outfitEntry)) return { ok: false, reason: 'missing', error: '素材库里已经没有这个角色或这套服装' };
    const slots = outfitName ? (outfitEntry.moods || {}) : character;
    const labels = moods.filter((label) => label && label !== '默认' && !String(slots[label] || '').trim());
    const notes = normalizeGeneratedLibrary(assets.generated).expressionNotes[expressionNoteKey(name, outfitName)];
    const written = new Map(pendingExpressionCaptions(notes, slots).map((item) => [item.mood, item.caption]));
    const paintItems = labels.filter((label) => written.has(label)).map((label) => ({ mood: label, caption: written.get(label) }));
    const writeLabels = labels.filter((label) => !written.has(label));
    const ownUrl = outfitName ? firstGeneratedOutfitUrl(outfitEntry) : '';
    const basePrompt = await expressionBasePrompt(service, character, ownUrl);
    if (writeLabels.length && !basePrompt) return { ok: false, reason: 'no-base-prompt', error: '还没有带提示词的生成立绘（自己上传的图没有提示词，照着写不了表情）' };
    return { ok: true, paintItems, writeLabels, basePrompt, outfit: expressionOutfitSpec(assets.wardrobe, outfitName, outfitEntry, ownUrl) };
}

export const expressionGroupLabel = (group) => (group.outfit ? `${group.character}（${group.outfit}）` : group.character);

// 问用户之前逐组看一遍真能画的：照着写表情要有一张带提示词的生成立绘，自己上传的图没有，单独列出来。
export async function checkExpressionGroups({ groups, service, assets }) {
    const ready = [];
    const skipped = [];
    for (const group of groups) {
        const plan = await planExpressionGroup({ service, assets, name: group.character, outfitName: group.outfit, moods: group.moods });
        if (!plan.ok) skipped.push({ ...group, error: plan.error });
        else if (plan.paintItems.length || plan.writeLabels.length) ready.push(group);
    }
    return { ready, skipped };
}

export function expressionFillQuestion(groups) {
    const total = groups.reduce((sum, group) => sum + group.moods.length, 0);
    const lines = groups.map((group) => `${expressionGroupLabel(group)}：${group.moods.join('、')}`);
    return `本楼已登记的角色还有 ${total} 张表情没有图：\n${lines.join('\n')}\n要补上这几张吗？写词和设置里的「表情差分」一样，已有的图不动。`;
}

// 阅读器「补全立绘与背景」：一组一组补（一个角色的一套服装算一组），写词、出图和设置里的「表情差分」走同一条路：
// 还没有性格与表情习惯、世界设定提要的先提炼；「读取上下文」加大预算时附全部设定资料和正文原文（见素材服务 generateExpressionSet）。
// 每组画完立刻存，后面出错不丢前面画好的。
// readAssets()：当前合并后的素材库；save(field, name, mutator)：把改动写回这个角色那一项所在的一边（本卡或全局），返回是否存上；
// moodNoteOf(name)：设置里给这个角色记下的写表情注意事项；getWorld(onProgress)：世界背景，只在要写新词时才调。
export async function fillFloorExpressions({ groups, service, globalObj, readAssets, save, moodNoteOf = () => '', getWorld = async () => null, nsfw = false, onProgress }) {
    const outcome = { painted: 0, failed: [], skipped: [] };
    for (const group of groups) {
        const name = group.character;
        const outfitName = group.outfit || '';
        const report = (event) => { if (typeof onProgress === 'function') onProgress(group, event); };
        const assets = readAssets();
        const plan = await planExpressionGroup({ service, assets, name, outfitName, moods: group.moods });
        if (!plan.ok) {
            outcome.skipped.push({ ...group, error: plan.error });
            continue;
        }
        if (!plan.paintItems.length && !plan.writeLabels.length) continue;
        let dna = characterExpressionDna(assets, name);
        let world = null;
        if (plan.writeLabels.length) {
            // 提炼失败不挡生成，这次按默认写法写。
            if (!(dna && dna.persona)) {
                report({ phase: 'persona' });
                const extracted = await extractCharacterPersona({ service, globalObj, sceneAssets: assets, name });
                if (extracted.ok) {
                    const base = dna;
                    let saved = null;
                    save('characterDna', name, (bucket) => {
                        saved = saveCharacterPersona(bucket, name, extracted.persona, base);
                        return { ok: true };
                    });
                    dna = saved || normalizeCharacterDna({ ...normalizeCharacterDna(base), persona: extracted.persona });
                }
            }
            world = await getWorld(report);
        }
        let result;
        try {
            result = await paintThenWriteExpressions({
                service, name, paintItems: plan.paintItems, writeLabels: plan.writeLabels, basePrompt: plan.basePrompt,
                dna, outfit: plan.outfit, note: moodNoteOf(name), nsfw, world, onProgress: report,
            });
        } catch (error) {
            result = { ok: false, error: (error && error.message) || String(error || '') };
        }
        if (!result || !result.ok) {
            outcome.failed.push({ ...group, error: (result && result.error) || '未返回原因' });
            continue;
        }
        const items = (result.items || []).filter((item) => item && item.mood && item.error !== '已跳过');
        const stored = !items.length || save(outfitName ? 'characterOutfits' : 'characters', name, (bucket) => {
            for (const item of items) {
                if (outfitName) applyOutfitExpression(bucket, name, outfitName, item);
                else applyCharacterExpression(bucket, name, item);
            }
            return { ok: true };
        });
        if (!stored) {
            outcome.failed.push({ ...group, error: '画好了，但没能存进素材库' });
            continue;
        }
        const bad = items.filter((item) => !item.ok);
        outcome.painted += items.length - bad.length;
        if (bad.length) outcome.failed.push({ ...group, moods: bad.map((item) => item.mood), error: bad[0].error || '出图失败' });
    }
    return outcome;
}

// 补完之后给用户的一句话：补了几张、几张没画成、哪些补不了（为什么）。没什么可说的返回 null。
// outcome 为 null 表示这次没补（用户没点补，或没有能补的）。
export function expressionFillSummary({ outcome = null, skipped = [], unmapped = [], pendingOutfits = [] } = {}) {
    const parts = [];
    const painted = outcome ? outcome.painted : 0;
    const failed = outcome ? outcome.failed : [];
    const failedCount = failed.reduce((sum, item) => sum + item.moods.length, 0);
    if (painted) parts.push(`已登记角色补好 ${painted} 张表情`);
    if (failedCount) parts.push(`${failedCount} 张表情没画成：${failed[0].error}`);
    for (const item of skipped.concat(outcome ? outcome.skipped : [])) parts.push(`「${expressionGroupLabel(item)}」补不了表情：${item.error}`);
    for (const item of pendingOutfits) parts.push(`「${item.character}」的「${item.outfit}」还没建，先到「素材 → 待确认」里新建再补`);
    if (unmapped.length) parts.push(`表情词「${unmapped.slice(0, 3).map((item) => item.mood).join('、')}」${unmapped.length > 3 ? '等' : ''}还没归进情绪组，没补`);
    if (!parts.length) return null;
    // 除了「补好几张」之外还有话要说（没画成的、补不了的）就算提醒。
    const level = failedCount && !painted ? 'error' : parts.length > (painted ? 1 : 0) ? 'warn' : 'success';
    return { level, text: parts.join('；') };
}
