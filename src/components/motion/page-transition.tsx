"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/motion/gsap";
import { MOTION_CONDITIONS } from "@/lib/motion/media";

// Module scope survives client-side navigations, so the very first load is skipped.
let hasNavigated = false;

/**
 * Rendered from app/template.tsx, which remounts on every navigation.
 * An ink panel covers the new page and wipes upward (450ms).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const panel = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!hasNavigated) {
      hasNavigated = true;
      return;
    }
    const mm = gsap.matchMedia();
    mm.add(MOTION_CONDITIONS, (context) => {
      const { motionOk } = context.conditions as { motionOk: boolean };
      if (!motionOk || !panel.current) return;
      gsap.fromTo(
        panel.current,
        { yPercent: 0, autoAlpha: 1 },
        { yPercent: -100, duration: 0.45, ease: "power3.inOut", delay: 0.05 },
      );
    });
  });

  return (
    <>
      <div
        ref={panel}
        aria-hidden="true"
        className="pointer-events-none invisible fixed inset-0 z-[60] bg-ink"
      />
      {children}
    </>
  );
}
