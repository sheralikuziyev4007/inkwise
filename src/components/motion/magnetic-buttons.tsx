"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { gsap } from "@/lib/motion/gsap";
import { MEDIA } from "@/lib/motion/media";

const STRENGTH = 0.28;
const MAX_SHIFT = 14;

/**
 * Adds a magnetic pull to every element marked `data-magnetic`.
 * Only on precise pointers and when motion is allowed; listeners and tweens
 * are removed on route change and unmount.
 */
export function MagneticButtons() {
  const pathname = usePathname();

  useEffect(() => {
    const canHover = window.matchMedia(MEDIA.finePointer).matches;
    const reduced = window.matchMedia(MEDIA.reduced).matches;
    if (!canHover || reduced) return;

    const cleanups: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const dx = (event.clientX - (rect.left + rect.width / 2)) * STRENGTH;
        const dy = (event.clientY - (rect.top + rect.height / 2)) * STRENGTH;
        xTo(gsap.utils.clamp(-MAX_SHIFT, MAX_SHIFT, dx));
        yTo(gsap.utils.clamp(-MAX_SHIFT, MAX_SHIFT, dy));
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        gsap.killTweensOf(el);
        gsap.set(el, { clearProps: "transform" });
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
