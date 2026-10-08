// 后台导演：正文单元 → 舞台脚本（场景、站位、表情、镜头、选项、插画分镜、外貌档案更新）。
import { DIRECTOR_SYSTEM, DIRECTOR_USER, STYLE_HINTS, fill } from './prompts.js'
import { unitsForPrompt } from './segment.js'
import { EMOTIONS, SYMBOLS, CAMERAS, WEATHER, TIMES, TRANSITIONS, CARDS, MOODS, POSITIONS, pick } from './vocab.js'

/** 收完一次流式模型调用。llm.stream 的事件形状见 DSH llm 服务。 */
export async function callModel(llm, { provider, model, system, user, maxTokens = 6000, temperature = 0.7, signal }) {
  if (!llm || typeof llm.stream !== 'function') throw new Error('DSH 没有可用的 llm 服务')
  if (!provider || !model) throw new Error('没有可用的后台模型：请在「设置 → 导演」里选一个，或先在 Tavern 里配置后台模型')
  signal?.throwIfAborted()
  const chunks = llm.stream({ provider, model, system, temperature, maxTokens, signal, messages: [{ role: 'user', content: [{ type: 'text', text: user }] }] })
  let output = '', failure = null, usage = null
  for await (const chunk of chunks) {
    signal?.throwIfAborted()
    if (!chunk || typeof chunk !== 'object') continue
    if (chunk.type === 'text-delta' && typeof chunk.text === 'string') output += chunk.text
    else if (chunk.type === 'usage') usage = chunk.usage ?? null
    else if (chunk.type === 'finish') {
      const reason = chunk.reason ?? {}
      if (reason.kind === 'error' || reason.kind === 'aborted') failure = reason.failure?.message || (reason.kind === 'aborted' ? '已取消' : '模型调用失败')
    }
  }
  signal?.throwIfAborted()
  if (failure && !output.trim()) throw new Error(failure)
  return { text: output, usage }
}

/** 从模型输出里抠出 JSON 对象：容忍代码块、前后废话、思维链。 */
export function extractJson(text) {
  let source = String(text ?? '').replace(/<think(?:ing)?>[\s\S]*?<\/think(?:ing)?>/gi, '')
  const fence = /```(?:json)?\s*([\s\S]*?)```/i.exec(source)
  if (fence) source = fence[1]
  const start = source.indexOf('{')
  const end = source.lastIndexOf('}')
  if (start < 0 || end <= start) throw new Error('导演没有返回 JSON')
  const body = source.slice(start, end + 1)
  try { return JSON.parse(body) } catch {}
  // 常见小毛病：尾逗号、中文引号包键。
  const repaired = body.replace(/,\s*([}\]])/g, '$1').replace(/[“”]/g, '"')
  try { return JSON.parse(repaired) } catch (error) { throw new Error('导演返回的 JSON 无法解析：' + error.message) }
}

const str = (value, max = 200) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

/** 把模型输出规整成前端可以直接演的脚本。未知值一律丢弃或回落默认。 */
export function normalizeScript(raw, units, { previous = null, maxImages = 1 } = {}) {
  const unitIds = new Set(units.map(u => u.id))
  const prevScene = previous?.scene || {}
  const sceneIn = raw && typeof raw.scene === 'object' ? raw.scene : {}
  const location = str(sceneIn.location, 40) || prevScene.location || ''
  const scene = {
    location,
    time: pick(sceneIn.time, TIMES, prevScene.time || 'afternoon'),
    weather: pick(sceneIn.weather, WEATHER, prevScene.weather || 'clear'),
    mood: pick(sceneIn.mood, MOODS, prevScene.mood || 'daily'),
    transition: pick(sceneIn.transition, TRANSITIONS, location && location === prevScene.location ? 'none' : 'dissolve'),
    bg: str(sceneIn.bg, 600) || (location === prevScene.location ? prevScene.bg || '' : ''),
  }
  const cast = []
  const seen = new Set()
  for (const entry of Array.isArray(raw?.cast) ? raw.cast : []) {
    const name = str(entry?.name, 24)
    if (!name || seen.has(name)) continue
    seen.add(name)
    cast.push({ name, pos: pick(entry?.pos, POSITIONS, '') })
  }
  // 没给站位的按出场顺序分配，避免两人挤在同一处。
  const free = ['left', 'right', 'center', 'farleft', 'farright'].filter(p => !cast.some(c => c.pos === p))
  for (const c of cast) if (!c.pos) c.pos = free.shift() || 'center'

  const lines = {}
  for (const entry of Array.isArray(raw?.lines) ? raw.lines : []) {
    const id = str(entry?.u, 12)
    if (!unitIds.has(id)) continue
    const line = {}
    const sp = str(entry.sp, 24); if (sp) line.sp = sp
    const as = str(entry.as, 24); if (as && as !== sp) line.as = as
    if (entry.emo && EMOTIONS[String(entry.emo).toLowerCase()]) line.emo = String(entry.emo).toLowerCase()
    const sym = pick(entry.sym, SYMBOLS, ''); if (sym) line.sym = sym
    const cam = pick(entry.cam, CAMERAS, ''); if (cam) line.cam = cam
    const card = pick(entry.card, CARDS, ''); if (card) line.card = card
    lines[id] = line
  }

  const choices = (Array.isArray(raw?.choices) ? raw.choices : []).map(c => str(c, 60)).filter(Boolean).slice(0, 4)

  const images = []
  for (const entry of Array.isArray(raw?.images) ? raw.images : []) {
    if (images.length >= maxImages) break
    const tags = str(entry?.tags, 1500)
    if (!tags) continue
    const after = unitIds.has(str(entry.after, 12)) ? str(entry.after, 12) : units[units.length - 1]?.id || ''
    images.push({ after, title: str(entry.title, 40), tags, desc: str(entry.desc, 600), shape: pick(entry.shape, ['landscape', 'portrait', 'square'], 'landscape') })
  }

  const people = []
  for (const entry of Array.isArray(raw?.people) ? raw.people : []) {
    const name = str(entry?.name, 24)
    if (!name) continue
    people.push({
      name,
      gender: pick(entry.gender, ['female', 'male', 'other'], ''),
      appearance: str(entry.appearance, 800),
      change: str(entry.change, 800),
      temp: str(entry.temp, 300),
    })
  }
  return { scene, cast, lines, choices, images, people, summary: str(raw?.summary, 80) }
}

/** 把档案整理成给导演看的简表（只给名字和外貌，省 token）。 */
export function castBrief(castList) {
  if (!castList.length) return '（暂无）'
  return castList.map(c => `- ${c.name}${c.global ? '（全局，冻结）' : ''}：${c.appearance || '（未建档）'}${c.temp ? `；临时：${c.temp}` : ''}`).join('\n')
}

export function previousBrief(previous) {
  if (!previous?.scene) return '（这是第一幕）'
  const s = previous.scene
  const who = (previous.cast || []).map(c => `${c.name}@${c.pos}`).join('，') || '无人'
  return `地点：${s.location || '未知'}；时段：${s.time}；天气：${s.weather}；在场：${who}${previous.summary ? '；剧情：' + previous.summary : ''}`
}

export function cardContextBrief(context, limit = 2400) {
  if (!context) return ''
  const parts = []
  if (context.description) parts.push('【人物卡】' + context.description)
  if (context.personality) parts.push('【性格】' + context.personality)
  if (context.scenario) parts.push('【情境】' + context.scenario)
  for (const entry of Array.isArray(context.lore) ? context.lore : []) {
    if (!entry?.content) continue
    parts.push(`【设定·${entry.title || '条目'}】${entry.content}`)
  }
  let text = parts.join('\n')
  if (text.length > limit) text = text.slice(0, limit) + '…'
  return text ? '【资料（仅供判断人物与外貌，勿复述）】\n' + text : ''
}

/**
 * 跑一次导演。解析失败时带着错误再要一次（只重试一次，不额外收费请求图片）。
 */
export async function direct({ llm, provider, model, units, previous, castList, context, config, backend, signal }) {
  const maxImages = Math.max(0, Math.min(4, Number(config.images?.maxPerTurn ?? 1)))
  const system = fill(config.director?.systemPrompt || DIRECTOR_SYSTEM, {
    maxImages: String(maxImages),
    styleHint: STYLE_HINTS[backend] || STYLE_HINTS.novelai,
  }) + (maxImages === 0 ? '\n\n本次不需要插画：images 给空数组。' : '')
  const user = fill(DIRECTOR_USER, {
    context: cardContextBrief(context, Number(config.director?.contextChars ?? 2400)),
    previous: previousBrief(previous),
    cast: castBrief(castList),
    units: unitsForPrompt(units),
  })
  const call = extra => callModel(llm, {
    provider, model, system, user: user + (extra || ''), signal,
    maxTokens: Number(config.director?.maxTokens ?? 6000),
    temperature: Number(config.director?.temperature ?? 0.7),
  })
  let result = await call()
  let raw
  try { raw = extractJson(result.text) } catch (error) {
    result = await call(`\n\n上一次输出无法解析（${error.message}）。只输出一个合法 JSON 对象。`)
    raw = extractJson(result.text)
  }
  return { script: normalizeScript(raw, units, { previous, maxImages }), usage: result.usage }
}
