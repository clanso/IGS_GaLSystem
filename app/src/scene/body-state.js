// 立绘的长期身体状态：服装名后面用「-」接一个状态，如「薄睡袍-孕晚期」「亚麻长裙-左臂烧伤」。
// 同一套衣服按状态分开存立绘；衣服（衣柜）跟前半段那套走。只认最后一个「-」（全角「－」也认）。
const OUTFIT_STATE_RE = /^(.+)[-－]([^-－]+)$/;

export function splitOutfitState(name) {
    const text = String(name || '').trim();
    const m = text.match(OUTFIT_STATE_RE);
    if (!m || !m[1].trim() || !m[2].trim()) return { base: text, state: '' };
    return { base: m[1].trim(), state: m[2].trim() };
}

const CN_DIGITS = Object.freeze({ 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 });
// 阶段词按常见说法折成孕月：孕早期 1–3 月取 2，孕中期 4–6 月取 5，孕晚期 7–9 月取 8，临产 / 足月取 10。
const PREGNANCY_STAGES = Object.freeze([
    [/临产|足月|待产|快生/, 10],
    [/孕晚期|孕后期|怀孕后期/, 8],
    [/孕中期/, 5],
    [/孕早期|孕初期|怀孕初期/, 2],
]);
const clampMonth = (n) => Math.max(1, Math.min(10, Math.round(n)));

// 状态里的孕月（1–10）：认阶段词，也认「孕5月」「怀孕五个月」「孕20周」。不是怀孕、或只写了「怀孕」认不出月份时返回 0。
export function pregnancyMonthOf(state) {
    const text = String(state || '').trim();
    if (!text) return 0;
    for (const [re, month] of PREGNANCY_STAGES) if (re.test(text)) return month;
    if (!/孕|身孕|妊娠/.test(text)) return 0;
    const weeks = text.match(/(\d{1,2})\s*周/);
    if (weeks) return clampMonth(Math.ceil(Number(weeks[1]) / 4));
    const months = text.match(/(\d{1,2}|[一二两三四五六七八九十])\s*个?月/);
    if (months) return clampMonth(/\d/.test(months[1]) ? Number(months[1]) : CN_DIGITS[months[1]]);
    return 0;
}

// 孕月 → 肚子的 tag，用 NovelAI 的权重写法控制大小。孕 1–3 月外表看不出来，不加。
// 这些是起始值：没有逐档实测过，出图偏大偏小就改这里。
export const PREGNANCY_MONTH_TAGS = Object.freeze([
    '', '', '', '',
    '0.6::pregnant::',
    '0.8::pregnant::',
    'pregnant',
    '1.1::pregnant::, big belly',
    '1.2::pregnant::, big belly',
    '1.3::pregnant::, 1.1::big belly::',
    '1.4::pregnant::, huge belly',
]);

export function pregnancyTagsOf(month) {
    const n = Number(month);
    return n >= 1 && n <= 10 ? PREGNANCY_MONTH_TAGS[Math.round(n)] : '';
}

// 给写词模型看的孕期对照：孕 1–3 月不写，之后逐月写出 tag。
export function pregnancyGuideText() {
    const months = [];
    for (let month = 4; month <= 10; month += 1) months.push(`孕${month}月 ${PREGNANCY_MONTH_TAGS[month]}`);
    return `孕1–3月外表看不出来，不写怀孕的词；${months.join('；')}`;
}

// 以下按比较用的标签键（小写、去掉权重写法）判断。
// 怀孕和肚子的词：程序按孕期统一加 tag 时，写词结果和旧立绘里带的都去掉，免得两种大小打架。
export const PREGNANCY_TAG_RE = /^(?:pregnant|pregnancy|(?:early|late) pregnancy|baby bump|(?:pregnant|big|huge|large|round|rounded|swollen|bulging|small|slightly swollen) belly)$/;
// 一会儿就过去的身体状态：从原装立绘取长相、给分批写词当样板时去掉，不让它跟着每一份走。
// 某个表情自己要的眼泪、脸红、汗珠由写词结果单独带，不经过这里。
export const TRANSIENT_STATE_TAG_RE = /^(?:sweat|sweating|sweaty|sweatdrop|.*\bsweat\b.*|damp.*|wet|wet .*|.* wet|soaked|drenched|steam|steaming(?: body)?|body steam|hair stuck to .*|messy hair|disheveled(?: hair| clothes)?|tousled hair|bed hair|heavy breathing|panting|out of breath|tears|teary eyes|.*\btears?\b.*|.*blush|dirty(?: face| clothes)?|.*\bstain(?:s|ed)?\b.*|mud|muddy|trembling|shaking)$/;
