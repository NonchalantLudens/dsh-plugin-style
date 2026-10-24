window.__ModuleLoader__.load({ id: "dsh-plugin-style", factory: (require) => {
var module = { exports: {} };
var exports = module.exports;

var react = require("react");
var createElement = react.createElement;
// Platform module (loader seed table): the stock whale mark for rail mode, and
// the product glyphs so the header trigger matches the controls beside it.
var primitives = require("@deepseek-ai/dsh-client-ui-primitives");
var FishLogo = primitives.FishLogo;
var IconSettingsOutlineRegular = primitives.IconSettingsOutlineRegular;
var IconCheckOutlineRegular = primitives.IconCheckOutlineRegular;

// ── skins/wabi-sabi.js ───────────────────────────────────────────────────────
var wabiSabiTheme = {
	id: "wabi-sabi",
	colorScheme: "light",
	tokens: {
		"--dsw-alias-bg-base": "#f4f1e8",
		"--dsw-alias-bg-layer-1": "#efece1",
		"--dsw-alias-bg-layer-2": "#e9e5d6",
		"--dsw-alias-bg-overlay": "#faf8f0",
		"--dsw-alias-border-l1": "#ddd7c6",
		"--dsw-alias-border-l2": "#c5bda6",
		"--dsw-alias-brand-primary": "#4a5d23",
		"--dsw-alias-label-primary": "#2b2b2b",
		"--dsw-alias-label-secondary": "#6f6f68",
		"--dsw-alias-state-error-primary": "#9c3d2c",
		"--dsw-alias-state-success-primary": "#4a5d23",
		"--dsw-alias-state-warn-primary": "#a8843c",
		"--dsw-specific-sidebar-fill": "#ece8da"
	}
};

// Decoration stylesheet; @import must lead its own sheet.
var wabiSabiCss = "body[data-dsh-skin-wabi-sabi] {\n  --dshw-washi: #f4f1e8;\n  --dshw-stone: #8c8c88;\n  --dshw-moss: #4a5d23;\n  --dshw-sumi: #2b2b2b;\n  --dshw-serif: 'Noto Serif JP', 'Cinzel', 'Songti SC', 'Noto Serif SC', 'Times New Roman', serif;\n  font-family: var(--dshw-serif);\n}\n\n/* Ink stays soft; code remains mono through its own token. */\nbody[data-dsh-skin-wabi-sabi] :is(pre, code, kbd, samp) {\n  font-family: var(--ds-font-family-code, ui-monospace, 'SF Mono', Menlo, Consolas, monospace);\n}\n\n/* Thin grey scrollbar — immersion without hiding position. */\nbody[data-dsh-skin-wabi-sabi] ::-webkit-scrollbar { width: 6px; height: 6px; }\nbody[data-dsh-skin-wabi-sabi] ::-webkit-scrollbar-thumb { background: #c5bda6; border-radius: 3px; }\nbody[data-dsh-skin-wabi-sabi] ::-webkit-scrollbar-track { background: transparent; }\nbody[data-dsh-skin-wabi-sabi] { scrollbar-width: thin; scrollbar-color: #c5bda6 transparent; }\n\n/* Chat images: desaturated washi print, slow return to vividness on hover. */\nbody[data-dsh-skin-wabi-sabi] [data-chat-flow] img {\n  filter: brightness(0.9) sepia(0.2);\n  transition: filter 1s ease;\n}\nbody[data-dsh-skin-wabi-sabi] [data-chat-flow] img:hover { filter: none; }\n\n/* Serif headings inside conversation markdown. */\nbody[data-dsh-skin-wabi-sabi] [data-chat-flow] :is(h1,h2,h3,h4,h5,h6) {\n  font-family: var(--dshw-serif);\n  font-weight: 600;\n}\n";

/* Skin-picker stylesheet — ALWAYS active (the manager must be usable while
   the default style is selected), so this sheet is not scoped by a body attr. */
var pickerCss = ".dshw-pick-wrap { position: relative; display: flex; flex: none; }\n"
	+ "/* 28px control: wide footer row and rail circle both below. */\n"
	+ ".dshw-pick-btn {\n"
	+ "  appearance: none; border: 0; background: transparent; cursor: pointer;\n"
	+ "  box-sizing: border-box; flex: none;\n"
	+ "  width: 28px; height: 28px; padding: 0;\n"
	+ "  display: flex; align-items: center; justify-content: center;\n"
	+ "  border-radius: 8px;\n"
	+ "  color: var(--dsw-alias-label-secondary);\n"
	+ "}\n"
	+ "/* Sidebar foot, wide column. The row copies the Settings trigger row's own\n"
	+ "   geometry (42px tall, 4px/-2px vertical margins, 8px gap) so the button\n"
	+ "   aligns with the Settings button and the connection indicator beside it\n"
	+ "   instead of introducing a row of its own above the seat. */\n"
	+ ".dshw-foot {\n"
	+ "  position: relative;\n"
	+ "  display: flex; align-items: center;\n"
	+ "  width: calc(100% + 4px); margin: 4px -2px; padding: 0 2px 0 8px;\n"
	+ "  box-sizing: border-box;\n"
	+ "}\n"
	+ ".dshw-foot .dshw-pick-btn {\n"
	+ "  height: 28px;\n"
	+ "  border-radius: var(--dsw-radius-sm, 8px);\n"
	+ "}\n"
	+ "/* Rail (collapsed sidebar): the same 36x36 box as every other rail control. */\n"
	+ ".dshw-foot .dshw-pick-btn.dshw-rail {\n"
	+ "  width: 36px; height: 36px; margin: 8px auto 10px; border-radius: 50%;\n"
	+ "}\n"
	+ ".dshw-rail-foot { display: flex; justify-content: center; }\n"
	+ ".dshw-pick-btn:hover { background: var(--dsw-alias-interactive-bg-hover); }\n"
	+ ".dshw-pick-btn:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: -2px; }\n"
	+ ".dshw-pick-btn svg { flex: none; width: 15px; height: 15px; }\n"
	+ "/* A skin is on: the trigger takes the brand color, so leaving the stock look\n"
	+ "   without the official picker stays visible. */\n"
	+ ".dshw-pick-btn.dshw-on { color: var(--dsw-alias-brand-primary); }\n"
	+ ".dshw-pop {\n"
	+ "  position: fixed; z-index: 2147483000; min-width: 190px;\n"
	+ "  background: var(--dsw-alias-bg-overlay, #faf8f0);\n"
	+ "  color: var(--dsw-alias-label-primary, #2b2b2b);\n"
	+ "  border: 1px solid var(--dsw-alias-border-l1, #ddd7c6);\n"
	+ "  border-radius: 12px; padding: 6px;\n"
	+ "  box-shadow: 0 12px 32px rgba(0,0,0,.14);\n"
	+ "  font: inherit; font-size: 13px;\n"
	+ "}\n"
	+ ".dshw-pop-head {\n"
	+ "  font-size: 11px; letter-spacing: .08em; color: var(--dsw-alias-label-secondary, #6f6f68);\n"
	+ "  padding: 6px 10px 4px; user-select: none;\n"
	+ "}\n"
	+ ".dshw-item {\n"
	+ "  appearance: none; border: 0; background: transparent; cursor: pointer;\n"
	+ "  display: flex; align-items: center; justify-content: space-between; gap: 12px;\n"
	+ "  width: 100%; padding: 7px 10px; border-radius: 8px;\n"
	+ "  color: inherit; font: inherit; text-align: left;\n"
	+ "}\n"
	+ ".dshw-item:hover { background: var(--dsw-alias-interactive-bg-hover, rgba(0,0,0,.05)); }\n"
	+ ".dshw-item[aria-checked='true'] { color: var(--dsw-alias-brand-primary, #4a5d23); font-weight: 600; }\n"
	+ ".dshw-item-sub { font-size: 11px; color: var(--dsw-alias-label-secondary, #6f6f68); font-weight: 400; }\n"
	+ ".dshw-dot { display: none; }\n"
	+ ".dshw-item[aria-checked='true'] .dshw-dot { display: block; color: var(--dsw-alias-brand-primary, #4a5d23); }\n.dshw-item[aria-disabled='true'] { opacity: .45; cursor: default; }\n.dshw-item[aria-disabled='true']:hover { background: transparent; }\n"
	+ ".dshw-sep { height: 1px; background: var(--dsw-alias-border-l1, #ddd7c6); margin: 5px 8px; }\n"
	+ "/* Settings row: the General column's rhythm (title + description, 16px\n"
	+ "   pad, hairline separator the section strips on its last child). */\n"
	+ ".dshw-row {\n"
	+ "  display: flex; align-items: center; justify-content: space-between; gap: 24px;\n"
	+ "  padding: 16px 0; border-bottom: 0.5px solid var(--dsw-alias-border-l2, #c5bda6);\n"
	+ "}\n"
	+ ".dshw-row-title { font-size: 14px; line-height: 20px; color: var(--dsw-alias-label-primary, #2b2b2b); }\n"
	+ ".dshw-row-desc { margin-top: 4px; font-size: 12px; line-height: 18px; color: var(--dsw-alias-label-secondary, #6f6f68); }\n"
	+ ".dshw-row-actions { display: flex; align-items: center; gap: 12px; }\n";

// ── client/index.ts ──────────────────────────────────────────────────────────
var PLUGIN_ID = "dsh-plugin-style";
var BASE_PREF_KEY = "dsh-skins-base-pref";
// Durable skin selection. ui-theme only persists built-in preferences
// (light/dark/system), so a skin choice must be re-asserted by the plugin
// after every client-tree reload (e.g. any Settings-page save).
var ACTIVE_SKIN_KEY = "dsh-skins-active";
// The sidebar-foot button's own switch (General settings row). A user who
// wants the foot to carry nothing but Settings can hide the picker; the
// settings row keeps the same menu, so hiding it never strands the feature.
var TRIGGER_KEY = "dsh-skins-footer-button";

// Cordis service injection: `theme` (ui-theme's registry) and `slots`
// (the client slot service). Without these declarations, accessing
// ctx.theme / ctx.slots throws "cannot get property … without inject".
var inject = ["theme", "slots"];

var WABI_IMPORTS = ["https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600&family=Cinzel:wght@600&display=swap"];

var EXTRA_SKINS = [{"id": "terminal", "label": "Terminal 终端", "cssAttr": "data-dsh-skin-terminal", "theme": {"id": "terminal", "colorScheme": "dark", "tokens": {"--dsw-alias-bg-base": "#0d1117", "--dsw-alias-bg-layer-1": "#101720", "--dsw-alias-bg-layer-2": "#131c27", "--dsw-alias-bg-overlay": "#0f151d", "--dsw-alias-border-l1": "#1d3a24", "--dsw-alias-border-l2": "#2a5233", "--dsw-alias-brand-primary": "#00ff41", "--dsw-alias-label-primary": "#3cff6e", "--dsw-alias-label-secondary": "#2a9c48", "--dsw-alias-state-error-primary": "#ff5555", "--dsw-alias-state-success-primary": "#00ff41", "--dsw-alias-state-warn-primary": "#ffb000", "--dsw-specific-sidebar-fill": "#0a0f16"}}, "imports": ["https://fonts.googleapis.com/css2?family=VT323&display=swap"], "css": "body[data-dsh-skin-terminal]{font-family:'VT323','Courier New',monospace;font-size:17px}body[data-dsh-skin-terminal] :is(h1,h2,h3,h4,h5,h6){font-family:'VT323',monospace;letter-spacing:.02em}body[data-dsh-skin-terminal] :is(pre,code,kbd,samp){font-family:ui-monospace,'SF Mono',Menlo,Consolas,monospace}body[data-dsh-skin-terminal] :not(pre):not(code):not(kbd):not(samp){text-shadow:0 0 6px rgba(0,255,65,.3)}body[data-dsh-skin-terminal]::after{content:'';position:fixed;inset:0;z-index:2147483644;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(0,0,0,.20) 0 1px,transparent 1px 3px)}body[data-dsh-skin-terminal] ::-webkit-scrollbar{width:12px;height:12px}body[data-dsh-skin-terminal] ::-webkit-scrollbar-track{background:#000}body[data-dsh-skin-terminal] ::-webkit-scrollbar-thumb{background:#00ff41;border-radius:0}body[data-dsh-skin-terminal] ::selection{background:#00ff41;color:#000}"}, {"id": "cyberpunk", "label": "Cyberpunk 赛博朋克", "cssAttr": "data-dsh-skin-cyberpunk", "theme": {"id": "cyberpunk", "colorScheme": "dark", "tokens": {"--dsw-alias-bg-base": "#0f2223", "--dsw-alias-bg-layer-1": "#162e30", "--dsw-alias-bg-layer-2": "#1b383b", "--dsw-alias-bg-overlay": "#14282a", "--dsw-alias-border-l1": "#0e4a52", "--dsw-alias-border-l2": "#155a64", "--dsw-alias-brand-primary": "#00f2ff", "--dsw-alias-label-primary": "#e6feff", "--dsw-alias-label-secondary": "#79b7bc", "--dsw-alias-state-error-primary": "#ff2e88", "--dsw-alias-state-success-primary": "#ccff00", "--dsw-alias-state-warn-primary": "#ffb000", "--dsw-specific-sidebar-fill": "#122628"}}, "imports": ["https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap"], "css": "body[data-dsh-skin-cyberpunk]{font-family:'Space Grotesk',system-ui,sans-serif}body[data-dsh-skin-cyberpunk] :is(h1,h2,h3,h4,h5,h6){font-weight:700;letter-spacing:-.01em}body[data-dsh-skin-cyberpunk] :is(h1,h2,h3){text-shadow:0 0 14px rgba(0,242,255,.45)}body[data-dsh-skin-cyberpunk]::after{content:'';position:fixed;inset:0;z-index:2147483644;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(0,0,0,.14) 0 1px,transparent 1px 4px)}body[data-dsh-skin-cyberpunk] ::selection{background:#ff00ff;color:#fff}body[data-dsh-skin-cyberpunk] [data-chat-flow] img{clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))}body[data-dsh-skin-cyberpunk] [data-chat-flow] :is(pre,code){border-left:2px solid #00f2ff}"}, {"id": "film-noir", "label": "Film Noir 黑色电影", "cssAttr": "data-dsh-skin-film-noir", "theme": {"id": "film-noir", "colorScheme": "dark", "tokens": {"--dsw-alias-bg-base": "#050505", "--dsw-alias-bg-layer-1": "#101010", "--dsw-alias-bg-layer-2": "#171717", "--dsw-alias-bg-overlay": "#121212", "--dsw-alias-border-l1": "#2e2e2e", "--dsw-alias-border-l2": "#404040", "--dsw-alias-brand-primary": "#c0392b", "--dsw-alias-label-primary": "#f0f0f0", "--dsw-alias-label-secondary": "#969696", "--dsw-alias-state-error-primary": "#d84a4a", "--dsw-alias-state-success-primary": "#8fa878", "--dsw-alias-state-warn-primary": "#c9a227", "--dsw-specific-sidebar-fill": "#0b0b0b"}}, "imports": ["https://fonts.googleapis.com/css2?family=Oswald:wght@500;600&family=Courier+Prime&display=swap"], "css": "body[data-dsh-skin-film-noir]{font-family:'Courier Prime','Courier New',monospace}body[data-dsh-skin-film-noir] :is(h1,h2,h3,h4,h5,h6){font-family:'Oswald','Arial Narrow',sans-serif;text-transform:uppercase;letter-spacing:.04em}body[data-dsh-skin-film-noir]::before{content:'';position:fixed;inset:0;z-index:2147483645;pointer-events:none;background:radial-gradient(circle,transparent 42%,rgba(0,0,0,.55) 100%)}body[data-dsh-skin-film-noir]::after{content:'';position:fixed;inset:0;z-index:2147483644;pointer-events:none;mix-blend-mode:overlay;opacity:.5;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\");background-size:240px 240px}body[data-dsh-skin-film-noir] [data-chat-flow] img{filter:grayscale(100%) contrast(1.2);transition:filter .6s ease}body[data-dsh-skin-film-noir] [data-chat-flow] img:hover{filter:grayscale(50%) contrast(1.1)}body[data-dsh-skin-film-noir] ::-webkit-scrollbar{width:6px;height:6px}body[data-dsh-skin-film-noir] ::-webkit-scrollbar-thumb{background:#262626;border-radius:0}body[data-dsh-skin-film-noir] ::selection{background:#8a0303;color:#f0f0f0}"}, {"id": "swiss", "label": "Swiss 国际主义", "cssAttr": "data-dsh-skin-swiss", "theme": {"id": "swiss", "colorScheme": "light", "tokens": {"--dsw-alias-bg-base": "#F4F4F0", "--dsw-alias-bg-layer-1": "#FFFFFF", "--dsw-alias-bg-layer-2": "#ECECE6", "--dsw-alias-bg-overlay": "#FFFFFF", "--dsw-alias-border-l1": "#C9C9C2", "--dsw-alias-border-l2": "#111111", "--dsw-alias-brand-primary": "#FF3300", "--dsw-alias-label-primary": "#111111", "--dsw-alias-label-secondary": "#55554F", "--dsw-alias-state-error-primary": "#FF3300", "--dsw-alias-state-success-primary": "#1A7A3C", "--dsw-alias-state-warn-primary": "#B8860B", "--dsw-specific-sidebar-fill": "#EDEDE7"}}, "imports": ["https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&display=swap"], "css": "body[data-dsh-skin-swiss]{font-family:'Inter',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}body[data-dsh-skin-swiss] :is(h1,h2,h3,h4,h5,h6){font-weight:900;letter-spacing:-.02em;text-transform:uppercase}body[data-dsh-skin-swiss] ::selection{background:#FF3300;color:#fff}body[data-dsh-skin-swiss] [data-chat-flow] img{filter:grayscale(100%) contrast(1.05)}body[data-dsh-skin-swiss] [data-chat-flow] :is(blockquote,pre){border:none;border-left:4px solid #FF3300;border-radius:0}body[data-dsh-skin-swiss] ::-webkit-scrollbar{width:10px;height:10px}body[data-dsh-skin-swiss] ::-webkit-scrollbar-track{background:#F4F4F0}body[data-dsh-skin-swiss] ::-webkit-scrollbar-thumb{background:#111111;border-radius:0}"}, {"id": "bauhaus", "label": "Bauhaus 包豪斯", "cssAttr": "data-dsh-skin-bauhaus", "theme": {"id": "bauhaus", "colorScheme": "light", "tokens": {"--dsw-alias-bg-base": "#f4f4f4", "--dsw-alias-bg-layer-1": "#FFFFFF", "--dsw-alias-bg-layer-2": "#EBEBEB", "--dsw-alias-bg-overlay": "#FFFFFF", "--dsw-alias-border-l1": "#111111", "--dsw-alias-border-l2": "#111111", "--dsw-alias-brand-primary": "#D22730", "--dsw-alias-label-primary": "#111111", "--dsw-alias-label-secondary": "#5c5c5c", "--dsw-alias-state-error-primary": "#D22730", "--dsw-alias-state-success-primary": "#1946BA", "--dsw-alias-state-warn-primary": "#B8860B", "--dsw-specific-sidebar-fill": "#EDEDED"}}, "imports": ["https://fonts.googleapis.com/css2?family=Jost:wght@400;600;800&display=swap"], "css": "body[data-dsh-skin-bauhaus]{font-family:'Jost','Futura','Century Gothic',sans-serif}body[data-dsh-skin-bauhaus] :is(h1,h2,h3,h4,h5,h6){font-weight:800;text-transform:uppercase}body[data-dsh-skin-bauhaus] *{box-shadow:none!important}body[data-dsh-skin-bauhaus] [data-chat-flow] img{border:4px solid #111;border-radius:0;filter:grayscale(100%) contrast(1.1)}body[data-dsh-skin-bauhaus] ::-webkit-scrollbar{width:10px;height:10px}body[data-dsh-skin-bauhaus] ::-webkit-scrollbar-track{background:#fff}body[data-dsh-skin-bauhaus] ::-webkit-scrollbar-thumb{background:#D22730;border-radius:0}body[data-dsh-skin-bauhaus] ::selection{background:#F1C40F;color:#111}"}, {"id": "brutalism", "label": "Brutalism 野性主义", "cssAttr": "data-dsh-skin-brutalism", "theme": {"id": "brutalism", "colorScheme": "light", "tokens": {"--dsw-alias-bg-base": "#f5f4ef", "--dsw-alias-bg-layer-1": "#FFFDF6", "--dsw-alias-bg-layer-2": "#FFE94D", "--dsw-alias-bg-overlay": "#FFFDF6", "--dsw-alias-border-l1": "#111111", "--dsw-alias-border-l2": "#111111", "--dsw-alias-brand-primary": "#FF5C00", "--dsw-alias-label-primary": "#111111", "--dsw-alias-label-secondary": "#494943", "--dsw-alias-state-error-primary": "#D22730", "--dsw-alias-state-success-primary": "#0A7A2F", "--dsw-alias-state-warn-primary": "#B8860B", "--dsw-specific-sidebar-fill": "#EFEDE4"}}, "imports": ["https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap"], "css": "body[data-dsh-skin-brutalism]{font-family:'Space Grotesk',system-ui,sans-serif}body[data-dsh-skin-brutalism] :is(h1,h2,h3,h4,h5,h6){font-weight:700;line-height:.95;letter-spacing:-.02em;text-transform:uppercase}body[data-dsh-skin-brutalism] [data-chat-flow] :is(img,pre,blockquote){border:4px solid #111;box-shadow:8px 8px 0 #111;border-radius:0;background:#fff}body[data-dsh-skin-brutalism] [data-chat-flow] img:hover{transform:translate(-2px,-2px);box-shadow:10px 10px 0 #111}body[data-dsh-skin-brutalism]::after{content:'';position:fixed;inset:0;z-index:2147483644;pointer-events:none;mix-blend-mode:multiply;opacity:.14;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\");background-size:240px 240px}body[data-dsh-skin-brutalism] ::-webkit-scrollbar{width:14px;height:14px}body[data-dsh-skin-brutalism] ::-webkit-scrollbar-track{background:#111}body[data-dsh-skin-brutalism] ::-webkit-scrollbar-thumb{background:#FFE94D;border:2px solid #111;border-radius:0}body[data-dsh-skin-brutalism] ::selection{background:#FF5C00;color:#fff}"}, {"id": "dark-glass", "label": "Dark Glass 暗黑玻璃", "cssAttr": "data-dsh-skin-dark-glass", "theme": {"id": "dark-glass", "colorScheme": "dark", "tokens": {"--dsw-alias-bg-base": "#050510", "--dsw-alias-bg-layer-1": "#0A0A18", "--dsw-alias-bg-layer-2": "#101020", "--dsw-alias-bg-overlay": "#121224", "--dsw-alias-border-l1": "#FFFFFF1A", "--dsw-alias-border-l2": "#FFFFFF33", "--dsw-alias-brand-primary": "#00D4FF", "--dsw-alias-label-primary": "#EEF0FF", "--dsw-alias-label-secondary": "#8B90B3", "--dsw-alias-state-error-primary": "#FF5C7A", "--dsw-alias-state-success-primary": "#37D67A", "--dsw-alias-state-warn-primary": "#F5A623", "--dsw-specific-sidebar-fill": "#08081A"}}, "imports": ["https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"], "css": "body[data-dsh-skin-dark-glass]{font-family:'Inter',system-ui,sans-serif}body[data-dsh-skin-dark-glass]::before{content:'';position:fixed;inset:0;z-index:2147483643;pointer-events:none;background:linear-gradient(180deg,rgba(13,13,242,.08),transparent 30%),radial-gradient(60vw 40vh at 80% -5%,rgba(168,13,242,.16),transparent 60%),radial-gradient(50vw 35vh at 10% 110%,rgba(0,212,255,.10),transparent 60%)}body[data-dsh-skin-dark-glass] [data-chat-flow] :is(pre){background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(16px)}body[data-dsh-skin-dark-glass] ::-webkit-scrollbar{width:8px;height:8px}body[data-dsh-skin-dark-glass] ::-webkit-scrollbar-track{background:#050510}body[data-dsh-skin-dark-glass] ::-webkit-scrollbar-thumb{background:rgba(255,255,255,.2);border-radius:8px}body[data-dsh-skin-dark-glass] ::selection{background:rgba(13,13,242,.5);color:#fff}"}, {"id": "pixel-retro", "label": "Pixel Retro 像素复古", "cssAttr": "data-dsh-skin-pixel-retro", "theme": {"id": "pixel-retro", "colorScheme": "dark", "tokens": {"--dsw-alias-bg-base": "#201a2e", "--dsw-alias-bg-layer-1": "#282038", "--dsw-alias-bg-layer-2": "#302643", "--dsw-alias-bg-overlay": "#241d33", "--dsw-alias-border-l1": "#4a3d63", "--dsw-alias-border-l2": "#5d4d7a", "--dsw-alias-brand-primary": "#ff0055", "--dsw-alias-label-primary": "#f2ecff", "--dsw-alias-label-secondary": "#a99cc4", "--dsw-alias-state-error-primary": "#ff3860", "--dsw-alias-state-success-primary": "#00e756", "--dsw-alias-state-warn-primary": "#ffd75e", "--dsw-specific-sidebar-fill": "#1a1526"}}, "imports": ["https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"], "css": "body[data-dsh-skin-pixel-retro]{font-family:'VT323','Courier New',monospace;font-size:17px}body[data-dsh-skin-pixel-retro] :is(h1,h2,h3,h4,h5,h6){font-family:'Press Start 2P',monospace;font-size:.92em;line-height:1.5;text-shadow:3px 3px 0 rgba(0,0,0,.6)}body[data-dsh-skin-pixel-retro] [data-chat-flow] img{image-rendering:pixelated}body[data-dsh-skin-pixel-retro] [data-chat-flow] :is(pre,blockquote){border:none;box-shadow:inset -4px -4px 0 0 rgba(0,0,0,.5),4px 4px 0 0 #000;background:#191326}body[data-dsh-skin-pixel-retro]::after{content:'';position:fixed;inset:0;z-index:2147483644;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(0,0,0,.22) 0 1px,transparent 1px 3px),radial-gradient(circle,transparent 60%,rgba(0,0,0,.4) 100%)}body[data-dsh-skin-pixel-retro] ::-webkit-scrollbar{width:14px;height:14px}body[data-dsh-skin-pixel-retro] ::-webkit-scrollbar-track{background:#191326}body[data-dsh-skin-pixel-retro] ::-webkit-scrollbar-thumb{background:#ff0055;border:2px solid #000;border-radius:0}body[data-dsh-skin-pixel-retro] ::selection{background:#00e756;color:#201a2e}"}];

var SKINS = [{ id: "wabi-sabi", label: "Wabi-Sabi \u4fa8\u5bc2", cssAttr: "data-dsh-skin-wabi-sabi", theme: wabiSabiTheme, css: wabiSabiCss, imports: WABI_IMPORTS }].concat(EXTRA_SKINS);

/* One combined decoration sheet: every @import hoisted to the top (CSS
   requires @import rules to precede all other rules in a sheet), followed
   by each skin's scoped body CSS. */
var SKIN_SHEET = (function() {
	var imports = [];
	var bodies = [];
	for (const s of SKINS) {
		for (const url of (s.imports || [])) imports.push("@import url('" + url + "');");
		if (s.css) bodies.push(s.css);
		// Palette as plain CSS on the skin's body attribute: the decorations
		// hold even while the stock ThemeRuntime has forgotten the registered
		// theme (it persists only built-in preferences across reloads).
		var toks = [];
		for (const t of Object.entries(s.theme.tokens || {})) toks.push(t[0] + ": " + t[1]);
		if (toks.length) bodies.push("body[" + s.cssAttr + "] { " + toks.join("; ") + "; }");
	}
	return imports.join("\n") + "\n" + bodies.join("\n");
})();

// Paper grain: inline SVG fractal noise, tiled, multiply-blended.
var GRAIN_URI = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

function apply(ctx) {
	if (typeof document === "undefined") return;

	// Register every skin's palette; Appearance lists them in registration order.
	for (const skin of SKINS) ctx.theme.register(skin.theme);

	// Header trigger preference. Read here rather than with the skin flag below
	// because the settings row that writes it registers later in this function.
	var triggerOn = true;
	try {
		var storedTrigger = localStorage.getItem(TRIGGER_KEY);
		if (storedTrigger === "off") triggerOn = false;
	} catch {}

	// ── Skin state: fully decoupled from the theme preference ──────────────
	// The stock ThemeRuntime persists only light/dark/system, and every
	// settings save re-adopts that document value — a skin id held in the
	// preference always reverts. The skin therefore lives ENTIRELY here: a
	// localStorage flag drives the body attribute; palette tokens ship as
	// plain CSS scoped to that attribute (see SKIN_SHEET); the base scheme
	// (light/dark/system) stays an independent dimension owned by the theme
	// preference. Nothing automatic can touch the flag — only the explicit
	// "关闭皮肤" pick clears it.
	var activeSkinId = null;
	try { activeSkinId = localStorage.getItem(ACTIVE_SKIN_KEY) || null; } catch {}
	if (activeSkinId && !SKINS.some((s) => s.id === activeSkinId)) activeSkinId = null;

	var skinAttr = function(id) {
		var hit = SKINS.find((s) => s.id === id);
		return hit ? hit.cssAttr : null;
	};
	var applySkinAttrs = function() {
		for (const s of SKINS) {
			if (activeSkinId === s.id) document.body.setAttribute(s.cssAttr, "");
			else document.body.removeAttribute(s.cssAttr);
		}
	};
	var emitSkinsChanged = function() {
		try { window.dispatchEvent(new window.Event("dsh-skins-change")); } catch {}
	};

	// A skin sets the scheme it OPENS with, not one it owns. Picking a skin
	// moves the preference to the skin's design scheme once; afterwards the
	// user's own light/dark/system choice stands, so 外观 in the menu keeps
	// working while a skin is on. The scheme still matters structurally: dark
	// components need body[data-ds-dark-theme] and vice versa, or dark tokens
	// render with light chrome around them.
	var desiredBase = function(id) {
		var hit = SKINS.find((s) => s.id === id);
		return hit ? hit.theme.colorScheme : null;
	};
	// Only the removed data-ds-dark-theme attribute is repaired (the stock
	// presenter is the only writer), never the preference itself: re-asserting
	// a scheme here would fight every later 外观 pick.
	var enforceSkinScheme = function() { return false; };

	// Attribute guard: restore the flag's attribute if anything strips it,
	// and keep the base scheme locked to the skin while it is active.
	ctx.effect(function() {
		var observer = new MutationObserver(function() {
			if (!activeSkinId) return;
			var attr = skinAttr(activeSkinId);
			if (attr && !document.body.hasAttribute(attr)) document.body.setAttribute(attr, "");
			enforceSkinScheme();
		});
		observer.observe(document.body, {
			attributes: true, attributeFilter: SKINS.map((s) => s.cssAttr).concat(["data-ds-dark-theme"]),
		});
		return function() { observer.disconnect(); };
	}, "ui-skins: skin attribute guard");
	// ── Brand mark: vermillion DSH seal while the Wabi-Sabi skin is active ──
	// The sidebar/hero brand slots are single cells shadowed by ascending
	// priority (default 0); priority -10 wins over the official occupant.
	// Registration is conditional: with another theme selected the entries
	// are disposed and the stock logo returns.
	// Content follows the sidebar fold state: collapsed rail → stock whale;
	// expanded column → the seal spelling "DSH".
	var brandDisposers = null;

	function useSidebarCollapsed() {
		var st = react.useState(function() {
			return document.body.hasAttribute("data-dsh-sidebar-collapsed");
		});
		var collapsed = st[0], setCollapsed = st[1];
		react.useEffect(function() {
			var observer = new MutationObserver(function() {
				setCollapsed(document.body.hasAttribute("data-dsh-sidebar-collapsed"));
			});
			observer.observe(document.body, {
				attributes: true, attributeFilter: ["data-dsh-sidebar-collapsed"],
			});
			return function() { observer.disconnect(); };
		}, []);
		return collapsed;
	}

	function SkinBrandMark(props) {
		var size = Math.max(16, Number(props && props.size) || 24);
		var collapsed = useSidebarCollapsed();
		if (collapsed && FishLogo) return createElement(FishLogo, { size: size });
		return createElement("div", {
			title: "DSH",
			style: {
				width: size + "px", height: size + "px",
				borderRadius: Math.max(2, size * 0.14) + "px",
				background: "#bf3a2b", color: "#f4f1e8",
				display: "flex", alignItems: "center", justifyContent: "center",
				fontFamily: "'Noto Serif JP','Songti SC',serif",
				fontWeight: "600", fontSize: (size * 0.28).toFixed(1) + "px",
				letterSpacing: (size * 0.02).toFixed(1) + "px", lineHeight: 1,
				boxShadow: "inset 0 0 0 " + Math.max(1, size * 0.05).toFixed(1) + "px rgba(244,241,232,0.35)",
				flex: "none", userSelect: "none",
			},
		}, "DSH");
	}

	var syncBrandByFlag = function() {
		var want = activeSkinId === "wabi-sabi";
		if (want && brandDisposers === null) {
			brandDisposers = [
				ctx.slots.register({ name: "sidebar.brand.mark", id: "wabisabi-seal-sidebar", priority: -10 },
					function(props) { return createElement(SkinBrandMark, { size: props.size }); }),
				ctx.slots.register({ name: "conversation.hero.brand.mark", id: "wabisabi-seal-hero", priority: -10 },
					function(props) {
						return createElement("div", { className: props.className },
							createElement(SkinBrandMark, { size: props.size }));
					}),
			];
		} else if (!want && brandDisposers !== null) {
			for (const d of brandDisposers) d();
			brandDisposers = null;
		}
	};

	// A skin id arriving through the preference means the user picked one in
	// the official Appearance selector — adopt it as the active skin. Base
	// preferences never touch the flag: while a skin is active the scheme is
	// locked to its design, so stray base values are simply corrected.
	var onThemeChange = function(snapshot) {
		var pref = snapshot.preference;
		if (SKINS.some((s) => s.id === pref) && pref !== activeSkinId) {
			activeSkinId = pref;
			try { localStorage.setItem(ACTIVE_SKIN_KEY, pref); } catch {}
		}
		applySkinAttrs();
		enforceSkinScheme();
		syncBrandByFlag();
		emitSkinsChanged();
	};
	applySkinAttrs();
	enforceSkinScheme();
	syncBrandByFlag();
	ctx.on("theme/change", onThemeChange);

	// Decoration stylesheet.
	ctx.effect(function() {
		const tag = document.createElement("style");
		tag.dataset.plugin = PLUGIN_ID;
		tag.dataset.pluginCss = PLUGIN_ID + "/skins.css";
		tag.textContent = SKIN_SHEET;
		document.head.appendChild(tag);
		return () => { tag.remove(); };
	}, "ui-skins: skin stylesheet");

	// Picker stylesheet (always active).
	ctx.effect(function() {
		const tag = document.createElement("style");
		tag.dataset.plugin = PLUGIN_ID;
		tag.dataset.pluginCss = PLUGIN_ID + "/picker.css";
		tag.textContent = pickerCss;
		document.head.appendChild(tag);
		return () => { tag.remove(); };
	}, "ui-skins: picker stylesheet");

	// Paper-grain overlay (multiply), above content but non-interactive.
	ctx.effect(function() {
		const grain = document.createElement("div");
		grain.dataset.plugin = PLUGIN_ID;
		grain.dataset.skinChrome = "grain";
		grain.setAttribute("aria-hidden", "true");
		grain.style.cssText = "position:fixed;inset:0;z-index:2147483646;pointer-events:none;mix-blend-mode:multiply;opacity:0.28;background-image:" + GRAIN_URI + ";background-size:240px 240px;";
		document.body.appendChild(grain);
		return () => { grain.remove(); };
	}, "ui-skins: grain overlay");

	// Enso boot fade: shown immediately (this bundle is `immediately` tier),
	// fades once the app has had a beat to paint, then removes itself.
	ctx.effect(function() {
		const overlay = document.createElement("div");
		overlay.dataset.plugin = PLUGIN_ID;
		overlay.dataset.skinChrome = "enso-boot";
		overlay.setAttribute("aria-hidden", "true");
		overlay.innerHTML =
			"<svg viewBox=\"0 0 120 120\" style=\"width:96px;height:96px;display:block\">" +
			"<circle cx=\"60\" cy=\"60\" r=\"48\" fill=\"none\" stroke=\"#2b2b2b\" stroke-width=\"5\"" +
			" stroke-linecap=\"round\" stroke-dasharray=\"264 38\" transform=\"rotate(-90 60 60)\"" +
			" style=\"opacity:0.85\"/></svg>";
		overlay.style.cssText = "position:fixed;inset:0;z-index:2147483647;background:#f4f1e8;display:flex;align-items:center;justify-content:center;opacity:1;transition:opacity 0.9s ease;";
		document.body.appendChild(overlay);
		const timers = [
			setTimeout(() => { overlay.style.opacity = "0"; }, 900),
			setTimeout(() => { overlay.remove(); }, 1900)
		];
		return () => { for (const t of timers) clearTimeout(t); overlay.remove(); };
	}, "ui-skins: enso boot fade");

	// ── Sidebar footer action: the skin manager ─────────────────────────────
	var lastBasePref = null;
	try { lastBasePref = localStorage.getItem(BASE_PREF_KEY); } catch {}

	var isSkinId = function(id) { return SKINS.some((s) => s.id === id); };

	var pickDefault = function() {
		var restored = (lastBasePref === "light" || lastBasePref === "dark" || lastBasePref === "system")
			? lastBasePref : "system";
		activeSkinId = null;
		try { localStorage.removeItem(ACTIVE_SKIN_KEY); } catch {}
		// Drop the decoration before touching the theme: a scheme write that
		// happens to match the current one emits no change event, and the
		// attribute would otherwise survive the skin it belongs to.
		applySkinAttrs();
		syncBrandByFlag();
		lastBasePref = restored;
		try { localStorage.setItem(BASE_PREF_KEY, restored); } catch {}
		ctx.theme.setTheme(restored);
		emitSkinsChanged();
	};

	var pickSkin = function(id) {
		var pref = ctx.theme.getTheme().preference;
		if (!isSkinId(pref)) {
			lastBasePref = pref;
			try { localStorage.setItem(BASE_PREF_KEY, pref); } catch {}
		}
		activeSkinId = id;
		try { localStorage.setItem(ACTIVE_SKIN_KEY, id); } catch {}
		applySkinAttrs();
		syncBrandByFlag();
		// The skin's design scheme is only the starting point; 外观 can move it
		// afterwards, so this write must not be re-asserted anywhere else.
		ctx.theme.setTheme(desiredBase(id));
		emitSkinsChanged();
	};

	// The trigger's glyph: the product's gear, the control this picker sits
	// beside in the conversation header. ui-primitives owns the artwork; the
	// fallback keeps the bundle usable on a host that predates the icon export.
	var GearIcon = function(props) {
		var s = (props && props.size) || 15;
		if (IconSettingsOutlineRegular) return createElement(IconSettingsOutlineRegular, { size: s });
		return createElement("svg", { width: String(s), height: String(s), viewBox: "0 0 16 16", fill: "none",
			"aria-hidden": "true",
			dangerouslySetInnerHTML: { __html: "<circle cx='8' cy='8' r='6.2' stroke='currentColor' stroke-width='1.3'/><circle cx='8' cy='8' r='2.2' stroke='currentColor' stroke-width='1.3'/>" } });
	};

	var CheckMark = function() {
		if (IconCheckOutlineRegular) return createElement(IconCheckOutlineRegular, { size: 12 });
		return createElement("svg", { width: "12", height: "12", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" });
	};

	var CheckDot = function() {
		return createElement("span", { className: "dshw-dot", "aria-hidden": "true" }, createElement(CheckMark));
	};

	/**
	 * The picker: one 28px icon plus its menu, mounted either in the
	 * conversation header's corner seat or in General settings. Both hosts
	 * render the same control, so a skin is one click away wherever the
	 * current layout leaves the header.
	 */
	function useSkinMenu() {
		var openState = react.useState(false);
		var open = openState[0], setOpen = openState[1];
		var rev = react.useState(0);
		var force = rev[1];
		var btnRef = react.useRef(null);
		var popRef = react.useRef(null);

		react.useEffect(function() {
			var bump = function() { force(function(n) { return n + 1; }); };
			var off = ctx.on("theme/change", bump);
			window.addEventListener("dsh-skins-change", bump);
			return function() { window.removeEventListener("dsh-skins-change", bump); if (off) off(); };
		}, []);

		react.useEffect(function() {
			if (!open) return undefined;
			var onDown = function(e) {
				var a = btnRef.current, p = popRef.current;
				if (a && a.contains(e.target)) return;
				if (p && p.contains(e.target)) return;
				setOpen(false);
			};
			var onKey = function(e) { if (e.key === "Escape") setOpen(false); };
			document.addEventListener("mousedown", onDown);
			document.addEventListener("keydown", onKey);
			return function() {
				document.removeEventListener("mousedown", onDown);
				document.removeEventListener("keydown", onKey);
			};
		}, [open]);

		// Place the popover under the trigger and keep it inside the viewport:
		// the header seat sits at the top-right edge, so neither the rail's
		// clipping nor the old above-the-button anchoring applies any more.
		var placePop = function() {
			var p = popRef.current, b = btnRef.current;
			if (!p || !b) return;
			var r = b.getBoundingClientRect();
			var width = p.offsetWidth || 190;
			var height = p.offsetHeight || 240;
			var left = Math.max(8, Math.min(r.left, window.innerWidth - width - 8));
			var below = window.innerHeight - r.bottom - 8;
			p.style.left = left + "px";
			if (below >= height) {
				p.style.top = (r.bottom + 6) + "px";
				p.style.bottom = "auto";
			} else {
				p.style.top = "auto";
				p.style.bottom = Math.max(8, window.innerHeight - r.top + 6) + "px";
			}
		};
		react.useEffect(function() { if (open) placePop(); }, [open]);

		var snapshot = ctx.theme.getTheme();
		var pref = snapshot.preference;
		var skinActive = !!activeSkinId;
		var baseHint = pref === "dark" ? "深色" : (pref === "light" ? "浅色" : "跟随系统");
		// The preference is whatever the stock ThemeRuntime holds; a skin does not
		// shadow it, so the checked row is simply the active preference.
		var baseChecked = function(v) { return pref === v ? "true" : "false"; };
		var pickBase = function(v) {
			lastBasePref = v;
			try { localStorage.setItem(BASE_PREF_KEY, v); } catch {}
			ctx.theme.setTheme(v);
			emitSkinsChanged();
			// A skin's own palette carries its scheme, so switching light/dark
			// under a skin is a no-op on the palette but still flips the stock
			// chrome; close the menu so the change is visible.
			if (skinActive) setOpen(false);
		};

		var toggle = function() { setOpen(function(v) { return !v; }); };

		// The wrapper positions the fixed popover inside its host.
		var popover = open ? createElement("div", {
				ref: popRef, className: "dshw-pop", role: "menu", "aria-label": "皮肤管理",
			},
				// Two independent groups. 外观 is the stock light/dark/system
				// preference and nothing else — it never turns a skin off. 皮肤 is
				// the skin list, led by a explicit "关闭皮肤" row so returning to
				// the stock look is one click from the same place, and the system
				// row stays available while a skin is on (it recolors the skin's
				// background scheme rather than being disabled).
				createElement("div", { className: "dshw-pop-head" }, "外观"),
				createElement("button", {
					type: "button", className: "dshw-item", role: "menuitemradio",
					"aria-checked": baseChecked("system"),
					onClick: function() { pickBase("system"); },
				},
					createElement("span", null, "跟随系统", createElement("span", { className: "dshw-item-sub" }, "由系统深色模式决定")),
					createElement(CheckDot),
				),
				createElement("button", {
					type: "button", className: "dshw-item", role: "menuitemradio",
					"aria-checked": baseChecked("light"),
					onClick: function() { pickBase("light"); },
				},
					createElement("span", null, "浅色"), createElement(CheckDot),
				),
				createElement("button", {
					type: "button", className: "dshw-item", role: "menuitemradio",
					"aria-checked": baseChecked("dark"),
					onClick: function() { pickBase("dark"); },
				},
					createElement("span", null, "深色"), createElement(CheckDot),
				),
				createElement("div", { className: "dshw-sep" }),
				createElement("div", { className: "dshw-sep" }),
				createElement("div", { className: "dshw-pop-head" }, "皮肤"),
				createElement("button", {
					type: "button", className: "dshw-item", role: "menuitemradio",
					"aria-checked": !skinActive ? "true" : "false",
					onClick: function() { setOpen(false); pickDefault(); },
				},
					createElement("span", null, "关闭皮肤",
						createElement("span", { className: "dshw-item-sub" },
							skinActive ? "回到原生外观" : "（当前为原生外观）")),
					createElement(CheckDot),
				),
				SKINS.map(function(skin) {
					return createElement("button", {
						key: skin.id, type: "button", className: "dshw-item", role: "menuitemradio",
						"aria-checked": activeSkinId === skin.id ? "true" : "false",
						onClick: function() { setOpen(false); pickSkin(skin.id); },
					},
						createElement("span", null, (skin.label || skin.id)),
						createElement(CheckDot),
					);
				}),
			) : null;
		return {
			open: open,
			active: skinActive,
			toggle: toggle,
			btnRef: btnRef,
			popover: popover,
		};
	}

	/* The switch writes through here. Both triggers listen for this event; the
	   outgoing one stops rendering (with its popover, which is its own state). */
	// `next` is resolved from the live preference, never from a render closure:
	// these components mount once and read the switch state through a
	// subscription, so a captured value would go stale.
	var triggerListeners = [];
	var setTriggerMode = function(next) {
		if (triggerOn === next) return;
		triggerOn = next;
		try { localStorage.setItem(TRIGGER_KEY, next ? "on" : "off"); } catch {}
		// Listeners run first: the switch's own row must redraw even when the
		// window event cannot be delivered (an embedded host without Event).
		for (var i = 0; i < triggerListeners.length; i++) {
			try { triggerListeners[i](); } catch {}
		}
		try { window.dispatchEvent(new window.Event("dsh-skins-trigger")); } catch {}
	};
	var subscribeTrigger = function(sink) {
		triggerListeners.push(sink);
		return function() { triggerListeners = triggerListeners.filter(function(f) { return f !== sink; }); };
	};

	// Sidebar foot occupant. `wide` is the column state the shell passes; the
	// rail form is the 36px circle every other rail control uses.
	function SkinFooterAction(props) {
		var wide = props.wide !== false;
		// The switch lives in General settings, outside React's tree: subscribe
		// so flipping it adds or removes this button in place.
		var on = react.useSyncExternalStore(subscribeTrigger,
			function() { return triggerOn; }, function() { return triggerOn; });
		var menu = useSkinMenu();
		if (!on) return null;
		return createElement("div", { className: "dshw-foot" },
			createElement("div", { className: "dshw-pick-wrap" },
				createElement("button", {
					type: "button", ref: menu.btnRef,
					className: "dshw-pick-btn" + (wide ? "" : " dshw-rail") + (menu.active ? " dshw-on" : ""),
					"aria-haspopup": "menu", "aria-expanded": menu.open ? "true" : "false",
					"aria-label": "皮肤", title: "皮肤", onClick: menu.toggle,
				}, createElement(GearIcon, { size: wide ? 15 : 17 })),
				menu.popover,
			),
		);
	}

	// The row that keeps the picker reachable when the header is hidden — the
	// blank-session layout drops its chrome, and the sidebar's settings modal
	// covers the header on desktop — plus the switch that puts the icon back.
	// Mounted always, so the way in never depends on the current session.
	function SkinSettingsRow() {
		var menu = useSkinMenu();
		return createElement("div", { className: "dshw-row" },
			createElement("div", null,
				createElement("div", { className: "dshw-row-title" }, "皮肤"),
				createElement("div", { className: "dshw-row-desc" },
					"和侧边栏底部的皮肤按钮是同一个菜单"),
			),
			createElement("div", { className: "dshw-row-actions" },
				createElement("div", { className: "dshw-pick-wrap" },
					createElement("button", {
						type: "button", ref: menu.btnRef,
						className: "dshw-pick-btn" + (menu.active ? " dshw-on" : ""),
						"aria-haspopup": "menu", "aria-expanded": menu.open ? "true" : "false",
						"aria-label": "皮肤", title: "皮肤", onClick: menu.toggle,
					}, createElement(GearIcon, { size: 15 })),
					menu.popover,
				),
			),
		);
	}

	// The switch is its own slot entry: the picker above it carries the menu, and
	// an entry registered under a bare key (`id` is the row key) should not have
	// to answer for two unrelated controls.
	function SkinTriggerRow() {
		var on = react.useSyncExternalStore(subscribeTrigger,
			function() { return triggerOn; }, function() { return triggerOn; });
		return createElement("div", { className: "dshw-row" },
			createElement("div", null,
				createElement("div", { className: "dshw-row-title" }, "皮肤"),
				createElement("div", { className: "dshw-row-desc" },
					on ? "侧边栏底部按钮已显示" : "侧边栏底部按钮已隐藏"),
			),
			createElement("button", {
				type: "button", role: "switch",
				"aria-checked": on ? "true" : "false",
				"aria-label": "在侧边栏底部显示皮肤按钮",
				onClick: function() { setTriggerMode(!triggerOn); },
				style: {
					appearance: "none", border: "0", cursor: "pointer",
					display: "inline-flex", alignItems: "center",
					width: "36px", height: "20px", padding: "2px",
					borderRadius: "10px", boxSizing: "border-box", flex: "none",
					background: on ? "var(--dsw-alias-brand-primary, #4a5d23)" : "var(--dsw-alias-border-l2, #c5bda6)",
					transition: "background .15s ease",
				},
			},
				createElement("span", {
					"aria-hidden": "true",
					style: {
						display: "block", width: "16px", height: "16px", borderRadius: "50%",
						background: "#fff", transform: on ? "translateX(16px)" : "translateX(0)",
						transition: "transform .15s ease",
					},
				}),
			),
		);
	}

	ctx.slots.inject("settings.general.item", function() {
		return ctx.slots.register({
			name: "settings.general.item",
			order: 5,
		}, SkinSettingsRow);
	});

	ctx.slots.inject("settings.general.item", function() {
		return ctx.slots.register({
			name: "settings.general.item",
			order: 6,
		}, SkinTriggerRow);
	});

	// Sidebar foot: the seat that is always on screen in the desktop build. The
	// settings modal opens over the sidebar, but the foot stays mounted and
	// readable behind it, so the picker never depends on the conversation
	// header — which the blank-session layout hides outright.
	ctx.slots.inject("sidebar.footer.action", function() {
		return ctx.slots.register({
			name: "sidebar.footer.action",
			id: "skins-fang",
		}, SkinFooterAction);
	});
}

exports.inject = inject;
exports.apply = apply;
return module.exports;
} });
