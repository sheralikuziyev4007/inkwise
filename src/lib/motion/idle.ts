/**
 * Schedules work after the browser is idle (with a timeout so it always runs).
 * Used to set up below-the-fold ScrollTriggers without competing with hydration.
 */
export function onIdle(callback: () => void, timeout = 1200): () => void {
  if (typeof window === "undefined") return () => {};
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(callback, 200);
  return () => clearTimeout(id);
}
