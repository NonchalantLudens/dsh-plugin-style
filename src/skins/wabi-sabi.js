/*
 * Wabi-Sabi / Japanese Zen — skin source (kept in lib/client.js, compiled by hand).
 *
 * Palette (light paper aesthetic):
 *   --washi-beige #f4f1e8  base ground
 *   --stone-gray  #8c8c88  secondary text
 *   --moss-green  #4a5d23  brand accent
 *   --sumi-black  #2b2b2b  primary ink
 *
 * Decorations (scoped to body[data-dsh-skin-wabi-sabi], active only while the
 * theme is selected): paper-grain multiply overlay, serif typography,
 * thin grey scrollbar, sepia chat images with slow hover restore, a vertical
 * tanzaku strip with Hanko seal, and an Enso boot fade.
 */

/* Theme tokens registered into ctx.theme (Settings → Appearance → wabi-sabi). */
export const wabiSabiTheme = {
  id: 'wabi-sabi',
  colorScheme: 'light',
  tokens: {
    '--dsw-alias-bg-base': '#f4f1e8',
    '--dsw-alias-bg-layer-1': '#efece1',
    '--dsw-alias-bg-layer-2': '#e9e5d6',
    '--dsw-alias-bg-overlay': '#faf8f0',
    '--dsw-alias-border-l1': '#ddd7c6',
    '--dsw-alias-border-l2': '#c5bda6',
    '--dsw-alias-brand-primary': '#4a5d23',
    '--dsw-alias-label-primary': '#2b2b2b',
    '--dsw-alias-label-secondary': '#6f6f68',
    '--dsw-alias-state-error-primary': '#9c3d2c',
    '--dsw-alias-state-success-primary': '#4a5d23',
    '--dsw-alias-state-warn-primary': '#a8843c',
    '--dsw-specific-sidebar-fill': '#ece8da',
  },
}

/* Decoration stylesheet; @import must lead its own sheet. */
export const wabiSabiCss = `@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600&family=Cinzel:wght@600&display=swap');

body[data-dsh-skin-wabi-sabi] {
  --dshw-washi: #f4f1e8;
  --dshw-stone: #8c8c88;
  --dshw-moss: #4a5d23;
  --dshw-sumi: #2b2b2b;
  --dshw-serif: 'Noto Serif JP', 'Cinzel', 'Songti SC', 'Noto Serif SC', 'Times New Roman', serif;
  font-family: var(--dshw-serif);
}

/* Ink stays soft; code remains mono through its own token. */
body[data-dsh-skin-wabi-sabi] :is(pre, code, kbd, samp) {
  font-family: var(--ds-font-family-code, ui-monospace, 'SF Mono', Menlo, Consolas, monospace);
}

/* Thin grey scrollbar — immersion without hiding position. */
body[data-dsh-skin-wabi-sabi] ::-webkit-scrollbar { width: 6px; height: 6px; }
body[data-dsh-skin-wabi-sabi] ::-webkit-scrollbar-thumb { background: #c5bda6; border-radius: 3px; }
body[data-dsh-skin-wabi-sabi] ::-webkit-scrollbar-track { background: transparent; }
body[data-dsh-skin-wabi-sabi] { scrollbar-width: thin; scrollbar-color: #c5bda6 transparent; }

/* Chat images: desaturated washi print, slow return to vividness on hover. */
body[data-dsh-skin-wabi-sabi] [data-chat-flow] img {
  filter: brightness(0.9) sepia(0.2);
  transition: filter 1s ease;
}
body[data-dsh-skin-wabi-sabi] [data-chat-flow] img:hover { filter: none; }

/* Serif headings inside conversation markdown. */
body[data-dsh-skin-wabi-sabi] [data-chat-flow] :is(h1,h2,h3,h4,h5,h6) {
  font-family: var(--dshw-serif);
  font-weight: 600;
}
`
