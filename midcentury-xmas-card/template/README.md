# 模板使用说明

```bash
npm i
node render.mjs --out renders/card.mp4
```

- `index.html` 是一整支片子：`#front`（封面 SVG）、`#back`（拱形窗 + 信）、`#envelope`，
  时间线在文件末尾的 `<script>` 里，用 `window.__timelines.main` 暴露出来给渲染器逐帧 seek。
- `render.mjs` 每 45 帧重启一次 Chrome（防止内存涨），逐帧截图后交给 ffmpeg 合成。
  输出：1080×1920 / 15.000 s / 30 fps / H.264 + AAC。
- `check.mjs` 抽查关键帧：

```bash
node check.mjs 2.0,4.3,5.8,9.5,12.5
```

## 换照片

照片窗口是 820×880。裁好之后直接覆盖 `assets/img/004/kiss-arch.jpg`，
同时改 `index.html` 里 `#picFull` 的 `<img src>`（指向同一张）。25 块碎片会自动重新切。

裁切建议：主体（脸/手）占画面 50% 以上，顶部留一点天空给拱顶。

## 换文案

```html
<div class="addr to-block" id="toBlock"><span class="addr-label">TO</span><span class="addr-name">you</span></div>
<p class="back-msg">
  <span class="msg-line"><span>I don't need a perfect Christmas.</span></span>
  ...
</p>
```

每行不超过 26 个字符，五行以内。

## 依赖

只有 `puppeteer-core`（用本机 Chrome），其余全是静态资源：

- `assets/fonts/`：Fraunces（衬线斜体信）、Jost（无衬线标题）、Caveat（手写）
- `assets/gsap.min.js`
- `assets/grain.png`：纸张颗粒（18% 正片叠底）
- `assets/bgm-mix.m4a`：15 s 音乐 + 纸页/落桌音效
