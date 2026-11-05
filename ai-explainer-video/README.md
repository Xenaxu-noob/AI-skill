# AI Explainer Video — Skill Package

A ready-to-upload skill for producing 60–90 second narrated explainer videos in a flat-vector + AI-plate hybrid style.

## What is inside

```
SKILL.md
UPLOAD.md                      # title / name / description / cover copy
cover_16x9.jpg                 # 1920x1080 cover
cover_16x9_1280.jpg            # 1280x720 cover                         # main skill instructions
references/
  use-cases.md                   # scenarios, audiences, buying triggers, fit checklist
  style-bible.md                 # palette, type, characters, camera, transitions
  shot-grammar.md                # 10-beat / 25-shot template
  ai-plate-prompts.md            # master prompt, negative prompt, scene prompts
  qa-checklist.md                # pre-delivery checks
  offer.md                       # packaging, scoping, revision rules
templates/
  brief.md                       # client brief
  script.md                      # 10-beat script template
  storyboard.csv                 # shot list columns
  voiceover.md                   # pronunciation / pacing sheet
examples/
  case-61s-12-plates.md    # real 61.9 s case study with costs and lessons
```

## Upload

Zip the **contents** of this folder so `SKILL.md` is at the zip root:

```
ai-explainer-video.zip
  SKILL.md
  references/...
  templates/...
  examples/...
```

If the platform requires a single file, upload `SKILL.md`; the references are optional reading for the agent.

## How to use

1. Read `SKILL.md`.
2. Run the fit check in `references/use-cases.md`.
3. Fill `templates/brief.md`, `templates/script.md`, `templates/storyboard.csv`.
4. Use `references/ai-plate-prompts.md` for backgrounds.
5. Build characters/text in code or a motion tool.
6. Run `references/qa-checklist.md` before delivery.
7. Cut 9:16 / 1:1 versions; localize VO/captions.

## Design principles

- One thesis, one metaphor, one CTA.
- 20–30 shots for 60–90 s; 2–3 s per shot.
- AI for backgrounds with empty foreground; code for characters and text.
- Text is a label, narration is the argument.
- Hard cuts + a few white splash wipes.
- Captions must work muted.
- Consistency beats novelty.

## Renderer-agnostic

The skill does not require a specific engine. Use Canvas/HTML, After Effects, Remotion, or a custom renderer. The contract is the timing, typography, safe areas, and QA — not the tool.

## Paid tools

AI image generation is optional. If a paid tool is used:

- inspect the tool and price first;
- quote the number of calls and a hard cap;
- generate 1 sample, then expand;
- log actual cost per successful call;
- never use AI-generated text/UI/people in the final plate.
