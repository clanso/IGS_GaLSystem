import test from 'node:test';
import assert from 'node:assert/strict';

import { handleSettingsAction, planMissingMoodPresets } from '../src/visual/igs-ui/settings-actions.js';
import { renderMoodGroupList } from '../src/visual/igs-ui/settings-fields.js';
import { MOOD_PRESET, resolveMoodGroup } from '../src/scene/mood-groups.js';
import { createMemoryStorage } from '../src/index.js';

// 旧版默认的 8 组（词是用户改过的），外加一个自建组。
const oldGroups = () => [
    { label: '喜悦', words: ['开心', '得意', '兴奋', '我的词'] },
    { label: '悲伤', words: ['难过', '委屈', '心痛'], alwaysTags: true, tags: 'sad' },
    { label: '愤怒', words: ['生气'] },
    { label: '紧张', words: ['紧张'] },
    { label: '平和', words: ['平静'] },
    { label: '害羞', words: ['害羞'] },
    { label: '嫌弃', words: ['嫌弃'] },
    { label: '爱恋', words: ['喜欢'] },
    { label: '撒娇', words: ['撒娇', '不甘'] },
];

test('gate:mood-fill:plan-adds-only-missing-preset-groups-and-moves-their-words', () => {
    const plan = planMissingMoodPresets(oldGroups());
    const presetLabels = MOOD_PRESET.map((entry) => entry.label);
    assert.deepEqual(plan.added.map((item) => item.label), presetLabels.filter((label) => !['喜悦', '悲伤', '愤怒', '紧张', '平和', '害羞', '嫌弃', '爱恋'].includes(label)));
    assert.ok(plan.moved.some((item) => item.word === '委屈' && item.from === '悲伤' && item.to === '委屈'));
    assert.ok(plan.moved.some((item) => item.word === '得意' && item.from === '喜悦' && item.to === '得意'));
    assert.ok(!plan.moved.some((item) => item.word === '我的词'), '自己加的、预设里没有的词不动');
    assert.ok(!plan.moved.some((item) => item.from === '撒娇'), '自建组里的词不动');
    assert.ok(!plan.added.find((item) => item.label === '委屈').words.includes('不甘'), '自建组占着的词，新组不带');
    assert.deepEqual(planMissingMoodPresets(MOOD_PRESET.map((entry) => ({ label: entry.label, words: entry.words.slice() }))).added, []);
});

test('gate:mood-fill:action-fills-groups-keeps-own-words-and-new-groups-match', async () => {
    const draft = { bridge: { sceneAssets: { moodGroups: oldGroups() } }, readerSettings: {} };
    const confirms = [];
    const ctx = {
        state: { activeSettings: { draft, asyncState: {} } },
        options: { global: { localStorage: createMemoryStorage(), alert: () => {} } },
        dialogs: { confirm: async (message) => { confirms.push(message); return true; }, prompt: async () => '', alert: async () => {} },
        closeSettings: () => ({ ok: true }),
        persistSettingsDraft: () => ({ ok: true }),
        rerenderSettings: () => ({ ok: true }),
        buildRegexPreview: () => '',
    };
    await handleSettingsAction('mood-fill-presets', ctx);
    const groups = draft.bridge.sceneAssets.moodGroups;
    assert.equal(groups.length, 9 + 13);
    assert.match(confirms[0], /补上 13 个预设情绪组：/);
    assert.match(confirms[0], /「委屈」悲伤→委屈/);
    const sad = groups.find((group) => group.label === '悲伤');
    assert.deepEqual(sad.words, ['难过'], '挪走委屈和心痛，剩下的不动');
    assert.equal(sad.alwaysTags, true, '组上的设置不动');
    assert.deepEqual(groups.find((group) => group.label === '喜悦').words, ['开心', '我的词']);
    assert.equal(resolveMoodGroup('委屈', groups), '委屈', '正文写委屈，归到新组');
    assert.equal(resolveMoodGroup('得意', groups), '得意');
    assert.equal(resolveMoodGroup('撒娇', groups), '撒娇');
    confirms.length = 0;
    await handleSettingsAction('mood-fill-presets', ctx);
    assert.equal(confirms.length, 0, '没缺的就不问');
});

test('gate:mood-fill:list-shows-missing-groups-and-button', () => {
    const html = renderMoodGroupList(oldGroups());
    assert.match(html, /表情差分最多画 20 种表情，这里还缺 13 组：惊讶、思考/);
    assert.match(html, /data-action="mood-fill-presets">补上缺的 13 组/);
    const full = renderMoodGroupList(MOOD_PRESET.map((entry) => ({ label: entry.label, words: entry.words.slice() })));
    assert.doesNotMatch(full, /mood-fill-presets/);
});
