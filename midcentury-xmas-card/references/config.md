# 配置说明

| 字段 | 用法 |
|---|---|
| layout | 五个版式 ID 之一。all 仅用于整组参考样片 |
| title, when, where | 必填。各自对应活动标题、日期与时间、地点 |
| kicker, rsvp, stub | 可选。stub 仅用于 00-original |
| hold | 完整卡面停留秒数，默认 5，范围 4–12 |
| mute | true 输出静音 |
| artwork | 可选，无文字的 4:5 PNG，路径相对配置文件所在目录 |
| placements | 可选，键为字段名，值为 [左, 上, 宽, 高, 字号]。前四项为卡片百分比，字号为卡宽百分比 |

从本目录重渲染参考样片：

```sh
node scripts/render.cjs examples/sample.json ./sample-output
node scripts/preview.cjs ./sample-output ./preview.mp4
node scripts/preview.cjs ./sample-output ./full-demo.mp4 --full
```

默认输出 6.5 秒同屏选版视频。带 --full 的版本用于内部逐帧复核，preview/frames.json 的时间码对应 preview/full-demo.mp4。

模板附带底图和音轨，复现无需再次生成图像。文字用 Georgia 或系统衬线回退。为复用本机 Chrome，可将 INVITATION_CHROME 设为其可执行文件路径。不同系统的像素结果可能因字体和编码器不同。
