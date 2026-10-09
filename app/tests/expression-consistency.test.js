import test from 'node:test';
import assert from 'node:assert/strict';

import { parseCaptionSlots } from '../src/generated-images/illustration/caption-writer.js';
import { createAssetGenerationService } from '../src/generated-images/illustration/asset-generation-service.js';
import { createMemoryGeneratedAssetStore } from '../src/media/generated-asset-store.js';
import { moodTierLabels } from '../src/scene/mood-groups.js';

const cap = (text) => ({ v4_prompt: { caption: { base_caption: 'solo', char_captions: [{ char_caption: text, centers: [{ x: 0.5, y: 0.5 }] }] } }, v4_negative_prompt: { caption: { base_caption: '', char_captions: [{ char_caption: '' }] } } });
const charOf = (reply) => parseCaptionSlots(reply).captions[0].caption.v4_prompt.caption.char_captions[0].char_caption;

test('gate:expression-consistency:writer-coordinates-never-leak-into-tags', () => {
    assert.equal(charOf('#1\nscene: solo\nchar: 0.5,0.5 | 0.7::brest_(azur_lane)::, adult'), '0.7::brest_(azur_lane)::, adult');
    assert.equal(charOf('#1\nscene: solo\nchar: 柯萝伊 | 0.5, 0.5 | 1girl, smile'), '1girl, smile');
    assert.equal(charOf('#1\nscene: solo\nchar: 1girl, 2::blue eyes::, smile'), '1girl, 2::blue eyes::, smile', '权重写法不动');
});

test('gate:expression-consistency:later-batches-follow-the-first-written-look-and-lasting-body-state', async () => {
    const labels = moodTierLabels(20);
    const descriptions = [];
    const service = createAssetGenerationService({
        messageHost: { getChatId: () => 'c', readPreviousAiTexts: () => [] },
        llm: {},
        nai: {
            describe: () => ({ via: 'baibai', ownPrompts: false, ready: { ok: true } }),
            writeDbgenPrompt: async ({ description }) => {
                descriptions.push(description);
                const count = Number((description.match(/写 (\d+) 份立绘表情差分/) || [])[1]) || 1;
                // 第一批写进了怀孕，后面的批次不一定会写：靠第一批的样板对齐。出汗、湿发是临时状态，不进样板；
                // 第一份（平和）自己的眉毛、手势只有它有，也不进样板。
                const body = descriptions.length === 1 ? 'elf, blonde hair, pregnant, sweat, damp skin, hair stuck to neck' : 'elf, blonde hair';
                const own = (index) => (descriptions.length === 1 && index === 0 ? 'relaxed eyebrows, own hands together, ' : '');
                return { ok: true, captions: Array.from({ length: count }, (_, index) => ({ slotId: index + 1, caption: cap(`${body}, ${own(index)}expr ${index + 1}`) })) };
            },
            generateDbgenCaption: async () => ({ ok: true, dataUrl: 'data:image/png;base64,QQ==' }),
        },
        store: createMemoryGeneratedAssetStore(),
        matte: async (url) => url,
        getSettings: () => ({ autoIllustration: {}, sceneAssets: {} }),
    });
    const result = await service.generateExpressionSet({ name: '布雷斯特', moods: labels, basePrompt: null });
    assert.equal(result.ok, true);
    assert.equal(descriptions.length, 3, '20 份分 3 批写');
    for (const text of descriptions) {
        assert.match(text, /正文和资料里写着的长期身体状态（怀孕，或者烧伤[^）]*），每一份都要写上/);
        assert.match(text, /出汗、湿身[^\n]*这类一会儿就过去的状态不要当成身体状态每份都写/);
        assert.match(text, /怀孕按孕期写肚子大小：孕1–3月外表看不出来，不写怀孕的词；孕4月 pregnant, small baby bump/);
    }
    assert.doesNotMatch(descriptions[0], /前面已经写好的一份/, '第一批没有可对齐的');
    for (const text of descriptions.slice(1)) {
        assert.match(text, /下面是前面已经写好的几份共有的外貌、服装和长期身体状态（表情和动作已经去掉）[^\n]*\nslotid: 1\nscene: solo\nchar: 0\.5,0\.5 \| elf, blonde hair, pregnant\n/);
    }
});

test('gate:expression-consistency:one-diffs-own-expression-and-hands-never-carry-over', async () => {
    const { expressionLookTags, isMoodDetailTag, sharedLookCaption } = await import('../src/generated-images/dbgen-prompt.js');
    // 阿黛尔「丝质睡袍-孕中期」平和那张的真实写词：重画别的表情时只该留下长相、衣服和肚子。
    const calm = 'blonde hair, green eyes, 0.8::tareme::, pregnant, small round baby bump, pale ivory silk robe, closed robe, relaxed eyebrows, soft gaze, own hands together, hands resting loosely in front, relaxed shoulders, looking at viewer, closed mouth';
    assert.equal(expressionLookTags({ positive: calm }, { name: '丝质睡袍-孕中期', ownImage: true }),
        'blonde hair, green eyes, 0.8::tareme::, pregnant, small round baby bump, pale ivory silk robe, closed robe');
    for (const tag of ['tearing up', 'chin slightly raised', 'other hand reaching forward slightly', 'hand holding own wrist in front of waist', 'sad smile', 'sidelong glance']) {
        assert.equal(isMoodDetailTag(tag), true, tag);
    }
    for (const tag of ['green eyes', 'bare shoulders', 'arm warmers', 'mole under mouth', 'hair over shoulder', 'fingerless gloves', 'wide hips']) {
        assert.equal(isMoodDetailTag(tag), false, tag);
    }
    // 样板取过半数份都有的 tag。
    const shared = sharedLookCaption([cap('elf, robe, smile'), cap('elf, robe, frown'), cap('elf, robe, pout'), cap('elf, crying')]);
    assert.equal(shared.v4_prompt.caption.char_captions[0].char_caption, 'elf, robe');
    assert.equal(sharedLookCaption([]), null);
});

test('gate:expression-consistency:empty-char-line-does-not-swallow-the-uc-line', () => {
    // 2026-10-09 实测：衣柜提示词写成「scene: … / char: / uc: humans, phone, sneakers…」，uc 那行被读成了角色标签，手机球鞋画进了立绘。
    const parsed = parseCaptionSlots('scene: no humans, white one-piece swimsuit\nchar:\nuc: humans, phone, sneakers');
    const caption = parsed.captions[0].caption;
    assert.deepEqual(caption.v4_prompt.caption.char_captions, []);
    assert.equal(caption.v4_negative_prompt.caption.base_caption, 'humans, phone, sneakers');
});

test('gate:expression-consistency:wardrobe-display-prompts-are-trimmed-to-the-clothes-before-wearing', async () => {
    const { buildExpressionDiffDescription, expressionLookTags, wearableClothesPrompt } = await import('../src/generated-images/dbgen-prompt.js');
    // 用户衣柜里存过的三份（衣服展示图写法，还混了一行 uc）。
    const swimsuit = 'no humans, still life, clothing display, full outfit laid out, white one-piece swimsuit on wooden hanger, front and back view, matching accessories arranged below, simple light wooden background, soft natural daylight, fantasy setting, clean composition\nuc: humans, 1girl, person, body, face, mannequin head, modern clothing, bikini, zipper, plastic, logo, text, phone, sneakers, sunglasses, goggles, nsfw, nipples, child, loli';
    assert.equal(wearableClothesPrompt(swimsuit), 'white one-piece swimsuit');
    const green = 'no humans, still life, clothing focus, swimsuit display, dark green two-piece maternity swimsuit laid out flat on woven rush straw mat, fantasy setting, swimwear set, crop top bikini with wide shoulder straps, wide-brimmed woven straw hat beside, brown leather strap sandals, soft daylight, warm sunlight, light shadows, simple background\nuc: humans, smartphone';
    assert.equal(wearableClothesPrompt(green), 'dark green two-piece maternity swimsuit, swimwear set, crop top bikini with wide shoulder straps, brown leather strap sandals');
    const dress = 'no humans, still life, full outfit display, clothes laid out flat, light blue summer dress, white lace trim collar, pale blue hair ribbon, plain wooden floor, simple light background, soft natural light, clothes focus, product display';
    assert.equal(wearableClothesPrompt(dress), 'light blue summer dress, white lace trim collar, pale blue hair ribbon');
    assert.equal(wearableClothesPrompt('yukata, floral pattern, obi'), 'yukata, floral pattern, obi', '本来就只写衣服的原样保留');
    // 写词说明和出图前拼进角色的长相都用修过的。
    const outfit = { name: '白色泳装', words: [], ownImage: false, prompt: swimsuit };
    assert.equal(expressionLookTags(null, outfit), 'white one-piece swimsuit');
    const text = buildExpressionDiffDescription('柯萝伊', null, ['害羞'], null, outfit);
    assert.ok(text.includes('服装提示词：\nwhite one-piece swimsuit\n'));
    assert.ok(!/hanger|no humans|phone|sneakers/.test(text));
});

test('gate:expression-consistency:new-outfit-without-image-or-wardrobe-is-drawn-from-the-story', async () => {
    const { buildExpressionDiffDescription } = await import('../src/generated-images/dbgen-prompt.js');
    const text = buildExpressionDiffDescription('阿黛尔', null, ['害羞'], null, { name: '墨绿泳装-孕中期', words: [], ownImage: false, prompt: '', clothesName: '墨绿泳装', story: '阿黛尔换上了墨绿色的连体泳衣，外面系着薄纱裙。' });
    assert.ok(text.includes('这一套要改成服装「墨绿泳装-孕中期」：衣服的款式、颜色、材质和配饰按正文和资料里对「墨绿泳装」的描写来画'));
    assert.ok(text.includes('正文和数据库里写「墨绿泳装」的地方（只取衣服本身，人物和剧情不要画）：\n阿黛尔换上了墨绿色的连体泳衣，外面系着薄纱裙。'));
    const own = buildExpressionDiffDescription('阿黛尔', null, ['害羞'], null, { name: '墨绿泳装-孕中期', words: [], ownImage: true, prompt: '', story: '不该出现' });
    assert.ok(!own.includes('不该出现'), '这一套已经有自己的图：照图画，不再附正文');
});
