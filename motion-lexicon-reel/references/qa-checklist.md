# QA before delivery

## Frames

- [ ] **Frame 0 is black.** Nothing of card 01 leaks into it — no title edge, no chip, no chrome.
- [ ] At **+0.30 s** the first card is already in motion, not settling.
- [ ] One frame per card, at cut + 0.5 s: the title is landed, the specimen is at its final state, the spec table is legible.
- [ ] The five-character title (挤压与拉伸) does not cross the specimen column.
- [ ] Nothing sits on top of the top or bottom bar.

## Layout

- [ ] Every entry element starts at x = 96; nothing is 1 px off.
- [ ] The spec module and the meaning line read as one block (same pitch, no divider).
- [ ] There is no decorative hairline anywhere.
- [ ] The specimen is a motif composition, never a plain white/dark rectangle.
- [ ] The motif field is texture: you cannot name its shapes at a glance.

## Content

- [ ] Every spec value is **true** — read it out of the timeline, never from memory.
- [ ] Entry numbers match the source library (001, 002, 003 … not a re-numbering).
- [ ] The Chinese name is the library's name, not a paraphrase.

## System

- [ ] `npx hyperframes check --json` → `ok: true`; every remaining warning is one you can explain.
- [ ] Render duration equals the root `data-duration` (±1 frame).
- [ ] `ffprobe` shows H.264 + AAC, 1920×1080, 30 fps.
- [ ] Loudness measured, not guessed: `ebur128` → roughly −16…−14 LUFS, true peak ≤ −1 dBTP.
- [ ] Audio hits align with the cut list (detect peaks, compare against the table).
