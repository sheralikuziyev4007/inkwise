"use client";

import { useRef } from "react";

import { CrossIcon } from "@/components/ui/icons";
import { useMotion } from "@/lib/motion/use-motion";

/** "Before" list whose strike-through lines draw left → right as it scrolls into view. */
export function StrikeList({ items }: { items: string[] }) {
  const ref = useRef<HTMLUListElement>(null);

  useMotion(ref, ({ gsap, conditions: { motionOk } }) => {
    if (!motionOk || !ref.current) return;
    gsap.from(ref.current.querySelectorAll("[data-strike]"), {
      scaleX: 0,
      ease: "none",
      stagger: 0.25,
      scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
    });
  });

  return (
    <ul ref={ref} className="m-0 flex list-none flex-col gap-4 p-0 text-lg">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3.5">
          <span className="inline-flex size-7 flex-none items-center justify-center rounded-lg border-[1.5px] border-ink">
            <CrossIcon size={14} />
          </span>
          <span className="relative">
            {item}
            <span
              data-strike
              aria-hidden="true"
              className="absolute top-1/2 left-0 h-[1.5px] w-full origin-left bg-ink"
            />
          </span>
        </li>
      ))}
    </ul>
  );
}
