// 界面皮肤：只换变量、字体和少量装饰（styles/skins.css）。字体用 IGS 发布包里的分片字体，按需下载。
export const SKINS = [
  { id: 'stellar', name: '星穹', desc: '深空玻璃 · 霓虹渐变', swatch: 'linear-gradient(120deg, #120c2c, #ff7eb6 55%, #5ee7ff)', fonts: ['LXGWNeoXiHei', 'SourceHanSerifCN-Regular'] },
  { id: 'sakura', name: '樱色', desc: '浅色毛玻璃 · 文楷', swatch: 'linear-gradient(120deg, #fff4f8, #ffb3cf 55%, #c7b8ff)', fonts: ['LXGWWenKai-Regular'] },
  { id: 'ink', name: '水墨', desc: '宣纸 · 朱印 · 古风', swatch: 'linear-gradient(120deg, #f3ead6, #3a3530 60%, #b3261e)', fonts: ['HuiwenMincho', 'LXGWWenKai-Regular'] },
  { id: 'noir', name: '夜金', desc: '黑金 · 电影字幕', swatch: 'linear-gradient(120deg, #070707, #2a2318 50%, #d8b26a)', fonts: ['LXGWNeoZhiSong'] },
  { id: 'cyber', name: '赛博', desc: '扫描线 · 终端', swatch: 'linear-gradient(120deg, #031014, #00f0ff 50%, #ff2bd6)', fonts: ['LXGWNeoXiHei'] },
]

const loaded = new Set()
/** 把皮肤要用的 IGS 字体挂到 <head>（unicode-range 分片，只下载用到的字）。 */
export function loadSkinFonts(skinId, base) {
  const skin = SKINS.find(s => s.id === skinId) || SKINS[0]
  if (!base) return
  const root = base.replace(/\/?$/, '/')
  for (const font of skin.fonts) {
    const href = `${root}fonts/${font}/font.css`
    if (loaded.has(href)) continue
    loaded.add(href)
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.dataset.igsd = 'font'
    document.head.appendChild(link)
  }
  const latin = `${root}fonts/CormorantGaramond-Regular.woff2`
  if (!loaded.has(latin) && typeof FontFace === 'function') {
    loaded.add(latin)
    try { const face = new FontFace('IGS Cormorant', `url("${latin}")`); face.load().then(f => document.fonts.add(f)).catch(() => {}) } catch {}
  }
}
