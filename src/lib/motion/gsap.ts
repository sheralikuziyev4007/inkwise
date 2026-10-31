import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

export interface GsapBundle {
  gsap: typeof GsapType;
  ScrollTrigger: typeof ScrollTriggerType;
}

let bundle: GsapBundle | null = null;
let pending: Promise<GsapBundle> | null = null;
const readyCallbacks: Array<(b: GsapBundle) => void> = [];

/**
 * Loads GSAP + ScrollTrigger on demand (code-split). Keeping ~60 kB of animation
 * code out of the initial bundle lets pages paint and hydrate first; every caller
 * shares one registered instance.
 */
export function loadGsap(): Promise<GsapBundle> {
  if (bundle) return Promise.resolve(bundle);
  pending ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, st]) => {
    g.gsap.registerPlugin(st.ScrollTrigger);
    g.gsap.defaults({ ease: "power3.out", duration: 0.8 });
    bundle = { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
    readyCallbacks.splice(0).forEach((cb) => cb(bundle!));
    return bundle;
  });
  return pending;
}

/** Runs `cb` once GSAP has been loaded by someone else — never triggers the download itself. */
export function onGsapReady(cb: (b: GsapBundle) => void): () => void {
  if (bundle) {
    cb(bundle);
    return () => {};
  }
  readyCallbacks.push(cb);
  return () => {
    const i = readyCallbacks.indexOf(cb);
    if (i >= 0) readyCallbacks.splice(i, 1);
  };
}
