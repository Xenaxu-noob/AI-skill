# AI Background Plate Prompts

Use AI only for **background plates with empty foreground**. Do not generate characters, faces, hands, text, logos, or precise UI.

## Master positive prompt

> Full frontal eye-level view, camera perfectly level and straight-on, one-point perspective, all main surfaces parallel to the picture plane, symmetrical centered composition, wide 16:9 background plate for a flat-vector infographic. Soft flat shading, one slightly darker flat tone per object, NO outlines. Muted palette: dusty blue-grey, slate teal, warm beige, navy, soft purple, salmon accents. Subtle film grain, polished, clean, large empty areas reserved for characters and text overlays. Background plate only, no people, no text, no letters, no logo, no watermark, no UI, no captions.

## Master negative prompt

> text, letters, words, typography, logo, watermark, caption, subtitle, UI, interface, floating card, white panel, frame, border, outline, black outline, people, person, human, character, face, hands, animal, photorealistic, 3D render, glossy, neon, harsh shadows, graffiti, dutch angle, tilted camera, wide-angle distortion, fisheye, extreme perspective, asymmetrical composition, cropped furniture

For plates with chairs, add:

> chair, chair back, backrest, high-back chair, armrest, office chair, school chair, plastic chair with back, bench with back

## Scene prompt snippets

### Exterior / HQ

> A modern AI research company exterior at dusk, seen from directly across the street. The building facade is centered and perfectly frontal, all window rows horizontal, the large blank signboard is a flat rectangle parallel to the camera, not angled. The right side of the building is a plain continuation of the same facade, no white panel and no separate wing.

### Desk / home office

> A quiet home-office desk at night, seen from directly in front at desk height. The desk is centered and frontal, the computer monitor is a perfectly rectangular flat screen facing the camera, screen completely blank dark grey. Keyboard flat, mug, small plant, lamp, shelves and window square to the camera. A simple BACKLESS stool with no backrest and no arms sits in front of the desk.

### Classroom

> An empty classroom seen from directly in front at standing height. The large green blackboard is a perfectly rectangular flat plane parallel to the camera, completely blank. Student desks in neat rows, each with a simple BACKLESS round stool with no backrest and no arms, seats fully visible. Teacher desk to the left. Clear floor area for characters.

### Studio / office

> An EMPTY animation studio, completely unoccupied, no people at all. Three work desks in a row, each with a simple BACKLESS ROUND STOOL only: round wooden seat on four thin metal legs, NO backrest, NO vertical back, NO chair back. Three blank monitors face the camera. A large blank cream board on the back wall is a flat rectangle parallel to the camera.

> An EMPTY open-plan office, completely unoccupied, no people at all. Four work desks in a row, each with a simple BACKLESS ROUND STOOL only. Four blank monitors face the camera. A large blank whiteboard on the back wall is a flat rectangle parallel to the camera.

### Control room

> An EMPTY control room, completely unoccupied, no people at all. A huge blank dark screen is a perfectly rectangular flat plane parallel to the camera, centered, completely blank. A long console with unlabeled buttons and small screens below it. NO chairs, NO stools, NO seats: the floor in front of the console is completely clear for later character placement.

### Art studio

> An EMPTY art studio, completely unoccupied, no people at all. A wooden easel holds a large blank canvas that is a perfectly rectangular flat plane parallel to the camera, completely blank. Typewriter on a side desk, paint jars and brushes on shelves, warm lamp. A simple BACKLESS wooden stool with no backrest sits to the side.

### Library

> An empty old library seen from directly in front, one-point perspective. Tall bookshelves on both sides, a tall arched window centered, wooden ladder, warm pendant lights, clear central floor. No books floating, no text, no people.

## Parameters (Qwen-Image 3.0 / SolGrid example)

```json
{
  "size": "2048*1152",
  "n": 3,
  "prompt_extend": false,
  "enable_thinking": false,
  "watermark": false,
  "seed": 2026110501
}
```

- Generate 3 variants; select one.
- Inspect for: people, gibberish text, UI cards, extra white panels, angled sign, chair backs.
- If the plate fails, regenerate. Do not build a whole film around a bad plate.
- Log actual cost per successful call; failed calls are not always charged.

## Selection criteria

- Main surface is frontal and rectangular.
- Blank area is large enough for code text.
- No face/hands/text/logo.
- Chair seats visible; no backrests.
- Empty floor area for characters.
- Color temperature compatible with the existing plates.
- Right side has no floating white panel.

## What to fix in code instead

- Blank sign too small → draw a flat sign panel.
- Monitor angled → draw a flat monitor face.
- Poster angled → move text to a flat board.
- Chair has a backrest → cover with a plant/cabinet, or discard.
- Character floats → align body bottom to seat; add no legs if using torso style.
