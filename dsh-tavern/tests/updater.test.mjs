// 插件自更新：用临时的 git 仓库模拟「远端 + 用户 clone 下来的插件目录」。
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtemp, rm, writeFile, mkdir, access } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createUpdater } from '../lib/updater.js'

const ENV = { ...process.env, GIT_AUTHOR_NAME: 'igs', GIT_AUTHOR_EMAIL: 'igs@example.invalid', GIT_COMMITTER_NAME: 'igs', GIT_COMMITTER_EMAIL: 'igs@example.invalid', GIT_CONFIG_NOSYSTEM: '1', HOME: tmpdir() }
const git = (cwd, ...args) => execFileSync('git', args, { cwd, env: ENV, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()
const hasGit = (() => { try { git(tmpdir(), '--version'); return true } catch { return false } })()

async function commit(repo, file, text, message) {
  await mkdir(join(repo, file, '..'), { recursive: true })
  await writeFile(join(repo, file), text)
  git(repo, 'add', '.')
  git(repo, 'commit', '-qm', message)
}

/** 远端：main 只有 README；feat 分支加了插件。用户按 README 的装法 clone -b feat。 */
async function setup() {
  const dir = await mkdtemp(join(tmpdir(), 'igs-update-'))
  const remote = join(dir, 'remote.git'), dev = join(dir, 'dev'), user = join(dir, 'user')
  git(dir, 'init', '-q', '--bare', remote)
  git(dir, 'clone', '-q', remote, dev)
  git(dev, 'checkout', '-qb', 'main')
  await commit(dev, 'README.md', 'igs', 'init')
  git(dev, 'push', '-q', 'origin', 'main')
  git(dev, 'checkout', '-qb', 'feat')
  await commit(dev, 'dsh-tavern/package.json', '{"version":"0.1.0"}', 'feat: 插件')
  git(dev, 'push', '-q', '-u', 'origin', 'feat')
  git(dir, 'clone', '-q', '-b', 'feat', remote, user)
  return { dir, dev, user, plugin: join(user, 'dsh-tavern') }
}

test('gate: 插件是 git 克隆时能检查更新、一键快进，更新后提示重启', { skip: !hasGit }, async () => {
  const { dir, dev, user, plugin } = await setup()
  try {
    const updater = createUpdater({ root: plugin })
    const fresh = await updater.status('force')
    assert.equal(fresh.managed, true)
    assert.equal(fresh.current.tracking, 'origin/feat')
    assert.equal(fresh.last.behind, 0)
    assert.equal(fresh.restartRequired, false)

    await commit(dev, 'dsh-tavern/lib.js', '1', 'feat: 导演日志')
    await commit(dev, 'README.md', 'igs 2', 'docs: 只改了仓库说明')
    git(dev, 'push', '-q', 'origin', 'feat')
    const behind = await updater.status('force')
    assert.equal(behind.last.behind, 2)
    assert.deepEqual(behind.last.commits.map(c => c.subject), ['feat: 导演日志'])

    const done = await updater.apply()
    assert.equal(done.restartRequired, true)
    assert.equal(done.last.behind, 0)
    assert.equal(done.current.subject, 'docs: 只改了仓库说明')
    await access(join(plugin, 'lib.js'))

    // 本地改过、又会被更新覆盖的文件：git 拦下，不覆盖。
    await writeFile(join(plugin, 'lib.js'), 'mine')
    await commit(dev, 'dsh-tavern/lib.js', '2', 'fix: 改同一个文件')
    git(dev, 'push', '-q', 'origin', 'feat')
    await assert.rejects(updater.apply(), /overwritten|local changes/i)
    git(user, 'checkout', '--', 'dsh-tavern/lib.js')
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('gate: 跟踪的分支在远端被删后，main 上有插件才改跟 main', { skip: !hasGit }, async () => {
  const { dir, dev, plugin } = await setup()
  try {
    const updater = createUpdater({ root: plugin })
    git(dev, 'push', '-q', 'origin', '--delete', 'feat')
    const gone = await updater.status('force')
    assert.equal(gone.last.gone, true)
    assert.equal(gone.last.fallback, 'main')
    await assert.rejects(updater.switchToFallback(), /还没有这个插件/)

    git(dev, 'checkout', '-q', 'main')
    git(dev, 'merge', '-q', '--no-ff', '-m', 'Merge feat', 'feat')
    git(dev, 'push', '-q', 'origin', 'main')
    const moved = await updater.switchToFallback()
    assert.equal(moved.current.branch, 'main')
    assert.equal(moved.current.tracking, 'origin/main')
    assert.equal(moved.last.behind, 0)
    assert.equal(moved.restartRequired, true)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('gate: 插件目录不是 git 克隆时只给手动更新的说明', { skip: !hasGit }, async () => {
  const dir = await mkdtemp(join(tmpdir(), 'igs-plain-'))
  try {
    const status = await createUpdater({ root: dir }).status('force')
    assert.equal(status.managed, false)
    assert.match(status.reason, /不是 git 克隆/)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})

test('gate: 插件被复制进别的 git 仓库时不当成可更新的克隆', { skip: !hasGit }, async () => {
  const dir = await mkdtemp(join(tmpdir(), 'igs-copied-'))
  try {
    git(dir, 'init', '-q')
    await mkdir(join(dir, 'node_modules', 'dsh-tavern-igs'), { recursive: true })
    await writeFile(join(dir, 'node_modules', 'dsh-tavern-igs', 'package.json'), '{}')
    await writeFile(join(dir, '.gitignore'), 'node_modules/\n')
    await commit(dir, 'profile.json', '{}', 'profile')
    const status = await createUpdater({ root: join(dir, 'node_modules', 'dsh-tavern-igs') }).status('none')
    assert.equal(status.managed, false)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})
