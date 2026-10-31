import type { ReactNode } from "react";

import { WordReveal } from "@/components/motion/word-reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
}

/** Top-of-page hero for inner pages. */
export function PageHero({ eyebrow, title, lead, align = "left", children }: PageHeroProps) {
  return (
    <Container
      className={cn(
        "flex flex-col gap-6 pt-20 pb-14 sm:pt-24",
        align === "center" && "items-center text-center",
      )}
    >
      {eyebrow ? <Eyebrow className="text-ink-3">{eyebrow}</Eyebrow> : null}
      <WordReveal className="h-display m-0 max-w-5xl text-[clamp(2.75rem,6vw,5.25rem)]">
        {title}
      </WordReveal>
      {lead ? (
        <p className="m-0 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-[19px]">{lead}</p>
      ) : null}
      {children}
    </Container>
  );
}
