import test from 'node:test';
import assert from 'node:assert/strict';

import { parseCaptionSlots } from '../src/generated-images/illustration/caption-writer.js';
import { createAssetGenerationService } from '../src/generated-images/illustration/asset-generation-service.js';
import { createMemoryGeneratedAssetStore } from '../src/media/generated-asset-store.js';
import { moodTierLabels } from '../src/scene/mood-groups.js';

const charOf = (reply) => parseCaptionSlots(reply).captions[0].caption.v4_prompt.caption.char_captions[0].char_caption;

test('gate:expression-consistency:writer-coordinates-never-leak-into-tags', () => {
    assert.equal(charOf('#1\nscene: solo\nchar: 0.5,0.5 | 0.7::brest_(azur_lane)::, adult'), '0.7::brest_(azur_lane)::, adult');
    assert.equal(charOf('#1\nscene: solo\nchar: 柯萝伊 | 0.5, 0.5 | 1girl, smile'), '1girl, smile');
    assert.equal(charOf('#1\nscene: solo\nchar: 1girl, 2::blue eyes::, smile'), '1girl, 2::blue eyes::, smile', '权重写法不动');
});

test('gate:expression-consistency:later-batches-follow-the-first-written-look-and-body-state', async () => {
    const labels = moodTierLabels(20);
    const descriptions = [];
    const cap = (text) => ({ v4_prompt: { caption: { base_caption: 'solo', char_captions: [{ char_caption: text, centers: [{ x: 0.5, y: 0.5 }] }] } }, v4_negative_prompt: { caption: { base_caption: '', char_captions: [{ char_caption: '' }] } } });
    const service = createAssetGenerationService({
        messageHost: { getChatId: () => 'c', readPreviousAiTexts: () => [] },
        llm: {},
        nai: {
            describe: () => ({ via: 'baibai', ownPrompts: false, ready: { ok: true } }),
            writeDbgenPrompt: async ({ description }) => {
                descriptions.push(description);
                const count = Number((description.match(/写 (\d+) 份立绘表情差分/) || [])[1]) || 1;
                // 第一批写进了怀孕，后面的批次不一定会写：靠第一批的那一份对齐。
                const body = descriptions.length === 1 ? 'elf, blonde hair, pregnant' : 'elf, blonde hair';
                return { ok: true, captions: Array.from({ length: count }, (_, index) => ({ slotId: index + 1, caption: cap(`${body}, expr ${index + 1}`) })) };
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
    for (const text of descriptions) assert.match(text, /正文和资料里写着的这个角色现在的身体状态（例如怀孕、受伤包扎、湿身），每一份都要写上/);
    assert.doesNotMatch(descriptions[0], /前面已经写好的一份/, '第一批没有可对齐的');
    for (const text of descriptions.slice(1)) {
        assert.match(text, /下面是前面已经写好的一份。外貌、服装和身体状态要和它完全一致[^\n]*\nslotid: 1\nscene: solo\nchar: 0\.5,0\.5 \| elf, blonde hair, pregnant, expr 1/);
    }
});
