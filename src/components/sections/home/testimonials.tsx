import { Reveal } from "@/components/motion/reveal";
import { Avatar, SampleBadge } from "@/components/ui/avatar";
import { Container } from "@/components/ui/container";
import { QuoteIcon } from "@/components/ui/icons";
import { testimonials } from "@/lib/sample-data";

export function Testimonials() {
  const [featured, second] = testimonials;
  if (!featured || !second) return null;

  return (
    <section aria-labelledby="t-title" className="bg-paper-2 py-24">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="t-title" className="h-section m-0 text-[clamp(2.25rem,4.2vw,3.5rem)]">
            Ops leads, in their own words.
          </h2>
          <p className="m-0 text-sm text-ink-3">Sample testimonials · concept project</p>
        </div>
        <Reveal stagger className="flex flex-wrap gap-5">
          <figure
            data-reveal-item
            className="on-dark m-0 flex min-h-[300px] min-w-0 flex-[2_1_560px] flex-col justify-between gap-10 rounded-[var(--radius-card)] bg-ink p-8 text-paper sm:p-10"
          >
            <div className="flex items-start justify-between gap-4">
              <QuoteIcon className="text-highlight" />
              <SampleBadge className="text-muted" />
            </div>
            <blockquote className="m-0 font-display text-2xl leading-tight tracking-[-0.02em] sm:text-[32px]">
              {featured.quote}
            </blockquote>
            <figcaption className="flex items-center gap-3.5">
              <Avatar name={featured.name} tone={0} />
              <span className="flex flex-col">
                <strong>{featured.name}</strong>
                <span className="text-sm text-muted">
                  {featured.role}, {featured.company}
                </span>
              </span>
            </figcaption>
          </figure>
          <figure
            data-reveal-item
            className="m-0 flex min-w-0 flex-[1_1_300px] flex-col justify-between gap-8 rounded-[var(--radius-card)] bg-sheet p-8"
          >
            <div className="flex justify-end">
              <SampleBadge className="text-ink-3" />
            </div>
            <blockquote className="m-0 text-[19px] leading-normal">{second.quote}</blockquote>
            <figcaption className="flex items-center gap-3">
              <Avatar name={second.name} size={44} tone={1} />
              <span className="flex flex-col">
                <strong>{second.name}</strong>
                <span className="text-sm text-ink-3">
                  {second.role}, {second.company}
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
