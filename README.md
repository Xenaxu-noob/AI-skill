# AI-skill

A collection of reusable AI skills — packaged instructions, templates, and production checklists that other agents or teams can load and run.

## Skills

### [ai-explainer-video](ai-explainer-video/)

Turn a complex idea into a **60–90 second narrated explainer**: flat-vector characters over AI-generated background plates, with script, storyboard, voiceover, captions, SFX, QA, and 16:9 / 9:16 cutdowns.

![ai-explainer-video cover](ai-explainer-video/cover_16x9.jpg)

**Use it for**

- AI / technology concept explainers
- Product launches and founder POV
- B2B sales, IR, and event loops
- Media explainer / video-essay content
- Courses, onboarding, internal training
- Multi-language and multi-aspect campaigns

**Package contents**

```text
ai-explainer-video/
  SKILL.md                     # main skill contract and workflow
  UPLOAD.md                    # title / description / tags for the skill platform
  cover_16x9.jpg               # 1920x1080 cover
  cover_16x9_1280.jpg          # 1280x720 cover
  references/
    use-cases.md               # scenarios, audiences, buying triggers, fit check
    style-bible.md             # palette, type, characters, camera, transitions
    shot-grammar.md            # 10-beat / 25-shot template
    ai-plate-prompts.md        # master prompt, negative prompt, scene prompts
    qa-checklist.md            # pre-delivery checks
    offer.md                   # packaging, scoping, revision rules
  templates/
    brief.md
    script.md
    storyboard.csv
    voiceover.md
  examples/
    case-61s-12-plates.md      # real 61.9 s case study with costs and lessons
```

## How to use

1. Read `ai-explainer-video/SKILL.md`.
2. Run the fit check in `references/use-cases.md`.
3. Fill `templates/brief.md`, `templates/script.md`, `templates/storyboard.csv`.
4. Generate or select background plates with `references/ai-plate-prompts.md`.
5. Build characters/text in code or a motion tool.
6. Run `references/qa-checklist.md` before delivery.
7. Cut 9:16 / 1:1 versions and localize VO/captions.

## Design principles

- One thesis, one metaphor, one CTA.
- 20–30 shots for 60–90 s; 2–3 s per shot.
- AI for backgrounds with empty foreground; code for characters and text.
- Text is a label; narration is the argument.
- Hard cuts plus a few white splash wipes.
- Captions must work muted.
- Consistency beats novelty.

## License

MIT — see [LICENSE](LICENSE).

### [motion-lexicon-reel](motion-lexicon-reel/)

Turn a vocabulary into a **15-second, code-rendered specimen reel**: 14 named motion moves, each demonstrated on a geometric object while the card names it — Swiss grid, a drifting motif field, a player-style HUD, three real spec rows per entry, and a 24-tile index wall on the end card.

![motion-lexicon-reel cover](motion-lexicon-reel/cover_16x9.jpg)

**Use it for**

- Design-system and motion-vocabulary teasers (easing, stagger, morph, glitch)
- "N things in N seconds" social posts and channel bumpers
- Component / icon / pattern library showreels
- Teaching design fundamentals, editing grammar, camera language
- Conference openers, proposal warm-ups, course chapter cards

**Package contents**

```text
motion-lexicon-reel/
  SKILL.md                     # main skill contract and workflow
  UPLOAD.md                    # title / description / tags for the skill platform
  cover_16x9.jpg               # 1920x1080 cover
  cover_16x9_1280.jpg          # 1280x720 cover
  references/
    style-bible.md             # grid numbers, type scale, palette, motif system, line discipline
    timeline.md                # the 14 x 0.9 s structure, retiming maths, audio sync
    qa-checklist.md            # pre-delivery checks
  template/
    index.html                 # HyperFrames root, 15.8 s
    compositions/sheet.html    # the whole film: cards, palette, motif field, timeline
    scripts/make_percussion.py # original 150 BPM percussion, cut-locked
  templates/
    entries.json               # the entry list (14 cards)
```

**Output spec** — 1920×1080 · 30 fps · 15.8 s · H.264 + AAC · −15.6 LUFS · no model calls, no stock footage.
