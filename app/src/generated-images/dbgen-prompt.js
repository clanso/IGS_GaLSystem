import { moodHasNsfwVariant, moodPresetUse, resolveMoodExpressionTags } from '../scene/mood-groups.js';

// 楼内补立绘一次最多写 8 份，超过则平分 2 批。
export const EXPRESSION_WRITE_BATCH_MAX = 8;
// 表情差分：不超过 9 份一次写完；10–18 份平分 2 批；超过 18 份平分 3 批。一批写完并出完再写下一批。
export const EXPRESSION_DIFF_BATCH_MAX = 9;
// 数据库生图模式下的前端提示词接线：写词接口只说明画什么。
// 正负模板在出图前合并进插件返回的 NaiCaption，不交给写词模型照抄。

const WEIGHT_RE = /^-?\d*\.?\d+::|::$/g;

export function splitTags(text) {
    return String(text || '').split(/[,，\n]/).map((t) => t.trim()).filter(Boolean);
}

// 比较用的标签键：忽略大小写、多余空格、NovelAI 权重语法与强调括号。
export function tagKey(tag) {
    return String(tag || '').trim().replace(WEIGHT_RE, '').replace(/^[{[(]+|[}\])]+$/g, '')
        .trim().toLowerCase().replace(/\s+/g, ' ');
}

// 按先后顺序合并多组标签，重复的只保留第一次出现。
export function mergeTags(...groups) {
    const seen = new Set();
    const out = [];
    for (const group of groups) {
        for (const tag of splitTags(group)) {
            const key = tagKey(tag);
            if (!key || seen.has(key)) continue;
            seen.add(key);
            out.push(tag);
        }
    }
    return out.join(', ');
}

// 插件 LLM 回给程序的是扁平字段。已有立绘按这个格式放进用户描述。
function formatReturnedCaption(caption) {
    const pos = caption && caption.v4_prompt && caption.v4_prompt.caption;
    const neg = caption && caption.v4_negative_prompt && caption.v4_negative_prompt.caption;
    if (!pos || !neg) return '';
    const lines = ['slotid: 1'];
    const scene = String(pos.base_caption || '').trim();
    const sceneUc = String(neg.base_caption || '').trim();
    if (scene) lines.push(`scene: ${scene}`);
    if (sceneUc) lines.push(`scene_uc: ${sceneUc}`);
    const chars = Array.isArray(pos.char_captions) ? pos.char_captions : [];
    const ucs = Array.isArray(neg.char_captions) ? neg.char_captions : [];
    const count = Math.max(chars.length, ucs.length);
    for (let i = 0; i < count; i += 1) {
        const item = chars[i] && typeof chars[i] === 'object' ? chars[i] : {};
        const center = Array.isArray(item.centers) ? item.centers[0] : null;
        const x = center && Number.isFinite(Number(center.x)) ? Number(center.x) : 0.5;
        const y = center && Number.isFinite(Number(center.y)) ? Number(center.y) : 0.5;
        const text = String(item.char_caption || '').trim();
        const uc = String((ucs[i] && ucs[i].char_caption) || '').trim();
        if (text) lines.push(`char: ${x},${y} | ${text}`);
        if (uc) lines.push(`char_uc: ${uc}`);
    }
    return lines.join('\n');
}


function splitEven(list, parts) {
    const base = Math.floor(list.length / parts);
    let extra = list.length % parts;
    const out = [];
    let offset = 0;
    for (let i = 0; i < parts; i += 1) {
        const size = base + (extra > 0 ? 1 : 0);
        if (extra > 0) extra -= 1;
        out.push(list.slice(offset, offset + size));
        offset += size;
    }
    return out;
}

// 楼内补立绘：单次写词最多 8 份。超过 8 份均分成两批（10 份是 5 和 5），由调用方串行写。
export function splitWriteBatches(items) {
    const list = Array.isArray(items) ? items : [];
    if (list.length <= EXPRESSION_WRITE_BATCH_MAX) return list.length ? [list] : [];
    return splitEven(list, 2);
}

// 表情差分写词：9 份及以内一批；超过 9 份平分 2 批；超过 18 份平分 3 批。
export function splitExpressionWriteBatches(items) {
    const list = Array.isArray(items) ? items : [];
    if (!list.length) return [];
    if (list.length <= EXPRESSION_DIFF_BATCH_MAX) return [list];
    return splitEven(list, list.length <= EXPRESSION_DIFF_BATCH_MAX * 2 ? 2 : 3);
}

// 每份表情只交代用在什么场面，不规定怎么做（固定的招牌动作会让每个角色都画成同一副套路脸）；
// 怎么做由写词模型按角色性格和正文来定。自建组没有预设场面，只出现在最后的份数清单里。
function moodSceneLines(moods, nsfw) {
    const lines = moods.map((mood, index) => {
        const use = moodPresetUse(mood);
        const nsfwVariant = nsfw && moodHasNsfwVariant(mood) ? '这一份画 NSFW 版，情欲上来时的样子。' : '';
        return use || nsfwVariant ? `${index + 1} ${mood}：${use ? `用在${use}。` : ''}${nsfwVariant}` : '';
    }).filter(Boolean);
    return lines.length ? ['各份表情用在什么场面（只说场面，怎么做按这个角色来）：', ...lines] : [];
}

// note 是用户这次临时补的要求（性格、某个情绪的特别表现），只影响写词这一步；
// nsfw 为 true 时「动情」改用它在 NSFW 下的动作说明。
export function buildExpressionDiffDescription(name, prompt, labels, dna, outfit, { note = '', nsfw = false, transparent = true, world = null } = {}) {
    const moods = (Array.isArray(labels) ? labels : []).map((item) => String(item || '').trim()).filter(Boolean);
    const persona = String((dna && typeof dna === 'object' && dna.persona) || '').trim();
    const stored = prompt && typeof prompt === 'object' ? prompt : {};
    const caption = formatReturnedCaption(stored.caption);
    const clothes = outfit && typeof outfit === 'object' ? outfit : null;
    const outfitName = clothes ? String(clothes.name || '').trim() : '';
    const words = clothes && Array.isArray(clothes.words)
        ? clothes.words.map((item) => String(item || '').trim()).filter(Boolean)
        : [];
    const nude = Boolean(clothes && clothes.nude);
    const clothesPrompt = nude ? '' : (clothes ? String(clothes.prompt || '').trim() : '');
    const wordText = words.length ? `，衣服按这些词来画：${words.join('、')}` : '';
    const wear = caption
        ? '上面 char 里的衣服换成下面的服装提示词，人还是上面那个。'
        : '衣服按下面的服装提示词来画。';
    const clothesLine = nude
        ? '这一套是裸体。不要画任何衣服、内衣和配饰，按这个角色的长相画裸体立绘。不要沿用原装的衣服，也不要另附服装提示词。'
        : !outfitName
        ? (caption ? '服装也按上面这份画。' : '外貌、服装和构图与已有立绘保持一致。')
        : clothesPrompt
            ? (clothes.ownImage
                ? `这一套就是服装「${outfitName}」。${wear}不要画成别的衣服。`
                : `这一套要改成服装「${outfitName}」。${wear}不要沿用原装的衣服。`)
            : clothes.ownImage
                ? `这一套就是服装「${outfitName}」${words.length ? `（${words.join('、')}）` : ''}。不要画成别的衣服。`
                : `这一套要改成服装「${outfitName}」${wordText}。不要沿用原装的衣服。`;
    return [
        outfitName
            ? `为角色「${name || ''}」的服装「${outfitName}」写 ${moods.length} 份立绘表情差分。`
            : `为角色「${name || ''}」写 ${moods.length} 份立绘表情差分。`,
        caption ? '下面这份是已有立绘，外貌和构图按它画。这不是要回写的图。' : '',
        caption,
        clothesLine,
        clothes && clothes.nsfwBoost && !nude ? nsfwClothingBoostLine('character') : '',
        clothesPrompt ? `服装提示词：\n${clothesPrompt}` : '',
        ...worldContextLines(world),
        '每个表情都按这个角色自己的性格、脾气和说话做事的习惯来写，不要套统一的表情模板。',
        persona ? `「${name || ''}」的性格与表情习惯（据此决定每个表情怎么做、做到多大；只管表情和动作，不要据此改长相和衣服）：\n${persona}` : '',
        '规格：大腿以上（cowboy shot），身体朝正面站着（各张差分要叠在同一个位置）。头的角度、视线方向、手和肩膀可以随情绪动。禁止全身，禁止露出脚，禁止整个身体侧过去，禁止倾斜构图。',
        '写每一份之前，先想这个角色在那种场面里真实会怎么反应，再落到脸上（眉、眼、嘴、视线），需要时带到手和肩膀；动多少按这个角色来，内敛的人可以只有眼神和嘴角的变化。',
        '同一种情绪，不同的人做法可以完全不同：比如委屈，有人噘嘴含泪，有人别过头一声不吭，有人反而笑着说没事。不要套最常见的动漫画法，除非这个角色本来就是这样；也不要为了表现情绪把一串同类标签堆在一起，只写这个角色这一刻真会有的那几个。',
        '每一份要一眼看得出是哪种情绪，彼此不要撞脸，但都要像同一个人。',
        String(note || '').trim() ? `这次额外的要求：\n${String(note).trim()}` : '',
        caption ? '上面那份立绘的表情和动作不要沿用，每份的表情、嘴型、眼神和手势都按各自的情绪重写。' : '',
        spriteGroundLine(transparent),
        ...characterDnaLines(name, dna),
        ...moodSceneLines(moods, nsfw),
        `按 slotid 1 到 ${moods.length} 的顺序另写 ${moods.length} 份：${moods.map((label, index) => `${index + 1} ${label}`).join('、')}。`,
    ].filter(Boolean).join('\n');
}

const UPRIGHT_POSITIVE = 'cowboy shot, standing, facing viewer, straight-on';
const UPRIGHT_NEGATIVE = 'dutch angle, from side, profile, full body, feet';
const EXPRESSION_DROP_POSITIVE = new Set(['arms at sides'].map(tagKey));

// 景别回到大腿以上。只拿掉双手下垂，避免表情动作被锁死。
export function expressionSpritePrompts(positive, negative) {
    const kept = splitTags(positive).filter((tag) => !EXPRESSION_DROP_POSITIVE.has(tagKey(tag))).join(', ');
    return { positive: kept, negative: String(negative || '') };
}

// 写词结果补上大腿以上和正面。负面排除全身和脚。
export function uprightSpriteCaption(caption) {
    const pos = caption && caption.v4_prompt && caption.v4_prompt.caption;
    const neg = caption && caption.v4_negative_prompt && caption.v4_negative_prompt.caption;
    if (!pos || !neg) return caption;
    const chars = Array.isArray(pos.char_captions) ? pos.char_captions : [];
    const ucs = Array.isArray(neg.char_captions) ? neg.char_captions : [];
    const nextChars = chars.map((item) => ({
        ...(item && typeof item === 'object' ? item : {}),
        char_caption: mergeTags(item && item.char_caption, UPRIGHT_POSITIVE),
    }));
    const nextUcs = (ucs.length ? ucs : nextChars.map(() => ({ char_caption: '' }))).map((item) => ({
        ...(item && typeof item === 'object' ? item : {}),
        char_caption: mergeTags(item && item.char_caption, UPRIGHT_NEGATIVE),
    }));
    return {
        ...caption,
        v4_prompt: {
            ...caption.v4_prompt,
            caption: {
                ...pos,
                base_caption: chars.length ? pos.base_caption : mergeTags(pos.base_caption, UPRIGHT_POSITIVE),
                char_captions: nextChars,
            },
        },
        v4_negative_prompt: {
            ...caption.v4_negative_prompt,
            caption: {
                ...neg,
                base_caption: mergeTags(neg.base_caption, UPRIGHT_NEGATIVE),
                char_captions: chars.length ? nextUcs : ucs,
            },
        },
    };
}

// 插件写词会带上世界书、聊天上下文和它自己的角色库，同名角色容易被写成别的长相。
// 有 DNA 时先声明以设定为准，再列字段；没有 DNA 返回空数组。
function characterDnaLines(name, dna) {
    const profile = dna && typeof dna === 'object' ? dna : {};
    const identity = String(profile.identity || '').trim();
    const appearance = String(profile.defaultAppearance || '').trim();
    const dnaNegative = String(profile.negative || '').trim();
    const triggers = String(profile.triggerWords || '').trim();
    if (!identity && !appearance && !dnaNegative && !triggers) return [];
    return [
        `「${name || ''}」的长相以下面的设定为准，优先于上下文、世界书和角色库里的任何描写；发色、瞳色、发型照设定写，不得改动，不要按名字联想。`,
        identity ? `固定身份：\n${identity}` : '',
        appearance ? `默认外观：\n${appearance}` : '',
        triggers ? `触发词：\n${triggers}` : '',
        dnaNegative ? `不要出现：\n${dnaNegative}` : '',
    ].filter(Boolean);
}

// 立绘站得太板正：要一个不挡身体的日常小动作。
const SPRITE_DAILY_POSE_LINE = '姿势带一个轻量的日常小动作（如一只手拨头发、手背在身后、手插口袋、轻抓衣角），不要双手僵直下垂，也不要大幅动作或拿道具挡住身体。';

function spriteGroundLine(transparent) {
    return transparent === false ? '白色背景，不要透明底。' : '无背景，透明底。';
}

// 设置页直接出一张角色立绘。没有正文，长相和衣服按角色设定写。
// 生图写词的世界背景：世界观选项 + 世界设定提要；服装、发型、饰品和随身物品都要合这个世界。
export function worldContextLines(world) {
    const label = String((world && world.label) || '').trim();
    const summary = String((world && world.summary) || '').trim();
    if (!label && !summary) return [];
    return [
        `这个故事的世界观${label ? `是「${label}」` : '见下面的设定'}。服装、发型、饰品和随身物品都要符合这个世界，不要画出不属于这个世界的东西。`,
        summary ? `世界设定提要：\n${summary}` : '',
    ].filter(Boolean);
}

// 角色卡 / 世界书 / 数据库里这个角色的资料节选：只补角色设定（DNA）没写到的长相、穿着和身份气质。
export function characterSourceLines(name, sourcesText) {
    const text = String(sourcesText || '').trim();
    if (!text) return [];
    return [
        `下面是「${name || ''}」的资料节选（每段开头标了出处：角色卡、世界书、数据库或前文）。长相和服装以角色设定（DNA）为准；设定没写到的按这些资料补，只取长相、穿着和身份气质，资料里的剧情不要画进去：`,
        text,
    ];
}

// 背景：角色卡 / 世界书 / 数据库 / 前文里提到这个地点的节选，只取地点本身的样子。
export function sceneSourceLines(name, sourcesText) {
    const text = String(sourcesText || '').trim();
    if (!text) return [];
    return [
        `下面是地点「${name || ''}」的资料节选（每段开头标了出处）。只取地点本身：档次、规模、建筑风格、年代、陈设和氛围；资料里的人物和剧情不要画进去：`,
        text,
    ];
}

export function buildCharacterSpriteDescription(name, dna, options) {
    const nude = Boolean(options && options.nude);
    const note = String(options && options.note || '').trim();
    return [
        nude ? `画角色「${name || ''}」的裸体立绘。` : `画角色「${name || ''}」的立绘。`,
        nude
            ? '不要画任何衣服、内衣和配饰。长相按下面的角色设定，人还是这个角色。不要套用现成的服装提示词，按这个角色自己写裸体该怎么画。'
            : '外貌与服装按下面的角色设定来画。设定里没写到的，按这个角色补一个日常样子。',
        ...worldContextLines(options && options.world),
        '规格：大腿以上（cowboy shot）。朝向正面，直立，平视。禁止全身，禁止露出脚，禁止侧身，禁止倾斜构图。',
        SPRITE_DAILY_POSE_LINE,
        note ? `这次额外的要求：\n${note}` : '',
        spriteGroundLine(options && options.transparent),
        ...characterDnaLines(name, dna),
        ...characterSourceLines(name, options && options.sourcesText),
        '只写一份，slotid 为 1。',
    ].filter(Boolean).join('\n');
}

// 状态栏头像：Q 版圆脸，只画一颗头。长相按角色设定写。
export function buildCharacterAvatarDescription(name, dna, { world = null, sourcesText = '' } = {}) {
    return [
        `画角色「${name || ''}」的 Q 版头像（chibi）。`,
        ...worldContextLines(world),
        '头像会裁成圆形：只画头、脖子和肩膀，脸放在画面正中，占画面的大半。脸圆、眼睛大，正面看向画面，带一点笑。',
        '肩膀以下绝对不要出现：不画胸口以下的身体，不画腰、腿、脚，也不要画手。',
        '发色、瞳色、发型和头上的饰品按下面的角色设定来画，不能改；肩颈处的衣领按角色日常服装画一点即可。',
        '纯色浅底，不要背景，不要文字。',
        ...characterDnaLines(name, dna),
        ...characterSourceLines(name, sourcesText),
        '只写一份，slotid 为 1。',
    ].filter(Boolean).join('\n');
}

// 勾选「瑟瑟加强」后追加。只告诉模型这是成年人的色情服装、不要改成普通衣服，不附带成套标签。
export function nsfwClothingBoostLine(kind = 'clothes') {
    return kind === 'character'
        ? '这套是色情服装。不要回避，不要审查，不要改成普通、得体或日常衣服，也不要用衣物遮住这套该露的地方。按服装提示词加强暴露和色情。'
        : '这是色情服装。不要回避，不要审查，不要改成普通、得体或日常衣服，也不要把暴露的设计改成遮盖。按这个服装名加强色情和暴露，把款式、颜色、材质和露出的位置写清楚。';
}

// 待确认服装：只写这一套衣服的生图标签，不写出图。
// 衣柜按服装名共用，这里只写衣服、不提角色名（_character 不用）。context 是正文里描写这套衣服的段落，
// clues 是数据库里的穿着记录；两者都只取衣服的描写，款式风格靠世界观约束。
export function buildWardrobeClothingDescription(_character, outfitName, { nsfwBoost = false, world = null, context = '', clues = '' } = {}) {
    const outfit = String(outfitName || '').trim();
    const scene = String(context || '').trim();
    const worn = String(clues || '').trim();
    return [
        `为服装「${outfit}」写一份生图用的服装提示词。`,
        '一定要注意：生成的是一套衣服，而不是角色，没有角色。',
        ...worldContextLines(world),
        scene ? `正文里对这套衣服的描写（只取衣服本身：款式、颜色、材质照着写；没写到的按世界观补；人物和剧情不要写进去）：\n${scene}` : '',
        worn ? `数据库里的穿着记录（同样只取衣服本身）：\n${worn}` : '',
        '这是一整套穿着，从上到下写完整：头上、上身、下身、腿和脚，以及配套的饰品。不要只写其中一件。',
        '每件都写清款式、颜色和材质。',
        nsfwBoost ? nsfwClothingBoostLine('clothes') : '',
        '不要写人，不要写表情、姿势、背景。',
        '只写一份，slotid 为 1。',
    ].filter(Boolean).join('\n');
}

// 本楼还缺的立绘一次写完。名单里只有尚未生成的，已有的不进来。
export function buildDbgenSpriteBatchDescription(needs = [], options = {}) {
    const world = options.world || null;
    const items = Array.isArray(needs) ? needs : [];
    const list = items.map((need, index) => `${index + 1}. ${need && need.name ? need.name : ''}`);
    const count = list.length;
    const profiles = items
        .map((need, index) => {
            const lines = [...characterDnaLines(need && need.name, need && need.dna), ...characterSourceLines(need && need.name, need && need.sources)];
            return lines.length ? [`第 ${index + 1} 份：`, ...lines].join('\n') : '';
        })
        .filter(Boolean);
    return [
        `写${count}张立绘的提示词，按下面的顺序各一份，slotid 从 1 数到 ${count}。`,
        list.join('\n'),
        ...worldContextLines(world),
        profiles.length ? '角色外貌与服装依据正文补充；下面列了设定的角色，长相按设定写。' : '角色外貌与服装依据正文补充。',
        ...profiles,
        SPRITE_DAILY_POSE_LINE,
        spriteGroundLine(options.transparent),
        '不要写生成点，不要从正文摘挂载句。',
    ].join('\n');
}

// 本楼还缺的背景一次写完。名单里只有尚未生成的，已有的不进来。
export function buildDbgenBackgroundBatchDescription(needs = []) {
    const list = (Array.isArray(needs) ? needs : []).map((need, index) => {
        const when = [need && need.time, need && need.weather].filter(Boolean).join('、');
        return `${index + 1}. ${need && need.name ? need.name : ''}${when ? `（${when}）` : ''}`;
    });
    const count = list.length;
    const profiles = (Array.isArray(needs) ? needs : [])
        .map((need, index) => {
            const lines = sceneSourceLines(need && need.name, need && need.sources);
            return lines.length ? [`第 ${index + 1} 份：`, ...lines].join('\n') : '';
        })
        .filter(Boolean);
    return [
        `为本楼写${count}张背景的提示词，按下面的顺序各一份，slotid 从 1 数到 ${count}。`,
        list.join('\n'),
        '地点陈设、光线与氛围依据楼层正文补充。',
        ...profiles,
        '不要写生成点，不要从正文摘挂载句。',
    ].join('\n');
}

export function buildDbgenAssetDescription(need = {}, options = {}) {
    const when = [need.time, need.weather].filter(Boolean).join('、');
    if (need.type === 'sprite') {
        return [
            `画角色「${need.name || ''}」的立绘。`,
            `角色外貌与服装依据正文补充。${spriteGroundLine(options.transparent)}`,
            SPRITE_DAILY_POSE_LINE,
            ...characterDnaLines(need.name, need.dna),
            ...characterSourceLines(need.name, need.sources),
        ].join('\n');
    }
    if (need.type === 'background') {
        return [
            `画场景「${need.name || ''}」${when ? `（${when}）` : ''}的背景图。`,
            '地点陈设、光线与氛围依据楼层正文补充。',
            ...sceneSourceLines(need.name, need.sources),
        ].join('\n');
    }
    return '';
}

// 正面：插件内容在前、前端正向模板追加在后，并去掉与前端负面冲突的标签；
// 负面：插件负面加上前端负面。角色 caption 结构与坐标原样保留。
export function applyUserPromptsToCaption(caption, prompts = {}) {
    const positive = splitTags(prompts.positive);
    const negative = splitTags(prompts.negative);
    if (!caption || typeof caption !== 'object' || (!positive.length && !negative.length)) return caption;
    const blocked = new Set(negative.map(tagKey));
    const keep = (text) => splitTags(text).filter((tag) => !blocked.has(tagKey(tag))).join(', ');
    const posPrompt = caption.v4_prompt || {};
    const negPrompt = caption.v4_negative_prompt || {};
    const pos = posPrompt.caption || {};
    const neg = negPrompt.caption || {};
    return {
        ...caption,
        v4_prompt: {
            ...posPrompt,
            caption: {
                ...pos,
                base_caption: mergeTags(keep(pos.base_caption), positive.join(', ')),
                char_captions: (Array.isArray(pos.char_captions) ? pos.char_captions : [])
                    .map((c) => ({ ...c, char_caption: keep(c && c.char_caption) })),
            },
        },
        v4_negative_prompt: {
            ...negPrompt,
            caption: {
                ...neg,
                base_caption: mergeTags(neg.base_caption, negative.join(', ')),
                char_captions: Array.isArray(neg.char_captions) ? neg.char_captions : [],
            },
        },
    };
}

// 写词模型仍可能不照 DNA 写（世界书、角色库按名字联想）。出图前把 DNA 里的英文标签硬合进角色 caption：
// 触发词、身份、默认外观进正面，「不要出现」进负面；写词结果里和 DNA 冲突的发色、瞳色去掉。中文描述 NAI 读不懂，不合入。
const COLOR_FEATURE_RE = /^(?:(?:light|dark|pale|deep)\s+)?(?:platinum\s+)?(?:blonde|blond|black|brown|red|blue|green|pink|purple|violet|white|silver|grey|gray|orange|aqua|yellow|golden|gold)\s+(hair|eyes)$/;

function dnaEnglishTags(text) {
    return splitTags(text).filter((tag) => /[a-z]/i.test(tag) && !/[\u3040-\u30ff\u3400-\u9fff]/.test(tag));
}

// DNA 只管长相和衣服。表情、嘴型、眼神、手势硬合进去会把每张差分都盖成同一张脸。
const EXPRESSION_POSE_RE = /^(?:expressionless|emotionless|blank stare|straight face|serious|calm|happy|sad|angry|annoyed|smug|shy|embarrassed|surprised|nervous|worried|crying|tears|blush|laughing|smiling|grin|smirk|frown|pout|open mouth|closed mouth|parted lips|closed eyes|half-closed eyes|wide-eyed|narrowed eyes|looking (?:at viewer|away|down|up|to the side)|head tilt|standing|arms at sides|arms behind back|hands behind back|crossed arms|arms crossed|hands? on (?:own )?(?:hips?|chest|chin|cheek)|.*\b(?:smile|expression)|:\)|:d|\^_\^)$/;

function isExpressionPoseTag(tag) {
    return EXPRESSION_POSE_RE.test(tagKey(tag));
}

// 默认立绘被写成无表情时，差分照抄会带上这些词。
const NEUTRAL_FACE_TAGS = new Set(['expressionless', 'emotionless', 'neutral expression', 'blank expression', 'blank stare', 'straight face', 'closed mouth', 'arms at sides'].map(tagKey));

// 表情组的英文表情 tag（用户改过的优先，没改用预设）：只有组上打开「固定加上」（alwaysTags）才放到角色 caption 最前，
// 并去掉照抄来的无表情词；没打开就完全按写词结果，不兜底（预设 tag 是通用画法，叠上去容易变成套路脸）。
// 默认组不动；nsfw 为 true 时「动情」没改过就用 NSFW 那套预设。
export function applyMoodToCaption(caption, mood, { nsfw = false, groups = null } = {}) {
    const label = String(mood || '').trim();
    if (label === '默认') return caption;
    const { tags, always } = resolveMoodExpressionTags(label, groups, { nsfw });
    if (!tags || !always) return caption;
    return prependCharTags(caption, tags, (tag) => !NEUTRAL_FACE_TAGS.has(tagKey(tag)));
}

// 衣服跟着同一份来源走，不靠写词插件每份重写：换装有服装词就用服装词；
// 原装或这套有自己的立绘时，用那张立绘的提示词去掉表情、姿势后剩下的长相和衣服。
const LOOK_SKIP_TAGS = new Set(['solo', 'cowboy shot', 'facing viewer', 'straight-on', 'centered', 'transparent background', 'simple background', 'grey background', 'light grey background', 'flat color background', 'no background'].map(tagKey));

function storedCharTags(prompt) {
    const stored = prompt && typeof prompt === 'object' ? prompt : {};
    const pos = stored.caption && stored.caption.v4_prompt && stored.caption.v4_prompt.caption;
    if (pos) {
        const chars = Array.isArray(pos.char_captions) ? pos.char_captions : [];
        return String((chars[0] && chars[0].char_caption) || pos.base_caption || '');
    }
    return String(stored.positive || '');
}

export function expressionLookTags(basePrompt, outfit) {
    const clothes = outfit && typeof outfit === 'object' ? outfit : null;
    const clothesPrompt = clothes ? String(clothes.prompt || '').trim() : '';
    if (clothesPrompt) return dnaEnglishTags(clothesPrompt).join(', ');
    if (clothes && !clothes.ownImage) return '';
    return splitTags(storedCharTags(basePrompt))
        .filter((tag) => !isExpressionPoseTag(tag) && !LOOK_SKIP_TAGS.has(tagKey(tag)))
        .join(', ');
}

// 换了衣服的那一套，DNA 的默认外观里是原装的衣服，硬合会和新衣服打架。
export function expressionPaintDna(dna, outfit) {
    if (!dna || typeof dna !== 'object' || !outfit || typeof outfit !== 'object') return dna;
    return { ...dna, defaultAppearance: '' };
}

export function applyLookToCaption(caption, tags) {
    return prependCharTags(caption, tags);
}

// 把一组标签放到角色 caption（没有角色块时放 base）最前，原有标签按 keep 过滤后接在后面。
function prependCharTags(caption, tags, keep = () => true) {
    const pos = caption && caption.v4_prompt && caption.v4_prompt.caption;
    if (!String(tags || '').trim() || !pos) return caption;
    const merge = (text) => mergeTags(tags, splitTags(text).filter(keep).join(', '));
    const chars = Array.isArray(pos.char_captions) ? pos.char_captions : [];
    return {
        ...caption,
        v4_prompt: {
            ...caption.v4_prompt,
            caption: {
                ...pos,
                base_caption: chars.length ? pos.base_caption : merge(pos.base_caption),
                char_captions: chars.map((item, index) => (index === 0
                    ? { ...(item && typeof item === 'object' ? item : {}), char_caption: merge(item && item.char_caption) }
                    : item)),
            },
        },
    };
}

export function applyCharacterDnaToCaption(caption, dna) {
    const pos = caption && caption.v4_prompt && caption.v4_prompt.caption;
    const neg = caption && caption.v4_negative_prompt && caption.v4_negative_prompt.caption;
    if (!pos || !neg || !dna || typeof dna !== 'object') return caption;
    const positive = dnaEnglishTags([dna.triggerWords, dna.identity, dna.defaultAppearance].join(',')).filter((tag) => !isExpressionPoseTag(tag));
    const negative = dnaEnglishTags(dna.negative).filter((tag) => !isExpressionPoseTag(tag));
    if (!positive.length && !negative.length) return caption;
    const fixed = new Set();
    for (const tag of positive) {
        const hit = tagKey(tag).match(COLOR_FEATURE_RE);
        if (hit) fixed.add(hit[1]);
    }
    const blocked = new Set(negative.map(tagKey));
    const keep = (text) => splitTags(text).filter((tag) => {
        const key = tagKey(tag);
        if (blocked.has(key)) return false;
        const hit = key.match(COLOR_FEATURE_RE);
        return !(hit && fixed.has(hit[1]) && !positive.some((p) => tagKey(p) === key));
    }).join(', ');
    const chars = Array.isArray(pos.char_captions) ? pos.char_captions : [];
    const ucs = Array.isArray(neg.char_captions) ? neg.char_captions : [];
    const dnaPositive = positive.join(', ');
    const dnaNegative = negative.join(', ');
    return {
        ...caption,
        v4_prompt: {
            ...caption.v4_prompt,
            caption: {
                ...pos,
                base_caption: chars.length ? keep(pos.base_caption) : mergeTags(dnaPositive, keep(pos.base_caption)),
                char_captions: chars.map((item, index) => ({
                    ...(item && typeof item === 'object' ? item : {}),
                    char_caption: index === 0 ? mergeTags(dnaPositive, keep(item && item.char_caption)) : (item && item.char_caption),
                })),
            },
        },
        v4_negative_prompt: {
            ...caption.v4_negative_prompt,
            caption: { ...neg, base_caption: mergeTags(neg.base_caption, dnaNegative), char_captions: ucs },
        },
    };
}
