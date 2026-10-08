// 表情差分提炼「性格与表情习惯」用的原始资料：当前角色卡、角色卡与当前聊天绑定的世界书、数据库表格。
// 只读；按主名和别名筛，限长。哪一处读不到就跳过并记在 notes 里，不影响其余来源。
import { getSillyTavernContext, getTavernHelper } from './tavern-helper-adapter.js';
import { createShujukuClient } from '../data/shujuku/client.js';
import { parseTables } from '../data/shujuku/table-parser.js';

export const CHARACTER_SOURCE_LIMITS = Object.freeze({ card: 3000, worldbook: 4000, entry: 1500, database: 1500 });

const clip = (text, max) => {
    const value = String(text || '').trim();
    return value.length > max ? `${value.slice(0, max)}…` : value;
};
const mentions = (text, names) => names.some((name) => String(text || '').includes(name));

function nameList(name, aliases) {
    return [...new Set([name, ...(Array.isArray(aliases) ? aliases : [])].map((item) => String(item || '').trim()).filter(Boolean))];
}

// 卡名就是这个角色时描述、性格整段保留；多角色卡只留提到他的段落（按空行分段）。
export function pickCardText(card, names, limit = CHARACTER_SOURCE_LIMITS.card) {
    if (!card || typeof card !== 'object') return '';
    const data = card.data && typeof card.data === 'object' ? card.data : {};
    const own = names.includes(String(card.name || data.name || '').trim());
    const parts = [];
    for (const [label, raw] of [['描述', card.description ?? data.description], ['性格', card.personality ?? data.personality]]) {
        const text = String(raw || '').trim();
        if (!text) continue;
        const kept = own ? text : text.split(/\n\s*\n/).filter((block) => mentions(block, names)).join('\n\n');
        if (kept) parts.push(`【角色卡·${label}】\n${kept}`);
    }
    return clip(parts.join('\n'), limit);
}

// 已启用、关键词或内容提到这个角色的条目；关键词命中的排前面。关键词可能是正则，按字面比较。
export function pickWorldbookText(books, names, limits = CHARACTER_SOURCE_LIMITS) {
    const picked = [];
    for (const { name: book, entries } of Array.isArray(books) ? books : []) {
        for (const entry of Array.isArray(entries) ? entries : []) {
            if (!entry || entry.enabled === false || !String(entry.content || '').trim()) continue;
            const keys = entry.strategy && Array.isArray(entry.strategy.keys) ? entry.strategy.keys.map((key) => String(key)) : [];
            const keyHit = keys.some((key) => names.some((name) => key.includes(name)));
            if (!keyHit && !mentions(entry.content, names)) continue;
            picked.push({ keyHit, text: `【世界书·${book}·${entry.name || '条目'}】\n${clip(entry.content, limits.entry)}` });
        }
    }
    picked.sort((a, b) => Number(b.keyHit) - Number(a.keyHit));
    const out = [];
    let used = 0;
    for (const item of picked) {
        if (used + item.text.length > limits.worldbook) break;
        out.push(item.text);
        used += item.text.length;
    }
    return out.join('\n');
}

// 有一格正好是这个角色名字的行，按「列名：值」整行写出。
export function pickDatabaseText(readResult, names, limit = CHARACTER_SOURCE_LIMITS.database) {
    if (!readResult || readResult.ok === false) return '';
    const lines = [];
    for (const table of parseTables(readResult.data)) {
        for (const row of table.rows) {
            if (!Array.isArray(row) || !row.some((cell) => names.includes(String(cell ?? '').trim()))) continue;
            const pairs = table.columns
                .map((column, index) => [String(column || '').trim(), String(row[index] ?? '').trim()])
                .filter(([column, value]) => column && value);
            if (pairs.length) lines.push(`【数据库·${table.name}】${pairs.map(([column, value]) => `${column}：${value}`).join('；')}`);
        }
    }
    return clip(lines.join('\n'), limit);
}

async function readWorldbooks(helper, notes) {
    const names = new Set();
    try {
        const own = helper.getCharWorldbookNames('current') || {};
        if (own.primary) names.add(own.primary);
        for (const extra of Array.isArray(own.additional) ? own.additional : []) if (extra) names.add(extra);
    } catch (error) {
        notes.push('角色卡绑定的世界书读不到');
    }
    try {
        const chat = typeof helper.getChatWorldbookName === 'function' ? helper.getChatWorldbookName('current') : null;
        if (chat) names.add(chat);
    } catch (error) {
        notes.push('聊天绑定的世界书读不到');
    }
    const books = [];
    for (const name of names) {
        try {
            books.push({ name, entries: await helper.getWorldbook(name) });
        } catch (error) {
            notes.push(`世界书「${name}」读不到`);
        }
    }
    return books;
}

export async function collectCharacterSources(globalObject, { name, aliases = [], limits = CHARACTER_SOURCE_LIMITS } = {}) {
    const names = nameList(name, aliases);
    const notes = [];
    if (!names.length) return { card: '', worldbook: '', database: '', notes };
    const ctx = getSillyTavernContext(globalObject);
    const card = ctx && ctx.characters && ctx.characterId != null ? ctx.characters[ctx.characterId] : null;
    if (!card) notes.push('当前没有打开单人角色卡');
    const helper = getTavernHelper(globalObject);
    let worldbook = '';
    if (helper && typeof helper.getWorldbook === 'function' && typeof helper.getCharWorldbookNames === 'function') {
        worldbook = pickWorldbookText(await readWorldbooks(helper, notes), names, limits);
    } else {
        notes.push('没有找到酒馆助手的世界书接口');
    }
    const api = globalObject && (globalObject.AutoCardUpdaterAPI || (globalObject.top && globalObject.top.AutoCardUpdaterAPI));
    const database = api ? pickDatabaseText(createShujukuClient(api).readTables(), names, limits.database) : '';
    return { card: pickCardText(card, names, limits.card), worldbook, database, notes };
}

export function formatCharacterSources(sources) {
    const value = sources && typeof sources === 'object' ? sources : {};
    return [value.card, value.worldbook, value.database].map((part) => String(part || '').trim()).filter(Boolean).join('\n\n');
}
