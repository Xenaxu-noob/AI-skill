# 配置说明

`layout` 指定版式。必填 `title`、`hours`、`venue`。选填 `entry`、`intro` 和 `kicker`，留空时隐藏。片头、眉题、标题、时间、地点和入场方式都是独立文字。标题可用 JSON 的 `\n` 换行。 `music` 为布尔值，默认开启。

`artwork` 接受配置文件相对路径或绝对路径，要求 4:5 PNG 或 JPEG。自定义底图按整张卡铺放。可选 `placements` 用字段名映射到 `[left, top, width, fontSize]`，各项为百分比，字号按卡宽换算。对齐沿用所选版式。 `focus` 可选，用 `[x, y]` 指定底图中的焦点百分比。需要在 `artwork` 同时填写时使用。

`node scripts/render.cjs examples/sample.json ./sample-output` 可复现第一款样片。其余三款使用同名配置。输出目录内包含 `christmas-market.mp4` 与 `christmas-market.png`。加 `--proof` 只出 PNG。
