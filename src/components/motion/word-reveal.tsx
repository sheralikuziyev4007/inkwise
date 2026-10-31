import type { CSSProperties, ReactNode } from "react";

import { splitNodes, textOf } from "@/lib/motion/split-nodes";

interface WordRevealProps {
  children: ReactNode;
  as?: "h1" | "h2" | "p";
  className?: string;
  id?: string;
  /** Seconds before the first word starts rising. */
  delay?: number;
}

/**
 * Headline whose words rise out of a mask on first paint. Words are split on the
 * server and animated with CSS (only under `html.motion-ok`), so the headline is
 * never hidden waiting for JavaScript and reduced-motion visitors see it static.
 */
export function WordReveal({
  children,
  as: Tag = "h1",
  className,
  id,
  delay = 0,
}: WordRevealProps) {
  const label = textOf(children).replace(/\s+/g, " ").trim();
  return (
    <Tag id={id} className={className} style={{ "--d": `${delay}s` } as CSSProperties}>
      {/* Screen readers get the plain sentence; the animated word spans are hidden from them. */}
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">{splitNodes(children)}</span>
    </Tag>
  );
}
