"use client";

import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { splitWords } from "@/lib/motion/split-text";
import { useMotion } from "@/lib/motion/use-motion";

interface SplitRevealProps {
  children: ReactNode;
  as?: "h2" | "h3" | "p";
  className?: string;
  id?: string;
}

/**
 * Below-the-fold headline that splits into words at runtime (custom splitWords
 * util, no SplitText plugin) and lets them rise as it scrolls into view.
 * Headlines already on screen when the page loads are left untouched.
 */
export function SplitReveal({ children, as: Tag = "h2", className, id }: SplitRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useMotion(ref, ({ gsap, conditions: { motionOk } }) => {
    const el = ref.current;
    if (!motionOk || !el) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    const split = splitWords(el);
    gsap.from(split.words, {
      yPercent: 110,
      duration: 0.9,
      ease: "expo.out",
      stagger: 0.06,
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
    return () => split.revert();
  });

  return (
    <Tag ref={ref} id={id} className={cn(className)}>
      {children}
    </Tag>
  );
}
