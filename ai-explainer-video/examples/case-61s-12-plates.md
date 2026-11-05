# Case Study: 61.9 s / 25 shots / 12 AI plates

## Brief

- Goal: explain an AI model in 60 seconds.
- Audience: general tech-curious viewers.
- Style: flat-vector characters + AI background plates.
- Voice: English male, neutral.
- On-screen text: Chinese; brand names in Latin.
- Format: 1920×1080, 60 fps, 61.9 s.

## Structure

25 shots, 10 beats, 5 white splash wipes, hard cuts elsewhere.

Key visual decisions:

- Living room and final share the same plate and character.
- Hero robot appears at 9.4 s with a nameplate.
- Mechanism section uses library → classroom → space → control room.
- Product section uses chat → desk → art studio.
- Craft section uses script → art → animation → sound → office.
- Check scene uses a clock and a green check.
- Final card asks “这是人做的吗？”.

## Plates

12 plates generated, 7 regenerated for a second version:

- living / studio / HQ / OpenAI / lab / stage / library / classroom / control / art studio / office / desk.

Lessons:

- AI plates often contain people, gibberish UI, or a stray white panel. Inspect all four corners.
- A blank sign is often angled; replace it with a flat code panel or draw the text on a flat surface.
- Chairs often come with high backrests even when the prompt says “backless”. Use “backless round stool” and negative “chair back, backrest”.
- A control room may still add high-back chairs; regenerate with an empty floor and add code stools.

## Cost log (example)

- 11 successful image calls × $0.105179 = **$1.156969** for the second plate pass.
- 7 plates used; 4 discarded (classroom with backs, studio with people, office with people/backs, control with high-back chairs).
- Total project cost including earlier passes: **$2.839833**.
- Always separate AI generation cost from labor.

## What worked

- One strong metaphor per act.
- 2–3 s per shot; text as labels, VO as argument.
- AI plates for wide/empty scenes; code characters for consistency.
- White splash wipes at act changes only.
- Captions readable muted.

## What failed

- AI-generated text/UI; never ship it.
- Text pasted on angled plates; replace with a flat panel.
- Character floating above a stool; align body bottom to seat.
- Phone screen facing the audience; draw the back.
- Shoe/leg seam; end pant leg inside the shoe.
- Too many static wide shots; add one pullback or stack growth.

## Reusable assets

- 3 character types (viewer, robot, scientist).
- 10 props (phone, monitor, book stack, console, easel, etc.).
- 5 transitions (hard cut, white wipe, pop, whoosh, hold).
- 3 card styles (label, number, quote).
