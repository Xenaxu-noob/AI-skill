# Timeline

14 cards × 0.9 s = 12.6 s, then a 3.2 s end card. Total **15.8 s = 474 frames at 30 fps**.

## Cut list

| # | id | zh | cut | slot |
|---|---|---|---|---|
| 01 | 001 | 弹性入场 | 0.00 | 0.00–0.90 |
| 02 | 002 | 交错动画 | 0.90 | 0.90–1.80 |
| 03 | 003 | 放射爆发 | 1.80 | 1.80–2.70 |
| 04 | 004 | 线条描绘 | 2.70 | 2.70–3.60 |
| 05 | 005 | 遮罩显现 | 3.60 | 3.60–4.50 |
| 06 | 006 | 打字机 | 4.50 | 4.50–5.40 |
| 07 | 007 | 数字递增 | 5.40 | 5.40–6.30 |
| 08 | 011 | 挤压与拉伸 | 6.30 | 6.30–7.20 |
| 09 | 012 | 形状变形 | 7.20 | 7.20–8.10 |
| 10 | 016 | 视差 | 8.10 | 8.10–9.00 |
| 11 | 021 | 翻转 | 9.00 | 9.00–9.90 |
| 12 | 022 | 扫光 | 9.90 | 9.90–10.80 |
| 13 | 023 | 故障效果 | 10.80 | 10.80–11.70 |
| 14 | 024 | 冲击震动 | 11.70 | 11.70–12.60 |
| — | — | end card | 12.60 | 12.60–15.80 |

## Inside a card

Entrance starts **0.10–0.18 s before the cut** so the first visible frame is already in motion; motion lands by ~55 % of the slot; the remainder is reading time. Durations are 0.18–0.56 s, eases by role: `expo.out` / `power4.out` for arrivals, `elastic.out` for the bounce, `power3.inOut` for the flip, `power4.in` for the slam.

## Retiming

Changing the slot length is a **shift, not a scale**: the moves keep their durations, only their absolute start times move. At the end of the timeline:

```js
const SHIFT = 0.3, ENDSHIFT = 13 * SHIFT;
tl.getChildren(false, true, true).forEach((c) => {
  const beat = c.targets()[0]?.closest?.(".beat");
  const id = beat?.id ?? "";
  if (id === "bend" || id === "b14") c.startTime(c.startTime() - ENDSHIFT);
  else if (/^b\d+$/.test(id)) {
    const n = +id.slice(1) - 1;
    if (n > 0) c.startTime(c.startTime() - n * SHIFT);
  }
});
```

Three things **do not** live inside `.beat` and must be moved by hand when the slot changes: the two counter tweens (they target plain objects) and the `#flash` / `#stage` shockwave of the last card. Miss them and the count-up stays at `000`.

## Opening

Frame 0 is a **black curtain** (`#curtain`, z-index 50, above the chrome). It clears at 0.12 s. Everything on card 01 starts after it: the ground and motif tones at 0.10, the title at 0.14 from `y: -330` (fully off-frame), the specimen from `scale: 0`, the caption / spec module / meaning at 0.50–0.68 with a short opacity ramp (the only fades in the film, and only because the card must be empty before then).

## Sound

`scripts/make_percussion.py` synthesises the bed: 150 BPM pulse, a kick on every cut, rim ticks on the chips, one impact on the slam, one low boom on the end card. Peaks land at **0 / 0.9 / … / 11.7 / 12.6**. It is deliberately original and free — no library, no model.

Numbers from the shipped cut: **−15.6 LUFS, −1.0 dBTP**, 15.8 s. A replacement track must be cut to 15.8 s and its hits moved to the same list; anything else will drift against the picture.
