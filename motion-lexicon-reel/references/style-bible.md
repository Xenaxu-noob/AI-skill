# Style bible

The look is a **printed specimen sheet that moves**. Every number here was decided, not defaulted.

## Grid

| | |
|---|---|
| frame | 1920 × 1080, 30 fps |
| margins | **96 px** left and right, on the stage and on the player chrome |
| columns | 12 × 122 px with 24 px gutters (146 px pitch) |
| baseline | **24 px** |
| entry column | x 96 → 996 (6 columns) |
| specimen column | x 1118 → 1824 |
| top bar | 60 px, bottom bar | 88 px |

There is **one left edge** for all entry text. Nothing in the entry column may start anywhere else.

## Type

| role | face | size | tracking |
|---|---|---|---|
| title | Noto Sans SC Black (900) | 168–224 px | -0.035 em |
| English name | JetBrains Mono 500 | 19 px | 0.26 em, uppercase |
| spec labels | JetBrains Mono 500 | 16 px, 72 % | 0.20 em |
| spec values | JetBrains Mono 500 | 22 px | 0.05 em |
| meaning | Noto Sans SC 900 | 22 px, 90 % | 0.04 em |
| category | JetBrains Mono 500 | 17 px, 62 % | 0.24 em |
| HUD | JetBrains Mono 500 | 15–20 px | 0.06–0.20 em |

**Scale contrast is the design.** Title : meaning = 10 : 1. If you shrink the title to 120 px to "fit", the card stops reading as a specimen sheet and starts reading as a slide deck.

## Vertical rhythm (inside one card)

```
108  English name          (19 px)
156  title                 (196 px box: 156 → 344)
396  spec row 1            ┐
430  spec row 2            ├ 34 px pitch, no rules inside the module
464  spec row 3            ┘
520  meaning line          (22 px)
840  category              (footer row)
```

The spec module and the meaning line are **one group**. They share the left edge and the pitch; there is no divider between them.

## Colour

Six grounds, one per card, rotating: electric blue `#1B31FF`, near-black `#0A0A0A`, paper `#F3F0E8`, orange `#FF4A12`, acid lime `#CBFF00`, magenta `#FF2D7A`, plus red `#FF2200` for the impact card.

Ink is chosen per ground (white on blue/black/red, black on paper/orange/lime/magenta). **The palette lives in one table** (`const P` in `sheet.html`) — re-theming means editing that table, nothing else.

## Motif field

Behind every card: a 120 px square grid, five motifs (quarter disc, half disc, bullseye, checker, dot scale), two rgba tones per card, six rows drifting in alternating directions at 20 s for one cell. Opacity **0.40**.

It must read as **texture**, not as stains: if you can name the shapes at first glance, it is too strong.

## Specimens

Never a plain rectangle. Each card's object is built from the same motif vocabulary:

crescent (pop-in) · bar chart of round-capped bars, alternate columns dotted (stagger) · disc + rays (burst) · drawn polyline (line draw) · checker panel revealed through a mask (mask reveal) · outlined box, typed text (typewriter) · rolling numeral (count-up) · highlighted ball on a floor line (squash) · circle → square → four-point spark, all one 12-point ring (morph) · three offset bars (parallax) · card with checker front / dot back (flip) · disc with radial stripes + a light band (sweep) · RGB-jittered block (glitch) · radial-striped disc slamming (impact).

## Lines

At most **two** structural lines in the stage, and each must have a job. The final version has none:

- the vertical divider was removed (the gutter already separates the columns),
- the base line was removed (specimens hang in the specimen column, which is its own field).

If a line does not split a column or give an object a floor, delete it. Three hairlines is the point where a page starts looking cheap.

## Chrome

Top bar: `MOTION PROMPT` · 24 tick numbers, the live one lit · `192 ENTRIES`.
Bottom bar: progress rule · live entry number `001 / 192` · `01 — 14`.

The chrome is information, not decoration. It never carries a shadow, a gradient, or a logo lockup.
