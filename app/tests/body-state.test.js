import test from 'node:test';
import assert from 'node:assert/strict';

import { PREGNANCY_MONTH_TAGS, pregnancyMonthOf, pregnancyTagsOf, splitOutfitState } from '../src/scene/body-state.js';
import { stateOutfitWardrobe } from '../src/scene/character-outfits.js';
import { matchOutfitDirectiveAt, stripOutfitFields } from '../src/scene/directive-tags.js';
import {
    SPRITE_LASTING_STATE_LINE, applyPregnancyToCaption, buildCharacterSpriteDescription, buildExpressionDiffDescription, expressionLookTags,
} from '../src/generated-images/dbgen-prompt.js';
import { buildAssetPlannerUserPrompt } from '../src/generated-images/illustration/asset-prompt.js';
import { createAssetGenerationService } from '../src/generated-images/illustration/asset-generation-service.js';
import { createMemoryGeneratedAssetStore } from '../src/media/generated-asset-store.js';

const cap = (text) => ({
    v4_prompt: { caption: { base_caption: 'solo', char_captions: [{ char_caption: text, centers: [{ x: 0.5, y: 0.5 }] }] } },
    v4_negative_prompt: { caption: { base_caption: '', char_captions: [{ char_caption: '' }] } },
});
const charOf = (caption) => caption.v4_prompt.caption.char_captions[0].char_caption;

test('gate:body-state:outfit-name-splits-at-the-last-dash', () => {
    assert.deepEqual(splitOutfitState('薄睡袍-孕早期'), { base: '薄睡袍', state: '孕早期' });
    assert.deepEqual(splitOutfitState('薄睡袍－孕8月'), { base: '薄睡袍', state: '孕8月' }, '全角减号也认');
    assert.deepEqual(splitOutfitState('A-B-左臂烧伤'), { base: 'A-B', state: '左臂烧伤' });
    assert.deepEqual(splitOutfitState('薄睡袍'), { base: '薄睡袍', state: '' });
    assert.deepEqual(splitOutfitState('-孕早期'), { base: '-孕早期', state: '' }, '没有前半段不算');
});

test('gate:body-state:pregnancy-month-from-stage-words-months-and-weeks', () => {
    const cases = [['孕早期', 2], ['孕中期', 5], ['孕晚期', 8], ['孕后期', 8], ['临产', 10], ['足月', 10],
        ['孕5月', 5], ['怀孕五个月', 5], ['孕20周', 5], ['孕36周', 9], ['孕50周', 10], ['左臂烧伤', 0], ['怀孕', 0], ['', 0]];
    for (const [state, month] of cases) assert.equal(pregnancyMonthOf(state), month, state);
    assert.equal(pregnancyTagsOf(2), '', '孕早期看不出来，不加');
    assert.equal(pregnancyTagsOf(8), '1.2::pregnant::, big belly');
    assert.equal(pregnancyTagsOf(0), '');
    assert.equal(PREGNANCY_MONTH_TAGS.length, 11);
});

test('gate:body-state:outfit-field-accepts-name-dash-state-and-shows-the-base-meanwhile', () => {
    const resolver = (character, token) => (token === '薄睡袍' ? '薄睡袍' : '');
    const read = (token) => matchOutfitDirectiveAt(`[igs-char:阿黛尔|平静|${token}|不想把你吵醒]`, resolver);
    assert.deepEqual([read('薄睡袍-孕早期').outfit, read('薄睡袍-孕早期').unknownOutfit, read('薄睡袍-孕早期').text], ['薄睡袍', '薄睡袍-孕早期', '不想把你吵醒']);
    assert.deepEqual([read('亚麻长裙-孕晚期').outfit, read('亚麻长裙-孕晚期').unknownOutfit], ['', '亚麻长裙-孕晚期'], '前半段没登记时照旧只进待确认');
    // 两段分开算长度：服装名 12 字以内、状态 8 字以内。
    assert.equal(read('一件很长名字的丝绸睡袍-孕早期').unknownOutfit, '一件很长名字的丝绸睡袍-孕早期');
    assert.equal(read('薄睡袍-怀孕后期第三十二周啊').unknownOutfit, undefined);
    assert.equal(read('薄睡袍（孕早期）').text, '薄睡袍（孕早期）|不想把你吵醒', '括号写法仍当对白');
    assert.equal(stripOutfitFields('[igs-char:阿黛尔|平静|薄睡袍-孕早期|不想把你吵醒]', resolver), '[igs-char:阿黛尔|平静|不想把你吵醒]');
});

test('gate:body-state:new-state-outfit-wears-the-base-outfit-clothes', () => {
    const outfits = { 薄睡袍: { words: [], moods: {}, wardrobe: '丝绸睡袍' }, 亚麻长裙: { words: [], moods: {} } };
    assert.equal(stateOutfitWardrobe(outfits, '薄睡袍-孕晚期'), '丝绸睡袍', '前半段挂了衣柜就跟它');
    assert.equal(stateOutfitWardrobe(outfits, '亚麻长裙-孕早期'), '亚麻长裙');
    assert.equal(stateOutfitWardrobe(outfits, '裸体-孕晚期'), '裸体');
    assert.equal(stateOutfitWardrobe(outfits, '晚礼服'), '', '不带状态的照旧');
});

test('gate:body-state:writer-is-told-the-outfit-state-and-pregnancy-is-left-to-the-program', () => {
    const late = buildExpressionDiffDescription('阿黛尔', null, ['平和'], null, { name: '薄睡袍-孕晚期' });
    assert.match(late, /这一套是「孕晚期」（约孕8月）：肚子由程序按孕期统一加上（1\.2::pregnant::, big belly），你不要再写 pregnant、belly 这类词。/);
    assert.doesNotMatch(late, /怀孕按孕期写肚子大小/, '孕期已定时不再给对照表');
    const early = buildExpressionDiffDescription('阿黛尔', null, ['平和'], null, { name: '薄睡袍-孕早期' });
    assert.match(early, /这一套是「孕早期」（约孕2月）：肚子还看不出来，不要写 pregnant、belly 这类词。/);
    const burn = buildExpressionDiffDescription('阿黛尔', null, ['平和'], null, { name: '亚麻长裙-左臂烧伤' });
    assert.match(burn, /这一套的身体状态是「左臂烧伤」：每一份都要画出来，各份写法一致。/);
    assert.match(burn, /怀孕按孕期写肚子大小/);
    // 已有立绘当样板时去掉临时状态，孕期由程序定时连怀孕词一起去掉。
    const base = { caption: cap('silver hair, sweat, damp skin, pregnant, huge belly, smile') };
    const shown = buildExpressionDiffDescription('阿黛尔', base, ['平和'], null, { name: '薄睡袍-孕晚期' });
    assert.match(shown, /char: 0\.5,0\.5 \| silver hair, smile\n/);
});

test('gate:body-state:pregnancy-tags-replace-whatever-the-writer-wrote', () => {
    const written = cap('silver hair, pregnant, huge belly, 1.5::pregnant::, smile');
    assert.equal(charOf(applyPregnancyToCaption(written, 8)), '1.2::pregnant::, big belly, silver hair, smile');
    assert.equal(charOf(applyPregnancyToCaption(written, 2)), 'silver hair, smile', '孕早期只去不加');
    assert.equal(applyPregnancyToCaption(written, 0), written, '没定孕期不动');
});

test('gate:body-state:look-from-the-base-sprite-drops-transient-states', () => {
    const basePrompt = { positive: 'silver hair, sweat, damp skin, hair stuck to neck, white dress, light blush, messy hair' };
    assert.equal(expressionLookTags(basePrompt, null), 'silver hair, white dress');
});

test('gate:body-state:sprite-writing-everywhere-asks-for-lasting-states-only', () => {
    assert.match(SPRITE_LASTING_STATE_LINE, /身体状态只画长期的：怀孕，或者烧伤[^。]*。出汗、湿身[^。]*这类一会儿就过去的状态不要画。/);
    assert.ok(buildCharacterSpriteDescription('阿黛尔', null, {}).includes(SPRITE_LASTING_STATE_LINE));
    assert.match(buildCharacterSpriteDescription('阿黛尔', null, { nude: true, outfitName: '裸体-孕晚期' }), /这一套是「孕晚期」（约孕8月）/);
    const planner = buildAssetPlannerUserPrompt({ needs: [{ type: 'sprite', name: '阿黛尔' }], readableText: '……' });
    assert.ok(planner.includes(`【立绘的身体状态】${SPRITE_LASTING_STATE_LINE}`));
    assert.ok(!buildAssetPlannerUserPrompt({ needs: [{ type: 'background', name: '旅馆' }], readableText: '……' }).includes('【立绘的身体状态】'));
});

test('gate:body-state:expression-set-paints-the-stage-belly-on-every-diff', async () => {
    const paints = [];
    const service = createAssetGenerationService({
        messageHost: { getChatId: () => 'c', readPreviousAiTexts: () => [] },
        llm: {},
        nai: {
            describe: () => ({ via: 'baibai', ownPrompts: false, ready: { ok: true } }),
            writeDbgenPrompt: async () => ({ ok: true, captions: [
                { slotId: 1, caption: cap('silver hair, pregnant, huge belly, smile') },
                { slotId: 2, caption: cap('silver hair, frown') },
            ] }),
            generateDbgenCaption: async (meta) => { paints.push(charOf(meta.caption)); return { ok: true, dataUrl: 'data:image/png;base64,QQ==' }; },
        },
        store: createMemoryGeneratedAssetStore(),
        matte: async (url) => url,
        getSettings: () => ({ autoIllustration: {}, sceneAssets: {} }),
    });
    const result = await service.generateExpressionSet({ name: '阿黛尔', moods: ['喜悦', '不满'], basePrompt: null, outfit: { name: '薄睡袍-孕晚期', words: [] } });
    assert.equal(result.ok, true);
    assert.equal(paints.length, 2);
    for (const text of paints) {
        assert.ok(text.startsWith('1.2::pregnant::, big belly'), text);
        assert.doesNotMatch(text, /huge belly/);
    }
});
