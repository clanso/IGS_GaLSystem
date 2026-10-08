// 导演可用的演出词汇。前后端共用：后端用来校验，前端用来渲染。
export const EMOTIONS = {
  neutral: '平静', smile: '微笑', happy: '开心', laugh: '大笑', shy: '害羞', blush: '脸红',
  sad: '难过', cry: '哭泣', angry: '生气', pout: '赌气', surprised: '惊讶', scared: '害怕',
  worried: '担心', smug: '得意', serious: '认真', tired: '疲惫', love: '心动', confused: '困惑',
  thinking: '思考', determined: '坚定', cold: '冷淡', teasing: '调侃',
}

export const EMOTION_TAGS = {
  neutral: 'neutral expression, closed mouth', smile: 'light smile', happy: 'happy, smile, open mouth',
  laugh: 'laughing, closed eyes, open mouth', shy: 'shy, looking away, light blush', blush: 'blush, embarrassed',
  sad: 'sad, frown, downcast eyes', cry: 'crying, tears', angry: 'angry, furrowed brow, clenched teeth',
  pout: 'pout, puffed cheeks', surprised: 'surprised, wide eyes, open mouth', scared: 'scared, trembling',
  worried: 'worried, frown', smug: 'smug, smirk', serious: 'serious, expressionless', tired: 'tired, half-closed eyes',
  love: 'blush, heart-shaped pupils, smile', confused: 'confused, head tilt', thinking: 'thinking, hand on chin',
  determined: 'determined, serious', cold: 'expressionless, cold eyes', teasing: 'teasing smile, one eye closed',
}

/** 情绪符号（漫画符）：在立绘头顶弹出。 */
// 与 IGS 漫画符号（app/src/visual/igs-ui/fx-symbols.js）同名，前端直接复用那套 SVG 贴纸。
export const SYMBOLS = ['heart', 'anger', 'sweat', 'sparkle', 'surprise', 'gloom', 'note', 'zzz', 'bulb', 'heartbreak', 'sigh', 'dizzy', 'fire', 'blush', 'bloom', 'silence']
/** 镜头语言。 */
export const CAMERAS = ['shake', 'zoom', 'zoomout', 'flash', 'pan', 'blur', 'fadeblack', 'redflash', 'tilt']
/** 屏幕天气 / 粒子。 */
export const WEATHER = ['clear', 'rain', 'storm', 'snow', 'sakura', 'leaves', 'fireflies', 'fog', 'embers', 'dust', 'bokeh', 'stars']
/** 时段：决定背景调色。 */
export const TIMES = ['dawn', 'morning', 'noon', 'afternoon', 'dusk', 'evening', 'night', 'midnight']
/** 转场。 */
export const TRANSITIONS = ['dissolve', 'cinematic', 'wipe', 'iris', 'strips', 'black', 'flash', 'none']
/** 情境卡片：短信、信件等不放在对话框里，单独演出。 */
export const CARDS = ['sms', 'letter', 'note', 'news', 'terminal', 'notice', 'diary', 'scroll']
/** 配乐情绪：与 IGS 默认曲目包（app/src/scene/bgm-moods.js）一致；silence 为关键时刻留白。 */
export const MOODS = ['daily', 'cheerful', 'sweet', 'calm', 'sad', 'tense', 'battle', 'eerie', 'silence']
/** 立绘站位。 */
export const POSITIONS = ['left', 'center', 'right', 'farleft', 'farright']

export function pick(value, list, fallback) {
  const text = String(value ?? '').trim().toLowerCase()
  return list.includes(text) ? text : fallback
}
