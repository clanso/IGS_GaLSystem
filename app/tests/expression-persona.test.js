import test from 'node:test';
import assert from 'node:assert/strict';
import { applyMoodToCaption } from '../src/generated-images/dbgen-prompt.js';
import { moodPresetTags, normalizeMoodGroups, resolveMoodExpressionTags } from '../src/scene/mood-groups.js';
import { mergeLabelGroups } from '../src/scene/card-pack.js';

const charCaption = (text) => ({
    v4_prompt: { caption: { base_caption: 'solo', char_captions: [{ char_caption: text, centers: [{ x: 0.5, y: 0.5 }] }] } },
    v4_negative_prompt: { caption: { base_caption: '', char_captions: [{ char_caption: '', centers: [{ x: 0.5, y: 0.5 }] }] } },
});
const charText = (caption) => caption.v4_prompt.caption.char_captions[0].char_caption;

test('gate:expression-tags:preset-tags-are-never-added-unless-the-group-says-always', () => {
    // 内敛角色的委屈：写词写了克制的表情，不叠噘嘴、脸红那一套。
    const restrained = charCaption('1girl, downcast eyes, slight frown, hands clasped');
    assert.equal(applyMoodToCaption(restrained, '委屈'), restrained);
    // 写词漏写表情也不兜底：表情全按写词的来。
    const missing = charCaption('1girl, expressionless, black hair');
    assert.equal(applyMoodToCaption(missing, '委屈'), missing);
    // 只有打开「固定加上」才放，并去掉照抄的无表情词。
    const forced = applyMoodToCaption(missing, '委屈', { groups: [{ label: '委屈', words: [], alwaysTags: true }] });
    assert.match(charText(forced), new RegExp(`^${moodPresetTags('委屈').split(', ')[0]}`));
    assert.doesNotMatch(charText(forced), /expressionless/);
    const plain = charCaption('1girl');
    assert.equal(applyMoodToCaption(plain, '默认', { groups: [{ label: '默认', words: [], alwaysTags: true }] }), plain, '默认组不动');
});

test('gate:expression-tags:group-settings-force-or-replace-tags', () => {
    const written = charCaption('1girl, gentle smile');
    // 爱恋打开「固定加上」：写了表情也照样放到最前。
    const always = [{ label: '爱恋', words: [], alwaysTags: true }];
    assert.match(charText(applyMoodToCaption(written, '爱恋', { groups: always })), new RegExp(`^${moodPresetTags('爱恋')}`));
    // 自己改过的 tag 替换预设（开着「固定加上」才放），NSFW 下的「动情」也用改过的。
    const custom = [{ label: '委屈', words: [], tags: 'downcast eyes, trembling lips', alwaysTags: true }, { label: '动情', words: [], tags: 'soft gaze', alwaysTags: true }];
    assert.match(charText(applyMoodToCaption(charCaption('1girl'), '委屈', { groups: custom })), /^downcast eyes, trembling lips/);
    assert.match(charText(applyMoodToCaption(written, '动情', { groups: custom, nsfw: true })), /^soft gaze/);
    assert.deepEqual(resolveMoodExpressionTags('动情', [], { nsfw: true }), { tags: moodPresetTags('动情', { nsfw: true }), always: false });
    // 自建组没有预设，填了 tag 并打开「固定加上」才会用。
    const bare = charCaption('1girl');
    assert.equal(applyMoodToCaption(bare, '发呆'), bare, '自建组没填 tag 就不动');
    assert.equal(applyMoodToCaption(bare, '发呆', { groups: [{ label: '发呆', words: [], tags: 'blank stare' }] }), bare, '填了 tag 但没打开固定加上也不动');
    assert.match(charText(applyMoodToCaption(charCaption('1girl'), '发呆', { groups: [{ label: '发呆', words: [], tags: 'blank stare', alwaysTags: true }] })), /^blank stare/);
});

test('gate:expression-tags:group-settings-survive-normalize-and-merge', () => {
    const groups = normalizeMoodGroups([
        { label: '爱恋', words: ['喜欢'], alwaysTags: true, tags: '  blush ,  gentle smile ' },
        { label: '委屈', words: ['委屈'], alwaysTags: 'yes', tags: '   ' },
    ]);
    assert.deepEqual(groups, [
        { label: '爱恋', words: ['喜欢'], tags: 'blush , gentle smile', alwaysTags: true },
        { label: '委屈', words: ['委屈'] },
    ]);
    // 导入素材包：已有的组保留自己的设置，新组带上导入的设置。
    const merged = mergeLabelGroups(groups, [
        { label: '爱恋', words: ['心动'], tags: 'other tags' },
        { label: '发呆', words: ['发呆'], tags: 'blank stare', alwaysTags: true },
    ]);
    assert.deepEqual(merged.find((g) => g.label === '爱恋'), { label: '爱恋', words: ['喜欢', '心动'], tags: 'blush , gentle smile', alwaysTags: true });
    assert.deepEqual(merged.find((g) => g.label === '发呆'), { label: '发呆', words: ['发呆'], tags: 'blank stare', alwaysTags: true });
});

test('gate:expression-tags:settings-switch-and-input-save-per-group', async () => {
    const { bootstrapIGS } = await import('../src/index.js');
    const vn = bootstrapIGS({ global: { confirm: () => true }, autoAttachMagicWand: false, hostAdapter: { getCurrentMessage: async () => null, typeAndSend: async () => ({ ok: true }) } });
    try {
        const controller = vn.openSettings({ tab: 'scene', mode: 'pc' }).controller;
        const groupsOf = () => controller.getSnapshot().draft.bridge.sceneAssets.moodGroups;
        const love = encodeURIComponent('爱恋');
        controller.switchSceneSubTab('rules');
        let html = (await controller.invoke(`ui-toggle-open:${encodeURIComponent('mood-group:爱恋')}`)).snapshot.html;
        assert.match(html, /data-action="mood-group-always:%E7%88%B1%E6%81%8B" aria-pressed="false"/);
        assert.match(html, new RegExp(`data-mood-group-tags="爱恋" value="" placeholder="${moodPresetTags('爱恋')}"`));

        html = (await controller.invoke(`mood-group-always:${love}`)).snapshot.html;
        assert.equal(groupsOf().find((g) => g.label === '爱恋').alwaysTags, true);
        assert.match(html, /data-action="mood-group-always:%E7%88%B1%E6%81%8B" aria-pressed="true"/);

        await controller.invoke(`mood-group-tags:${love}:${encodeURIComponent('blush, soft smile')}`);
        assert.equal(groupsOf().find((g) => g.label === '爱恋').tags, 'blush, soft smile');
        // 套用预设只重置词，开关和改过的 tag 保留。
        await controller.invoke('mood-apply-preset');
        assert.deepEqual(groupsOf().find((g) => g.label === '爱恋').tags, 'blush, soft smile');
        assert.equal(groupsOf().find((g) => g.label === '爱恋').alwaysTags, true);
        // 清空回到预设，再按一次开关关掉。
        await controller.invoke(`mood-group-tags:${love}:`);
        await controller.invoke(`mood-group-always:${love}`);
        assert.deepEqual(Object.keys(groupsOf().find((g) => g.label === '爱恋')).sort(), ['label', 'words']);
        controller.close();
    } finally {
        vn.destroy();
    }
});
