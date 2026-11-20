# 配置说明

必填 `layout`、`title`、`hours`、`venue`。可填 `seal`、`kicker`、`budget`、`rsvp`，留空隐藏。 `music` 为布尔值，默认开启。参考样片使用 `reference: true` 复现原来的英文字形。编辑活动文案时从模板配置开始。

`artwork` 是一张 4:5 无字 PNG/JPEG，可相对配置路径或用绝对路径。 `placements` 用字段名覆盖 `[x, baselineY, width, maxFontSize]`，坐标以 720 × 900 为准。居中版 x 表示文字中心，其余版式表示左边缘。

`node scripts/render.cjs examples/sample.json output` 复现首款。输出为 `secret-santa-invitation.mp4` 和 `secret-santa-invitation.png`。增添 `--proof` 只出 PNG。用 `python3 scripts/qa_check.py output` 批量渲染示例。

配乐为巴赫《哥德堡变奏曲》咏叹调的 CC0 录音片段。[录音出处](../assets/music-source.txt)
