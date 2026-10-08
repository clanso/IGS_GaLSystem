// 把 src/client 打成 DSH 浏览器插件格式的 client.js：
// window.__ModuleLoader__.load({ id, factory: require => module.exports })
// react 由宿主提供（require('react')），不打进包里。IGS 的漫画符号与演出样式直接从 app/src 复用。
import { build } from 'esbuild'
import { writeFile, readFile, mkdir } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))

// 复用 IGS 的漫画符号演出样式：只摘出符号贴纸相关的规则。
const igsUi = join(root, '../app/src/visual/igs-ui')
const { FX_STYLE_TEXT } = await import(pathToFileURL(join(igsUi, 'fx-style.js')).href)
const symbolCss = FX_STYLE_TEXT.split('\n').filter(line => /\.igs-fx-symbol|\.igs-fx-svg|@keyframes igs-fx-pop|@keyframes igs-fx-part-/.test(line)).join('\n')
await mkdir(join(root, 'src/client/generated'), { recursive: true })
await writeFile(join(root, 'src/client/generated/igs-fx.css'), '/* 由 build-client.mjs 从 app/src/visual/igs-ui/fx-style.js 摘出，请勿手改。 */\n' + symbolCss + '\n')
const result = await build({
  entryPoints: [join(root, 'src/client/index.jsx')],
  bundle: true,
  write: false,
  format: 'cjs',
  platform: 'browser',
  target: ['chrome110', 'safari16'],
  external: ['react'],
  jsx: 'transform',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  loader: { '.css': 'text', '.jsx': 'jsx' },
  define: { __IGS_VERSION__: JSON.stringify(pkg.version) },
  minify: process.argv.includes('--minify'),
  legalComments: 'none',
  charset: 'utf8',
})
const code = result.outputFiles[0].text
const wrapped = `/* dsh-tavern-igs ${pkg.version} 浏览器半边 —— 由 scripts/build-client.mjs 从 src/client 生成，请勿手改。 */
window.__ModuleLoader__.load({
  id: 'dsh-tavern-igs',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    try {
${code}
    } catch (error) {
      try { console.warn('[dsh-tavern-igs] 浏览器半边加载失败，已停用：', error && error.message); } catch (_) {}
      module.exports = { name: 'dsh-tavern-igs', inject: [], apply: function () {} };
    }
    return module.exports;
  },
});
`
await writeFile(join(root, 'client.js'), wrapped)
console.log(`client.js ${(wrapped.length / 1024).toFixed(1)} KB`)
