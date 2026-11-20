---
name: xmas-after-dark-invitations
description: >-
  制作丝绒、镜面球、金属字和棱镜光质感的手机动态邀请函。Use for an Xmas After Dark invitation, disco party invitation, club night invite MP4, 圣诞夜场请柬、舞会电子邀请卡或需要酷炫标题入场的夜间活动。先从六款构图选版，或生成同风格新卡面，再填写时间、地点等文字。标题分两拍入场，日期、地点和 RSVP 依次显现，镜面碎光随节奏移动。
---

# Xmas After Dark Invitations

制作 4:5、720 × 900、24 fps、10 秒 MP4 与静态卡面。附六款带亮封面的同屏预览。[预览](preview/preview.mp4)

## 需要

Node.js 18+、FFmpeg 和 FFprobe。运行 `npm install && npx playwright install chromium`，再运行 `node scripts/render.cjs --check`。使用本机 Chrome 时设置 `INVITATION_CHROME_CHANNEL=chrome`。批量 QA 需要 Python 3。

## 先问用户什么

展示六款和「生成同风格新卡面」选项，问用户选哪版。一次收集活动名称、日期时间、地点、可选 RSVP 和是否保留配乐。**卡面默认英文**，用户指定其他语言时按原文排版。保留日期、时区和专有名称。

| 版式 | 视觉 |
|---|---|
| `01-disco-ball` | 梅紫镜面球与洋红碎光 |
| `02-velvet-curtain` | 酒红丝绒幕布与舞台聚光 |
| `03-prism-portal` | 上方晶体折射，下方居中文字 |
| `04-mirror-arch` | 多颗悬挂镜面球 |
| `05-cobalt` | 钴蓝丝绒与冰银 |
| `06-emerald` | 墨绿丝绒与香槟金 |

## 流程

1. 复制 `template/config.json`，填写活动文案。[配置说明](references/config.md)
2. 新卡面按[适配指南](references/adapt.md)生成无字底图并调整文字位置。
3. 运行 `node scripts/render.cjs invitation.json output --proof`。检查对比、留白和字号。
4. 去掉 `--proof` 渲染成片。检查标题分拍、活动信息的阅读时间、镜面碎光与配乐。带配乐时随视频提供署名文件。

## 风格锁

独立纸卡要看见纸边。标题用有金属反光的斜体，活动信息与标题留出间距。亮色反光集中在镜面球、棱镜与画面边缘。短预览用六款完整亮卡面开场，约两拍后进入动态。

## 可改项

版式、眉题、活动标题、时间、地点、RSVP、配乐开关、无字底图和文字位置。替换标题用两行可编辑金属字。标题只填一行时，按词拆成两拍。

## 文案上限

眉题 35、标题 60、日期时间 60、地点 80、RSVP 80 字符。标题最多两行。按实际卡面检查长文案，必要时换布局或向用户确认简称。

## 不适用

实时名单、互动报名、在线播放入口需要网页。发送给收件人的固定内容可以用 MP4 或 PNG。

## 已知问题

参考样片保留原始银铬字形。更换标题以系统斜体和渐变模拟，字形会随字体变化。自定义底图应留出深色文字区，避免碎光影响阅读。
