// 浏览器用的 JSON 接口：/plugins/dsh-tavern-igs/api/*
// 防跨站：所有 JSON 接口要求自定义请求头 x-igs-request（跨站页面发不出这个头而不触发预检），
// 写操作还要求 POST + JSON。图片（/asset）是只读公开资源。
export const BASE = '/plugins/dsh-tavern-igs/api'
const MAX_BODY = 16 * 1024 * 1024

function send(res, status, body) {
  const data = Buffer.from(JSON.stringify(body))
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'content-length': data.byteLength, 'cache-control': 'no-store' })
  res.end(data)
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on('data', chunk => {
      size += chunk.length
      if (size > MAX_BODY) { reject(new Error('请求太大')); req.destroy(); return }
      chunks.push(chunk)
    })
    req.on('end', () => {
      if (!size) return resolve({})
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))) } catch { reject(new Error('请求不是合法 JSON')) }
    })
    req.on('error', reject)
  })
}

export function createRoutes({ engine, logger }) {
  // 每局一个修订号：浏览器长轮询 /game?since=N，有变化立即返回。
  const revisions = new Map()
  const waiters = new Map()
  engine.subscribe(gameId => {
    const ids = gameId === 'queue' ? [...revisions.keys()] : [gameId]
    for (const id of ids) {
      revisions.set(id, (revisions.get(id) || 0) + 1)
      for (const wake of waiters.get(id) || []) wake()
      waiters.delete(id)
    }
  })
  const wait = (gameId, ms) => new Promise(resolve => {
    const list = waiters.get(gameId) || []
    const timer = setTimeout(done, ms)
    function done() { clearTimeout(timer); resolve() }
    list.push(done)
    waiters.set(gameId, list)
  })

  const json = (method, path, handler) => ({
    kind: 'exact',
    path: BASE + path,
    handler: async (req, res) => {
      try {
        if (req.method !== method) return send(res, 405, { ok: false, error: '方法不对' })
        if (req.headers['x-igs-request'] !== '1') return send(res, 403, { ok: false, error: '缺少插件请求头' })
        if (method === 'POST' && !/application\/json/i.test(req.headers['content-type'] || '')) return send(res, 415, { ok: false, error: '需要 JSON' })
        const url = new URL(req.url || '/', 'http://localhost')
        const body = method === 'POST' ? await readBody(req) : {}
        const result = await handler({ url, body, query: Object.fromEntries(url.searchParams) })
        send(res, 200, { ok: true, ...(result || {}) })
      } catch (error) {
        logger.warn?.(`[dsh-tavern-igs] ${path}: ${error?.message || error}`)
        if (!res.headersSent) send(res, 400, { ok: false, error: String(error?.message || error).slice(0, 400) })
      }
    },
  })

  const needGame = q => { const id = String(q.gameId || ''); if (!id) throw new Error('缺少 gameId'); return id }

  return [
    json('GET', '/game', async ({ query }) => {
      const gameId = needGame(query)
      const since = Number(query.since)
      if (!revisions.has(gameId)) revisions.set(gameId, 1)
      if (Number.isFinite(since) && since === revisions.get(gameId)) await wait(gameId, 20000)
      return { rev: revisions.get(gameId), view: await engine.gameView(gameId) }
    }),
    json('POST', '/direct', async ({ body }) => ({ scene: await engine.directTurn({ gameId: needGame(body), turn: Number(body.turn), force: Boolean(body.force) }) })),
    json('POST', '/replan', async ({ body }) => engine.replanTurn(needGame(body), Number(body.turn))),
    json('POST', '/image/render', async ({ body }) => {
      const gameId = needGame(body)
      engine.renderCg(gameId, String(body.imageId), body.overrides || {}).catch(() => {})
      return {}
    }),
    json('POST', '/image/rewrite', async ({ body }) => ({ draft: await engine.rewritePrompt(needGame(body), String(body.imageId), String(body.instruction || '')) })),
    json('POST', '/image/version', async ({ body }) => { await engine.selectVersion(needGame(body), String(body.imageId), Number(body.index)); return {} }),
    json('POST', '/image/delete', async ({ body }) => { await engine.deleteImage(needGame(body), String(body.imageId)); return {} }),
    json('POST', '/image/add', async ({ body }) => ({ imageId: await engine.addImageAt(needGame(body), Number(body.turn), String(body.after || ''), body.plan || {}) })),
    json('POST', '/cancel', async ({ body }) => ({ cancelled: engine.cancel(needGame(body), String(body.kind || 'cg'), String(body.id || '')) })),
    json('POST', '/place/render', async ({ body }) => { await engine.ensurePlace(needGame(body), String(body.key || '')); return {} }),
    json('POST', '/cast', async ({ body }) => engine.castAction(needGame(body), String(body.action || ''), body)),
    json('GET', '/config', async () => engine.publicConfig()),
    json('POST', '/config', async ({ body }) => engine.patchConfig(body.patch || {})),
    json('POST', '/secret', async ({ body }) => engine.setSecret(String(body.backend || ''), String(body.endpoint || ''), String(body.value ?? ''))),
    json('POST', '/test', async () => engine.testBackend()),
    json('GET', '/llm', async ({ query }) => engine.llmModels(String(query.provider || ''))),
    {
      kind: 'exact',
      path: BASE + '/asset',
      handler: async (req, res) => {
        const id = new URL(req.url || '/', 'http://localhost').searchParams.get('id') || ''
        const asset = await engine.readAsset(id).catch(() => null)
        if (!asset) { res.writeHead(404); res.end(); return }
        res.writeHead(200, { 'content-type': asset.mediaType, 'content-length': asset.data.byteLength, 'cache-control': 'private, max-age=31536000, immutable', 'x-content-type-options': 'nosniff' })
        res.end(asset.data)
      },
    },
  ]
}
