// 界面皮肤：只换变量、字体和少量装饰（styles/skins.css）。字体用 IGS 发布包里的分片字体，按需下载。
export const SKINS = [
  { id: 'stellar', name: '星穹', desc: '深空玻璃 · 霓虹渐变', swatch: 'linear-gradient(120deg, #120c2c, #ff7eb6 55%, #5ee7ff)', fonts: ['LXGWNeoXiHei', 'SourceHanSerifCN-Regular'] },
  { id: 'sakura', name: '樱色', desc: '浅色毛玻璃 · 文楷', swatch: 'linear-gradient(120deg, #fff4f8, #ffb3cf 55%, #c7b8ff)', fonts: ['LXGWWenKai-Regular'] },
  { id: 'ink', name: '水墨', desc: '宣纸 · 朱印 · 古风', swatch: 'linear-gradient(120deg, #f3ead6, #3a3530 60%, #b3261e)', fonts: ['HuiwenMincho', 'LXGWWenKai-Regular'] },
  { id: 'noir', name: '夜金', desc: '黑金 · 电影字幕', swatch: 'linear-gradient(120deg, #070707, #2a2318 50%, #d8b26a)', fonts: ['LXGWNeoZhiSong'] },
  { id: 'cyber', name: '赛博', desc: '扫描线 · 终端', swatch: 'linear-gradient(120deg, #031014, #00f0ff 50%, #ff2bd6)', fonts: ['LXGWNeoXiHei'] },
]

const sheets = new Map() // font.css 地址 → 加载完成的 Promise
const latinLoaded = new Set()
/** 把皮肤要用的 IGS 字体挂到 <head>（unicode-range 分片，只下载用到的字）。返回字体表都加载完（或失败）的 Promise。 */
export function loadSkinFonts(skinId, base) {
  const skin = SKINS.find(s => s.id === skinId) || SKINS[0]
  if (!base) return Promise.resolve()
  const root = base.replace(/\/?$/, '/')
  const pending = skin.fonts.map(font => {
    const href = `${root}fonts/${font}/font.css`
    if (!sheets.has(href)) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      link.dataset.igsd = 'font'
      sheets.set(href, new Promise(resolve => { link.onload = resolve; link.onerror = resolve }))
      document.head.appendChild(link)
    }
    return sheets.get(href)
  })
  const latin = `${root}fonts/CormorantGaramond-Regular.woff2`
  if (!latinLoaded.has(latin) && typeof FontFace === 'function') {
    latinLoaded.add(latin)
    try { const face = new FontFace('IGS Cormorant', `url("${latin}")`); face.load().then(f => document.fonts.add(f)).catch(() => {}) } catch {}
  }
  return Promise.all(pending)
}

/**
 * 提前下载这些字所在的字体分片。分片没到时浏览器先用系统字体画、到了再换（font-display: swap），
 * 翻页时就会看到整句「闪一下」。el 是剧场根节点，从它身上读当前皮肤的正文 / 标题字体。
 * limit > 0 时最多等这么久（网络太慢就先用系统字体显示）。
 */
export function loadGlyphs(el, { body = '', display = '' }, limit = 0) {
  if (!el || typeof document === 'undefined' || !document.fonts) return Promise.resolve()
  const style = getComputedStyle(el)
  const jobs = [['--font-body', body], ['--font-display', display]].map(([name, text]) => {
    const family = style.getPropertyValue(name).trim()
    return family && text ? document.fonts.load(`16px ${family}`, text).catch(() => {}) : null
  }).filter(Boolean)
  const all = Promise.all(jobs)
  return limit > 0 ? Promise.race([all, new Promise(resolve => setTimeout(resolve, limit))]) : all
}
