// 插件自己的持久化：只写 $DSH_HOME/dsh-tavern-igs/ 下的文件，不碰 Tavern 数据目录。
//   config.json        插件设置（不含密钥）
//   secrets.json       没有 DSH 凭据服务时的后备密钥存储（0600）
//   global-cast.json   全局角色库（柏宝绘「提升为全局」）
//   games/<id>.json    每局的场景脚本、角色档案、图片记录
//   assets/<id>.<ext>  生成的图片（CG、背景、立绘）
import { homedir } from 'node:os'
import { join } from 'node:path'
import { mkdir, readFile, writeFile, rename, rm, chmod, readdir, stat } from 'node:fs/promises'
import { randomUUID, createHash } from 'node:crypto'

export function dataRoot(env = process.env) {
  const home = env.DSH_HOME && env.DSH_HOME.length ? env.DSH_HOME : join(homedir(), '.dsh')
  return join(home, 'dsh-tavern-igs')
}

const SAFE_ID = /^[A-Za-z0-9._-]{1,128}$/
export function safeId(id) {
  const text = String(id ?? '')
  if (SAFE_ID.test(text) && text !== '.' && text !== '..') return text
  // gameId 来自 DSH，通常已经安全；万一带了奇怪字符就哈希成文件名。
  return 'h-' + createHash('sha256').update(text).digest('hex').slice(0, 32)
}

async function atomicWrite(file, data, mode) {
  const tmp = file + '.' + randomUUID().slice(0, 8) + '.tmp'
  await writeFile(tmp, data, mode ? { mode } : undefined)
  await rename(tmp, file)
  if (mode) { try { await chmod(file, mode) } catch {} }
}

/** 同一文件的读改写串行化，避免并发任务互相覆盖。 */
function createLocks() {
  const tails = new Map()
  return function lock(key, fn) {
    const prev = tails.get(key) || Promise.resolve()
    const next = prev.then(fn, fn)
    const tail = next.catch(() => {})
    tails.set(key, tail)
    tail.then(() => { if (tails.get(key) === tail) tails.delete(key) })
    return next
  }
}

export function createStore(root = dataRoot()) {
  const lock = createLocks()
  const ready = (async () => {
    await mkdir(join(root, 'games'), { recursive: true })
    await mkdir(join(root, 'assets'), { recursive: true })
  })()

  async function readJson(file, fallback) {
    await ready
    try { return JSON.parse(await readFile(file, 'utf8')) } catch { return structuredClone(fallback) }
  }
  async function writeJson(file, value, mode) {
    await ready
    await atomicWrite(file, JSON.stringify(value, null, 1), mode)
  }
  function update(file, fallback, mutate, mode) {
    return lock(file, async () => {
      const value = await readJson(file, fallback)
      const result = await mutate(value)
      await writeJson(file, value, mode)
      return result === undefined ? value : result
    })
  }

  const gameFile = gameId => join(root, 'games', safeId(gameId) + '.json')
  const EMPTY_GAME = { version: 1, scenes: {}, images: {}, cast: {}, castLog: [], places: {}, style: null }

  const MIME_EXT = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif' }

  return {
    root,
    readConfig: () => readJson(join(root, 'config.json'), {}),
    updateConfig: mutate => update(join(root, 'config.json'), {}, mutate),
    readSecrets: () => readJson(join(root, 'secrets.json'), {}),
    updateSecrets: mutate => update(join(root, 'secrets.json'), {}, mutate, 0o600),
    readGlobalCast: () => readJson(join(root, 'global-cast.json'), { cast: {} }),
    updateGlobalCast: mutate => update(join(root, 'global-cast.json'), { cast: {} }, mutate),
    readGame: gameId => readJson(gameFile(gameId), EMPTY_GAME),
    updateGame: (gameId, mutate) => update(gameFile(gameId), EMPTY_GAME, mutate),
    async removeGame(gameId) {
      const game = await readJson(gameFile(gameId), EMPTY_GAME)
      const assets = new Set()
      for (const image of Object.values(game.images || {})) for (const v of image.versions || []) if (v.assetId) assets.add(v.assetId)
      for (const place of Object.values(game.places || {})) if (place.assetId) assets.add(place.assetId)
      for (const person of Object.values(game.cast || {})) for (const a of Object.values(person.sprites || {})) if (a) assets.add(a)
      await Promise.all([...assets].map(id => this.removeAsset(id)))
      await rm(gameFile(gameId), { force: true })
    },
    async saveAsset(bytes, mediaType) {
      await ready
      const ext = MIME_EXT[mediaType] || 'png'
      const id = randomUUID().replace(/-/g, '') + '.' + ext
      await atomicWrite(join(root, 'assets', id), bytes)
      return id
    },
    async readAsset(id) {
      await ready
      if (!/^[a-f0-9]{32}\.(png|jpg|webp|gif)$/.test(String(id))) return null
      const file = join(root, 'assets', id)
      try {
        const [data, info] = await Promise.all([readFile(file), stat(file)])
        const ext = id.split('.').pop()
        const mediaType = Object.entries(MIME_EXT).find(([, e]) => e === ext)?.[0] || 'application/octet-stream'
        return { data, mediaType, mtime: info.mtimeMs }
      } catch { return null }
    },
    async removeAsset(id) {
      if (!/^[a-f0-9]{32}\.(png|jpg|webp|gif)$/.test(String(id))) return
      await rm(join(root, 'assets', id), { force: true })
    },
    async listGames() {
      await ready
      return (await readdir(join(root, 'games'))).filter(f => f.endsWith('.json')).map(f => f.slice(0, -5))
    },
  }
}

/** 检测图片真实格式（不信任上游声明的 content-type）。 */
export function sniffImage(bytes) {
  const b = bytes
  if (!b || b.length < 12) return null
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return 'image/png'
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg'
  if (b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50) return 'image/webp'
  if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46) return 'image/gif'
  return null
}
