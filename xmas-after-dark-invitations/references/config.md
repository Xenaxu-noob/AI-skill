# 配置说明

必填 `layout`、`title`、`hours`、`venue`。可选 `kicker`、`rsvp`。标题用 JSON 的 `\n` 指定分拍。 `music` 默认为 true。 `reference: true` 用于复现已批准的样片，替换文案时请用模板。

`artwork` 接受相对配置路径或绝对路径的 4:5 无字 PNG 或 JPEG。 `placements` 用字段名定义 `[centerX, baselineY, width, maxFontSize]`，以 720 × 900 为坐标。字段可用 `kicker`、`title1`、`title2`、`hours`、`venue`、`rsvp`。

`node scripts/render.cjs examples/sample.json output` 输出 `xmas-after-dark.mp4` 和 `xmas-after-dark.png`。加 `--proof` 只渲染静态卡面。 `python3 scripts/qa_check.py output` 批量渲染样例。

开启配乐时，渲染器会嵌入署名并导出署名文件。发布时一并提供该署名。曲目为 Kevin MacLeod 的《Realizer》，许可为 CC BY 4.0。[配乐署名与来源](../assets/music-credit.txt)
