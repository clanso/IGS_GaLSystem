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

const CARD_FIELD_LABELS = Object.freeze({ description: '描述', personality: '性格', scenario: '场景' });

// 卡名就是这个角色时描述、性格整段保留；多角色卡只留提到他的段落（按空行分段）。
// fields 换成描述、场景栏时用来找地点：地点名不会是卡名，只留提到它的段落。
export function pickCardText(card, names, limit = CHARACTER_SOURCE_LIMITS.card, fields = ['description', 'personality']) {
    if (!card || typeof card !== 'object') return '';
    const data = card.data && typeof card.data === 'object' ? card.data : {};
    const own = names.includes(String(card.name || data.name || '').trim());
    const parts = [];
    for (const field of fields) {
        const label = CARD_FIELD_LABELS[field];
        const text = String(card[field] ?? data[field] ?? '').trim();
        if (!text) continue;
        const kept = own ? text : text.split(/\n\s*\n/).filter((block) => mentions(block, names)).join('\n\n');
        if (kept) parts.push(`【角色卡·${label}】\n${kept}`);
    }
    return clip(parts.join('\n'), limit);
}

// 已启用、关键词或内容提到这个角色的条目；关键词命中的排前面。关键词可能是正则，按字面比较。
// keyInName：关键词被名字包含也算命中（地点名常比关键词长：「金华酒店大堂」对上关键词「金华酒店」），单字关键词不算。
export function pickWorldbookText(books, names, limits = CHARACTER_SOURCE_LIMITS, { keyInName = false } = {}) {
    const picked = [];
    for (const { name: book, entries } of Array.isArray(books) ? books : []) {
        for (const entry of Array.isArray(entries) ? entries : []) {
            if (!entry || entry.enabled === false || !String(entry.content || '').trim()) continue;
            const keys = entry.strategy && Array.isArray(entry.strategy.keys) ? entry.strategy.keys.map((key) => String(key).trim()) : [];
            const keyHit = keys.some((key) => names.some((name) => key.includes(name) || (keyInName && key.length >= 2 && name.includes(key))));
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

// 角色卡、世界书、数据库一次读进来，再按名字挑：一层里补好几个角色立绘时不必每人重读世界书。
export async function readSourceMaterial(globalObject) {
    const notes = [];
    const ctx = getSillyTavernContext(globalObject);
    const card = ctx && ctx.characters && ctx.characterId != null ? ctx.characters[ctx.characterId] : null;
    if (!card) notes.push('当前没有打开单人角色卡');
    const helper = getTavernHelper(globalObject);
    let books = [];
    if (helper && typeof helper.getWorldbook === 'function' && typeof helper.getCharWorldbookNames === 'function') {
        books = await readWorldbooks(helper, notes);
    } else {
        notes.push('没有找到酒馆助手的世界书接口');
    }
    const api = globalObject && (globalObject.AutoCardUpdaterAPI || (globalObject.top && globalObject.top.AutoCardUpdaterAPI));
    const tables = api ? createShujukuClient(api).readTables() : null;
    return { card, books, tables, notes, chat: ctx && Array.isArray(ctx.chat) ? ctx.chat : [] };
}

export function pickCharacterSources(material, { name, aliases = [], limits = CHARACTER_SOURCE_LIMITS } = {}) {
    const names = nameList(name, aliases);
    const notes = material && Array.isArray(material.notes) ? material.notes.slice() : [];
    if (!names.length || !material) return { card: '', worldbook: '', database: '', notes };
    return {
        card: pickCardText(material.card, names, limits.card),
        worldbook: material.books.length ? pickWorldbookText(material.books, names, limits) : '',
        database: material.tables ? pickDatabaseText(material.tables, names, limits.database) : '',
        notes,
    };
}

// 素材补全的背景：角色卡描述 / 场景栏、世界书、数据库里提到这个地点的节选，用来画出地点的档次、风格和陈设。
export function pickSceneSources(material, { name, limits = CHARACTER_SOURCE_LIMITS } = {}) {
    const names = nameList(name);
    const notes = material && Array.isArray(material.notes) ? material.notes.slice() : [];
    if (!names.length || !material) return { card: '', worldbook: '', database: '', notes };
    return {
        card: pickCardText(material.card, names, limits.card, ['description', 'scenario']),
        worldbook: material.books.length ? pickWorldbookText(material.books, names, limits, { keyInName: true }) : '',
        database: material.tables ? pickDatabaseText(material.tables, names, limits.database) : '',
        notes,
    };
}

export async function collectCharacterSources(globalObject, { name, aliases = [], limits = CHARACTER_SOURCE_LIMITS } = {}) {
    if (!nameList(name, aliases).length) return { card: '', worldbook: '', database: '', notes: [] };
    return pickCharacterSources(await readSourceMaterial(globalObject), { name, aliases, limits });
}

// 世界设定的原始资料：角色卡的「场景」栏，加上世界书里常驻（蓝灯）的已启用条目。
export const WORLD_SOURCE_LIMITS = Object.freeze({ scenario: 2000, worldbook: 5000, entry: 1500 });

export function pickWorldText(material, limits = WORLD_SOURCE_LIMITS) {
    if (!material) return '';
    const card = material.card && typeof material.card === 'object' ? material.card : null;
    const data = card && card.data && typeof card.data === 'object' ? card.data : {};
    const scenario = card ? String(card.scenario ?? data.scenario ?? '').trim() : '';
    const parts = scenario ? [`【角色卡·场景】\n${clip(scenario, limits.scenario)}`] : [];
    let used = 0;
    for (const { name: book, entries } of material.books || []) {
        for (const entry of Array.isArray(entries) ? entries : []) {
            const constant = entry && entry.strategy && entry.strategy.type === 'constant';
            if (!constant || entry.enabled === false || !String(entry.content || '').trim()) continue;
            const text = `【世界书·${book}·${entry.name || '条目'}】\n${clip(entry.content, limits.entry)}`;
            if (used + text.length > limits.worldbook) break;
            parts.push(text);
            used += text.length;
        }
    }
    return parts.join('\n');
}

// 正文里描写这套衣服的段落：最近 floors 层（不算系统消息）里提到服装名的段落，超长时留最近的。
export function pickOutfitContext(chat, outfit, { floors = 30, limit = 1500 } = {}) {
    const word = String(outfit || '').trim();
    if (!word || !Array.isArray(chat)) return '';
    const paragraphs = chat.slice(-floors)
        .filter((msg) => msg && !msg.is_system && typeof msg.mes === 'string')
        .flatMap((msg) => msg.mes.split(/\n+/))
        .map((line) => line.trim())
        .filter((line) => line.includes(word));
    const kept = [];
    let used = 0;
    for (let i = paragraphs.length - 1; i >= 0; i -= 1) {
        if (used + paragraphs[i].length > limit) break;
        kept.unshift(paragraphs[i]);
        used += paragraphs[i].length;
    }
    return kept.join('\n');
}

export function formatCharacterSources(sources) {
    const value = sources && typeof sources === 'object' ? sources : {};
    return [value.card, value.worldbook, value.database].map((part) => String(part || '').trim()).filter(Boolean).join('\n\n');
}
