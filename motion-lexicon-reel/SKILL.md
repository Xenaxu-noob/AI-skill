---
name: motion-lexicon-reel
description: >-
  Make a 15-second, high-saturation, fast-cut "motion lexicon" reel in code:
  14 named motion moves, each demonstrated on a geometric specimen while the
  card names it (Chinese + English), a Swiss 12-column layout with one entry
  column and one specimen column, a drifting motif field, a player-style HUD,
  three real spec rows per entry (duration / easing / cut point), and a
  24-tile index wall on the end card. HTML + GSAP on HyperFrames; no video
  model, no footage, no API key. Use for design-system teasers, "N things in
  15 seconds" posts, motion-vocabulary explainers, showreel title sequences,
  and catalogue / specimen films. Do not use for narrative films, live action,
  or anything that needs a person on screen.
---

# Motion Lexicon Reel

A **specimen catalogue, cut fast**: every card names one motion move and shows that move being executed on a geometric object, on a grid, at 0.9 seconds a card.

The output is a finished 15.8 s master plus the editable HyperFrames project and an entry list you can re-theme.

## When to use

- You have a **vocabulary** to teach: 10–20 named techniques, rules, moves, or components.
- The value is in **naming + showing**, not in explaining at length. One card = one name + one visible proof.
- You want a **showreel opening**, a design-system teaser, or a "N things in N seconds" social post.
- Everything must be **code-rendered and re-runnable** — no stock footage, no model calls.
- The same project should re-brand by editing a palette table and a JSON entry list.

## The shape

```text
0.00 – 0.12   black. nothing. (4 frames)
0.12          cut 01 of 14 · 0.9 s per card
…
11.70         cut 14 of 14
12.60 – 15.80 the end card: the count, the claim, the index wall
```

Each card carries, in this order:

| Role | Element | Size |
|---|---|---|
| identity | English name, mono, uppercase | 19 px |
| title | Chinese name, 900 weight | 168–224 px |
| data + meaning | three spec rows, then one line of Chinese | 16–22 px |
| evidence | the specimen on the right column | 60 % of the card |
| chrome | ticker, live entry number, progress | 15–20 px |

## Rules that make it read as designed

1. **One left edge.** Every text element on a card starts on the same x (96 px). No exceptions.
2. **Extreme scale contrast.** The title is ~10× the notes. A title that is only 2× a note looks like a slide, not a specimen sheet.
3. **The name is a title, so give it body.** Under the big word: three real, checkable spec rows (duration / easing / cut point). Never a big word over air.
4. **One group.** Spec rows and the meaning line are one module: same left edge, same 34 px pitch, no divider line inside it.
5. **Two structural lines, or none.** If you draw rules, each must do a job (split a column, give a specimen a floor). Decorative hairlines are what makes a layout look cheap.
6. **No plain rectangles.** Specimens are built from motifs — crescent, checker, dots, sun-wheel, half-disc — on a two-tone palette. A white square is a placeholder, not a design.
7. **Open on black.** Frame 0 is black; the cut, the field and the type arrive together after it. Never let frame 0 be a broken half-built card.
8. **Fast means no dead hold.** A card's motion finishes by ~55 % of its slot; the rest is reading time, then cut.

## Pipeline

1. Copy `template/` into a new HyperFrames project and `npm i` nothing — the CLI is `npx hyperframes`.
2. Put the display font in `assets/fonts/` (see `template/assets/README.md`).
3. Edit `templates/entries.json`: one object per card (`id`, `zh`, `en`, `def`, `spec.duration|ease|cut`).
4. Regenerate `compositions/sheet.html` from the list — the card markup, the palette table and the timeline are all literal in that one file.
5. `npx hyperframes check --json` → fix every error, read every warning.
6. `npx hyperframes snapshot --at 0,0.9,5.8,13.2` → look at the frames before rendering.
7. Sound: `python3 scripts/make_percussion.py` (150 BPM percussion keyed to the same cut list), then render.
8. `npx hyperframes render --quality delivery --output out/reel.mp4`.

## Files

```text
motion-lexicon-reel/
  SKILL.md                    this contract
  UPLOAD.md                   title / name / description / tags for a skill platform
  references/
    style-bible.md            grid numbers, type scale, palette, motif system, line discipline
    timeline.md               the 14 × 0.9 s structure, retiming maths, audio sync
    qa-checklist.md           what to check before delivery
  template/
    index.html                HyperFrames root (15.8 s, audio element)
    compositions/sheet.html   the whole film: cards, palette, motif field, timeline
    scripts/make_percussion.py  original percussion bed, cut-locked
    assets/README.md          font and asset notes
  templates/
    entries.json              the entry list (14 cards) — the only content file
```

## What it does not do

- It does not design the specimen of a *new* move for you. Adding card 15 means drawing its object in `sheet.html`.
- It does not voice over. If the film needs a narrator, that is a different skill.
- It does not cut a 9:16 from the 16:9. The grid is re-laid, not cropped.
