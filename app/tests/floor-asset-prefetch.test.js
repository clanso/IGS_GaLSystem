import test from 'node:test';
import assert from 'node:assert/strict';

import { collectFloorAssetUrls } from '../src/visual/igs-ui/floor-asset-prefetch.js';

const sceneAssets = {
    enabled: true,
    scenes: { 教室: { url: 'class.png', times: {} }, 天台: { url: 'roof.png', times: {} } },
    characters: {
        冬月: { 默认: 'igs-gen:base', 喜悦: 'igs-gen:joy' },
        小林: { 默认: 'lin.png', 平和: 'lin-calm.png' },
    },
    characterAliases: {},
    characterOutfits: {},
};

test('gate:floor-assets:collects-every-sprite-and-background-in-the-floor', () => {
    const urls = collectFloorAssetUrls({
        source: [
            '[igs-scene:教室|白天|晴]',
            '[igs-char:冬月|喜悦|你好]',
            '旁白走了一段。',
            '[igs-char:小林|平和|嗯]',
            '[igs-scene:天台|黄昏|晴]',
            '[igs-thought:冬月|默认|风好大]',
        ].join('\n'),
        sceneAssets,
        assetMatchCtx: { sceneAssets },
        imageSlots: [{ url: 'cg-1.png' }, { url: '' }, { url: 'cg-1.png' }],
    });
    assert.deepEqual(urls, ['cg-1.png', 'class.png', 'igs-gen:joy', 'lin-calm.png', 'roof.png', 'igs-gen:base']);
});

test('gate:floor-assets:skips-narrators-and-keeps-inherited-background', () => {
    const urls = collectFloorAssetUrls({
        source: '[igs-char:旁白|平和|天黑了]\n[igs-char:冬月|默认|我在]',
        sceneAssets,
        inheritedScene: { scene: '教室', time: '夜晚', nsfw: false },
        assetMatchCtx: { sceneAssets },
    });
    assert.deepEqual(urls, ['class.png', 'igs-gen:base']);
});

test('gate:floor-assets:missing-expressions-only-the-moods-each-registered-outfit-uses', async () => {
    const { collectMissingExpressions } = await import('../src/visual/igs-ui/floor-asset-prefetch.js');
    const assets = {
        ...sceneAssets,
        characterOutfits: {
            冬月: { 校服: { words: [], moods: { 平和: 'igs-gen:uniform-calm' } } },
            小林: { 睡袍: { words: [], moods: {} } },
        },
    };
    const missing = collectMissingExpressions({
        source: [
            '[igs-scene:教室|白天|晴]',
            '[igs-char:冬月|开心|校服|早]',
            '[igs-char:冬月|平静|还行]',
            '[igs-char:冬月|委屈|你又这样]',
            '[igs-char:冬月|高兴|算了]',
            '[igs-char:冬月|严肃|说正事]',
            '[igs-char:小林|生气|喂]',
            '[igs-char:小林|害羞|睡袍-孕晚期|别看]',
            '[igs-char:路人|生气|让开]',
            '[igs-char:冬月|咕咕|嗯？]',
        ].join('\n'),
        sceneAssets: assets,
    });
    // 冬月穿校服：开心 / 高兴归「喜悦」只补一张，平静归「平和」已有，严肃归「默认」不补；小林原装缺「愤怒」。
    assert.deepEqual(missing.groups, [
        { character: '冬月', outfit: '校服', moods: ['喜悦', '委屈'] },
        { character: '小林', outfit: '', moods: ['愤怒'] },
    ]);
    // 还没登记的「睡袍-孕晚期」不能当原装或「睡袍」去画；归不进情绪组的词单独列出；没登记的路人交给素材补全。
    assert.deepEqual(missing.pendingOutfits, [{ character: '小林', outfit: '睡袍-孕晚期' }]);
    assert.deepEqual(missing.unmapped, [{ character: '冬月', mood: '咕咕' }]);
});

test('gate:floor-assets:missing-expressions-follows-inherited-outfit-and-needs-scene-assets', async () => {
    const { collectMissingExpressions } = await import('../src/visual/igs-ui/floor-asset-prefetch.js');
    const assets = { ...sceneAssets, characterOutfits: { 冬月: { 校服: { words: [], moods: {} } } } };
    const source = '[igs-char:冬月|喜悦|又见面了]';
    assert.deepEqual(collectMissingExpressions({ source, sceneAssets: assets }).groups, [], '原装已有「喜悦」');
    assert.deepEqual(
        collectMissingExpressions({ source, sceneAssets: assets, inheritedOutfits: { 冬月: '校服' } }).groups,
        [{ character: '冬月', outfit: '校服', moods: ['喜悦'] }],
        '上一楼换上的校服接着穿',
    );
    assert.deepEqual(collectMissingExpressions({ source, sceneAssets: { ...assets, enabled: false }, inheritedOutfits: { 冬月: '校服' } }).groups, []);
});
