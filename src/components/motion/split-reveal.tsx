"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/motion/gsap";
import { MOTION_CONDITIONS } from "@/lib/motion/media";
import { splitWords } from "@/lib/motion/split-text";
import { cn } from "@/lib/cn";

interface SplitRevealProps {
  children: ReactNode;
  as?: "h1" | "h2" | "p";
  className?: string;
  delay?: number;
  id?: string;
}

/**
 * Headline whose words rise out of a mask on mount (custom split util, no
 * SplitText plugin). Pre-hidden via `data-hero-reveal` only when motion is allowed.
 */
export function SplitReveal({
  children,
  as: Tag = "h1",
  className,
  delay = 0.1,
  id,
}: SplitRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_CONDITIONS, (context) => {
        const { motionOk } = context.conditions as { motionOk: boolean };
        if (!motionOk) {
          gsap.set(el, { visibility: "visible" });
          return;
        }
        const split = splitWords(el);
        gsap.set(el, { visibility: "visible" });
        gsap.from(split.words, {
          yPercent: 110,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.06,
          delay,
        });
        return () => split.revert();
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} data-hero-reveal="" className={cn(className)}>
      {children}
    </Tag>
  );
}
