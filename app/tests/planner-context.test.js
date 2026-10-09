import test from 'node:test';
import assert from 'node:assert/strict';

import { contextBudgetChars, plannerLlmSettings, readPlannerContext, STANDARD_FLOOR_CHARS } from '../src/generated-images/illustration/planner-context.js';
import { normalizeAutoIllustrationSettings } from '../src/generated-images/illustration/auto-illustration-settings.js';
import { buildPlannerUserPrompt } from '../src/generated-images/illustration/planner-prompt.js';
import { buildCharacterAvatarDescription } from '../src/generated-images/dbgen-prompt.js';
import { pickChatMentions } from '../src/host/character-sources.js';
import { createAutoIllustrationService } from '../src/generated-images/illustration/auto-illustration-service.js';
import { createMemoryIllustrationStore } from '../src/media/illustration-store.js';

const filler = (label, count) => Array.from({ length: count }, (_, i) => `${label}第${i + 1}段，${'走'.repeat(60)}。`).join('\n');

test('gate:planner-context:standard-keeps-old-lengths-and-larger-budgets-read-everything', () => {
    assert.equal(normalizeAutoIllustrationSettings({}).llm.contextBudget, 'standard');
    assert.equal(normalizeAutoIllustrationSettings({ llm: { contextBudget: '1000k' } }).llm.contextBudget, '1000k');
    assert.equal(normalizeAutoIllustrationSettings({ llm: { contextBudget: '2m' } }).llm.contextBudget, 'standard');
    const host = {
        readPreviousAiTexts: (id, count) => ['更早的 AI 楼。', '上一楼 AI：' + '旧'.repeat(2000)].slice(-count),
        readPreviousMessages: () => [
            { isUser: false, text: '更早的 AI 楼。' },
            { isUser: true, text: '找了家<b>高级旅馆</b>住下。' },
            { isUser: false, text: '上一楼 AI：' + '旧'.repeat(2000) },
        ],
    };
    const standard = readPlannerContext(host, 9, { contextFloors: 1, contextBudget: 'standard' });
    assert.equal(standard.floorChars, STANDARD_FLOOR_CHARS);
    assert.equal(standard.previousText.length, 1500, '标准长度：前文只取末尾 1500 字，不读用户发言');
    assert.ok(!standard.previousText.includes('高级旅馆'));
    const big = readPlannerContext(host, 9, { contextFloors: 1, contextBudget: '1000k' }, 30000);
    assert.equal(big.floorChars, contextBudgetChars({ contextBudget: '1000k' }) / 2);
    assert.match(big.previousText, /^更早的 AI 楼。\n（用户）找了家 高级旅馆 住下。\n上一楼 AI：/, '加大预算：前文从头读起，连用户发言一起，去掉 HTML');
    assert.equal(plannerLlmSettings({ timeoutMs: 90000, contextBudget: '500k' }).timeoutMs, 600000);
    assert.equal(plannerLlmSettings({ timeoutMs: 90000, contextBudget: 'standard' }).timeoutMs, 90000);
});

test('gate:planner-context:cg-prompt-lists-every-scene-world-and-character-sources', () => {
    const scenes = [
        { scene: '主城区', time: '深夜', weather: '晴', nsfw: false },
        { scene: '主城区', time: '深夜', weather: '晴', nsfw: false },
        { scene: '旅馆客房', time: '清晨', weather: '晴', nsfw: true },
    ];
    const text = buildPlannerUserPrompt({
        numberedText: '1. 正文', scenes, characters: ['柯萝伊'], previousText: '', want: 1, exact: true, isNsfw: true,
        characterSources: [{ name: '柯萝伊', text: '【世界书·设定·柯萝伊】黑发、短发。' }],
        world: { label: '奇幻', summary: '日式奇幻世界。' },
    });
    assert.match(text, /【世界观】\n这个故事的世界观是「奇幻」[\s\S]*世界设定提要：\n日式奇幻世界。/);
    assert.match(text, /【场景】本楼按顺序经过：主城区｜深夜｜晴 → 旅馆客房｜清晨｜晴｜NSFW/);
    assert.match(text, /【角色资料】[^\n]*\n「柯萝伊」：\n【世界书·设定·柯萝伊】黑发、短发。/);
    const single = buildPlannerUserPrompt({ numberedText: '1. x', scenes: [scenes[2]], characters: [], want: 1 });
    assert.match(single, /【场景】旅馆客房｜清晨｜晴｜NSFW/);
});

test('gate:planner-context:cg-planner-reads-whole-long-floor-world-and-sources-with-large-budget', async () => {
    const late = '七楼的湖景套房里，水晶吊灯亮着。';
    const floorText = `[igs-scene:主城区|深夜|晴]\n${filler('前面', 120)}\n[igs-scene:旅馆客房|清晨|晴|NSFW]\n${late}\n[igs-char:柯萝伊|害羞|早安。]`;
    const run = async (contextBudget) => {
        const prompts = [];
        const sourceCalls = [];
        const service = createAutoIllustrationService({
            messageHost: {
                getChatId: () => 'c1',
                readFloor: () => ({ chatId: 'c1', messageId: 5, swipeId: 0, isAi: true, isLatest: true, text: floorText }),
                readPreviousAiTexts: () => [],
                readPreviousMessages: () => [{ isUser: true, text: '找了家高级旅馆住下。' }],
                writeFloor: async () => ({ ok: true }), on: () => () => {}, attachPromptStrip: () => {},
                ensureMarkerRegexes: async () => ({ ok: true }), destroy: () => {},
            },
            llm: { request: async ({ user }, settings) => { prompts.push({ user, settings }); return 'slot: 1\nat: 2\nscene: 1girl, bedroom\nchar: 柯萝伊 | 0.5,0.5 | 1girl, black hair'; } },
            nai: { generate: async () => ({ ok: true, dataUrl: 'data:image/png;base64,AAAA' }) },
            store: createMemoryIllustrationStore(),
            getSettings: () => ({ nsfwEnabled: true, nsfwCount: 1, llm: { contextBudget } }),
            getSceneAssets: () => ({ worldview: 'fantasy', worldSummary: '日式奇幻世界。', characterDna: { 柯萝伊: { identity: '1girl, black hair' } } }),
            readCharacterSources: async (names, options) => { sourceCalls.push([names, options]); return { 柯萝伊: '【世界书·设定·柯萝伊】炼金术师。' }; },
        });
        await service.processMessage(5);
        return { prompt: prompts[0], sourceCalls };
    };
    const standard = await run('standard');
    assert.ok(!standard.prompt.user.includes(late), '标准长度只读本楼前 6000 字');
    assert.match(standard.prompt.user, /【世界观】/, '世界观不论预算都带');
    assert.deepEqual(standard.sourceCalls, [], '标准长度：有 DNA 的角色不另读资料');
    const big = await run('1000k');
    assert.ok(big.prompt.user.includes(late), '加大预算整层都读');
    assert.match(big.prompt.user, /【前文（原文，从早到近）】\n（用户）找了家高级旅馆住下。/);
    assert.deepEqual(big.sourceCalls, [[['柯萝伊'], { large: true }]]);
    assert.match(big.prompt.user, /【角色资料】[\s\S]*炼金术师/);
    assert.equal(big.prompt.settings.timeoutMs, 600000);
});

test('gate:planner-context:avatar-and-default-sprite-sources-include-story-mentions', () => {
    const avatar = buildCharacterAvatarDescription('柯萝伊', null, { sourcesText: '【前文·提到「柯萝伊」的段落】\n柯萝伊的黑发剪得很短。' });
    assert.match(avatar, /「柯萝伊」的资料节选[\s\S]*柯萝伊的黑发剪得很短。/);
    const chat = [
        { mes: '<div class="status">柯萝伊 好感 50</div>' },
        { mes: '柯萝伊的黑发剪得很短。\n无关的一段。' },
        { mes: '系统提示', is_system: true },
    ];
    assert.equal(pickChatMentions(chat, '柯萝伊'), '柯萝伊 好感 50\n柯萝伊的黑发剪得很短。', '去掉 HTML 标签，只留提到名字的段落');
});

test('gate:planner-context:setting-material-reads-whole-card-every-worldbook-and-database', async () => {
    const { pickSettingMaterial } = await import('../src/host/character-sources.js');
    const material = {
        card: { name: '脚本家', description: '描述全文。', personality: '性格全文。', scenario: '场景全文。', first_mes: '开场白。', mes_example: '对话示例。', alternate_greetings: ['备选一。', '备选二。'] },
        books: [{ name: '角色书', entries: [
            { name: '无关', enabled: true, strategy: { keys: ['天气'] }, content: '无关条目全文。' },
            { name: '柯萝伊', enabled: true, strategy: { keys: ['柯萝伊'] }, content: '柯萝伊是炼金术师。' },
            { name: '关掉', enabled: false, strategy: { keys: ['柯萝伊'] }, content: '关掉的条目。' },
        ] }],
        globalBooks: [{ name: '全局书', entries: [{ name: '首都', enabled: true, strategy: { keys: ['首都'] }, content: '首都全文。' }] }],
        tables: null,
        notes: [],
    };
    const text = pickSettingMaterial(material, { names: ['柯萝伊'], limit: 100000 });
    for (const part of ['描述全文。', '性格全文。', '场景全文。', '开场白。', '对话示例。', '备选一。', '备选二。', '无关条目全文。', '柯萝伊是炼金术师。', '首都全文。']) {
        assert.ok(text.includes(part), `应包含：${part}`);
    }
    assert.ok(!text.includes('关掉的条目'));
    assert.ok(text.indexOf('柯萝伊是炼金术师。') < text.indexOf('无关条目全文。'), '提到角色的条目排前面');
    assert.equal(pickSettingMaterial(material, { names: ['柯萝伊'], limit: 0 }), '');
});

test('gate:planner-context:sprite-writing-sends-all-material-and-story-with-large-budget', async () => {
    const { createAssetGenerationService } = await import('../src/generated-images/illustration/asset-generation-service.js');
    const { createMemoryGeneratedAssetStore } = await import('../src/media/generated-asset-store.js');
    const caption = { v4_prompt: { caption: { base_caption: '1girl', char_captions: [] } }, v4_negative_prompt: { caption: { base_caption: '', char_captions: [] } } };
    const run = async ({ contextBudget, via = 'chatu8', ownPrompts = false, moods, outfit }) => {
        const writes = [];
        const materialCalls = [];
        const service = createAssetGenerationService({
            messageHost: {
                getChatId: () => 'c',
                readPreviousAiTexts: () => ['最新一楼。'],
                readPreviousMessages: (id, count) => { assert.equal(id, Number.POSITIVE_INFINITY); return [{ isUser: true, text: '我们去首都。' }, { isUser: false, text: '柯萝伊换上了浅蓝夏裙。' }].slice(-count); },
            },
            llm: {},
            nai: {
                describe: () => ({ via, ownPrompts, ready: { ok: true } }),
                writeDbgenPrompt: async ({ description }) => { writes.push(description); return { ok: true, caption, captions: [{ slotId: 1, caption }, { slotId: 2, caption }] }; },
                generateDbgenCaption: async () => ({ ok: true, dataUrl: 'data:image/png;base64,AAA' }),
            },
            store: createMemoryGeneratedAssetStore(),
            matte: async (url) => url,
            readSettingMaterial: async (names, options) => { materialCalls.push([names, options]); return '【角色卡「脚本家」·描述】描述全文。'; },
            getSettings: () => ({ autoIllustration: { llm: { contextBudget } }, sceneAssets: { characterAliases: { 柯萝伊: ['宫城柯萝伊'] } } }),
        });
        if (outfit) await service.writeWardrobePrompt({ character: '柯萝伊', outfit });
        else if (moods) await service.generateExpressionSet({ name: '柯萝伊', moods, basePrompt: null });
        else await service.generateCharacterSprite({ name: '柯萝伊', dna: { identity: '1girl, black hair' } });
        return { writes, materialCalls };
    };
    const standard = await run({ contextBudget: 'standard' });
    assert.ok(standard.writes[0].startsWith('画角色「柯萝伊」的立绘。'), '标准长度：说明原样');
    assert.deepEqual(standard.materialCalls, []);
    const big = await run({ contextBudget: '1000k' });
    assert.match(big.writes[0], /^下面先给出这个故事的设定资料[\s\S]*【设定资料】\n【角色卡「脚本家」·描述】描述全文。\n\n【正文（原文，从早到近）】\n（用户）我们去首都。\n柯萝伊换上了浅蓝夏裙。\n\n【这次要写的】\n画角色「柯萝伊」的立绘。/);
    assert.deepEqual(big.materialCalls, [[['柯萝伊', '宫城柯萝伊'], { limit: Math.floor(700000 * 0.4) }]]);
    const dbgen = await run({ contextBudget: '1000k', via: 'dbgen', ownPrompts: true });
    assert.ok(dbgen.writes[0].startsWith('画角色「柯萝伊」的立绘。'), '数据库生图插件自己读上下文，不附');
    const expressions = await run({ contextBudget: '1000k', moods: ['喜悦', '愤怒'] });
    assert.equal(expressions.materialCalls.length, 1, '一组表情只读一次资料');
    assert.match(expressions.writes[0], /照正文里这个角色说话做事的样子来定[\s\S]*【这次要写的】\n为角色「柯萝伊」写 2 份立绘表情差分。/);
    // 衣柜服装提示词也一样：加大预算时先附全部资料和正文，提到这件衣服和穿着者的排前面。
    const wardrobeStandard = await run({ contextBudget: 'standard', outfit: '白色泳装' });
    assert.ok(wardrobeStandard.writes[0].startsWith('为服装「白色泳装」写一份生图用的服装提示词。'));
    const wardrobe = await run({ contextBudget: '1000k', outfit: '白色泳装' });
    assert.match(wardrobe.writes[0], /^下面先给出这个故事的设定资料（角色卡、世界书、数据库）和正文原文，供你把服装「白色泳装」写准[\s\S]*【正文（原文，从早到近）】\n（用户）我们去首都。[\s\S]*【这次要写的】\n为服装「白色泳装」写一份生图用的服装提示词。/);
    assert.deepEqual(wardrobe.materialCalls[0][0], ['白色泳装', '柯萝伊', '宫城柯萝伊']);
});
