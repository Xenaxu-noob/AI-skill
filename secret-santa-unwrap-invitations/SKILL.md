---
name: secret-santa-unwrap-invitations
description: >-
  将独立的手写请柬藏在写实牛皮纸包装下，制作带米白封口贴和四向开纸动效的 Secret Santa 邀请函。Use for a Secret Santa invitation, Christmas gift exchange invitation video, holiday gift swap、圣诞匿名交换礼物请柬或需要说明礼物预算的手机 MP4。用户可在四款纸卡中选版，也可生成同风格的新卡面。封口贴随包装纸掀开，独立请柬露出后，标题、日期、地点、礼物预算和 RSVP 依次出现。
---

# Secret Santa Unwrap Invitations

制作 4:5、720 × 900、24 fps、10 秒拆礼邀请 MP4 和完整卡面 PNG。内置可选巴赫配乐。[四款视频预览](preview/preview.mp4)

## 需要

Node.js 18+、FFmpeg 和 FFprobe。运行 `npm install && npx playwright install chromium`，再用 `node scripts/render.cjs --check` 自检。已有 Chrome 时可设置 `INVITATION_CHROME_CHANNEL=chrome`。批量 QA 需要 Python 3。

## 先问用户什么

展示四款版式和「生成同风格新卡面」选项，请用户选版，并一次问齐缺少的活动名称、日期时间、地点、礼物预算和 RSVP。预算和 RSVP 可留空。**卡面默认英文**，用户指定其他语言时照其原文排版。保留币种、日期、时区、专有名称和用户提供的措辞。

| 版式 | 构图 |
|---|---|
| `01-deckle-note` | 酒红格纹上的撕边便笺 |
| `02-centered` | 深酒红织布上的居中纸卡 |
| `03-split` | 格纹布上的双栏便笺 |
| `04-wide-type` | 亚麻底单行标题与小手绘蝴蝶结 |

## 流程

1. 复制 `template/config.json`，写入最终活动文案。见[配置说明](references/config.md)。
2. 需要新卡面时，按[适配指南](references/adapt.md)生成无字底图并调整文字位置。先给用户看静态校样。
3. 运行 `node scripts/render.cjs invitation.json output --proof` 检查标题、预算、留白和手机可读性。
4. 去掉 `--proof` 导出。检查封口贴、翻纸、完整纸边、文案顺序和配乐。

## 风格锁

开场以写实牛皮纸接缝和居中米白封口贴呈现拆礼。封口贴随第一片纸翻开离场。拆开后能看清独立请柬的纸边。文案沿用酒红墨色和手写标题的层级，礼物预算单独清楚出现。

## 可改项

版式、封口贴文字、独立卡面的全部文案、预算、配乐和底图均可替换。字体随字数缩放，标题支持两行，双栏布局沿用各自的栏位。

## 文案上限

封口贴 38、眉题 35、标题 60、日期时间 60、地点 80、预算 70、RSVP 80 字符。地址或预算超宽时优先选择宽版，或请用户确认缩写。

## 不适用

自动配对、报名收集和互动抽签应使用可交互页面。此卡用于发送邀请视频或静态封面。

## 已知问题

参考样片保留原图的手写字形。新文案使用系统书写字体，跨平台回退时字形会变。中文等非拉丁文案以系统字体渲染，先检查收件人看到的排版。自定义底图需核对纸边和文字落点。
