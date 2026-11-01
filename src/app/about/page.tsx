import type { Metadata } from "next";

import { Team } from "@/components/sections/about/team";
import { Values } from "@/components/sections/about/values";
import { CtaBanner } from "@/components/sections/shared/cta-banner";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { DocIllustration } from "@/components/ui/doc-illustration";
import { aboutFacts as facts } from "@/lib/sample-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why we build Inkwise: skilled people should make decisions, not copy numbers between windows.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Inkwise"
        title={
          <>
            Skilled people should <span className="marker">make decisions</span>, not copy numbers
            between windows.
          </>
        }
      />
      <section aria-labelledby="story-title" className="pb-24">
        <Container className="flex flex-col gap-12 lg:flex-row">
          <div
            aria-hidden="true"
            className="relative h-[420px] overflow-hidden rounded-[28px] bg-ink lg:flex-1"
          >
            <DocIllustration
              kind="contract"
              tilt={-9}
              className="absolute top-8 left-[5%] w-[46%]"
            />
            <DocIllustration
              kind="invoice"
              tilt={7}
              className="absolute top-12 right-[5%] w-[46%]"
            />
            <DocIllustration
              kind="receipt"
              tilt={-2}
              className="absolute bottom-8 left-[26%] w-[48%]"
            />
          </div>
          <div className="flex flex-col gap-5 text-lg leading-relaxed text-ink-2 lg:flex-1">
            <h2
              id="story-title"
              className="m-0 font-display text-4xl leading-none font-bold tracking-[-0.03em] text-ink"
            >
              Our story
            </h2>
            <p className="m-0">
              Inkwise started with a simple observation: operations and finance teams spend a large
              part of every week moving information from documents into systems by hand. It is slow,
              it is error-prone, and it is nobody&apos;s favourite part of the job.
            </p>
            <p className="m-0">
              We build software that reads those documents reliably, shows exactly how sure it is,
              and leaves the judgement calls to people. Our customers are mid-sized companies whose
              teams are too busy to babysit another tool.
            </p>
            <dl className="m-0 mt-2 grid grid-cols-3 gap-4">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col-reverse border-t-[1.5px] border-ink pt-3"
                >
                  <dt className="text-sm">{fact.label}</dt>
                  <dd className="m-0 font-display text-3xl font-bold text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>
      <Values />
      <Team />
      <CtaBanner />
    </>
  );
}
