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
    assert.match(big.prompt.user, /【前文摘要】\n（用户）找了家高级旅馆住下。/);
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
