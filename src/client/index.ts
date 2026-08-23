/**
 * Client source of reference (the shipped artifact is hand-written at
 * lib/client.js in the loader's closure-factory format; keep this file in
 * sync when editing).
 *
 * Multi-skin collection with a sidebar manager:
 *  - every skin registers a ThemeDefinition → appears in Settings → Appearance;
 *  - decoration CSS is scoped to body[data-dsh-skin-<id>] and the body
 *    attribute is toggled from `theme/change`, so decorations apply only
 *    while that skin's theme is the active preference;
 *  - a `sidebar.footer.action` entry ("皮肤") opens a menu to switch between
 *    the default style (light/dark/system, no skin) and every registered skin;
 *    switching away from a skin restores the base preference saved before;
 *  - all DOM nodes and style tags are created inside ctx.effect(), so plugin
 *    unload removes everything (host also strips data-plugin tags).
 */
import type { Context } from '@deepseek-ai/cordis'
import { wabiSabiTheme, wabiSabiCss } from '../skins/wabi-sabi.js'

export const name = 'ui-skins-fang'
/** Cordis service injection: `theme` (ui-theme) and `slots` (client slots). */
export const inject = ['theme', 'slots']

interface SkinDef {
  id: string
  cssAttr: string
  theme: { id: string, colorScheme: 'light' | 'dark', tokens: Record<string, string> }
  css: string
}

const SKINS: SkinDef[] = [
  { id: 'wabi-sabi', cssAttr: 'data-dsh-skin-wabi-sabi', theme: wabiSabiTheme, css: wabiSabiCss },
]

const PLUGIN_ID = '@fang/dsh-client-ui-skins'
const BASE_PREF_KEY = 'dsh-skins-base-pref'

/** Paper grain: inline SVG fractal noise, tiled, multiply-blended. */
const GRAIN_URI = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"

/** Picker stylesheet — always active (usable while the default style is on). */
const PICKER_CSS = `/* see lib/client.js pickerCss */`

export function apply(ctx: Context): void {
  if (typeof document === 'undefined') return

  for (const skin of SKINS) ctx.theme.register(skin.theme)

  const sync = (snapshot: { active: { id: string } }): void => {
    const activeId = snapshot.active?.id
    for (const skin of SKINS) {
      if (activeId === skin.id) document.body.setAttribute(skin.cssAttr, '')
      else document.body.removeAttribute(skin.cssAttr)
    }
  }
  sync(ctx.theme.getTheme())
  ctx.on('theme/change', sync)

  // Brand mark: a vermillion Hanko seal (「金」) replaces the stock logo while
  // the wabi-sabi theme is the active preference. Single-slot cells shadow by
  // ascending priority (default 0), so priority -10 wins over ui-brand-official.
  // Entries are disposed when another theme is chosen, restoring the stock logo.
  let brandDisposers: (() => void)[] | null = null
  const syncBrand = (snapshot: { preference: string }): void => {
    const want = snapshot.preference === 'wabi-sabi'
    if (want && brandDisposers === null) {
      brandDisposers = [
        ctx.slots.register({ name: 'sidebar.brand.mark', id: 'wabisabi-seal-sidebar', priority: -10 },
          (props: { size: number }) => HankoMark({ size: props.size })),
        ctx.slots.register({ name: 'conversation.hero.brand.mark', id: 'wabisabi-seal-hero', priority: -10 },
          (props: { size: number, className?: string }) =>
            h('div', { className: props.className }, HankoMark({ size: props.size }))),
      ]
    } else if (!want && brandDisposers !== null) {
      for (const d of brandDisposers) d()
      brandDisposers = null
    }
  }
  syncBrand(ctx.theme.getTheme())

  ctx.effect(() => { /* inject wabiSabiCss tag */ }, 'ui-skins: skin stylesheet')
  ctx.effect(() => { /* inject PICKER_CSS tag */ }, 'ui-skins: picker stylesheet')
  ctx.effect(() => { /* grain overlay div */ }, 'ui-skins: grain overlay')
  ctx.effect(() => { /* enso boot fade overlay */ }, 'ui-skins: enso boot fade')

  // Sidebar footer action: skin manager. The shipped implementation lives in
  // lib/client.js (React via the module table's `require`); this reference
  // names the registration contract:
  //   ctx.slots.inject('sidebar.footer.action', () =>
  //     ctx.slots.register({ name: 'sidebar.footer.action', id: 'skins-fang' },
  //       SkinManagerAction))  // owner props: { wide }
  void PICKER_CSS
}
