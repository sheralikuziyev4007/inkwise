/** Media queries shared by every animation, so breakpoints stay consistent. */
export const MEDIA = {
  motionOk: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px)",
  finePointer: "(hover: hover) and (pointer: fine)",
} as const;

/** Conditions object for gsap.matchMedia(). */
export const MOTION_CONDITIONS = {
  motionOk: MEDIA.motionOk,
  reduced: MEDIA.reduced,
  desktop: MEDIA.desktop,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia(MEDIA.reduced).matches;
}
