---
name: candlelit-christmas-invitations
description: >-
  制作午夜蓝棉纸、象牙色衬线字与暖烛光的 4:5 动态晚宴邀请函。Use for a candlelit Christmas invitation, formal dinner invitation, Christmas dinner invite video, 圣诞晚宴请柬、冬季答谢宴或需要手机直接播放的电子邀请卡。用户可选六款餐桌构图，填写活动名称、时间、地点和 RSVP，也可按提示生成同风格的新卡面。固定机位中暖光照出整张纸卡，标题与活动信息分层显现，输出带可选配乐的 MP4 和静态封面。
---

# Candlelit Christmas Invitations

烛光漫过午夜蓝请柬，活动信息依次出现。输出 4:5、720 × 900、24 fps、10 秒 MP4 及封面 PNG，可选配乐。[六款同屏预览](preview/preview.mp4)

## 需要

Node.js 18+、FFmpeg 和 FFprobe。批量 QA 另需 Python 3。在技能目录执行 `npm install && npx playwright install chromium`。用 `node scripts/render.cjs --check` 自检。使用本机 Chrome 时设置 `INVITATION_CHROME_CHANNEL=chrome`。

## 先问用户什么

先展示六款造型和「生成同风格新卡面」选项，请用户选版，同时一次问齐缺少的活动名称、日期时间及地点；RSVP 可以留空。以用户提供的语言、措辞和时区为准。需要示例时明确标注示例数据。

| 版式 | 餐景与文字 |
|---|---|
| `03-blue-place-setting` | 双烛餐位在上，下方文字居中 |
| `04-dinner-for-two` | 标题居中，双人节日晚餐在底部 |
| `05-coupes` | 左排信息，右侧水晶双杯与缎带 |
| `02-pearl-place-setting` | 母贝餐巾扣和杯具在上，下方居中 |
| `01-candles-above` | 双烛铜托盘在上，下方斜体标题左排 |
| `06-original-right-candle` | 左排邀请文字，右下高烛台 |

## 流程

1. 复制 `template/config.json` 到工作目录填写。字段与渲染命令见[配置说明](references/config.md)。
2. 需要新构图时，按[适配指南](references/adapt.md)生成无字底图，并按留白配置文字坐标。
3. 运行 `node scripts/render.cjs 活动.json 输出目录 --proof`，核对日期、地点、字重、留白和手机可读性。新构图先看静态校样。
4. 运行 `node scripts/render.cjs 活动.json 输出目录`。核对暖光开场、信息出现顺序与最终阅读时间，交付 MP4 和 PNG。

## 风格锁

深蓝纸面和烟灰蓝背景靠真实纸边与投影区分。暖色局部照亮蜡烛、餐巾或杯沿，象牙色字清楚可读。边框细而可见，由日期和地点承担阅读重点。机位固定，让光线揭晓卡面，再依次呈现标题、日期、地点和 RSVP。

## 可改项

可改版式、活动文案、配乐、无字底图、局部光源和独立文字框。默认继承选定构图的衬线风格、斜体、对齐方式和层级。较长文案按词组换行或适当缩小，保持同一信息顺序。

## 文案上限

名称 55、时间 60、地点 80、RSVP 90、眉题 35 个字符。输入上限和实际可放下的长度以静态校样为准。标题可以两行，信息行过长时优先选宽版或经用户确认调整措辞。

## 不适用

适合发给收件人播放的固定内容。实时信息、可交互 RSVP 和购票入口用网页请柬。

## 已知问题

参考样片保留已确认的原始字形。活动改稿使用系统高对比衬线字体和独立文字层，换系统时可能改变字形。自定义底图需按构图复核光源位置，文字不能压住灯焰和餐具。
