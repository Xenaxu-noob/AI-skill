# 封面规格 · 雪夜木屋

`template/index.html` 里的 `<svg class="cover cover-cabin" viewBox="0 0 900 1600">`，
按 900×1600 设计，画到 1080×1920（正好 ×1.2）。

## 坐标表

| 元素 | id / class | 位置（viewBox 坐标） |
|---|---|---|
| 星芒 ×7 | `#coverStars .star` | y 210–340，中间那颗最大 |
| 落雪 | `#coverSnow` | JS 生成 38 个圆，y 限制在 1150 以上 |
| 雪坡 | `#groundMask` 裁的椭圆 | cy 1030 / rx 446 / ry 58 |
| 小径 | 同上 | 从门口 (480–566,1004) 到 (442–600,1086) |
| 松林 | `.pine` ×4 | (140,960)(260,940)(640,940)(760,960) |
| 木屋 | `#cabin` | translate(450,990) |
| 檐带 | `#cabinEave` | -110..60 / -360..-315 |
| A-Frame | 三个 `<polygon>` | 顶点 (75,-370)，底 -50..230 |
| 烟囱 | `#cabinChimney` | -47..-5 / -446..-328 |
| 窗 | `#cabinWingWindow` / `#cabinAttic` | 三角窗两处 |
| 门廊 | `#cabinBase` | -15..165 / -120..0 |
| 脚印 | `.step` ×9 | y 1050–1082，从左走到门口 |
| 标题 | `#coverMerry` / `#coverChristmas` | y 1246 / 1340，字号 78，字距 8 |
| 年份 | `#coverYear` + `#coverYearStar` | 1412 / 1360 |

## 从一张手绘 SVG 到能动的封面：六处结构修正

用户给的原始 SVG 是静态插画。直接拿来做动画会出问题，改这六处：

1. **烟囱**：原来是悬空的直角红条。改成落地的锥形排烟管（`polygon` 上窄下宽）+ 深色帽 + 一道雪沿，
   底边压在檐带后面。
2. **屋面雪线**：左侧黑屋面和松林糊成一片。沿屋脊左坡加一条 6px `#F4EBD9` 圆头线，
   让"屋顶"和"树"分开。
3. **窗内颜色**：三角窗内衬原来是 `#D99B26`，和檐带同色，不像亮着的窗。
   改成 `#F0BC55`，并在窗后压一层裁到墙内的径向暖光（`clip-path` 到墙的形状，不然光会漏到树上）。
4. **壁炉**：原来是一块发灰的鸭蛋形。改成两层火苗（`#DE5A24` 外、`#F3B24A` 内）+ 一圈柔光。
5. **底部留白**：标题下面 260px 全空。补一枚 20px 的小星芒 + `2026`（Jost 30 / 字距 13 / 陶土红），
   把版心收住。
6. **小径与脚印**：小径压暗一档到 `#E0D4BB`；脚印补满 9 枚，最后三枚落在门口，动画里正好"走到家"。

## 长出顺序（重要）

木屋**不能**逐个元素放大（`scaleY: 0 → 1`）——三角屋顶会被压成梯形，中途看起来像一堵红墙。

正确做法：把「侧翼 + 檐带 + 三层山墙」放进**同一个裁剪组**，用一个 `clipPath` 的 rect 由下往上拉
（`y: 0 → -372, height: 0 → 374`）。任何时刻看到的都是完整的建筑轮廓，只是被雪线挡着下半截。

烟囱、门廊各自一个小裁剪（从自己的底边往上长）；窗和火苗只做透明度。

```html
<clipPath id="clip-mass"><rect id="mask-mass" x="-246" y="0" width="482" height="0"/></clipPath>

<g clip-path="url(#clip-mass)">
  <g id="cabinWing">…</g>
  <g id="cabinEave">…</g>
  <polygon class="af" …/> <!-- 三层山墙 -->
</g>
```

```js
tl.to('#mask-mass', { attr: { y: -372, height: 374 }, duration: .82, ease: 'power3.out' }, 1.6);
```

## 星芒的"弹出"不要用 CSS transform

见 `shard-recipe.md` 的坑一。这里的写法是：

```html
<g class="star" transform="translate(450, 210)"><g class="sa"><use href="#star2-orange"/></g></g>
```

```js
gsap.set('.sa', { attr: { transform: 'scale(0.2)' } });
tl.to('.sa', { attr: { transform: 'scale(1)' }, duration: .62, ease: 'back.out(1.9)' }, 1.38);
```

外层 `<g>` 只有位移，内层以 (0,0) 为中心缩放——缩放中心永远是对的。
