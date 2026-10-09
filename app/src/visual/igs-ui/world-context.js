// 生图写词的世界背景：世界观选项 + 世界设定提要。提要存在当前角色卡的素材里（和世界观同一处），
// 用户可在「场景 → 规则」里改；空着时由这里从角色卡场景栏和世界书常驻（蓝灯）条目提炼。
import { draftAssetLibrary, draftEffectiveAssets } from '../../scene/asset-scope.js';
import { worldContextOf } from '../../scene/worldview.js';
import { pickWorldText, readSourceMaterial } from '../../host/character-sources.js';

async function summarizeWorld({ assets, service, globalObj, material }) {
    if (!service || typeof service.summarizeWorldSetting !== 'function') return { ok: false, error: '当前不能提炼世界设定' };
    const sourcesText = pickWorldText(material || await readSourceMaterial(globalObj));
    if (!sourcesText) return { ok: false, error: '角色卡的场景栏和世界书的常驻条目里都没有内容' };
    const written = await service.summarizeWorldSetting({ label: worldContextOf(assets).label, sourcesText });
    if (!written || !written.ok) return { ok: false, error: (written && written.error) || '提炼失败' };
    if (written.insufficient || !written.summary) return { ok: false, error: '资料里看不出这个世界的设定' };
    return { ok: true, summary: written.summary };
}

// 返回 { ok, summary } 或 { ok: false, error }；成功时已写进草稿，由调用方决定何时保存。
export async function extractWorldSummary({ settingsState, service, globalObj, material = null }) {
    const extracted = await summarizeWorld({ assets: draftEffectiveAssets(settingsState), service, globalObj, material });
    if (extracted.ok) draftAssetLibrary(settingsState, null).worldSummary = extracted.summary;
    return extracted;
}

// 写词前调用：已有提要直接用；没有就试着提炼一次，交给 save(summary) 保存。提炼不了只带世界观，不挡生成。
// assets 是当前合并后的素材库。返回 { world, note, tone }：note 是要提示用户的一句话（空串就不提示），tone 为 info 时是好消息。
export async function prepareWorld({ assets, service, globalObj, material = null, onProgress, save }) {
    const world = worldContextOf(assets);
    if (world.summary || !service || typeof service.summarizeWorldSetting !== 'function') return { world, note: '', tone: '' };
    const source = material || await readSourceMaterial(globalObj);
    if (!pickWorldText(source)) return { world, note: '', tone: '' };
    if (typeof onProgress === 'function') onProgress({ phase: 'world' });
    const extracted = await summarizeWorld({ assets, service, globalObj, material: source });
    if (!extracted.ok) return { world, note: `没能提炼世界设定提要（${extracted.error}），这次只按世界观「${world.label}」写。`, tone: '' };
    if (typeof save === 'function') save(extracted.summary);
    return { world: { ...world, summary: extracted.summary }, note: '已提炼世界设定提要，写立绘和服装时会参考；可在「场景 → 规则」里查看和修改。', tone: 'info' };
}

// 设置页用：提炼出的提要写进草稿（当前角色卡那一边），再 persist。
export async function prepareWorldContext({ settingsState, service, globalObj, material = null, onProgress, persist }) {
    return prepareWorld({
        assets: draftEffectiveAssets(settingsState),
        service,
        globalObj,
        material,
        onProgress,
        save: (summary) => {
            draftAssetLibrary(settingsState, null).worldSummary = summary;
            if (typeof persist === 'function') persist();
        },
    });
}
