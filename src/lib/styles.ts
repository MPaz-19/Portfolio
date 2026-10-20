import type { CSSProperties } from "react";

/** Small mono uppercase label used for section meta and annotations. */
export const labelClass =
  "font-mono text-xs uppercase tracking-[0.08em] text-muted";

/**
 * Typed helper for CSS custom properties in `style` props, e.g.
 * `cssVars({ "--d": 2 })` to stagger an animation.
 */
export function cssVars(
  vars: Record<`--${string}`, string | number>
): CSSProperties {
  return vars as CSSProperties;
}
