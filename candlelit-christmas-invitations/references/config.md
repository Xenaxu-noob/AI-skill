# 配置说明

必填 `layout`、`title`、`hours`、`venue`。可选 `kicker` 和 `rsvp`，留空时隐藏。标题可以用 JSON 的 `\n` 指定两行。 `music` 默认 true。

`artwork` 是相对配置文件或绝对路径的 4:5 无字 PNG/JPEG。 `placements` 可覆盖指定字段的 `[x, baselineY, width, fontSize, align, italic]`。前四项使用 1122 × 1402 设计坐标，`align` 为 `left` 或 `center`，`italic` 为布尔值。 `light` 可设置烛光起点 `[x,y]`，`flames` 可填对应画面的烛芯坐标数组，`reflect` 可设置光沿杯具扫过的起止点 `[x1,y1,x2,y2]`。

从技能根目录运行 `node scripts/render.cjs invitation.json output --proof` 出封面，去掉 `--proof` 同时出 MP4。 `node scripts/render.cjs examples/sample.json output` 复现参考样片第一款。样片配置中的 `reference` 只用于展示原版画面，活动配置沿用模板的独立文字层。 `python3 scripts/qa_check.py output` 运行全部样例。

默认配乐采用肖邦《降 E 大调夜曲》录音的 CC0 片段。出处与剪辑记录见 [music-source.txt](../assets/music-source.txt)。
