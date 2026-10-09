import test from 'node:test';
import assert from 'node:assert/strict';

import { expressionFillQuestion, expressionFillSummary, fillFloorExpressions, planExpressionGroup } from '../src/visual/igs-ui/expression-fill.js';

const prompts = { base: { positive: '1girl, long hair' }, uniform: { positive: '1girl, school uniform' } };
const service = { async getImagePrompt(id) { return prompts[id] || null; } };

test('gate:expression-fill:new-outfit-writes-from-the-base-sprite-with-wardrobe-clothes', async () => {
    const assets = {
        characters: { 冬月: { 默认: 'igs-gen:base' } },
        characterOutfits: { 冬月: { 泳装: { words: ['比基尼'], moods: {} } } },
        wardrobe: { 泳装: { prompt: 'white bikini' } },
    };
    const plan = await planExpressionGroup({ service, assets, name: '冬月', outfitName: '泳装', moods: ['委屈', '喜悦'] });
    assert.equal(plan.ok, true);
    assert.deepEqual(plan.writeLabels, ['委屈', '喜悦']);
    assert.deepEqual(plan.basePrompt, prompts.base, '这套还没有自己的图：照原装那张写，换上衣柜里的衣服');
    assert.deepEqual(plan.outfit, { name: '泳装', words: ['比基尼'], ownImage: false, prompt: 'white bikini', nude: false, nsfwBoost: false });
});

test('gate:expression-fill:reuses-written-prompts-and-skips-filled-slots', async () => {
    const assets = {
        characters: { 冬月: { 默认: 'igs-gen:base' } },
        characterOutfits: { 冬月: { 校服: { words: [], moods: { 平和: 'igs-gen:uniform', 委屈: '' } } } },
        generated: { expressionNotes: { '冬月\u0001校服': { 委屈: { caption: { scene: 'pout' }, error: '超时' } } } },
    };
    const plan = await planExpressionGroup({ service, assets, name: '冬月', outfitName: '校服', moods: ['平和', '委屈', '喜悦', '默认'] });
    assert.deepEqual(plan.paintItems, [{ mood: '委屈', caption: { scene: 'pout' } }], '上次写好词没画出来的直接补画');
    assert.deepEqual(plan.writeLabels, ['喜悦']);
    assert.deepEqual(plan.basePrompt, prompts.uniform, '有自己的图就照这套服装的图写');
});

test('gate:expression-fill:needs-a-generated-sprite-with-a-prompt', async () => {
    const assets = { characters: { 小林: { 默认: 'https://example.com/lin.png' } } };
    const plan = await planExpressionGroup({ service, assets, name: '小林', moods: ['愤怒'] });
    assert.equal(plan.ok, false);
    assert.equal(plan.reason, 'no-base-prompt');
});

test('gate:expression-fill:summary-says-what-was-painted-and-what-could-not-be', () => {
    assert.equal(expressionFillSummary({}), null);
    assert.deepEqual(expressionFillSummary({ outcome: { painted: 3, created: [], failed: [], skipped: [], notes: [] } }), { level: 'success', text: '已登记角色补好 3 张表情' });
    const partial = expressionFillSummary({
        outcome: { painted: 1, created: [{ character: '小林', outfit: '睡袍-孕晚期' }], failed: [{ character: '冬月', outfit: '校服', moods: ['委屈'], error: '超时' }], skipped: [], notes: [] },
    });
    assert.equal(partial.level, 'warn');
    assert.equal(partial.text, '新建服装 小林「睡袍-孕晚期」；已登记角色补好 1 张表情；1 张表情没画成：超时');
    assert.equal(expressionFillSummary({ outcome: { painted: 0, created: [], failed: [{ character: '冬月', outfit: '', moods: ['委屈', '喜悦'], error: '插件报错' }], skipped: [], notes: [] } }).level, 'error');
});

test('gate:expression-fill:new-outfit-in-the-story-is-created-without-the-wardrobe-and-drawn-from-the-story', async () => {
    // 一份素材库（全局），save 直接改它；没打开设置也没有角色卡时阅读器就是这样存的。
    const library = {
        characters: { 阿黛尔: { 默认: 'igs-gen:base' } },
        characterDna: { 阿黛尔: { persona: '温柔' } },
        characterOutfits: { 阿黛尔: { 丝质睡袍: { words: [], moods: { 平和: 'igs-gen:robe' } } } },
        wardrobe: {},
    };
    const saved = [];
    const clueCalls = [];
    const calls = [];
    const fake = {
        ...service,
        async writeWardrobePrompt() { throw new Error('不写衣柜'); },
        async generateExpressionSet(args) {
            calls.push(args);
            return { ok: true, items: args.moods.map((mood, i) => ({ mood, ok: true, imageId: `swim${i + 1}` })) };
        },
    };
    const outcome = await fillFloorExpressions({
        groups: [{ character: '阿黛尔', outfit: '墨绿泳装-孕中期', create: true, moods: ['害羞', '喜悦'] }],
        service: fake,
        readAssets: () => JSON.parse(JSON.stringify(library)),
        save: (field, name, mutator) => { saved.push(field); mutator(library); return true; },
        getWorld: async () => ({ label: '近代欧洲', summary: '' }),
        outfitClues: async (character, clothes) => { clueCalls.push([character, clothes]); return { context: '阿黛尔换上了墨绿色的连体泳衣。', clues: '' }; },
    });
    // 照「待确认 → 新建」建在阿黛尔名下（挂上前半段的名字），衣柜一条都不写。
    assert.deepEqual(library.characterOutfits.阿黛尔['墨绿泳装-孕中期'], { words: [], moods: { 害羞: 'igs-gen:swim1', 喜悦: 'igs-gen:swim2' }, wardrobe: '墨绿泳装' });
    assert.deepEqual(library.wardrobe, {});
    assert.deepEqual(saved, ['characterOutfits', 'characterOutfits']);
    // 这套还没有自己的图：照原装写，衣服按正文里写「墨绿泳装」的段落画。
    assert.deepEqual(clueCalls, [['阿黛尔', '墨绿泳装']]);
    assert.deepEqual(calls[0].moods, ['害羞', '喜悦']);
    assert.deepEqual(calls[0].basePrompt, prompts.base);
    assert.deepEqual([calls[0].outfit.ownImage, calls[0].outfit.prompt, calls[0].outfit.clothesName, calls[0].outfit.story], [false, '', '墨绿泳装', '阿黛尔换上了墨绿色的连体泳衣。']);
    assert.deepEqual([outcome.painted, outcome.created.length], [2, 1]);
    assert.equal(library.characterOutfits.阿黛尔.丝质睡袍.moods.平和, 'igs-gen:robe', '别的服装不动');
});

test('gate:expression-fill:question-lists-each-outfit-and-marks-new-ones', () => {
    const question = expressionFillQuestion([
        { character: '柯萝伊', outfit: '薄睡裙', moods: ['委屈'] },
        { character: '柯萝伊', outfit: '白色泳装', create: true, moods: ['害羞', '喜悦'] },
    ]);
    assert.equal(question, [
        '本楼已登记的角色还有 3 张表情没有图：',
        '柯萝伊（薄睡裙）：委屈',
        '柯萝伊（白色泳装，新服装）：害羞、喜悦',
        '新服装会先建好（不写衣柜），衣服照正文和资料里的描写画。',
        '要补上这几张吗？写词和设置里的「表情差分」一样，已有的图不动。',
    ].join('\n'));
});
