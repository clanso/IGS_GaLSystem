import test from 'node:test';
import assert from 'node:assert/strict';
import { applyCharacterDnaToCaption, buildExpressionDiffDescription } from '../src/generated-images/dbgen-prompt.js';
import { buildCharacterDnaPromptParts, isCharacterDnaEmpty, normalizeCharacterDna } from '../src/scene/character-dna.js';
import { collectCharacterSources, pickCardText, pickDatabaseText, pickWorldbookText } from '../src/host/character-sources.js';
import { parsePersonaReply, writeCharacterPersona } from '../src/generated-images/illustration/persona-writer.js';
import { handleSettingsAction } from '../src/visual/igs-ui/settings-actions.js';

const PERSONA = '高雅内敛，情绪很少写在脸上；委屈时垂眼抿唇，不会噘嘴撒娇。';
const charCaption = (text) => ({
    v4_prompt: { caption: { base_caption: 'solo', char_captions: [{ char_caption: text, centers: [{ x: 0.5, y: 0.5 }] }] } },
    v4_negative_prompt: { caption: { base_caption: '', char_captions: [{ char_caption: '', centers: [{ x: 0.5, y: 0.5 }] }] } },
});

test('gate:persona:stored-with-dna-but-never-in-image-prompts', () => {
    assert.deepEqual(normalizeCharacterDna({ identity: '1girl', persona: '  ' }), { identity: '1girl', defaultAppearance: '', negative: '', triggerWords: '' });
    const dna = normalizeCharacterDna({ identity: '1girl, silver hair', persona: `${PERSONA} tsundere` });
    assert.equal(dna.persona, `${PERSONA} tsundere`);
    // 只有性格不算填了 DNA；画图用的正负片段和 caption 都不带它。
    assert.equal(isCharacterDnaEmpty({ persona: PERSONA }), true);
    assert.doesNotMatch(buildCharacterDnaPromptParts(dna, { includeDefaultAppearance: true }).positive, /tsundere|内敛/);
    assert.doesNotMatch(JSON.stringify(applyCharacterDnaToCaption(charCaption('1girl'), dna)), /tsundere|内敛/);
});

test('gate:persona:expression-description-carries-persona-and-only-scene-of-each-mood', () => {
    const withPersona = buildExpressionDiffDescription('冬月', null, ['委屈', '动情'], { identity: '1girl', persona: PERSONA }, null, { nsfw: true });
    assert.match(withPersona, /「冬月」的性格与表情习惯（据此决定每个表情怎么做、做到多大；只管表情和动作，不要据此改长相和衣服）：\n高雅内敛/);
    // 每份只交代场面，不给固定的招牌动作；要求先想这个角色真实会怎么反应，不套动漫画法。
    assert.match(withPersona, /各份表情用在什么场面（只说场面，怎么做按这个角色来）：\n1 委屈：用在被冤枉、被凶了想讨说法的时候。\n2 动情：用在告白前后、接吻前、距离一下子拉近的时候。这一份画 NSFW 版，情欲上来时的样子。/);
    assert.doesNotMatch(withPersona, /噘嘴，眼眶含泪忍着不掉|动作是基准|禁止仅替换面部|平视/);
    assert.match(withPersona, /先想这个角色在那种场面里真实会怎么反应/);
    assert.match(withPersona, /不要套最常见的动漫画法/);
    assert.match(withPersona, /头的角度、视线方向、手和肩膀可以随情绪动/);
    assert.ok(withPersona.indexOf('性格与表情习惯') < withPersona.indexOf('各份表情用在什么场面'));
    assert.doesNotMatch(buildExpressionDiffDescription('冬月', null, ['委屈'], { identity: '1girl' }, null), /性格与表情习惯/);
    assert.doesNotMatch(buildExpressionDiffDescription('冬月', null, ['委屈', '动情'], null, null), /NSFW 版/, '不开 NSFW 时动情是全年龄版');
    assert.doesNotMatch(buildExpressionDiffDescription('冬月', null, ['发呆'], null, null), /各份表情用在什么场面/, '自建组没有预设场面，只在份数清单里');
});

test('gate:persona:sources-pick-only-what-mentions-the-character', () => {
    // 卡名就是这个角色：整段保留；多角色卡只留提到他的段落（别名也算）。
    assert.match(pickCardText({ name: '冬月', description: '名门千金。\n\n喜欢红茶。', personality: '内敛' }, ['冬月']), /名门千金。\n\n喜欢红茶。[\s\S]*【角色卡·性格】\n内敛/);
    const multi = pickCardText({ name: '药屋', description: '柯萝伊：活泼开朗。\n\n阿黛尔：寡言，小阿看着冷淡。\n\n店里卖药。' }, ['阿黛尔', '小阿']);
    assert.equal(multi, '【角色卡·描述】\n阿黛尔：寡言，小阿看着冷淡。');
    assert.equal(pickCardText(null, ['冬月']), '');
    // 世界书：只要已启用、关键词或内容提到他的条目，关键词命中的排前。
    const books = [{ name: '设定', entries: [
        { name: '杂谈', enabled: true, strategy: { keys: ['天气'] }, content: '冬月常去的茶室。' },
        { name: '冬月', enabled: true, strategy: { keys: ['冬月', /冬月大人/] }, content: '冬月受委屈时只会垂下眼睛。' },
        { name: '关掉的', enabled: false, strategy: { keys: ['冬月'] }, content: '不该出现' },
        { name: '路人', enabled: true, strategy: { keys: ['路人'] }, content: '路人甲。' },
    ] }];
    const picked = pickWorldbookText(books, ['冬月']);
    assert.match(picked, /^【世界书·设定·冬月】\n冬月受委屈时只会垂下眼睛。\n【世界书·设定·杂谈】/);
    assert.doesNotMatch(picked, /不该出现|路人甲/);
    // 数据库：有一格正好是他名字的行，整行写出（空格子不写）。
    const tables = { ok: true, data: { sheet_1: { uid: 'sheet_1', name: '角色表', orderNo: 1, content: [['姓名', '性格', '备注'], ['冬月', '冷静克制', ''], ['冬月的猫', '黏人', '']] } } };
    assert.equal(pickDatabaseText(tables, ['冬月']), '【数据库·角色表】姓名：冬月；性格：冷静克制');
    assert.equal(pickDatabaseText({ ok: false }, ['冬月']), '');
});

function fakeTavern({ withWorldbook = true } = {}) {
    return {
        alert() {},
        document: { getElementById() { return null; } },
        SillyTavern: { getContext: () => ({ characters: [{ name: '冬月', description: '冬月是名门千金，举止高雅。', personality: '' }], characterId: 0 }) },
        TavernHelper: withWorldbook ? {
            getCharWorldbookNames: () => ({ primary: '冬月设定', additional: [] }),
            getChatWorldbookName: () => null,
            getWorldbook: async () => [{ name: '冬月', enabled: true, strategy: { keys: ['冬月'] }, content: '冬月受委屈时只会垂下眼睛。' }],
        } : undefined,
        AutoCardUpdaterAPI: { exportTableAsJson: () => ({ sheet_1: { uid: 'sheet_1', name: '角色表', orderNo: 1, content: [['姓名', '性格'], ['冬月', '冷静克制']] } }) },
    };
}

test('gate:persona:collects-card-worldbook-and-database-and-notes-gaps', async () => {
    const all = await collectCharacterSources(fakeTavern(), { name: '冬月' });
    assert.match(all.card, /名门千金/);
    assert.match(all.worldbook, /只会垂下眼睛/);
    assert.match(all.database, /冷静克制/);
    const partial = await collectCharacterSources(fakeTavern({ withWorldbook: false }), { name: '冬月' });
    assert.equal(partial.worldbook, '');
    assert.deepEqual(partial.notes, ['没有找到酒馆助手的世界书接口']);
});

test('gate:persona:writer-parses-reply-and-reports-insufficient-sources', async () => {
    assert.deepEqual(parsePersonaReply('```\n高雅内敛。\n```'), { ok: true, insufficient: false, persona: '高雅内敛。' });
    assert.deepEqual(parsePersonaReply('资料不足'), { ok: true, insufficient: true, persona: '' });
    assert.equal(parsePersonaReply('长'.repeat(500)).persona.length, 401);
    const asked = [];
    const llm = { request: async (req) => { asked.push(req); return PERSONA; } };
    const written = await writeCharacterPersona(llm, { source: 'tavern' }, { name: '冬月', sourcesText: '【角色卡·描述】冬月是名门千金。' });
    assert.deepEqual(written, { ok: true, persona: PERSONA, insufficient: false });
    assert.match(asked[0].user, /^要提炼的角色：冬月\n\n资料：\n【角色卡·描述】冬月是名门千金。/);
    assert.match(asked[0].system, /不会做的表情/);
    assert.equal((await writeCharacterPersona(llm, { source: 'tavern' }, { name: '冬月', sourcesText: '' })).ok, false);
    assert.equal((await writeCharacterPersona(llm, { source: 'openai' }, { name: '冬月', sourcesText: 'x' })).ok, false, '独立 API 没填地址时不请求');
});

function personaCtx({ draft, generatedAssets, asks = [] }) {
    return {
        state: { activeSettings: { draft, asyncState: {} } },
        options: { global: fakeTavern(), generatedAssets },
        persistSettingsDraft: () => ({ ok: true }),
        rerenderSettings: () => ({ ok: true }),
        dialogs: { confirm: async (message) => { asks.push(message); return true; }, view: async () => {} },
    };
}

// 打开了角色卡时 DNA 可能写在本卡素材库里，两处都找。
const dnaOf = (draft) => {
    const assets = draft.bridge.sceneAssets;
    return [assets, ...Object.values(assets.cards || {})].map((lib) => lib.characterDna && lib.characterDna['冬月']).find(Boolean);
};

test('gate:persona:setup-panel-shows-editable-field-and-extract-button', async () => {
    const { bootstrapIGS } = await import('../src/index.js');
    const vn = bootstrapIGS({ global: {}, autoAttachMagicWand: false, hostAdapter: { getCurrentMessage: async () => null, typeAndSend: async () => ({ ok: true }) } });
    try {
        const controller = vn.openSettings({ tab: 'scene', mode: 'pc' }).controller;
        controller.setValue('bridge.sceneAssets.characters', { 冬月: { 默认: '' } });
        controller.switchSceneSubTab('characters');
        let html = (await controller.invoke(`scene-toggle-dna:${encodeURIComponent('冬月')}`)).snapshot.html;
        assert.match(html, /性格与表情习惯<span class="igs-outfit-muted">（只给表情差分写词用，不进画图提示词）/);
        assert.match(html, /data-dna-char="冬月" data-dna-field="persona" placeholder="例：高雅内敛[^"]*"><\/textarea>/);
        assert.match(html, /data-action="char-persona-extract:%E5%86%AC%E6%9C%88">从角色卡 \/ 世界书 \/ 数据库提炼</);
        controller.setValue('bridge.sceneAssets.characterDna', { 冬月: { persona: PERSONA } });
        html = controller.getSnapshot().html;
        assert.match(html, new RegExp(`data-dna-field="persona"[^>]*>${PERSONA}</textarea>`));
        assert.match(html, />重新从资料提炼</);
        controller.close();
    } finally {
        vn.destroy();
    }
});

test('gate:persona:manual-extract-saves-into-dna-and-asks-before-overwrite', async () => {
    const draft = { bridge: { sceneAssets: { characters: { 冬月: { 默认: '' } }, characterDna: { 冬月: { identity: '1girl' } } } }, readerSettings: {} };
    const sent = [];
    const asks = [];
    const generatedAssets = { summarizeCharacterPersona: async (input) => { sent.push(input); return { ok: true, persona: PERSONA, insufficient: false }; } };
    const ctx = personaCtx({ draft, generatedAssets, asks });
    await handleSettingsAction('char-persona-extract:%E5%86%AC%E6%9C%88', ctx);
    assert.equal(dnaOf(draft).persona, PERSONA);
    assert.equal(dnaOf(draft).identity, '1girl');
    assert.match(sent[0].sourcesText, /名门千金[\s\S]*只会垂下眼睛[\s\S]*冷静克制/);
    assert.equal(asks.length, 0);
    await handleSettingsAction('char-persona-extract:%E5%86%AC%E6%9C%88', ctx);
    assert.match(asks[0], /重新提炼会覆盖现在的内容/);
});

test('gate:persona:expression-set-extracts-once-then-writes-with-it', async () => {
    const caption = {
        v4_prompt: { caption: { base_caption: '1girl', char_captions: [] } },
        v4_negative_prompt: { caption: { base_caption: 'lowres', char_captions: [] } },
    };
    const draft = { bridge: { sceneAssets: { characters: { 冬月: { 默认: 'igs-gen:def' } } } }, readerSettings: {} };
    const summarized = [];
    const written = [];
    const generatedAssets = {
        getImagePrompt: async () => ({ positive: '1girl', negative: 'lowres', caption }),
        summarizeCharacterPersona: async (input) => { summarized.push(input.name); return { ok: true, persona: PERSONA, insufficient: false }; },
        generateExpressionSet: async (input) => {
            written.push(input.dna && input.dna.persona);
            return { ok: true, items: input.moods.map((mood) => ({ mood, ok: true, imageId: `new-${mood}` })) };
        },
        generateExpressionImage: async (input) => {
            written.push(input.dna && input.dna.persona);
            return { ok: true, items: [{ mood: input.mood, ok: true, imageId: 'again' }] };
        },
    };
    const ctx = personaCtx({ draft, generatedAssets });
    const first = await handleSettingsAction('char-expression-set:%E5%86%AC%E6%9C%88', ctx);
    assert.equal(first.ok, true);
    assert.deepEqual(summarized, ['冬月']);
    assert.deepEqual(written, [PERSONA], '写词拿到的就是刚提炼的那段');
    assert.equal(dnaOf(draft).persona, PERSONA);
    // 已经有了就不再提炼，单张重画也带着它。
    await handleSettingsAction(`char-expression-retry:%E5%86%AC%E6%9C%88:${encodeURIComponent('悲伤')}`, ctx);
    assert.deepEqual(summarized, ['冬月']);
    assert.deepEqual(written, [PERSONA, PERSONA]);
});
