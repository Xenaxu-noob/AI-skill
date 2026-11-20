# 配置说明

必填 `layout`、`title`、`hours`、`venue`。可选 `intro`、`kicker`、`rsvp`，留空隐藏。默认文案语言是英文，用户指定其他语言时直接写入对应文案。标题可用 JSON 的 `\n` 指定换行，或让版式自动换行。

`music` 默认 true，支持 false 静音。内置 CC0 肖邦《B 小调圆舞曲》录音片段，见[来源与剪辑说明](../assets/music-source.txt)。

`artwork` 可用配置文件相对路径或绝对路径，读取 4:5 无字 PNG 或 JPEG。 `focus` 为底图内焦点百分比 `[x,y]`。 `placements` 用字段名对应 `[x, 首行基线Y, 宽度, 初始字号]`，以 1122 × 1402 设计坐标为准。居中版的 x 是文字中心，左排版的 x 是左边缘。

`node scripts/render.cjs examples/sample.json output` 生成样片，输出为 `cookie-workshop-invitation.mp4` 和 `cookie-workshop-invitation.png`。末尾加 `--proof` 只出卡面。 `python3 scripts/qa_check.py output` 批量运行样例。
