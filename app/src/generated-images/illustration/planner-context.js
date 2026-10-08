// 副 LLM 规划（剧情 CG、楼内补背景 / 立绘）读多少上下文：「副 LLM → 读取上下文」。
// standard：原来的长度——本楼正文前 6000 字；前文是最近 contextFloors 层 AI 楼合起来的末尾 1500 字。
// 其余档按 token 估算成字数（中日文约 1 字 1 token，留三成余量）：本楼正文整层读，
// 前文从近到远尽量多读，连用户发言一起（用户常在发言里交代地点和打算），读满预算为止。
import { numberParagraphs } from './marker-placer.js';

export const CONTEXT_BUDGETS = Object.freeze({ standard: 0, '32k': 32000, '128k': 128000, '500k': 500000, '1000k': 1000000 });
export const STANDARD_FLOOR_CHARS = 6000;
export const STANDARD_PREVIOUS_CHARS = 1500;
const CHARS_PER_TOKEN = 0.7;
// 读得多，副 LLM 回得慢：加大预算时请求超时至少放到 10 分钟（比设置里能填的 5 分钟上限还长）。
export const LARGE_CONTEXT_TIMEOUT_MS = 600000;

export function contextBudgetChars(llm) {
    const tokens = CONTEXT_BUDGETS[llm && llm.contextBudget] || 0;
    return Math.floor(tokens * CHARS_PER_TOKEN);
}

export function plannerLlmSettings(llm) {
    if (!contextBudgetChars(llm)) return llm;
    return { ...llm, timeoutMs: Math.max(Number(llm.timeoutMs) || 0, LARGE_CONTEXT_TIMEOUT_MS) };
}

export function readableText(raw) {
    return numberParagraphs(raw).paragraphs.map((p) => p.text).join('\n');
}

const stripHtml = (text) => String(text || '').replace(/<[^>]*>/g, ' ').replace(/[ \t]+\n/g, '\n').trim();

// 前文消息：宿主有 readPreviousMessages 就连用户发言一起读，没有就只读 AI 楼。旧的在前。
function previousMessages(messageHost, messageId, count) {
    if (typeof messageHost.readPreviousMessages === 'function') {
        return (messageHost.readPreviousMessages(messageId, count) || []).map((msg) => (msg && msg.isUser
            ? `（用户）${stripHtml(msg.text)}`
            : readableText(msg && msg.text)));
    }
    if (typeof messageHost.readPreviousAiTexts === 'function') return (messageHost.readPreviousAiTexts(messageId, count) || []).map(readableText);
    return [];
}

// 返回 { budget, floorChars, previousText }：floorChars 是本楼正文最多读几个字。
// reserved：同一份提示词里另外带的资料（设定资料等）占掉的字数，前文相应少读。
// 设置页写词没有「本楼」：messageId 传 Infinity，从最新一条往前读。
export function readPlannerContext(messageHost, messageId, llm, floorLength = 0, reserved = 0) {
    const budget = contextBudgetChars(llm);
    if (!budget) {
        const floors = llm.contextFloors > 0 && typeof messageHost.readPreviousAiTexts === 'function'
            ? (messageHost.readPreviousAiTexts(messageId, llm.contextFloors) || []).map(readableText) : [];
        return { budget, floorChars: STANDARD_FLOOR_CHARS, previousText: floors.join('\n').slice(-STANDARD_PREVIOUS_CHARS) };
    }
    // 本楼最多占一半；资料节选另外加，所以前文只用到预算的九成。
    const floorChars = Math.floor(budget / 2);
    let left = Math.floor(budget * 0.9) - Math.min(floorLength, floorChars) - Math.max(0, reserved);
    const kept = [];
    const messages = previousMessages(messageHost, messageId, Number.MAX_SAFE_INTEGER);
    for (let i = messages.length - 1; i >= 0 && left > 0; i -= 1) {
        const text = String(messages[i] || '').trim();
        if (!text) continue;
        const piece = text.length > left ? text.slice(-left) : text;
        kept.unshift(piece);
        left -= piece.length + 1;
    }
    return { budget, floorChars, previousText: kept.join('\n') };
}
