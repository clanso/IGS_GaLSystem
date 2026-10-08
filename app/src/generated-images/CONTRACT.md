# generated-images 模块契约

## 职责

- 管理生图 provider。
- 内置 provider 放在 `generated-images/providers/`。
- 模型专属请求构建器放在 `generated-images/request-builders/`。
- st-chatu8 必须作为可拆卸内置 provider，而不是写死在核心逻辑里。
- 兼容 Immersive Galgame System 既有的外部插图扩展适配能力。
- 支持内置生图 API、提示词预设、轮询和失败反馈。
- 生成图持久化和图片池统一交给 `media`。
- 检测到生图段时驱动 `visual` 切换到生图层；生图段消失时回到背景+立绘。
- 自动插图由 `illustration/` 负责段落编号、标记插入、规划提示词与解析、设置规范化和事件驱动服务；tag 与图片交由 `media/illustration-store.js` 保存。
- NovelAI 官方接口由 `request-builders/nai-v4-builder.js`（`providerType: nai-official`）构建请求、`nai-official-client.js` 发起请求，并复用 `image-api-client.js` 的响应解析；不得覆盖既有 `bridge.imageApi`。

- 生图提示词公共规则在 `illustration/prompt-kit.js`：虚构/成年人框架、CG 构图指南、拒答识别与「温和模式」重试（主提示词被拦截时只让 LLM 写构图，露骨 tag 由本地模板 `nsfwExtra` 补）、内置背景/立绘 NAI 模板与背景词典兜底。
- 生图排查日志（`image-job-log.js`）：自动插图与素材补全通过 `report(level, message)` 上报进度与失败原因，由 bootstrap 写入日志（localStorage `igs_image_job_log`，按 `bridge.imageJobLog.retainDays` / `maxEntries` 自动清理）并按 `bridge.showToasts` 弹 toast；只有 `done` 楼层算已处理，失败 / 过期楼层下次渲染重试。副 LLM 系统提示词可由 `bridge.autoIllustration.llm.prompts.*` 覆盖，留空用内置。
- 正文字数门槛（`illustration/floor-body-length.js`）：自动插图与素材补全自动触发时，先按 `bridge.sourceFilter`（和阅读器同一套正文保留 / 排除标签，`scene/message-source.js` 的 `readerBodyText`）取出正文；台词 / 心理只数台词本身，指令和空白不算。不足 `MIN_AUTO_IMAGE_BODY_CHARS`（50）字返回 `body-too-short`，日志写一行原因，不记成已处理（楼层「继续」写长后下次渲染照常处理）；手动生成不受限。
- 素材补全（`illustration/asset-generation-service.js`）：场景素材模式开启且对应开关打开时，最新 AI 楼层出现素材库匹配不上的场景或无名角色 → 副 LLM 写内容 tag（`asset-prompt.js`）→ NAI 生成（立绘底色见下面「立绘底色」：自动时 V5 走原生透明底，其余模型浅灰底 + `media/alpha-matte.js` 抠图）→ 存为本聊天临时素材，状态 `review`，等待楼层结束时由阅读器询问用户加入素材库 / 仅本聊天 / 丢弃。
- 物品图（`illustration/item-image-service.js`，设置 `bridge.itemImages`，默认关闭）：关闭时入口短路，不读表、不联网。候选 = 本楼 `[igs-fx:item]` 标签物品在前 + 物品表（`data/shujuku/item-catalog.js`）在后，按归一化名称合并；缺图者每层最多 `maxPerFloor`（默认 3）件，串行队列 + 按物品键在途锁，重复事件不重复计费。存入 `igs-generated-assets`，`type: 'item'`、状态 `ready`（不进入素材审核与临时素材列表），按聊天隔离；重画失败保留原图，`discarded` 不自动重补。手动「补全物品图」单次最多 10 件。提示词见 `illustration/item-prompt.js`（副 LLM 失败时仅纯英文名兜底，中文名记失败待重试）；透明底沿用立绘分支。

- 角色 DNA（`scene/character-dna.js`）进入提示词链：立绘补全按 `triggerWords → identity → defaultAppearance → 副 LLM tag → 模板` 合并，负向插在模板负面词之后；CG 只合并 `triggerWords → identity` 与 DNA `negative`，`defaultAppearance` 只交给 planner 作默认资料。planner 输出 `char: 角色名 | x,y | tags`，旧格式 `char: x,y | tags` 仍可解析；无名角色只在「本张单人且上下文唯一角色」时绑定，否则不注入并上报 warning。数据库生图模式下素材经既有 `meta.userPrompts` 传递合并结果，CG 由 `bindCharacterDnaToCaption` 按同一绑定规则并进插件返回的 char caption（插件 caption 无角色名，只有单人且上下文唯一角色时注入）；智绘姬链路不变。
- 素材服务新增 `getEditableImage(imageId)` 与 `saveMatteEdit(imageId, expectedRevision, patch)`，按 revision 原子更新并发出 `matte-edited` 事件。
- 局部重绘能力协商：`image-backend.js` 的 `describeEdit()` / `edit()` 与普通 `generate` 分离；只有内置 NAI、客户端提供 `edit` 且所选模型存在 inpainting 版本（`request-builders/nai-inpaint-builder.js`，action `infill`）时才支持，否则返回 `image-edit-unsupported`，禁止退化为整张重画。请求形状仅经 fixture 验证，真实接口兼容性需真机确认。
- AI 修复事务（`illustration/inpaint-transaction.js`）：必须用户显式触发；预览只在内存，接受时校验 revision → 写 `workingDataUrl` → 重新自动抠图 → 原子更新；取消 / 失败 / 过期不写任何资产字段；「恢复原图」清除 `workingDataUrl` 并从原图重抠。AI 结果是生成式重建，不代表恢复原始像素。错误与日志不得包含 API Key、原图 base64 或完整请求体。
- 智绘姬出图（`chatu8-client.js`）：图像来源为 `extension` 时，剧情 CG、素材与物品图经酒馆全局 `eventSource` 的 `generate-image-request` / `generate-image-response` 事件（按 `id` 配对）交给智绘姬出图，只发送合并后的场景与角色 tag，画师串、质量词与尺寸沿用智绘姬自身设置；场景背景（楼内补背景与时间 / 天气差分，`meta.imageKind` 为 `background`）例外，按 IGS 的背景尺寸（`cgSizeForMode`，电脑默认 1216×832，手机模式对调成竖图）在请求里带 `width` / `height`，智绘姬 3.1.4 的 NovelAI / SD / ComfyUI / RunningHub 出图都优先用请求宽高、没有才用自己的设置；智绘姬按其挂在主窗口的设置函数判定已安装。未检测到智绘姬、出图失败、超时或返回视频时，填了 NAI Key 就退回内置 NAI，否则按失败上报。走智绘姬时立绘底色按「立绘底色」设置（自动 = 浅灰底），出图后都过抠图。阅读器重画仍代点楼层内智绘姬按钮。事件协议来自上游打包源码而非公开 API，上游改名即失效，需真机确认。
- 智绘姬读取层按上游原版 DOM（`dom-image-candidates.js`）：图片取 `.st-chatu8-image-container` / `.st-chatu8-image-span` / `span[data-request-id]` 内的 `img` 与 `video`，按钮取 `.image-tag-button` / `.st-chatu8-image-button`（均带 `data-request-id`）；图片与重画按钮优先按 `data-request-id` 精确配对，slotIndex / locationHash / imageId / buttonIndex 与 DOM 顺序兜底不变。原 `img.st-chatu8-image-tag-image` 选择器在上游已不存在，不得恢复。

- 柏宝绘出图（`baibai-client.js`）：图像来源为 `baibai` 时，剧情 CG、素材、物品图与阅读器重画经柏宝绘公开接口 `globalThis.STBaiBaiImage`（apiVersion 1）出图，`save: false` 不进柏宝绘图库；后端支持多角色时分角色传，否则拼成一段 prompt；未检测到或失败时有 NAI Key 就退回内置 NAI。不保证透明底，立绘底色按「立绘底色」设置（自动 = 浅灰底），出图后都过抠图。
- 立绘底色（`bridge.autoIllustration.assets.spriteBackground`：`auto` / `transparent` / `matte`，默认 `auto`，在「生图 → 图像来源」里选）：管楼内补立绘、默认立绘、表情差分与衣柜参考图。`transparent` 底色只用 `1.5::transparent background::`，`matte` 只用 `simple background, grey background, light grey background, flat color background`；`auto` 时数据库生图按 `bridge.imageApi.dbgenSpriteTransparent`（开着透明底，关了用 `WHITE_BACKGROUND_TAGS` 白底）、NAI V5（有立绘单独模型时看 `spriteModel`），或立绘模板 / 画师串里写了 `transparent background` 走透明底，其余浅灰底。选定的底色由 `buildAssetSlot` 接在立绘正向模板末尾，模板、DNA、副 LLM 或插件写词、内置 NAI 画师串里其余以 background / backdrop 结尾的标签一律去掉（写词结果经 `userPrompts.spriteBackground` 在 `applyUserPromptsToCaption` 里去掉，负面里和所选底色相同的也去掉）；写词说明改为「不要写背景、场景和底色」。只有数据库生图（开着「立绘透明底」）和 NAI V5 能要求原生透明出图，这时出图 meta 带 `transparent`，抠图 `alreadyTransparent` 为真直接裁边；智绘姬、柏宝绘、NAI 4.5 选透明底也交给抠图按四边透明度自己判断。Q 版头像不抠图，不受这项影响；物品图沿用原来的透明 / 灰底逻辑。
- 副 LLM 写词（`illustration/caption-writer.js`）：图像来源不是数据库生图时，`writeDbgenPrompt` 改由副 LLM 按同一份描述写 NAI v4 caption，`generateDbgenCaption` 把 caption 拆回 slot 按当前来源出图；表情差分、头像、默认立绘与衣柜共用。副 LLM 选独立 API 却没填地址或模型时直接报「还没接副 LLM」，不发请求。副 LLM 设置单独在「生图 → 副 LLM」子页。
- 表情差分的性格与表情 tag：角色 DNA 可带 `persona`（「性格与表情习惯」，只进写词说明 `buildExpressionDiffDescription`，排在动作基准之前；不进画图提示词，不算 DNA 已填）。要写新词而角色还没有 persona 时，设置层先用 `host/character-sources.js` 收集角色卡 / 世界书 / 数据库节选，再经 `illustration/persona-writer.js`（副 LLM，资料不足时回「资料不足」）提炼并存回 DNA；提炼失败只提示，不挡生成。角色设定里可手改或「重新从资料提炼」。出图前 `applyMoodToCaption` 的情绪组表情 tag（组上的 `tags` 优先于预设，NSFW「动情」没改过才用 NSFW 预设）只在组上 `alwaysTags` 为真时放到最前，关着不加、不兜底（预设 tag 是通用画法，叠上去容易变成套路脸）。写词说明里每份表情只交代用在什么场面（预设的 `use`），不再给固定的招牌动作；要求先想这个角色在那种场面里真实会怎么反应、不堆同类标签；不举具体情绪的做法（举过委屈「噘嘴含泪、凑过来要人哄」，模型写委屈时照抄）。说明的顺序是场面在前，怎么表现在最后（模型最看重最后读到的）：先说场面里的「讨说法」「撒娇」是心情不是动作清单、克制的人多数情绪只落在眼神眉间嘴角，再放性格与表情习惯、用户这次的要求，再列一串动漫立绘的套路画法（含泪、噘嘴、抬下巴、歪头、手按胸口、伸手……）要求只在性格和情绪真会这样时才写；规格是身体朝正面站着，头的角度、视线、手和肩膀可以随情绪动。一组表情分批写时，后面的批次带上第一批的样板（`anchor`，`sharedLookCaption` 取第一批过半数份都有的 tag，表情和动作每份不同自然筛掉），外貌、服装和长期身体状态照它；每批都要求正文里写着的长期身体状态（怀孕，或者烧伤、大片伤疤、打石膏 / 缠绷带的重伤、截肢）每一份写上、写法一致，出汗、湿身、湿发、头发凌乱、脸红、泪痕这类临时状态不当身体状态写（某个表情自己要的只写那一份）。给写词看的样板（已有立绘、`anchor`）和从原装或这一套第一张图取的长相（`expressionLookTags`）按 `TRANSIENT_STATE_TAG_RE` 去掉临时状态，按 `isMoodDetailTag`（`EXPRESSION_POSE_RE` 加上眉毛、眼神、嘴、头的角度、手和手臂、肩膀、姿势这类带姿态词的写法；瞳色、裸肩、袖套、痣不算）去掉那一张自己的神态和动作，免得平和的「眉头放松、双手交叠」叠到委屈上。服装名带状态（`服装名-状态`，见 scene 契约）时写词说明加一行这一套的状态；状态是认得出孕月的怀孕时，出图前 `applyPregnancyToCaption` 去掉写词结果里的怀孕 / 肚子词、换成孕月对应的那组肚子描述（每张差分一字不差）（表情差分、单张重画、继续生图，以及给「裸体-孕晚期」这类服装画裸体底图时都生效），写词说明里让模型别写；没定孕期时说明里给出逐月对照表让模型照着写。默认立绘、裸体立绘、Q 版头像、数据库生图的楼内立绘和副 LLM 楼内补立绘规划（【立绘的身体状态】）的写词说明都改为只画长期状态（`SPRITE_LASTING_STATE_LINE`）。副 LLM 照抄「char: x,y | tags」写法时，`parseCaptionSlots` 去掉开头的坐标（和角色名）。情绪组在「场景 → 规则」里逐组设开关与 tag，「套用预设」与素材包合并都保留这两项。
- 副 LLM 规划读多少上下文（`illustration/planner-context.js`，设置 `bridge.autoIllustration.llm.contextBudget`：standard / 32k / 128k / 500k / 1000k，默认 standard，在「生图 → 副 LLM → 读取上下文」里选）：standard 与原来一样，本楼正文前 6000 字、前文是最近 `contextFloors` 层 AI 楼合起来的末尾 1500 字；其余档按 token 估成字数（×0.7），本楼正文最多读预算的一半（实际就是整层），前文经宿主 `readPreviousMessages` 连用户发言一起从近到远读满预算的九成，资料节选改用长限额，请求超时至少 10 分钟。剧情 CG 与楼内补背景 / 立绘共用。剧情 CG 规划另带【世界观】、按顺序列出本楼全部场景（含 NSFW 标记），以及出场角色的角色卡 / 世界书 / 数据库节选（宿主 `readCharacterSources`；standard 只给没有 DNA 的角色，加大预算时全给）。楼内补背景 / 立绘时，本楼前 6000 字之后才出现的地点另附场景标签前 2000 字、后 1500 字的正文，角色另附提到他的段落（整层都读时也附，帮副 LLM 对准）。设置页默认立绘与 Q 版头像都附角色资料节选和正文里提到这个角色的段落（`pickChatMentions`，去掉 HTML）。
- 加大「读取上下文」预算时的全部资料：宿主注入 `readSettingMaterial(names, { limit })`（`pickSettingMaterial`：整张角色卡的描述 / 性格 / 场景 / 开场白 / 备选开场白 / 对话示例，角色卡、聊天与全局世界书的全部已启用条目，数据库全部行；提到这些名字的排前面）。楼内补背景 / 立绘规划把它放在最前面的【设定资料】（三成预算），末尾再列一遍要写的素材；设置页默认立绘、裸体立绘、Q 版头像和表情差分在写词说明前面附上【设定资料】（四成预算）和【正文（原文，从早到近）】（连用户发言，从最新往前读满剩下的预算），一组表情只读一次。数据库生图插件自己读上下文，不附；标准长度不附。前文一节的标题改为【前文（原文，从早到近）】，它从来不是摘要。
- 楼内补图的资料与前文：缺的背景由宿主注入的 `readSceneSources(names)` 按地点名挑角色卡描述 / 场景栏、世界书（关键词被地点名包含也算，单字关键词不算）、数据库节选，挂到 `need.sources`；背景和立绘都另附本楼之前最近 30 层 AI 楼里提到这个名字的段落（去掉标签，已在【前文摘要】里的不重复，每项最多 800 字，留最近的），标「【前文·提到「名字」的段落】」。副 LLM 规划里立绘进【角色资料】、背景进【场景资料】（要求写出地点的档次、规模、建筑风格、年代、陈设和氛围，不画资料里的人物和剧情）；数据库生图的背景批量与单张说明同样附上。读不到就不附，照旧补图。
- 立绘与服装写词的世界背景：`worldContextLines(world)` 把世界观选项（`worldContextOf`：id、中文名、`worldSummary`）写成「服装、发型、饰品和随身物品都要符合这个世界」加「世界设定提要」，默认立绘、裸体立绘、Q 版头像、表情差分（含换装）、衣柜服装提示词、楼内补立绘（副 LLM 规划【世界观】一节与数据库生图批量说明）都带上。`worldSummary` 存在当前角色卡的素材里（和世界观同一处，卡里没写就用全局），在「场景 → 规则」里可改；要写新词而它是空的时，设置层（`visual/igs-ui/world-context.js`）先从角色卡场景栏和世界书常驻（蓝灯）条目经 `persona-writer.js` 的 `writeWorldSummary` 提炼并保存，失败只提示、只带世界观。默认立绘另附角色卡 / 世界书 / 数据库里该角色的节选（`characterSourceLines`，排在 DNA 之后，只补 DNA 没写到的长相、穿着和身份气质，不改 DNA）；楼内补立绘由宿主注入的 `readCharacterSources(names)` 按名字给 `need.sources`，读不到不附。衣柜按服装名共用，说明里不点名穿着者；附正文最近 30 层里提到服装名的段落（`pickChatMentions`）与数据库里提到该服装名的穿着记录。

## Provider 契约

- `detect(context)`
- `generate(request)`
- `poll(task)`
- `extractImages(messageContext)`

## Request Builder 契约

- `providerType`
- `schemaVersion`
- `buildRequest(promptContext, promptPreset, providerPreset)`
- `validateRequest(request)`

Provider 负责发请求和解析返回；Request Builder 负责把通用场景变量、提示词预设和 provider 配置转成模型专属请求。NAI、ComfyUI、GPT 图像、banana 等模型必须各自拥有独立 builder。

## 导入位置

只在生图插件页导入、导出和管理 provider，不设置全局 Mod 管理页。

## 禁止

- 禁止把本地文件缓存逻辑写进 provider。
- 禁止 provider 直接操作视觉 DOM。
- 禁止把模型专属提示词框架写死进通用 `prompts`。
- 禁止默认联网，必须由用户启用 provider 后才发起请求。
- 禁止在 provider 禁用后继续扫描对应 DOM。
