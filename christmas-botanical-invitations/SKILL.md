---
name: christmas-botanical-invitations
description: >-
  为圣诞市集、冬季聚会或其他适合真实常绿植物的活动制作 4:5 动态邀请函。Christmas Botanical Invitations turns a pine, holly, eucalyptus, or pinecone close-up into a warm-white paper invitation with forest-green serif typography. Use for a botanical Christmas invitation, 圣诞市集邀请卡、冬季派对请柬、手机电子邀请函，或用户希望选择不同植物构图、替换活动文案并导出 MP4 的场景。保留满屏植物入场、细纸框和投影，卡面出现后按顺序揭晓时间、地点及入场说明。支持用同风格生成新无字底图。
---

# Christmas Botanical Invitations

植物特写拉远露出暖白纸卡，活动信息逐行出现。输出 720 × 900、24 fps、10 秒 H.264 MP4、完整卡面 PNG，可选内置 BGM。查看[四款同屏预览](preview/preview.mp4)。

## 需要

Node.js 18+、Python 3、FFmpeg、FFprobe。在技能目录执行 `npm install && npx playwright install chromium`，然后执行 `node scripts/render.cjs --check`。已有本机 Chrome 时，可设置 `INVITATION_CHROME_CHANNEL=chrome`。

## 先问用户什么

一次询问仍缺的版式、活动名称、日期与开放时段、地点。入场方式、票价或 RSVP 可选。保留用户给出的语言及日期表达，未提供的活动事实不补写。用户愿意先看示例时，用样片配置并标明示例。

| 版式 | 构图 |
|---|---|
| `botanical-top` | 右上枝叶，下方左排文字 |
| `evergreen-divider` | 横枝连接居中的标题与信息 |
| `eucalyptus-margin` | 尤加利从左侧延伸，右栏排字 |
| `pinecone` | 左上两行标题、右侧信息、左下松果 |

## 流程

1. 复制 `template/config.json` 到工作目录，填好字段。参见[配置说明](references/config.md)。
2. 若用户希望新卡面，按[适配指南](references/adapt.md)生成新底图和静态 PNG，确认构图后再做动效。
3. 运行 `node scripts/render.cjs 活动.json 输出目录 --proof`，在手机阅读尺寸核对字形、长文案、纸边和植物避让。再用 `node scripts/render.cjs 活动.json 输出目录` 导出 MP4。
4. 核对开头纯植物特写铺满画面，片头淡出，活动信息按顺序出现，尾帧可阅读。交付 MP4 和封面 PNG。

## 风格锁

- 暖白棉纸、灰绿背景、森林绿衬线字、实体纸边和轻投影，保持真实请柬的触感。
- 四款各自使用真实植物构图。活动文字独立排版，图片只承担材质和植物。
- 第一镜植物和纸面满屏。沿连续镜头拉远后露出纸边，短英文片头在拉远时淡出，避免半张卡和局部背景出现在首帧。

## 可改项

可改版式、活动字段、片头、配乐、底图、文字位置和镜头焦点。同一版式内优先沿用字号、对齐和层级，再按文案长度缩小字号或增加换行。

## 文案上限

标题 48、时间 58、地点 80、入场或 RSVP 80、片头 45、眉题 32 个字符是入口上限。具体是否放得下以草稿为准。优先按词组分行或换宽版，必要时请用户确认缩写。

## 不适用

交互报名、实时活动信息和动态票码应使用网页邀请函。纯印刷场景可直接使用静态校样。

## 已知问题

系统衬线回退可能改变断行。生成的新底图可能与文字重叠或在开头露出纸边。检查草稿和关键帧，调整文字区域或焦点直到通过。
