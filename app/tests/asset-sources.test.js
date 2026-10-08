import test from 'node:test';
import assert from 'node:assert/strict';

import { pickSceneSources } from '../src/host/character-sources.js';
import { buildDbgenAssetDescription, buildDbgenBackgroundBatchDescription } from '../src/generated-images/dbgen-prompt.js';
import { createAssetGenerationService } from '../src/generated-images/illustration/asset-generation-service.js';
import { createMemoryGeneratedAssetStore } from '../src/media/generated-asset-store.js';

test('gate:asset-sources:scene-sources-pick-card-and-worldbook-by-place-name', () => {
    const material = {
        card: { name: '冬月', description: '冬月是名门千金。\n\n金华酒店大堂铺着大理石，挂着水晶吊灯。', scenario: '故事从金华酒店大堂开始。', personality: '金华酒店大堂的常客。' },
        books: [{ name: '设定', entries: [
            { name: '金华酒店', enabled: true, strategy: { keys: ['金华酒店'] }, content: '本市最豪华的五星级酒店。' },
            { name: '单字', enabled: true, strategy: { keys: ['店'] }, content: '无关条目。' },
            { name: '关闭', enabled: false, strategy: { keys: ['金华酒店'] }, content: '关掉的条目。' },
        ] }],
        tables: null,
        notes: [],
    };
    const picked = pickSceneSources(material, { name: '金华酒店大堂' });
    assert.match(picked.card, /【角色卡·描述】\n金华酒店大堂铺着大理石/);
    assert.match(picked.card, /【角色卡·场景】\n故事从金华酒店大堂开始/);
    assert.ok(!picked.card.includes('名门千金') && !picked.card.includes('常客'), '只取描述和场景栏里提到地点的段落');
    assert.match(picked.worldbook, /本市最豪华的五星级酒店/, '关键词被地点名包含也算命中');
    assert.ok(!picked.worldbook.includes('无关条目') && !picked.worldbook.includes('关掉的条目'));
    assert.deepEqual(pickSceneSources(material, { name: '' }).card, '');
});

test('gate:asset-sources:dbgen-background-descriptions-carry-scene-sources', () => {
    const batch = buildDbgenBackgroundBatchDescription([{ name: '豪华旅馆', time: '夜晚', sources: '【世界书·设定·豪华旅馆】五星级。' }, { name: '小巷' }]);
    assert.match(batch, /第 1 份：\n下面是地点「豪华旅馆」的资料节选[^\n]*\n【世界书·设定·豪华旅馆】五星级。/);
    assert.ok(!batch.includes('第 2 份'), '没有资料的不列');
    assert.match(buildDbgenAssetDescription({ type: 'background', name: '豪华旅馆', sources: '五星级。' }), /地点「豪华旅馆」的资料节选[\s\S]*五星级。/);
    assert.match(buildDbgenAssetDescription({ type: 'sprite', name: '路人', sources: '卖花的老人。' }), /「路人」的资料节选[\s\S]*卖花的老人。/);
});

test('gate:asset-sources:planner-gets-scene-sources-and-earlier-mentions-for-backgrounds-and-sprites', async () => {
    const floorText = '[igs-scene:豪华旅馆|夜晚|晴]\n他们推门进了房间。\n[igs-char:神秘少女|平静|你来了。]';
    const history = [
        '他们走进豪华旅馆，大堂挂着水晶吊灯，地面是大理石。\n路边有家便利店。',
        '神秘少女披着黑色斗篷，银色长发。',
        '豪华旅馆的走廊铺着红地毯。',
    ];
    const calls = { history: [], scenes: [], characters: [], prompts: [] };
    const service = createAssetGenerationService({
        messageHost: {
            getChatId: () => 'c',
            readFloor: () => ({ chatId: 'c', messageId: 9, swipeId: 0, isAi: true, isLatest: true, text: floorText }),
            readPreviousAiTexts: (messageId, count) => { calls.history.push([messageId, count]); return history.slice(-count); },
        },
        llm: { async request({ user }) { calls.prompts.push(user); return 'id: bg1\ntags: luxury hotel room, chandelier\nid: ch2\ntags: 1girl, silver hair, black cloak'; } },
        nai: { async generate() { return { ok: true, dataUrl: 'data:image/png;base64,AAA' }; } },
        store: createMemoryGeneratedAssetStore(),
        matte: async (url) => url,
        readSceneSources: async (names) => { calls.scenes.push(names); return { 豪华旅馆: '【世界书·设定·豪华旅馆】本市最豪华的五星级酒店。' }; },
        readCharacterSources: async (names) => { calls.characters.push(names); return {}; },
        getSettings: () => ({
            autoIllustration: { assets: { spriteEnabled: true, backgroundEnabled: true } },
            sceneAssets: { enabled: true, scenes: {}, characters: {} },
        }),
    });
    const result = await service.processMessage(9, { manual: true });
    assert.deepEqual([result.ok, result.count], [true, 2]);
    assert.deepEqual(calls.scenes, [['豪华旅馆']]);
    assert.deepEqual(calls.characters, [['神秘少女']]);
    assert.deepEqual(calls.history, [[9, 30]], '前文只读一次，往前看 30 层');
    const prompt = calls.prompts[0];
    assert.match(prompt, /【场景资料】[^\n]*\nbg1「豪华旅馆」：\n【世界书·设定·豪华旅馆】本市最豪华的五星级酒店。\n\n【前文·提到「豪华旅馆」的段落】\n他们走进豪华旅馆，大堂挂着水晶吊灯，地面是大理石。/);
    assert.ok(!prompt.includes('便利店'), '只取提到地点的段落');
    assert.match(prompt, /【角色资料】[^\n]*\nch2「神秘少女」：\n【前文·提到「神秘少女」的段落】\n神秘少女披着黑色斗篷，银色长发。/);
    assert.match(prompt, /【前文摘要】\n豪华旅馆的走廊铺着红地毯。/);
    assert.equal(prompt.split('红地毯').length - 1, 1, '已在前文摘要里的段落不再重复');
});
