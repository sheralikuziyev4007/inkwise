"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
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
    let tick: ((time: number) => void) | null = null;

    const start = () => {
      instance = new Lenis({ lerp: 0.12, anchors: { offset: -88 }, autoRaf: false });
      instance.on("scroll", ScrollTrigger.update);
      tick = (time: number) => instance?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(instance);
    };

    const stop = () => {
      if (tick) gsap.ticker.remove(tick);
      instance?.destroy();
      instance = null;
      tick = null;
      setLenis(null);
    };

    const sync = () => {
      stop();
      if (!mql.matches) start();
    };

    sync();
    mql.addEventListener("change", sync);
    // Layout can shift once web fonts arrive; recalculate trigger positions.
    void document.fonts?.ready.then(() => ScrollTrigger.refresh());

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
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(id);
  }, [pathname, lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
