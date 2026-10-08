// NovelAI：官方站与第三方站（同一 /ai/generate-image 协议）可各存一条，各记各的 Key。
// 换站只换出口，模型、采样器、尺寸、画师串照旧（柏宝绘「NAI 多接入点」）。
import { randomInt } from 'node:crypto'
import { requestBytes, imageResult, firstImageFromZip, trimBase, ImageError } from './http.js'
import { sniffImage } from '../store.js'

export const NAI_MODELS = {
  'nai-diffusion-4-5-full': { label: 'V4.5 Full', scale: 5, v4: true },
  'nai-diffusion-4-5-curated': { label: 'V4.5 Curated', scale: 5, v4: true },
  'nai-diffusion-4-full': { label: 'V4 Full', scale: 5.5, v4: true },
  'nai-diffusion-4-curated-preview': { label: 'V4 Curated', scale: 5.5, v4: true },
  'nai-diffusion-3': { label: 'Anime V3', scale: 5, v4: false },
  'nai-diffusion-furry-3': { label: 'Furry V3', scale: 5, v4: false },
}

export const NAI_SAMPLERS = ['k_euler_ancestral', 'k_euler', 'k_dpmpp_2s_ancestral', 'k_dpmpp_2m_sde', 'k_dpmpp_2m', 'k_dpmpp_sde']
export const NAI_OFFICIAL = { id: 'official', name: 'NovelAI 官方', baseURL: 'https://image.novelai.net' }

function snap64(n) { return Math.max(64, Math.min(2048, Math.round(Number(n) / 64) * 64)) }

export function buildNaiBody({ prompt, negative, width, height, seed, characters = [], config }) {
  const model = NAI_MODELS[config.model] ? config.model : 'nai-diffusion-4-5-full'
  const info = NAI_MODELS[model]
  const w = snap64(width), h = snap64(height)
  if (w * h > 3_145_728) throw new ImageError('尺寸超过 NovelAI 单张上限')
  const parameters = {
    params_version: 3,
    width: w, height: h,
    scale: Number(config.scale) || info.scale,
    sampler: NAI_SAMPLERS.includes(config.sampler) ? config.sampler : 'k_euler_ancestral',
    steps: Math.max(1, Math.min(50, Number(config.steps) || 23)),
    n_samples: 1,
    seed,
    ucPreset: 3, qualityToggle: false,
    noise_schedule: config.noiseSchedule || 'karras',
    negative_prompt: negative,
    cfg_rescale: Number(config.cfgRescale) || 0,
    dynamic_thresholding: false,
    legacy: false,
    add_original_image: true,
  }
  if (info.v4) {
    // V4+ 把场景与各人物分开描述：base 写场景与构图，char_captions 每人一条。
    const chars = characters.slice(0, 6).map((c, i) => ({ char_caption: c, centers: [{ x: characters.length === 1 ? 0.5 : 0.2 + 0.6 * i / Math.max(1, characters.length - 1), y: 0.5 }] }))
    Object.assign(parameters, {
      legacy_v3_extend: false,
      use_coords: false,
      v4_prompt: { caption: { base_caption: prompt, char_captions: chars }, use_coords: false, use_order: true },
      v4_negative_prompt: { caption: { base_caption: negative, char_captions: chars.map(c => ({ char_caption: '', centers: c.centers })) }, legacy_uc: false },
      characterPrompts: chars.map(c => ({ prompt: c.char_caption, uc: '', center: c.centers[0], enabled: true })),
    })
  } else {
    Object.assign(parameters, { sm: false, sm_dyn: false })
  }
  return { input: prompt, model, action: 'generate', parameters }
}

export async function generateNovelAI({ prompt, negative, width, height, seed, characters, config, key, signal, fetchImpl }) {
  const endpoint = (config.endpoints || []).find(e => e.id === config.endpoint) || NAI_OFFICIAL
  const base = trimBase(endpoint.id === 'official' ? NAI_OFFICIAL.baseURL : endpoint.baseURL)
  if (!base) throw new ImageError('NovelAI 接入点没有地址')
  if (!key) throw new ImageError(`「${endpoint.name || endpoint.id}」还没有填写 Key`)
  const finalSeed = Number.isInteger(seed) && seed >= 0 ? seed : randomInt(0, 2 ** 32 - 1)
  const body = buildNaiBody({ prompt, negative, width, height, seed: finalSeed, characters, config })
  const { bytes } = await requestBytes(base + '/ai/generate-image', {
    method: 'POST', signal, fetchImpl, timeout: 180000,
    headers: { 'content-type': 'application/json', authorization: 'Bearer ' + key, accept: 'application/zip, image/*' },
    body: JSON.stringify(body),
  })
  // 第三方站有的直接回图片，有的回 ZIP。
  const image = sniffImage(bytes) ? bytes : firstImageFromZip(bytes)
  return imageResult(image, { seed: finalSeed, model: body.model, backend: 'novelai', endpoint: endpoint.id })
}
