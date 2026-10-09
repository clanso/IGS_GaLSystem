/* dsh-tavern-igs 0.1.0 浏览器半边 —— 由 scripts/build-client.mjs 从 src/client 生成，请勿手改。 */
window.__ModuleLoader__.load({
  id: 'dsh-tavern-igs',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    try {
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.jsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);
var import_react9 = __toESM(require("react"), 1);

// src/client/styles/theater.css
var theater_default = '/* ───────────── 沉浸式 Galgame · 剧场 ─────────────\n   所有类名以 igsd- 开头；皮肤只改 data-skin 上的变量与少量装饰。\n   舞台是 16:9 的容器（container-type:size），字号用 cqw 随舞台缩放。 */\n\n.igsd-theater {\n  --accent: #ff7eb6; --accent2: #9b7bff; --accent3: #5ee7ff;\n  --ink: #f5f3ff; --ink-dim: rgba(235, 232, 255, .62);\n  --box-bg: linear-gradient(180deg, rgba(18, 16, 40, .66), rgba(8, 8, 24, .86));\n  --box-border: rgba(255, 255, 255, .14);\n  --box-radius: 1.4cqw;\n  --box-blur: blur(18px) saturate(1.5);\n  --name-ink: #fff;\n  --panel-bg: rgba(10, 10, 26, .82);\n  --chip-bg: rgba(10, 10, 28, .5);\n  --font-body: "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", system-ui, sans-serif;\n  --font-display: "Noto Serif SC", "Source Han Serif SC", "Songti SC", "STSong", serif;\n  --font-latin: "Cormorant Garamond", "Playfair Display", Georgia, serif;\n  --wait-glyph: "◆";\n  position: fixed; inset: 0; z-index: 2147483000; overflow: hidden; overflow: clip;\n  display: flex; align-items: center; justify-content: center;\n  background: #05040c; color: var(--ink);\n  font-family: var(--font-body);\n  -webkit-font-smoothing: antialiased;\n  user-select: none; -webkit-user-select: none;\n  animation: igsd-fade-in .5s ease both;\n}\n.igsd-theater *, .igsd-theater *::before, .igsd-theater *::after { box-sizing: border-box; }\n:where(.igsd-theater) button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; padding: 0; }\n.igsd-theater.is-closing { animation: igsd-fade-out .35s ease both; }\n\n.igsd-stage {\n  position: relative; overflow: hidden; overflow: clip;\n  width: min(100vw, calc(100vh * 16 / 9)); height: min(100vh, calc(100vw * 9 / 16));\n  container-type: size; container-name: stage;\n  background: #000;\n  box-shadow: 0 0 120px rgba(0, 0, 0, .8);\n}\n@media (max-aspect-ratio: 4/5) {\n  /* 竖屏手机：舞台铺满，立绘居中放大，对话框加高。 */\n  .igsd-stage { width: 100vw; height: 100vh; }\n}\n.igsd-camera { position: absolute; inset: 0; transform-origin: 50% 45%; }\n\n/* ── 背景层 ── */\n.igsd-bg { position: absolute; inset: -3%; background-size: cover; background-position: center 42%; will-change: transform, opacity; }\n.igsd-bg.is-image { animation: igsd-kenburns 38s ease-in-out infinite alternate; }\n.igsd-bg.is-enter { animation: var(--enter-anim, igsd-dissolve) var(--enter-dur, 1.1s) cubic-bezier(.6, .05, .3, 1) both, igsd-kenburns 38s ease-in-out infinite alternate; }\n.igsd-bg.is-leave { animation: igsd-fade-out .9s ease both; }\n@keyframes igsd-kenburns { from { transform: scale(1.02) translate(0, 0); } to { transform: scale(1.1) translate(-1.6%, -1.2%); } }\n@keyframes igsd-dissolve { from { opacity: 0; filter: blur(8px) brightness(1.3); } to { opacity: 1; filter: none; } }\n@keyframes igsd-wipe { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }\n@keyframes igsd-iris { from { clip-path: circle(0% at 50% 50%); } to { clip-path: circle(80% at 50% 50%); } }\n@keyframes igsd-cinematic { 0% { clip-path: inset(50% 0 50% 0); filter: brightness(2); } 60% { clip-path: inset(8% 0 8% 0); } 100% { clip-path: inset(0 0 0 0); filter: none; } }\n@keyframes igsd-strips { from { -webkit-mask-size: 100% 0%; mask-size: 100% 0%; } to { -webkit-mask-size: 100% 100%; mask-size: 100% 100%; } }\n.igsd-bg.is-enter[data-tr="strips"] { -webkit-mask-image: repeating-linear-gradient(90deg, #000 0 8%, transparent 8% 8.0001%); mask-image: linear-gradient(#000, #000); -webkit-mask-repeat: no-repeat; }\n@keyframes igsd-flash-in { 0% { opacity: 0; filter: brightness(4); } 30% { opacity: 1; filter: brightness(3); } 100% { filter: none; } }\n@keyframes igsd-black-in { 0%, 45% { opacity: 0; } 100% { opacity: 1; } }\n\n/* 没有背景图时的程序化舞台：天色渐变 + 远景剪影 + 光斑。 */\n.igsd-sky { position: absolute; inset: 0; transition: background 1.6s ease; }\n.igsd-sky::before { content: ""; position: absolute; left: -10%; right: -10%; bottom: 0; height: 46%;\n  background:\n    radial-gradient(60% 120% at 20% 100%, rgba(0, 0, 0, .55), transparent 70%),\n    radial-gradient(50% 90% at 78% 100%, rgba(0, 0, 0, .5), transparent 70%);\n}\n.igsd-sky::after { content: ""; position: absolute; inset: 0;\n  background: radial-gradient(40% 30% at var(--sun-x, 70%) var(--sun-y, 30%), var(--sun, rgba(255, 220, 180, .55)), transparent 70%);\n  mix-blend-mode: screen; animation: igsd-breathe-light 9s ease-in-out infinite;\n}\n.igsd-skyline { position: absolute; left: 0; right: 0; bottom: 0; height: 38%; opacity: .9; }\n@keyframes igsd-breathe-light { 0%, 100% { opacity: .75; } 50% { opacity: 1; } }\n\n/* 时段调色：叠一层渐变，混合模式按时段变化。 */\n.igsd-grade { position: absolute; inset: 0; pointer-events: none; transition: background 1.4s ease, opacity 1.4s ease; mix-blend-mode: soft-light; }\n.igsd-grade[data-time="dawn"] { background: linear-gradient(180deg, rgba(255, 170, 200, .55), rgba(120, 140, 255, .35)); }\n.igsd-grade[data-time="morning"] { background: linear-gradient(180deg, rgba(255, 245, 220, .35), rgba(255, 255, 255, 0)); }\n.igsd-grade[data-time="noon"] { opacity: 0; }\n.igsd-grade[data-time="afternoon"] { background: linear-gradient(180deg, rgba(255, 220, 160, .35), rgba(255, 200, 120, .15)); }\n.igsd-grade[data-time="dusk"] { background: linear-gradient(180deg, rgba(255, 120, 60, .7), rgba(140, 40, 120, .55)); mix-blend-mode: overlay; }\n.igsd-grade[data-time="evening"] { background: linear-gradient(180deg, rgba(90, 60, 200, .6), rgba(255, 110, 120, .35)); mix-blend-mode: overlay; }\n.igsd-grade[data-time="night"] { background: linear-gradient(180deg, rgba(10, 20, 80, .78), rgba(20, 10, 60, .7)); mix-blend-mode: multiply; }\n.igsd-grade[data-time="midnight"] { background: linear-gradient(180deg, rgba(4, 6, 40, .86), rgba(10, 4, 30, .8)); mix-blend-mode: multiply; }\n.igsd-vignette { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(0, 0, 0, .55)); }\n.igsd-letterbox::before, .igsd-letterbox::after { content: ""; position: absolute; left: 0; right: 0; height: 9%; background: #000; z-index: 30; animation: igsd-bars .8s cubic-bezier(.6, 0, .2, 1) both; }\n.igsd-letterbox::before { top: 0; transform-origin: top; } .igsd-letterbox::after { bottom: 0; transform-origin: bottom; }\n@keyframes igsd-bars { from { transform: scaleY(0); } }\n\n.igsd-particles { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 8; }\n\n/* ── 立绘 ── */\n.igsd-cast { position: absolute; inset: 0; z-index: 5; pointer-events: none; }\n.igsd-actor {\n  position: absolute; bottom: -2%; height: 92%; width: 34%;\n  left: var(--x, 50%); transform: translateX(-50%);\n  transition: left .55s cubic-bezier(.4, .1, .2, 1), filter .4s ease, opacity .45s ease;\n  filter: brightness(.7) saturate(.78);\n  animation: igsd-actor-in .6s cubic-bezier(.2, .7, .2, 1) both;\n}\n.igsd-actor.is-speaking { filter: brightness(1.04) saturate(1.05) drop-shadow(0 0 1.4cqw rgba(255, 255, 255, .18)); z-index: 2; }\n.igsd-actor.is-leaving { animation: igsd-actor-out .45s ease both; }\n.igsd-actor-body { position: absolute; inset: 0; transform-origin: 50% 100%; animation: igsd-breathe 4.8s ease-in-out infinite; }\n.igsd-actor.is-speaking .igsd-actor-body { animation: igsd-speak-hop .42s cubic-bezier(.3, 1.6, .5, 1), igsd-breathe 4.8s ease-in-out .42s infinite; }\n.igsd-actor img { position: absolute; left: 50%; bottom: 0; height: 100%; width: auto; max-width: none; transform: translateX(-50%);\n  -webkit-mask-image: linear-gradient(180deg, #000 78%, transparent 99%), radial-gradient(120% 100% at 50% 40%, #000 62%, transparent 82%);\n  -webkit-mask-composite: source-in; mask-image: linear-gradient(180deg, #000 78%, transparent 99%); }\n.igsd-actor.is-upload img { -webkit-mask-image: none; mask-image: none; }\n.igsd-actor img.is-swap { animation: igsd-expr-swap .25s ease; }\n@keyframes igsd-actor-in { from { opacity: 0; transform: translateX(-50%) translateY(4%); } }\n@keyframes igsd-actor-out { to { opacity: 0; transform: translateX(-50%) translateY(3%); } }\n@keyframes igsd-breathe { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.008) translateY(-.25%); } }\n@keyframes igsd-speak-hop { 0% { transform: translateY(0); } 40% { transform: translateY(-1.6%); } 100% { transform: translateY(0); } }\n@keyframes igsd-expr-swap { from { opacity: .4; filter: brightness(1.4); } }\n\n/* 没有立绘时的剪影立绘：角色色渐变 + 轮廓光。 */\n.igsd-silhouette { position: absolute; left: 50%; bottom: 0; height: 94%; aspect-ratio: 0.52; transform: translateX(-50%); }\n.igsd-silhouette svg { width: 100%; height: 100%; overflow: visible; }\n.igsd-silhouette .sil-rim { fill: none; stroke: color-mix(in oklab, var(--c) 55%, #fff); stroke-width: 2.4; opacity: .85; filter: drop-shadow(0 0 5px var(--c)) drop-shadow(0 0 14px var(--c)); stroke-dasharray: 1400; animation: igsd-rim-draw 2.4s cubic-bezier(.4, 0, .2, 1) both; }\n@keyframes igsd-rim-draw { from { stroke-dashoffset: 1400; } to { stroke-dashoffset: 0; } }\n.igsd-silhouette-name { position: absolute; left: 50%; top: 50%; transform: translateX(-50%); font-family: var(--font-display); font-size: 5.4cqw; font-weight: 900; letter-spacing: .25em; color: transparent; -webkit-text-stroke: 1px color-mix(in oklab, var(--c) 40%, #fff); opacity: .5; writing-mode: vertical-rl; white-space: nowrap; }\n.igsd-silhouette-tag { position: absolute; left: 50%; bottom: 30%; transform: translateX(-50%); font-family: var(--font-latin); font-size: .75cqw; letter-spacing: .5em; white-space: nowrap; color: rgba(255, 255, 255, .55); }\n.igsd-symbol-anchor { position: absolute; left: 50%; top: 9%; width: 0; height: 0; z-index: 4; }\n.igsd-symbol-anchor .igs-fx-symbol { --igs-fx-size: 6cqw; left: 3cqw; top: 0; }\n\n/* ── CG ── */\n.igsd-cg { position: absolute; inset: 0; z-index: 6; background-size: cover; background-position: center; animation: igsd-cg-in 1.2s cubic-bezier(.5, 0, .2, 1) both; }\n.igsd-cg::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, .45)); }\n.igsd-cg-img { position: absolute; inset: -2%; background-size: cover; background-position: center; animation: igsd-kenburns 30s ease-in-out infinite alternate; }\n.igsd-cg-caption { position: absolute; right: 4%; top: 12%; flex-direction: row-reverse; z-index: 2; display: flex; align-items: center; gap: 1cqw; font-family: var(--font-latin); letter-spacing: .3em; font-size: 1.1cqw; color: rgba(255, 255, 255, .85); text-shadow: 0 2px 8px rgba(0, 0, 0, .6); animation: igsd-slide-in 1.2s .4s ease both; }\n.igsd-cg-caption b { font-family: var(--font-display); font-size: 1.9cqw; letter-spacing: .18em; font-weight: 700; }\n.igsd-cg-caption i { width: 4cqw; height: 1px; background: linear-gradient(270deg, var(--accent), transparent); }\n@keyframes igsd-cg-in { 0% { opacity: 0; clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); filter: brightness(2.2); } 55% { opacity: 1; } 100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); filter: none; } }\n.igsd-cg-wait { position: absolute; right: 2.4%; top: 12%; z-index: 20; display: flex; align-items: center; gap: .6cqw; font-size: 1cqw; padding: .5cqw 1cqw; border-radius: 99px; background: var(--chip-bg); backdrop-filter: blur(8px); color: var(--ink-dim); }\n.igsd-cg-wait i { width: .7cqw; height: .7cqw; border-radius: 50%; background: var(--accent); animation: igsd-pulse 1.2s ease-in-out infinite; }\n\n/* ── 镜头 ── */\n.igsd-camera[data-cam="shake"] { animation: igsd-shake .5s linear; }\n.igsd-camera[data-cam="zoom"] { animation: igsd-zoom 1.6s cubic-bezier(.2, .7, .2, 1) both; }\n.igsd-camera[data-cam="zoomout"] { animation: igsd-zoomout 1.6s cubic-bezier(.2, .7, .2, 1) both; }\n.igsd-camera[data-cam="pan"] { animation: igsd-pan 3s ease-in-out both; }\n.igsd-camera[data-cam="tilt"] { animation: igsd-tilt 1.2s ease both; }\n.igsd-camera[data-cam="blur"] { animation: igsd-blur 2.2s ease both; }\n@keyframes igsd-shake { 0%, 100% { transform: translate(0, 0); } 15% { transform: translate(-1.2%, .6%); } 30% { transform: translate(1%, -.8%); } 45% { transform: translate(-.8%, .4%); } 60% { transform: translate(.6%, .6%); } 80% { transform: translate(-.3%, -.2%); } }\n@keyframes igsd-zoom { from { transform: scale(1); } to { transform: scale(1.12); } }\n@keyframes igsd-zoomout { from { transform: scale(1.14); } to { transform: scale(1); } }\n@keyframes igsd-pan { 0% { transform: translateX(2%) scale(1.06); } 100% { transform: translateX(-2%) scale(1.06); } }\n@keyframes igsd-tilt { 0% { transform: rotate(0); } 40% { transform: rotate(-2.4deg) scale(1.05); } 100% { transform: rotate(-1.4deg) scale(1.04); } }\n@keyframes igsd-blur { 0% { filter: blur(0); } 30% { filter: blur(6px); } 100% { filter: blur(0); } }\n.igsd-flash { position: absolute; inset: 0; z-index: 40; pointer-events: none; background: #fff; animation: igsd-flash .7s ease-out both; }\n.igsd-flash.is-red { background: radial-gradient(circle, rgba(255, 40, 60, .2), rgba(160, 0, 20, .75)); }\n.igsd-flash.is-black { background: #000; animation: igsd-black 1.6s ease both; }\n@keyframes igsd-flash { from { opacity: .95; } to { opacity: 0; } }\n@keyframes igsd-black { 0% { opacity: 0; } 35%, 60% { opacity: 1; } 100% { opacity: 0; } }\n\n/* ── 地点标题卡 ── */\n.igsd-titlecard { position: absolute; left: 6%; top: 34%; z-index: 25; pointer-events: none; animation: igsd-titlecard 3.2s ease both; }\n.igsd-titlecard-line { width: 26cqw; height: 1px; background: linear-gradient(90deg, var(--accent), var(--accent2), transparent); transform-origin: left; animation: igsd-line 1s .1s cubic-bezier(.6, 0, .2, 1) both; }\n.igsd-titlecard-name { font-family: var(--font-display); font-size: 4.6cqw; font-weight: 700; letter-spacing: .32em; margin: .8cqw 0 .4cqw; text-shadow: 0 0 2cqw rgba(0, 0, 0, .8), 0 0 4cqw var(--accent2); }\n.igsd-titlecard-sub { font-family: var(--font-latin); font-size: 1.3cqw; letter-spacing: .5em; color: rgba(255, 255, 255, .75); text-transform: uppercase; }\n@keyframes igsd-titlecard { 0% { opacity: 0; transform: translateX(-2%); } 15% { opacity: 1; transform: none; } 80% { opacity: 1; } 100% { opacity: 0; transform: translateX(1%); } }\n@keyframes igsd-line { from { transform: scaleX(0); } }\n\n/* ── HUD ── */\n.igsd-hud { position: absolute; left: 2.2%; top: 3.2%; z-index: 20; display: flex; align-items: stretch; gap: .9cqw; transition: opacity .3s; }\n.igsd-hud-bar { width: .28cqw; border-radius: 9px; background: linear-gradient(180deg, var(--accent), var(--accent2)); box-shadow: 0 0 1cqw var(--accent); }\n.igsd-hud-place { font-family: var(--font-display); font-size: 1.55cqw; font-weight: 700; letter-spacing: .14em; text-shadow: 0 1px 6px rgba(0, 0, 0, .7); }\n.igsd-hud-meta { margin-top: .25cqw; font-size: .95cqw; letter-spacing: .14em; color: var(--ink-dim); text-shadow: 0 1px 4px rgba(0, 0, 0, .7); display: flex; gap: .8cqw; }\n.igsd-topright { position: absolute; right: 2%; top: 3%; z-index: 22; display: flex; gap: .6cqw; align-items: center; }\n.igsd-pill { display: inline-flex; align-items: center; gap: .5cqw; padding: .45cqw 1cqw; border-radius: 99px; background: var(--chip-bg); border: 1px solid var(--box-border); backdrop-filter: blur(10px); font-size: .95cqw; letter-spacing: .08em; color: var(--ink); }\n.igsd-pill.is-busy::before { content: ""; width: .7cqw; height: .7cqw; border-radius: 50%; border: 2px solid var(--accent); border-right-color: transparent; animation: igsd-spin .8s linear infinite; }\n.igsd-iconbtn { width: 2.6cqw; height: 2.6cqw; border-radius: 50%; display: grid; place-items: center; background: var(--chip-bg); border: 1px solid var(--box-border); backdrop-filter: blur(10px); font-size: 1.2cqw; transition: transform .2s, background .2s; }\n.igsd-iconbtn:hover { transform: rotate(90deg); background: rgba(255, 255, 255, .14); }\n\n/* ── 对话框 ── */\n.igsd-dialog { position: absolute; left: 4%; right: 4%; bottom: 3.6%; height: 27%; z-index: 20; transition: opacity .3s, transform .3s; }\n.igsd-ui-hidden .igsd-dialog, .igsd-ui-hidden .igsd-hud, .igsd-ui-hidden .igsd-topright, .igsd-ui-hidden .igsd-quick { opacity: 0; pointer-events: none; }\n.igsd-box { position: absolute; inset: 0; border-radius: var(--box-radius); background: var(--box-bg); border: 1px solid var(--box-border); backdrop-filter: var(--box-blur); -webkit-backdrop-filter: var(--box-blur); box-shadow: 0 1.4cqw 4cqw rgba(0, 0, 0, .45), inset 0 1px 0 rgba(255, 255, 255, .08); overflow: hidden; }\n.igsd-box::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--accent), var(--accent2), var(--accent3), transparent); background-size: 200% 100%; animation: igsd-shimmer 6s linear infinite; opacity: .9; }\n.igsd-box::after { content: ""; position: absolute; right: -6cqw; bottom: -10cqw; width: 26cqw; height: 26cqw; border-radius: 50%; background: radial-gradient(circle, color-mix(in oklab, var(--speaker, var(--accent)) 28%, transparent), transparent 65%); pointer-events: none; transition: background .6s; }\n@keyframes igsd-shimmer { from { background-position: 200% 0; } to { background-position: 0 0; } }\n.igsd-name { position: absolute; left: 3.2%; top: -2.3cqw; z-index: 2; display: flex; align-items: flex-end; gap: .8cqw; animation: igsd-name-in .35s cubic-bezier(.2, .8, .2, 1) both; }\n.igsd-name-plate { position: relative; padding: .5cqw 2.4cqw .55cqw 1.6cqw; font-family: var(--font-display); font-weight: 700; font-size: 1.75cqw; letter-spacing: .2em; color: var(--name-ink);\n  background: linear-gradient(100deg, var(--speaker, var(--accent)), color-mix(in oklab, var(--speaker, var(--accent)) 55%, var(--accent2)));\n  clip-path: polygon(0 0, 100% 0, calc(100% - 1.2cqw) 100%, 0 100%); box-shadow: 0 .4cqw 1.6cqw rgba(0, 0, 0, .35); text-shadow: 0 1px 2px rgba(0, 0, 0, .35); }\n.igsd-name-plate::after { content: ""; position: absolute; left: 1.6cqw; right: 2.4cqw; bottom: .3cqw; height: 1px; background: rgba(255, 255, 255, .55); }\n.igsd-name-sub { font-family: var(--font-latin); font-size: 1cqw; letter-spacing: .32em; color: var(--ink-dim); padding-bottom: .4cqw; text-transform: uppercase; }\n@keyframes igsd-name-in { from { opacity: 0; transform: translateX(-1.2cqw); } }\n.igsd-text { position: absolute; left: 4.2%; right: 5%; top: 23%; bottom: 20%; font-size: 1.95cqw; line-height: 1.78; letter-spacing: .04em; text-shadow: 0 1px 2px rgba(0, 0, 0, .45); overflow: hidden; }\n.igsd-text.is-narration { color: color-mix(in oklab, var(--ink) 92%, var(--accent3)); }\n.igsd-text.is-thought { font-style: italic; color: color-mix(in oklab, var(--ink) 70%, var(--accent2)); }\n.igsd-text.is-cardhint { color: var(--ink-dim); font-size: 1.3cqw; letter-spacing: .4em; text-align: center; }\n.igsd-text.is-thought::before { content: "（"; } .igsd-text.is-thought::after { content: "）"; }\n.igsd-char { opacity: 0; animation: igsd-char-in .22s ease forwards; animation-delay: var(--d); display: inline; }\n.igsd-text.is-done .igsd-char { animation: none; opacity: 1; }\n.igsd-text.is-wait .igsd-char { animation: none; }\n@keyframes igsd-char-in { from { opacity: 0; filter: blur(3px); } to { opacity: 1; filter: none; } }\n.igsd-wait { position: absolute; right: 2.6%; bottom: 20%; font-size: 1.2cqw; color: var(--accent); text-shadow: 0 0 .8cqw var(--accent); animation: igsd-wait 1.1s ease-in-out infinite; }\n.igsd-wait::before { content: var(--wait-glyph); }\n@keyframes igsd-wait { 0%, 100% { transform: translateY(0) rotate(0); opacity: .9; } 50% { transform: translateY(-.35cqw) rotate(45deg); opacity: .5; } }\n.igsd-quick { position: absolute; right: 2.4%; bottom: 7%; display: flex; gap: 1.5cqw; font-family: var(--font-latin); font-size: .98cqw; font-weight: 600; letter-spacing: .2em; z-index: 3; }\n.igsd-quick button { color: var(--ink-dim); transition: color .2s, text-shadow .2s; position: relative; }\n.igsd-quick button:hover, .igsd-quick button.is-on { color: var(--ink); text-shadow: 0 0 .8cqw var(--accent); }\n.igsd-quick button.is-on::after { content: ""; position: absolute; left: 0; right: .2em; bottom: -.3cqw; height: 1px; background: var(--accent); }\n.igsd-progress { position: absolute; left: 4.2%; right: 30%; bottom: 8.6%; height: 2px; border-radius: 2px; background: rgba(255, 255, 255, .08); overflow: hidden; }\n.igsd-progress i { position: absolute; left: 0; top: 0; bottom: 0; background: linear-gradient(90deg, var(--accent), var(--accent2)); box-shadow: 0 0 6px var(--accent); transition: width .4s ease; }\n.igsd-status { position: absolute; left: 4.2%; bottom: 7%; font-size: .9cqw; letter-spacing: .1em; color: var(--ink-dim); display: flex; align-items: center; gap: .5cqw; }\n.igsd-status::before { content: ""; width: .6cqw; height: .6cqw; border-radius: 50%; background: var(--accent3); box-shadow: 0 0 .6cqw var(--accent3); animation: igsd-pulse 1.4s ease-in-out infinite; }\n\n/* ── 情境卡片（短信、信件……） ── */\n.igsd-card { position: absolute; left: 50%; top: 42%; z-index: 21; width: 40cqw; transform: translate(-50%, -50%); animation: igsd-card-in .7s cubic-bezier(.2, .8, .2, 1) both; font-size: 1.6cqw; line-height: 1.7; }\n@keyframes igsd-card-in { from { opacity: 0; transform: translate(-50%, -42%) rotateX(35deg) scale(.9); } }\n.igsd-card[data-card="sms"] { padding: 1.6cqw; border-radius: 2cqw; background: rgba(250, 250, 255, .94); color: #1b1d2a; box-shadow: 0 2cqw 5cqw rgba(0, 0, 0, .5); }\n.igsd-card[data-card="sms"] .igsd-card-head { font-size: 1cqw; color: #6b7280; text-align: center; margin-bottom: 1cqw; letter-spacing: .1em; }\n.igsd-card[data-card="sms"] .igsd-card-body { display: inline-block; max-width: 90%; padding: 1cqw 1.4cqw; border-radius: 1.6cqw 1.6cqw 1.6cqw .4cqw; background: #e8ebf4; }\n.igsd-card[data-card="letter"], .igsd-card[data-card="diary"] { padding: 3cqw 3.4cqw; background: repeating-linear-gradient(180deg, #fbf5e6 0 2.6cqw, #e9dcc0 2.6cqw calc(2.6cqw + 1px)), #fbf5e6; color: #4a3626; font-family: var(--font-display); box-shadow: 0 2cqw 5cqw rgba(0, 0, 0, .55); transform-origin: 50% 0; transform: translate(-50%, -50%) rotate(-1.2deg); }\n.igsd-card[data-card="note"] { width: 28cqw; padding: 2.4cqw; background: #fff59d; color: #3b3200; font-family: var(--font-display); box-shadow: 0 1.4cqw 3cqw rgba(0, 0, 0, .45); transform: translate(-50%, -50%) rotate(2deg); }\n.igsd-card[data-card="note"]::before { content: ""; position: absolute; left: 38%; top: -1cqw; width: 8cqw; height: 2cqw; background: rgba(255, 255, 255, .55); transform: rotate(-3deg); }\n.igsd-card[data-card="news"] { padding: 2.4cqw; background: #f3f0e8; color: #111; font-family: var(--font-display); border-top: .6cqw double #111; box-shadow: 0 2cqw 5cqw rgba(0, 0, 0, .55); }\n.igsd-card[data-card="news"] .igsd-card-head { font-size: 2.6cqw; font-weight: 900; letter-spacing: .3em; border-bottom: 1px solid #111; margin-bottom: 1cqw; }\n.igsd-card[data-card="terminal"] { padding: 2cqw; border-radius: .8cqw; background: rgba(4, 16, 8, .92); color: #67ff9a; font-family: "JetBrains Mono", "Cascadia Code", monospace; box-shadow: 0 0 3cqw rgba(60, 255, 140, .25), inset 0 0 2cqw rgba(60, 255, 140, .08); text-shadow: 0 0 .6cqw rgba(60, 255, 140, .7); }\n.igsd-card[data-card="terminal"] .igsd-card-body::after { content: "▌"; animation: igsd-pulse 1s steps(2) infinite; }\n.igsd-card[data-card="notice"], .igsd-card[data-card="scroll"] { padding: 3cqw; background: linear-gradient(90deg, #c9a46a, #f1dcae 8%, #f6e7c4 50%, #f1dcae 92%, #c9a46a); color: #3a2410; font-family: var(--font-display); text-align: center; box-shadow: 0 2cqw 5cqw rgba(0, 0, 0, .55); }\n.igsd-card[data-card="notice"]::after { content: "印"; position: absolute; right: 2cqw; bottom: 1.4cqw; width: 4cqw; height: 4cqw; border: .25cqw solid #b3261e; color: #b3261e; display: grid; place-items: center; font-size: 2cqw; transform: rotate(-12deg); animation: igsd-stamp .4s .5s cubic-bezier(.3, 1.6, .5, 1) both; }\n@keyframes igsd-stamp { from { opacity: 0; transform: scale(2.2) rotate(-12deg); } }\n\n/* ── 选项 ── */\n.igsd-choices { position: absolute; inset: 0; z-index: 26; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.3cqw; background: radial-gradient(70% 60% at 50% 45%, rgba(0, 0, 0, .25), rgba(0, 0, 0, .6)); animation: igsd-fade-in .4s ease both; }\n.igsd-choices-title { font-family: var(--font-latin); letter-spacing: .6em; font-size: 1.05cqw; color: var(--ink-dim); margin-bottom: .6cqw; }\n.igsd-choice { position: relative; width: 46cqw; padding: 1.25cqw 2.4cqw 1.25cqw 6cqw; text-align: left; font-size: 1.7cqw; letter-spacing: .08em; border-radius: 99px; background: var(--box-bg); border: 1px solid var(--box-border); backdrop-filter: var(--box-blur); box-shadow: 0 .8cqw 2.4cqw rgba(0, 0, 0, .35); transition: transform .25s cubic-bezier(.2, .8, .2, 1), border-color .25s, box-shadow .25s; animation: igsd-choice-in .55s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--i) * 90ms + 150ms); overflow: hidden; }\n.igsd-choice::before { content: attr(data-n); position: absolute; left: 2.2cqw; top: 50%; transform: translateY(-50%); font-family: var(--font-latin); font-size: 1.5cqw; font-weight: 700; color: var(--accent); letter-spacing: .1em; }\n.igsd-choice::after { content: ""; position: absolute; inset: 0; background: linear-gradient(100deg, transparent 30%, rgba(255, 255, 255, .16) 50%, transparent 70%); transform: translateX(-100%); transition: transform .6s ease; }\n.igsd-choice:hover { transform: translateX(1.2cqw) scale(1.02); border-color: var(--accent); box-shadow: 0 0 2.4cqw color-mix(in oklab, var(--accent) 45%, transparent); }\n.igsd-choice:hover::after { transform: translateX(100%); }\n@keyframes igsd-choice-in { from { opacity: 0; transform: translateY(1.4cqw); } }\n.igsd-free { display: flex; gap: .8cqw; width: 46cqw; animation: igsd-choice-in .55s cubic-bezier(.2, .8, .2, 1) both; animation-delay: calc(var(--i) * 90ms + 150ms); }\n.igsd-free input { flex: 1; min-width: 0; padding: 1cqw 1.8cqw; font: inherit; font-size: 1.45cqw; color: var(--ink); border-radius: 99px; border: 1px dashed var(--box-border); background: rgba(0, 0, 0, .35); outline: none; user-select: text; }\n.igsd-free input:focus { border-color: var(--accent); border-style: solid; }\n.igsd-free button { padding: 0 2cqw; border-radius: 99px; background: linear-gradient(100deg, var(--accent), var(--accent2)); font-size: 1.4cqw; font-weight: 700; letter-spacing: .2em; color: #fff; }\n\n/* ── 标题画面 ── */\n.igsd-title { position: absolute; inset: 0; z-index: 50; display: flex; flex-direction: column; justify-content: center; padding-left: 8%; background: linear-gradient(90deg, rgba(4, 4, 14, .86) 0%, rgba(4, 4, 14, .55) 42%, transparent 75%); animation: igsd-fade-in 1s ease both; }\n.igsd-title-kicker { font-family: var(--font-latin); font-size: 1.1cqw; letter-spacing: .7em; color: var(--accent3); text-transform: uppercase; animation: igsd-slide-in 1s .2s ease both; }\n.igsd-title-logo { font-family: var(--font-display); font-weight: 900; font-size: 6cqw; line-height: 1.15; letter-spacing: .12em; margin: 1cqw 0 .6cqw; background: linear-gradient(100deg, #fff 10%, var(--accent) 45%, var(--accent2) 70%, var(--accent3)); -webkit-background-clip: text; background-clip: text; color: transparent; filter: drop-shadow(0 0 2.4cqw color-mix(in oklab, var(--accent2) 60%, transparent)); animation: igsd-logo-in 1.4s .3s cubic-bezier(.2, .8, .2, 1) both; max-width: 60cqw; }\n.igsd-title-sub { font-size: 1.2cqw; letter-spacing: .3em; color: var(--ink-dim); margin-bottom: 3.4cqw; animation: igsd-slide-in 1s .6s ease both; }\n.igsd-title-menu { display: flex; flex-direction: column; gap: .4cqw; align-items: flex-start; }\n.igsd-title-menu button { font-family: var(--font-display); font-size: 1.75cqw; letter-spacing: .3em; padding: .45cqw 0; color: var(--ink-dim); position: relative; transition: color .2s, letter-spacing .3s, padding .3s; animation: igsd-slide-in .8s ease both; animation-delay: calc(var(--i) * 80ms + 800ms); }\n.igsd-title-menu button span { font-family: var(--font-latin); font-size: .9cqw; letter-spacing: .4em; margin-left: 1.2cqw; opacity: .55; }\n.igsd-title-menu button.is-new { color: var(--ink); }\n.igsd-title-menu button.is-new::after { content: "NEW"; position: absolute; top: .2cqw; right: -3.4cqw; padding: .1cqw .5cqw; border-radius: 99px; font-family: var(--font-latin); font-size: .7cqw; letter-spacing: .12em; color: #fff; background: linear-gradient(100deg, var(--accent), var(--accent2)); animation: igsd-pulse 1.6s ease-in-out infinite; }\n.igsd-title-menu button:hover { color: #fff; letter-spacing: .42em; padding-left: 1.6cqw; }\n.igsd-title-menu button:hover::before { content: ""; position: absolute; left: 0; top: 50%; width: .9cqw; height: .9cqw; transform: translateY(-50%) rotate(45deg); background: var(--accent); box-shadow: 0 0 1cqw var(--accent); }\n.igsd-title-foot { position: absolute; left: 8%; bottom: 5%; font-size: .85cqw; letter-spacing: .2em; color: rgba(255, 255, 255, .35); }\n@keyframes igsd-logo-in { from { opacity: 0; letter-spacing: .5em; filter: blur(10px); } }\n@keyframes igsd-slide-in { from { opacity: 0; transform: translateX(-1.6cqw); } }\n\n/* ── 面板（回想 / 鉴赏 / 人物志 / 设置） ── */\n.igsd-panel { position: absolute; inset: 0; z-index: 60; display: flex; flex-direction: column; background: linear-gradient(135deg, rgba(8, 6, 22, .94), rgba(16, 10, 34, .92)); backdrop-filter: blur(16px); animation: igsd-panel-in .35s cubic-bezier(.2, .8, .2, 1) both; user-select: text; }\n@keyframes igsd-panel-in { from { opacity: 0; transform: scale(1.02); } }\n.igsd-panel-head { display: flex; align-items: center; gap: 1.4cqw; padding: 2.2cqw 3cqw 1.2cqw; }\n.igsd-panel-title { font-family: var(--font-display); font-size: 2.4cqw; font-weight: 700; letter-spacing: .24em; }\n.igsd-panel-en { font-family: var(--font-latin); font-size: 1cqw; letter-spacing: .5em; color: var(--accent); text-transform: uppercase; }\n.igsd-panel-head .igsd-spacer { flex: 1; }\n.igsd-panel-body { position: relative; flex: 1; overflow: auto; padding: 0 3cqw 2.4cqw; scrollbar-width: thin; scrollbar-color: var(--accent2) transparent; }\n.igsd-tabs { display: flex; gap: .4cqw; padding: 0 3cqw 1cqw; flex-wrap: wrap; }\n.igsd-tab { padding: .55cqw 1.4cqw; border-radius: 99px; font-size: 1.05cqw; letter-spacing: .12em; color: var(--ink-dim); border: 1px solid transparent; }\n.igsd-tab.is-on { color: #fff; border-color: var(--box-border); background: linear-gradient(100deg, color-mix(in oklab, var(--accent) 35%, transparent), color-mix(in oklab, var(--accent2) 35%, transparent)); }\n\n.igsd-log-item { display: grid; grid-template-columns: 9cqw 1fr; gap: 1.4cqw; padding: 1cqw 0; border-bottom: 1px solid rgba(255, 255, 255, .06); cursor: pointer; font-size: 1.35cqw; line-height: 1.7; }\n.igsd-log-item:hover { background: linear-gradient(90deg, rgba(255, 255, 255, .04), transparent); }\n.igsd-log-name { font-family: var(--font-display); font-weight: 700; text-align: right; letter-spacing: .1em; }\n.igsd-log-turn { grid-column: 1 / -1; font-family: var(--font-latin); font-size: .95cqw; letter-spacing: .5em; color: var(--accent); padding-top: 1.4cqw; }\n\n/* 导演日志：左边历次记录，右边详情（实时输出 / 整理结果 / 原始输出 / 提示词）。两栏各自滚动。 */\n.igsd-dlog { display: grid; grid-template-columns: 22cqw minmax(0, 1fr); gap: 2cqw; height: 100%; }\n.igsd-dlog-side, .igsd-dlog-detail { min-height: 0; overflow: auto; scrollbar-width: thin; scrollbar-color: var(--accent2) transparent; }\n.igsd-dlog-side { display: flex; flex-direction: column; gap: .6cqw; padding-right: .4cqw; }\n.igsd-dlog-detail { padding-right: .6cqw; }\n.igsd-dlog-row { display: block; width: 100%; flex: none; text-align: left; padding: 1cqw 1.2cqw; border-radius: .8cqw; border: 1px solid var(--box-border); background: rgba(255, 255, 255, .03); transition: background .2s, border-color .2s; }\n.igsd-dlog-row:hover { background: rgba(255, 255, 255, .07); }\n.igsd-dlog-row.is-on { border-color: var(--accent); background: linear-gradient(100deg, color-mix(in oklab, var(--accent) 18%, transparent), color-mix(in oklab, var(--accent2) 8%, transparent)); }\n.igsd-dlog-row-head { display: flex; align-items: center; justify-content: space-between; gap: .6cqw; font-size: 1.15cqw; letter-spacing: .08em; }\n.igsd-dlog-row-meta { margin-top: .3cqw; font-size: .85cqw; color: var(--ink-dim); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n.igsd-dlog-row-sum { margin-top: .4cqw; font-size: .95cqw; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }\n.igsd-dlog-status { padding: .1cqw .7cqw; border-radius: 99px; border: 1px solid currentColor; font-size: .8cqw; letter-spacing: .1em; white-space: nowrap; }\n.igsd-dlog-status.is-running { color: var(--accent); animation: igsd-pulse 1.4s ease-in-out infinite; }\n.igsd-dlog-status.is-ok { color: #6ef0a8; }\n.igsd-dlog-status.is-failed { color: #ff8a8a; }\n.igsd-dlog-status.is-cancelled { color: var(--ink-dim); }\n.igsd-dlog-head { padding: 1.2cqw 1.4cqw; border-radius: 1cqw; background: rgba(255, 255, 255, .035); border: 1px solid var(--box-border); }\n.igsd-dlog-title { display: flex; align-items: center; gap: 1cqw; margin-bottom: .8cqw; font-family: var(--font-display); font-size: 1.7cqw; letter-spacing: .16em; }\n.igsd-dlog-title .igsd-spacer, .igsd-dlog-label .igsd-spacer { flex: 1; }\n.igsd-dlog-facts { display: grid; grid-template-columns: repeat(auto-fill, minmax(30cqw, 1fr)); gap: .3cqw 2cqw; font-size: 1cqw; line-height: 1.6; }\n.igsd-dlog-facts i { margin-right: .8cqw; font-style: normal; color: var(--ink-dim); letter-spacing: .08em; }\n.igsd-dlog-notice { margin-top: .6cqw; font-size: .95cqw; color: #ffd27a; }\n.igsd-dlog-error { margin: .6cqw 0; font-size: 1cqw; white-space: pre-wrap; word-break: break-word; }\n.igsd-dlog-tabs { padding: 1.2cqw 0 .4cqw; }\n.igsd-dlog-block { margin: 1cqw 0; }\n.igsd-dlog-label { display: flex; align-items: center; gap: .8cqw; margin-bottom: .5cqw; font-size: .95cqw; letter-spacing: .12em; color: var(--accent); }\n.igsd-btn.is-mini { padding: .2cqw .9cqw; font-size: .85cqw; white-space: nowrap; }\n.igsd-dlog-pre { margin: 0; max-height: 34cqw; overflow: auto; padding: 1cqw 1.2cqw; border-radius: .8cqw; background: rgba(0, 0, 0, .42); border: 1px solid var(--box-border); font-family: "JetBrains Mono", Consolas, monospace; font-size: .95cqw; line-height: 1.6; white-space: pre-wrap; word-break: break-word; color: var(--ink); scrollbar-width: thin; }\n.igsd-dlog-pre.has-cursor::after { content: "▍"; color: var(--accent); animation: igsd-pulse 1s steps(2) infinite; }\n.igsd-dlog-meter { display: flex; align-items: center; gap: .8cqw; margin: .4cqw 0; font-size: 1cqw; color: var(--ink-dim); }\n.igsd-dlog-dot { width: .8cqw; height: .8cqw; border-radius: 50%; background: var(--accent); box-shadow: 0 0 1cqw var(--accent); animation: igsd-pulse 1s ease-in-out infinite; }\n.igsd-dlog-think summary { margin: .4cqw 0; cursor: pointer; font-size: .95cqw; color: var(--ink-dim); }\n.igsd-dlog-chips { display: flex; flex-wrap: wrap; gap: .5cqw; }\n.igsd-dlog-chip { display: inline-flex; align-items: center; gap: .5cqw; padding: .2cqw .8cqw; border-radius: 99px; font-size: .9cqw; background: rgba(255, 255, 255, .06); border: 1px solid var(--box-border); }\n.igsd-dlog-chip i { font-style: normal; font-size: .8cqw; color: var(--ink-dim); }\n.igsd-dlog-lines { border-radius: .8cqw; border: 1px solid var(--box-border); overflow: hidden; }\n.igsd-dlog-line { display: grid; grid-template-columns: 4cqw minmax(0, 1fr) minmax(0, 24cqw); gap: 1.2cqw; align-items: start; padding: .7cqw 1cqw; border-bottom: 1px solid rgba(255, 255, 255, .06); font-size: 1cqw; line-height: 1.6; }\n.igsd-dlog-line:last-child { border-bottom: 0; }\n.igsd-dlog-line.is-plain { opacity: .6; }\n.igsd-dlog-uid { padding-top: .15cqw; font-family: var(--font-latin); font-size: .85cqw; letter-spacing: .1em; color: var(--accent); }\n.igsd-dlog-card { margin-bottom: .6cqw; padding: .8cqw 1cqw; border-radius: .8cqw; background: rgba(255, 255, 255, .035); border: 1px solid var(--box-border); font-size: 1cqw; line-height: 1.6; }\n.igsd-dlog-mono { margin-top: .4cqw; font-family: "JetBrains Mono", Consolas, monospace; font-size: .9cqw; word-break: break-word; }\n.igsd-dlog-list-plain { margin: 0; padding-left: 2cqw; font-size: 1.05cqw; line-height: 1.8; }\n.igsd-pill.is-link { cursor: pointer; transition: border-color .2s; }\n.igsd-pill.is-link:hover { border-color: var(--accent); }\n\n.igsd-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(20cqw, 1fr)); gap: 1.4cqw; }\n.igsd-thumb { position: relative; aspect-ratio: 16 / 10; border-radius: 1cqw; overflow: hidden; background: rgba(255, 255, 255, .04); border: 1px solid var(--box-border); cursor: zoom-in; transition: transform .25s, box-shadow .25s; }\n.igsd-thumb:hover { transform: translateY(-.4cqw); box-shadow: 0 1cqw 3cqw rgba(0, 0, 0, .5), 0 0 0 1px var(--accent); }\n.igsd-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }\n.igsd-thumb-cap { position: absolute; left: 0; right: 0; bottom: 0; padding: 2cqw 1cqw .7cqw; font-size: 1cqw; letter-spacing: .1em; background: linear-gradient(transparent, rgba(0, 0, 0, .75)); }\n.igsd-thumb.is-locked { cursor: default; display: grid; place-items: center; color: var(--ink-dim); font-size: 1cqw; background: repeating-linear-gradient(45deg, rgba(255, 255, 255, .03) 0 1cqw, transparent 1cqw 2cqw); }\n\n.igsd-person { display: grid; grid-template-columns: 13cqw 1fr; gap: 2cqw; padding: 1.6cqw; margin-bottom: 1.4cqw; border-radius: 1.2cqw; background: rgba(255, 255, 255, .035); border: 1px solid var(--box-border); }\n.igsd-person-art { position: relative; height: 19cqw; border-radius: .8cqw; overflow: hidden; background: radial-gradient(circle at 50% 30%, color-mix(in oklab, var(--c) 40%, transparent), rgba(0, 0, 0, .3)); }\n.igsd-person-art img { width: 100%; height: 100%; object-fit: cover; object-position: top; }\n.igsd-person-art .igsd-silhouette { height: 100%; }\n.igsd-person h3 { margin: 0 0 .6cqw; font-family: var(--font-display); font-size: 2cqw; letter-spacing: .2em; display: flex; align-items: center; gap: 1cqw; }\n.igsd-person h3 small { font-family: var(--font-body); font-size: .9cqw; letter-spacing: .1em; padding: .2cqw .7cqw; border-radius: 99px; border: 1px solid var(--box-border); color: var(--ink-dim); }\n.igsd-emos { display: flex; flex-wrap: wrap; gap: .5cqw; margin: .8cqw 0; }\n.igsd-emo { position: relative; width: 4.6cqw; height: 4.6cqw; border-radius: .6cqw; overflow: hidden; border: 1px solid var(--box-border); background: rgba(0, 0, 0, .3); font-size: .78cqw; display: grid; place-items: end center; padding-bottom: .2cqw; color: var(--ink-dim); }\n.igsd-emo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: top; }\n.igsd-emo span { position: relative; text-shadow: 0 1px 3px #000; }\n.igsd-emo.is-busy::after { content: ""; position: absolute; inset: 0; background: linear-gradient(100deg, transparent 20%, rgba(255, 255, 255, .25), transparent 80%); background-size: 200% 100%; animation: igsd-skeleton 1.2s linear infinite; }\n\n/* 表单 */\n.igsd-field { display: grid; grid-template-columns: 14cqw 1fr; gap: 1.2cqw; align-items: center; margin: .9cqw 0; font-size: 1.1cqw; }\n.igsd-field > label { color: var(--ink-dim); letter-spacing: .08em; }\n.igsd-field small { grid-column: 2; color: var(--ink-dim); font-size: .9cqw; margin-top: -.6cqw; }\n.igsd-input, .igsd-select, .igsd-textarea { width: 100%; padding: .7cqw 1cqw; font: inherit; font-size: 1.1cqw; color: var(--ink); background: rgba(0, 0, 0, .35); border: 1px solid var(--box-border); border-radius: .6cqw; outline: none; }\n.igsd-select option { background: #14122a; }\n.igsd-textarea { min-height: 7cqw; resize: vertical; line-height: 1.5; font-family: "JetBrains Mono", Consolas, monospace; font-size: 1cqw; }\n.igsd-input:focus, .igsd-select:focus, .igsd-textarea:focus { border-color: var(--accent); }\n.igsd-btn { display: inline-flex; align-items: center; gap: .5cqw; padding: .6cqw 1.4cqw; border-radius: 99px; font-size: 1.05cqw; letter-spacing: .1em; border: 1px solid var(--box-border); background: rgba(255, 255, 255, .05); transition: background .2s, border-color .2s; }\n.igsd-btn:hover { background: rgba(255, 255, 255, .12); border-color: var(--accent); }\n.igsd-btn.is-primary { background: linear-gradient(100deg, var(--accent), var(--accent2)); border-color: transparent; color: #fff; font-weight: 700; }\n.igsd-btn[disabled] { opacity: .45; pointer-events: none; }\n.igsd-row { display: flex; gap: .8cqw; flex-wrap: wrap; align-items: center; }\n.igsd-switch { position: relative; width: 3.4cqw; height: 1.9cqw; border-radius: 99px; background: rgba(255, 255, 255, .14); transition: background .2s; }\n.igsd-switch::after { content: ""; position: absolute; left: .25cqw; top: .25cqw; width: 1.4cqw; height: 1.4cqw; border-radius: 50%; background: #fff; transition: transform .25s cubic-bezier(.3, 1.4, .5, 1); }\n.igsd-switch.is-on { background: linear-gradient(100deg, var(--accent), var(--accent2)); }\n.igsd-switch.is-on::after { transform: translateX(1.5cqw); }\n.igsd-note { font-size: .95cqw; color: var(--ink-dim); line-height: 1.6; }\n.igsd-ok { color: #6ef0a8; } .igsd-err { color: #ff8a8a; }\n.igsd-section { margin: 1.6cqw 0 .6cqw; font-family: var(--font-display); font-size: 1.4cqw; letter-spacing: .2em; display: flex; align-items: center; gap: .8cqw; }\n.igsd-section::after { content: ""; flex: 1; height: 1px; background: linear-gradient(90deg, var(--box-border), transparent); }\n.igsd-skins { display: grid; grid-template-columns: repeat(auto-fill, minmax(15cqw, 1fr)); gap: 1cqw; }\n.igsd-skin { padding: 1cqw; border-radius: 1cqw; border: 1px solid var(--box-border); text-align: left; transition: transform .2s; }\n.igsd-skin:hover { transform: translateY(-.3cqw); }\n.igsd-skin.is-on { box-shadow: 0 0 0 2px var(--accent); }\n.igsd-skin-swatch { height: 4cqw; border-radius: .6cqw; margin-bottom: .6cqw; }\n.igsd-skin b { display: block; font-size: 1.1cqw; letter-spacing: .1em; } .igsd-skin span { font-size: .85cqw; color: var(--ink-dim); }\n\n.igsd-update-done { margin: .8cqw 0; padding: .9cqw 1.2cqw; border-radius: .8cqw; font-size: 1.05cqw; line-height: 1.6; color: #6ef0a8; background: rgba(110, 240, 168, .08); border: 1px solid rgba(110, 240, 168, .3); }\n.igsd-changes { margin: .4cqw 0 0 15.2cqw; border-radius: .8cqw; border: 1px solid var(--box-border); overflow: hidden; }\n.igsd-changes > div { display: grid; grid-template-columns: 6cqw 1fr auto; gap: 1cqw; padding: .6cqw 1cqw; font-size: 1cqw; line-height: 1.5; border-bottom: 1px solid rgba(255, 255, 255, .06); }\n.igsd-changes > div:last-child { border-bottom: 0; }\n.igsd-changes code, .igsd-note code { font-family: "JetBrains Mono", Consolas, monospace; color: var(--accent); }\n.igsd-changes small { color: var(--ink-dim); white-space: nowrap; }\n\n.igsd-lightbox { position: fixed; inset: 0; z-index: 80; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.2cqw; background: rgba(0, 0, 0, .9); animation: igsd-fade-in .25s ease both; cursor: zoom-out; }\n.igsd-lightbox img { max-width: 92%; max-height: 82%; object-fit: contain; box-shadow: 0 0 6cqw rgba(0, 0, 0, .8); cursor: default; }\n.igsd-lightbox .igsd-row { cursor: default; }\n\n@keyframes igsd-fade-in { from { opacity: 0; } }\n@keyframes igsd-fade-out { to { opacity: 0; } }\n@keyframes igsd-spin { to { transform: rotate(360deg); } }\n@keyframes igsd-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }\n@keyframes igsd-skeleton { from { background-position: 200% 0; } to { background-position: -200% 0; } }\n\n@media (prefers-reduced-motion: reduce) {\n  .igsd-bg, .igsd-cg-img, .igsd-actor-body, .igsd-box::before, .igsd-sky::after { animation: none !important; }\n}\n@container stage (max-aspect-ratio: 4/5) {\n  .igsd-actor { width: 60%; height: 60%; bottom: 23%; }\n  .igsd-dialog { left: 3%; right: 3%; height: 22%; }\n  .igsd-text { font-size: 4.6cqw; top: 18%; bottom: 26%; }\n  .igsd-progress { bottom: 12%; right: 4.2%; }\n  .igsd-quick { bottom: 5%; left: 4.2%; justify-content: space-between; font-size: 2.4cqw; gap: 3cqw; }\n  .igsd-wait { bottom: 28%; }\n  .igsd-status { display: none; }\n  .igsd-name-plate { font-size: 4cqw; } .igsd-name { top: -5cqw; }\n  .igsd-iconbtn { width: 9cqw; height: 9cqw; font-size: 4cqw; }\n  .igsd-hud-place { font-size: 4cqw; } .igsd-hud-meta { font-size: 2.6cqw; }\n  .igsd-choice, .igsd-free { width: 88cqw; font-size: 4cqw; }\n  .igsd-title-logo { font-size: 11cqw; max-width: 90cqw; } .igsd-title-menu button { font-size: 4.4cqw; }\n  .igsd-dlog { grid-template-columns: 1fr; grid-template-rows: auto minmax(0, 1fr); }\n  .igsd-dlog-side { flex-direction: row; overflow-x: auto; padding: 0 0 1cqw; }\n  .igsd-dlog-row { width: 46cqw; }\n  .igsd-dlog-row-head, .igsd-dlog-title { font-size: 3.6cqw; }\n  .igsd-dlog-row-meta, .igsd-dlog-row-sum, .igsd-dlog-status, .igsd-dlog-label, .igsd-dlog-meter, .igsd-dlog-think summary, .igsd-dlog-chip, .igsd-dlog-chip i, .igsd-btn.is-mini { font-size: 2.8cqw; }\n  .igsd-dlog-facts, .igsd-dlog-notice, .igsd-dlog-error, .igsd-dlog-pre, .igsd-dlog-line, .igsd-dlog-card, .igsd-dlog-mono, .igsd-dlog-list-plain { font-size: 3cqw; }\n  .igsd-dlog-facts { grid-template-columns: 1fr; }\n  .igsd-dlog-pre { max-height: 90cqw; }\n  .igsd-dlog-line { grid-template-columns: 9cqw minmax(0, 1fr); }\n  .igsd-dlog-line > .igsd-dlog-chips { grid-column: 2; }\n  .igsd-dlog .igsd-note, .igsd-dlog-uid { font-size: 2.6cqw; }\n  .igsd-dlog-list-plain { padding-left: 6cqw; }\n  .igsd-panel-title { font-size: 6cqw; } .igsd-panel-en { font-size: 2.2cqw; }\n  .igsd-tab { padding: 1.2cqw 3cqw; font-size: 3.2cqw; }\n  .igsd-pill { padding: .8cqw 2.2cqw; font-size: 2.6cqw; }\n}\n';

// src/client/styles/skins.css
var skins_default = `/* ───────────── 皮肤 ───────────── */
.igsd-theater, .igsd-chat {
  --font-latin: "IGS Cormorant", "Cormorant Garamond", Georgia, serif;
}

/* 星穹（默认）：深空玻璃 + 粉紫青霓虹。 */
.igsd-theater[data-skin="stellar"] {
  --font-body: "LXGW Neo XiHei", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
  --font-display: "Source Han Serif CN", "Noto Serif SC", "Songti SC", serif;
}

/* 樱色：浅色毛玻璃、圆角、文楷。 */
.igsd-theater[data-skin="sakura"] {
  --accent: #ff6fa5; --accent2: #b28dff; --accent3: #7fd8ff;
  --ink: #4a2b3d; --ink-dim: rgba(90, 50, 75, .62);
  --box-bg: linear-gradient(180deg, rgba(255, 250, 253, .82), rgba(255, 238, 246, .9));
  --box-border: rgba(255, 160, 200, .55);
  --box-radius: 2.4cqw;
  --name-ink: #fff;
  --chip-bg: rgba(255, 245, 250, .72);
  --font-body: "LXGW WenKai", "Noto Sans SC", "PingFang SC", sans-serif;
  --font-display: "LXGW WenKai", "Noto Serif SC", serif;
  --wait-glyph: "❀";
}
.igsd-theater[data-skin="sakura"] .igsd-text { text-shadow: none; }
.igsd-theater[data-skin="sakura"] .igsd-name-plate { border-radius: 99px; clip-path: none; padding: .5cqw 2cqw; }
.igsd-theater[data-skin="sakura"] .igsd-name-plate::after { display: none; }
.igsd-theater[data-skin="sakura"] .igsd-box::before { height: .5cqw; background: repeating-linear-gradient(90deg, #ffc2da 0 1.2cqw, #fff 1.2cqw 2.4cqw); opacity: .8; animation: none; }
.igsd-theater[data-skin="sakura"] .igsd-hud-place, .igsd-theater[data-skin="sakura"] .igsd-hud-meta { color: #fff; }
.igsd-theater[data-skin="sakura"] .igsd-panel { background: linear-gradient(135deg, rgba(255, 246, 250, .96), rgba(245, 236, 255, .95)); color: var(--ink); }
.igsd-theater[data-skin="sakura"] .igsd-input, .igsd-theater[data-skin="sakura"] .igsd-select, .igsd-theater[data-skin="sakura"] .igsd-textarea { background: rgba(255, 255, 255, .7); }
.igsd-theater[data-skin="sakura"] .igsd-choice { color: var(--ink); }
.igsd-theater[data-skin="sakura"] .igsd-free input { background: rgba(255, 255, 255, .7); color: var(--ink); }
.igsd-theater[data-skin="sakura"] .igsd-title { background: linear-gradient(90deg, rgba(255, 240, 248, .9), rgba(255, 240, 248, .55) 42%, transparent 75%); color: var(--ink); }
.igsd-theater[data-skin="sakura"] .igsd-title-menu button:hover { color: var(--accent); }
.igsd-theater[data-skin="sakura"] .igsd-title-logo { background: linear-gradient(100deg, #ff4f93, #b28dff 60%, #6fc7ff); -webkit-background-clip: text; background-clip: text; filter: drop-shadow(0 .3cqw 1cqw rgba(255, 120, 170, .35)); }

/* 水墨：宣纸对话框、毛笔名牌、朱印。 */
.igsd-theater[data-skin="ink"] {
  --accent: #b3261e; --accent2: #3a3530; --accent3: #8a7a5c;
  --ink: #2b2620; --ink-dim: rgba(60, 50, 40, .62);
  --box-bg: linear-gradient(180deg, rgba(246, 239, 222, .95), rgba(236, 226, 202, .96));
  --box-border: rgba(80, 60, 40, .35);
  --box-radius: .2cqw;
  --box-blur: none;
  --chip-bg: rgba(246, 239, 222, .85);
  --font-body: "LXGW WenKai", "Noto Serif SC", serif;
  --font-display: "Huiwen Mincho", "LXGW WenKai", "Noto Serif SC", serif;
  --wait-glyph: "❖";
}
.igsd-theater[data-skin="ink"] .igsd-box { background-image: radial-gradient(120% 140% at 0% 100%, rgba(120, 90, 50, .14), transparent 55%), var(--box-bg); box-shadow: 0 1cqw 3cqw rgba(0, 0, 0, .45); }
.igsd-theater[data-skin="ink"] .igsd-box::before { height: .25cqw; background: linear-gradient(90deg, transparent, #3a3530 20%, #3a3530 80%, transparent); animation: none; }
.igsd-theater[data-skin="ink"] .igsd-box::after { display: none; }
.igsd-theater[data-skin="ink"] .igsd-text { text-shadow: none; }
.igsd-theater[data-skin="ink"] .igsd-name-plate { background: #2b2620; clip-path: polygon(2% 10%, 100% 0, 96% 90%, 0 100%); color: #f6efde; letter-spacing: .3em; }
.igsd-theater[data-skin="ink"] .igsd-name-plate::after { background: #b3261e; height: .2cqw; }
.igsd-theater[data-skin="ink"] .igsd-hud-place, .igsd-theater[data-skin="ink"] .igsd-hud-meta { color: #f6efde; }
.igsd-theater[data-skin="ink"] .igsd-hud-bar { background: #b3261e; box-shadow: none; }
.igsd-theater[data-skin="ink"] .igsd-panel { background: linear-gradient(135deg, rgba(242, 234, 214, .97), rgba(232, 220, 196, .97)); color: var(--ink); }
.igsd-theater[data-skin="ink"] .igsd-input, .igsd-theater[data-skin="ink"] .igsd-select, .igsd-theater[data-skin="ink"] .igsd-textarea { background: rgba(255, 252, 244, .7); }
.igsd-theater[data-skin="ink"] .igsd-choice { border-radius: .2cqw; color: var(--ink); }
.igsd-theater[data-skin="ink"] .igsd-free input { border-radius: .2cqw; background: rgba(255, 252, 244, .7); color: var(--ink); }
.igsd-theater[data-skin="ink"] .igsd-title { background: linear-gradient(90deg, rgba(240, 232, 212, .92), rgba(240, 232, 212, .6) 42%, transparent 78%); color: var(--ink); }
.igsd-theater[data-skin="ink"] .igsd-title-logo { background: none; color: #1e1a16; -webkit-text-fill-color: #1e1a16; filter: none; text-shadow: .2cqw .2cqw 0 rgba(179, 38, 30, .25); }
.igsd-theater[data-skin="ink"] .igsd-title-menu button:hover { color: #b3261e; }
.igsd-theater[data-skin="ink"] .igsd-titlecard-name { writing-mode: vertical-rl; font-size: 5cqw; text-shadow: 0 0 2cqw rgba(0, 0, 0, .7); }
.igsd-theater[data-skin="ink"] .igsd-grade { filter: sepia(.2); }

/* 夜金：黑底金字、电影字幕式对话框。 */
.igsd-theater[data-skin="noir"] {
  --accent: #d8b26a; --accent2: #8c6a2f; --accent3: #f3e2b8;
  --ink: #f3ead6; --ink-dim: rgba(243, 234, 214, .55);
  --box-bg: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, .82) 40%, rgba(0, 0, 0, .92));
  --box-border: transparent;
  --box-radius: 0;
  --box-blur: none;
  --font-body: "LXGW Neo ZhiSong", "Noto Serif SC", serif;
  --font-display: "LXGW Neo ZhiSong", "Noto Serif SC", serif;
  --wait-glyph: "▼";
}
.igsd-theater[data-skin="noir"] .igsd-dialog { left: 0; right: 0; bottom: 0; height: 31%; }
.igsd-theater[data-skin="noir"] .igsd-box { box-shadow: none; }
.igsd-theater[data-skin="noir"] .igsd-box::before { top: 26%; left: 20%; right: 20%; height: 1px; background: linear-gradient(90deg, transparent, var(--accent), transparent); animation: none; }
.igsd-theater[data-skin="noir"] .igsd-box::after { display: none; }
.igsd-theater[data-skin="noir"] .igsd-name { left: 0; right: 0; top: 10%; justify-content: center; }
.igsd-theater[data-skin="noir"] .igsd-name-plate { background: none; clip-path: none; box-shadow: none; color: var(--accent); font-size: 1.5cqw; letter-spacing: .6em; padding: 0; }
.igsd-theater[data-skin="noir"] .igsd-name-plate::after { display: none; }
.igsd-theater[data-skin="noir"] .igsd-text { left: 14%; right: 14%; top: 36%; text-align: center; font-size: 2.05cqw; }
.igsd-theater[data-skin="noir"] .igsd-progress { left: 30%; right: 30%; }
.igsd-theater[data-skin="noir"] .igsd-stage::after { content: ""; position: absolute; inset: 0; z-index: 45; pointer-events: none; background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='.9' numOctaves='2'/></filter><rect width='120' height='120' filter='url(%23n)' opacity='.06'/></svg>"); mix-blend-mode: overlay; }
.igsd-theater[data-skin="noir"] .igsd-camera { filter: saturate(.75) contrast(1.06); }

/* 赛博：扫描线、等宽、青品红。 */
.igsd-theater[data-skin="cyber"] {
  --accent: #00f0ff; --accent2: #ff2bd6; --accent3: #c6ff00;
  --ink: #e8fbff; --ink-dim: rgba(160, 230, 255, .6);
  --box-bg: linear-gradient(180deg, rgba(2, 16, 24, .82), rgba(4, 8, 20, .92));
  --box-border: rgba(0, 240, 255, .45);
  --box-radius: 0;
  --font-body: "LXGW Neo XiHei", "JetBrains Mono", monospace;
  --font-display: "LXGW Neo XiHei", "JetBrains Mono", monospace;
  --font-latin: "JetBrains Mono", "Cascadia Code", Consolas, monospace;
  --wait-glyph: "▍";
}
.igsd-theater[data-skin="cyber"] .igsd-box { clip-path: polygon(0 0, calc(100% - 2cqw) 0, 100% 2cqw, 100% 100%, 2cqw 100%, 0 calc(100% - 2cqw)); box-shadow: inset 0 0 2cqw rgba(0, 240, 255, .12); }
.igsd-theater[data-skin="cyber"] .igsd-box::after { background: repeating-linear-gradient(0deg, rgba(0, 240, 255, .06) 0 1px, transparent 1px 4px); width: auto; height: auto; inset: 0; border-radius: 0; right: 0; bottom: 0; }
.igsd-theater[data-skin="cyber"] .igsd-name-plate { background: var(--accent2); clip-path: polygon(0 0, 100% 0, calc(100% - 1cqw) 100%, 0 100%); text-shadow: .1cqw 0 #00f0ff, -.1cqw 0 #ff2bd6; }
.igsd-theater[data-skin="cyber"] .igsd-text { text-shadow: 0 0 .5cqw rgba(0, 240, 255, .35); }
.igsd-theater[data-skin="cyber"] .igsd-choice { border-radius: 0; clip-path: polygon(0 0, calc(100% - 1.4cqw) 0, 100% 50%, calc(100% - 1.4cqw) 100%, 0 100%); }
.igsd-theater[data-skin="cyber"] .igsd-title-logo { font-family: var(--font-display); animation: igsd-logo-in 1.4s .3s both, igsd-glitch 3.4s 2s steps(1) infinite; }
.igsd-theater[data-skin="cyber"] .igsd-stage::after { content: ""; position: absolute; inset: 0; z-index: 45; pointer-events: none; background: repeating-linear-gradient(0deg, rgba(0, 0, 0, .18) 0 1px, transparent 1px 3px); }
@keyframes igsd-glitch { 0%, 92%, 100% { transform: none; } 93% { transform: translate(.3cqw, -.2cqw) skewX(8deg); } 95% { transform: translate(-.4cqw, .1cqw); } 97% { transform: translate(.1cqw, .2cqw) skewX(-6deg); } }
`;

// src/client/styles/chat.css
var chat_default = '/* ───────────── 聊天里的场景卡与插画（Tavern 正文下方） ───────────── */\n.igsd-chat { --accent: #ff7eb6; --accent2: #9b7bff; --accent3: #5ee7ff; font-family: inherit; color: inherit; margin: 10px 0; max-width: 680px; }\n.igsd-chat *, .igsd-chat *::before, .igsd-chat *::after { box-sizing: border-box; }\n.igsd-chat button { font: inherit; cursor: pointer; }\n\n.igsd-scene { position: relative; display: grid; grid-template-columns: 112px 1fr; min-height: 108px; border-radius: 14px; overflow: hidden; color: #f5f3ff; background: #110e24; border: 1px solid rgba(255, 255, 255, .1); box-shadow: 0 10px 30px rgba(0, 0, 0, .25); isolation: isolate; }\n.igsd-scene-bg { position: absolute; inset: 0; z-index: -2; background-size: cover; background-position: center; filter: saturate(1.1); transform: scale(1.05); transition: transform 6s ease; }\n.igsd-scene:hover .igsd-scene-bg { transform: scale(1.12); }\n.igsd-scene::before { content: ""; position: absolute; inset: 0; z-index: -1; background: linear-gradient(90deg, rgba(10, 8, 26, .2) 0, rgba(10, 8, 26, .78) 112px, rgba(10, 8, 26, .9)); }\n.igsd-scene-clock { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; padding: 10px; font-family: "IGS Cormorant", "Cormorant Garamond", Georgia, serif; text-shadow: 0 1px 6px rgba(0, 0, 0, .8); }\n.igsd-scene-clock b { font-size: 30px; line-height: 1; font-weight: 700; letter-spacing: .02em; }\n.igsd-scene-clock span { font-size: 10px; letter-spacing: .35em; opacity: .8; text-transform: uppercase; }\n.igsd-scene-main { padding: 12px 14px 12px 4px; display: flex; flex-direction: column; gap: 6px; min-width: 0; }\n.igsd-scene-loc { font-size: 17px; font-weight: 700; letter-spacing: .12em; display: flex; align-items: center; gap: 8px; }\n.igsd-scene-loc::before { content: ""; width: 3px; height: 16px; border-radius: 3px; background: linear-gradient(180deg, var(--accent), var(--accent2)); box-shadow: 0 0 8px var(--accent); }\n.igsd-scene-chips { display: flex; flex-wrap: wrap; gap: 5px; }\n.igsd-chip { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 99px; font-size: 11px; letter-spacing: .06em; background: rgba(255, 255, 255, .09); border: 1px solid rgba(255, 255, 255, .12); }\n.igsd-chip i { width: 7px; height: 7px; border-radius: 50%; background: var(--c, var(--accent)); box-shadow: 0 0 6px var(--c, var(--accent)); }\n.igsd-scene-sum { font-size: 12.5px; opacity: .78; line-height: 1.5; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }\n.igsd-scene-actions { display: flex; gap: 6px; margin-top: auto; flex-wrap: wrap; }\n.igsd-play { display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px 5px 10px; border-radius: 99px; border: 0; color: #fff; font-weight: 700; font-size: 12.5px; letter-spacing: .1em; background: linear-gradient(100deg, var(--accent), var(--accent2)); box-shadow: 0 4px 16px rgba(255, 126, 182, .35); transition: transform .2s, box-shadow .2s; }\n.igsd-play:hover { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(255, 126, 182, .5); }\n.igsd-play::before { content: ""; width: 0; height: 0; border-left: 8px solid #fff; border-top: 5px solid transparent; border-bottom: 5px solid transparent; }\n.igsd-ghost { padding: 5px 12px; border-radius: 99px; font-size: 12px; color: inherit; background: rgba(255, 255, 255, .08); border: 1px solid rgba(255, 255, 255, .16); transition: background .2s; }\n.igsd-ghost:hover { background: rgba(255, 255, 255, .16); }\n.igsd-scene.is-pending .igsd-scene-main::after { content: ""; position: absolute; inset: 0; background: linear-gradient(100deg, transparent 30%, rgba(255, 255, 255, .08) 50%, transparent 70%); background-size: 200% 100%; animation: igsd-skeleton 1.4s linear infinite; pointer-events: none; }\n.igsd-scene-err { font-size: 12px; color: #ffb4b4; }\n.igsd-dots::after { content: "…"; display: inline-block; animation: igsd-dots 1.2s steps(4) infinite; width: 1.2em; overflow: hidden; vertical-align: bottom; }\n@keyframes igsd-dots { from { width: 0; } to { width: 1.2em; } }\n\n.igsd-cgcard { position: relative; border-radius: 14px; overflow: hidden; background: #0d0b1c; box-shadow: 0 12px 34px rgba(0, 0, 0, .3); border: 1px solid rgba(255, 255, 255, .08); }\n.igsd-cgcard img { display: block; width: 100%; height: auto; max-height: min(70vh, 520px); object-fit: cover; cursor: zoom-in; animation: igsd-cgcard-in .9s cubic-bezier(.2, .8, .2, 1) both; }\n@keyframes igsd-cgcard-in { from { opacity: 0; filter: blur(12px) brightness(1.4); transform: scale(1.03); } }\n.igsd-cgcard-wait { position: relative; display: grid; place-items: center; color: rgba(255, 255, 255, .78); font-size: 13px; letter-spacing: .1em; background: radial-gradient(120% 120% at 30% 20%, rgba(155, 123, 255, .35), transparent 60%), radial-gradient(100% 100% at 80% 90%, rgba(255, 126, 182, .3), transparent 60%), #120f26; overflow: hidden; }\n.igsd-cgcard-wait::before { content: ""; position: absolute; inset: 0; background: linear-gradient(100deg, transparent 30%, rgba(255, 255, 255, .12) 50%, transparent 70%); background-size: 200% 100%; animation: igsd-skeleton 1.6s linear infinite; }\n.igsd-cgcard-wait span { position: relative; display: flex; align-items: center; gap: 8px; }\n.igsd-cgcard-wait span::before { content: ""; width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--accent); border-right-color: transparent; animation: igsd-spin .8s linear infinite; }\n.igsd-cgcard-fail { padding: 14px 16px; font-size: 13px; color: #ffcdcd; display: flex; gap: 10px; align-items: center; flex-wrap: wrap; background: #1e1020; }\n.igsd-cgcard-bar { position: absolute; left: 0; right: 0; bottom: 0; display: flex; align-items: center; gap: 6px; padding: 26px 10px 8px; color: #fff; background: linear-gradient(transparent, rgba(0, 0, 0, .72)); opacity: 0; transform: translateY(6px); transition: opacity .25s, transform .25s; }\n.igsd-cgcard:hover .igsd-cgcard-bar, .igsd-cgcard:focus-within .igsd-cgcard-bar { opacity: 1; transform: none; }\n.igsd-cgcard-bar .igsd-cap { flex: 1; min-width: 0; font-size: 12.5px; letter-spacing: .12em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.igsd-cgcard-bar button { padding: 3px 10px; border-radius: 99px; font-size: 12px; color: #fff; background: rgba(255, 255, 255, .14); border: 1px solid rgba(255, 255, 255, .2); backdrop-filter: blur(6px); }\n.igsd-cgcard-bar button:hover { background: rgba(255, 255, 255, .26); }\n.igsd-cgcard-bar button[disabled] { opacity: .35; pointer-events: none; }\n@media (hover: none) { .igsd-cgcard-bar { opacity: 1; transform: none; } }\n\n.igsd-chat-lightbox { position: fixed; inset: 0; z-index: 2147483100; display: grid; place-items: center; background: rgba(0, 0, 0, .9); cursor: zoom-out; animation: igsd-fade-in .2s ease both; }\n.igsd-chat-lightbox img { max-width: 94vw; max-height: 92vh; object-fit: contain; }\n\n.igsd-toast { position: fixed; left: 50%; bottom: 7vh; z-index: 2147483200; transform: translateX(-50%); padding: 10px 18px; border-radius: 99px; font-size: 13.5px; letter-spacing: .04em; color: #fff; background: rgba(18, 14, 40, .92); border: 1px solid rgba(255, 255, 255, .14); box-shadow: 0 10px 30px rgba(0, 0, 0, .4); backdrop-filter: blur(10px); animation: igsd-toast-in .35s cubic-bezier(.2, .8, .2, 1) both; max-width: 86vw; }\n.igsd-toast.is-error { border-color: rgba(255, 120, 120, .6); }\n@keyframes igsd-toast-in { from { opacity: 0; transform: translate(-50%, 10px); } }\n\n.igsd-settings-card { display: grid; gap: 12px; padding: 18px; border-radius: 14px; border: 1px solid rgba(127, 127, 127, .25); background: linear-gradient(135deg, rgba(155, 123, 255, .08), rgba(255, 126, 182, .06)); }\n.igsd-settings-card h3 { margin: 0; font-size: 16px; display: flex; align-items: center; gap: 8px; }\n.igsd-settings-card p { margin: 0; font-size: 13px; opacity: .75; line-height: 1.6; }\n.igsd-settings-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; font-size: 13px; }\n';

// src/client/generated/igs-fx.css
var igs_fx_default = '/* 由 build-client.mjs 从 app/src/visual/igs-ui/fx-style.js 摘出，请勿手改。 */\n@keyframes igs-fx-pop{0%{opacity:0;transform:scale(.3);}18%{opacity:1;transform:translateY(-8%) scale(1.16);}30%{transform:translateY(-6%) scale(1);}80%{opacity:1;}100%{opacity:0;transform:translateY(-16%) scale(1);}}\n@keyframes igs-fx-pop-snap{0%{opacity:1;transform:scale(.2);}6%{transform:scale(1.35);}12%{transform:scale(.86);}18%{transform:scale(1.1) rotate(-6deg);}26%{transform:scale(1) rotate(5deg);}34%{transform:scale(1) rotate(-4deg);}44%{transform:scale(1.06) rotate(0deg);}58%{transform:scale(1) rotate(3deg);}74%{transform:scale(1.04) rotate(-2deg);}90%{opacity:1;transform:scale(1.12);}100%{opacity:0;transform:scale(.4);}}\n@keyframes igs-fx-part-throb{0%,100%{transform:scale(1);}50%{transform:scale(1.16);}}\n@keyframes igs-fx-part-burst{0%{opacity:0;transform:scale(.55);}25%{opacity:1;}100%{opacity:0;transform:scale(1.28);}}\n@keyframes igs-fx-part-slide{0%{opacity:0;transform:translateY(-22%) scale(.7);}24%{opacity:1;transform:translateY(0) scale(1.08);}36%{transform:translateY(0) scale(1);}100%{opacity:1;transform:translateY(30%) scale(1);}}\n@keyframes igs-fx-part-float{0%{opacity:0;transform:translateY(40%) scale(.3);}35%{opacity:1;transform:translateY(0) scale(1.15);}50%{transform:translateY(-6%) scale(1);}100%{opacity:1;transform:translateY(-30%) scale(1);}}\n@keyframes igs-fx-part-wobble{0%{transform:rotate(0);}25%{transform:rotate(-10deg);}50%{transform:rotate(8deg);}75%{transform:rotate(-4deg);}100%{transform:rotate(0);}}\n@keyframes igs-fx-part-pop{0%{opacity:0;transform:scale(.4);}60%{opacity:1;transform:scale(1.12);}100%{opacity:1;transform:scale(1);}}\n@keyframes igs-fx-part-dot{0%{opacity:0;transform:translateY(40%) scale(.3);}60%{opacity:1;transform:translateY(-12%) scale(1.15);}100%{opacity:1;transform:translateY(0) scale(1);}}\n@keyframes igs-fx-part-draw{0%{stroke-dashoffset:1;}100%{stroke-dashoffset:0;}}\n@keyframes igs-fx-part-twinkle{0%,100%{transform:scale(1) rotate(0);}40%{transform:scale(.78) rotate(18deg);}70%{transform:scale(1.12) rotate(0);}}\n@keyframes igs-fx-part-sway{0%,100%{transform:rotate(0) translateY(0);}25%{transform:rotate(-8deg) translateY(-4%);}75%{transform:rotate(8deg) translateY(-4%);}}\n@keyframes igs-fx-part-split-l{0%,35%{transform:translate(0,0) rotate(0);}55%{transform:translate(-4%,1%) rotate(-6deg);}100%{transform:translate(-8%,6%) rotate(-12deg);}}\n@keyframes igs-fx-part-split-r{0%,35%{transform:translate(0,0) rotate(0);}55%{transform:translate(4%,1%) rotate(6deg);}100%{transform:translate(8%,8%) rotate(12deg);}}\n@keyframes igs-fx-part-drift{0%{opacity:0;transform:translate(-18%,10%) scale(.4);}35%{opacity:1;transform:translate(0,0) scale(1.06);}50%{transform:translate(0,0) scale(1);}100%{opacity:.9;transform:translate(8%,-10%) scale(1.08);}}\n@keyframes igs-fx-part-spin{from{transform:rotate(0);}to{transform:rotate(360deg);}}\n@keyframes igs-fx-part-flicker{0%{transform:scale(1,1) skewX(0);}50%{transform:scale(.95,1.08) skewX(-3deg);}100%{transform:scale(1.04,.96) skewX(3deg);}}\n@keyframes igs-fx-part-freeze{0%{opacity:0;transform:rotate(-90deg) scale(.3);}60%{opacity:1;transform:rotate(8deg) scale(1.08);}100%{opacity:1;transform:rotate(0) scale(1);}}\n@keyframes igs-fx-part-blink{0%{opacity:0;transform:scale(.2);}30%{opacity:1;transform:scale(1.2);}55%{opacity:.35;transform:scale(.85);}80%,100%{opacity:1;transform:scale(1);}}\n.igs-fx-symbol{--igs-fx-size:52px;--igs-fx-hue:#ff3b55;--igs-fx-c:color-mix(in oklab,var(--igs-fx-hue) 74%,var(--igs-fx-accent,var(--igs-fx-hue)));--igs-fx-pop:var(--igs-fx-accent,var(--igs-fx-c));--igs-fx-ink:color-mix(in oklab,var(--igs-fx-c) 30%,#2b1024);--igs-fx-rim-c:#fff;--igs-fx-paper:color-mix(in oklab,var(--igs-fx-pop) 18%,#fff);position:absolute;left:66%;top:16%;width:var(--igs-fx-size);height:var(--igs-fx-size);margin:calc(var(--igs-fx-size) / -2) 0 0 calc(var(--igs-fx-size) / -2);display:flex;align-items:center;justify-content:center;animation:igs-fx-pop var(--igs-fx-life,1s) ease-out both;}\n.igs-fx-symbol[data-pending]{visibility:hidden;}\n.igs-fx-symbol[data-kind="anger"]{--igs-fx-hue:#ff3b55;}\n.igs-fx-symbol[data-kind="sweat"]{--igs-fx-hue:#43b4ff;}\n.igs-fx-symbol[data-kind="heart"]{--igs-fx-hue:#ff5c9e;}\n.igs-fx-symbol[data-kind="surprise"]{--igs-fx-hue:#ffbf1f;}\n.igs-fx-symbol[data-kind="silence"]{--igs-fx-hue:#8a7dff;}\n.igs-fx-symbol[data-kind="gloom"]{--igs-fx-hue:#5b3fa8;--igs-fx-ink:color-mix(in oklab,var(--igs-fx-c) 45%,#140a26);}\n.igs-fx-symbol[data-kind="sparkle"]{--igs-fx-hue:#ffd43b;}\n.igs-fx-symbol[data-kind="bulb"]{--igs-fx-hue:#ffc93c;}\n.igs-fx-symbol[data-kind="note"]{--igs-fx-hue:#2ec4a6;}\n.igs-fx-symbol[data-kind="zzz"]{--igs-fx-hue:#6f8dff;}\n.igs-fx-symbol[data-kind="heartbreak"]{--igs-fx-hue:#e0456f;}\n.igs-fx-symbol[data-kind="sigh"]{--igs-fx-hue:#c3cfdc;--igs-fx-ink:color-mix(in oklab,var(--igs-fx-c) 35%,#27303d);}\n.igs-fx-symbol[data-kind="dizzy"]{--igs-fx-hue:#22b8d1;}\n.igs-fx-symbol[data-kind="fire"]{--igs-fx-hue:#ff6a2b;}\n.igs-fx-symbol[data-kind="frost"]{--igs-fx-hue:#6fd3ff;}\n.igs-fx-svg{flex:none;width:122%;height:122%;overflow:visible;display:block;}\n.igs-fx-symbol[data-flip]:not([data-kind="surprise"]):not([data-kind="zzz"]) .igs-fx-svg{transform:scaleX(-1);}\n.igs-fx-svg .igs-fx-g,.igs-fx-svg .igs-fx-dot{transform-box:fill-box;transform-origin:50% 50%;}\n.igs-fx-svg .igs-fx-rim{stroke:var(--igs-fx-rim-c);}\n.igs-fx-svg .igs-fx-solid>.igs-fx-rim{fill:var(--igs-fx-rim-c);}\n.igs-fx-svg .igs-fx-ink{stroke:var(--igs-fx-ink);}\n.igs-fx-svg .igs-fx-line{stroke:var(--igs-fx-c);}\n.igs-fx-svg .igs-fx-fill{fill:var(--igs-fx-c);stroke:var(--igs-fx-ink);}\n.igs-fx-svg .igs-fx-paper{fill:var(--igs-fx-paper);stroke:var(--igs-fx-ink);}\n.igs-fx-svg .igs-fx-hi{fill:#fff;opacity:.85;}\n.igs-fx-svg .igs-fx-star-b .igs-fx-fill,.igs-fx-svg .igs-fx-star-c .igs-fx-fill,.igs-fx-svg .igs-fx-heart-b .igs-fx-fill,.igs-fx-svg .igs-fx-heart-c .igs-fx-fill,.igs-fx-svg .igs-fx-drop-b .igs-fx-fill{fill:color-mix(in oklab,var(--igs-fx-pop) 55%,var(--igs-fx-c));}\n.igs-fx-svg .igs-fx-hi-line{stroke:#fff;opacity:.8;}\n.igs-fx-svg .igs-fx-burst{stroke:var(--igs-fx-pop);transform-box:view-box;transform-origin:50px 50px;animation:igs-fx-part-burst .45s ease-out both;}\n.igs-fx-svg .igs-fx-vein{animation:igs-fx-part-throb .42s ease-in-out .12s 3;}\n.igs-fx-svg .igs-fx-drop-a{animation:igs-fx-part-slide .95s ease-in .05s both;}\n.igs-fx-svg .igs-fx-drop-b{animation:igs-fx-part-slide .85s ease-in .3s both;}\n.igs-fx-svg .igs-fx-heart-main{animation:igs-fx-part-throb .46s ease-in-out .1s 2;}\n.igs-fx-svg .igs-fx-heart-b{animation:igs-fx-part-float .8s ease-out .18s both;}\n.igs-fx-svg .igs-fx-heart-c{animation:igs-fx-part-float .8s ease-out .34s both;}\n.igs-fx-svg .igs-fx-bang,.igs-fx-svg .igs-fx-ques{transform-origin:50% 100%;animation:igs-fx-part-wobble .6s ease-in-out .12s both;}\n.igs-fx-svg .igs-fx-ques{animation-delay:.2s;}\n.igs-fx-svg .igs-fx-bubble{animation:igs-fx-part-pop .3s ease-out both;}\n.igs-fx-svg .igs-fx-dot{animation:igs-fx-part-dot .3s ease-out both;}\n.igs-fx-svg .igs-fx-dot-1{animation-delay:.18s;}\n.igs-fx-svg .igs-fx-dot-2{animation-delay:.36s;}\n.igs-fx-svg .igs-fx-dot-3{animation-delay:.54s;}\n.igs-fx-svg .igs-fx-wave path{stroke-dasharray:1 1;stroke-dashoffset:0;animation:igs-fx-part-draw .5s ease-out both;}\n.igs-fx-svg .igs-fx-wave .igs-fx-rim{stroke:rgba(255,255,255,.65);}\n.igs-fx-svg .igs-fx-wave-2 path{animation-delay:.1s;}\n.igs-fx-svg .igs-fx-wave-3 path{animation-delay:.2s;}\n.igs-fx-svg .igs-fx-wave-4 path{animation-delay:.3s;}\n.igs-fx-svg .igs-fx-star-main{animation:igs-fx-part-twinkle .7s ease-in-out .1s 2;}\n.igs-fx-svg .igs-fx-star-b{animation:igs-fx-part-blink .6s ease-out .22s both;}\n.igs-fx-svg .igs-fx-star-c{animation:igs-fx-part-blink .6s ease-out .4s both;}\n.igs-fx-svg .igs-fx-filament{stroke:var(--igs-fx-ink);}\n.igs-fx-svg .igs-fx-bulb-base .igs-fx-fill{fill:color-mix(in oklab,var(--igs-fx-ink) 30%,#d9dde4);}\n.igs-fx-svg .igs-fx-bulb{animation:igs-fx-part-blink .6s ease-out .08s both;}\n.igs-fx-svg .igs-fx-note-main{transform-origin:50% 100%;animation:igs-fx-part-sway .5s ease-in-out .1s 2;}\n.igs-fx-svg .igs-fx-note-b{animation:igs-fx-part-float .8s ease-out .25s both;}\n.igs-fx-svg .igs-fx-z-1{animation:igs-fx-part-float .7s ease-out both;}\n.igs-fx-svg .igs-fx-z-2{animation:igs-fx-part-float .7s ease-out .22s both;}\n.igs-fx-svg .igs-fx-z-3{animation:igs-fx-part-float .7s ease-out .44s both;}\n.igs-fx-svg .igs-fx-break-l{animation:igs-fx-part-split-l .8s ease-out .1s both;}\n.igs-fx-svg .igs-fx-break-r{animation:igs-fx-part-split-r .8s ease-out .1s both;}\n.igs-fx-svg .igs-fx-puff{animation:igs-fx-part-drift .9s ease-out .15s both;}\n.igs-fx-svg .igs-fx-puff-b{animation:igs-fx-part-pop .25s ease-out .05s both;}\n.igs-fx-svg .igs-fx-puff-c{animation:igs-fx-part-pop .25s ease-out both;}\n.igs-fx-svg .igs-fx-spiral{animation:igs-fx-part-spin .9s linear both;}\n.igs-fx-svg .igs-fx-orbit{transform-box:view-box;transform-origin:50px 50px;animation:igs-fx-part-spin 1s linear reverse both;}\n.igs-fx-svg .igs-fx-flame{transform-origin:50% 100%;animation:igs-fx-part-flicker .24s ease-in-out 4 alternate;}\n.igs-fx-svg .igs-fx-flame-in{fill:color-mix(in oklab,var(--igs-fx-c) 30%,#ffe45c);}\n.igs-fx-svg .igs-fx-crystal{animation:igs-fx-part-freeze .6s ease-out both;}\n.igs-fx-symbol[data-era="ancient"][data-kind="bulb"]{--igs-fx-hue:#ff9a3c;}\n.igs-fx-symbol[data-era="ancient"][data-kind="note"]{--igs-fx-hue:#34485a;--igs-fx-ink:#141a22;}\n.igs-fx-symbol[data-era="ancient"][data-kind="zzz"]{--igs-fx-hue:#9fdcff;}\n.igs-fx-svg .igs-fx-lamp{animation:igs-fx-part-pop .35s ease-out both;}\n.igs-fx-svg .igs-fx-lamp-flame{transform-origin:50% 100%;animation:igs-fx-part-flicker .24s ease-in-out .15s 4 alternate;}\n.igs-fx-svg .igs-fx-lamp-bowl .igs-fx-fill{fill:color-mix(in oklab,#b8863b 72%,var(--igs-fx-ink));}\n.igs-fx-svg .igs-fx-inkwave path{stroke-dasharray:none;}\n.igs-fx-svg .igs-fx-inkwave{animation:igs-fx-part-pop .3s ease-out both;}\n.igs-fx-svg .igs-fx-inkdot-1{animation:igs-fx-part-dot .35s ease-out .12s both;}\n.igs-fx-svg .igs-fx-inkdot-2{animation:igs-fx-part-dot .35s ease-out .28s both;}\n.igs-fx-svg .igs-fx-inkdot-3{animation:igs-fx-part-dot .35s ease-out .44s both;}\n.igs-fx-svg .igs-fx-snot .igs-fx-fill,.igs-fx-svg .igs-fx-snot-b .igs-fx-fill{fill:color-mix(in oklab,var(--igs-fx-c) 45%,#fff);fill-opacity:.82;}\n.igs-fx-svg .igs-fx-snot{transform-origin:0% 100%;animation:igs-fx-part-inflate .6s ease-out both,igs-fx-part-throb .9s ease-in-out .6s 2;}\n.igs-fx-svg .igs-fx-snot-b{animation:igs-fx-part-pop .25s ease-out both;}\n@keyframes igs-fx-part-inflate{0%{opacity:0;transform:scale(.15);}45%{opacity:1;transform:scale(1.08);}70%{transform:scale(.95);}100%{opacity:1;transform:scale(1);}}\n#igs-overlay[data-igs-dialog-skin="black-white-manga"] .igs-fx-symbol{--igs-fx-c:#161616;--igs-fx-pop:#161616;--igs-fx-ink:#161616;--igs-fx-paper:#fff;}\n#igs-overlay[data-igs-dialog-skin="black-white-manga"] .igs-fx-svg .igs-fx-flame-in{fill:#fff;}\n#igs-stage-motion[data-igs-fx-motion="snappy"] .igs-fx-symbol{animation-name:igs-fx-pop-snap;animation-timing-function:steps(1,end);}\n#igs-stage-motion[data-igs-fx-motion="snappy"] .igs-fx-symbol[data-kind="anger"]{animation-name:igs-fx-throb-snap;}\n#igs-stage-motion[data-igs-fx-motion="snappy"] .igs-fx-svg *{animation-timing-function:steps(2,end);}\n#igs-stage-motion[data-igs-fx-motion="snappy"] .igs-fx-symbol[data-kind="sweat"]{animation-name:igs-fx-drip-snap;}\n.igs-fx-symbol{transform:none;}\n.igs-fx-symbol[data-kind="drool"]{--igs-fx-hue:#6fc8ff;}\n.igs-fx-symbol[data-kind="chomp"]{--igs-fx-hue:#ff8a3d;}\n.igs-fx-symbol[data-kind="munch"]{--igs-fx-hue:#ffad3b;}\n.igs-fx-symbol[data-kind="gulp"]{--igs-fx-hue:#5fb8ff;}\n.igs-fx-symbol[data-kind="bloom"]{--igs-fx-hue:#ff8fb8;}\n.igs-fx-symbol[data-kind="blush"]{--igs-fx-hue:#ff6f91;}\n.igs-fx-symbol[data-kind="spicy"]{--igs-fx-hue:#ff4a2b;}\n.igs-fx-symbol[data-kind="steam"]{--igs-fx-hue:#e9eff6;--igs-fx-ink:color-mix(in oklab,var(--igs-fx-c) 30%,#2a3340);}\n.igs-fx-symbol[data-kind="sour"]{--igs-fx-hue:#9ccf3a;}\n.igs-fx-symbol[data-kind="aah"]{--igs-fx-hue:#ff6fa5;}\n.igs-fx-symbol[data-kind="full"]{--igs-fx-hue:#ffc46b;}\n.igs-fx-symbol[data-kind="bubbles"]{--igs-fx-hue:#7fd3ff;}\n.igs-fx-symbol[data-kind="blush"],.igs-fx-symbol[data-kind="sour"]{z-index:0;}\n.igs-fx-svg .igs-fx-drool{transform-origin:50% 0;animation:igs-fx-eat-drip .6s ease-out both;}\n.igs-fx-svg .igs-fx-drool-line{animation:igs-fx-part-blink .4s ease-out both;}\n.igs-fx-svg .igs-fx-jaw-top{animation:igs-fx-eat-jaw-top .32s cubic-bezier(.3,1.6,.5,1) both;}\n.igs-fx-svg .igs-fx-jaw-bottom{animation:igs-fx-eat-jaw-bottom .32s cubic-bezier(.3,1.6,.5,1) both;}\n.igs-fx-svg .igs-fx-munch-a,.igs-fx-svg .igs-fx-munch-b{transform-origin:0 50%;animation:igs-fx-eat-munch .36s ease-in-out 3;}\n.igs-fx-svg .igs-fx-munch-b{animation-delay:.08s;}\n.igs-fx-svg .igs-fx-crumb-a{animation:igs-fx-eat-crumb .7s ease-in .2s both;}\n.igs-fx-svg .igs-fx-crumb-b{animation:igs-fx-eat-crumb .7s ease-in .5s both;}\n.igs-fx-svg .igs-fx-gulp{animation:igs-fx-part-slide .45s ease-in both;}\n.igs-fx-svg .igs-fx-bloom-main{animation:igs-fx-eat-bloom .7s cubic-bezier(.3,1.5,.5,1) both;}\n.igs-fx-svg .igs-fx-bloom-b{animation:igs-fx-eat-bloom .6s cubic-bezier(.3,1.5,.5,1) .2s both;}\n.igs-fx-svg .igs-fx-bloom-c{animation:igs-fx-eat-bloom .6s cubic-bezier(.3,1.5,.5,1) .35s both;}\n.igs-fx-svg .igs-fx-bloom-core{fill:#ffe066;stroke:var(--igs-fx-ink);}\n.igs-fx-svg .igs-fx-blush{animation:igs-fx-eat-fade .35s ease-out both;}\n.igs-fx-svg .igs-fx-spicy-flame{transform-origin:50% 100%;animation:igs-fx-part-flicker .18s ease-in-out 6 alternate;}\n.igs-fx-svg .igs-fx-steam-a{animation:igs-fx-eat-rise .9s ease-out both;}\n.igs-fx-svg .igs-fx-steam-b{animation:igs-fx-eat-rise .9s ease-out .15s both;}\n.igs-fx-svg .igs-fx-steam-c{animation:igs-fx-eat-rise .9s ease-out .3s both;}\n.igs-fx-svg .igs-fx-sour-a,.igs-fx-svg .igs-fx-sour-b,.igs-fx-svg .igs-fx-sour-c{animation:igs-fx-eat-jitter .16s linear 5;}\n.igs-fx-svg .igs-fx-sour-b{animation-delay:.05s;}\n.igs-fx-svg .igs-fx-aah{transform-origin:30% 100%;animation:igs-fx-part-pop .3s ease-out both,igs-fx-part-sway .6s ease-in-out .3s 2;}\n.igs-fx-svg .igs-fx-aah-text{fill:var(--igs-fx-c);stroke:var(--igs-fx-paper);stroke-width:3;paint-order:stroke;font-family:"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;}\n.igs-fx-svg .igs-fx-bub-a{animation:igs-fx-part-float .8s ease-out both;}\n.igs-fx-svg .igs-fx-bub-b{animation:igs-fx-part-float .8s ease-out .25s both;}\n.igs-fx-svg .igs-fx-bub-c{animation:igs-fx-part-float .8s ease-out .5s both;}\n.igs-fx-symbol[data-flip] .igs-fx-onoma{left:auto;right:72%;transform:rotate(10deg);}\n.igs-fx-symbol[data-kind="blush"] .igs-fx-onoma,.igs-fx-symbol[data-kind="sour"] .igs-fx-onoma{left:86%;top:-10%;}\n.igs-fx-symbol[data-kind="steam"] .igs-fx-onoma,.igs-fx-symbol[data-kind="full"] .igs-fx-onoma{color:var(--igs-fx-ink);}\n';

// src/client/api.js
var import_react = __toESM(require("react"), 1);
function originBase() {
  const candidates = [];
  try {
    if (window.top && window.top.location && window.top.location.origin) candidates.push(window.top.location.origin);
  } catch {
  }
  try {
    if (location.origin) candidates.push(location.origin);
  } catch {
  }
  const origin = candidates.find((o) => o && o !== "null" && /^https?:/i.test(o));
  return origin || "";
}
var API = originBase() + "/plugins/dsh-tavern-igs/api";
var assetUrl = (id) => id ? `${API}/asset?id=${encodeURIComponent(id)}` : "";
async function call(path, body, { method = body ? "POST" : "GET", signal } = {}) {
  const init = { method, signal, cache: "no-store", headers: { "x-igs-request": "1" } };
  if (method === "POST") {
    init.headers["content-type"] = "application/json";
    init.body = JSON.stringify(body || {});
  }
  const res = await fetch(API + path, init);
  let data = null;
  try {
    data = await res.json();
  } catch {
  }
  if (!res.ok || !data || data.ok === false) throw new Error(data && data.error || `HTTP ${res.status}`);
  return data;
}
var api = {
  game: (gameId, since, signal) => call(`/game?gameId=${encodeURIComponent(gameId)}${since ? `&since=${since}` : ""}`, null, { signal }),
  direct: (gameId, turn, force = false) => call("/direct", { gameId, turn, force }),
  replan: (gameId, turn) => call("/replan", { gameId, turn }),
  render: (gameId, imageId, overrides) => call("/image/render", { gameId, imageId, overrides }),
  rewrite: (gameId, imageId, instruction) => call("/image/rewrite", { gameId, imageId, instruction }),
  version: (gameId, imageId, index) => call("/image/version", { gameId, imageId, index }),
  deleteImage: (gameId, imageId) => call("/image/delete", { gameId, imageId }),
  addImage: (gameId, turn, after, plan) => call("/image/add", { gameId, turn, after, plan }),
  cancel: (gameId, kind, id) => call("/cancel", { gameId, kind, id }),
  directorLog: (gameId, since, signal) => call(`/director-log?gameId=${encodeURIComponent(gameId)}${since ? `&since=${since}` : ""}`, null, { signal }),
  directorEntry: (gameId, id) => call(`/director-log?gameId=${encodeURIComponent(gameId)}&id=${encodeURIComponent(id)}`),
  place: (gameId, key) => call("/place/render", { gameId, key }),
  cast: (gameId, action, input) => call("/cast", { gameId, action, ...input }),
  config: () => call("/config"),
  patchConfig: (patch) => call("/config", { patch }),
  secret: (backend, endpoint, value) => call("/secret", { backend, endpoint, value }),
  test: () => call("/test", {}),
  models: () => call("/models"),
  llm: (provider) => call(`/llm?provider=${encodeURIComponent(provider || "")}`),
  update: (check) => call(`/update${check ? `?check=${check}` : ""}`),
  runUpdate: (action) => call("/update", { action })
};
var state = { open: false, gameId: "", startTurn: null, panel: "", panelArg: null, lastGameId: "", resume: null, toast: null, configVersion: 0 };
var listeners = /* @__PURE__ */ new Set();
var ui = {
  get: () => state,
  set(patch) {
    Object.assign(state, patch);
    for (const fn of [...listeners]) fn();
  },
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }
};
var snapshot = { ...state };
ui.subscribe(() => {
  snapshot = { ...state };
});
function useUi() {
  return import_react.default.useSyncExternalStore(ui.subscribe, () => snapshot, () => snapshot);
}
function openTheater(gameId, opts = {}) {
  if (!gameId) gameId = state.lastGameId;
  if (!gameId && opts.panel !== "settings") {
    toast("先打开一局对话，再进剧场");
    return;
  }
  ui.set({ open: true, gameId, startTurn: opts.turn ?? null, panel: opts.panel || "", panelArg: opts.panelArg ?? null, resume: null });
}
function rememberGame(gameId) {
  if (gameId && state.lastGameId !== gameId) {
    state.lastGameId = gameId;
    setTimeout(() => ui.set({}), 0);
  }
}
var toastTimer = null;
function toast(text, tone = "info") {
  clearTimeout(toastTimer);
  ui.set({ toast: { text, tone, at: Date.now() } });
  toastTimer = setTimeout(() => ui.set({ toast: null }), 3600);
}
var configCache = null;
var configPromise = null;
var configListeners = /* @__PURE__ */ new Set();
function loadConfig(force = false) {
  if (configCache && !force) return Promise.resolve(configCache);
  if (!configPromise || force) {
    configPromise = api.config().then((data) => {
      setConfig(data);
      return data;
    }).finally(() => {
      configPromise = null;
    });
  }
  return configPromise;
}
function setConfig(data) {
  configCache = data;
  for (const fn of [...configListeners]) fn();
}
function useConfig() {
  const [, force] = import_react.default.useReducer((x) => x + 1, 0);
  import_react.default.useEffect(() => {
    configListeners.add(force);
    if (!configCache) loadConfig().catch(() => {
    });
    return () => configListeners.delete(force);
  }, []);
  return configCache;
}
async function patchConfig(patch) {
  const data = await api.patchConfig(patch);
  setConfig(data);
  return data;
}
var updateState = null;
var updateListeners = /* @__PURE__ */ new Set();
function setUpdate(update) {
  updateState = update;
  for (const fn of [...updateListeners]) fn();
}
function loadUpdate(check) {
  return api.update(check).then((r) => {
    setUpdate(r.update);
    return r.update;
  });
}
function useUpdate(autoCheck = false) {
  const [, force] = import_react.default.useReducer((x) => x + 1, 0);
  import_react.default.useEffect(() => {
    updateListeners.add(force);
    if (!updateState || autoCheck) loadUpdate(autoCheck ? "auto" : "").catch(() => {
    });
    return () => updateListeners.delete(force);
  }, [autoCheck]);
  return updateState;
}
var updateAvailable = (u) => Boolean(u && u.managed && u.last && u.last.behind > 0 && !u.restartRequired);
function useLongPoll(key, active, fetchOnce) {
  const [data, setData] = import_react.default.useState(null);
  const [error, setError] = import_react.default.useState("");
  import_react.default.useEffect(() => {
    if (!key || !active) return void 0;
    let stopped = false;
    const controller = new AbortController();
    let rev = 0;
    let failures = 0;
    (async () => {
      while (!stopped) {
        try {
          const next = await fetchOnce(rev, controller.signal);
          if (stopped) return;
          failures = 0;
          setError("");
          if (next.rev !== rev || !rev) {
            rev = next.rev;
            setData(next);
          }
        } catch (e) {
          if (stopped) return;
          failures += 1;
          setError(String(e && e.message || e));
          await new Promise((r) => setTimeout(r, Math.min(15e3, 800 * 2 ** failures)));
        }
      }
    })();
    return () => {
      stopped = true;
      controller.abort();
    };
  }, [key, active]);
  return { data, error };
}
function useGameView(gameId, active = true) {
  const { data, error } = useLongPoll(gameId, active, (since, signal) => api.game(gameId, since, signal));
  return { view: data ? data.view : null, error };
}
function useDirectorLog(gameId, active = true) {
  const { data, error } = useLongPoll(gameId, active, (since, signal) => api.directorLog(gameId, since, signal));
  return { log: data, error };
}

// src/client/theater/Theater.jsx
var import_react7 = __toESM(require("react"), 1);

// src/client/data/igs-packs.json
var igs_packs_default = { backgrounds: [{ n: "双人卧室", f: "m", w: ["卧室", "主卧", "卧房", "寝室", "家中主卧"], u: "r-2228bfbe0d4a.webp", t: { 白天: "r-4260310d62cb.webp" } }, { n: "卧室门口", f: "m", w: ["卧室门前", "房间门口", "房门口", "家中主卧门前"], u: "r-6ecb6b95f1d5.webp" }, { n: "别墅车库", f: "m", w: ["车库", "私家车库", "室内车库"], u: "r-301b589435ff.webp" }, { n: "地下停车场", f: "m", w: ["地下车库", "停车场", "地库", "学校地下车库"], u: "r-19fe85ceaa37.webp" }, { n: "别墅电梯", f: "m", w: ["电梯", "电梯内部", "家用电梯", "电梯轿厢"], u: "r-913bf230743c.webp" }, { n: "办公室门口", f: "m", w: ["教研室门口", "教研室门前", "办公室门前", "楼道走廊"], u: "r-ca963fe91e5c.webp" }, { n: "教研室", f: "m", w: ["教师办公室", "老师办公室", "美术教研室", "学校办公室"], u: "r-aa512adff2d7.webp" }, { n: "城市街道", f: "m", w: ["街道", "街头", "马路", "大街", "市中心", "商业街"], u: "r-e910e991ef3e.webp" }, { n: "拉面馆", f: "m", w: ["面馆", "拉面店", "小饭馆", "老街面馆"], u: "r-20d32d9d142f.webp" }, { n: "拉面馆门口", f: "m", w: ["拉面馆门前", "面馆门口", "小店门口"], u: "r-1c0049aff40b.webp" }, { n: "老街巷口", f: "m", w: ["巷口", "胡同口", "小巷口", "老城区巷口"], u: "r-dc80b391f050.webp" }, { n: "琴房", f: "m", w: ["钢琴房", "音乐室", "练琴房"], u: "r-351c640da841.webp" }, { n: "开放式厨房", f: "m", w: ["厨房吧台", "吧台", "一楼开放式厨房"], u: "r-89f053883549.webp" }, { n: "客厅", f: "m", w: ["起居室", "家中客厅", "一楼客厅", "家里客厅"], u: "r-69a13b8da2c7.webp" }, { n: "餐厅", f: "m", w: ["饭厅", "家中餐厅", "餐桌"], u: "r-340ca8006997.webp" }, { n: "车内", f: "m", w: ["汽车内", "车里", "驾驶座", "副驾驶", "街道与车内"], u: "r-9ccbd1f052fa.webp" }, { n: "新中式庭院", f: "m", w: ["中式庭院", "会所庭院", "庭院前", "外庭院"], u: "r-7957a9003f9d.webp" }, { n: "水榭回廊", f: "m", w: ["回廊", "临水回廊", "会所回廊"], u: "r-d76abbf0e2f3.webp" }, { n: "水榭正厅", f: "m", w: ["水榭", "会所正厅", "会所大厅"], u: "r-579449f08e65.webp" }, { n: "玄关", f: "m", w: ["门厅", "入户", "家中玄关", "进门处"], u: "r-b4d1fe06586b.webp" }, { n: "浴室", f: "m", w: ["浴缸", "淋浴间", "家中浴室"], u: "r-d65f753ef4fc.webp" }, { n: "别墅主卧", f: "m", w: ["主卧室", "宅邸卧室", "豪宅卧室", "大卧室"], u: "r-c5d265ece8a7.webp", t: { 夜晚: "r-4934d70995f9.webp" } }, { n: "老式女生卧室", f: "m", w: ["大院卧室", "家属院卧室", "女儿房", "旧公寓卧室"], u: "r-d4c82bcb4338.webp" }, { n: "老式客厅", f: "m", w: ["大院客厅", "家属院客厅", "老式会客室", "旧式客厅"], u: "r-33d29aed7722.webp" }, { n: "茶室", f: "m", w: ["中式茶室", "品茶室", "茶房"], u: "r-08720bcc90e8.webp" }, { n: "游戏厅", f: "m", w: ["电玩城", "街机厅", "游戏中心"], u: "r-0e93f26d84ea.webp" }, { n: "游戏厅门口", f: "m", w: ["电玩城门口", "街机厅门口"], u: "r-b3f4db342871.webp" }, { n: "武馆门厅", f: "m", w: ["武道馆门厅", "武馆", "武术馆", "道馆大厅"], u: "r-52c726e58664.webp" }, { n: "公寓客厅", f: "m", w: ["小客厅", "小户型客厅", "宅邸客厅"], u: "r-6a44a4a25a86.webp", t: { 夜晚: "r-d52340b66d4b.webp", 深夜: "r-026c82baea12.webp" } }, { n: "形体室", f: "m", w: ["多功能形体室", "舞蹈室", "练功房", "健身房", "瑜伽室"], u: "r-e1ebbc27aa97.webp" }, { n: "家庭厨房", f: "m", w: ["厨房", "家里厨房", "宅邸厨房"], u: "r-1eb4c1e595d3.webp" }, { n: "洗手间", f: "m", w: ["卫生间", "厕所", "洗手台"], u: "r-376603ed3498.webp" }, { n: "贵宾室", f: "m", w: ["VIP室", "贵宾休息室", "接待室"], u: "r-b5db973cd550.webp" }, { n: "汽车旅馆房间", f: "m", w: ["汽车旅馆", "汽车旅店", "路边旅馆", "廉价旅馆"], u: "r-35f0da8a53ff.webp" }, { n: "洋馆书房", f: "m", w: ["洋馆的书房", "西式书房", "古董书房", "藏书室"], u: "r-44b60b1c4cd4.webp" }, { n: "高层公寓客厅", f: "m", w: ["私人公寓", "高级公寓", "公寓夜景"], u: "r-f5cdebe91b88.webp" }, { n: "刑警办公室", f: "m", w: ["刑侦办公室", "警局办公室", "刑警队", "警察局", "执务室"], u: "r-a73a36846c45.webp" }, { n: "公寓书房", f: "m", w: ["书房", "家庭办公室", "工作间"], u: "r-0aef3a21a13c.webp" }, { n: "少女卧室", f: "m", w: ["女生卧室", "女孩房间", "粉色卧室", "公寓卧室"], u: "r-dcb20a2ebaa5.webp" }, { n: "废弃小巷", f: "m", w: ["暗巷", "后巷", "小巷", "陈旧暗巷"], u: "r-886415bfe4ac.webp" }, { n: "西式沙龙", f: "m", w: ["沙龙", "法式沙龙", "欧式会客厅", "壁炉客厅"], u: "r-056b6801cdc8.webp" }, { n: "街角咖啡馆", f: "m", w: ["咖啡馆", "咖啡厅", "咖啡店", "露天咖啡座"], u: "l-1781016691949.webp" }, { n: "城中村巷道", f: "m", w: ["城中村", "握手楼", "城中村小巷"], u: "l-1782874355558.webp" }, { n: "城中村楼下", f: "m", w: ["城中村楼底", "老居民楼楼下", "居民楼下"], u: "l-20260701_105536.webp" }, { n: "出租屋", f: "m", w: ["城中村出租屋", "出租房", "小单间"], u: "l-20260628_035824.webp" }, { n: "凌乱出租屋", f: "m", w: ["杂乱出租屋", "脏乱房间"], u: "l-20260628_0426.webp" }, { n: "公共电梯", f: "m", w: ["写字楼电梯", "公寓电梯", "电梯里"], u: "l-20260701_131156.webp" }, { n: "公寓玄关", f: "m", w: ["公寓门厅", "入户玄关"], u: "l-20260702_00511.webp" }, { n: "面包车内", f: "m", w: ["面包车", "车后座", "旧车内"], u: "l-20260702_022548.webp" }, { n: "化妆间", f: "m", w: ["后台化妆间", "化妆室", "会所化妆间"], u: "l-20260702_02493.webp" }, { n: "KTV包厢", f: "m", w: ["包厢", "夜总会包厢", "卡拉OK"], u: "l-20260703_032340.webp" }, { n: "酒店套房卧室", f: "m", w: ["酒店房间", "酒店卧室", "豪华套房", "酒店大床房"], u: "l-20260703_111556.webp" }, { n: "酒店套房客厅", f: "m", w: ["套房客厅", "酒店客厅"], u: "l-20260703_112849.webp" }, { n: "中式茶馆", f: "m", w: ["茶馆", "茶楼", "茶舍"], u: "l-20260626_114618.webp" }, { n: "府邸前院", f: "a", w: ["古代府邸前院", "府衙前院", "宅院前院"], u: "l-1782151847239.webp" }, { n: "古风小院", f: "a", w: ["中式小院", "古代庭院", "四合院", "天井", "院子"], u: "l-20260620_032544.webp" }, { n: "闺阁廊下", f: "a", w: ["廊下", "闺房外廊", "檐廊"], u: "l-20260620_03397.webp" }, { n: "后花园", f: "a", w: ["古风花园", "园子", "花园", "庭院花园"], u: "l-20260620_03444.webp" }, { n: "府邸侧院", f: "a", w: ["侧院", "偏院", "月洞门小径"], u: "l-20260620_035422.webp" }, { n: "正堂", f: "a", w: ["厅堂", "堂屋", "大堂", "会客堂"], u: "l-20260621_205658.webp" }, { n: "马车内", f: "a", w: ["马车", "车厢", "马车车厢"], u: "l-20260623_003613.webp" }, { n: "假山", f: "a", w: ["后院假山", "太湖石", "府邸后院"], u: "l-20260623_091749.webp" }, { n: "府邸长廊", f: "a", w: ["长廊", "府中长廊", "曲廊", "游廊"], u: "l-20260623_10937.webp" }, { n: "花厅", f: "a", w: ["府邸花厅", "偏厅"], u: "l-20260623_14141.webp" }, { n: "竹林小径", f: "a", w: ["竹林", "竹径", "后园竹林"], u: "l-20260623_204611.webp" }, { n: "床帐内", f: "a", w: ["床榻", "床帐", "拔步床", "躺在床上"], u: "l-20260624_02341.webp" }, { n: "闺房", f: "a", w: ["古代闺房", "小姐闺房", "绣房", "女子闺阁"], u: "l-20260617_063614.webp" }, { n: "闺房2", f: "a", w: [], u: "l-20260617_063733.webp" }, { n: "闺房3", f: "a", w: [], u: "l-20260617_063822.webp" }, { n: "闺房4", f: "a", w: [], u: "l-20260617_063853.webp" }, { n: "古宅前庭", f: "a", w: ["古代前庭", "前庭", "宅子前庭"], u: "l-20260622_155715.webp" }, { n: "古宅前庭2", f: "a", w: [], u: "l-20260622_155839.webp" }], bgm: [{ id: "maou-acoustic27", n: "アコースティック27", c: "魔王魂", u: "maoudamashii-bgm_acoustic27.mp3", m: ["daily"], s: ["school", "street"], t: [], p: ["modern"] }, { id: "maou-acoustic07", n: "アコースティック07", c: "魔王魂", u: "maoudamashii-bgm_acoustic07.mp3", m: ["daily"], s: ["home"], t: ["dawn"], p: ["modern"] }, { id: "maou-acoustic38", n: "Avenue Cafe", c: "魔王魂", u: "maoudamashii-bgm_acoustic38.mp3", m: ["daily"], s: ["shop"], t: ["day"], p: ["modern"] }, { id: "maou-acoustic32", n: "向日葵が見る景色", c: "魔王魂", u: "maoudamashii-bgm_acoustic32.mp3", m: ["daily", "cheerful"], s: ["street", "nature"], t: ["dawn", "day"], p: ["modern"] }, { id: "maou-piano25", n: "Cookie Cookie", c: "魔王魂", u: "maoudamashii-bgm_piano25.mp3", m: ["cheerful", "daily"], s: ["home", "shop"], t: [], p: ["modern"] }, { id: "maou-acoustic20", n: "アコースティック20", c: "魔王魂", u: "maoudamashii-bgm_acoustic20.mp3", m: ["cheerful"], s: ["sea"], t: ["day"], p: ["modern"] }, { id: "maou-acoustic44", n: "Merry-go-round", c: "魔王魂", u: "maoudamashii-bgm_acoustic44.mp3", m: ["cheerful"], s: ["street", "festival"], t: [], p: ["modern", "magic"] }, { id: "maou-acoustic39", n: "アコースティック39", c: "魔王魂", u: "maoudamashii-bgm_acoustic39.mp3", m: ["sweet"], s: ["street"], t: ["night"], p: ["modern"] }, { id: "maou-acoustic42", n: "少女のロマンス", c: "魔王魂", u: "maoudamashii-bgm_acoustic42.mp3", m: ["sweet"], s: ["shop", "home"], t: ["day"], p: ["modern", "magic"] }, { id: "maou-acoustic29", n: "アコースティック29", c: "魔王魂", u: "maoudamashii-bgm_acoustic29.mp3", m: ["sweet", "calm"], s: ["shop", "sea"], t: ["dusk"], p: ["modern"] }, { id: "maou-piano_song_feels_happiness", n: "Feels happiness piano ver.", c: "魔王魂", u: "maoudamashii-bgm_piano_song_feels_happiness.mp3", m: ["sweet"], s: [], t: [], p: ["modern", "ancient", "magic"] }, { id: "maou-piano_song_milkeyway", n: "The Milkey way piano ver.", c: "魔王魂", u: "maoudamashii-bgm_piano_song_milkeyway.mp3", m: ["sweet", "calm"], s: [], t: ["night", "midnight"], p: ["modern", "ancient", "magic"] }, { id: "maou-piano27", n: "カクテル光線", c: "魔王魂", u: "maoudamashii-bgm_piano27.mp3", m: ["sweet", "daily"], s: ["bar"], t: ["night"], p: ["modern"] }, { id: "maou-acoustic52", n: "Last daily sound", c: "魔王魂", u: "maoudamashii-bgm_acoustic52.mp3", m: ["calm"], s: ["home"], t: ["night", "midnight"], p: ["modern"] }, { id: "maou-piano29", n: "end of the day", c: "魔王魂", u: "maoudamashii-bgm_piano29.mp3", m: ["calm"], s: ["nature"], t: ["dusk"], p: ["modern", "ancient", "magic"] }, { id: "maou-healing13", n: "帰路へ", c: "魔王魂", u: "maoudamashii-bgm_healing13.mp3", m: ["calm"], s: ["street"], t: ["dusk"], p: ["modern", "ancient", "magic"] }, { id: "maou-healing16", n: "いつもここから", c: "魔王魂", u: "maoudamashii-bgm_healing16.mp3", m: ["calm", "sweet"], s: [], t: ["dusk"], p: ["modern", "ancient", "magic"] }, { id: "maou-piano28", n: "once again…", c: "魔王魂", u: "maoudamashii-bgm_piano28.mp3", m: ["sad"], s: [], t: [], p: ["modern", "ancient", "magic"] }, { id: "maou-acoustic45", n: "海辺の音", c: "魔王魂", u: "maoudamashii-bgm_acoustic45.mp3", m: ["sad"], s: ["sea"], t: [], p: ["modern"] }, { id: "maou-piano31", n: "To tomorrow", c: "魔王魂", u: "maoudamashii-bgm_piano31.mp3", m: ["sad"], s: [], t: [], p: ["modern", "ancient", "magic"] }, { id: "maou-healing12", n: "雨のように", c: "魔王魂", u: "maoudamashii-bgm_healing12.mp3", m: ["sad"], s: [], t: [], p: ["modern", "ancient", "magic"] }, { id: "maou-acoustic25", n: "木漏れ日の午後", c: "魔王魂", u: "maoudamashii-bgm_acoustic25.mp3", m: ["sad", "calm"], s: ["school"], t: ["dusk"], p: ["modern", "magic"] }, { id: "maou-piano17", n: "ピアノ17", c: "魔王魂", u: "maoudamashii-bgm_piano17.mp3", m: ["tense"], s: [], t: [], p: ["modern"] }, { id: "maou-piano36", n: "宿命のシナリオ", c: "魔王魂", u: "maoudamashii-bgm_piano36.mp3", m: ["tense"], s: [], t: [], p: ["modern", "ancient", "magic"] }, { id: "maou-piano32", n: "脈動", c: "魔王魂", u: "maoudamashii-bgm_piano32.mp3", m: ["tense"], s: [], t: [], p: ["modern", "ancient", "magic"] }, { id: "maou-orchestra18", n: "堕とされた楽園", c: "魔王魂", u: "maoudamashii-bgm_orchestra18.mp3", m: ["tense"], s: [], t: [], p: ["modern", "magic"] }, { id: "maou-piano02", n: "ピアノ02", c: "魔王魂", u: "maoudamashii-bgm_piano02.mp3", m: ["tense", "sad"], s: [], t: [], p: ["modern", "ancient", "magic"] }, { id: "maou-acoustic24", n: "ミステリアス・ドール", c: "魔王魂", u: "maoudamashii-bgm_acoustic24.mp3", m: ["eerie"], s: [], t: [], p: ["modern", "magic"] }, { id: "maou-acoustic31", n: "Sky of a different world", c: "魔王魂", u: "maoudamashii-bgm_acoustic31.mp3", m: ["eerie", "sad"], s: [], t: [], p: ["modern", "magic"] }, { id: "maou-acoustic46", n: "ココロココロ", c: "魔王魂", u: "maoudamashii-bgm_acoustic46.mp3", m: ["eerie"], s: [], t: [], p: ["modern", "magic"] }, { id: "maou-orchestra24", n: "crisis", c: "魔王魂", u: "maoudamashii-bgm_orchestra24.mp3", m: ["battle"], s: [], t: [], p: ["modern", "magic"] }, { id: "maou-fantasy15", n: "駆け抜ける戦場の嵐", c: "魔王魂", u: "maoudamashii-bgm_fantasy15.mp3", m: ["battle"], s: [], t: [], p: ["modern", "magic"] }, { id: "maou-ethnic27", n: "和の輪", c: "魔王魂", u: "maoudamashii-bgm_ethnic27.mp3", m: ["daily", "cheerful"], s: ["village", "street"], t: [], p: ["ancient"] }, { id: "maou-ethnic09", n: "揺れる提灯", c: "魔王魂", u: "maoudamashii-bgm_ethnic09.mp3", m: ["cheerful"], s: ["festival"], t: ["night"], p: ["ancient", "modern"] }, { id: "maou-ethnic32", n: "初詣", c: "魔王魂", u: "maoudamashii-bgm_ethnic32.mp3", m: ["calm"], s: ["shrine"], t: [], p: ["ancient", "modern"] }, { id: "maou-fantasy02", n: "閃光", c: "魔王魂", u: "maoudamashii-bgm_fantasy02.mp3", m: ["battle"], s: [], t: [], p: ["ancient"] }, { id: "maou-ethnic33", n: "和bravery heart", c: "魔王魂", u: "maoudamashii-bgm_ethnic33.mp3", m: ["battle"], s: [], t: [], p: ["ancient"] }, { id: "maou-orchestra07", n: "オーケストラ07", c: "魔王魂", u: "maoudamashii-bgm_orchestra07.mp3", m: ["daily"], s: ["palace", "school"], t: [], p: ["magic"] }, { id: "maou-acoustic49", n: "悠久の地", c: "魔王魂", u: "maoudamashii-bgm_acoustic49.mp3", m: ["daily", "calm"], s: ["palace"], t: [], p: ["magic"] }, { id: "maou-acoustic40", n: "幻", c: "魔王魂", u: "maoudamashii-bgm_acoustic40.mp3", m: ["daily", "sweet"], s: ["palace"], t: [], p: ["magic"] }, { id: "maou-orchestra06", n: "オーケストラ06", c: "魔王魂", u: "maoudamashii-bgm_orchestra06.mp3", m: ["daily"], s: ["palace"], t: [], p: ["magic"] }, { id: "maou-orchestra23", n: "be proudly", c: "魔王魂", u: "maoudamashii-bgm_orchestra23.mp3", m: ["daily"], s: ["palace"], t: [], p: ["magic"] }, { id: "maou-fantasy01", n: "Vast world", c: "魔王魂", u: "maoudamashii-bgm_fantasy01.mp3", m: ["cheerful"], s: ["nature"], t: [], p: ["magic"] }, { id: "maou-fantasy14", n: "やすらぎの丘", c: "魔王魂", u: "maoudamashii-bgm_fantasy14.mp3", m: ["cheerful", "daily"], s: ["village"], t: [], p: ["magic"] }, { id: "maou-acoustic19", n: "アコースティック19", c: "魔王魂", u: "maoudamashii-bgm_acoustic19.mp3", m: ["sweet", "calm"], s: ["sea", "nature"], t: [], p: ["magic"] }, { id: "maou-acoustic23", n: "水の精のささやき", c: "魔王魂", u: "maoudamashii-bgm_acoustic23.mp3", m: ["calm"], s: ["nature"], t: [], p: ["magic"] }, { id: "maou-healing08", n: "ヒーリング08", c: "魔王魂", u: "maoudamashii-bgm_healing08.mp3", m: ["calm"], s: [], t: [], p: ["modern", "ancient", "magic"] }, { id: "maou-piano03", n: "ピアノ03", c: "魔王魂", u: "maoudamashii-bgm_piano03.mp3", m: ["calm"], s: ["nature"], t: [], p: ["magic"] }, { id: "maou-acoustic17", n: "アコースティック17", c: "魔王魂", u: "maoudamashii-bgm_acoustic17.mp3", m: ["tense", "eerie"], s: [], t: [], p: ["magic"] }, { id: "maou-acoustic33", n: "夕闇に沈む街", c: "魔王魂", u: "maoudamashii-bgm_acoustic33.mp3", m: ["eerie"], s: ["street"], t: ["dusk", "night"], p: ["magic"] }, { id: "maou-fantasy09", n: "闇に眠る場所", c: "魔王魂", u: "maoudamashii-bgm_fantasy09.mp3", m: ["eerie"], s: ["dungeon"], t: [], p: ["magic", "ancient"] }, { id: "maou-fantasy11", n: "bravery heart", c: "魔王魂", u: "maoudamashii-bgm_fantasy11.mp3", m: ["battle"], s: [], t: [], p: ["magic"] }, { id: "maou-fantasy05", n: "Peaceful Place", c: "魔王魂", u: "maoudamashii-bgm_fantasy05.mp3", m: ["daily", "cheerful"], s: ["street", "village"], t: ["day"], p: ["magic"] }, { id: "maou-fantasy10", n: "ひとときの休息", c: "魔王魂", u: "maoudamashii-bgm_fantasy10.mp3", m: ["daily", "calm"], s: ["village", "street", "home"], t: [], p: ["magic"] }, { id: "maou-ethnic10", n: "民族10", c: "魔王魂", u: "maoudamashii-bgm_ethnic10.mp3", m: ["cheerful", "daily"], s: ["street", "festival", "shop"], t: ["day"], p: ["magic"] }, { id: "maou-ethnic14", n: "街角のワンシーン", c: "魔王魂", u: "maoudamashii-bgm_ethnic14.mp3", m: ["daily", "cheerful"], s: ["street", "shop"], t: ["day"], p: ["magic", "modern"] }, { id: "maou-acoustic18", n: "アコースティック18", c: "魔王魂", u: "maoudamashii-bgm_acoustic18.mp3", m: ["daily", "cheerful"], s: ["nature", "village", "street"], t: ["day"], p: ["magic", "modern"] }, { id: "maou-acoustic16", n: "アコースティック16", c: "魔王魂", u: "maoudamashii-bgm_acoustic16.mp3", m: ["daily", "calm"], s: ["shop", "street"], t: [], p: ["magic", "modern"] }, { id: "maou-orchestra02", n: "オーケストラ02", c: "魔王魂", u: "maoudamashii-bgm_orchestra02.mp3", m: ["cheerful"], s: ["festival", "street"], t: [], p: ["magic"] }, { id: "maou-healing17", n: "人魚の目覚め", c: "魔王魂", u: "maoudamashii-bgm_healing17.mp3", m: ["calm"], s: ["sea", "nature"], t: [], p: ["modern", "ancient", "magic"] }, { id: "maou-acoustic50", n: "至福の隙間", c: "魔王魂", u: "maoudamashii-bgm_acoustic50.mp3", m: ["daily", "calm"], s: ["shop"], t: ["day"], p: ["modern"] }, { id: "maou-acoustic26", n: "海辺のラジオ", c: "魔王魂", u: "maoudamashii-bgm_acoustic26.mp3", m: ["daily"], s: ["shop", "sea", "home"], t: ["dawn", "day"], p: ["modern"] }, { id: "maou-acoustic13", n: "アコースティック13", c: "魔王魂", u: "maoudamashii-bgm_acoustic13.mp3", m: ["daily", "cheerful"], s: ["shop", "sea"], t: ["dawn", "day"], p: ["modern"] }, { id: "maou-piano18", n: "ピアノ18", c: "魔王魂", u: "maoudamashii-bgm_piano18.mp3", m: ["daily", "calm"], s: [], t: [], p: ["modern", "ancient", "magic"] }, { id: "maou-piano35", n: "見渡す街へ", c: "魔王魂", u: "maoudamashii-bgm_piano35.mp3", m: ["daily", "calm"], s: ["street", "village", "home"], t: ["dusk"], p: ["modern", "ancient", "magic"] }, { id: "maou-acoustic01", n: "アコースティック01", c: "魔王魂", u: "maoudamashii-bgm_acoustic01.mp3", m: ["daily"], s: ["shop", "street"], t: ["day"], p: ["modern"] }, { id: "maou-acoustic05", n: "爽やかサンデー魔王モーニング", c: "魔王魂", u: "maoudamashii-bgm_acoustic05.mp3", m: ["daily", "cheerful"], s: ["home", "school"], t: ["dawn"], p: ["modern"] }, { id: "maou-acoustic21", n: "アコースティック21", c: "魔王魂", u: "maoudamashii-bgm_acoustic21.mp3", m: ["daily", "cheerful"], s: ["home"], t: [], p: ["modern", "magic"] }, { id: "maou-acoustic06", n: "Satie", c: "魔王魂", u: "maoudamashii-bgm_acoustic06.mp3", m: ["daily", "calm"], s: ["shop", "sea"], t: [], p: ["modern", "magic"] }, { id: "oga-tozan-orient-peace-valley", n: "Orient Peace Valley", c: "Tozan", u: "oga-tozan-orient-peace-valley.ogg", m: ["daily"], s: ["nature", "village"], t: [], p: ["ancient"] }, { id: "oga-tozan-orient-tune-again", n: "Orient Tune Again", c: "Tozan", u: "oga-tozan-orient-tune-again.ogg", m: ["daily", "cheerful"], s: ["street", "village"], t: [], p: ["ancient"] }, { id: "oga-tozan-oriental-somber", n: "Oriental Somber", c: "Tozan", u: "oga-tozan-oriental-somber.ogg", m: ["sad", "calm"], s: [], t: [], p: ["ancient"] }, { id: "oga-hitctrl-jade-kings-throne", n: "Views From Atop the Jade Kings Throne", c: "Hitctrl", u: "oga-hitctrl-jade-kings-throne.mp3", m: ["daily", "tense"], s: ["palace"], t: [], p: ["ancient"] }, { id: "oga-hitctrl-misty-mountains", n: "RPG - Misty Mountains", c: "Hitctrl", u: "oga-hitctrl-misty-mountains.mp3", m: ["calm"], s: ["nature"], t: [], p: ["ancient", "magic"] }, { id: "oga-elerya-asian-duet", n: "Asian Duet", c: "elerya", u: "oga-elerya-asian-duet.mp3", m: ["daily", "calm"], s: ["home", "nature"], t: [], p: ["ancient"] }, { id: "oga-springspring-cold-to-lukewarm-mixia", n: "Cold to Lukewarm Mixia", c: "Spring Spring", u: "oga-springspring-cold-to-lukewarm-mixia.ogg", m: ["daily"], s: ["shop", "bar", "street"], t: [], p: ["ancient"] }, { id: "oga-springspring-generic-asian-arrangement", n: "Generic 2 Minute Asian Arrangement", c: "Spring Spring", u: "oga-springspring-generic-asian-arrangement.ogg", m: ["daily", "cheerful"], s: ["street", "village"], t: ["day"], p: ["ancient"] }, { id: "oga-springspring-kingdom-of-a-million-elephants", n: "Kingdom of a Million Elephants under a White Parasol", c: "Spring Spring", u: "oga-springspring-kingdom-of-a-million-elephants.ogg", m: ["daily", "calm"], s: ["palace", "nature"], t: [], p: ["ancient"] }, { id: "oga-springspring-asian-mystery", n: "Asian Mystery", c: "Spring Spring", u: "oga-springspring-asian-mystery.ogg", m: ["eerie", "tense"], s: [], t: ["night", "midnight"], p: ["ancient"] }, { id: "oga-elerya-liyan", n: "Liyan", c: "elerya", u: "oga-elerya-liyan.mp3", m: ["calm", "sweet"], s: [], t: [], p: ["ancient"] }] };

// lib/vocab.js
var EMOTIONS = {
  neutral: "平静",
  smile: "微笑",
  happy: "开心",
  laugh: "大笑",
  shy: "害羞",
  blush: "脸红",
  sad: "难过",
  cry: "哭泣",
  angry: "生气",
  pout: "赌气",
  surprised: "惊讶",
  scared: "害怕",
  worried: "担心",
  smug: "得意",
  serious: "认真",
  tired: "疲惫",
  love: "心动",
  confused: "困惑",
  thinking: "思考",
  determined: "坚定",
  cold: "冷淡",
  teasing: "调侃"
};
var DAYPART = { dawn: "day", morning: "day", noon: "day", afternoon: "day", dusk: "dusk", evening: "night", night: "night", midnight: "night" };
var daypart = (time) => DAYPART[time] || "day";
var placeKey = (scene) => `${String(scene?.location || "").trim() || "未知地点"}|${daypart(scene?.time)}`;

// src/client/theater/playback.js
var EMOTION_LABEL = EMOTIONS;
var TIME_LABEL = { dawn: "黎明", morning: "清晨", noon: "正午", afternoon: "午后", dusk: "黄昏", evening: "傍晚", night: "夜", midnight: "深夜" };
var WEATHER_LABEL = { clear: "晴", rain: "雨", storm: "暴雨", snow: "雪", sakura: "樱吹雪", leaves: "落叶", fireflies: "萤火", fog: "雾", embers: "余烬", dust: "浮尘", bokeh: "光斑", stars: "星空" };
var MOOD_LABEL = { daily: "日常", cheerful: "轻快", sweet: "甜蜜", calm: "静谧", sad: "感伤", tense: "紧张", battle: "激战", eerie: "诡异", silence: "寂静" };
var CARD_LABEL = { sms: "短信", letter: "信", note: "便条", news: "报纸", terminal: "终端", notice: "告示", diary: "日记", scroll: "卷轴" };
var POS_LABEL = { farleft: "最左", left: "左", center: "中", right: "右", farright: "最右" };
var CAMERA_LABEL = { shake: "震动", zoom: "推近", zoomout: "拉远", flash: "闪白", pan: "平移", blur: "虚焦", fadeblack: "黑场", redflash: "红闪", tilt: "倾斜" };
var SYMBOL_LABEL = { heart: "爱心", anger: "怒筋", sweat: "汗滴", sparkle: "闪光", surprise: "惊叹", gloom: "阴云", note: "音符", zzz: "睡着", bulb: "灵光", heartbreak: "心碎", sigh: "叹气", dizzy: "眩晕", fire: "燃起", blush: "红晕", bloom: "开花", silence: "无语" };
var TRANSITION_LABEL = { dissolve: "溶解", cinematic: "电影黑边", wipe: "横扫", iris: "圆形收缩", strips: "百叶", black: "黑场", flash: "白闪", none: "直接切" };
var POS_X = { farleft: 14, left: 28, center: 50, right: 72, farright: 86 };
var EMPTY_SCENE = { location: "", time: "afternoon", weather: "clear", mood: "daily", transition: "dissolve", bg: "" };
function imageReady(img) {
  return img && img.current >= 0 && img.versions && img.versions[img.current];
}
function buildBeats(view) {
  const beats = [];
  if (!view) return { beats, byKey: /* @__PURE__ */ new Map() };
  let scene = EMPTY_SCENE;
  let cast = [];
  const emotions = {};
  const turns = view.turns || [];
  const images = view.images || [];
  turns.forEach((t, ti) => {
    const script = t.script;
    const prevKey = placeKey(scene);
    if (script) {
      scene = { ...EMPTY_SCENE, ...script.scene };
      cast = script.cast || [];
    }
    const changed = beats.length === 0 || placeKey(scene) !== prevKey;
    const units = t.units || [];
    const unitIndex = new Map(units.map((u, i) => [u.id, i]));
    const turnImages = images.filter((img) => img.turn === t.turn && img.textVersion === t.textVersion).map((img) => ({ img, at: unitIndex.has(img.after) ? unitIndex.get(img.after) : units.length - 1 })).sort((a, b) => a.at - b.at);
    let lastSpeaker = "";
    units.forEach((unit, ui2) => {
      const line = script && script.lines && script.lines[unit.id] || {};
      let speaker = "";
      if (unit.type === "dialogue") {
        speaker = line.sp || unit.hint || lastSpeaker;
        lastSpeaker = speaker;
      } else if (unit.type === "thought") speaker = line.sp || "我";
      else if (line.sp) speaker = line.sp;
      if (speaker && line.emo) emotions[speaker] = line.emo;
      const cgEntry = [...turnImages].reverse().find((e) => e.at <= ui2);
      const cg = cgEntry ? cgEntry.img : null;
      beats.push({
        key: `${t.turn}:${unit.id}`,
        turn: t.turn,
        textVersion: t.textVersion,
        unitId: unit.id,
        type: unit.type,
        text: unit.text,
        speaker,
        alias: line.as || "",
        emo: line.emo || "",
        sym: line.sym || "",
        cam: line.cam || "",
        card: line.card || "",
        scene,
        sceneEnter: ui2 === 0 && changed,
        transition: ui2 === 0 && changed ? scene.transition || "dissolve" : "none",
        cast,
        emotions: { ...emotions },
        cg,
        cgAnchor: Boolean(cgEntry && cgEntry.at === ui2),
        status: t.status,
        error: t.error,
        lastOfTurn: ui2 === units.length - 1,
        lastTurn: ti === turns.length - 1,
        choices: ti === turns.length - 1 && ui2 === units.length - 1 && script ? script.choices || [] : []
      });
    });
  });
  return { beats, byKey: new Map(beats.map((b, i) => [b.key, i])) };
}
function actorX(pos) {
  return POS_X[pos] ?? 50;
}
function cgSrc(img, assetUrl2) {
  return imageReady(img) ? assetUrl2(img.versions[img.current].assetId) : "";
}
var IGS_TIME = { day: "白天", dusk: "白天", night: "夜晚" };
function igsBackground(scene, base) {
  const location2 = String(scene?.location || "").trim();
  if (!location2 || !base) return "";
  let best = null;
  let bestScore = 0;
  for (const bg of igs_packs_default.backgrounds) {
    const names = [bg.n, ...bg.w || []];
    for (const name2 of names) {
      let score = 0;
      if (location2 === name2) score = 100;
      else if (location2.includes(name2)) score = 40 + name2.length;
      else if (name2.includes(location2) && location2.length >= 2) score = 20 + location2.length;
      if (score > bestScore) {
        bestScore = score;
        best = bg;
      }
    }
  }
  if (!best || bestScore < 22) return "";
  const part = daypart(scene.time);
  const timed = best.t && (scene.time === "midnight" ? best.t["深夜"] || best.t["夜晚"] : best.t[IGS_TIME[part]]);
  return base.replace(/\/?$/, "/") + "backgrounds/" + (timed || best.u);
}
var SCENE_HINTS = [
  ["school", /学|教室|校|社团|天台|操场|图书/],
  ["home", /家|卧|客厅|厨房|房间|公寓|玄关|浴室|闺/],
  ["shop", /店|咖啡|面馆|商场|超市|餐/],
  ["street", /街|巷|路|车站|广场|城/],
  ["nature", /林|山|花园|公园|竹|田|湖|河/],
  ["sea", /海|沙滩|港|岸/],
  ["festival", /祭|庙会|烟火|游乐/],
  ["bar", /酒吧|KTV|夜店|酒馆/],
  ["shrine", /神社|寺|庙|观/],
  ["palace", /宫|殿|府|堂|王/],
  ["dungeon", /地牢|洞|迷宫|遗迹/]
];
function pickBgm(scene, base, avoid = "") {
  if (!base) return null;
  const mood = scene?.mood || "daily";
  if (mood === "silence") return null;
  const want = mood === "sweet" ? ["sweet", "calm"] : [mood];
  const loc = String(scene?.location || "");
  const tag = (SCENE_HINTS.find(([, re]) => re.test(loc)) || [])[0];
  let pool = igs_packs_default.bgm.filter((t) => t.m.some((m) => want.includes(m)));
  if (!pool.length) pool = igs_packs_default.bgm.filter((t) => t.m.includes("daily"));
  const scored = pool.map((t) => ({ t, s: (tag && t.s.includes(tag) ? 3 : 0) + (t.p && t.p.includes("modern") ? 1 : 0) + (t.id === avoid ? -10 : 0) }));
  const top = Math.max(...scored.map((x) => x.s));
  const best = scored.filter((x) => x.s === top);
  let h = 0;
  for (const ch of loc + mood) h = h * 33 + ch.codePointAt(0) >>> 0;
  const track = best[h % best.length].t;
  return { id: track.id, name: track.n, credit: track.c, url: base.replace(/\/?$/, "/") + "bgm/" + track.u };
}
var SKY = {
  dawn: ["#2a2350", "#9a5c8f", "#f6a58f", "rgba(255, 190, 170, .7)", "70%", "62%"],
  morning: ["#5aa6e8", "#a9d3f5", "#f4f1e2", "rgba(255, 250, 220, .6)", "78%", "20%"],
  noon: ["#3e8fe0", "#8cc5f2", "#dff0ff", "rgba(255, 255, 240, .55)", "60%", "12%"],
  afternoon: ["#4c8fd6", "#a7c9ec", "#fbe3c0", "rgba(255, 230, 190, .6)", "75%", "30%"],
  dusk: ["#2b1d4f", "#b14f6e", "#ffb067", "rgba(255, 170, 100, .85)", "72%", "64%"],
  evening: ["#1b1740", "#4f2f78", "#e17a8d", "rgba(255, 140, 160, .5)", "20%", "70%"],
  night: ["#05081c", "#121a44", "#2a2d6a", "rgba(200, 210, 255, .35)", "78%", "18%"],
  midnight: ["#020410", "#070b24", "#141842", "rgba(170, 180, 255, .25)", "80%", "14%"]
};

// src/client/theater/Stage.jsx
var import_react3 = __toESM(require("react"), 1);

// ../app/src/visual/igs-ui/fx-symbols.js
function strokeGlyph(d, width, cls = "") {
  return `<g class="igs-fx-g ${cls}" fill="none" stroke-linecap="round" stroke-linejoin="round"><path class="igs-fx-rim" d="${d}" stroke-width="${width + 11}"/><path class="igs-fx-ink" d="${d}" stroke-width="${width + 5}"/><path class="igs-fx-line" d="${d}" stroke-width="${width}"/></g>`;
}
function fillShape(d, cls = "", extra = "", x = 0, y = 0, scale = 1) {
  const k = 1 / Math.max(0.5, scale);
  const body = `<g class="igs-fx-g igs-fx-solid ${cls}" stroke-linejoin="round"><path class="igs-fx-rim" d="${d}" stroke-width="${(12 * k).toFixed(1)}"/><path class="igs-fx-fill" d="${d}" stroke-width="${(4.5 * k).toFixed(1)}"/>` + extra + "</g>";
  return scale !== 1 || x || y ? `<g transform="translate(${x} ${y}) scale(${scale})">${body}</g>` : body;
}
var polar = (deg, r) => {
  const a = deg * Math.PI / 180;
  return `${(50 + Math.cos(a) * r).toFixed(1)} ${(50 + Math.sin(a) * r).toFixed(1)}`;
};
function rays(radius, angles) {
  const d = angles.map((deg, i) => `M${polar(deg, radius)}L${polar(deg, radius + (i % 2 ? 7 : 11))}`).join("");
  return `<path class="igs-fx-burst" d="${d}" fill="none" stroke-width="4" stroke-linecap="round"/>`;
}
function burst(radius, count, from = -90) {
  return rays(radius, Array.from({ length: count }, (_, i) => from + 360 / count * i));
}
var HEART = "M50 86C22 66 9 49 9 33C9 19 19 10 31 10C40 10 46 15 50 22C54 15 60 10 69 10C81 10 91 19 91 33C91 49 78 66 50 86Z";
var HEART_L = "M50 86C22 66 9 49 9 33C9 19 19 10 31 10C40 10 46 15 50 22L44 38L54 52L44 66Z";
var HEART_R = "M50 22C54 15 60 10 69 10C81 10 91 19 91 33C91 49 78 66 50 86L44 66L54 52L44 38Z";
var DROP = "M50 8C50 8 78 44 78 62A28 28 0 0 1 22 62C22 44 50 8 50 8Z";
var STAR = "M50 6Q55 45 94 50Q55 55 50 94Q45 55 6 50Q45 45 50 6Z";
var BULB = "M50 8C31 8 18 22 18 40C18 52 25 60 31 66C35 70 36 73 36 76H64C64 73 65 70 69 66C75 60 82 52 82 40C82 22 69 8 50 8Z";
var BULB_BASE = "M36 79H64V86Q64 93 57 93H43Q36 93 36 86Z";
var FLAME = "M50 4C57 22 76 30 80 52C84 76 68 94 50 94C32 94 16 80 18 58C19 46 26 37 33 31C33 41 37 48 43 51C39 34 43 18 50 4Z";
var FLAME_IN = "M50 46C55 57 65 62 65 75C65 86 58 92 50 92C42 92 35 86 35 77C35 69 41 64 44 56C46 62 48 65 51 65C49 58 48 52 50 46Z";
var PUFF = "M30 70C16 70 10 60 14 51C8 42 16 30 28 33C30 22 44 17 53 25C60 16 76 20 77 33C88 34 93 46 86 55C92 64 84 74 72 71C66 79 50 79 44 72C40 74 34 73 30 70Z";
var SPIRAL = "M50 50a6 6 0 0 1 12 0a12 12 0 0 1 -24 0a18 18 0 0 1 36 0a24 24 0 0 1 -48 0a30 30 0 0 1 60 0";
var noteHead = (cx, cy) => `M${cx - 12} ${cy}a12 9 -20 1 1 24 0a12 9 -20 1 1 -24 0Z`;
var NOTE_PAIR = `${noteHead(34, 76)}${noteHead(74, 64)}M41 28H46V75H41ZM81 16H86V63H81ZM41 22L86 10V21L41 33Z`;
var NOTE = `${noteHead(40, 80)}M47 20H53V79H47ZM53 20Q74 28 72 50Q66 36 53 36Z`;
var circle = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 1 ${2 * r} 0a${r} ${r} 0 1 1 ${-2 * r} 0Z`;
var zee = (x, y, s) => `M${x} ${y}h${s}l${-s} ${s}h${s}`;
var SNOWFLAKE = [-90, -30, 30, 90, 150, 210].map((deg) => `M50 50L${polar(deg, 40)}M${polar(deg - 22, 32)}L${polar(deg, 24)}L${polar(deg + 22, 32)}`).join("");
var shine = (cx, cy, rx, ry, rot = -30) => `<ellipse class="igs-fx-hi" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})"/>`;
function wavyLine(x, y0, halves, amp, cls) {
  let d = `M${x} ${y0}`;
  d += `q${amp} 6 0 12`;
  for (let i = 1; i < halves; i += 1) d += "t0 12";
  return `<g class="igs-fx-g igs-fx-wave ${cls}" fill="none" stroke-linecap="round"><path class="igs-fx-rim" d="${d}" stroke-width="10" pathLength="1"/><path class="igs-fx-ink" d="${d}" stroke-width="4.5" pathLength="1"/></g>`;
}
var FLOWER = [-90, -18, 54, 126, 198].map((deg) => {
  const [x, y] = polar(deg, 20).split(" ").map(Number);
  return circle(x, y, 15);
}).join("");
var flowerCore = '<circle class="igs-fx-bloom-core" cx="50" cy="50" r="10" stroke-width="4"/>';
var BUBBLE_SPEECH = "M14 14H86Q96 14 96 24V58Q96 68 86 68H40L26 84L30 68H14Q4 68 4 58V24Q4 14 14 14Z";
var BLUSH = (x) => `M${x} 50a18 11 0 1 1 36 0a18 11 0 1 1 -36 0Z`;
var zigzag = (x, y, n, w = 8) => `M${x} ${y}` + Array.from({ length: n }, (_, i) => `l${w} ${i % 2 ? 8 : -8}`).join("");
var BODIES = Object.freeze({
  anger: burst(44, 8, -67.5) + strokeGlyph("M42 12Q40 40 12 42M58 12Q60 40 88 42M42 88Q40 60 12 58M58 88Q60 60 88 58", 10, "igs-fx-vein") + '<path class="igs-fx-hi-line" d="M40 20Q39 30 34 35M60 20Q61 30 66 35" fill="none" stroke-width="3" stroke-linecap="round"/>',
  sweat: fillShape(DROP, "igs-fx-drop-a", shine(40, 58, 5, 10, 20)) + fillShape(DROP, "igs-fx-drop-b", shine(40, 58, 6, 11, 20), 66, 44, 0.42),
  heart: fillShape(HEART, "igs-fx-heart-main", shine(30, 30, 8, 5, -35), 4, 14, 0.8) + fillShape(HEART, "igs-fx-heart-b", shine(30, 30, 9, 6, -35), 68, 2, 0.3) + fillShape(HEART, "igs-fx-heart-c", shine(30, 30, 9, 6, -35), 80, 34, 0.22),
  surprise: burst(46, 10, -90) + strokeGlyph("M26 16L28 56M27 80l0 .1", 13, "igs-fx-bang") + strokeGlyph("M50 30Q50 14 67 14Q86 14 86 31Q86 43 73 48Q66 51 66 60M66 80l0 .1", 11, "igs-fx-ques"),
  silence: '<g class="igs-fx-g igs-fx-solid igs-fx-bubble" stroke-linejoin="round"><path class="igs-fx-rim" d="M16 22H84Q94 22 94 32V60Q94 70 84 70H40L24 84L28 70H16Q6 70 6 60V32Q6 22 16 22Z" stroke-width="10"/><path class="igs-fx-paper" d="M16 22H84Q94 22 94 32V60Q94 70 84 70H40L24 84L28 70H16Q6 70 6 60V32Q6 22 16 22Z" stroke-width="4"/></g><circle class="igs-fx-fill igs-fx-dot igs-fx-dot-1" cx="29" cy="46" r="7" stroke-width="3"/><circle class="igs-fx-fill igs-fx-dot igs-fx-dot-2" cx="50" cy="46" r="7" stroke-width="3"/><circle class="igs-fx-fill igs-fx-dot igs-fx-dot-3" cx="71" cy="46" r="7" stroke-width="3"/>',
  gloom: wavyLine(20, 4, 6, 7, "igs-fx-wave-1") + wavyLine(40, 2, 8, 7, "igs-fx-wave-2") + wavyLine(60, 4, 7, 7, "igs-fx-wave-3") + wavyLine(80, 8, 5, 7, "igs-fx-wave-4"),
  sparkle: burst(46, 8, -90) + fillShape(STAR, "igs-fx-star-main", '<circle class="igs-fx-hi" cx="50" cy="50" r="5"/>', 8, 12, 0.72) + fillShape(STAR, "igs-fx-star-b", "", 66, 2, 0.3) + fillShape(STAR, "igs-fx-star-c", "", 72, 62, 0.24),
  bulb: rays(44, [-90, -130, -50, -170, -10]) + '<g class="igs-fx-g igs-fx-bulb">' + fillShape(BULB, "igs-fx-bulb-glass", shine(33, 30, 6, 11, 30) + '<path class="igs-fx-filament" d="M42 64V52L50 58L58 52V64" fill="none" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>') + fillShape(BULB_BASE, "igs-fx-bulb-base", '<path class="igs-fx-filament" d="M40 86H60" fill="none" stroke-width="3" stroke-linecap="round"/>') + "</g>",
  note: fillShape(NOTE_PAIR, "igs-fx-note-main", shine(30, 73, 5, 3, -20)) + fillShape(NOTE, "igs-fx-note-b", "", 2, 0, 0.34),
  zzz: strokeGlyph(zee(10, 66, 18), 6, "igs-fx-z-1") + strokeGlyph(zee(34, 40, 24), 7, "igs-fx-z-2") + strokeGlyph(zee(62, 8, 30), 8, "igs-fx-z-3"),
  heartbreak: fillShape(HEART_L, "igs-fx-break-l", shine(28, 30, 8, 5, -35)) + fillShape(HEART_R, "igs-fx-break-r"),
  sigh: fillShape(PUFF, "igs-fx-puff", shine(40, 38, 9, 5, -15)) + fillShape(circle(12, 84, 6), "igs-fx-puff-b") + fillShape(circle(2, 96, 3.5), "igs-fx-puff-c"),
  dizzy: strokeGlyph(SPIRAL, 3.5, "igs-fx-spiral") + '<g class="igs-fx-orbit">' + fillShape(STAR, "", "", 74, 2, 0.24) + fillShape(STAR, "", "", 4, 72, 0.2) + "</g>",
  fire: fillShape(FLAME, "igs-fx-flame", `<path class="igs-fx-flame-in" d="${FLAME_IN}"/>`),
  frost: burst(46, 6, -60) + strokeGlyph(SNOWFLAKE, 4, "igs-fx-crystal") + fillShape(DROP, "igs-fx-drop-b", shine(40, 58, 6, 11, 20), 70, 58, 0.34),
  // 进食分镜用的符号（也可被情绪词单独触发）：口水、啊呜、嚼嚼、咕咚、小花、红晕、喷火、哈气、皱巴线、啊～气泡、满足、咕嘟气泡。
  drool: strokeGlyph("M44 6Q46 22 50 32", 4, "igs-fx-drool-line") + fillShape(DROP, "igs-fx-drool", shine(40, 58, 6, 11, 20), 22, 28, 0.56),
  chomp: burst(46, 8, -67.5) + strokeGlyph("M16 34L28 48L40 34L52 48L64 34L76 48L84 38", 6, "igs-fx-jaw-top") + strokeGlyph("M16 72L28 58L40 72L52 58L64 72L76 58L84 68", 6, "igs-fx-jaw-bottom"),
  munch: strokeGlyph("M26 22Q46 50 26 78", 6, "igs-fx-munch-a") + strokeGlyph("M50 32Q62 50 50 68", 6, "igs-fx-munch-b") + fillShape(circle(78, 38, 6), "igs-fx-crumb-a") + fillShape(circle(84, 62, 4.5), "igs-fx-crumb-b"),
  gulp: strokeGlyph("M50 8q-10 9 0 18t0 18t0 18", 6, "igs-fx-gulp") + strokeGlyph("M36 66L50 84L64 66", 7, "igs-fx-gulp"),
  bloom: fillShape(FLOWER, "igs-fx-bloom-main", flowerCore + shine(38, 32, 6, 4, -35), 8, 8, 0.78) + fillShape(FLOWER, "igs-fx-bloom-b", flowerCore, 66, 0, 0.32) + fillShape(FLOWER, "igs-fx-bloom-c", flowerCore, 74, 64, 0.26),
  blush: fillShape(BLUSH(4), "igs-fx-blush", '<path class="igs-fx-hi-line" d="M12 56L18 44M21 56L27 44M30 56L36 44" fill="none" stroke-width="3" stroke-linecap="round"/>') + fillShape(BLUSH(60), "igs-fx-blush", '<path class="igs-fx-hi-line" d="M68 56L74 44M77 56L83 44M86 56L92 44" fill="none" stroke-width="3" stroke-linecap="round"/>'),
  spicy: rays(44, [-40, -15, 15, 40]) + `<g transform="rotate(90 50 50)">${fillShape(FLAME, "igs-fx-spicy-flame", `<path class="igs-fx-flame-in" d="${FLAME_IN}"/>`)}</g>`,
  steam: strokeGlyph("M26 88q-9-10 0-20t0-20t0-20", 5, "igs-fx-steam-a") + strokeGlyph("M50 92q-9-10 0-20t0-20t0-20t0-20", 5, "igs-fx-steam-b") + strokeGlyph("M74 86q-9-10 0-20t0-20", 5, "igs-fx-steam-c"),
  sour: strokeGlyph(zigzag(6, 26, 4), 4.5, "igs-fx-sour-a") + strokeGlyph(zigzag(60, 18, 4), 4.5, "igs-fx-sour-b") + strokeGlyph(zigzag(30, 82, 5), 4.5, "igs-fx-sour-c"),
  aah: `<g class="igs-fx-g igs-fx-solid igs-fx-bubble igs-fx-aah" stroke-linejoin="round"><path class="igs-fx-rim" d="${BUBBLE_SPEECH}" stroke-width="10"/><path class="igs-fx-paper" d="${BUBBLE_SPEECH}" stroke-width="4"/><text class="igs-fx-aah-text" x="50" y="53" text-anchor="middle" font-size="32" font-weight="900">啊～</text></g>` + fillShape(HEART, "igs-fx-heart-b", "", 72, 64, 0.3),
  full: fillShape(PUFF, "igs-fx-puff", shine(40, 38, 9, 5, -15)) + fillShape(HEART, "igs-fx-heart-b", "", 70, 0, 0.26) + fillShape(circle(12, 84, 6), "igs-fx-puff-b"),
  bubbles: fillShape(circle(36, 72, 15), "igs-fx-bub-a", shine(30, 66, 5, 3, -30)) + fillShape(circle(64, 44, 11), "igs-fx-bub-b", shine(60, 40, 4, 2.5, -30)) + fillShape(circle(44, 16, 7), "igs-fx-bub-c")
});
var svgOf = (body) => `<svg class="igs-fx-svg" viewBox="-12 -12 124 124" aria-hidden="true" focusable="false">${body}</svg>`;
var MANGA_SYMBOL_SVG = Object.freeze(Object.fromEntries(Object.entries(BODIES).map(([kind, body]) => [kind, svgOf(body)])));
var LAMP_BOWL = "M12 66H88Q84 88 50 90Q16 88 12 66ZM40 90H60L64 96H36Z";
var LAMP_FLAME = "M50 14C58 30 66 38 66 50A16 16 0 0 1 34 50C34 38 42 30 50 14Z";
var LAMP_FLAME_IN = "M50 34C54 42 58 46 58 52A8 8 0 0 1 42 52C42 46 46 42 50 34Z";
var ANCIENT_BODIES = Object.freeze({
  bulb: rays(44, [-90, -130, -50, -165, -15]) + '<g class="igs-fx-g igs-fx-lamp">' + fillShape(LAMP_FLAME, "igs-fx-lamp-flame", `<path class="igs-fx-flame-in" d="${LAMP_FLAME_IN}"/>`) + fillShape(LAMP_BOWL, "igs-fx-lamp-bowl", shine(30, 73, 7, 2.5, 0)) + "</g>",
  note: strokeGlyph("M8 72C24 40 38 40 50 56S74 74 92 36", 5, "igs-fx-inkwave") + fillShape(circle(22, 38, 7), "igs-fx-inkdot-1") + fillShape(circle(56, 28, 5.5), "igs-fx-inkdot-2") + fillShape(circle(82, 60, 6.5), "igs-fx-inkdot-3"),
  zzz: fillShape(circle(46, 48, 34), "igs-fx-snot", shine(32, 32, 9, 5, -35)) + fillShape(circle(86, 84, 7), "igs-fx-snot-b")
});
var ANCIENT_SYMBOL_SVG = Object.freeze(Object.fromEntries(Object.entries(ANCIENT_BODIES).map(([kind, body]) => [kind, svgOf(body)])));
var ANCIENT_SYMBOL_PLACEMENT = Object.freeze({ zzz: "snot" });

// src/client/theater/particles.js
var import_react2 = __toESM(require("react"), 1);
var COUNTS = { rain: 220, storm: 380, snow: 140, sakura: 70, leaves: 40, fireflies: 46, embers: 90, dust: 60, bokeh: 26, stars: 160, fog: 6 };
var rand = (a, b) => a + Math.random() * (b - a);
function spawn(kind, w, h, initial) {
  const p = { x: rand(0, w), y: initial ? rand(0, h) : rand(-h * 0.2, -10), life: 0 };
  switch (kind) {
    case "rain":
    case "storm":
      return { ...p, vx: kind === "storm" ? -7 : -2.4, vy: rand(16, 26) * (kind === "storm" ? 1.25 : 1), len: rand(12, 26), a: rand(0.18, 0.45) };
    case "snow":
      return { ...p, vx: rand(-0.4, 0.4), vy: rand(0.5, 1.6), r: rand(1, 3.6), a: rand(0.5, 0.95), ph: rand(0, 6.28) };
    case "sakura":
    case "leaves":
      return { ...p, x: rand(-w * 0.2, w), vx: rand(0.6, 1.8), vy: rand(0.7, 1.7), r: rand(5, 10) * (kind === "leaves" ? 1.3 : 1), rot: rand(0, 6.28), vr: rand(-0.05, 0.05), ph: rand(0, 6.28), hue: kind === "leaves" ? rand(18, 44) : rand(330, 352) };
    case "fireflies":
      return { ...p, y: initial ? rand(h * 0.3, h) : rand(h * 0.4, h), vx: rand(-0.3, 0.3), vy: rand(-0.3, 0.2), r: rand(1.2, 2.6), ph: rand(0, 6.28) };
    case "embers":
      return { ...p, y: initial ? rand(0, h) : h + 10, vx: rand(-0.4, 0.6), vy: -rand(0.6, 2.2), r: rand(0.8, 2.2), ph: rand(0, 6.28) };
    case "dust":
      return { ...p, y: rand(0, h), vx: rand(-0.15, 0.15), vy: rand(-0.12, 0.12), r: rand(0.6, 1.6), ph: rand(0, 6.28) };
    case "bokeh":
      return { ...p, y: rand(0, h), vx: rand(-0.12, 0.12), vy: rand(-0.18, -0.04), r: rand(14, 46), hue: rand(0, 360), ph: rand(0, 6.28) };
    case "stars":
      return { ...p, y: rand(0, h * 0.65), r: rand(0.4, 1.5), ph: rand(0, 6.28), sp: rand(0.01, 0.05) };
    case "fog":
      return { ...p, y: rand(h * 0.35, h * 0.9), vx: rand(0.15, 0.4), r: rand(w * 0.25, w * 0.45), a: rand(0.06, 0.13) };
    default:
      return p;
  }
}
function step(kind, p, w, h, t, ctx2) {
  switch (kind) {
    case "rain":
    case "storm": {
      p.x += p.vx;
      p.y += p.vy;
      ctx2.strokeStyle = `rgba(200, 220, 255, ${p.a})`;
      ctx2.lineWidth = 1;
      ctx2.beginPath();
      ctx2.moveTo(p.x, p.y);
      ctx2.lineTo(p.x + p.vx * 1.6, p.y - p.len);
      ctx2.stroke();
      return p.y < h + 30;
    }
    case "snow": {
      p.ph += 0.02;
      p.x += p.vx + Math.sin(p.ph) * 0.4;
      p.y += p.vy;
      ctx2.fillStyle = `rgba(255, 255, 255, ${p.a})`;
      ctx2.beginPath();
      ctx2.arc(p.x, p.y, p.r, 0, 6.283);
      ctx2.fill();
      return p.y < h + 10;
    }
    case "sakura":
    case "leaves": {
      p.ph += 0.03;
      p.rot += p.vr;
      p.x += p.vx + Math.sin(p.ph) * 0.8;
      p.y += p.vy;
      ctx2.save();
      ctx2.translate(p.x, p.y);
      ctx2.rotate(p.rot);
      ctx2.scale(1, Math.abs(Math.sin(p.ph)) * 0.6 + 0.4);
      ctx2.fillStyle = kind === "leaves" ? `hsla(${p.hue}, 75%, 48%, .85)` : `hsla(${p.hue}, 90%, 86%, .9)`;
      ctx2.beginPath();
      ctx2.moveTo(0, -p.r);
      ctx2.bezierCurveTo(p.r, -p.r * 0.6, p.r * 0.7, p.r * 0.6, 0, p.r);
      ctx2.bezierCurveTo(-p.r * 0.7, p.r * 0.6, -p.r, -p.r * 0.6, 0, -p.r);
      ctx2.fill();
      ctx2.restore();
      return p.y < h + 20 && p.x < w + 30;
    }
    case "fireflies": {
      p.ph += 0.03;
      p.x += p.vx + Math.sin(p.ph * 0.7) * 0.3;
      p.y += p.vy + Math.cos(p.ph * 0.5) * 0.2;
      const a = 0.35 + Math.sin(p.ph * 2) * 0.35;
      const g = ctx2.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
      g.addColorStop(0, `rgba(230, 255, 150, ${a})`);
      g.addColorStop(1, "rgba(230, 255, 150, 0)");
      ctx2.fillStyle = g;
      ctx2.beginPath();
      ctx2.arc(p.x, p.y, p.r * 6, 0, 6.283);
      ctx2.fill();
      return p.x > -20 && p.x < w + 20 && p.y > -20 && p.y < h + 20;
    }
    case "embers": {
      p.ph += 0.05;
      p.x += p.vx + Math.sin(p.ph) * 0.5;
      p.y += p.vy;
      ctx2.fillStyle = `rgba(255, ${140 + Math.sin(p.ph) * 60}, 60, ${0.5 + Math.sin(p.ph * 1.7) * 0.4})`;
      ctx2.beginPath();
      ctx2.arc(p.x, p.y, p.r, 0, 6.283);
      ctx2.fill();
      return p.y > -10;
    }
    case "dust": {
      p.ph += 0.01;
      p.x += p.vx;
      p.y += p.vy;
      ctx2.fillStyle = `rgba(255, 245, 220, ${0.25 + Math.sin(p.ph * 3) * 0.2})`;
      ctx2.beginPath();
      ctx2.arc(p.x, p.y, p.r, 0, 6.283);
      ctx2.fill();
      return p.x > -10 && p.x < w + 10 && p.y > -10 && p.y < h + 10;
    }
    case "bokeh": {
      p.ph += 0.01;
      p.x += p.vx;
      p.y += p.vy;
      const g = ctx2.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      const a = 0.08 + Math.sin(p.ph) * 0.05;
      g.addColorStop(0, `hsla(${p.hue}, 90%, 75%, ${a + 0.06})`);
      g.addColorStop(0.7, `hsla(${p.hue}, 90%, 70%, ${a})`);
      g.addColorStop(1, `hsla(${p.hue}, 90%, 70%, 0)`);
      ctx2.fillStyle = g;
      ctx2.beginPath();
      ctx2.arc(p.x, p.y, p.r, 0, 6.283);
      ctx2.fill();
      return p.y > -p.r;
    }
    case "stars": {
      p.ph += p.sp;
      ctx2.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.abs(Math.sin(p.ph)) * 0.7})`;
      ctx2.beginPath();
      ctx2.arc(p.x, p.y, p.r, 0, 6.283);
      ctx2.fill();
      return true;
    }
    case "fog": {
      p.x += p.vx;
      const g = ctx2.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, `rgba(230, 235, 245, ${p.a})`);
      g.addColorStop(1, "rgba(230, 235, 245, 0)");
      ctx2.fillStyle = g;
      ctx2.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
      if (p.x - p.r > w) p.x = -p.r;
      return true;
    }
    default:
      return false;
  }
}
function Particles({ weather, enabled = true }) {
  const ref = import_react2.default.useRef(null);
  import_react2.default.useEffect(() => {
    const canvas = ref.current;
    const kind = weather;
    if (!canvas || !enabled || !COUNTS[kind]) return void 0;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return void 0;
    const ctx2 = canvas.getContext("2d");
    let w = 0, h = 0, raf = 0, flash = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx2.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = typeof ResizeObserver === "function" ? new ResizeObserver(resize) : null;
    ro && ro.observe(canvas);
    const target = Math.round(COUNTS[kind] * Math.min(1.4, Math.max(0.5, w / 1200)));
    let list = Array.from({ length: target }, () => spawn(kind, w, h, true));
    const frame = (t) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      ctx2.clearRect(0, 0, w, h);
      if (kind === "storm") {
        if (flash <= 0 && Math.random() < 4e-3) flash = 1;
        if (flash > 0) {
          ctx2.fillStyle = `rgba(220, 230, 255, ${flash * 0.35})`;
          ctx2.fillRect(0, 0, w, h);
          flash -= 0.06;
        }
      }
      const next = [];
      for (const p of list) if (step(kind, p, w, h, t, ctx2)) next.push(p);
      while (next.length < target) next.push(spawn(kind, w, h, false));
      list = next;
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro && ro.disconnect();
      ctx2.clearRect(0, 0, w, h);
    };
  }, [weather, enabled]);
  return import_react2.default.createElement("canvas", { ref, className: "igsd-particles", "aria-hidden": true });
}

// src/client/theater/Stage.jsx
var TRANSITION = {
  dissolve: ["igsd-dissolve", "1.1s"],
  cinematic: ["igsd-cinematic", "1.5s"],
  wipe: ["igsd-wipe", "1s"],
  iris: ["igsd-iris", "1.2s"],
  strips: ["igsd-wipe", ".8s"],
  black: ["igsd-black-in", "1.8s"],
  flash: ["igsd-flash-in", "1s"],
  none: ["none", "0s"]
};
function backgroundFor(scene, view, config) {
  const place = view && view.places && view.places[placeKey(scene)];
  if (place && place.assetId) return { src: assetUrl(place.assetId), from: "ai" };
  if (config && config.ui && config.ui.igsBackgrounds !== false) {
    const src = igsBackground(scene, config.ui.assetBase);
    if (src) return { src, from: "igs" };
  }
  return { src: "", from: "sky" };
}
function hashOf(text) {
  let h = 0;
  for (const ch of String(text)) h = h * 31 + ch.codePointAt(0) >>> 0;
  return h;
}
function Skyline({ seed, time }) {
  const h = hashOf(seed);
  const night = ["evening", "night", "midnight"].includes(time);
  const blocks = [];
  let x = 0;
  let i = 0;
  while (x < 1e3) {
    const w = 40 + (h >> i % 24 & 63) + i * 37 % 50;
    const top = 120 + h * (i + 3) % 150;
    blocks.push({ x, w, top });
    x += w + i * 13 % 8;
    i += 1;
  }
  const windows = [];
  if (night) {
    blocks.forEach((b, bi) => {
      for (let wy = b.top + 14; wy < 380; wy += 22) for (let wx = b.x + 8; wx < b.x + b.w - 10; wx += 16) {
        if ((wx * 7 + wy * 13 + bi * 31 + h) % 11 === 0) windows.push({ x: wx, y: wy });
      }
    });
  }
  return /* @__PURE__ */ import_react3.default.createElement("svg", { className: "igsd-skyline", viewBox: "0 0 1000 400", preserveAspectRatio: "none", "aria-hidden": "true" }, /* @__PURE__ */ import_react3.default.createElement("defs", null, /* @__PURE__ */ import_react3.default.createElement("linearGradient", { id: "igsd-skyline-g", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ import_react3.default.createElement("stop", { offset: "0", stopColor: night ? "#0b0f2a" : "#2a2440", stopOpacity: ".92" }), /* @__PURE__ */ import_react3.default.createElement("stop", { offset: "1", stopColor: "#05040c" }))), /* @__PURE__ */ import_react3.default.createElement("path", { d: `M0 400 L0 ${260 + h % 40} Q250 ${200 + h % 60} 500 ${250 + h % 30} T1000 ${230 + h % 50} L1000 400 Z`, fill: "#000", opacity: ".28" }), blocks.map((b, k) => /* @__PURE__ */ import_react3.default.createElement("rect", { key: k, x: b.x, y: b.top, width: b.w, height: 400 - b.top, fill: "url(#igsd-skyline-g)" })), windows.map((w, k) => /* @__PURE__ */ import_react3.default.createElement("rect", { key: "w" + k, x: w.x, y: w.y, width: "6", height: "9", fill: "#ffd98a", opacity: 0.5 + k % 5 * 0.1 })));
}
function Sky({ scene }) {
  const [top, mid, low, sun, sx, sy] = SKY[scene.time] || SKY.afternoon;
  return /* @__PURE__ */ import_react3.default.createElement("div", { className: "igsd-sky", style: { background: `linear-gradient(180deg, ${top} 0%, ${mid} 55%, ${low} 100%)`, "--sun": sun, "--sun-x": sx, "--sun-y": sy } }, /* @__PURE__ */ import_react3.default.createElement(Skyline, { seed: scene.location || "x", time: scene.time }));
}
function Backdrop({ scene, view, config, transition = "dissolve" }) {
  const bg = backgroundFor(scene, view, config);
  const id = bg.src || "sky:" + scene.time + ":" + scene.location;
  const [layers, setLayers] = import_react3.default.useState(() => [{ id, bg, scene, enter: false }]);
  import_react3.default.useEffect(() => {
    setLayers((list) => {
      if (list[list.length - 1].id === id) return list.map((l, i) => i === list.length - 1 ? { ...l, scene } : l);
      return [...list.slice(-1).map((l) => ({ ...l, leaving: true })), { id, bg, scene, enter: true, tr: transition }];
    });
  }, [id, scene.time]);
  import_react3.default.useEffect(() => {
    if (layers.length < 2) return void 0;
    const t = setTimeout(() => setLayers((list) => list.filter((l) => !l.leaving)), 1900);
    return () => clearTimeout(t);
  }, [layers]);
  return /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, layers.map((layer) => {
    const [anim, dur] = TRANSITION[layer.tr] || TRANSITION.dissolve;
    const cls = ["igsd-bg", layer.bg.src ? "is-image" : "", layer.enter && layer.tr !== "none" ? "is-enter" : "", layer.leaving ? "is-leave" : ""].join(" ");
    return /* @__PURE__ */ import_react3.default.createElement("div", { key: layer.id, className: cls, "data-tr": layer.tr, style: { "--enter-anim": anim, "--enter-dur": dur, backgroundImage: layer.bg.src ? `url("${layer.bg.src}")` : void 0 } }, !layer.bg.src && /* @__PURE__ */ import_react3.default.createElement(Sky, { scene: layer.scene }));
  }));
}
var SIL = {
  hairLong: "M100 22C58 22 36 54 36 98c0 46-4 92-14 150h156c-10-58-14-104-14-150 0-44-22-76-64-76z",
  hairShort: "M100 22C60 22 38 52 38 96c0 22 2 40 8 58h108c6-18 8-36 8-58 0-44-22-74-62-74z",
  body: "M100 150c-22 0-44 6-60 20-20 18-28 50-32 92L0 400h200l-8-138c-4-42-12-74-32-92-16-14-38-20-60-20z",
  bodyWide: "M100 148c-28 0-54 6-70 20-20 18-26 50-30 94l-6 138h212l-6-138c-4-44-10-76-30-94-16-14-42-20-70-20z",
  neck: "M86 120h28l2 44c-10 8-22 8-32 0z",
  face: "M100 52c-24 0-38 20-38 46 0 30 16 52 38 52s38-22 38-52c0-26-14-46-38-46z",
  bangs: "M60 100C56 56 76 36 100 36s44 20 40 64q-6-16-12-30-4 16-12 24-2-16-6-26-6 16-16 24 2-14-2-26-8 16-18 22 4-12 2-22-8 16-16 32z",
  lockL: "M58 98c-4 48-8 98-20 154l16 4c8-52 12-104 12-156z",
  lockR: "M142 98c4 48 8 98 20 154l-16 4c-8-52-12-104-12-156z",
  lockShortL: "M58 98c-2 22-4 38-10 56l14 2c4-18 6-36 6-56z",
  lockShortR: "M142 98c2 22 4 38 10 56l-14 2c-4-18-6-36-6-56z",
  tailR: "M146 70c30 6 44 52 36 112-4 30-14 52-24 62 4-34 4-70-2-104-4-26-8-48-10-70z",
  tailL: "M54 70c-30 6-44 52-36 112 4 30 14 52 24 62-4-34-4-70 2-104 4-26 8-48 10-70z",
  collar: "M80 172l20 26 20-26",
  rimLong: "M22 248c10-58 14-104 14-150 0-44 22-76 64-76s64 32 64 76c0 46 4 92 14 150",
  rimShort: "M46 154c-6-18-8-36-8-58 0-44 22-74 62-74s62 30 62 74c0 22-2 40-8 58"
};
var hairRe = (words) => new RegExp(`\\b(?:${words})\\b[a-z\\s-]{0,16}\\bhair\\b`);
var HAIR_COLORS = [
  [hairRe("silver|white|grey|gray|platinum"), "#d9dce8"],
  [hairRe("blonde|golden|yellow"), "#e6c56a"],
  [hairRe("brown|chestnut"), "#6a4530"],
  [hairRe("red|crimson"), "#b8323a"],
  [hairRe("pink"), "#f29ac0"],
  [hairRe("orange"), "#e8873a"],
  [hairRe("blue|aqua"), "#4a78d8"],
  [hairRe("purple|violet|lavender"), "#8a5fd0"],
  [hairRe("green"), "#43a070"],
  [hairRe("black|dark"), "#1b1628"]
];
function silhouetteStyle(appearance = "", gender = "") {
  const a = String(appearance).toLowerCase();
  const male = gender === "male" || /\b1boy\b|\bmale\b/.test(a);
  return {
    short: male || hairRe("short|very short").test(a) || /bob cut|pixie cut|buzz cut/.test(a),
    tails: /twintails|twin tails/.test(a) ? 2 : /ponytail/.test(a) ? 1 : 0,
    wide: male,
    hair: (HAIR_COLORS.find(([re]) => re.test(a)) || [, "#1b1628"])[1]
  };
}
function Silhouette({ name: name2, color, appearance, gender }) {
  const gid = "igsd-sil-" + hashOf(name2);
  const st = silhouetteStyle(appearance, gender);
  const hairPath = st.short ? SIL.hairShort : SIL.hairLong;
  const bodyPath = st.wide ? SIL.bodyWide : SIL.body;
  return /* @__PURE__ */ import_react3.default.createElement("div", { className: "igsd-silhouette", style: { "--c": color } }, /* @__PURE__ */ import_react3.default.createElement("svg", { viewBox: "0 0 200 400", "aria-hidden": "true" }, /* @__PURE__ */ import_react3.default.createElement("defs", null, /* @__PURE__ */ import_react3.default.createElement("linearGradient", { id: gid, x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ import_react3.default.createElement("stop", { offset: "0", stopColor: color, stopOpacity: ".95" }), /* @__PURE__ */ import_react3.default.createElement("stop", { offset: ".55", stopColor: color, stopOpacity: ".5" }), /* @__PURE__ */ import_react3.default.createElement("stop", { offset: "1", stopColor: color, stopOpacity: "0" })), /* @__PURE__ */ import_react3.default.createElement("linearGradient", { id: gid + "h", x1: "0", y1: "0", x2: "0", y2: "1" }, /* @__PURE__ */ import_react3.default.createElement("stop", { offset: "0", stopColor: st.hair, stopOpacity: ".95" }), /* @__PURE__ */ import_react3.default.createElement("stop", { offset: "1", stopColor: st.hair, stopOpacity: ".55" })), /* @__PURE__ */ import_react3.default.createElement("radialGradient", { id: gid + "f", cx: ".5", cy: ".42", r: ".62" }, /* @__PURE__ */ import_react3.default.createElement("stop", { offset: "0", stopColor: "#fff", stopOpacity: ".5" }), /* @__PURE__ */ import_react3.default.createElement("stop", { offset: "1", stopColor: "#fff", stopOpacity: ".06" }))), st.tails > 0 && /* @__PURE__ */ import_react3.default.createElement("path", { d: SIL.tailR, fill: `url(#${gid}h)` }), st.tails > 1 && /* @__PURE__ */ import_react3.default.createElement("path", { d: SIL.tailL, fill: `url(#${gid}h)` }), /* @__PURE__ */ import_react3.default.createElement("path", { d: hairPath, fill: `url(#${gid}h)` }), /* @__PURE__ */ import_react3.default.createElement("path", { d: bodyPath, fill: `url(#${gid})` }), /* @__PURE__ */ import_react3.default.createElement("path", { d: SIL.neck, fill: color, opacity: ".55" }), /* @__PURE__ */ import_react3.default.createElement("path", { d: SIL.face, fill: color, opacity: ".8" }), /* @__PURE__ */ import_react3.default.createElement("path", { d: SIL.face, fill: `url(#${gid}f)` }), /* @__PURE__ */ import_react3.default.createElement("path", { d: SIL.bangs, fill: st.hair, opacity: ".92" }), /* @__PURE__ */ import_react3.default.createElement("path", { d: st.short ? SIL.lockShortL : SIL.lockL, fill: st.hair, opacity: ".85" }), /* @__PURE__ */ import_react3.default.createElement("path", { d: st.short ? SIL.lockShortR : SIL.lockR, fill: st.hair, opacity: ".85" }), /* @__PURE__ */ import_react3.default.createElement("path", { d: SIL.collar, fill: "none", stroke: "#fff", strokeOpacity: ".5", strokeWidth: "2.5", strokeLinecap: "round" }), /* @__PURE__ */ import_react3.default.createElement("path", { className: "sil-rim", d: st.short ? SIL.rimShort : SIL.rimLong }), /* @__PURE__ */ import_react3.default.createElement("path", { className: "sil-rim", d: bodyPath })), /* @__PURE__ */ import_react3.default.createElement("div", { className: "igsd-silhouette-name" }, name2));
}
function MangaSymbol({ kind, life = 2.6 }) {
  const svg = MANGA_SYMBOL_SVG[kind];
  if (!svg) return null;
  return /* @__PURE__ */ import_react3.default.createElement("span", { className: "igs-fx-symbol", "data-kind": kind, style: { "--igs-fx-life": life + "s" }, dangerouslySetInnerHTML: { __html: svg } });
}
function spriteFor(person, emo) {
  const s = person && person.sprites || {};
  return s[emo] || s.neutral || Object.values(s).find(Boolean) || "";
}
function Actor({ entry, person, beat, emo }) {
  const speaking = beat.speaker === entry.name;
  const sprite = spriteFor(person, emo);
  const src = sprite ? assetUrl(sprite) : "";
  const color = person && person.color || "#9b7bff";
  const [shown, setShown] = import_react3.default.useState(src);
  const [swap, setSwap] = import_react3.default.useState(false);
  import_react3.default.useEffect(() => {
    if (src === shown) return void 0;
    if (!src) {
      setShown("");
      return void 0;
    }
    const img = new Image();
    img.onload = () => {
      setShown(src);
      setSwap(true);
    };
    img.src = src;
    const t = setTimeout(() => setSwap(false), 300);
    return () => clearTimeout(t);
  }, [src]);
  const uploaded = person && person.uploaded;
  return /* @__PURE__ */ import_react3.default.createElement("div", { className: `igsd-actor${speaking ? " is-speaking" : ""}${uploaded ? " is-upload" : ""}`, style: { "--x": actorX(entry.pos) + "%" }, "data-name": entry.name }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "igsd-actor-body" }, shown ? /* @__PURE__ */ import_react3.default.createElement("img", { src: shown, alt: entry.name, className: swap ? "is-swap" : "", draggable: "false" }) : /* @__PURE__ */ import_react3.default.createElement(Silhouette, { name: entry.name, color, appearance: person && person.appearance, gender: person && person.gender })), speaking && beat.sym && /* @__PURE__ */ import_react3.default.createElement("div", { className: "igsd-symbol-anchor" }, /* @__PURE__ */ import_react3.default.createElement(MangaSymbol, { key: beat.key, kind: beat.sym })));
}
function Cast({ beat, view }) {
  const people = new Map((view && view.cast || []).map((p) => [p.name, p]));
  let cast = beat.cast || [];
  if (!cast.length && beat.speaker && beat.speaker !== "我" && people.has(beat.speaker)) cast = [{ name: beat.speaker, pos: "center" }];
  const hideForCg = Boolean(beat.cg && cgSrc(beat.cg, assetUrl));
  if (hideForCg) return null;
  return /* @__PURE__ */ import_react3.default.createElement("div", { className: "igsd-cast" }, cast.map((entry) => /* @__PURE__ */ import_react3.default.createElement(Actor, { key: entry.name, entry, person: people.get(entry.name), beat, emo: beat.emotions[entry.name] || "neutral" })));
}
function CgLayer({ beat }) {
  const img = beat.cg;
  const src = cgSrc(img, assetUrl);
  if (!img) return null;
  if (!src) {
    if (img.status === "failed" || img.status === "cancelled") return null;
    return /* @__PURE__ */ import_react3.default.createElement("div", { className: "igsd-cg-wait" }, /* @__PURE__ */ import_react3.default.createElement("i", null), "插画绘制中", img.title ? `「${img.title}」` : "");
  }
  return /* @__PURE__ */ import_react3.default.createElement("div", { className: "igsd-cg", key: img.id + ":" + img.current }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "igsd-cg-img", style: { backgroundImage: `url("${src}")` } }), img.title && /* @__PURE__ */ import_react3.default.createElement("div", { className: "igsd-cg-caption" }, /* @__PURE__ */ import_react3.default.createElement("i", null), /* @__PURE__ */ import_react3.default.createElement("span", null, "CG"), /* @__PURE__ */ import_react3.default.createElement("b", null, img.title)));
}
function TitleCard({ beat }) {
  if (!beat.sceneEnter || !beat.scene.location) return null;
  return /* @__PURE__ */ import_react3.default.createElement("div", { className: "igsd-titlecard", key: beat.key }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "igsd-titlecard-line" }), /* @__PURE__ */ import_react3.default.createElement("div", { className: "igsd-titlecard-name" }, beat.scene.location), /* @__PURE__ */ import_react3.default.createElement("div", { className: "igsd-titlecard-sub" }, [TIME_LABEL[beat.scene.time], WEATHER_LABEL[beat.scene.weather]].filter(Boolean).join(" · "), " — Turn ", beat.turn), /* @__PURE__ */ import_react3.default.createElement("div", { className: "igsd-titlecard-line", style: { width: "14cqw", marginTop: "1cqw" } }));
}
function useCamera(beat) {
  const [cam, setCam] = import_react3.default.useState("");
  import_react3.default.useEffect(() => {
    setCam("");
    if (!beat || !beat.cam) return void 0;
    const raf = requestAnimationFrame(() => setCam(beat.cam));
    return () => cancelAnimationFrame(raf);
  }, [beat && beat.key]);
  return cam;
}
function Flash({ beat }) {
  if (!beat) return null;
  const kind = beat.cam === "flash" ? "" : beat.cam === "redflash" ? "is-red" : beat.cam === "fadeblack" ? "is-black" : null;
  const tr = beat.transition === "flash" ? "" : beat.transition === "black" ? "is-black" : null;
  const cls = kind ?? tr;
  if (cls === null) return null;
  return /* @__PURE__ */ import_react3.default.createElement("div", { key: beat.key, className: `igsd-flash ${cls}` });
}

// src/client/theater/Dialog.jsx
var import_react4 = __toESM(require("react"), 1);

// src/client/theater/audio.js
var bgm = null;
var ctx = null;
function audioCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {
  });
  return ctx;
}
function fade(el, to, ms, done) {
  const from = el.volume;
  const start = performance.now();
  const tick = (now) => {
    const k = Math.min(1, (now - start) / ms);
    el.volume = Math.max(0, Math.min(1, from + (to - from) * k));
    if (k < 1) requestAnimationFrame(tick);
    else if (done) done();
  };
  requestAnimationFrame(tick);
}
function playBgm(track, volume = 0.45) {
  if (!track) {
    stopBgm();
    return;
  }
  if (bgm && bgm.id === track.id) {
    bgm.el.volume = Math.min(bgm.el.volume, volume);
    fade(bgm.el, volume, 400);
    return;
  }
  const old = bgm;
  const el = new Audio();
  el.src = track.url;
  el.loop = true;
  el.volume = 0;
  el.crossOrigin = "anonymous";
  el.play().then(() => fade(el, volume, 1800)).catch(() => {
  });
  bgm = { el, id: track.id };
  if (old) fade(old.el, 0, 1400, () => {
    old.el.pause();
    old.el.src = "";
  });
}
function stopBgm() {
  if (!bgm) return;
  const old = bgm;
  bgm = null;
  fade(old.el, 0, 900, () => {
    old.el.pause();
    old.el.src = "";
  });
}
function blip(seed = "", type = "dialogue") {
  const ac = audioCtx();
  if (!ac) return;
  let h = 0;
  for (const ch of String(seed)) h = h * 31 + ch.codePointAt(0) >>> 0;
  const base = type === "narration" ? 300 : 420 + h % 7 * 38;
  const t = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type === "thought" ? "sine" : "triangle";
  osc.frequency.setValueAtTime(base * (0.96 + Math.random() * 0.08), t);
  gain.gain.setValueAtTime(1e-4, t);
  gain.gain.exponentialRampToValueAtTime(0.045, t + 4e-3);
  gain.gain.exponentialRampToValueAtTime(1e-4, t + 0.05);
  osc.connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + 0.06);
}
function sfx(kind = "select") {
  const ac = audioCtx();
  if (!ac) return;
  const t = ac.currentTime;
  const notes = { hover: [880], select: [660, 990], page: [520], open: [440, 660, 880], back: [660, 440] }[kind] || [660];
  notes.forEach((f, i) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(f, t + i * 0.06);
    gain.gain.setValueAtTime(1e-4, t + i * 0.06);
    gain.gain.exponentialRampToValueAtTime(kind === "hover" ? 0.018 : 0.05, t + i * 0.06 + 0.01);
    gain.gain.exponentialRampToValueAtTime(1e-4, t + i * 0.06 + 0.18);
    osc.connect(gain).connect(ac.destination);
    osc.start(t + i * 0.06);
    osc.stop(t + i * 0.06 + 0.2);
  });
}

// src/client/theater/Dialog.jsx
var CARD_HEAD = { sms: "新消息", letter: "", note: "", news: "号外", terminal: "> SYSTEM", notice: "告示", diary: "", scroll: "" };
function useTypewriter(beat, speed, { sound = true, hold = false } = {}) {
  const key = beat ? beat.key : "";
  const chars = import_react4.default.useMemo(() => Array.from(beat && beat.text || ""), [key, beat && beat.text]);
  const [shown, setShown] = import_react4.default.useState({ key, done: false });
  if (shown.key !== key) setShown({ key, done: false });
  const done = !speed || !chars.length || shown.key === key && shown.done;
  import_react4.default.useEffect(() => {
    if (!speed || !chars.length || hold) return void 0;
    const finish = setTimeout(() => setShown({ key, done: true }), chars.length * speed + 220);
    let i = 0;
    const tick = sound ? setInterval(() => {
      i += 2;
      if (i >= chars.length) {
        clearInterval(tick);
        return;
      }
      if (!/[\s，。、…！？,.!?]/.test(chars[i])) blip(beat.speaker, beat.type);
    }, speed * 2) : null;
    return () => {
      clearTimeout(finish);
      if (tick) clearInterval(tick);
    };
  }, [key, chars, speed, sound, hold]);
  return [done, chars, () => setShown({ key, done: true })];
}
function DialogBox({ beat, chars, done, waiting, color, quick, progress, status, hiddenText }) {
  const speaker = beat.alias || beat.speaker;
  const showName = speaker && beat.type !== "narration";
  const speed = quick.speed;
  return /* @__PURE__ */ import_react4.default.createElement("div", { className: "igsd-dialog", style: { "--speaker": color || void 0 } }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "igsd-box" }), showName && /* @__PURE__ */ import_react4.default.createElement("div", { className: "igsd-name", key: beat.speaker + beat.alias }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "igsd-name-plate" }, speaker), beat.emo && quick.emoLabel && /* @__PURE__ */ import_react4.default.createElement("div", { className: "igsd-name-sub" }, quick.emoLabel)), hiddenText && /* @__PURE__ */ import_react4.default.createElement("div", { className: "igsd-text is-cardhint" }, "〔 ", CARD_LABEL[beat.card] || "卡片", " 〕"), !hiddenText && /* @__PURE__ */ import_react4.default.createElement("div", { className: `igsd-text is-${beat.type}${done ? " is-done" : waiting ? " is-wait" : ""}`, key: beat.key, "aria-live": "polite" }, chars.map((ch, i) => /* @__PURE__ */ import_react4.default.createElement("span", { key: i, className: "igsd-char", style: { "--d": i * speed + "ms" } }, ch))), done && /* @__PURE__ */ import_react4.default.createElement("div", { className: "igsd-wait", "aria-hidden": "true" }), status && /* @__PURE__ */ import_react4.default.createElement("div", { className: "igsd-status" }, status), /* @__PURE__ */ import_react4.default.createElement("div", { className: "igsd-progress" }, /* @__PURE__ */ import_react4.default.createElement("i", { style: { width: Math.round(progress * 100) + "%" } })), /* @__PURE__ */ import_react4.default.createElement("div", { className: "igsd-quick", onClick: (e) => e.stopPropagation() }, quick.items.map((item) => /* @__PURE__ */ import_react4.default.createElement("button", { key: item.id, type: "button", className: item.on ? "is-on" : "", title: item.title, onClick: () => {
    sfx("select");
    item.run();
  }, onMouseEnter: () => sfx("hover") }, item.label))));
}
function SceneCard({ beat }) {
  const kind = beat.card;
  return /* @__PURE__ */ import_react4.default.createElement("div", { className: "igsd-card", "data-card": kind, key: beat.key }, CARD_HEAD[kind] ? /* @__PURE__ */ import_react4.default.createElement("div", { className: "igsd-card-head" }, CARD_HEAD[kind], kind === "sms" && beat.speaker ? ` · ${beat.alias || beat.speaker}` : "") : null, /* @__PURE__ */ import_react4.default.createElement("div", { className: "igsd-card-body" }, beat.text));
}
function Choices({ choices, onChoose, onBack, waiting }) {
  const [free, setFree] = import_react4.default.useState("");
  const list = choices || [];
  return /* @__PURE__ */ import_react4.default.createElement("div", { className: "igsd-choices", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "igsd-choices-title" }, list.length ? "CHOICE" : waiting ? "TO BE CONTINUED" : "YOUR TURN"), list.map((text, i) => /* @__PURE__ */ import_react4.default.createElement("button", { key: text, type: "button", className: "igsd-choice", "data-n": String(i + 1).padStart(2, "0"), style: { "--i": i }, onMouseEnter: () => sfx("hover"), onClick: () => {
    sfx("select");
    onChoose(text);
  } }, text)), /* @__PURE__ */ import_react4.default.createElement("form", { className: "igsd-free", style: { "--i": list.length }, onSubmit: (e) => {
    e.preventDefault();
    if (free.trim()) {
      sfx("select");
      onChoose(free.trim());
    }
  } }, /* @__PURE__ */ import_react4.default.createElement("input", { value: free, onChange: (e) => setFree(e.target.value), placeholder: list.length ? "或者，自己写下一步……" : "写下你的下一步……", onKeyDown: (e) => e.stopPropagation() }), /* @__PURE__ */ import_react4.default.createElement("button", { type: "submit" }, "GO")), /* @__PURE__ */ import_react4.default.createElement("button", { type: "button", className: "igsd-btn", style: { marginTop: "1cqw" }, onClick: onBack }, "回到聊天"));
}

// src/client/theater/Panels.jsx
var import_react5 = __toESM(require("react"), 1);

// src/client/theater/skins.js
var SKINS = [
  { id: "stellar", name: "星穹", desc: "深空玻璃 · 霓虹渐变", swatch: "linear-gradient(120deg, #120c2c, #ff7eb6 55%, #5ee7ff)", fonts: ["LXGWNeoXiHei", "SourceHanSerifCN-Regular"] },
  { id: "sakura", name: "樱色", desc: "浅色毛玻璃 · 文楷", swatch: "linear-gradient(120deg, #fff4f8, #ffb3cf 55%, #c7b8ff)", fonts: ["LXGWWenKai-Regular"] },
  { id: "ink", name: "水墨", desc: "宣纸 · 朱印 · 古风", swatch: "linear-gradient(120deg, #f3ead6, #3a3530 60%, #b3261e)", fonts: ["HuiwenMincho", "LXGWWenKai-Regular"] },
  { id: "noir", name: "夜金", desc: "黑金 · 电影字幕", swatch: "linear-gradient(120deg, #070707, #2a2318 50%, #d8b26a)", fonts: ["LXGWNeoZhiSong"] },
  { id: "cyber", name: "赛博", desc: "扫描线 · 终端", swatch: "linear-gradient(120deg, #031014, #00f0ff 50%, #ff2bd6)", fonts: ["LXGWNeoXiHei"] }
];
var sheets = /* @__PURE__ */ new Map();
var latinLoaded = /* @__PURE__ */ new Set();
function loadSkinFonts(skinId, base) {
  const skin = SKINS.find((s) => s.id === skinId) || SKINS[0];
  if (!base) return Promise.resolve();
  const root = base.replace(/\/?$/, "/");
  const pending = skin.fonts.map((font) => {
    const href = `${root}fonts/${font}/font.css`;
    if (!sheets.has(href)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.dataset.igsd = "font";
      sheets.set(href, new Promise((resolve) => {
        link.onload = resolve;
        link.onerror = resolve;
      }));
      document.head.appendChild(link);
    }
    return sheets.get(href);
  });
  const latin = `${root}fonts/CormorantGaramond-Regular.woff2`;
  if (!latinLoaded.has(latin) && typeof FontFace === "function") {
    latinLoaded.add(latin);
    try {
      const face = new FontFace("IGS Cormorant", `url("${latin}")`);
      face.load().then((f) => document.fonts.add(f)).catch(() => {
      });
    } catch {
    }
  }
  return Promise.all(pending);
}
function loadGlyphs(el, { body = "", display = "" }, limit = 0) {
  if (!el || typeof document === "undefined" || !document.fonts) return Promise.resolve();
  const style = getComputedStyle(el);
  const jobs = [["--font-body", body], ["--font-display", display]].map(([name2, text]) => {
    const family = style.getPropertyValue(name2).trim();
    return family && text ? document.fonts.load(`16px ${family}`, text).catch(() => {
    }) : null;
  }).filter(Boolean);
  const all = Promise.all(jobs);
  return limit > 0 ? Promise.race([all, new Promise((resolve) => setTimeout(resolve, limit))]) : all;
}

// lib/cast.js
var NAME_COLORS = ["#f2739b", "#7aa2ff", "#ffb35c", "#5fd3b3", "#c58bff", "#ff7a6b", "#59c3ff", "#e5c34f", "#9be36b", "#ff8ad8"];
function nameColor(name2) {
  let h = 2166136261;
  for (const ch of String(name2)) h = Math.imul(h ^ ch.codePointAt(0), 16777619) >>> 0;
  return NAME_COLORS[h % NAME_COLORS.length];
}

// lib/image/style.js
var DEFAULT_QUALITY = {
  "nai-diffusion-4-5-full": "very aesthetic, masterpiece, no text",
  "nai-diffusion-4-5-curated": "very aesthetic, masterpiece, no text, rating:general",
  "nai-diffusion-4-full": "no text, best quality, very aesthetic, absurdres",
  "nai-diffusion-4-curated-preview": "rating:general, best quality, very aesthetic, absurdres",
  "nai-diffusion-3": "best quality, amazing quality, very aesthetic, absurdres",
  "nai-diffusion-furry-3": "best quality, amazing quality, very aesthetic, absurdres",
  sd: "masterpiece, best quality, amazing quality, very aesthetic, absurdres, newest",
  openai: ""
};
var DEFAULT_NEGATIVE = {
  "nai-diffusion-4-5-full": "blurry, lowres, error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, multiple views, logo, too many watermarks, white blank page, blank page",
  "nai-diffusion-4-5-curated": "blurry, lowres, upscaled, artistic error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, halftone, multiple views, logo, too many watermarks, negative space, blank page",
  "nai-diffusion-4-full": "blurry, lowres, error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, logo, dated, signature, multiple views, gigantic breasts",
  "nai-diffusion-4-curated-preview": "blurry, lowres, error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, logo, dated, signature, multiple views",
  "nai-diffusion-3": "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
  "nai-diffusion-furry-3": "lowres, bad anatomy, bad hands, text, error, missing fingers, worst quality, low quality, jpeg artifacts, signature, watermark, blurry",
  sd: "lowres, worst quality, bad quality, bad anatomy, bad hands, extra digits, fewer digits, jpeg artifacts, signature, watermark, username, text, blurry, multiple views",
  openai: "text, watermark, logo, extra fingers, deformed hands"
};
function modelKey(backend, config) {
  if (backend === "novelai") return config?.novelai?.model || "nai-diffusion-4-5-full";
  if (backend === "openai") return "openai";
  return "sd";
}
function presetKey(key) {
  if (key in DEFAULT_QUALITY) return key;
  return key !== "sd" && key !== "openai" ? "nai-diffusion-4-5-full" : "sd";
}
function qualityFor(style, key) {
  const custom = style?.quality?.[key];
  return typeof custom === "string" ? custom : DEFAULT_QUALITY[presetKey(key)];
}
function negativeFor(style, key) {
  const custom = style?.negative?.[key];
  return typeof custom === "string" ? custom : DEFAULT_NEGATIVE[presetKey(key)];
}

// lib/image/nai-models.js
var NAI_MODELS = {
  "nai-diffusion-5-full": { label: "V5 Full", scale: 5, v4: true, v5: true },
  "nai-diffusion-5-curated": { label: "V5 Curated", scale: 5, v4: true, v5: true },
  "nai-diffusion-4-5-full": { label: "V4.5 Full", scale: 5, v4: true },
  "nai-diffusion-4-5-curated": { label: "V4.5 Curated", scale: 5, v4: true },
  "nai-diffusion-4-full": { label: "V4 Full", scale: 5.5, v4: true },
  "nai-diffusion-4-curated-preview": { label: "V4 Curated", scale: 5.5, v4: true },
  "nai-diffusion-3": { label: "Anime V3", scale: 5, v4: false },
  "nai-diffusion-furry-3": { label: "Furry V3", scale: 5, v4: false }
};
var MODEL_ID = /^[a-z0-9][a-z0-9._-]{1,63}$/i;
function naiModelInfo(model) {
  const id = String(model || "").trim();
  if (NAI_MODELS[id]) return { id, ...NAI_MODELS[id] };
  if (!MODEL_ID.test(id)) return null;
  const version = Number((id.match(/^nai-diffusion(?:-furry)?-(\d+)/i) || [])[1]);
  const legacy = /^nai-diffusion(-furry)?$/i.test(id) || version > 0 && version < 4;
  return { id, label: id, scale: 5, v4: !legacy, v5: version >= 5 };
}

// src/client/theater/Panels.jsx
var STATUS_LABEL = { queued: "排队中", running: "绘制中", failed: "失败", cancelled: "已取消", ready: "" };
function Panel({ title, en, onClose, tabs, tab, onTab, children, actions }) {
  return /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-panel", onClick: (e) => e.stopPropagation(), onKeyDown: (e) => e.stopPropagation() }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-panel-head" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-panel-title" }, title), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-panel-en" }, en), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-spacer" }), actions, /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-iconbtn", title: "返回", onClick: onClose }, "✕")), tabs && /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-tabs" }, tabs.map((t) => /* @__PURE__ */ import_react5.default.createElement("button", { key: t.id, type: "button", className: `igsd-tab${tab === t.id ? " is-on" : ""}`, onClick: () => onTab(t.id) }, t.label))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-panel-body" }, children));
}
function useBusy() {
  const [busy, setBusy] = import_react5.default.useState("");
  const run = async (id, fn, ok) => {
    setBusy(id);
    try {
      const r = await fn();
      if (ok) toast(ok);
      return r;
    } catch (e) {
      toast(String(e && e.message || e), "error");
    } finally {
      setBusy("");
    }
  };
  return [busy, run];
}
function Backlog({ beats, index, onJump, onClose, gameId }) {
  const [busy, run] = useBusy();
  const ref = import_react5.default.useRef(null);
  import_react5.default.useEffect(() => {
    const box = ref.current && ref.current.closest(".igsd-panel-body");
    const el = ref.current && ref.current.querySelector(".is-current");
    if (box && el) box.scrollTop = el.offsetTop - box.clientHeight / 2;
  }, []);
  let lastTurn = null;
  return /* @__PURE__ */ import_react5.default.createElement(Panel, { title: "回想", en: "Backlog", onClose }, /* @__PURE__ */ import_react5.default.createElement("div", { ref }, beats.map((b, i) => {
    const head = b.turn !== lastTurn;
    lastTurn = b.turn;
    return /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, { key: b.key }, head && /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-log-turn igsd-row" }, /* @__PURE__ */ import_react5.default.createElement("span", null, "TURN ", b.turn, " · ", b.scene.location || "—", " · ", TIME_LABEL[b.scene.time] || ""), /* @__PURE__ */ import_react5.default.createElement("span", { style: { flex: 1 } }), b.status === "directing" && /* @__PURE__ */ import_react5.default.createElement("span", { className: "igsd-pill is-busy" }, "导演整理中"), b.status === "failed" && /* @__PURE__ */ import_react5.default.createElement("span", { className: "igsd-pill igsd-err", title: b.error }, "整理失败"), /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", disabled: busy === "r" + b.turn, onClick: (e) => {
      e.stopPropagation();
      run("r" + b.turn, () => api.replan(gameId, b.turn), "已重新整理这一轮");
    } }, "重新整理")), /* @__PURE__ */ import_react5.default.createElement("div", { className: `igsd-log-item${i === index ? " is-current" : ""}`, onClick: () => onJump(i), style: i === index ? { background: "rgba(255,255,255,.06)" } : null }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-log-name" }, b.type === "narration" ? "" : b.alias || b.speaker), /* @__PURE__ */ import_react5.default.createElement("div", { style: b.type === "thought" ? { fontStyle: "italic", opacity: 0.8 } : null }, b.type === "dialogue" ? `「${b.text}」` : b.type === "thought" ? `（${b.text}）` : b.text)));
  }), !beats.length && /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-note" }, "还没有可以回想的内容。")));
}
function ImageEditor({ gameId, image, onClose }) {
  const [draft, setDraft] = import_react5.default.useState({ tags: image.tags || "", desc: image.desc || "", negativeExtra: image.negativeExtra || "", shape: image.shape || "landscape", seed: "" });
  const [instruction, setInstruction] = import_react5.default.useState("");
  const [busy, run] = useBusy();
  const set = (patch) => setDraft((d) => ({ ...d, ...patch }));
  const version = image.versions[image.current];
  return /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-person", style: { gridTemplateColumns: "1fr" } }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-section", style: { marginTop: 0 } }, "改提示词 · ", image.title || image.id), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-field" }, /* @__PURE__ */ import_react5.default.createElement("label", null, "画面 Tag"), /* @__PURE__ */ import_react5.default.createElement("textarea", { className: "igsd-textarea", value: draft.tags, onChange: (e) => set({ tags: e.target.value }) })), /* @__PURE__ */ import_react5.default.createElement("small", { className: "igsd-note", style: { display: "block", margin: "-0.4cqw 0 0 15.2cqw" } }, "人物写 @名字，出图前自动换成外貌档案（柏宝绘的 @ 外貌库）。"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-field" }, /* @__PURE__ */ import_react5.default.createElement("label", null, "画面说明"), /* @__PURE__ */ import_react5.default.createElement("textarea", { className: "igsd-textarea", style: { minHeight: "4cqw" }, value: draft.desc, onChange: (e) => set({ desc: e.target.value }) })), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-field" }, /* @__PURE__ */ import_react5.default.createElement("label", null, "额外负面"), /* @__PURE__ */ import_react5.default.createElement("input", { className: "igsd-input", value: draft.negativeExtra, onChange: (e) => set({ negativeExtra: e.target.value }) })), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-field" }, /* @__PURE__ */ import_react5.default.createElement("label", null, "画幅 / 种子"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement("select", { className: "igsd-select", style: { width: "auto" }, value: draft.shape, onChange: (e) => set({ shape: e.target.value }) }, /* @__PURE__ */ import_react5.default.createElement("option", { value: "landscape" }, "横版"), /* @__PURE__ */ import_react5.default.createElement("option", { value: "portrait" }, "竖版"), /* @__PURE__ */ import_react5.default.createElement("option", { value: "square" }, "方形")), /* @__PURE__ */ import_react5.default.createElement("input", { className: "igsd-input", style: { width: "14cqw" }, placeholder: "随机", value: draft.seed, onChange: (e) => set({ seed: e.target.value.replace(/\D/g, "") }) }), version && /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", onClick: () => set({ seed: String(version.seed ?? "") }) }, "沿用当前种子"))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-field" }, /* @__PURE__ */ import_react5.default.createElement("label", null, "AI 改写"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement("input", { className: "igsd-input", style: { flex: 1, width: "auto" }, placeholder: "例如：改成雨夜、她在哭、镜头拉远……留空则重读原文", value: instruction, onChange: (e) => setInstruction(e.target.value) }), /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", disabled: busy === "rw", onClick: () => run("rw", async () => {
    const r = await api.rewrite(gameId, image.id, instruction);
    set({ tags: r.draft.tags, desc: r.draft.desc, negativeExtra: r.draft.negativeExtra || draft.negativeExtra });
  }, "已改写，确认后点「按此重画」") }, busy === "rw" ? "改写中…" : "改写"))), version && /* @__PURE__ */ import_react5.default.createElement("details", { className: "igsd-note", style: { margin: "0.6cqw 0" } }, /* @__PURE__ */ import_react5.default.createElement("summary", null, "当前版本实际发出的提示词"), /* @__PURE__ */ import_react5.default.createElement("div", { style: { userSelect: "text", marginTop: "0.4cqw" } }, "＋ ", version.positive, /* @__PURE__ */ import_react5.default.createElement("br", null), "－ ", version.negative, /* @__PURE__ */ import_react5.default.createElement("br", null), version.backend, " · ", version.model, " · seed ", version.seed)), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row", style: { justifyContent: "flex-end" } }, /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", onClick: onClose }, "取消"), /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn is-primary", onClick: () => run("go", async () => {
    await api.render(gameId, image.id, { tags: draft.tags, desc: draft.desc, negativeExtra: draft.negativeExtra, shape: draft.shape, ...draft.seed ? { seed: Number(draft.seed) } : {} });
    onClose();
  }, "已加入出图队列") }, "按此重画")));
}
function Lightbox({ src, onClose, children }) {
  return /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-lightbox", onClick: onClose }, /* @__PURE__ */ import_react5.default.createElement("img", { src, alt: "", onClick: (e) => e.stopPropagation() }), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row", onClick: (e) => e.stopPropagation() }, children));
}
function CgTile({ gameId, image, onOpen, onEdit }) {
  const [busy, run] = useBusy();
  const src = cgSrc(image, assetUrl);
  const pending = image.status === "queued" || image.status === "running";
  return /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("div", { className: `igsd-thumb${src ? "" : " is-locked"}`, onClick: () => src && onOpen(image) }, src ? /* @__PURE__ */ import_react5.default.createElement("img", { src, alt: image.title, loading: "lazy" }) : /* @__PURE__ */ import_react5.default.createElement("span", null, pending ? "🎨 " + STATUS_LABEL[image.status] : image.status === "failed" ? "⚠ " + (image.error || "失败") : "未生成"), pending && src && /* @__PURE__ */ import_react5.default.createElement("span", { className: "igsd-pill is-busy", style: { position: "absolute", right: ".6cqw", top: ".6cqw" } }, "重画中"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-thumb-cap" }, image.title || "第 " + image.turn + " 轮插画", image.versions.length > 1 ? ` · ${image.current + 1}/${image.versions.length}` : "")), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row", style: { marginTop: ".6cqw" } }, pending ? /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", onClick: () => run("c", () => api.cancel(gameId, "cg", image.id), "已取消") }, "取消") : /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", disabled: busy === "r", onClick: () => run("r", () => api.render(gameId, image.id, {}), "已加入出图队列") }, "重画"), /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", onClick: () => onEdit(image) }, "改词"), /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", onClick: () => {
    if (window.confirm("删除这张插画和它的所有版本？")) run("d", () => api.deleteImage(gameId, image.id), "已删除");
  } }, "删除")), image.status === "failed" && image.error && /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-note igsd-err", style: { marginTop: ".4cqw" } }, image.error));
}
function Gallery({ view, gameId, onClose, focusId }) {
  const [tab, setTab] = import_react5.default.useState("cg");
  const [open, setOpen] = import_react5.default.useState(null);
  const [edit, setEdit] = import_react5.default.useState(() => focusId && view && view.images.find((i) => i.id === focusId) || null);
  const [busy, run] = useBusy();
  const images = view && view.images || [];
  const places = Object.values(view && view.places || {});
  const live = open && images.find((i) => i.id === open.id);
  return /* @__PURE__ */ import_react5.default.createElement(Panel, { title: "鉴赏", en: "Gallery", onClose, tabs: [{ id: "cg", label: `插画 CG · ${images.length}` }, { id: "bg", label: `背景 · ${places.length}` }], tab, onTab: setTab }, edit && /* @__PURE__ */ import_react5.default.createElement(ImageEditor, { key: edit.id, gameId, image: images.find((i) => i.id === edit.id) || edit, onClose: () => setEdit(null) }), tab === "cg" && /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-grid" }, images.map((img) => /* @__PURE__ */ import_react5.default.createElement(CgTile, { key: img.id, gameId, image: img, onOpen: setOpen, onEdit: setEdit })), !images.length && /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-note" }, "还没有插画。导演会在值得画的地方自动安排；也可以在聊天里点每条消息下方的「🎬 配一张」。")), tab === "bg" && /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-grid" }, places.map((p) => /* @__PURE__ */ import_react5.default.createElement("div", { key: p.key }, /* @__PURE__ */ import_react5.default.createElement("div", { className: `igsd-thumb${p.assetId ? "" : " is-locked"}`, onClick: () => p.assetId && setOpen({ place: p }) }, p.assetId ? /* @__PURE__ */ import_react5.default.createElement("img", { src: assetUrl(p.assetId), alt: p.location, loading: "lazy" }) : /* @__PURE__ */ import_react5.default.createElement("span", null, STATUS_LABEL[p.status] || p.error || "未生成"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-thumb-cap" }, p.location, " · ", TIME_LABEL[p.time] || p.time)), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row", style: { marginTop: ".6cqw" } }, /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", disabled: busy === p.key, onClick: () => run(p.key, () => api.place(gameId, p.key), "已加入出图队列") }, "重画背景")), p.status === "failed" && /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-note igsd-err" }, p.error))), !places.length && /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-note" }, "新地点出现时会自动生成背景（设置里可关）；没有生成时，优先用 IGS 自带的 72 张背景，再不行就用程序化天空。")), live && cgSrc(live, assetUrl) && /* @__PURE__ */ import_react5.default.createElement(Lightbox, { src: cgSrc(live, assetUrl), onClose: () => setOpen(null) }, /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", disabled: live.current <= 0, onClick: () => run("v", () => api.version(gameId, live.id, live.current - 1)) }, "‹ 上一版"), /* @__PURE__ */ import_react5.default.createElement("span", { className: "igsd-pill" }, live.current + 1, " / ", live.versions.length), /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", disabled: live.current >= live.versions.length - 1, onClick: () => run("v", () => api.version(gameId, live.id, live.current + 1)) }, "下一版 ›"), /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", onClick: () => {
    setOpen(null);
    setEdit(live);
  } }, "改词重画"), /* @__PURE__ */ import_react5.default.createElement("a", { className: "igsd-btn", href: cgSrc(live, assetUrl), download: `${live.title || live.id}.png` }, "下载")), open && open.place && /* @__PURE__ */ import_react5.default.createElement(Lightbox, { src: assetUrl(open.place.assetId), onClose: () => setOpen(null) }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "igsd-pill" }, open.place.location)));
}
var EMO_KEYS = Object.keys(EMOTION_LABEL);
function readFile(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
function PersonCard({ gameId, person }) {
  const [appearance, setAppearance] = import_react5.default.useState(person.appearance || "");
  const [gender, setGender] = import_react5.default.useState(person.gender || "");
  const [uploadEmo, setUploadEmo] = import_react5.default.useState("neutral");
  const [busy, run] = useBusy();
  const fileRef = import_react5.default.useRef(null);
  import_react5.default.useEffect(() => {
    setAppearance(person.appearance || "");
    setGender(person.gender || "");
  }, [person.appearance, person.gender]);
  const main = person.sprites && (person.sprites.neutral || Object.values(person.sprites).find(Boolean));
  const dirty = appearance !== (person.appearance || "") || gender !== (person.gender || "");
  const save = () => run("save", () => api.cast(gameId, person.global ? "global-save" : "save", { name: person.name, patch: { appearance, gender } }), "档案已保存");
  return /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-person", style: { "--c": person.color } }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-person-art" }, main ? /* @__PURE__ */ import_react5.default.createElement("img", { src: assetUrl(main), alt: person.name }) : /* @__PURE__ */ import_react5.default.createElement(Silhouette, { name: person.name, color: person.color, appearance: person.appearance, gender: person.gender })), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("h3", null, /* @__PURE__ */ import_react5.default.createElement("span", { style: { color: person.color } }, person.name), person.global ? /* @__PURE__ */ import_react5.default.createElement("small", null, "全局 · 冻结") : /* @__PURE__ */ import_react5.default.createElement("small", null, "本局", person.createdTurn != null ? ` · 第 ${person.createdTurn} 轮登场` : ""), person.temp && /* @__PURE__ */ import_react5.default.createElement("small", { title: "临时状态，不写进档案" }, "临时：", person.temp)), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-field", style: { gridTemplateColumns: "8cqw 1fr" } }, /* @__PURE__ */ import_react5.default.createElement("label", null, "外貌"), /* @__PURE__ */ import_react5.default.createElement("textarea", { className: "igsd-textarea", value: appearance, onChange: (e) => setAppearance(e.target.value), placeholder: "1girl, long black hair, blue eyes, school uniform" })), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-field", style: { gridTemplateColumns: "8cqw 1fr" } }, /* @__PURE__ */ import_react5.default.createElement("label", null, "性别"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement("select", { className: "igsd-select", style: { width: "auto" }, value: gender, onChange: (e) => setGender(e.target.value) }, /* @__PURE__ */ import_react5.default.createElement("option", { value: "" }, "未知"), /* @__PURE__ */ import_react5.default.createElement("option", { value: "female" }, "女"), /* @__PURE__ */ import_react5.default.createElement("option", { value: "male" }, "男"), /* @__PURE__ */ import_react5.default.createElement("option", { value: "other" }, "其他")), /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn is-primary", disabled: !dirty || busy === "save", onClick: save }, "保存档案"))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-emos" }, EMO_KEYS.map((emo) => {
    const id = person.sprites && person.sprites[emo];
    const st = person.spriteStatus && person.spriteStatus[emo];
    return /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        key: emo,
        type: "button",
        className: `igsd-emo${st && (st.status === "queued" || st.status === "running") ? " is-busy" : ""}`,
        title: st && st.error ? st.error : id ? "点击重画" : "点击生成这个表情",
        onClick: () => run("e" + emo, () => api.cast(gameId, "sprite", { name: person.name, emotion: emo }), `已排队：${person.name}·${EMOTION_LABEL[emo]}`)
      },
      id && /* @__PURE__ */ import_react5.default.createElement("img", { src: assetUrl(id), alt: "", loading: "lazy" }),
      /* @__PURE__ */ import_react5.default.createElement("span", null, EMOTION_LABEL[emo], st && st.status === "failed" ? " ⚠" : "")
    );
  })), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement("select", { className: "igsd-select", style: { width: "auto" }, value: uploadEmo, onChange: (e) => setUploadEmo(e.target.value) }, EMO_KEYS.map((e) => /* @__PURE__ */ import_react5.default.createElement("option", { key: e, value: e }, EMOTION_LABEL[e]))), /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", onClick: () => fileRef.current && fileRef.current.click() }, "上传立绘"), /* @__PURE__ */ import_react5.default.createElement("input", { ref: fileRef, type: "file", accept: "image/png,image/jpeg,image/webp", hidden: true, onChange: async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    const dataUrl = await readFile(file);
    run("up", () => api.cast(gameId, "upload", { name: person.name, emotion: uploadEmo, dataUrl }), "立绘已上传");
  } }), !person.global && /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", onClick: () => run("g", () => api.cast(gameId, "promote", { name: person.name }), "已提升为全局角色：所有对局共用，AI 不再改它") }, "提升为全局"), person.global && /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", onClick: () => run("l", () => api.cast(gameId, "copy-local", { name: person.name }), "已复制到本局，可单独修改") }, "复制到本局"), person.global && /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", onClick: () => {
    if (window.confirm("从全局库移除？各对局里的副本不受影响。")) run("u", () => api.cast(gameId, "unglobal", { name: person.name }), "已移出全局库");
  } }, "移出全局"), !person.global && /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", onClick: () => {
    if (window.confirm(`删除 ${person.name} 的本局档案？`)) run("d", () => api.cast(gameId, "delete", { name: person.name }), "已删除");
  } }, "删除")), person.versions && person.versions.length > 1 && /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-note", style: { marginTop: ".6cqw" } }, "外貌时间线：", person.versions.map((v) => `第 ${v.fromTurn} 轮起「${String(v.tags).slice(0, 40)}${String(v.tags).length > 40 ? "…" : ""}」`).join(" → "))));
}
function CastPanel({ view, gameId, onClose }) {
  const [tab, setTab] = import_react5.default.useState("people");
  const [busy, run] = useBusy();
  const [name2, setName] = import_react5.default.useState("");
  const cast = view && view.cast || [];
  const log = view && view.castLog || [];
  const ACTION = { create: "AI 建档", change: "外貌变化", temp: "临时状态", edit: "手动修改" };
  return /* @__PURE__ */ import_react5.default.createElement(
    Panel,
    {
      title: "人物志",
      en: "Characters",
      onClose,
      tabs: [{ id: "people", label: `人物 · ${cast.length}` }, { id: "log", label: `档案变更 · ${log.length}` }],
      tab,
      onTab: setTab,
      actions: tab === "people" && /* @__PURE__ */ import_react5.default.createElement("form", { className: "igsd-row", onSubmit: (e) => {
        e.preventDefault();
        if (name2.trim()) run("new", () => api.cast(gameId, "save", { name: name2.trim(), patch: {} }), "已新建").then(() => setName(""));
      } }, /* @__PURE__ */ import_react5.default.createElement("input", { className: "igsd-input", style: { width: "14cqw" }, placeholder: "新人物名字", value: name2, onChange: (e) => setName(e.target.value) }), /* @__PURE__ */ import_react5.default.createElement("button", { type: "submit", className: "igsd-btn" }, "新建"))
    },
    tab === "people" && cast.map((p) => /* @__PURE__ */ import_react5.default.createElement(PersonCard, { key: p.name, gameId, person: p })),
    tab === "people" && !cast.length && /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-note" }, "有名字的角色第一次出场时，导演会自动给他建外貌档案；之后所有插画里写 @名字 都会换成这份外貌，长相不再漂移。"),
    tab === "log" && log.map((e) => /* @__PURE__ */ import_react5.default.createElement("div", { key: e.index, className: "igsd-log-item", style: { gridTemplateColumns: "12cqw 1fr auto", cursor: "default" } }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-log-name" }, e.name), /* @__PURE__ */ import_react5.default.createElement("div", null, /* @__PURE__ */ import_react5.default.createElement("b", { style: { color: "var(--accent)" } }, ACTION[e.action] || e.action), e.turn != null ? ` · 第 ${e.turn} 轮` : "", /* @__PURE__ */ import_react5.default.createElement("br", null), /* @__PURE__ */ import_react5.default.createElement("span", { className: "igsd-note" }, e.before ? `${e.before} → ` : "", e.after || (e.action === "temp" ? "（解除）" : ""))), /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", disabled: busy === "rb" + e.index, onClick: () => run("rb" + e.index, () => api.cast(gameId, "rollback", { index: e.index }), "已回滚") }, "回滚"))),
    tab === "log" && !log.length && /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-note" }, "AI 每次建档、改外貌、加临时状态都会记在这里，可以一键回滚。")
  );
}
function Field({ label, hint, children }) {
  return /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-field" }, /* @__PURE__ */ import_react5.default.createElement("label", null, label), /* @__PURE__ */ import_react5.default.createElement("div", null, children)), hint && /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-note", style: { margin: "-0.5cqw 0 0.6cqw 15.2cqw" } }, hint));
}
function Toggle({ value, onChange }) {
  return /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: `igsd-switch${value ? " is-on" : ""}`, "aria-pressed": Boolean(value), onClick: () => onChange(!value) });
}
function Text({ value, onCommit, type = "text", placeholder, style }) {
  const [v, setV] = import_react5.default.useState(value ?? "");
  import_react5.default.useEffect(() => {
    setV(value ?? "");
  }, [value]);
  const commit = () => {
    if (String(v) !== String(value ?? "")) onCommit(type === "number" ? Number(v) : v);
  };
  return /* @__PURE__ */ import_react5.default.createElement("input", { className: "igsd-input", type, value: v, placeholder, style, onChange: (e) => setV(e.target.value), onBlur: commit, onKeyDown: (e) => {
    e.stopPropagation();
    if (e.key === "Enter") commit();
  } });
}
function Select({ value, options, onChange }) {
  return /* @__PURE__ */ import_react5.default.createElement("select", { className: "igsd-select", value, onChange: (e) => onChange(e.target.value) }, options.map(([v, l]) => /* @__PURE__ */ import_react5.default.createElement("option", { key: v, value: v }, l)));
}
function ModelField({ value, options, onCommit, placeholder, emptyLabel }) {
  const [manual, setManual] = import_react5.default.useState(false);
  if (manual || !options.length) {
    return /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement(Text, { value, placeholder, style: { flex: 1, width: "auto" }, onCommit }), options.length > 0 && /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", onClick: () => setManual(false) }, "从列表选"));
  }
  const known = !value || options.some((o) => o.id === value);
  const opts = [
    ...emptyLabel ? [["", emptyLabel]] : [],
    ...known ? [] : [[value, value + "（当前）"]],
    ...options.map((o) => [o.id, o.name]),
    ["__manual", "手动填写…"]
  ];
  return /* @__PURE__ */ import_react5.default.createElement(Select, { value, options: opts, onChange: (v) => v === "__manual" ? setManual(true) : onCommit(v) });
}
function listOptions(list, value, emptyLabel) {
  const opts = (list || []).map((v) => [v, v]);
  if (value && !(list || []).includes(value)) opts.unshift([value, value + "（当前）"]);
  if (emptyLabel) opts.unshift(["", emptyLabel]);
  return opts;
}
function KeyInput({ backend, endpoint, has }) {
  const [value, setValue] = import_react5.default.useState("");
  const [busy, run] = useBusy();
  return /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement("input", { className: "igsd-input", style: { flex: 1, width: "auto" }, type: "password", autoComplete: "off", placeholder: has ? "已保存（不会回显）；填新的会覆盖" : "粘贴 Key", value, onChange: (e) => setValue(e.target.value), onKeyDown: (e) => e.stopPropagation() }), /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn is-primary", disabled: !value || busy === "s", onClick: () => run("s", async () => {
    setConfig(await api.secret(backend, endpoint, value));
    setValue("");
  }, "Key 已保存在宿主，不会发到浏览器") }, "保存"), has && /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", onClick: () => run("c", async () => setConfig(await api.secret(backend, endpoint, "")), "已清除") }, "清除"), /* @__PURE__ */ import_react5.default.createElement("span", { className: has ? "igsd-ok" : "igsd-note" }, has ? "✓ 已保存" : "未填写"));
}
function BackendSection({ data }) {
  const cfg = data.config;
  const backend = cfg.images.backend;
  const [busy, run] = useBusy();
  const [test, setTest] = import_react5.default.useState(null);
  const [list, setList] = import_react5.default.useState(null);
  const [relay, setRelay] = import_react5.default.useState({ name: "", baseURL: "" });
  const p = (section, patch) => patchConfig({ [section]: patch }).catch((e) => toast(e.message, "error"));
  const source = backend === "novelai" ? "" : [cfg[backend].baseURL, cfg[backend].authType, data.keys[backend]].join("|");
  const loadList = () => run("m", async () => setList(await api.models()));
  import_react5.default.useEffect(() => {
    setList(null);
    loadList();
  }, [backend, source]);
  const models = list && list.backend === backend && list.models || [];
  const samplers = list && list.backend === backend && list.samplers || [];
  const schedulers = list && list.backend === backend && list.schedulers || [];
  const modelHint = list ? list.note : "正在读取模型列表…";
  const refresh = /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", disabled: busy === "m", onClick: loadList }, busy === "m" ? "读取中…" : "刷新列表");
  const doTest = () => run("t", async () => {
    setTest(await api.test());
    if (backend !== "novelai") loadList();
  });
  const nai = naiModelInfo(cfg.novelai.model) || {};
  const auth = (section) => /* @__PURE__ */ import_react5.default.createElement(Field, { label: "鉴权" }, /* @__PURE__ */ import_react5.default.createElement(Select, { value: cfg[section].authType, onChange: (v) => p(section, { authType: v }), options: [["none", "无"], ["bearer", "Bearer Token"], ["basic", "Basic（用户名:密码）"]] }));
  return /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-section" }, "生图渠道"), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "渠道" }, /* @__PURE__ */ import_react5.default.createElement(Select, { value: backend, onChange: (v) => p("images", { backend: v }), options: [["novelai", "NovelAI"], ["comfyui", "ComfyUI"], ["openai", "OpenAI 兼容（gpt-image / 聊天出图）"], ["webui", "SD WebUI / Forge"]] })), backend === "novelai" && /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement(Field, { label: "接入点", hint: "官方站与第三方中转站各存一条，各记各的 Key；换站不影响模型与画风。" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement(Select, { value: cfg.novelai.endpoint, onChange: (v) => p("novelai", { endpoint: v }), options: cfg.novelai.endpoints.map((e) => [e.id, e.name]) }), cfg.novelai.endpoint !== "official" && /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", onClick: () => p("novelai", { endpoint: "official", endpoints: cfg.novelai.endpoints.filter((e) => e.id !== cfg.novelai.endpoint) }) }, "删除此站"))), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "添加中转站" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement("input", { className: "igsd-input", style: { width: "12cqw" }, placeholder: "名称", value: relay.name, onChange: (e) => setRelay((r) => ({ ...r, name: e.target.value })), onKeyDown: (e) => e.stopPropagation() }), /* @__PURE__ */ import_react5.default.createElement("input", { className: "igsd-input", style: { flex: 1, width: "auto" }, placeholder: "https://…", value: relay.baseURL, onChange: (e) => setRelay((r) => ({ ...r, baseURL: e.target.value })), onKeyDown: (e) => e.stopPropagation() }), /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", disabled: !/^https?:\/\//.test(relay.baseURL), onClick: () => {
    const id = "relay" + Date.now().toString(36).slice(-5);
    p("novelai", { endpoints: [...cfg.novelai.endpoints, { id, name: relay.name || id, baseURL: relay.baseURL }], endpoint: id });
    setRelay({ name: "", baseURL: "" });
  } }, "添加"))), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "Key" }, /* @__PURE__ */ import_react5.default.createElement(KeyInput, { backend: "novelai", endpoint: cfg.novelai.endpoint, has: data.keys["novelai:" + cfg.novelai.endpoint] })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "模型", hint: modelHint }, /* @__PURE__ */ import_react5.default.createElement(ModelField, { value: cfg.novelai.model, options: models, placeholder: "nai-diffusion-…", onCommit: (v) => p("novelai", { model: v }) })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "采样器" }, /* @__PURE__ */ import_react5.default.createElement(Select, { value: cfg.novelai.sampler, onChange: (v) => p("novelai", { sampler: v }), options: listOptions(samplers, cfg.novelai.sampler) })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "步数 / 提示词引导" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement(Text, { type: "number", style: { width: "8cqw" }, value: cfg.novelai.steps, onCommit: (v) => p("novelai", { steps: v }) }), /* @__PURE__ */ import_react5.default.createElement(Text, { type: "number", style: { width: "8cqw" }, value: cfg.novelai.scale, onCommit: (v) => p("novelai", { scale: v }) }))), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "引导缩放", hint: "Prompt Guidance Rescale，0–1。提示词引导调高后画面发灰、过饱和时往上加一点。" }, /* @__PURE__ */ import_react5.default.createElement("input", { type: "range", min: "0", max: "1", step: "0.02", value: cfg.novelai.cfgRescale, onChange: (e) => p("novelai", { cfgRescale: Number(e.target.value) }), style: { width: "24cqw" } }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "igsd-note", style: { marginLeft: "1cqw" } }, Number(cfg.novelai.cfgRescale).toFixed(2))), nai.v5 ? /* @__PURE__ */ import_react5.default.createElement(Field, { label: "透明底立绘", hint: "V5 才有：立绘按透明背景生成，站在场景里不会带一块白底。CG 和背景不受影响。" }, /* @__PURE__ */ import_react5.default.createElement(Toggle, { value: cfg.images.transparentSprites, onChange: (v) => p("images", { transparentSprites: v }) })) : /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement(Field, { label: "噪声调度" }, /* @__PURE__ */ import_react5.default.createElement(Select, { value: cfg.novelai.noiseSchedule, onChange: (v) => p("novelai", { noiseSchedule: v }), options: listOptions(schedulers, cfg.novelai.noiseSchedule) })), nai.v4 && /* @__PURE__ */ import_react5.default.createElement(Field, { label: "Variety+", hint: "前几步不跟提示词，构图更多样；代价是没那么听话。" }, /* @__PURE__ */ import_react5.default.createElement(Toggle, { value: cfg.novelai.variety, onChange: (v) => p("novelai", { variety: v }) })))), backend === "comfyui" && /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement(Field, { label: "地址" }, /* @__PURE__ */ import_react5.default.createElement(Text, { value: cfg.comfyui.baseURL, onCommit: (v) => p("comfyui", { baseURL: v }) })), auth("comfyui"), cfg.comfyui.authType !== "none" && /* @__PURE__ */ import_react5.default.createElement(Field, { label: "Token" }, /* @__PURE__ */ import_react5.default.createElement(KeyInput, { backend: "comfyui", has: data.keys.comfyui })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "模式" }, /* @__PURE__ */ import_react5.default.createElement(Select, { value: cfg.comfyui.mode, onChange: (v) => p("comfyui", { mode: v }), options: [["simple", "简单（只选底模）"], ["workflow", "导入工作流（API 格式 JSON）"]] })), cfg.comfyui.mode === "simple" ? /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement(Field, { label: "底模", hint: modelHint }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ import_react5.default.createElement(ModelField, { value: cfg.comfyui.checkpoint, options: models, emptyLabel: "（请选择）", placeholder: "xxx.safetensors", onCommit: (v) => p("comfyui", { checkpoint: v }) })), refresh)), samplers.length > 0 && /* @__PURE__ */ import_react5.default.createElement(Field, { label: "采样器 / 调度器" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement(Select, { value: cfg.comfyui.sampler, onChange: (v) => p("comfyui", { sampler: v }), options: listOptions(samplers, cfg.comfyui.sampler) }), /* @__PURE__ */ import_react5.default.createElement(Select, { value: cfg.comfyui.scheduler, onChange: (v) => p("comfyui", { scheduler: v }), options: listOptions(schedulers, cfg.comfyui.scheduler) }))), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "步数 / CFG" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement(Text, { type: "number", style: { width: "8cqw" }, value: cfg.comfyui.steps, onCommit: (v) => p("comfyui", { steps: v }) }), /* @__PURE__ */ import_react5.default.createElement(Text, { type: "number", style: { width: "8cqw" }, value: cfg.comfyui.cfg, onCommit: (v) => p("comfyui", { cfg: v }) })))) : /* @__PURE__ */ import_react5.default.createElement(Field, { label: "工作流", hint: "支持 %prompt% %negative% %width% %height% %seed% %steps% %cfg% 占位符；没有占位符时自动找正负提示词、尺寸和采样节点。" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, cfg.comfyui.workflows.length > 0 && /* @__PURE__ */ import_react5.default.createElement(Select, { value: cfg.comfyui.workflow || cfg.comfyui.workflows[0].id, onChange: (v) => p("comfyui", { workflow: v }), options: cfg.comfyui.workflows.map((w) => [w.id, w.name]) }), /* @__PURE__ */ import_react5.default.createElement("label", { className: "igsd-btn" }, "导入 JSON", /* @__PURE__ */ import_react5.default.createElement("input", { type: "file", accept: "application/json,.json", hidden: true, onChange: async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    try {
      const graph = JSON.parse(await file.text());
      if (!graph || typeof graph !== "object" || Array.isArray(graph) || graph.nodes) throw new Error("需要 ComfyUI「导出（API）」格式的 JSON");
      const id = "wf" + Date.now().toString(36);
      await patchConfig({ comfyui: { workflows: [...cfg.comfyui.workflows, { id, name: file.name.replace(/\.json$/i, ""), graph }], workflow: id } });
      toast("工作流已导入");
    } catch (err) {
      toast(String(err.message || err), "error");
    }
  } })), cfg.comfyui.workflows.length > 0 && /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", onClick: () => p("comfyui", { workflows: cfg.comfyui.workflows.filter((w) => w.id !== (cfg.comfyui.workflow || cfg.comfyui.workflows[0].id)), workflow: "" }) }, "删除当前")))), backend === "openai" && /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement(Field, { label: "API 地址" }, /* @__PURE__ */ import_react5.default.createElement(Text, { value: cfg.openai.baseURL, onCommit: (v) => p("openai", { baseURL: v }) })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "Key" }, /* @__PURE__ */ import_react5.default.createElement(KeyInput, { backend: "openai", has: data.keys.openai })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "接口" }, /* @__PURE__ */ import_react5.default.createElement(Select, { value: cfg.openai.mode, onChange: (v) => p("openai", { mode: v }), options: [["images", "/images/generations"], ["chat", "/chat/completions（回复里带图的模型）"]] })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "模型", hint: modelHint }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ import_react5.default.createElement(ModelField, { value: cfg.openai.model, options: models, emptyLabel: "（请选择）", placeholder: "gpt-image-1", onCommit: (v) => p("openai", { model: v }) })), refresh)), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "横 / 竖 / 方尺寸" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement(Text, { style: { width: "10cqw" }, value: cfg.openai.landscapeSize, onCommit: (v) => p("openai", { landscapeSize: v }) }), /* @__PURE__ */ import_react5.default.createElement(Text, { style: { width: "10cqw" }, value: cfg.openai.portraitSize, onCommit: (v) => p("openai", { portraitSize: v }) }), /* @__PURE__ */ import_react5.default.createElement(Text, { style: { width: "10cqw" }, value: cfg.openai.squareSize, onCommit: (v) => p("openai", { squareSize: v }) })))), backend === "webui" && /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement(Field, { label: "地址" }, /* @__PURE__ */ import_react5.default.createElement(Text, { value: cfg.webui.baseURL, onCommit: (v) => p("webui", { baseURL: v }) })), auth("webui"), cfg.webui.authType !== "none" && /* @__PURE__ */ import_react5.default.createElement(Field, { label: "凭据" }, /* @__PURE__ */ import_react5.default.createElement(KeyInput, { backend: "webui", has: data.keys.webui })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "底模", hint: modelHint }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ import_react5.default.createElement(ModelField, { value: cfg.webui.model, options: models, emptyLabel: "跟随服务器当前底模", placeholder: "模型标题", onCommit: (v) => p("webui", { model: v }) })), refresh)), samplers.length > 0 && /* @__PURE__ */ import_react5.default.createElement(Field, { label: "采样器 / 调度器" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement(Select, { value: cfg.webui.sampler, onChange: (v) => p("webui", { sampler: v }), options: listOptions(samplers, cfg.webui.sampler) }), /* @__PURE__ */ import_react5.default.createElement(Select, { value: cfg.webui.scheduler, onChange: (v) => p("webui", { scheduler: v }), options: listOptions(schedulers, cfg.webui.scheduler, "自动") }))), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "步数 / CFG" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement(Text, { type: "number", style: { width: "8cqw" }, value: cfg.webui.steps, onCommit: (v) => p("webui", { steps: v }) }), /* @__PURE__ */ import_react5.default.createElement(Text, { type: "number", style: { width: "8cqw" }, value: cfg.webui.cfg, onCommit: (v) => p("webui", { cfg: v }) })))), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "种子", hint: "-1 表示每张随机；填一个数字后所有图都用它，方便复现同一种构图。单张图可以在鉴赏的「改词」里另外指定。" }, /* @__PURE__ */ import_react5.default.createElement(Text, { type: "number", style: { width: "16cqw" }, value: cfg.images.seed, onCommit: (v) => p("images", { seed: v === "" ? -1 : v }) })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "连接" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", disabled: busy === "t", onClick: doTest }, busy === "t" ? "测试中…" : "测试连接"), test && /* @__PURE__ */ import_react5.default.createElement("span", { className: test.ok ? "igsd-ok" : "igsd-err" }, test.message), !test && /* @__PURE__ */ import_react5.default.createElement("span", { className: data.ready ? "igsd-ok" : "igsd-note" }, data.ready ? "✓ 可以出图" : data.readyReason))));
}
function StyleSection({ data }) {
  const cfg = data.config;
  const presets = data.presets || {};
  const artists = [...presets.artists || [], ...cfg.style.artists || []];
  const current = artists.find((a) => a.id === cfg.style.artist);
  const [draft, setDraft] = import_react5.default.useState({ name: "", text: "" });
  const key = modelKey(cfg.images.backend, cfg);
  const p = (patch) => patchConfig({ style: patch }).catch((e) => toast(e.message, "error"));
  const quality = qualityFor(cfg.style, key);
  const negative = negativeFor(cfg.style, key);
  return /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-section" }, "画风"), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "画师串", hint: current && current.text ? current.text : "不加画师串" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement(Select, { value: cfg.style.artist, onChange: (v) => p({ artist: v }), options: artists.map((a) => [a.id, a.name]) }), (cfg.style.artists || []).some((a) => a.id === cfg.style.artist) && /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", onClick: () => p({ artists: cfg.style.artists.filter((a) => a.id !== cfg.style.artist), artist: "galgame" }) }, "删除这套"))), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "存一套新的" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement("input", { className: "igsd-input", style: { width: "12cqw" }, placeholder: "名字", value: draft.name, onChange: (e) => setDraft((d) => ({ ...d, name: e.target.value })), onKeyDown: (e) => e.stopPropagation() }), /* @__PURE__ */ import_react5.default.createElement("input", { className: "igsd-input", style: { flex: 1, width: "auto" }, placeholder: "artist:xxx, artist:yyy, …", value: draft.text, onChange: (e) => setDraft((d) => ({ ...d, text: e.target.value })), onKeyDown: (e) => e.stopPropagation() }), /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", disabled: !draft.text.trim(), onClick: () => {
    const id = "a" + Date.now().toString(36);
    p({ artists: [...cfg.style.artists || [], { id, name: draft.name || "我的画风", text: draft.text.trim() }], artist: id });
    setDraft({ name: "", text: "" });
  } }, "保存并使用"))), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "质量词" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement(Toggle, { value: cfg.style.useQuality, onChange: (v) => p({ useQuality: v }) }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "igsd-note" }, "当前模型：", key))), cfg.style.useQuality && /* @__PURE__ */ import_react5.default.createElement(Field, { label: "质量词内容" }, /* @__PURE__ */ import_react5.default.createElement(Text, { value: quality, onCommit: (v) => p({ quality: { ...cfg.style.quality || {}, [key]: v } }) })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "负面词" }, /* @__PURE__ */ import_react5.default.createElement(Text, { value: negative, onCommit: (v) => p({ negative: { ...cfg.style.negative || {}, [key]: v } }) })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "" }, /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", onClick: () => {
    const q = { ...cfg.style.quality || {} };
    const n = { ...cfg.style.negative || {} };
    delete q[key];
    delete n[key];
    patchConfig({ style: { quality: q, negative: n } });
  } }, "恢复这个模型的默认质量词与负面词")));
}
function DirectorSection({ data, onDirectorLog }) {
  const cfg = data.config;
  const [llm, setLlm] = import_react5.default.useState({ providers: [], models: [] });
  import_react5.default.useEffect(() => {
    api.llm(cfg.director.provider).then(setLlm).catch(() => {
    });
  }, [cfg.director.provider]);
  const p = (patch) => patchConfig({ director: patch }).catch((e) => toast(e.message, "error"));
  return /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-section" }, "导演（后台整理）", onDirectorLog && /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", onClick: onDirectorLog }, "查看导演日志")), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "自动整理", hint: "每轮正文写完后，后台模型把它整理成场景：说话人、表情、站位、镜头、天气、选项、插画分镜。正文一字不改。" }, /* @__PURE__ */ import_react5.default.createElement(Toggle, { value: cfg.director.auto, onChange: (v) => p({ auto: v }) })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "模型", hint: "留空跟随 Tavern 的后台模型。整理用的是便宜的小模型就够。" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement(Select, { value: cfg.director.provider, onChange: (v) => p({ provider: v, model: "" }), options: [["", "跟随 Tavern"], ...llm.providers.map((x) => [x.id, x.name])] }), cfg.director.provider && (llm.models.length ? /* @__PURE__ */ import_react5.default.createElement(Select, { value: cfg.director.model, onChange: (v) => p({ model: v }), options: [["", "（请选择）"], ...llm.models.map((m) => [m.id, m.name])] }) : /* @__PURE__ */ import_react5.default.createElement(Text, { value: cfg.director.model, placeholder: "模型 ID", onCommit: (v) => p({ model: v }) })))), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "最大输出 / 温度", hint: "默认 128000（Claude Opus / Sonnet 5.5 的输出上限）。模型窗口装不下时自动往下收；模型拒绝这个值时按它报的上限重试一次。导演日志里能看到实际用了多少。" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement(Text, { type: "number", style: { width: "9cqw" }, value: cfg.director.maxTokens, onCommit: (v) => p({ maxTokens: v }) }), /* @__PURE__ */ import_react5.default.createElement(Text, { type: "number", style: { width: "7cqw" }, value: cfg.director.temperature, onCommit: (v) => p({ temperature: v }) }))), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "资料长度", hint: "给导演看多少人物卡 / 世界书（字），用来判断人物外貌。默认 1000000，等于不截断；超出模型窗口时自动缩短。" }, /* @__PURE__ */ import_react5.default.createElement(Text, { type: "number", value: cfg.director.contextChars, onCommit: (v) => p({ contextChars: v }) })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "自定义提示词", hint: "留空用内置导演提示词。可用 {{maxImages}} {{styleHint}}。" }, /* @__PURE__ */ import_react5.default.createElement("textarea", { className: "igsd-textarea", defaultValue: cfg.director.systemPrompt, onKeyDown: (e) => e.stopPropagation(), onBlur: (e) => {
    if (e.target.value !== cfg.director.systemPrompt) p({ systemPrompt: e.target.value });
  } })));
}
function ImagesSection({ data }) {
  const cfg = data.config;
  const p = (patch) => patchConfig({ images: patch }).catch((e) => toast(e.message, "error"));
  return /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-section" }, "自动配图"), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "自动插画", hint: "导演判断值得画的地方自动出 CG，挂在正文对应段落后。" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement(Toggle, { value: cfg.images.auto, onChange: (v) => p({ auto: v }) }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "igsd-note" }, "每轮最多"), /* @__PURE__ */ import_react5.default.createElement(Text, { type: "number", style: { width: "6cqw" }, value: cfg.images.maxPerTurn, onCommit: (v) => p({ maxPerTurn: v }) }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "igsd-note" }, "张"))), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "新地点背景" }, /* @__PURE__ */ import_react5.default.createElement(Toggle, { value: cfg.images.backgrounds, onChange: (v) => p({ backgrounds: v }) })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "首次登场立绘" }, /* @__PURE__ */ import_react5.default.createElement(Toggle, { value: cfg.images.portraits, onChange: (v) => p({ portraits: v }) })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "表情差分", hint: "导演用到新表情时补画一张，费用较高。" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement(Toggle, { value: cfg.images.expressions, onChange: (v) => p({ expressions: v }) }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "igsd-note" }, "每轮最多"), /* @__PURE__ */ import_react5.default.createElement(Text, { type: "number", style: { width: "6cqw" }, value: cfg.images.expressionsPerTurn, onCommit: (v) => p({ expressionsPerTurn: v }) }), /* @__PURE__ */ import_react5.default.createElement("span", { className: "igsd-note" }, "张"))), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "并发" }, /* @__PURE__ */ import_react5.default.createElement(Text, { type: "number", style: { width: "6cqw" }, value: cfg.images.concurrency, onCommit: (v) => p({ concurrency: v }) })));
}
function LookSection({ data }) {
  const cfg = data.config;
  const p = (patch) => patchConfig({ ui: patch }).catch((e) => toast(e.message, "error"));
  return /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-section" }, "界面皮肤"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-skins" }, SKINS.map((s) => /* @__PURE__ */ import_react5.default.createElement("button", { key: s.id, type: "button", className: `igsd-skin${cfg.ui.skin === s.id ? " is-on" : ""}`, onClick: () => p({ skin: s.id }) }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-skin-swatch", style: { background: s.swatch } }), /* @__PURE__ */ import_react5.default.createElement("b", null, s.name), /* @__PURE__ */ import_react5.default.createElement("span", null, s.desc)))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-section" }, "演出"), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "文字速度", hint: "每字毫秒，0 为瞬间显示。" }, /* @__PURE__ */ import_react5.default.createElement("input", { type: "range", min: "0", max: "80", value: cfg.ui.textSpeed, onChange: (e) => p({ textSpeed: Number(e.target.value) }), style: { width: "100%" } })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "自动播放间隔" }, /* @__PURE__ */ import_react5.default.createElement("input", { type: "range", min: "400", max: "4000", step: "100", value: cfg.ui.autoDelay, onChange: (e) => p({ autoDelay: Number(e.target.value) }), style: { width: "100%" } })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "天气粒子" }, /* @__PURE__ */ import_react5.default.createElement(Toggle, { value: cfg.ui.particles, onChange: (v) => p({ particles: v }) })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "打字音" }, /* @__PURE__ */ import_react5.default.createElement(Toggle, { value: cfg.ui.blip, onChange: (v) => p({ blip: v }) })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "配乐", hint: "IGS 默认曲目包（魔王魂，80 首），按导演给的情绪和地点自动换曲。" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row" }, /* @__PURE__ */ import_react5.default.createElement(Toggle, { value: cfg.ui.bgm, onChange: (v) => p({ bgm: v }) }), /* @__PURE__ */ import_react5.default.createElement("input", { type: "range", min: "0", max: "1", step: "0.05", value: cfg.ui.bgmVolume, onChange: (e) => p({ bgmVolume: Number(e.target.value) }), style: { flex: 1 } }))), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "IGS 背景库", hint: "地点能对上 IGS 自带的 72 张背景时直接用，不花生图费用。" }, /* @__PURE__ */ import_react5.default.createElement(Toggle, { value: cfg.ui.igsBackgrounds, onChange: (v) => p({ igsBackgrounds: v }) })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "素材地址", hint: "IGS 背景、配乐、字体从这里读取；离线时可以改成自己的镜像。" }, /* @__PURE__ */ import_react5.default.createElement(Text, { value: cfg.ui.assetBase, onCommit: (v) => p({ assetBase: v }) })), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "写完自动打开剧场" }, /* @__PURE__ */ import_react5.default.createElement(Toggle, { value: cfg.ui.autoOpen, onChange: (v) => p({ autoOpen: v }) })));
}
var stamp = (t) => new Date(t).toLocaleString("zh-CN", { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
function UpdateSection({ data }) {
  const u = useUpdate();
  const [busy, run] = useBusy();
  const act = (id, action, ok) => run(id, async () => setUpdate((await api.runUpdate(action)).update), ok);
  const last = u && u.last;
  return /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-section" }, "版本与更新"), !u && /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-note" }, "读取中…"), u && !u.managed && /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement(Field, { label: "当前版本" }, "v", "0.1.0"), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-note" }, u.reason, " 手动更新：在终端里进 clone 下来的 IGS_GaLSystem 文件夹执行 ", /* @__PURE__ */ import_react5.default.createElement("code", null, "git pull"), "，再重新执行一遍安装命令，然后重启 DSH。")), u && u.managed && /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement(Field, { label: "当前版本", hint: u.current.subject }, "v", "0.1.0", " · ", u.current.sha, " · ", stamp(u.current.time)), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "跟踪分支" }, u.current.tracking), u.restartRequired && /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-update-done" }, "✓ 新版本已经下载好了。重启 DSH（关掉再打开）后刷新网页，就会用上新版本。"), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "远端" }, !last ? /* @__PURE__ */ import_react5.default.createElement("span", { className: "igsd-note" }, "还没检查") : last.error ? /* @__PURE__ */ import_react5.default.createElement("span", { className: "igsd-err" }, last.error, last.fallback ? `；可以改跟 ${last.fallback} 分支` : "") : last.behind ? /* @__PURE__ */ import_react5.default.createElement("b", { className: "igsd-ok" }, "有新版本：", last.commits.length || last.behind, " 个更新（", last.target, "）") : /* @__PURE__ */ import_react5.default.createElement("span", { className: "igsd-ok" }, "已是最新"), last && /* @__PURE__ */ import_react5.default.createElement("span", { className: "igsd-note" }, "　检查于 ", stamp(last.checkedAt))), last && last.commits.length > 0 && /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-changes" }, last.commits.map((c) => /* @__PURE__ */ import_react5.default.createElement("div", { key: c.sha }, /* @__PURE__ */ import_react5.default.createElement("code", null, c.sha), /* @__PURE__ */ import_react5.default.createElement("span", null, c.subject), /* @__PURE__ */ import_react5.default.createElement("small", null, stamp(c.time))))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-row", style: { margin: "1cqw 0 0 15.2cqw" } }, /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn", disabled: Boolean(busy), onClick: () => run("check", () => loadUpdate("force")) }, busy === "check" ? "检查中…" : "检查更新"), updateAvailable(u) && /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn is-primary", disabled: Boolean(busy), onClick: () => act("apply", "apply", "已更新，重启 DSH 后生效") }, busy === "apply" ? "更新中…" : "立即更新"), last && last.gone && last.fallback && /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "igsd-btn is-primary", disabled: Boolean(busy), onClick: () => act("switch", "switch", `已切到 ${last.fallback}，重启 DSH 后生效`) }, busy === "switch" ? "切换中…" : `改跟 ${last.fallback} 并更新`)), /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-note", style: { margin: "0.8cqw 0 0 15.2cqw" } }, "只做快进更新：你本地改过的文件不会被覆盖，有冲突时会停下来把原因写在这里。")), /* @__PURE__ */ import_react5.default.createElement(Field, { label: "自动检查", hint: "打开剧场时顺便看一眼有没有新版本，最多 12 小时一次。" }, /* @__PURE__ */ import_react5.default.createElement(Toggle, { value: data.config.ui.updateCheck, onChange: (v) => patchConfig({ ui: { updateCheck: v } }).catch((e) => toast(e.message, "error")) })));
}
function Settings({ onClose, onDirectorLog = null, initialTab = "look" }) {
  const data = useConfig();
  const [tab, setTab] = import_react5.default.useState(initialTab);
  return /* @__PURE__ */ import_react5.default.createElement(
    Panel,
    {
      title: "设置",
      en: "Config",
      onClose,
      tabs: [{ id: "look", label: "外观与演出" }, { id: "director", label: "导演" }, { id: "images", label: "生图渠道" }, { id: "style", label: "画风与配图" }, { id: "about", label: "版本与更新" }],
      tab,
      onTab: setTab,
      actions: data && /* @__PURE__ */ import_react5.default.createElement("span", { className: `igsd-pill${data.ready ? "" : " igsd-err"}` }, data.ready ? "生图已就绪" : data.readyReason)
    },
    !data && /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-note" }, "读取设置中…"),
    data && tab === "look" && /* @__PURE__ */ import_react5.default.createElement(LookSection, { data }),
    data && tab === "director" && /* @__PURE__ */ import_react5.default.createElement(DirectorSection, { data, onDirectorLog }),
    data && tab === "images" && /* @__PURE__ */ import_react5.default.createElement(BackendSection, { data }),
    data && tab === "style" && /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, /* @__PURE__ */ import_react5.default.createElement(StyleSection, { data }), /* @__PURE__ */ import_react5.default.createElement(ImagesSection, { data })),
    data && tab === "about" && /* @__PURE__ */ import_react5.default.createElement(UpdateSection, { data }),
    data && /* @__PURE__ */ import_react5.default.createElement("div", { className: "igsd-note", style: { marginTop: "2cqw" } }, "Key 只存在 DSH 宿主（优先存进 DSH 凭据库：", data.secretStorage, "），浏览器只看得到「有没有填」。")
  );
}

// src/client/theater/DirectorLog.jsx
var import_react6 = __toESM(require("react"), 1);
var STATUS = { running: ["整理中", "is-running"], ok: ["完成", "is-ok"], failed: ["失败", "is-failed"], cancelled: ["已停止", "is-cancelled"] };
var REASON = { auto: "正文写完后自动整理", force: "手动重新整理" };
var SOURCE = { tavern: "跟随 Tavern 后台模型", plugin: "插件设置里指定" };
var USAGE_LABEL = { inputTokens: "输入", outputTokens: "输出", reasoningTokens: "思考", cachedInputTokens: "缓存命中", cacheReadTokens: "缓存读", cacheWriteTokens: "缓存写", totalTokens: "合计" };
var SHAPE_LABEL = { landscape: "横版", portrait: "竖版", square: "方形" };
var num = (n) => Number(n || 0).toLocaleString("en-US");
var secs = (ms) => ms >= 6e4 ? `${Math.floor(ms / 6e4)} 分 ${Math.round(ms % 6e4 / 1e3)} 秒` : `${(ms / 1e3).toFixed(1)} 秒`;
var clock = (at) => new Date(at).toLocaleString("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" });
var usageText = (usage) => Object.entries(usage || {}).map(([k, v]) => `${USAGE_LABEL[k] || k} ${num(v)}`).join(" · ");
function useNow(active) {
  const [now, setNow] = import_react6.default.useState(Date.now());
  import_react6.default.useEffect(() => {
    if (!active) return void 0;
    const t = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(t);
  }, [active]);
  return now;
}
function copy(text) {
  try {
    navigator.clipboard.writeText(text).then(() => toast("已复制"), () => toast("复制失败", "error"));
  } catch {
    toast("复制失败", "error");
  }
}
function Pre({ text, follow = false, cursor = false, empty = "（空）" }) {
  const ref = import_react6.default.useRef(null);
  const pinned = import_react6.default.useRef(true);
  import_react6.default.useLayoutEffect(() => {
    if (follow && pinned.current && ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [text, follow]);
  return /* @__PURE__ */ import_react6.default.createElement(
    "pre",
    {
      ref,
      className: `igsd-dlog-pre${cursor ? " has-cursor" : ""}`,
      onScroll: (e) => {
        const el = e.currentTarget;
        pinned.current = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
      }
    },
    text || /* @__PURE__ */ import_react6.default.createElement("span", { className: "igsd-note" }, empty)
  );
}
function Block({ label, text, children, actions }) {
  return /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-block" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-label" }, /* @__PURE__ */ import_react6.default.createElement("span", null, label), /* @__PURE__ */ import_react6.default.createElement("span", { className: "igsd-spacer" }), actions, text != null && /* @__PURE__ */ import_react6.default.createElement("button", { type: "button", className: "igsd-btn is-mini", onClick: () => copy(text) }, "复制")), children);
}
function StatusPill({ status }) {
  const [label, cls] = STATUS[status] || [status, ""];
  return /* @__PURE__ */ import_react6.default.createElement("span", { className: `igsd-dlog-status ${cls}` }, label);
}
function LogRow({ e, on, onClick }) {
  return /* @__PURE__ */ import_react6.default.createElement("button", { type: "button", className: `igsd-dlog-row${on ? " is-on" : ""}`, onClick }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-row-head" }, /* @__PURE__ */ import_react6.default.createElement("b", null, "第 ", e.turn, " 轮"), /* @__PURE__ */ import_react6.default.createElement(StatusPill, { status: e.status })), /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-row-meta" }, clock(e.at), " · ", e.status === "running" ? "进行中" : secs(e.ms), e.attempts > 1 ? ` · ${e.attempts} 次尝试` : ""), /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-row-meta" }, e.model || "（没有模型）"), e.summary && /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-row-sum" }, e.summary), e.error && /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-row-sum igsd-err" }, e.error));
}
function Chip({ k, children }) {
  return /* @__PURE__ */ import_react6.default.createElement("span", { className: "igsd-dlog-chip" }, k && /* @__PURE__ */ import_react6.default.createElement("i", null, k), children);
}
function ScriptView({ script, units }) {
  if (!script) return /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-note" }, "这次没有得到可用的脚本，看「原始输出」里模型回了什么。");
  const s = script.scene;
  const tagged = units.filter((u) => script.lines[u.id] && Object.keys(script.lines[u.id]).length).length;
  return /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement(Block, { label: "场景" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-chips" }, /* @__PURE__ */ import_react6.default.createElement(Chip, { k: "地点" }, s.location || "—"), /* @__PURE__ */ import_react6.default.createElement(Chip, { k: "时段" }, TIME_LABEL[s.time] || s.time), /* @__PURE__ */ import_react6.default.createElement(Chip, { k: "天气" }, WEATHER_LABEL[s.weather] || s.weather), /* @__PURE__ */ import_react6.default.createElement(Chip, { k: "配乐" }, MOOD_LABEL[s.mood] || s.mood), /* @__PURE__ */ import_react6.default.createElement(Chip, { k: "转场" }, TRANSITION_LABEL[s.transition] || s.transition)), s.bg && /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-note" }, "背景提示词：", s.bg)), /* @__PURE__ */ import_react6.default.createElement(Block, { label: `在场 · ${script.cast.length}` }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-chips" }, script.cast.map((c) => /* @__PURE__ */ import_react6.default.createElement(Chip, { key: c.name, k: POS_LABEL[c.pos] || c.pos }, c.name)), !script.cast.length && /* @__PURE__ */ import_react6.default.createElement("span", { className: "igsd-note" }, "没有人物上场"))), /* @__PURE__ */ import_react6.default.createElement(Block, { label: `逐句标注 · ${tagged} / ${units.length} 句` }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-lines" }, units.map((u) => {
    const l = script.lines[u.id] || {};
    const marks = [
      l.sp && /* @__PURE__ */ import_react6.default.createElement(Chip, { key: "sp", k: "说话" }, l.sp, l.as ? `（显示为 ${l.as}）` : ""),
      l.emo && /* @__PURE__ */ import_react6.default.createElement(Chip, { key: "emo", k: "表情" }, EMOTION_LABEL[l.emo] || l.emo),
      l.sym && /* @__PURE__ */ import_react6.default.createElement(Chip, { key: "sym", k: "符号" }, SYMBOL_LABEL[l.sym] || l.sym),
      l.cam && /* @__PURE__ */ import_react6.default.createElement(Chip, { key: "cam", k: "镜头" }, CAMERA_LABEL[l.cam] || l.cam),
      l.card && /* @__PURE__ */ import_react6.default.createElement(Chip, { key: "card", k: "卡片" }, CARD_LABEL[l.card] || l.card)
    ].filter(Boolean);
    return /* @__PURE__ */ import_react6.default.createElement("div", { key: u.id, className: `igsd-dlog-line${marks.length ? "" : " is-plain"}` }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "igsd-dlog-uid" }, u.id), /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-utext" }, u.type === "dialogue" ? `「${u.text}」` : u.type === "thought" ? `（${u.text}）` : u.text), /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-chips" }, marks.length ? marks : /* @__PURE__ */ import_react6.default.createElement("span", { className: "igsd-note" }, "旁白 · 无演出")));
  }))), script.choices.length > 0 && /* @__PURE__ */ import_react6.default.createElement(Block, { label: `选项 · ${script.choices.length}` }, /* @__PURE__ */ import_react6.default.createElement("ol", { className: "igsd-dlog-list-plain" }, script.choices.map((c, i) => /* @__PURE__ */ import_react6.default.createElement("li", { key: i }, c)))), /* @__PURE__ */ import_react6.default.createElement(Block, { label: `插画分镜 · ${script.images.length}` }, script.images.map((img, i) => /* @__PURE__ */ import_react6.default.createElement("div", { key: i, className: "igsd-dlog-card" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-chips" }, /* @__PURE__ */ import_react6.default.createElement(Chip, { k: "标题" }, img.title || "—"), /* @__PURE__ */ import_react6.default.createElement(Chip, { k: "位置" }, img.after, " 之后"), /* @__PURE__ */ import_react6.default.createElement(Chip, { k: "画幅" }, SHAPE_LABEL[img.shape] || img.shape)), /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-mono" }, img.tags), img.desc && /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-note" }, img.desc))), !script.images.length && /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-note" }, "导演觉得这一轮不需要插画（或设置里关了自动插画）。")), /* @__PURE__ */ import_react6.default.createElement(Block, { label: `外貌档案更新 · ${script.people.length}` }, script.people.map((p, i) => /* @__PURE__ */ import_react6.default.createElement("div", { key: i, className: "igsd-dlog-card" }, /* @__PURE__ */ import_react6.default.createElement("b", null, p.name), p.gender ? /* @__PURE__ */ import_react6.default.createElement("span", { className: "igsd-note" }, " · ", p.gender) : null, p.appearance && /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-mono" }, "建档：", p.appearance), p.change && /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-mono" }, "永久变化：", p.change), p.temp && /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-mono" }, "临时状态：", p.temp))), !script.people.length && /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-note" }, "这一轮没有新建或修改档案。")));
}
function Attempts({ attempts }) {
  if (!attempts.length) return /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-note" }, "还没有发出请求。");
  return attempts.map((a, i) => /* @__PURE__ */ import_react6.default.createElement(Block, { key: i, text: a.output, label: /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, "第 ", i + 1, " 次", a.note ? ` · ${a.note}` : "", " · 最大输出 ", num(a.maxTokens), " · ", secs(a.ms), a.usage ? ` · ${usageText(a.usage)}` : "") }, a.error && /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-err igsd-dlog-error" }, a.error), a.reasoning && /* @__PURE__ */ import_react6.default.createElement("details", { className: "igsd-dlog-think" }, /* @__PURE__ */ import_react6.default.createElement("summary", null, "模型思考 · ", num(a.reasoning.length), " 字"), /* @__PURE__ */ import_react6.default.createElement(Pre, { text: a.reasoning })), /* @__PURE__ */ import_react6.default.createElement(Pre, { text: a.output, empty: "（模型没有输出文字）" })));
}
function LogDetail({ gameId, summary }) {
  const running = summary.status === "running";
  const [entry, setEntry] = import_react6.default.useState(null);
  const [loadError, setLoadError] = import_react6.default.useState("");
  const [tab, setTab] = import_react6.default.useState(running ? "live" : "result");
  const [stopping, setStopping] = import_react6.default.useState(false);
  const now = useNow(running);
  import_react6.default.useEffect(() => {
    let off = false;
    api.directorEntry(gameId, summary.id).then((r) => {
      if (!off) {
        setEntry(r.entry);
        setLoadError("");
      }
    }, (e) => {
      if (!off) setLoadError(String(e.message || e));
    });
    return () => {
      off = true;
    };
  }, [gameId, summary.id, summary.status, running ? summary.attempts : 0]);
  import_react6.default.useEffect(() => {
    if (!running && tab === "live") setTab("result");
  }, [running]);
  const stop = async () => {
    setStopping(true);
    try {
      await api.cancel(gameId, "director", summary.id);
      toast("已停止这次整理");
    } catch (e) {
      toast(String(e.message || e), "error");
    } finally {
      setStopping(false);
    }
  };
  const tabs = running ? [["live", "实时输出"], ["prompt", "提示词"]] : [["result", "整理结果"], ["raw", `原始输出${summary.attempts > 1 ? ` · ${summary.attempts} 次` : ""}`], ["prompt", "提示词"]];
  const live = summary.live || { output: "", reasoning: "", chars: 0, note: "" };
  const elapsed = running ? Math.max(summary.ms, now - summary.at) : summary.ms;
  return /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-detail" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-head" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-title" }, "第 ", summary.turn, " 轮 ", /* @__PURE__ */ import_react6.default.createElement(StatusPill, { status: summary.status }), /* @__PURE__ */ import_react6.default.createElement("span", { className: "igsd-spacer" }), running && /* @__PURE__ */ import_react6.default.createElement("button", { type: "button", className: "igsd-btn", disabled: stopping, onClick: stop }, "停止整理")), /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-facts" }, /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement("i", null, "模型"), summary.model || "—", summary.provider ? /* @__PURE__ */ import_react6.default.createElement("span", { className: "igsd-note" }, " · ", summary.provider) : null, SOURCE[summary.source] ? /* @__PURE__ */ import_react6.default.createElement("span", { className: "igsd-note" }, "（", SOURCE[summary.source], "）") : null), /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement("i", null, "时间"), clock(summary.at), " · ", secs(elapsed), " · ", REASON[summary.reason] || summary.reason), /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement("i", null, "最大输出"), num(summary.maxTokens), " token", entry && entry.temperature != null ? ` · 温度 ${entry.temperature}` : ""), /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement("i", null, "模型窗口"), summary.window ? `${num(summary.window)} token` : "DSH 没给窗口大小，按设置原样发", entry && entry.outputDefault ? /* @__PURE__ */ import_react6.default.createElement("span", { className: "igsd-note" }, " · 模型默认输出 ", num(entry.outputDefault)) : null), entry && /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement("i", null, "资料"), entry.contextLength ? `发了 ${num(entry.contextChars)} 字（人物卡与世界书共 ${num(entry.contextLength)} 字）` : "这张卡没有人物卡 / 世界书资料"), summary.usage && /* @__PURE__ */ import_react6.default.createElement("div", null, /* @__PURE__ */ import_react6.default.createElement("i", null, "用量"), usageText(summary.usage))), summary.notes.map((n, i) => /* @__PURE__ */ import_react6.default.createElement("div", { key: i, className: "igsd-dlog-notice" }, "⚠ ", n)), summary.error && /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-err igsd-dlog-error" }, summary.error)), /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-tabs igsd-dlog-tabs" }, tabs.map(([id, label]) => /* @__PURE__ */ import_react6.default.createElement("button", { key: id, type: "button", className: `igsd-tab${tab === id ? " is-on" : ""}`, onClick: () => setTab(id) }, label))), loadError && /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-err" }, loadError), tab === "live" && /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-meter" }, /* @__PURE__ */ import_react6.default.createElement("span", { className: "igsd-dlog-dot" }), live.note || `第 ${summary.attempts || 1} 次请求`, " · 已收到 ", num(live.chars), " 字", live.chars ? "" : live.reasoning ? " · 模型在思考" : " · 等模型开口…"), live.reasoning && /* @__PURE__ */ import_react6.default.createElement(Block, { label: "模型思考（实时）" }, /* @__PURE__ */ import_react6.default.createElement(Pre, { text: live.reasoning, follow: true })), /* @__PURE__ */ import_react6.default.createElement(Block, { label: "模型输出（实时）" }, /* @__PURE__ */ import_react6.default.createElement(Pre, { text: live.output, follow: true, cursor: true, empty: "还没有输出" }))), tab === "result" && (entry ? /* @__PURE__ */ import_react6.default.createElement(ScriptView, { script: entry.script, units: entry.units || [] }) : /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-note" }, "读取中…")), tab === "raw" && (entry ? /* @__PURE__ */ import_react6.default.createElement(Attempts, { attempts: entry.attempts || [] }) : /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-note" }, "读取中…")), tab === "prompt" && (entry ? /* @__PURE__ */ import_react6.default.createElement(import_react6.default.Fragment, null, /* @__PURE__ */ import_react6.default.createElement(Block, { label: `系统提示词 · ${num((entry.system || "").length)} 字`, text: entry.system }, /* @__PURE__ */ import_react6.default.createElement(Pre, { text: entry.system })), /* @__PURE__ */ import_react6.default.createElement(Block, { label: `用户消息 · ${num((entry.user || "").length)} 字（资料 + 上一幕 + 外貌档案 + 本轮正文单元）`, text: entry.user }, /* @__PURE__ */ import_react6.default.createElement(Pre, { text: entry.user }))) : /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-note" }, "读取中…")));
}
function DirectorLog({ gameId, onClose, focusTurn = null }) {
  const { log, error } = useDirectorLog(gameId);
  const [selected, setSelected] = import_react6.default.useState("");
  const items = log ? [...log.running, ...log.entries] : [];
  const current = items.find((e) => e.id === selected) || focusTurn != null && items.find((e) => e.turn === focusTurn) || items[0];
  return /* @__PURE__ */ import_react6.default.createElement(
    Panel,
    {
      title: "导演日志",
      en: "Director",
      onClose,
      actions: log && /* @__PURE__ */ import_react6.default.createElement("span", { className: "igsd-pill" }, log.running.length ? `${log.running.length} 个整理中 · ` : "", "保留最近 ", log.keep, " 次")
    },
    !log && /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-note" }, error ? "读取失败：" + error : "读取中…"),
    log && !items.length && /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-note" }, "这一局还没有导演记录。每轮正文写完后，后台导演把它整理成场景：谁在说话、表情、站位、镜头、插画分镜、选项。整理的全过程都会记在这里。"),
    current && /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog" }, /* @__PURE__ */ import_react6.default.createElement("div", { className: "igsd-dlog-side" }, items.map((e) => /* @__PURE__ */ import_react6.default.createElement(LogRow, { key: e.id, e, on: e.id === current.id, onClick: () => setSelected(e.id) }))), /* @__PURE__ */ import_react6.default.createElement(LogDetail, { key: current.id, gameId, summary: current }))
  );
}

// src/client/theater/Theater.jsx
var POS_KEY = (gameId) => "igsd:pos:" + gameId;
var readPos = (gameId) => {
  try {
    return localStorage.getItem(POS_KEY(gameId)) || "";
  } catch {
    return "";
  }
};
var writePos = (gameId, key) => {
  try {
    localStorage.setItem(POS_KEY(gameId), key);
  } catch {
  }
};
var GLYPH_AHEAD = 12;
var GLYPH_WAIT = 1200;
var glyphsOf = (list) => ({
  body: list.map((b) => b.text).join(""),
  display: list.map((b) => (b.alias || b.speaker) + b.scene.location + (b.card ? b.text : "")).join("")
});
function fillComposer(text) {
  try {
    navigator.clipboard && navigator.clipboard.writeText(text).catch(() => {
    });
  } catch {
  }
  const candidates = [...document.querySelectorAll('textarea, [contenteditable="true"]')].filter((el2) => !el2.closest(".igsd-theater") && el2.getClientRects().length);
  const el = candidates.sort((a, b) => b.getBoundingClientRect().bottom - a.getBoundingClientRect().bottom)[0];
  if (!el) return false;
  try {
    if (el.tagName === "TEXTAREA") {
      const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set;
      setter.call(el, text);
      el.dispatchEvent(new Event("input", { bubbles: true }));
    } else {
      el.focus();
      document.execCommand("selectAll", false);
      document.execCommand("insertText", false, text);
    }
    setTimeout(() => {
      try {
        el.focus();
      } catch {
      }
    }, 60);
    return true;
  } catch {
    return false;
  }
}
function firstBeatOfTurn(beats, turn) {
  const i = beats.findIndex((b) => b.turn === turn);
  return i < 0 ? -1 : i;
}
function TheaterRoot() {
  const s = useUi();
  const data = useConfig();
  const cfg = data && data.config;
  const watching = s.open || Boolean(s.resume) || Boolean(cfg && cfg.ui.autoOpen && s.lastGameId);
  const gameId = s.open ? s.gameId : s.resume && s.resume.gameId || s.lastGameId;
  const { view, error } = useGameView(gameId, watching);
  const maxTurn = view && view.turns.length ? view.turns[view.turns.length - 1].turn : -1;
  const seen = import_react7.default.useRef({ gameId: "", turn: -1 });
  import_react7.default.useEffect(() => {
    if (!view || view.gameId !== gameId) return;
    if (seen.current.gameId !== gameId) {
      seen.current = { gameId, turn: maxTurn };
    }
    const isNew = maxTurn > seen.current.turn;
    seen.current.turn = Math.max(seen.current.turn, maxTurn);
    if (s.open || !isNew) return;
    if (s.resume && s.resume.gameId === gameId && maxTurn > s.resume.afterTurn || cfg && cfg.ui.autoOpen) openTheater(gameId, { turn: maxTurn });
  }, [view, maxTurn, s.open]);
  import_react7.default.useEffect(() => {
    if (!s.open) stopBgm();
  }, [s.open]);
  if (!s.open) return null;
  return /* @__PURE__ */ import_react7.default.createElement(Theater, { key: s.gameId, gameId: s.gameId, view, viewError: error, cfg, startTurn: s.startTurn, panel: s.panel, panelArg: s.panelArg });
}
function Theater({ gameId, view, viewError, cfg, startTurn, panel: initialPanel, panelArg }) {
  const ui0 = cfg && cfg.ui || { skin: "stellar", textSpeed: 30, autoDelay: 1400, blip: true, bgm: true, bgmVolume: 0.45, particles: true, assetBase: "" };
  const { beats, byKey } = import_react7.default.useMemo(() => buildBeats(view), [view]);
  const [index, setIndex] = import_react7.default.useState(-1);
  const [title, setTitle] = import_react7.default.useState(startTurn == null && !initialPanel);
  const [panel, setPanel] = import_react7.default.useState(initialPanel || "");
  const [settingsTab, setSettingsTab] = import_react7.default.useState(initialPanel === "settings" && typeof panelArg === "string" ? panelArg : "look");
  const update = useUpdate(Boolean(cfg && cfg.ui.updateCheck));
  const [auto, setAuto] = import_react7.default.useState(false);
  const [skip, setSkip] = import_react7.default.useState(false);
  const [hidden, setHidden] = import_react7.default.useState(false);
  const [choosing, setChoosing] = import_react7.default.useState(false);
  const [closing, setClosing] = import_react7.default.useState(false);
  const anchor = import_react7.default.useRef("");
  const rootRef = import_react7.default.useRef(null);
  const [glyphKey, setGlyphKey] = import_react7.default.useState("");
  const placed = import_react7.default.useRef(false);
  const waits = import_react7.default.useRef(0);
  import_react7.default.useEffect(() => {
    if (placed.current || !beats.length) return;
    let i = -1;
    if (startTurn != null) i = firstBeatOfTurn(beats, Number(startTurn));
    if (i < 0 && startTurn != null && waits.current++ < 1) return;
    placed.current = true;
    if (i < 0) {
      const saved = byKey.get(readPos(gameId));
      if (saved != null) i = saved;
    }
    if (i < 0) i = firstBeatOfTurn(beats, beats[beats.length - 1].turn);
    anchor.current = beats[i].key;
    setIndex(i);
  }, [beats]);
  import_react7.default.useEffect(() => {
    if (!placed.current || !anchor.current) return;
    const i = byKey.get(anchor.current);
    if (i != null && i !== index) setIndex(i);
  }, [byKey]);
  const beat = index >= 0 ? beats[index] : null;
  const speed = skip ? 0 : ui0.textSpeed;
  const holdText = Boolean(beat) && glyphKey !== beat.key;
  const [done, chars, finish] = useTypewriter(beat, title || panel ? 0 : speed, { sound: ui0.blip && !skip && !title, hold: holdText });
  const cam = useCamera(title ? null : beat);
  const people = import_react7.default.useMemo(() => new Map((view && view.cast || []).map((p) => [p.name, p])), [view]);
  const atEnd = beat && index === beats.length - 1;
  import_react7.default.useEffect(() => {
    loadSkinFonts(ui0.skin, ui0.assetBase);
  }, [ui0.skin, ui0.assetBase]);
  import_react7.default.useEffect(() => {
    if (!beat) return void 0;
    let live = true;
    loadSkinFonts(ui0.skin, ui0.assetBase).then(() => loadGlyphs(rootRef.current, glyphsOf([beat]), GLYPH_WAIT)).then(() => {
      if (live) setGlyphKey(beat.key);
    });
    return () => {
      live = false;
    };
  }, [beat && beat.key, ui0.skin, ui0.assetBase]);
  import_react7.default.useEffect(() => {
    if (index < 0) return;
    loadSkinFonts(ui0.skin, ui0.assetBase).then(() => loadGlyphs(rootRef.current, glyphsOf(beats.slice(index + 1, index + 1 + GLYPH_AHEAD))));
  }, [index, beats, ui0.skin, ui0.assetBase]);
  const scene = beat ? beat.scene : (beats[beats.length - 1] || {}).scene;
  const track = import_react7.default.useMemo(() => ui0.bgm ? pickBgm(scene, ui0.assetBase) : null, [ui0.bgm, ui0.assetBase, scene && scene.mood, scene && scene.location]);
  import_react7.default.useEffect(() => {
    if (track || !ui0.bgm) playBgm(track, ui0.bgmVolume);
  }, [track && track.id, ui0.bgm, ui0.bgmVolume]);
  const go = import_react7.default.useCallback((i) => {
    if (!beats.length) return;
    const next = Math.max(0, Math.min(beats.length - 1, i));
    anchor.current = beats[next].key;
    writePos(gameId, beats[next].key);
    setIndex(next);
  }, [beats, gameId]);
  const advance = import_react7.default.useCallback(() => {
    if (!beat) return;
    if (!done) {
      finish();
      return;
    }
    if (atEnd) {
      setAuto(false);
      setSkip(false);
      setChoosing(true);
      return;
    }
    sfx("page");
    go(index + 1);
  }, [beat, done, atEnd, index, go, finish]);
  import_react7.default.useEffect(() => {
    if (title || panel || choosing || !beat) return void 0;
    if (skip) {
      const t = setTimeout(() => atEnd ? setSkip(false) : go(index + 1), 70);
      return () => clearTimeout(t);
    }
    if (auto && done && !atEnd) {
      const t = setTimeout(() => go(index + 1), ui0.autoDelay + chars.length * 18);
      return () => clearTimeout(t);
    }
    return void 0;
  }, [auto, skip, done, index, title, panel, choosing, atEnd]);
  const prevLen = import_react7.default.useRef(beats.length);
  import_react7.default.useEffect(() => {
    if (beats.length > prevLen.current && choosing && index === prevLen.current - 1) {
      setChoosing(false);
      go(index + 1);
    }
    prevLen.current = beats.length;
  }, [beats.length]);
  const close = import_react7.default.useCallback(() => {
    setClosing(true);
    stopBgm();
    setTimeout(() => ui.set({ open: false }), 320);
  }, []);
  const choose = (text) => {
    const ok = fillComposer(text);
    toast(ok ? "已填进输入框，发送后剧场会自动接着演" : "已复制到剪贴板，粘贴到输入框发送即可");
    ui.set({ resume: { gameId, afterTurn: beat ? beat.turn : -1 } });
    setChoosing(false);
    close();
  };
  import_react7.default.useEffect(() => {
    const onKey = (e) => {
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable)) return;
      if (e.key === "Escape") {
        e.preventDefault();
        if (panel) setPanel("");
        else if (choosing) setChoosing(false);
        else if (hidden) setHidden(false);
        else close();
        return;
      }
      if (panel || title) return;
      if (e.key === " " || e.key === "Enter" || e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        if (hidden) setHidden(false);
        else if (!choosing) advance();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "a" || e.key === "A") setAuto((v) => !v);
      else if (e.key === "h" || e.key === "H") setHidden((v) => !v);
      else if (e.key === "l" || e.key === "L") setPanel("log");
      else if (e.key === "Control") setSkip(true);
    };
    const onUp = (e) => {
      if (e.key === "Control") setSkip(false);
    };
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("keyup", onUp, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("keyup", onUp, true);
    };
  }, [advance, go, index, panel, title, choosing, hidden, close]);
  const directing = view && view.turns.some((t) => t.status === "directing");
  const queue = view && view.queue || { running: [], waiting: [] };
  const drawing = queue.running.filter((id) => id.includes(":" + gameId + ":")).length + queue.waiting.filter((id) => id.includes(":" + gameId + ":")).length;
  const speakerPerson = beat && people.get(beat.speaker);
  const color = beat && beat.speaker === "我" ? "var(--accent2)" : speakerPerson ? speakerPerson.color : "";
  const progressInTurn = beat ? (() => {
    const all = beats.filter((b) => b.turn === beat.turn);
    return (all.indexOf(beat) + 1) / all.length;
  })() : 0;
  const status = beat ? beat.status === "directing" ? `第 ${beat.turn} 轮 · 导演整理中，先按原文演` : beat.status === "failed" ? `第 ${beat.turn} 轮 · 没整理好，按原文演` : "" : "";
  const quick = {
    speed,
    emoLabel: beat && beat.emo ? EMOTION_LABEL[beat.emo] : "",
    items: [
      { id: "auto", label: "AUTO", title: "自动播放（A）", on: auto, run: () => {
        setAuto((v) => !v);
        setSkip(false);
      } },
      { id: "skip", label: "SKIP", title: "快进（按住 Ctrl）", on: skip, run: () => {
        setSkip((v) => !v);
        setAuto(false);
      } },
      { id: "log", label: "LOG", title: "回想（L）", run: () => setPanel("log") },
      { id: "director", label: "DIR", title: "导演日志：每次后台整理的提示词、实时输出和结果", run: () => setPanel("director") },
      { id: "cg", label: "CG", title: "鉴赏", run: () => setPanel("gallery") },
      { id: "cast", label: "CAST", title: "人物志", run: () => setPanel("cast") },
      { id: "hide", label: "HIDE", title: "隐藏界面（H）", run: () => setHidden(true) },
      { id: "config", label: "CONFIG", title: "设置", run: () => setPanel("settings") }
    ]
  };
  const stageBeat = beat || (beats.length ? beats[beats.length - 1] : null);
  const stageScene = stageBeat ? stageBeat.scene : { location: "", time: "night", weather: "stars", mood: "calm" };
  const latest = beats.length ? beats[beats.length - 1] : null;
  const cardTitle = view && view.card && view.card.name || "IGS Theater";
  const titleMenu = [
    beats.length && readPos(gameId) ? { id: "continue", label: "继续", en: "Continue", run: () => {
      setTitle(false);
      sfx("open");
    } } : null,
    latest ? { id: "latest", label: "最新一幕", en: "Latest", run: () => {
      go(firstBeatOfTurn(beats, latest.turn));
      setTitle(false);
      sfx("open");
    } } : null,
    !beats.length && gameId ? { id: "opening", label: "整理开场白", en: "Prologue", run: async () => {
      try {
        await api.direct(gameId, 0).catch(() => api.direct(gameId, 1));
        toast("开场已整理");
        setTitle(false);
      } catch (e) {
        toast(String(e.message || e), "error");
      }
    } } : null,
    beats.length ? { id: "log", label: "回想", en: "Backlog", run: () => setPanel("log") } : null,
    gameId ? { id: "director", label: "导演日志", en: "Director", run: () => setPanel("director") } : null,
    { id: "gallery", label: "鉴赏", en: "Gallery", run: () => setPanel("gallery") },
    { id: "cast", label: "人物志", en: "Characters", run: () => setPanel("cast") },
    updateAvailable(update) ? { id: "update", label: "更新插件", en: "New version", badge: true, run: () => {
      setSettingsTab("about");
      setPanel("settings");
    } } : null,
    { id: "settings", label: "设置", en: "Config", run: () => {
      setSettingsTab("look");
      setPanel("settings");
    } },
    { id: "quit", label: "回到聊天", en: "Return", run: close }
  ].filter(Boolean);
  return /* @__PURE__ */ import_react7.default.createElement("div", { ref: rootRef, className: `igsd-theater${closing ? " is-closing" : ""}${hidden ? " igsd-ui-hidden" : ""}`, "data-skin": ui0.skin, role: "dialog", "aria-label": "IGS 剧场" }, /* @__PURE__ */ import_react7.default.createElement(
    "div",
    {
      className: "igsd-stage",
      onClick: () => {
        if (hidden) {
          setHidden(false);
          return;
        }
        if (!title && !panel && !choosing) advance();
      },
      onWheel: (e) => {
        if (!title && !panel && e.deltaY < -30) setPanel("log");
      }
    },
    /* @__PURE__ */ import_react7.default.createElement("div", { className: "igsd-camera", "data-cam": cam }, /* @__PURE__ */ import_react7.default.createElement(Backdrop, { scene: stageScene, view, config: cfg, transition: stageBeat ? stageBeat.sceneEnter ? stageBeat.transition : "dissolve" : "dissolve" }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "igsd-grade", "data-time": stageScene.time }), stageBeat && /* @__PURE__ */ import_react7.default.createElement(Cast, { beat: title ? { ...stageBeat, speaker: "", sym: "" } : stageBeat, view }), stageBeat && !title && /* @__PURE__ */ import_react7.default.createElement(CgLayer, { beat: stageBeat }), /* @__PURE__ */ import_react7.default.createElement(Particles, { weather: stageScene.weather, enabled: ui0.particles !== false }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "igsd-vignette" })),
    beat && !title && /* @__PURE__ */ import_react7.default.createElement(Flash, { beat }),
    beat && !title && /* @__PURE__ */ import_react7.default.createElement(TitleCard, { beat }),
    !title && beat && /* @__PURE__ */ import_react7.default.createElement("div", { className: "igsd-hud" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "igsd-hud-bar" }), /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement("div", { className: "igsd-hud-place" }, beat.scene.location || `第 ${beat.turn} 轮`), /* @__PURE__ */ import_react7.default.createElement("div", { className: "igsd-hud-meta" }, /* @__PURE__ */ import_react7.default.createElement("span", null, TIME_LABEL[beat.scene.time] || ""), beat.scene.weather && beat.scene.weather !== "clear" && /* @__PURE__ */ import_react7.default.createElement("span", null, WEATHER_LABEL[beat.scene.weather]), beat.scene.mood && /* @__PURE__ */ import_react7.default.createElement("span", null, "♪ ", MOOD_LABEL[beat.scene.mood])))),
    !title && /* @__PURE__ */ import_react7.default.createElement("div", { className: "igsd-topright", onClick: (e) => e.stopPropagation() }, directing && /* @__PURE__ */ import_react7.default.createElement("button", { type: "button", className: "igsd-pill is-busy is-link", title: "看导演正在写什么", onClick: () => setPanel("director") }, "导演整理中 ›"), drawing > 0 && /* @__PURE__ */ import_react7.default.createElement("span", { className: "igsd-pill is-busy" }, "出图 ", drawing), track && /* @__PURE__ */ import_react7.default.createElement("span", { className: "igsd-pill", title: `${track.name} — ${track.credit}` }, "♪ ", track.name), viewError && /* @__PURE__ */ import_react7.default.createElement("span", { className: "igsd-pill igsd-err", title: viewError }, "连接中断，重连中"), /* @__PURE__ */ import_react7.default.createElement("button", { type: "button", className: "igsd-iconbtn", title: "回到聊天（Esc）", onClick: close }, "✕")),
    beat && !title && beat.card && /* @__PURE__ */ import_react7.default.createElement(SceneCard, { beat }),
    beat && !title && /* @__PURE__ */ import_react7.default.createElement(DialogBox, { beat, chars, done, waiting: holdText, color, quick, progress: progressInTurn, status, hiddenText: Boolean(beat.card) }),
    !beat && !title && /* @__PURE__ */ import_react7.default.createElement("div", { className: "igsd-choices" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "igsd-choices-title" }, view ? "这一局还没有可以演的内容" : "读取中")),
    choosing && beat && /* @__PURE__ */ import_react7.default.createElement(Choices, { choices: beat.choices, waiting: directing, onChoose: choose, onBack: close }),
    title && /* @__PURE__ */ import_react7.default.createElement("div", { className: "igsd-title", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "igsd-title-kicker" }, "DSH Tavern × IGS Galgame"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "igsd-title-logo" }, cardTitle), /* @__PURE__ */ import_react7.default.createElement("div", { className: "igsd-title-sub" }, latest ? `第 ${latest.turn} 轮 · ${latest.scene.location || "—"} · ${TIME_LABEL[latest.scene.time] || ""}` : gameId ? "开场白还没有整理" : "先在聊天里打开一局"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "igsd-title-menu" }, titleMenu.map((m, i) => /* @__PURE__ */ import_react7.default.createElement("button", { key: m.id, type: "button", className: m.badge ? "is-new" : void 0, style: { "--i": i }, onMouseEnter: () => sfx("hover"), onClick: () => {
      sfx("select");
      m.run();
    } }, m.label, /* @__PURE__ */ import_react7.default.createElement("span", null, m.en)))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "igsd-title-foot" }, "IGS 背景与配乐：IGS_GaLSystem 默认素材包 · 配乐 魔王魂 · 字体 霞鹜 / 汇文 / 思源（OFL）")),
    panel === "log" && /* @__PURE__ */ import_react7.default.createElement(Backlog, { beats, index, gameId, onClose: () => setPanel(""), onJump: (i) => {
      go(i);
      setPanel("");
      setTitle(false);
    } }),
    panel === "gallery" && /* @__PURE__ */ import_react7.default.createElement(Gallery, { view, gameId, focusId: panelArg, onClose: () => setPanel("") }),
    panel === "cast" && /* @__PURE__ */ import_react7.default.createElement(CastPanel, { view, gameId, onClose: () => setPanel("") }),
    panel === "director" && /* @__PURE__ */ import_react7.default.createElement(DirectorLog, { gameId, focusTurn: panelArg, onClose: () => setPanel("") }),
    panel === "settings" && /* @__PURE__ */ import_react7.default.createElement(Settings, { initialTab: settingsTab, onClose: () => setPanel(""), onDirectorLog: gameId ? () => setPanel("director") : null })
  ));
}
function Toast() {
  const s = useUi();
  if (!s.toast) return null;
  return /* @__PURE__ */ import_react7.default.createElement("div", { className: `igsd-toast${s.toast.tone === "error" ? " is-error" : ""}`, key: s.toast.at }, s.toast.text);
}

// src/client/chat/ChatCards.jsx
var import_react8 = __toESM(require("react"), 1);
var CLOCK = { dawn: "05:40", morning: "07:30", noon: "12:00", afternoon: "15:20", dusk: "17:50", evening: "19:30", night: "22:10", midnight: "00:40" };
var TIME_TINT = { dawn: "#9a5c8f", morning: "#5aa6e8", noon: "#3e8fe0", afternoon: "#c58b4a", dusk: "#b14f6e", evening: "#4f2f78", night: "#121a44", midnight: "#070b24" };
function SceneCardInline({ item, gameId, turn }) {
  rememberGame(gameId);
  const config = useConfig();
  const [busy, setBusy] = import_react8.default.useState(false);
  const data = item && item.data || {};
  const t = data.turn ?? turn;
  const pending = item && item.status === "pending";
  const scene = { location: data.location, time: data.time };
  const bg = config && config.config.ui.igsBackgrounds && data.location ? igsBackground(scene, config.config.ui.assetBase) : "";
  const retry = async () => {
    setBusy(true);
    try {
      await api.direct(gameId, t, true);
      toast("已重新整理");
    } catch (e) {
      toast(String(e.message || e), "error");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-chat" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: `igsd-scene${pending ? " is-pending" : ""}` }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-scene-bg", style: { backgroundImage: bg ? `url("${bg}")` : `linear-gradient(135deg, ${TIME_TINT[data.time] || "#2a2350"}, #0d0b1c)` } }), /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-scene-clock" }, /* @__PURE__ */ import_react8.default.createElement("b", null, CLOCK[data.time] || "--:--"), /* @__PURE__ */ import_react8.default.createElement("span", null, data.time ? TIME_LABEL[data.time] || data.time : "scene")), /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-scene-main" }, pending ? /* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-scene-loc" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "igsd-dots" }, "导演正在整理这一幕")), /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-scene-sum" }, "正文已经可以读了。说话人、表情、站位、镜头和插画在后台排，整理好后剧场里会自动更新。"), /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-scene-actions" }, /* @__PURE__ */ import_react8.default.createElement("button", { type: "button", className: "igsd-play", onClick: () => openTheater(gameId, { turn: t }) }, "先看起来"), /* @__PURE__ */ import_react8.default.createElement("button", { type: "button", className: "igsd-ghost", onClick: () => openTheater(gameId, { panel: "director", panelArg: t }) }, "看导演在写什么"))) : data.error ? /* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-scene-loc" }, "这一幕没整理好"), /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-scene-err" }, String(data.error).slice(0, 160)), /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-scene-actions" }, /* @__PURE__ */ import_react8.default.createElement("button", { type: "button", className: "igsd-play", onClick: () => openTheater(gameId, { turn: t }) }, "照原文演"), /* @__PURE__ */ import_react8.default.createElement("button", { type: "button", className: "igsd-ghost", disabled: busy, onClick: retry }, busy ? "整理中…" : "重试"), /* @__PURE__ */ import_react8.default.createElement("button", { type: "button", className: "igsd-ghost", onClick: () => openTheater(gameId, { panel: "director", panelArg: t }) }, "导演日志"))) : /* @__PURE__ */ import_react8.default.createElement(import_react8.default.Fragment, null, /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-scene-loc" }, data.location || `第 ${t} 轮`), /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-scene-chips" }, data.weather && data.weather !== "clear" && /* @__PURE__ */ import_react8.default.createElement("span", { className: "igsd-chip" }, WEATHER_LABEL[data.weather] || data.weather), data.mood && /* @__PURE__ */ import_react8.default.createElement("span", { className: "igsd-chip" }, "♪ ", MOOD_LABEL[data.mood] || data.mood), (data.cast || []).map((n) => /* @__PURE__ */ import_react8.default.createElement("span", { key: n, className: "igsd-chip", style: { "--c": nameColor(n) } }, /* @__PURE__ */ import_react8.default.createElement("i", null), n)), data.choices > 0 && /* @__PURE__ */ import_react8.default.createElement("span", { className: "igsd-chip" }, "◆ ", data.choices, " 个选项")), data.summary && /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-scene-sum" }, data.summary), /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-scene-actions" }, /* @__PURE__ */ import_react8.default.createElement("button", { type: "button", className: "igsd-play", onClick: () => openTheater(gameId, { turn: t }) }, "进入剧场"), /* @__PURE__ */ import_react8.default.createElement("button", { type: "button", className: "igsd-ghost", onClick: () => openTheater(gameId, { panel: "cast" }) }, "人物志"), /* @__PURE__ */ import_react8.default.createElement("button", { type: "button", className: "igsd-ghost", disabled: busy, onClick: retry }, busy ? "整理中…" : "重新整理"))))));
}
var RATIO = { landscape: "1216 / 832", portrait: "832 / 1216", square: "1 / 1" };
function CgCardInline({ item, gameId }) {
  rememberGame(gameId);
  const data = item && item.data || {};
  const [zoom, setZoom] = import_react8.default.useState(false);
  const [busy, setBusy] = import_react8.default.useState("");
  const src = data.assetId ? assetUrl(data.assetId) : item && item.url;
  const versions = Number(data.v) || 0;
  const current = Number.isInteger(data.current) ? data.current : versions - 1;
  const act = async (id, fn, ok) => {
    setBusy(id);
    try {
      await fn();
      if (ok) toast(ok);
    } catch (e) {
      toast(String(e.message || e), "error");
    } finally {
      setBusy("");
    }
  };
  const redraw = () => act("r", () => api.render(gameId, data.imageId, {}), "已加入出图队列");
  if (item && item.status === "failed" && !src) {
    return /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-chat" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-cgcard" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-cgcard-fail" }, /* @__PURE__ */ import_react8.default.createElement("span", null, "🎨 插画没画成：", String(item.error || "未知原因").slice(0, 140)), /* @__PURE__ */ import_react8.default.createElement("button", { type: "button", className: "igsd-ghost", disabled: busy === "r", onClick: redraw }, "重画"), /* @__PURE__ */ import_react8.default.createElement("button", { type: "button", className: "igsd-ghost", onClick: () => openTheater(gameId, { panel: "gallery", panelArg: data.imageId }) }, "改词"))));
  }
  if (!src || item && item.status === "pending" && !src) {
    return /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-chat" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-cgcard" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-cgcard-wait", style: { aspectRatio: RATIO[data.shape] || RATIO.landscape } }, /* @__PURE__ */ import_react8.default.createElement("span", null, "正在绘制", item && item.caption ? `「${item.caption}」` : "插画"))));
  }
  return /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-chat" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-cgcard" }, /* @__PURE__ */ import_react8.default.createElement("img", { key: src, src, alt: item && item.caption || "插画", loading: "lazy", onClick: () => setZoom(true) }), /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-cgcard-bar" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "igsd-cap" }, item && item.caption || "CG", versions > 1 ? ` · ${current + 1}/${versions}` : "", item && item.status === "pending" ? " · 重画中…" : ""), versions > 1 && /* @__PURE__ */ import_react8.default.createElement("button", { type: "button", disabled: current <= 0 || busy === "v", onClick: () => act("v", () => api.version(gameId, data.imageId, current - 1)) }, "‹"), versions > 1 && /* @__PURE__ */ import_react8.default.createElement("button", { type: "button", disabled: current >= versions - 1 || busy === "v", onClick: () => act("v", () => api.version(gameId, data.imageId, current + 1)) }, "›"), /* @__PURE__ */ import_react8.default.createElement("button", { type: "button", disabled: busy === "r" || item && item.status === "pending", onClick: redraw }, "重画"), /* @__PURE__ */ import_react8.default.createElement("button", { type: "button", onClick: () => openTheater(gameId, { panel: "gallery", panelArg: data.imageId }) }, "改词"))), zoom && /* @__PURE__ */ import_react8.default.createElement("div", { className: "igsd-chat-lightbox", onClick: () => setZoom(false) }, /* @__PURE__ */ import_react8.default.createElement("img", { src, alt: "" })));
}

// src/client/index.jsx
var PLUGIN = "dsh-tavern-igs";
var KIND_SCENE = PLUGIN + "/scene";
var KIND_CG = PLUGIN + "/cg";
function injectStyles() {
  if (document.getElementById("igsd-styles")) return () => {
  };
  const style = document.createElement("style");
  style.id = "igsd-styles";
  style.textContent = [igs_fx_default, theater_default, skins_default, chat_default].join("\n");
  document.head.appendChild(style);
  return () => style.remove();
}
function Overlay() {
  return /* @__PURE__ */ import_react9.default.createElement(import_react9.default.Fragment, null, /* @__PURE__ */ import_react9.default.createElement(TheaterRoot, null), /* @__PURE__ */ import_react9.default.createElement(Toast, null));
}
function Launcher(props) {
  const wide = !props || props.wide !== false;
  return /* @__PURE__ */ import_react9.default.createElement(
    "button",
    {
      type: "button",
      title: "IGS 剧场：把对话当 galgame 看",
      onClick: () => openTheater(),
      style: { display: "flex", alignItems: "center", gap: 8, justifyContent: wide ? "flex-start" : "center", width: "100%", margin: "2px 0", background: "transparent", border: "none", color: "inherit", cursor: "pointer", padding: wide ? "8px 10px" : "8px 0", borderRadius: 8, fontSize: 13, textAlign: "left" }
    },
    /* @__PURE__ */ import_react9.default.createElement("span", { style: { fontSize: 15, lineHeight: 1 } }, "🎬"),
    wide ? /* @__PURE__ */ import_react9.default.createElement("span", null, "IGS 剧场") : null
  );
}
function UpdateLine() {
  const u = useUpdate();
  const text = !u ? "" : !u.managed ? "" : u.restartRequired ? "新版本已下载，重启 DSH 后生效" : updateAvailable(u) ? `有新版本（${u.last.commits.length || u.last.behind} 个更新）` : "";
  return /* @__PURE__ */ import_react9.default.createElement("div", { className: "igsd-settings-row" }, /* @__PURE__ */ import_react9.default.createElement("span", { style: { opacity: 0.7 } }, "v", "0.1.0", u && u.managed ? ` · ${u.current.sha}` : ""), text && /* @__PURE__ */ import_react9.default.createElement("span", { style: { color: "#d9822b" } }, "● ", text), /* @__PURE__ */ import_react9.default.createElement("button", { type: "button", className: "igsd-ghost", onClick: () => openTheater("", { panel: "settings", panelArg: "about" }) }, "版本与更新"));
}
function SettingsSection() {
  const data = useConfig();
  if (!data) return /* @__PURE__ */ import_react9.default.createElement("div", { className: "igsd-settings-card" }, "读取中…");
  const cfg = data.config;
  const toggle = (section, key) => patchConfig(section ? { [section]: { [key]: !cfg[section][key] } } : { [key]: !cfg[key] }).catch((e) => toast(e.message, "error"));
  const box = { display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer" };
  return /* @__PURE__ */ import_react9.default.createElement("div", { className: "igsd-settings-card" }, /* @__PURE__ */ import_react9.default.createElement("h3", null, "🎬 IGS 剧场 ", /* @__PURE__ */ import_react9.default.createElement("span", { style: { fontSize: 12, opacity: 0.6, fontWeight: 400 } }, "v", "0.1.0")), /* @__PURE__ */ import_react9.default.createElement("p", null, "正文照常流式输出；每轮写完后，后台导演把它整理成视觉小说场景（说话人、表情、站位、镜头、天气、选项），并按柏宝绘的方式自动配插画、背景和立绘。打开剧场就能当 galgame 看。"), /* @__PURE__ */ import_react9.default.createElement("div", { className: "igsd-settings-row" }, /* @__PURE__ */ import_react9.default.createElement("label", { style: box }, /* @__PURE__ */ import_react9.default.createElement("input", { type: "checkbox", checked: cfg.enabled, onChange: () => toggle("", "enabled") }), "启用"), /* @__PURE__ */ import_react9.default.createElement("label", { style: box }, /* @__PURE__ */ import_react9.default.createElement("input", { type: "checkbox", checked: cfg.director.auto, onChange: () => toggle("director", "auto") }), "每轮自动整理"), /* @__PURE__ */ import_react9.default.createElement("label", { style: box }, /* @__PURE__ */ import_react9.default.createElement("input", { type: "checkbox", checked: cfg.images.auto, onChange: () => toggle("images", "auto") }), "自动配图"), /* @__PURE__ */ import_react9.default.createElement("label", { style: box }, /* @__PURE__ */ import_react9.default.createElement("input", { type: "checkbox", checked: cfg.ui.autoOpen, onChange: () => toggle("ui", "autoOpen") }), "写完自动打开剧场")), /* @__PURE__ */ import_react9.default.createElement("div", { className: "igsd-settings-row" }, /* @__PURE__ */ import_react9.default.createElement("span", { style: { color: data.ready ? "#4caf7a" : "#d9822b" } }, data.ready ? "● 生图已就绪" : "● " + data.readyReason), /* @__PURE__ */ import_react9.default.createElement("button", { type: "button", className: "igsd-play", onClick: () => openTheater("", { panel: "settings" }) }, "打开完整设置")), /* @__PURE__ */ import_react9.default.createElement(UpdateLine, null));
}
var name = PLUGIN;
var inject = ["slots"];
function apply(ctx2) {
  const effect = (fn, label) => typeof ctx2.effect === "function" ? ctx2.effect(fn, label) : fn();
  effect(injectStyles, `${PLUGIN}: styles`);
  const seat = (slot, options, Component) => {
    try {
      ctx2.slots && ctx2.slots.inject && ctx2.slots.inject(slot, () => ctx2.slots.register({ name: slot, ...options }, Component));
    } catch (error) {
      try {
        console.warn(`[${PLUGIN}] ${slot} 注册失败：`, error && error.message);
      } catch {
      }
    }
  };
  seat("shell.overlay", { id: PLUGIN + "-theater", order: 96 }, Overlay);
  seat("sidebar.footer.action", { id: PLUGIN + "-launcher", order: 47, label: "IGS 剧场" }, Launcher);
  seat("settings.section", { id: PLUGIN, order: 46, label: () => "IGS 剧场" }, SettingsSection);
  if (typeof ctx2.inject !== "function") return;
  ctx2.inject(["tavernUi"], (owner) => {
    const ui2 = owner.tavernUi;
    if (!ui2 || !(ui2.apiVersion >= 1)) {
      try {
        console.warn(`[${PLUGIN}] 当前 Tavern 没有 tavernUi 接口，剧场入口不可用`);
      } catch {
      }
      return;
    }
    const keep = (off, label) => {
      if (typeof off === "function") owner.effect ? owner.effect(() => off, label) : null;
    };
    const guard = (render) => (args) => {
      try {
        return render(args || {});
      } catch (error) {
        try {
          console.warn(`[${PLUGIN}] 渲染失败：`, error && error.message);
        } catch {
        }
        return null;
      }
    };
    keep(ui2.registerMediaRenderer(KIND_SCENE, guard(({ item, gameId, turn }) => /* @__PURE__ */ import_react9.default.createElement(SceneCardInline, { item, gameId, turn }))), `${PLUGIN}: scene card`);
    keep(ui2.registerMediaRenderer(KIND_CG, guard(({ item, gameId }) => /* @__PURE__ */ import_react9.default.createElement(CgCardInline, { item, gameId }))), `${PLUGIN}: cg card`);
    keep(ui2.registerMessageAction({
      id: PLUGIN + "-theater",
      label: "🎬 剧场",
      when: (c) => Boolean(c && c.gameId) && c.settled !== false,
      run: async (c) => {
        rememberGame(c.gameId);
        openTheater(c.gameId, { turn: c.turn });
        api.direct(c.gameId, c.turn).catch((error) => toast("整理失败：" + (error && error.message), "error"));
      }
    }), `${PLUGIN}: message action theater`);
    keep(ui2.registerMessageAction({
      id: PLUGIN + "-illustrate",
      label: "🖼 配一张",
      when: (c) => Boolean(c && c.gameId) && c.settled !== false,
      run: async (c) => {
        try {
          await api.direct(c.gameId, c.turn);
          await api.addImage(c.gameId, c.turn, "", {});
          toast("已安排一张插画，画好后出现在这条消息里");
        } catch (error) {
          toast("配图失败：" + (error && error.message), "error");
        }
      }
    }), `${PLUGIN}: message action illustrate`);
    if (typeof ui2.registerComposerAction === "function") {
      keep(ui2.registerComposerAction({
        id: PLUGIN + "-theater",
        label: "🎬 剧场",
        when: (c) => Boolean(c && c.gameId),
        run: (c) => {
          rememberGame(c.gameId);
          openTheater(c.gameId, { turn: c.turn });
        }
      }), `${PLUGIN}: composer action`);
    }
  });
}

    } catch (error) {
      try { console.warn('[dsh-tavern-igs] 浏览器半边加载失败，已停用：', error && error.message); } catch (_) {}
      module.exports = { name: 'dsh-tavern-igs', inject: [], apply: function () {} };
    }
    return module.exports;
  },
});
