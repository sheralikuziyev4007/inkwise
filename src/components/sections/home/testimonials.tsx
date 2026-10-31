import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { QuoteIcon } from "@/components/ui/icons";
import { Placeholder } from "@/components/ui/placeholder";

export function Testimonials() {
  return (
    <section aria-labelledby="t-title" className="bg-paper-2 py-24">
      <Container className="flex flex-col gap-10">
        <h2 id="t-title" className="h-section m-0 text-[clamp(2.25rem,4.2vw,3.5rem)]">
          Ops leads, in their own words.
        </h2>
        <Reveal stagger className="flex flex-wrap gap-5">
          <figure
            data-reveal-item
            className="on-dark m-0 flex min-h-[300px] min-w-0 flex-[2_1_560px] flex-col justify-between gap-10 rounded-[var(--radius-card)] bg-ink p-8 text-paper sm:p-10"
          >
            <QuoteIcon className="text-highlight" />
            <blockquote className="m-0 font-display text-2xl leading-tight tracking-[-0.02em] sm:text-[32px]">
              [CUSTOMER QUOTE — one or two sentences about the measurable change Inkwise made for
              their team.]
            </blockquote>
            <figcaption className="flex items-center gap-3.5">
              <Placeholder label="[IMG]" tone="dark" className="size-12 rounded-full text-[10px]" />
              <span className="flex flex-col">
                <strong>[NAME]</strong>
                <span className="text-sm text-muted">[ROLE], [COMPANY]</span>
              </span>
            </figcaption>
          </figure>
          <figure
            data-reveal-item
            className="m-0 flex min-w-0 flex-[1_1_300px] flex-col justify-between gap-8 rounded-[var(--radius-card)] bg-sheet p-8"
          >
            <blockquote className="m-0 text-[19px] leading-normal">
              [CUSTOMER QUOTE — short, specific, about time saved or errors avoided.]
            </blockquote>
            <figcaption className="flex flex-col">
              <strong>[NAME]</strong>
              <span className="text-sm text-ink-3">[ROLE], [COMPANY]</span>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
