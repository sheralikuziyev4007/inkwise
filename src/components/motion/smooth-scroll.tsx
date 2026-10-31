"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

import { onGsapReady, type GsapBundle } from "@/lib/motion/gsap";
import { onIdle } from "@/lib/motion/idle";
import { MEDIA } from "@/lib/motion/media";

const LenisContext = createContext<Lenis | null>(null);

/** Access the active Lenis instance (null when smooth scroll is off). */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Lenis smooth scrolling driven by GSAP's ticker so ScrollTrigger and Lenis
 * share one frame loop. Disabled entirely for reduced-motion visitors and
 * re-evaluated live if that preference changes.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();
  const firstPath = useRef(true);

  useEffect(() => {
    const mql = window.matchMedia(MEDIA.reduced);
    let instance: Lenis | null = null;
    let cancelIdle = () => {};
    let cancelReady = () => {};
    let unlinkGsap = () => {};

    // When GSAP is (lazily) loaded, drive Lenis from GSAP's ticker so Lenis and
    // ScrollTrigger share one frame loop. Until then Lenis runs its own rAF.
    const linkGsap = ({ gsap, ScrollTrigger }: GsapBundle) => {
      const lenisInstance = instance;
      if (!lenisInstance) return;
      lenisInstance.options.autoRaf = false;
      const tick = (time: number) => lenisInstance.raf(time * 1000);
      const off = lenisInstance.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      unlinkGsap = () => {
        off();
        gsap.ticker.remove(tick);
      };
    };

    const start = () => {
      instance = new Lenis({ lerp: 0.12, anchors: { offset: -88 }, autoRaf: true });
      setLenis(instance);
      cancelReady = onGsapReady(linkGsap);
    };

    const stop = () => {
      cancelIdle();
      cancelReady();
      unlinkGsap();
      unlinkGsap = () => {};
      instance?.destroy();
      instance = null;
      setLenis(null);
    };

    const sync = () => {
      stop();
      // Smooth scrolling is a nicety: start it once hydration work is done.
      if (!mql.matches) cancelIdle = onIdle(start);
    };

    sync();
    mql.addEventListener("change", sync);
    // Layout can shift once web fonts arrive; recalculate trigger positions.
    void document.fonts?.ready.then(() =>
      onGsapReady(({ ScrollTrigger }) => ScrollTrigger.refresh()),
    );

    return () => {
      mql.removeEventListener("change", sync);
      stop();
    };
  }, []);

  // Start every route at the top and recalculate triggers for the new page.
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    if (!window.location.hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
    }
    let cancelReady = () => {};
    const id = window.requestAnimationFrame(() => {
      cancelReady = onGsapReady(({ ScrollTrigger }) => ScrollTrigger.refresh());
    });
    return () => {
      window.cancelAnimationFrame(id);
      cancelReady();
    };
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
