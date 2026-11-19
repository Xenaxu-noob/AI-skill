---
name: midcentury-xmas-card
form: film-template
usage: [direct]
kind: video
description: >-
  一张中叶现代主义（Mid-century Modern）圣诞电子贺卡，15 秒竖版：信封锁版 → 卡片长大 → 几何木屋/松林/星芒逐层长出来 →
  半翻面 → 照片被切成 25 块不规则碎片飞入、拼成一扇拱形窗 → 五行信逐行擦入 → 一颗爱心从吻里跳出、沿右侧弹三下、
  落在右下角成火漆印。纯代码渲染（SVG + GSAP + Chrome 逐帧 + ffmpeg），不调用任何文生视频模型，无付费服务。
  中英双语，封面 SVG、照片、文案、年份全部可换。
  Use when the user says: 中叶现代主义贺卡, 复古圣诞贺卡, 1950s 圣诞卡, mid-century christmas card, 木屋圣诞贺卡,
  碎片飞入的贺卡, 拱形窗贺卡, 电子贺卡视频, 15 秒贺卡, christmas card video.
  Use for: 中叶现代主义 / MCM / 复古 / 原子时代 圣诞贺卡, 情侣贺卡, 照片贺卡, 电子贺卡.
  Not for: 瑞士国际主义风 → use swiss-xmas-card; 包豪斯翻页卡 → use bauhaus-xmas-series; 上下对折实体折页 → use swiss-fold-card.
  Output: 1080×1920 · 15 s · 30 fps · H.264 + AAC · BGM 内置。
---

# Mid-Century Xmas Card · 中叶现代主义圣诞贺卡（15s）

一张竖版电子贺卡，用 **1950s 平面几何** 的语言讲一件事：天冷了，回到那间木屋。

正面是雪夜里的 A-Frame 木屋（几何松林、原子星芒、暖窗、炊烟、一串脚印）；翻过来是一扇拱形窗里的插画，
下面是手写体的信，右下角落着一枚火漆印。中间没有任何转场特效——就是一张卡翻过去。

## 系列硬规则（所有 MCM 贺卡共用）

**照片只能是"重绘过的 1950s 插画"，不能是滤镜、抠图、双色调。**
颜色被压成 6 个色号，形状被简化成几何块；脸可以保留，光影必须去掉。
提示词里写死：`1950s mid-century modern illustration, flat shapes, cream paper, muted palette, no gradients, no photo texture`。
生成后必须停下来给用户确认，再进版式。

**卡面上永远不出现原照片。** 原图只用于重绘输入。

**版式只有两种重量：一大块图形 + 一小段字。** 图形可以是满版、拱形窗、圆窗；
字永远居中对齐、字号不超过图形宽度的 1/4。

## 它长什么样

| 时间 | 画面 |
|---|---|
| 0.00–0.60 | 小信封落到桌上（V 折、麻绳、心形火漆、`for you`） |
| 0.55–1.00 | 翻盖打开、火漆裂成两半 |
| 0.72–1.67 | 卡片从信封里长到全屏 |
| 1.30–1.80 | 雪坡自下而上铺开 |
| 1.38–2.20 | 七个星芒逐个亮起 |
| 1.50–2.55 | 松林从雪线后升起 |
| 1.60–2.42 | 木屋轮廓**整片**从雪线长出来（一个裁剪，不是逐个缩放） |
| 2.14–2.81 | 烟囱、门廊、暖窗、壁炉亮起；炊烟画到 3.5s |
| 2.26–2.80 | 一串脚印踩到门口 |
| 2.36–3.18 | MERRY / CHRISTMAS / 星芒 / 2026 落版 |
| 2.70–4.60 | 停留：落雪 38 片、窗光呼吸、火苗跳动、星芒闪烁 |
| 4.60–5.56 | 半翻面，90° 换面 |
| 5.15–5.50 | 背面拱形画框先落位（先给一个空窗，避免翻过来是白纸） |
| 5.35–6.68 | 25 块不规则碎片从四周飞入、拼成照片 |
| 6.66 | 换成整图（内容相同，只为消掉 1px 接缝） |
| 6.62–7.35 | 画面轻震回正（弹性） |
| 6.98–7.80 | 一道柔光斜扫过照片 |
| 6.05–8.10 | TO / 题签 / 标题 / 五行正文 / 落款 / 日期 / P.S. / FROM |
| 7.15–8.53 | 爱心从吻里跳出、沿右侧弹三下、落印 |
| 8.60–14.80 | 极缓推近，留时间读字 |

## 四段结构（改任何一段都不影响其它段）

1. **信封**（0–1.7）：480×640 的信封，翻盖 `rotateX(-150deg)`，火漆两半向左右飞开，卡片从 `scale(.30)` 长到 1。
2. **封面长出来**（1.3–3.2）：雪坡用 `clipPath` 的 rect 由下往上拉；松树 `y` 从 46 回到 0；
   木屋、檐带、三层山墙**放在同一个裁剪组里**整片升起；烟囱和门廊各自一个小裁剪；窗和火苗只做透明度。
3. **翻面**（4.6–5.56）：`#card` 绕 Y 轴 90°，到 90° 那一刻 `#front` 隐藏、`#back` 显示，再转回 0°。
4. **照片 + 信**（5.15–8.6）：拱形窗落位 → 25 块碎片飞入（见 `references/shard-recipe.md`）→ 换整图 → 柔光 → 文字 → 爱心落印。

## 需要什么

- macOS + Google Chrome（或设 `CHROME_PATH`）
- Node 18+，`npm i`（只有 `puppeteer-core`）
- ffmpeg
- 不需要联网、不需要图像/视频模型（插画是**用户提供的素材**，模板里带一张 1950s 插画当样例）

## 怎么换

| 换什么 | 改哪里 |
|---|---|
| 封面 | `template/index.html` 里 `<svg class="cover cover-cabin">` 整段（构图规则见 `references/cover-spec.md`） |
| 照片 | 裁成 **820×880**、存 `assets/img/004/kiss-arch.jpg`；同时换 `#picFull` 的 `<img src>` |
| 称呼 / 落款 | `#toBlock` 的 `you`、`#fromBlock` 的 `the two of us` |
| 五行信 | `.msg-line` 里五个 `<span>`（每行一句，别超过 26 个字符） |
| 日期 / 年份 | `#backDate`、`#backYear`、封面 SVG 里的 `#coverYear` |
| 音频 | `assets/bgm-mix.m4a`（15 s，混了纸页翻动与落桌音效） |

碎片是**按当前照片生成**的：换图后不用改代码——`index.html` 里的 25 块是 JS 用固定种子切出来的，
换 `kiss-arch.jpg` 即换碎片内容。

## 三个容易踩的坑

1. **GSAP 对嵌套 SVG 元素的 `scale` 会把图形甩出去。**
   `transform-box: fill-box` 与 GSAP 自己算的 origin 会打架，位移可能上百像素。
   本模板的解法：所有"弹出"改用 `transform` 属性补间（`attr: { transform: 'scale(1)' }`），
   或者把图形包一层 `translate` 的 `<g>`，让它的局部原点正好是缩放中心。
2. **瓦片之间有 1px 缝。** 卡片整体被 `scale(.95556)` 缩放，碎片落定后仍会露出细线。
   解法：落定那一刻 `set` 成一张整图，再隐藏碎片（内容完全一致，看不出来）。
3. **翻过来先是一张白纸。** 画框要在翻面时就开始淡入，不能等转完才出现。

## 渲染与交付

```bash
cd template
npm i
node render.mjs --out renders/card.mp4       # 1080×1920 / 15s / 30fps
node check.mjs 2.0,4.3,5.8,9.5,12.5          # 抽查关键帧到 check/
```

`render.mjs` 用 Chrome 逐帧截图（分块重启浏览器，防止内存涨），再用 ffmpeg 合成 H.264 + AAC。
同样的输入重复渲染，结果逐字节一致：落雪与碎片都用固定随机种子。

交付前跑一遍 `references/qa-checklist.md`。

## 文件地图

```text
template/
  index.html          # 整支片子：封面 SVG、背面版式、GSAP 时间线
  render.mjs          # 逐帧渲染 + ffmpeg 编码
  check.mjs           # 关键帧抽查
  assets/
    fonts/            # Fraunces / Jost / Caveat
    img/004/          # 拱形窗照片（820×880）
    grain.png         # 纸张颗粒
    bgm-mix.m4a       # 15s 音乐 + 音效
    flip/land/slide.wav
```
