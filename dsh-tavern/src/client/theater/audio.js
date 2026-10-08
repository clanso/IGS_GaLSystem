// 配乐（IGS 默认曲目，交叉淡入淡出）+ 打字音 / 界面音（WebAudio 合成，不需要音频文件）。
let bgm = null       // { el, id }
let ctx = null

function audioCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  return ctx
}

function fade(el, to, ms, done) {
  const from = el.volume
  const start = performance.now()
  const tick = now => {
    const k = Math.min(1, (now - start) / ms)
    el.volume = Math.max(0, Math.min(1, from + (to - from) * k))
    if (k < 1) requestAnimationFrame(tick)
    else if (done) done()
  }
  requestAnimationFrame(tick)
}

export function playBgm(track, volume = 0.45) {
  if (!track) { stopBgm(); return }
  if (bgm && bgm.id === track.id) { bgm.el.volume = Math.min(bgm.el.volume, volume); fade(bgm.el, volume, 400); return }
  const old = bgm
  const el = new Audio()
  el.src = track.url
  el.loop = true
  el.volume = 0
  el.crossOrigin = 'anonymous'
  el.play().then(() => fade(el, volume, 1800)).catch(() => {})
  bgm = { el, id: track.id }
  if (old) fade(old.el, 0, 1400, () => { old.el.pause(); old.el.src = '' })
}

export function stopBgm() {
  if (!bgm) return
  const old = bgm
  bgm = null
  fade(old.el, 0, 900, () => { old.el.pause(); old.el.src = '' })
}

/** 打字音：每个说话人一个音高，旁白低一点。 */
export function blip(seed = '', type = 'dialogue') {
  const ac = audioCtx()
  if (!ac) return
  let h = 0
  for (const ch of String(seed)) h = (h * 31 + ch.codePointAt(0)) >>> 0
  const base = type === 'narration' ? 300 : 420 + (h % 7) * 38
  const t = ac.currentTime
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = type === 'thought' ? 'sine' : 'triangle'
  osc.frequency.setValueAtTime(base * (0.96 + Math.random() * 0.08), t)
  gain.gain.setValueAtTime(0.0001, t)
  gain.gain.exponentialRampToValueAtTime(0.045, t + 0.004)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05)
  osc.connect(gain).connect(ac.destination)
  osc.start(t)
  osc.stop(t + 0.06)
}

/** 界面音：hover / select / page。 */
export function sfx(kind = 'select') {
  const ac = audioCtx()
  if (!ac) return
  const t = ac.currentTime
  const notes = { hover: [880], select: [660, 990], page: [520], open: [440, 660, 880], back: [660, 440] }[kind] || [660]
  notes.forEach((f, i) => {
    const osc = ac.createOscillator()
    const gain = ac.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(f, t + i * 0.06)
    gain.gain.setValueAtTime(0.0001, t + i * 0.06)
    gain.gain.exponentialRampToValueAtTime(kind === 'hover' ? 0.018 : 0.05, t + i * 0.06 + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.06 + 0.18)
    osc.connect(gain).connect(ac.destination)
    osc.start(t + i * 0.06)
    osc.stop(t + i * 0.06 + 0.2)
  })
}
