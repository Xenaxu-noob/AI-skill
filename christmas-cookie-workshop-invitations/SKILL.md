---
name: christmas-cookie-workshop-invitations
description: >-
  制作带有真实饼干、燕麦色棉纸和莓红细节的 4:5 动态烘焙活动邀请函。Use for a Christmas cookie workshop invitation, gingerbread decorating party, baking class invitation, 圣诞烘焙课请柬、亲子饼干手作活动或需要手机直接播放的 MP4 邀请卡。四款构图支持替换活动名称、时间、地点和 RSVP，也可以制作同风格的新卡面。开场从烘焙桌特写拉远，邀请标签淡出，卡上标题和活动信息接续显现。
---

# Christmas Cookie Workshop

用烘焙桌特写或烘焙纸揭幕引出暖色纸质请柬。输出 4:5、720 × 900、24 fps、10 秒 MP4 和封面 PNG，内置可选的肖邦圆舞曲。[四款同屏预览](preview/preview.mp4)

## 需要

Node.js 18+、FFmpeg 和 FFprobe。执行 `npm install && npx playwright install chromium` 安装浏览器，`node scripts/render.cjs --check` 自检。使用本机 Chrome 时设置 `INVITATION_CHROME_CHANNEL=chrome`。批量 QA 另需 Python 3。

## 先问用户什么

先展示四款版式和「生成同风格新卡面」选项，请用户选版，并一次问齐缺少的活动名称、日期时间、地点及可选 RSVP。

**卡面文案默认英文。** 开场标签、眉题、标题和活动信息都采用英文排版。用户指定其他语言或已提供原文时，沿用指定语言和日期表达，保留专有名称。缺少活动事实时先问用户。

| 版式 | 构图 |
|---|---|
| `01-gingerbread` | 左排信息，下方姜饼人与星形饼干，烘焙纸揭幕 |
| `02-cookie-cutters` | 左侧模具和擀面杖，右侧排字 |
| `03-berry-thumbprints` | 上方莓果夹心饼干，下方文字居中 |
| `04-icing-practice` | 左排信息，右下裱花袋与糖霜练习线 |

## 流程

1. 复制 `template/config.json` 并填写用户文案。解析字段见[配置说明](references/config.md)。
2. 用户选择新卡面时，按[适配指南](references/adapt.md)生成无字底图，先确认静态构图。
3. 执行 `node scripts/render.cjs invitation.json output --proof` 核对文字、留白和层级。
4. 去掉 `--proof` 渲染 MP4，检查首镜满屏、米白标签淡出、标题和活动信息依次出现，再交付视频与 PNG。

## 风格锁

用燕麦色纸张、姜饼棕衬线字、莓红眉题和真实烘焙桌景。开场的英文标签为米白细框，放在画面下方并随运镜淡出。活动标题保持独立文字层和入场动画，镜头拉远后看得见完整纸边。

## 可改项

版式、标签、眉题、活动标题、日期时间、地点、RSVP、配乐、底图和文字框均可调整。继承版式内的对齐和字号层级，并按文案长度适配换行。

## 文案上限

标签 48、眉题 35、标题 65、日期时间 60、地点 80、RSVP 80 字符。标题最多两行，其余字段单行。以校样为准，超出时换宽版、调整字号或确认缩写。

## 不适用

实时活动信息、报名按钮或需要收集个人信息的场景改用网页邀请函。印刷使用静态 PNG。

## 已知问题

各系统的衬线回退字形可能有差异。自定义底图需要核对文字避让和开场焦点。较长地址可能更适合宽版式。
