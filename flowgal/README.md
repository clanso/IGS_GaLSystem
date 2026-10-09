# FlowGal · DSH Tavern 视觉小说插件

> **已搬到独立仓库：https://github.com/clanso/flowgal** 。这里不再更新。重装方法见新仓库 README 的「从旧版本搬过来」：先 `pnpm dsh plugin --profile web remove` 掉旧插件，再 `git clone https://github.com/clanso/flowgal.git` 并 `pnpm dsh plugin --profile web add ./flowgal`。设置、Key、存档都会保留。

把 [DSH Tavern](https://github.com/flizzywine/dsh-tavern) 的聊天变成一部会自己排版、配图、配乐的视觉小说。

**正文先出，演出后到。** Tavern 照常流式输出正文，你可以立刻读；这一轮写完后，插件在后台让一个「导演」模型把正文整理成场景脚本：谁在说话、什么表情、站在哪、镜头怎么走、要不要插一张 CG、给你几个选项。整理好之前剧场就能按原文先演，整理好后画面会原地更新。

![聊天里的场景卡](docs/screenshots/01-chat-scene-card.webp)

![剧场：对白、立绘、漫画符号](docs/screenshots/04-dialogue.webp)

| | |
|---|---|
| ![标题画面](docs/screenshots/03-title.webp) | ![CG](docs/screenshots/05-cg.webp) |
| ![两人同框、萤火](docs/screenshots/06-two-actors.webp) | ![便条卡片、暴雨](docs/screenshots/07-note-card.webp) |
| ![选项](docs/screenshots/08-choices.webp) | ![鉴赏](docs/screenshots/10-gallery.webp) |
| ![改词](docs/screenshots/12-prompt-editor.webp) | ![人物志](docs/screenshots/13-cast.webp) |
| ![生图渠道](docs/screenshots/16-settings-backend.webp) | ![画风](docs/screenshots/17-settings-style.webp) |
| ![夜金皮肤](docs/screenshots/18-skin-noir.webp) | ![赛博皮肤](docs/screenshots/18-skin-cyber.webp) |
| ![导演整理中（聊天）](docs/screenshots/19-chat-directing.webp) | ![导演整理中（剧场）](docs/screenshots/20-theater-directing.webp) |
| ![导演日志：实时输出](docs/screenshots/22-director-live.webp) | ![导演日志：整理结果](docs/screenshots/23-director-result.webp) |
| ![导演日志：提示词](docs/screenshots/24-director-prompt.webp) | ![NovelAI V5：透明底立绘、引导缩放、种子](docs/screenshots/26-settings-nai-v5.webp) |

<p align="center"><img src="docs/screenshots/21-mobile.webp" width="300" alt="手机竖屏"></p>

> 截图来自本目录的预览环境：没有生图 Key，所以 CG 用 IGS 背景库的图临时代替，人物用按外貌档案画的剪影代替立绘。接上 NovelAI / ComfyUI 等渠道后，这些位置是真正生成的 CG 和立绘。

## 安装

需要 DSH Tavern（插件接口 v1，`dsh >=0.1.0-rc.8`）。

```sh
git clone https://github.com/Anyno001/IGS_GaLSystem.git
pnpm dsh plugin --profile web add ./IGS_GaLSystem/flowgal
```

仓库里已经带了构建好的 `client.js`，不需要自己打包。改了 `src/client/` 之后再重建：

```sh
cd flowgal
npm install
npm run build     # 生成 client.js（会从 ../app/src 复用 IGS 的漫画符号样式）
npm test
```

装好后，Tavern 侧栏底部会多一个「🎬 FlowGal」按钮；设置 → 插件里有一张简版设置卡，完整设置在剧场里的 CONFIG。

### 更新

按上面的方法用 git clone 装的，可以直接在剧场里更新：设置 → 版本与更新 →「检查更新」→「立即更新」，然后重启 DSH 并刷新网页。有新版本时标题画面也会出现「更新插件」。

- 更新只做快进（相当于 `git pull --ff-only`），本地改过的文件不会被覆盖；有冲突、或者本地有没推送的提交时会停下来，把原因写在页面上。
- 跟踪的分支在远端被删了（比如 PR 合并后删了分支）时，可以一键改跟 `main`；`main` 上还没有插件时不会切。
- 打开剧场时会顺便检查一次（最多 12 小时一次），可以在同一页关掉。
- 不是 git 克隆的装法（压缩包、npm）没法在页面里更新：重新执行一遍安装命令即可。

| | |
|---|---|
| ![有新版本](docs/screenshots/27-update-available.webp) | ![更新完，等重启](docs/screenshots/28-update-restart.webp) |

### 从 dsh-tavern-igs 升级

插件原名 dsh-tavern-igs（「IGS 剧场」），目录从 `dsh-tavern/` 改成了 `flowgal/`。DSH 按安装时的名字和路径记录插件，所以改名这一次要在终端里重装，之后又可以在页面里更新：

```sh
pnpm dsh plugin --profile web remove dsh-tavern-igs
cd IGS_GaLSystem && git pull && cd ..
pnpm dsh plugin --profile web add ./IGS_GaLSystem/flowgal
```

重启 DSH 后，设置、API Key、每局的存档和生成的图片都会保留：第一次启动时 `$DSH_HOME/dsh-tavern-igs/` 会整个改名成 `$DSH_HOME/flowgal/`，旧聊天里的场景卡和插画卡照常显示、照常能在剧场里演。

## 在聊天里

- **场景卡**：每轮正文下方一张卡，显示地点、时段、天气、配乐情绪、在场人物和选项数，按钮是「进入剧场 / 人物志 / 重新整理」。导演还没整理完时显示「导演正在整理这一幕」和「先看起来」。
- **插画卡**：导演决定这一轮值得一张 CG 时，CG 直接插在对应段落下面。悬停出现工具条：切换历史版本、重画、改词，点图放大。
- **消息按钮**：每条回复上有「🎬 剧场」（从这一轮开始看）和「🖼 配一张」（让导演为这一轮补一张 CG）。
- 想让剧场在每轮写完后自动弹出，打开设置里的「新一轮写完后自动打开剧场」。

## 导演日志

后台导演不是黑箱。剧场右上角的「导演整理中 ›」、快捷栏的 DIR、标题菜单、设置 → 导演，以及聊天里场景卡上的「看导演在写什么」都能打开导演日志：

- **实时输出**：导演整理时，模型吐出的每个字（和它的思考过程，模型支持的话）实时滚动；觉得跑偏了可以直接「停止整理」，这一轮先按原文演。
- **整理结果**：解析后的场景（地点、时段、天气、配乐、转场、背景提示词）、站位，以及**逐句**标注：每个正文单元被判成谁在说、什么表情、弹什么漫画符号、用什么镜头、是不是卡片；还有选项、插画分镜和外貌档案的改动。
- **原始输出**：每次请求的原文、用时、最大输出、用量（输入 / 输出 / 思考 token），解析失败或被模型拒绝的报错，以及插件为什么重试。
- **提示词**：实际发给模型的系统提示词和用户消息全文，可以一键复制去别处调试。
- 每局保留最近 30 次记录，单独存在 `games/<局>.director.json`，删局时一起删。

最大输出默认 128000、资料长度默认 1000000 字（Claude Opus / Sonnet 5.5 的输出上限和上下文量级）。插件会问 DSH 这个模型的上下文窗口：资料太长就自动缩短，输入加最大输出装不下就把最大输出往下收；模型仍然拒绝这个最大输出时，按它报错里给的上限重试一次。每次实际用了多少都写在导演日志里。

## 剧场

- **舞台**：背景按「AI 生成的地点背景 → IGS 背景库（72 张）→ 程序绘制的天空与天际线」依次取，时段和天气会给画面调色；转场有溶解、电影黑边、横扫、圆形收缩、百叶、黑场、白闪几种。
- **人物**：说话的人亮起、其余人退后；旁白描写某人的动作时也会让那人换表情。没有立绘的人物画成剪影，发型、发色、马尾双马尾都按外貌档案来。
- **演出**：IGS 的漫画符号（汗滴、怒筋、爱心、音符……）、镜头推近 / 拉远 / 平移 / 倾斜 / 震动 / 闪白 / 红闪、短信 / 信件 / 便条 / 报纸 / 终端 / 告示 / 日记 / 卷轴八种情境卡片、十一种天气粒子（雨、暴雨、雪、樱花、落叶、萤火、余烬、浮尘、光斑、星空、雾）。
- **声音**：IGS 的 80 首魔王魂配乐按场景情绪和地点自动选曲、交叉淡入；角色说话有打字音，按名字区分音高。
- **阅读**：逐字显示、自动、快进、回想（滚轮或 L）、隐藏界面（H）、每局记住读到哪里。键盘：空格 / 回车 / → 翻页，← 后退，A 自动，Ctrl 快进，Esc 回到聊天。
- **选项**：一轮的最后给出导演写的选项和自由输入框。选好后文字会填进 Tavern 的输入框（同时复制到剪贴板），剧场收起，下一轮写完会自动回来接着演。
- **皮肤**：星穹（默认）、樱色、水墨、夜金、赛博五套，字体从 IGS 的字体包按需加载。手机竖屏自动换布局。

## 柏宝绘的那一套

生图部分按 ST-BaiBai-Image（柏宝绘）的思路重新实现：

- **角色外貌库**：有名字的角色第一次出场自动建档。导演写分镜时只写 `@林岚`，出图前机械替换成档案里的外貌 tag，所以同一个人每张图长得一样。
- **外貌时间线**：剪了头发、换了制服这种永久变化，从发生那一轮开始生效，之前的轮次重画时仍用旧外貌。湿身、包扎这类临时状态单独记，解除时清掉，不污染档案。
- **改动日志与回滚**：AI 对档案的每次改动都记在「档案变更」里，可以一键回滚。
- **全局角色**：把一个人「提升为全局」后，所有存档共用这份档案，AI 不再改它；也可以复制回本局再改。
- **画师串与质量词**：内置几套画师串，也能存自己的；质量词、负面词按模型分别设置。
- **CG 队列与版本**：出图排队、可取消，重画保留历史版本，随时切回旧版本。
- **改词**：在鉴赏里打开任意一张图，可以直接改 tag、描述、负面词、横竖构图和种子，或者让 AI 按你的一句话改写提示词，再看最终发给模型的完整提示词。
- **立绘与表情**：角色首次登场自动生成立绘；可选按表情生成差分（会多花钱，默认关）；人物志里能逐个表情生成或上传自己的图。
- **生图渠道**：
  - NovelAI：官方接口，也可以加多个中转地址来回切换。内置 V5 Full / Curated、V4.5、V4、V3 等模型，官方出了新模型直接手填 ID；采样器、步数、提示词引导、引导缩放（Prompt Guidance Rescale）、噪声调度、Variety+ 可调。V5 可以给立绘开**透明底**（默认开），立绘站在场景里不带白底。
  - ComfyUI：简单模式选 checkpoint 即可；高级模式导入 API 格式的工作流 JSON，用 `%prompt%`、`%negative%`、`%width%`、`%seed%` 这类占位符接参数。
  - OpenAI 兼容的图片接口（gpt-image-1 等）。
  - Stable Diffusion WebUI（A1111 / Forge）：可以选底模、采样器和调度器，只对插件的请求生效。

  ComfyUI、WebUI 和 OpenAI 兼容接口的模型 / 采样器列表直接从服务器实时读取，跟着你那边的更新走；NovelAI 没有公开的模型列表接口，所以用内置列表加手填。每个渠道都有「测试连接」；种子可以固定（-1 为每张随机），鉴赏里改词时还能给单张指定种子。

## 隐私与密钥

- API Key 只存在宿主这一侧：优先放进 DSH 的凭据服务，没有凭据服务时存在插件数据目录下权限为 0600 的 `secrets.json`。浏览器只能看到「已填写」，拿不到 Key 本身。
- 插件只写 `$DSH_HOME/flowgal/`（设置、每局的场景脚本与人物档案、生成的图片），不读写 Tavern 自己的数据目录，也不给 Tavern 打补丁，只用公开的插件接口。
- IGS 的背景、配乐和字体默认从 jsDelivr 上的 IGS 发布仓库读取，不随插件打包。离线使用时可以在设置里把「素材地址」指向自己托管的 `app/dist/`，或者关掉 IGS 背景库和配乐。

## 预览与截图

不装 DSH 也能看效果：

```sh
npm run preview        # http://localhost:5178/ ，假的 Tavern 页面 + 假的模型和生图后端
npm run screenshots    # 需要 playwright；截图输出到 .tmp-screenshots/
```

预览服务用真实的插件引擎，只把 Tavern、对话模型和生图接口换成了本地假实现，故事在 `scripts/preview/story.mjs`。

## 实现说明

- 宿主半边：`lib/`。`segment.js` 把正文切成旁白 / 台词 / 心声单元；`director.js` 和 `prompts.js` 负责导演提示词和结果校验；`engine.js` 管排队、出图、挂载到正文；`cast.js` 是外貌库；`image/` 是四个生图渠道。
- 浏览器半边：`src/client/`，打包成 `client.js`。React 由 DSH 提供，不打进包里。导演日志面板在 `src/client/theater/DirectorLog.jsx`，后端记录在 `engine.js` 的「导演日志」一节，接口是 `/director-log`（长轮询，和对局视图分开推送）。
- 本插件与 [IGS_GaLSystem](https://github.com/Anyno001/IGS_GaLSystem) 同仓库：漫画符号 SVG 与样式、背景库、配乐目录直接复用 IGS 的代码和素材。
- 功能参考了 [bigmalove/galgame](https://github.com/bigmalove/galgame) 和柏宝绘（ST-BaiBai-Image），代码全部重新编写，没有复制这两个项目和 DSH Tavern 本身的代码或样式。

## 鸣谢

- 配乐：魔王魂（https://maou.audio/ ，作曲：森田交一），曲目清单见 `app/dist/bgm/CREDITS.md`。
- 字体：霞鹜文楷、霞鹜新晰黑、霞鹜新致宋、思源宋体、汇文明朝体等，随 IGS 发布，授权见 `app/dist/fonts/`。
- 背景图与漫画符号：IGS 素材包。
