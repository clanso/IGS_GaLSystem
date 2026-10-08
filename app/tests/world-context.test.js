import test from 'node:test';
import assert from 'node:assert/strict';
import { draftEffectiveAssets, effectiveSceneAssets, normalizeAssetCards } from '../src/scene/asset-scope.js';
import { worldContextOf } from '../src/scene/worldview.js';
import {
    buildCharacterAvatarDescription,
    buildCharacterSpriteDescription,
    buildDbgenSpriteBatchDescription,
    buildExpressionDiffDescription,
    buildWardrobeClothingDescription,
    worldContextLines,
} from '../src/generated-images/dbgen-prompt.js';
import { buildAssetPlannerUserPrompt } from '../src/generated-images/illustration/asset-prompt.js';
import { pickCharacterSources, pickChatMentions, pickWorldText, readSourceMaterial } from '../src/host/character-sources.js';
import { writeWorldSummary } from '../src/generated-images/illustration/persona-writer.js';
import { handleSettingsAction } from '../src/visual/igs-ui/settings-actions.js';

const WORLD = { id: 'ancient', label: '古代', summary: '架空王朝，丝绸襦裙常见；不出现现代衣物。' };

test('gate:world:summary-follows-the-card-even-without-a-worldview', () => {
    const root = { worldview: 'modern', worldSummary: '全局提要', cards: {
        有世界观: { worldview: 'ancient', worldSummary: '  王朝  ' },
        只有提要: { worldSummary: '星际殖民地' },
        空卡: { worldSummary: '   ' },
    } };
    normalizeAssetCards(root);
    assert.equal(root.cards['只有提要'].worldSummary, '星际殖民地', '只写了提要的卡也留住');
    assert.equal(Object.hasOwn(root.cards['空卡'], 'worldSummary'), false);
    assert.deepEqual(worldContextOf(effectiveSceneAssets(root, '有世界观')), { id: 'ancient', label: '古代', summary: '王朝' });
    assert.deepEqual(worldContextOf(effectiveSceneAssets(root, '只有提要')), { id: 'modern', label: '现代', summary: '星际殖民地' });
    assert.equal(worldContextOf(effectiveSceneAssets(root, '空卡')).summary, '全局提要', '卡里没写就用全局的');
    assert.deepEqual(worldContextOf(null), { id: 'modern', label: '现代', summary: '' });
});

test('gate:world:every-character-writer-carries-world-lines', () => {
    assert.deepEqual(worldContextLines(null), []);
    assert.deepEqual(worldContextLines({ label: '', summary: '' }), []);
    const lines = worldContextLines(WORLD);
    assert.match(lines[0], /^这个故事的世界观是「古代」。服装、发型、饰品和随身物品都要符合这个世界，不要画出不属于这个世界的东西。$/);
    assert.equal(lines[1], `世界设定提要：\n${WORLD.summary}`);
    const has = (text) => text.includes(lines[0]) && text.includes(lines[1]);
    assert.ok(has(buildCharacterSpriteDescription('冬月', null, { world: WORLD })));
    assert.ok(has(buildCharacterAvatarDescription('冬月', null, { world: WORLD })));
    assert.ok(has(buildExpressionDiffDescription('冬月', null, ['喜悦'], null, null, { world: WORLD })));
    assert.ok(has(buildWardrobeClothingDescription('', '浴衣', { world: WORLD })));
    assert.ok(has(buildDbgenSpriteBatchDescription([{ name: '路人' }], { world: WORLD })));
    // 不传世界背景时说明和原来一样。
    assert.doesNotMatch(buildCharacterSpriteDescription('冬月', null), /世界观/);
});

test('gate:world:default-sprite-gets-character-sources-after-dna', () => {
    const dna = { identity: '1girl, silver hair' };
    const text = buildCharacterSpriteDescription('冬月', dna, { world: WORLD, sourcesText: '【角色卡·描述】冬月是名门千金。' });
    assert.ok(text.indexOf('固定身份') < text.indexOf('资料节选'), 'DNA 在前、资料在后，长相以 DNA 为准');
    assert.match(text, /长相和服装以角色设定（DNA）为准；设定没写到的按这些资料补，只取长相、穿着和身份气质，资料里的剧情不要画进去：\n【角色卡·描述】冬月是名门千金。/);
    const batch = buildDbgenSpriteBatchDescription([{ name: '路人', sources: '【世界书·设定·路人】卖花的老人。' }]);
    assert.match(batch, /第 1 份：\n下面是「路人」的资料节选（每段开头标了出处/);
    const planner = buildAssetPlannerUserPrompt({ needs: [{ type: 'sprite', name: '路人', sources: '卖花的老人。' }], readableText: '正文', world: WORLD });
    assert.match(planner, /【世界观】\n这个故事的世界观是「古代」/);
    assert.match(planner, /【角色资料】[^\n]*\nch1「路人」：\n卖花的老人。/);
});

test('gate:world:wardrobe-uses-world-and-story-text-but-never-the-wearer-name', () => {
    const text = buildWardrobeClothingDescription('冬月', '浴衣', { world: WORLD, context: '冬月换上了绣着白鹤的月白色浴衣。', clues: '穿着打扮：月白色浴衣' });
    assert.match(text, /正文里对这套衣服的描写（只取衣服本身[^\n]*）：\n冬月换上了绣着白鹤的月白色浴衣。/);
    assert.match(text, /数据库里的穿着记录（同样只取衣服本身）：\n穿着打扮：月白色浴衣/);
    // 衣柜按服装名共用：说明里自己不点名是谁穿的（正文原文里带名字是原样引用）。
    assert.doesNotMatch(text.replace('冬月换上了绣着白鹤的月白色浴衣。', ''), /冬月/);
});

const chat = [
    { mes: '很久以前的一层，提到浴衣。', is_user: false },
    ...Array.from({ length: 30 }, (_, i) => ({ mes: `第${i}层正文。`, is_user: false })),
    { mes: '系统：浴衣活动开始', is_system: true },
    { mes: '冬月换上浴衣。\n天气很好。\n浴衣上绣着白鹤。', is_user: false },
];

test('gate:world:sources-for-world-and-outfit-context', () => {
    const material = {
        card: { name: '冬月', scenario: '故事发生在一个架空王朝。' },
        books: [{ name: '设定', entries: [
            { name: '世界', enabled: true, strategy: { type: 'constant', keys: [] }, content: '王朝以丝绸闻名。' },
            { name: '关掉的常驻', enabled: false, strategy: { type: 'constant', keys: [] }, content: '不该出现' },
            { name: '绿灯', enabled: true, strategy: { type: 'selective', keys: ['冬月'] }, content: '冬月的身世。' },
        ] }],
        tables: null,
        notes: [],
        chat,
    };
    assert.equal(pickWorldText(material), '【角色卡·场景】\n故事发生在一个架空王朝。\n【世界书·设定·世界】\n王朝以丝绸闻名。');
    assert.equal(pickWorldText({ card: null, books: [] }), '');
    // 服装上下文：只看最近 30 层、不看系统消息，只留提到服装名的那几行。
    assert.equal(pickChatMentions(chat, '浴衣'), '冬月换上浴衣。\n浴衣上绣着白鹤。');
    assert.equal(pickChatMentions(chat, '浴衣', { limit: 10 }), '浴衣上绣着白鹤。', '超长时留最近的');
    assert.equal(pickChatMentions(chat, ''), '');
    assert.match(pickCharacterSources(material, { name: '冬月' }).worldbook, /冬月的身世/);
});

test('gate:world:writer-asks-for-drawable-setting-and-things-to-avoid', async () => {
    const asked = [];
    const llm = { request: async (req) => { asked.push(req); return WORLD.summary; } };
    assert.deepEqual(await writeWorldSummary(llm, { source: 'tavern' }, { label: '古代', sourcesText: '【角色卡·场景】架空王朝。' }), { ok: true, summary: WORLD.summary, insufficient: false });
    assert.match(asked[0].user, /^IGS 里选的世界观：古代\n\n资料：\n【角色卡·场景】架空王朝。/);
    assert.match(asked[0].system, /服装与发型的风格[\s\S]*不该出现的东西/);
    const thin = await writeWorldSummary({ request: async () => '资料不足' }, { source: 'tavern' }, { label: '现代', sourcesText: 'x' });
    assert.equal(thin.insufficient, true);
});

function fakeTavern() {
    return {
        alert() {},
        document: { getElementById() { return null; } },
        SillyTavern: { getContext: () => ({
            characters: [{ name: '冬月', description: '冬月是名门千金。', scenario: '故事发生在一个架空王朝。' }],
            characterId: 0,
            chat: [{ mes: '冬月换上了月白色浴衣。', is_user: false }],
        }) },
        TavernHelper: {
            getCharWorldbookNames: () => ({ primary: '设定', additional: [] }),
            getChatWorldbookName: () => null,
            getWorldbook: async () => [{ name: '世界', enabled: true, strategy: { type: 'constant', keys: [] }, content: '王朝以丝绸闻名。' }],
        },
    };
}

function ctxWith({ draft, generatedAssets, asks = [] }) {
    return {
        state: { activeSettings: { draft, asyncState: {} } },
        options: { global: fakeTavern(), generatedAssets },
        persistSettingsDraft: () => ({ ok: true }),
        rerenderSettings: () => ({ ok: true }),
        dialogs: { confirm: async (message) => { asks.push(message); return true; }, view: async () => {} },
    };
}

test('gate:world:settings-extract-saves-summary-and-asks-before-overwrite', async () => {
    const draft = { bridge: { sceneAssets: { worldview: 'ancient', ancient: true } }, readerSettings: {} };
    const sent = [];
    const asks = [];
    const ctx = ctxWith({ draft, asks, generatedAssets: { summarizeWorldSetting: async (input) => { sent.push(input); return { ok: true, summary: WORLD.summary, insufficient: false }; } } });
    await handleSettingsAction('world-summary-extract', ctx);
    // 打开着角色卡：提要存进这张卡的素材（和世界观同一处），读合并后的结果。
    assert.equal(worldContextOf(draftEffectiveAssets(ctx.state.activeSettings)).summary, WORLD.summary);
    assert.equal(draft.bridge.sceneAssets.worldSummary, undefined, '不写进全局');
    assert.equal(sent[0].label, '古代');
    assert.match(sent[0].sourcesText, /架空王朝[\s\S]*王朝以丝绸闻名/);
    assert.equal(asks.length, 0);
    await handleSettingsAction('world-summary-extract', ctx);
    assert.match(asks[0], /重新提炼会覆盖现在的内容/);
});

test('gate:world:default-sprite-extracts-world-once-and-sends-sources', async () => {
    const draft = { bridge: { sceneAssets: { worldview: 'ancient', ancient: true, characters: { 冬月: { 默认: '' } } } }, readerSettings: {} };
    const summarized = [];
    const painted = [];
    const generatedAssets = {
        summarizeWorldSetting: async () => { summarized.push(1); return { ok: true, summary: WORLD.summary, insufficient: false }; },
        generateCharacterSprite: async (input) => { painted.push(input); return { ok: true, imageId: `img${painted.length}` }; },
    };
    const ctx = ctxWith({ draft, generatedAssets });
    ctx.dialogs.prompt = async () => '';
    ctx.dialogs.edit = async () => '';
    await handleSettingsAction('char-generate-sprite:%E5%86%AC%E6%9C%88', ctx);
    assert.equal(summarized.length, 1);
    assert.deepEqual(painted[0].world, { id: 'ancient', label: '古代', summary: WORLD.summary });
    assert.match(painted[0].sourcesText, /冬月是名门千金/);
    assert.equal(painted[0].dna, null, 'DNA 不动');
    await handleSettingsAction('char-generate-sprite:%E5%86%AC%E6%9C%88', ctx);
    assert.equal(summarized.length, 1, '已有提要就不再提炼');
    assert.equal(painted[1].world.summary, WORLD.summary);
});

test('gate:world:wardrobe-prompt-gets-world-and-story-text', async () => {
    const draft = { bridge: { sceneAssets: { worldview: 'ancient', ancient: true, worldSummary: WORLD.summary, wardrobe: { 浴衣: { prompt: '' } } } }, readerSettings: {} };
    const written = [];
    const generatedAssets = { writeWardrobePrompt: async (input) => { written.push(input); return { ok: true, prompt: 'yukata, white crane pattern' }; } };
    const ctx = ctxWith({ draft, generatedAssets });
    await handleSettingsAction(`wardrobe-generate-prompt:${encodeURIComponent('浴衣')}`, ctx);
    assert.equal(written[0].outfit, '浴衣');
    assert.equal(written[0].world.summary, WORLD.summary);
    assert.equal(written[0].context, '冬月换上了月白色浴衣。');
    assert.equal(draft.bridge.sceneAssets.wardrobe['浴衣'].prompt, 'yukata, white crane pattern');
});

test('gate:world:read-source-material-collects-chat-for-outfits', async () => {
    const material = await readSourceMaterial(fakeTavern());
    assert.equal(material.chat.length, 1);
    assert.equal(material.books[0].name, '设定');
});

test('gate:world:rules-page-shows-editable-summary-and-extract-button', async () => {
    const { bootstrapIGS } = await import('../src/index.js');
    const vn = bootstrapIGS({ global: {}, autoAttachMagicWand: false, hostAdapter: { getCurrentMessage: async () => null, typeAndSend: async () => ({ ok: true }) } });
    try {
        const controller = vn.openSettings({ tab: 'scene', mode: 'pc' }).controller;
        controller.setValue('bridge.sceneAssets.worldview', 'fantasy');
        let html = controller.switchSceneSubTab('rules').html || controller.getSnapshot().html;
        assert.match(html, /data-world-section>[\s\S]*世界设定提要[\s\S]*当前世界观：西幻（在首页「适配世界」里改）/);
        assert.match(html, /data-world-summary="1" aria-label="世界设定提要" placeholder="例：[^"]*"><\/textarea>/);
        assert.match(html, /data-action="world-summary-extract">从角色卡 \/ 世界书提炼</);
        controller.setValue('bridge.sceneAssets.worldSummary', '剑与魔法的大陆。');
        html = controller.getSnapshot().html;
        assert.match(html, /data-world-summary="1"[^>]*>剑与魔法的大陆。<\/textarea>/);
        assert.match(html, />重新从资料提炼</);
        controller.close();
    } finally {
        vn.destroy();
    }
});
