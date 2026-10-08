// 由副 LLM 从资料节选里提炼两种短文：角色的「性格与表情习惯」（存进角色 DNA，表情差分写词用）
// 和故事的「世界设定提要」（存在这张卡的素材里，立绘、服装、表情差分写词用）。
import { FICTION_FRAME, SOFT_MODE_NOTE, requestWithSoftRetry } from './prompt-kit.js';
import { LLM_SETUP_HINT, describeLlmReady } from './caption-writer.js';

export const PERSONA_MAX_LENGTH = 400;
const INSUFFICIENT = '资料不足';

const PERSONA_RULES = [
    '你读一个角色的资料，为立绘表情差分提炼这个角色的「性格与表情习惯」。',
    '只写性格、气质，以及情绪外露的程度和方式：高兴、生气、委屈、害羞、难过时脸上和肢体通常是什么样；再写这个角色不会做的表情（例如不会噘嘴撒娇、不会放声大笑）。',
    '不写外貌、服装、身世和剧情；资料里没提到的不要编。资料里有多个角色时，只写指定的那一个。',
    `用中文写 3 到 6 句，总共不超过 200 字。资料不足以判断这个角色的性格时，只输出：${INSUFFICIENT}`,
    '只输出正文，不要标题、不要解释、不要代码块。',
];

const WORLD_RULES = [
    '你读一个故事的世界设定资料，为生图提炼一段「世界设定提要」，画立绘、服装和场景时参考。',
    '只写画面用得上的：时代与地域、科技或魔法水平、社会阶层，服装与发型的风格、常见材质与配色、常见饰品和随身物品；再写这个世界里不该出现的东西（例如现代衣物、电子产品）。',
    '不写剧情、人物关系和具体角色；资料里没提到的不要编。',
    `用中文写 3 到 6 句，总共不超过 250 字。资料不足以判断时，只输出：${INSUFFICIENT}`,
    '只输出正文，不要标题、不要解释、不要代码块。',
];

export const PERSONA_WRITER_SYSTEM = [...FICTION_FRAME, ...PERSONA_RULES].join('\n');
const PERSONA_WRITER_SOFT_SYSTEM = [...FICTION_FRAME, ...PERSONA_RULES, ...SOFT_MODE_NOTE].join('\n');
export const WORLD_WRITER_SYSTEM = [...FICTION_FRAME, ...WORLD_RULES].join('\n');
const WORLD_WRITER_SOFT_SYSTEM = [...FICTION_FRAME, ...WORLD_RULES, ...SOFT_MODE_NOTE].join('\n');

export function buildPersonaUserPrompt(name, sourcesText) {
    return `要提炼的角色：${String(name || '').trim()}\n\n资料：\n${String(sourcesText || '').trim()}`;
}

export function buildWorldSummaryUserPrompt(label, sourcesText) {
    return `IGS 里选的世界观：${String(label || '').trim() || '未选'}\n\n资料：\n${String(sourcesText || '').trim()}`;
}

export function parsePersonaReply(text) {
    const body = String(text || '').replace(/```[a-z]*\n?|```/gi, '').trim();
    if (!body) return { ok: false };
    if (body.length <= 20 && body.includes(INSUFFICIENT)) return { ok: true, insufficient: true, persona: '' };
    const persona = body.length > PERSONA_MAX_LENGTH ? `${body.slice(0, PERSONA_MAX_LENGTH)}…` : body;
    return { ok: true, insufficient: false, persona };
}

// 返回 { ok, persona, insufficient } 或 { ok: false, error }；世界设定提要也用 persona 字段带回正文。
async function writeShortText(llm, llmSettings, { sourcesText, system, softSystem, user, what }) {
    const ready = describeLlmReady(llmSettings);
    if (!ready.ok) return { ok: false, error: ready.error };
    if (!llm || typeof llm.request !== 'function') return { ok: false, error: `副 LLM 不可用：${LLM_SETUP_HINT}` };
    if (!String(sourcesText || '').trim()) return { ok: false, error: '没有找到可用的资料' };
    const result = await requestWithSoftRetry(llm, { system, softSystem, user, parse: parsePersonaReply }, llmSettings);
    if (!result.ok) return { ok: false, error: `副 LLM 提炼${what}失败：${result.error}` };
    return { ok: true, persona: result.persona, insufficient: result.insufficient };
}

export function writeCharacterPersona(llm, llmSettings, { name, sourcesText } = {}) {
    return writeShortText(llm, llmSettings, {
        sourcesText,
        system: PERSONA_WRITER_SYSTEM,
        softSystem: PERSONA_WRITER_SOFT_SYSTEM,
        user: buildPersonaUserPrompt(name, sourcesText),
        what: '性格',
    });
}

export async function writeWorldSummary(llm, llmSettings, { label, sourcesText } = {}) {
    const written = await writeShortText(llm, llmSettings, {
        sourcesText,
        system: WORLD_WRITER_SYSTEM,
        softSystem: WORLD_WRITER_SOFT_SYSTEM,
        user: buildWorldSummaryUserPrompt(label, sourcesText),
        what: '世界设定',
    });
    return written.ok ? { ok: true, summary: written.persona, insufficient: written.insufficient } : written;
}
