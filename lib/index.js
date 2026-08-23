/**
 * Node half of the skin collection. A pure client-side skin owns no host
 * services; the loader still imports this half, so it must exist and export
 * a valid (no-op) cordis plugin.
 */

/** Cordis plugin name used by loader diagnostics. */
export const name = 'ui-skins-fang'

/** No host-side behavior; all work happens in the client bundle. */
export function apply() {}
