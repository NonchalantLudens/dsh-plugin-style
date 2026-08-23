# dsh-skin-collection

[![npm version](https://img.shields.io/npm/v/dsh-skin-collection)](https://www.npmjs.com/package/dsh-skin-collection)
[![license](https://img.shields.io/npm/l/dsh-skin-collection)](./LICENSE)
[![dsh-plugin](https://img.shields.io/badge/topic-dsh--plugin-blue)](https://github.com/topics/dsh-plugin)

Multi-style skin collection for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) web GUI. Each skin registers a theme plus scoped decoration CSS; a sidebar picker manages skins and the base color scheme independently — the default style restores the stock UI completely.

English | [简体中文](./README.zh.md)

## Skins

| Theme id | Style | Scheme | Signature effects |
|---|---|---|---|
| `wabi-sabi` | Wabi-Sabi 侘寂 | light | Earth palette, paper grain, serif type, sepia images, Enso boot fade, vermillion DSH seal brand mark |
| `terminal` | Terminal 终端 | dark | Phosphor green on void black, VT323 mono, CRT scanlines + text glow, blocky scrollbar |
| `cyberpunk` | Cyberpunk 赛博朋克 | dark | Cyan/magenta/acid neon on deep teal, Space Grotesk, scanlines, chamfered images |
| `film-noir` | Film Noir 黑色电影 | dark | Chiaroscuro vignette, film grain, Oswald + typewriter body, grayscale photos with hover restore |
| `swiss` | Swiss 国际主义 | light | Off-white grid, Inter black uppercase headings, Swiss red accents, sharp corners |
| `bauhaus` | Bauhaus 包豪斯 | light | Primary-color flat geometry (red/blue/yellow), Jost, no shadows, red scrollbar |
| `brutalism` | Brutalism 野性主义 | light | 4px black borders, hard 2D shadows, warning-yellow blocks, grain overlay |
| `dark-glass` | Dark Glass 暗黑玻璃 | dark | Deep navy with blue/violet/cyan ambient glow, frosted code panels, sleek scrollbar |
| `pixel-retro` | Pixel Retro 像素复古 | dark | Indigo arcade, Press Start 2P headings, CRT scanline + vignette, pixel box-shadows |

Style sources: [uiprompt.dev web-styles](https://www.uiprompt.dev/zh/web-styles) design prompts; each skin maps the prompt's palette to `--dsw-alias-*` tokens and its key visual effects to scoped CSS.

## How it works

- **Skin ≠ theme preference.** The stock ThemeRuntime persists only `light/dark/system`; a skin id held there reverts on every settings save or run-mode switch. This plugin keeps the active skin in its own persisted flag driving a `body[data-dsh-skin-<id>]` attribute — nothing automatic can revert it.
- **The skin owns the scheme.** While a skin is active, the base color scheme locks to the skin's design (`colorScheme`) so dark skins never render light chrome around dark tokens; picking the default style releases the lock and restores your previous preference.
- **Palette travels with the attribute**: each skin's `--dsw-alias-*` tokens are also emitted as plain CSS on that attribute, so colors survive any client-tree rebuild.
- **Base scheme is independent**: 跟随系统 / 浅色 / 深色 switch underneath the skin overlay.
- A skin id picked in the official **Settings → Appearance** selector is adopted automatically.

## Install

```sh
# from npm
dsh plugin --profile web add dsh-skin-collection

# or straight from GitHub (prebuilt lib/ committed — no build scripts run)
dsh plugin --profile web add github:NonchalantLudens/dsh-skin-collection
```

Restart `dsh web`. Use the **皮肤** button at the sidebar foot to pick a skin; the default style restores the stock look. Skins also appear under Settings → Appearance.

No install-time code execution: the package ships prebuilt artifacts and declares no build scripts.

## Structure

- `lib/client.js` — shipped client bundle in the loader's closure-factory format (hand-written; no build step required for pure CSS/DOM skins)
- `lib/index.js` — node half (no-op cordis plugin stub)
- `src/client/index.ts`, `src/skins/` — readable source of reference, kept in sync with `lib/`
- `cordis.patch.yml` — inserts the plugin into the web roster on install

## Adding a skin

1. Append an entry to `EXTRA_SKINS` (`id`, `label`, `theme.tokens`, optional Google-Fonts `imports`, scoped `css`) in `lib/client.js`.
2. Done — registration, the picker menu, palette emission, and the attribute guard are data-driven.
3. Bump the version and reinstall.

Note: all skins' Google-Fonts `@import`s are hoisted to the top of one combined decoration sheet (CSS requires `@import` before other rules); keep per-skin imports in the skin's `imports` array rather than inside its CSS body.

## License

[MIT](./LICENSE)
