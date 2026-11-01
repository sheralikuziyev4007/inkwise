import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { CheckIcon } from "@/components/ui/icons";
import { SectionHeader } from "@/components/ui/section-header";
import { homeStats as stats } from "@/lib/sample-data";

import { StrikeList } from "./strike-list";

const before = [
  "Re-typing totals, dates and PO numbers by hand",
  "Chasing approvals across email threads",
  "Month-end close blocked by one missing invoice",
  "Errors found weeks later, in the ledger",
];

const after = [
  "Fields extracted and validated in seconds",
  "Rules route exceptions to the right person",
  "Clean records synced to the systems you already use",
  "Full audit trail for every field, every change",
];

export function ProblemSolution() {
  return (
    <section aria-labelledby="problem-title" className="py-20">
      <Container>
        <SectionHeader
          id="problem-title"
          title="Your team didn't sign up to be a human scanner."
          description="Every month, hundreds of documents arrive in inboxes, portals and shared drives. Someone has to read them, key them in and fix the typos later."
        />
        <Reveal stagger className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div
            data-reveal-item
            className="flex flex-col gap-6 rounded-[var(--radius-card)] border border-line bg-sheet p-8 sm:p-9"
          >
            <h3 className="eyebrow m-0 font-normal text-ink-3">Before · manual</h3>
            <StrikeList id="before-list" items={before} />
          </div>
          <div
            data-reveal-item
            className="on-dark flex flex-col gap-6 rounded-[var(--radius-card)] bg-ink p-8 text-paper sm:p-9"
          >
            <h3 className="eyebrow m-0 font-normal text-highlight">After · with Inkwise</h3>
            <ul className="m-0 flex list-none flex-col gap-4 p-0 text-lg">
              {after.map((item) => (
                <li key={item} className="flex items-center gap-3.5">
                  <span className="inline-flex size-7 flex-none items-center justify-center rounded-lg bg-highlight text-ink">
                    <CheckIcon size={14} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <dl className="m-0 mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse border-t-[1.5px] border-ink pt-4"
            >
              <dt className="text-[15px] text-ink-2">{stat.label}</dt>
              <dd className="m-0 font-display text-[44px] font-bold tracking-[-0.03em]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="m-0 mt-3 text-[13px] text-ink-3">Sample figures for a concept product.</p>
      </Container>
    </section>
  );
}
