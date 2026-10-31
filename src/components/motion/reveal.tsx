"use client";

import { useRef, type ElementType, type ReactNode } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { MOTION_CONDITIONS } from "@/lib/motion/media";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Animate direct children marked with data-reveal-item one after another. */
  stagger?: boolean;
  y?: number;
}

/**
 * Quiet fade-up as content enters the viewport. Content is never hidden
 * server-side, so it stays readable without JavaScript or with reduced motion.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  stagger = false,
  y = 16,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_CONDITIONS, (context) => {
        const { motionOk } = context.conditions as { motionOk: boolean };
        const root = ref.current;
        if (!motionOk || !root) return;

        const targets = stagger
          ? Array.from(root.querySelectorAll<HTMLElement>("[data-reveal-item]"))
          : [root];
        if (targets.length === 0) return;

        // Elements already on screen at load are left alone to avoid a flash.
        const pending = targets.filter((el) => el.getBoundingClientRect().top > window.innerHeight);
        if (pending.length === 0) return;

        gsap.set(pending, { autoAlpha: 0, y });
        ScrollTrigger.batch(pending, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, overwrite: true }),
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
