import test from 'node:test';
import assert from 'node:assert/strict';

import { handleSettingsAction } from '../src/visual/igs-ui/settings-actions.js';
import { renderCharacterAssetList } from '../src/visual/igs-ui/settings-fields.js';
import { createMemoryStorage } from '../src/index.js';

const enc = (...parts) => parts.map((p) => encodeURIComponent(p)).join(':');

function createCtx({ confirm = true } = {}) {
    const confirms = [];
    const draft = {
        bridge: { sceneAssets: {
            enabled: true,
            characters: { 冬月: { 默认: 'igs-gen:base', 喜悦: 'igs-gen:joy', 愤怒: '' } },
            characterOutfits: { 冬月: { 泳装: { words: ['泳装'], moods: { 喜悦: 'igs-gen:swim-joy', 害羞: 'igs-gen:swim-shy', 平和: 'https://x/calm.png' } } } },
            generated: { expressionNotes: {
                '冬月\u0001泳装': { 喜悦: { positive: 'swim joy' }, 害羞: { positive: 'swim shy' } },
                冬月: { 喜悦: { positive: 'base joy' } },
            } },
        } },
        readerSettings: {},
    };
    let persisted = 0;
    const ctx = {
        state: { activeSettings: { draft, asyncState: {} } },
        options: { global: { localStorage: createMemoryStorage(), prompt: () => '', alert: () => {}, confirm: (message) => { confirms.push(message); return confirm; } } },
        dialogs: { confirm: async (message) => { confirms.push(message); return confirm; }, prompt: async () => '', alert: async () => {} },
        closeSettings: () => ({ ok: true }),
        persistSettingsDraft: () => { persisted += 1; return { ok: true }; },
        rerenderSettings: () => ({ ok: true }),
        buildRegexPreview: () => '',
    };
    return { ctx, confirms, sa: () => draft.bridge.sceneAssets, async: () => ctx.state.activeSettings.asyncState, persisted: () => persisted };
}

test('gate:sprite-clear:clears-only-picked-slots-of-the-current-outfit-and-their-notes', async () => {
    const t = createCtx();
    const run = (action) => handleSettingsAction(action, t.ctx);
    await run(`sprite-clear:${enc('冬月', '泳装')}`);
    assert.deepEqual(t.async().spriteClear, { character: '冬月', outfit: '泳装', moods: new Set() });
    await run(`sprite-clear-pick:${enc('冬月', '泳装', '喜悦')}`);
    await run(`sprite-clear-pick:${enc('冬月', '泳装', '平和')}`);
    await run(`sprite-clear-pick:${enc('冬月', '泳装', '平和')}`);
    assert.deepEqual([...t.async().spriteClear.moods], ['喜悦']);
    await run(`sprite-clear-apply:${enc('冬月', '泳装')}`);
    const swim = t.sa().characterOutfits.冬月.泳装.moods;
    assert.deepEqual(swim, { 喜悦: '', 害羞: 'igs-gen:swim-shy', 平和: 'https://x/calm.png' }, '只清选中的格子，格子本身留着');
    assert.deepEqual(Object.keys(t.sa().generated.expressionNotes['冬月\u0001泳装']), ['害羞'], '清掉的格子存下的提示词一起清掉');
    assert.equal(t.sa().characters.冬月.喜悦, 'igs-gen:joy', '原装不受影响');
    assert.equal(t.async().spriteClear, null);
    assert.equal(t.persisted(), 1);
    assert.match(t.confirms[0], /清空「冬月」「泳装」的 「喜悦」立绘/);
});

test('gate:sprite-clear:select-all-on-original-outfit-and-cancel-keep-draft', async () => {
    const t = createCtx();
    const run = (action) => handleSettingsAction(action, t.ctx);
    await run(`sprite-clear:${enc('冬月', '')}`);
    await run(`sprite-clear-all:${enc('冬月', '')}`);
    assert.deepEqual([...t.async().spriteClear.moods].sort(), ['喜悦', '默认'].sort(), '全选只选有图的格子');
    await run(`sprite-clear-all:${enc('冬月', '')}`);
    assert.equal(t.async().spriteClear.moods.size, 0, '再点一次全不选');
    await run(`sprite-clear-pick:${enc('冬月', '', '喜悦')}`);
    await run(`sprite-clear:${enc('冬月', '')}`);
    assert.equal(t.async().spriteClear, null, '再点一次退出多选，什么都不改');
    assert.equal(t.sa().characters.冬月.喜悦, 'igs-gen:joy');

    const declined = createCtx({ confirm: false });
    await handleSettingsAction(`sprite-clear:${enc('冬月', '')}`, declined.ctx);
    await handleSettingsAction(`sprite-clear-pick:${enc('冬月', '', '喜悦')}`, declined.ctx);
    await handleSettingsAction(`sprite-clear-apply:${enc('冬月', '')}`, declined.ctx);
    assert.equal(declined.sa().characters.冬月.喜悦, 'igs-gen:joy', '确认框点取消就不清');
    assert.equal(declined.persisted(), 0);
});

test('gate:sprite-clear:renders-checkboxes-and-bar-only-for-the-chosen-outfit', () => {
    const sa = createCtx().sa();
    const base = { characterOutfits: sa.characterOutfits, sceneAssets: sa, outfitTabs: { 冬月: '泳装' }, isOpen: (key) => key === 'char-open:冬月' };
    const idle = renderCharacterAssetList(sa.characters, base);
    assert.match(idle, /data-action="sprite-clear:%E5%86%AC%E6%9C%88:%E6%B3%B3%E8%A3%85"[^>]*>清空立绘（多选）/);
    assert.doesNotMatch(idle, /igs-sprite-clear-bar|igs-sprite-clear-pick/);
    const picking = renderCharacterAssetList(sa.characters, { ...base, spriteClear: { character: '冬月', outfit: '泳装', moods: new Set(['害羞']) } });
    assert.match(picking, /勾选要清空的立绘（「泳装」，已选 1\/3）/);
    assert.match(picking, /class="igs-sprite-clear-pick is-on" data-action="sprite-clear-pick:%E5%86%AC%E6%9C%88:%E6%B3%B3%E8%A3%85:%E5%AE%B3%E7%BE%9E"/);
    assert.match(picking, /data-action="sprite-clear-apply:%E5%86%AC%E6%9C%88:%E6%B3%B3%E8%A3%85"/);
    const otherOutfit = renderCharacterAssetList(sa.characters, { ...base, spriteClear: { character: '冬月', outfit: '', moods: new Set() } });
    assert.doesNotMatch(otherOutfit, /igs-sprite-clear-bar/, '多选的是原装，当前看的是泳装时不显示');
});
