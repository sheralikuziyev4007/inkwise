import type { CSSProperties } from "react";

import { HeroConnectors } from "@/components/motion/hero-connectors";
import { MotionScene } from "@/components/motion/motion-scene";
import { WordReveal } from "@/components/motion/word-reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CheckIcon } from "@/components/ui/icons";

const extracted = [
  { key: "invoice_no", value: "INV-20418" },
  { key: "vendor", value: "Acme Supply Co." },
  { key: "issue_date", value: "2026-10-14" },
  { key: "due_date", value: "2026-11-13" },
  { key: "line_items", value: "4" },
  { key: "total", value: "12,480.00 USD", accent: true },
];

const lines = [
  { item: "Steel brackets × 40", amount: "4,200.00" },
  { item: "Hinge set × 12", amount: "3,960.00" },
  { item: "Rail kit × 8", amount: "2,720.00" },
  { item: "Freight", amount: "1,600.00" },
];

/**
 * The page's one big motion moment: the headline rises in, a highlighter
 * "scan bar" sweeps the invoice, fields light up and fly into the
 * Extracted panel, then a Synced chip pops. Plays once (~2.4s).
 */
export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="overflow-x-clip">
      <MotionScene scene="hero" target="hero" when="now" />
      <HeroConnectors target="hero" />
      <Container className="flex flex-col gap-12 pt-14 pb-14 sm:pt-20 lg:flex-row lg:items-center lg:gap-12">
        <div className="flex min-w-0 flex-1 flex-col gap-7 lg:basis-[48%]">
          <p
            data-fade-up
            style={{ "--d": "0s" } as CSSProperties}
            className="m-0 inline-flex items-center gap-2 self-start rounded-full border border-ink px-3 py-1.5 font-mono text-[13px]"
          >
            <span className="size-2 rounded-full bg-ink" aria-hidden="true" />
            AI document automation for ops teams
          </p>
          <WordReveal
            id="hero-title"
            delay={0.1}
            className="h-display m-0 text-[clamp(3.25rem,5.6vw,5.25rem)]"
          >
            Paperwork in. <span className="marker">Clean data</span> out.
          </WordReveal>
          <p
            data-fade-up
            style={{ "--d": "0.4s" } as CSSProperties}
            className="m-0 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-[19px]"
          >
            Inkwise reads invoices, contracts and forms like your sharpest analyst — then sends
            verified fields straight into your ERP, accounting and ops tools. No retyping. No
            copy-paste.
          </p>
          <div
            data-fade-up
            style={{ "--d": "0.5s" } as CSSProperties}
            className="flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="/contact" size="lg" arrow data-magnetic>
              Book a demo
            </ButtonLink>
            <ButtonLink href="#how-it-works" size="lg" variant="secondary">
              See how it works
            </ButtonLink>
          </div>
          <p
            data-fade-up
            style={{ "--d": "0.6s" } as CSSProperties}
            className="m-0 text-sm text-ink-3"
          >
            Free 14-day pilot · No credit card · EU &amp; US data residency
          </p>
        </div>

        {/* Stage: document → extracted fields */}
        <div
          data-hero-stage
          data-hero-reveal=""
          role="img"
          aria-label="Animation: an invoice is scanned and its fields are extracted into structured data, then synced to an ERP."
          className="relative mx-auto h-[440px] w-full max-w-[640px] sm:h-[540px] lg:flex-1 lg:basis-[52%]"
        >
          <div
            data-doc
            className="absolute top-0 left-0 flex w-[min(74%,300px)] -rotate-[2.5deg] flex-col gap-3.5 rounded-2xl border border-line bg-sheet p-5 font-mono text-[11px] text-ink-2 shadow-[0_30px_60px_-30px_rgba(13,15,18,0.35)] sm:top-6 sm:p-6 sm:text-xs"
          >
            <div className="flex items-start justify-between">
              <span className="font-display text-xl font-bold tracking-[-0.02em] text-ink sm:text-[22px]">
                INVOICE
              </span>
              <span data-field className="rounded bg-highlight px-1.5 py-0.5 text-ink">
                INV-20418
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#6b7079]">From</span>
              <span data-field className="self-start rounded bg-highlight px-1.5 py-0.5 text-ink">
                Acme Supply Co.
              </span>
              <span>14 Dock Road, Unit 3</span>
            </div>
            <div className="flex gap-6">
              <span className="flex flex-col gap-1">
                <span className="text-[#6b7079]">Issued</span>
                <span data-field className="rounded bg-highlight px-1.5 py-0.5 text-ink">
                  2026-10-14
                </span>
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-[#6b7079]">Due</span>
                <span className="py-0.5">2026-11-13</span>
              </span>
            </div>
            <div className="flex flex-col gap-1.5 border-t border-dashed border-line-2 pt-2.5">
              {lines.map((line) => (
                <div key={line.item} className="flex justify-between gap-3">
                  <span>{line.item}</span>
                  <span>{line.amount}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-ink pt-2.5 text-ink">
              <span className="font-medium">Total due</span>
              <span
                data-field
                className="rounded bg-highlight px-2 py-0.5 text-sm font-medium sm:text-[15px]"
              >
                USD 12,480.00
              </span>
            </div>
            <div className="h-1.5 rounded bg-[#edeee9]" />
            <div className="h-1.5 w-[70%] rounded bg-[#edeee9]" />
            <span
              data-scan
              aria-hidden="true"
              className="pointer-events-none invisible absolute -right-2 -left-2 h-[3px] rounded-sm bg-highlight shadow-[0_0_0_1px_#0d0f12,0_0_24px_6px_rgba(198,244,50,0.55)]"
            />
          </div>

          {/* Connectors (desktop only); positioned from measured field rects */}
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              data-connector
              aria-hidden="true"
              className="absolute hidden origin-left border-t-[1.5px] border-dashed border-ink lg:block"
            />
          ))}

          <div
            data-panel
            className="on-dark absolute right-0 bottom-0 flex w-[min(78%,270px)] flex-col gap-3 rounded-2xl bg-ink p-5 text-paper shadow-[0_30px_60px_-30px_rgba(13,15,18,0.6)] sm:top-14 sm:bottom-auto"
          >
            <div className="flex items-center justify-between text-[13px]">
              <span className="font-semibold">Extracted fields</span>
              <span className="rounded-full bg-ink-raised px-2 py-1 font-mono text-[11px] text-highlight">
                high confidence
              </span>
            </div>
            <dl className="m-0 flex flex-col gap-0.5 font-mono text-[11px] sm:text-xs">
              {extracted.map((row, i) => (
                <div
                  key={row.key}
                  data-row
                  className={`flex justify-between gap-3 rounded-lg px-2.5 py-2 ${i % 2 === 0 ? "bg-ink-raised" : ""}`}
                >
                  <dt className="text-muted">{row.key}</dt>
                  <dd className={`m-0 text-right ${row.accent ? "text-highlight" : ""}`}>
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div
              data-sync
              className="flex items-center gap-2 border-t border-ink-line pt-3 text-[13px]"
            >
              <span className="inline-flex size-[22px] items-center justify-center rounded-full bg-highlight text-ink">
                <CheckIcon size={12} />
              </span>
              Synced to ERP · 0.8s
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
