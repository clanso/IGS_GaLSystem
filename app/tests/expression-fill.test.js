import test from 'node:test';
import assert from 'node:assert/strict';

import { expressionFillSummary, planExpressionGroup } from '../src/visual/igs-ui/expression-fill.js';

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
    assert.deepEqual(expressionFillSummary({ outcome: { painted: 3, failed: [], skipped: [] } }), { level: 'success', text: '已登记角色补好 3 张表情' });
    const partial = expressionFillSummary({
        outcome: { painted: 1, failed: [{ character: '冬月', outfit: '校服', moods: ['委屈'], error: '超时' }], skipped: [] },
        pendingOutfits: [{ character: '小林', outfit: '睡袍-孕晚期' }],
    });
    assert.equal(partial.level, 'warn');
    assert.equal(partial.text, '已登记角色补好 1 张表情；1 张表情没画成：超时；「小林」的「睡袍-孕晚期」还没建，先到「素材 → 待确认」里新建再补');
    assert.equal(expressionFillSummary({ outcome: { painted: 0, failed: [{ character: '冬月', outfit: '', moods: ['委屈', '喜悦'], error: '插件报错' }], skipped: [] } }).level, 'error');
});
