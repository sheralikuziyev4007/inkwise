import type { ReactNode } from "react";

import { SplitReveal } from "@/components/motion/split-reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

interface CtaBannerProps {
  title?: ReactNode;
  text?: string;
  cta?: { label: string; href: string };
}

export function CtaBanner({
  title = (
    <>
      Stop retyping.
      <br />
      Start closing.
    </>
  ),
  text = "Send us 20 of your real documents. We'll show you the extracted data in a live demo.",
  cta = { label: "Book a demo", href: "/contact" },
}: CtaBannerProps) {
  return (
    <section aria-labelledby="cta-title" className="pb-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-10 rounded-[32px] bg-highlight p-10 sm:p-14 lg:p-24">
          <SplitReveal
            id="cta-title"
            className="h-display m-0 max-w-3xl text-[clamp(2.75rem,6vw,5.5rem)]"
          >
            {title}
          </SplitReveal>
          <div className="flex flex-col items-start gap-4">
            <p className="m-0 max-w-sm text-[17px] leading-normal">{text}</p>
            <ButtonLink href={cta.href} size="lg" arrow data-magnetic>
              {cta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
