# dsh-skin-collection

Multi-style skin collection for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) web GUI. Each skin registers a theme (selectable under **Settings → Appearance**) plus decoration CSS that activates only while that skin's theme is the active preference.

## Skins

| Theme id | Style | Scheme | Signature effects |
|---|---|---|---|
| `wabi-sabi` | Wabi-Sabi 侘寂 | light | Earth palette, paper grain, serif type, sepia images, Enso boot fade |
| `terminal` | Terminal 终端 | dark | Phosphor green on void black, VT323 mono, CRT scanlines + text glow, blocky scrollbar |
| `cyberpunk` | Cyberpunk 赛博朋克 | dark | Cyan/magenta/acid neon on deep teal, Space Grotesk, scanlines, chamfered images |
| `film-noir` | Film Noir 黑色电影 | dark | Chiaroscuro vignette, film grain, Oswald + typewriter body, grayscale photos with hover restore |
| `swiss` | Swiss 国际主义 | light | Off-white grid, Inter black uppercase headings, Swiss red accents, sharp corners |
| `bauhaus` | Bauhaus 包豪斯 | light | Primary-color flat geometry (red/blue/yellow), Jost, no shadows, red scrollbar |
| `brutalism` | Brutalism 野性主义 | light | 4px black borders, hard 2D shadows, warning-yellow blocks, grain overlay |
| `dark-glass` | Dark Glass 暗黑玻璃 | dark | Deep navy with blue/violet/cyan ambient glow, frosted code panels, sleek scrollbar |
| `pixel-retro` | Pixel Retro 像素复古 | dark | Indigo arcade, Press Start 2P headings, CRT scanline + vignette, pixel box-shadows |

Style sources: [uiprompt.dev web-styles](https://www.uiprompt.dev/zh/web-styles) design prompts; each skin maps the prompt's palette to `--dsw-alias-*` tokens and its key visual effects to scoped CSS.

## Install

```sh
dsh plugin --profile web add github:NonchalantLudens/dsh-client-ui-skins
# 或 npm 发布后：
# dsh plugin --profile web add dsh-skin-collection
```

Restart `dsh web`, then pick **wabi-sabi** in Settings → Appearance.

## Structure

- `lib/client.js` — shipped client bundle in the loader's closure-factory format (hand-written; no build step required for pure CSS/DOM skins)
- `src/client/index.ts` — readable source of reference, kept in sync with `lib/client.js`
- `src/skins/wabi-sabi.js` — theme tokens + scoped CSS
- `cordis.patch.yml` — inserts the plugin into the web roster on install

## Adding a skin

1. Add a theme definition (`id`, `colorScheme`, `--dsw-alias-*` token overrides) and a scoped CSS block (`body[data-dsh-skin-<id>]`) to the skins data (see `EXTRA_SKINS` in `lib/client.js` / `src/skins/`).
2. Register it in the `SKINS` array.
3. Bump the version and reinstall.

Note: all skins' Google-Fonts `@import`s are hoisted to the top of one combined decoration sheet (CSS requires `@import` before other rules); keep per-skin imports in the skin's `imports` array rather than inside its CSS body.
