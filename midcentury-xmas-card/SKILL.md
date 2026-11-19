---
name: midcentury-xmas-card
form: film-template
usage: [direct]
description: >-
  An ivory cotton envelope opens at its burgundy wax seal and reveals a vintage letterpress invitation. The title, date and time, venue, and RSVP appear in sequence over an engraved winter scene. 用于圣诞派对邀请函、复古凸版开信动画和手机可发送的 MP4 电子邀请函。Use when making a Christmas party invitation or a winter event invitation video. Film-template / direct, with five alternate layouts. Local rendering is free. Custom artwork may require an image generator. Tuning guide included (references/adapt.md).
---

# Christmas Letterpress Invitations · 圣诞复古凸版动态邀请函

用自定义文案生成带钟琴配乐的开信动画。输出为独立的 720 × 900、24 fps、H.264/AAC MP4，默认约 9.7 秒。五款是同一成片模板的版式选项。6.5 秒同屏选版见 [五款预览](preview/preview.mp4)。

## 需要

A 级环境使用 Node.js 18+、Chromium、FFmpeg 和 FFprobe。从本目录运行 `npm install && npx playwright install chromium`，再运行 `node scripts/render.cjs --check`。缺少系统库时按 Chromium 安装提示补齐。B 级环境若能运行三者可本地渲染，否则产出配置和适配草稿。C 级产出配置与命令，由用户在有依赖的环境运行。

## 先问用户什么

一次问齐仍缺的项目：版式、活动标题、日期与时间（含用户需要的时区说明）、地点。询问是否要加眉题、参与提醒或 RSVP 及票根文字。用户没有给的活动事实不补写。卡面默认英文，保留用户提供的拼写与时区表达。

| 版式 | 选择理由 |
|---|---|
| 00-original 竖向票根 | 大标题居中，右侧有独立票根 |
| 01-centered 经典居中 | 先读标题，再看插画，活动信息在其下 |
| 02-split 图文分栏 | 信息靠左，插画在右，适合简短地点 |
| 03-illustration-top 冬景明信片 | 椭圆冬景先出现，文字集中在下半部 |
| 04-bottom-tearoff 横向撕票 | 日期和地点放在底部票根，RSVP 位于主卡 |

## 流程

1. `cp template/config.json invitation.json`，将用户文案写入配置。字段见 [配置说明](references/config.md)。
2. 自定义版式时，先按 [新卡面提示词](references/adapt.md#新卡面提示词) 生成无字底图。把底图与独立文字层的百分比坐标写入配置，再出草稿。
3. `INVITATION_PROOF_ONLY=1 node scripts/render.cjs invitation.json ./invitation-output`。查看 proof PNG，核对文案、边缘、安全区和字的可读性。若需要调整，优先分行、换版式或扩大文字区。
4. `node scripts/render.cjs invitation.json ./invitation-output`。脚本检查文字溢出、音视频流、尺寸、时长，并完整解码 MP4。交付 MP4 和重渲染命令。样片可复现，见 [配置说明](references/config.md)。

## 风格锁

- 象牙棉纸、酒红印墨、刻纹蜡封和冬季雕版共享材质和色温。
- 主标题用有分量的复古衬线体。日期、地点和 RSVP 用较小的衬线体，主次清楚。
- 先短暂呈现信封，再自动开封。日期与时间、地点、RSVP 逐行显现，完整卡面停留后结束。
- 图片只放材质、装饰和插画。所有用户文案使用独立可配置文字层。

## 可改项

版式、文案、结尾停留、静音、自定义无字底图和文字框位置均可改。用户想要新构图时，沿用同一纸张、标题层级、冬景雕版和开信动作。外部付费生成先向用户确认费用。

## 文案上限

眉题 32、标题 38、日期时间 46、地点 65、RSVP 86、竖票根 12 个字符。上限只是输入护栏。长文案先试分行或较宽版式，保持原意和信息完整。草稿仍溢出时，与用户确认缩写或换更宽的构图。

## 不适用

需要收件人实际点击封蜡、提交报名表或动态更新活动信息时，改用网页邀请函。需要暖场长片、其他节日或多镜头叙事时，选择适合的成片模板。

## 已知问题

跨平台衬线字体回退可能改变换行。自定义底图的开孔需要与选定版式的遮罩匹配。预览素材里如出现白角、重复字、插画压字或底图自带文字，应修正后再渲染。

## 达到样片效果

用 [适配指南](references/adapt.md) 的检查点对照 [完整样片](preview/full-demo.mp4) 和 [参考帧](preview/frames.json)。
