# Assets

This project needs two things that are not committed here.

## Display font

The title face is **Noto Sans SC Black (900)**, OFL licensed, ~8.8 MB:

```bash
curl -L -o assets/fonts/NotoSansSC-Black.otf \
  https://github.com/notofonts/noto-cjk/raw/main/Sans/SubsetOTF/SC/NotoSansSC-Black.otf
```

`compositions/sheet.html` declares it as:

```css
@font-face {
  font-family: "NowBlack";
  src: url("assets/fonts/NotoSansSC-Black.otf") format("opentype");
  font-weight: 900;
  font-display: block;
}
```

Latin numerals use `Archivo Black`, HUD text uses `JetBrains Mono` — both ship inside HyperFrames, so they resolve by name.

## GSAP

Vendor it, do not rely on a CDN at render time:

```bash
curl -L -o assets/vendor/gsap.min.js https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js
```

`index.html` loads `assets/vendor/gsap.min.js`. A CDN `<script>` fails inside a sandboxed render.
