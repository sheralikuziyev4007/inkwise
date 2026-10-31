import { MotionScene } from "@/components/motion/motion-scene";
import { Container } from "@/components/ui/container";
import { CheckIcon } from "@/components/ui/icons";

const steps = [
  {
    label: "01 · Ingest",
    title: "Forward, upload or connect",
    text: "Point a mailbox, a shared drive or a supplier portal at Inkwise. PDFs, scans and phone photos all work.",
  },
  {
    label: "02 · Extract",
    title: "Every field, understood",
    text: "Inkwise finds totals, dates, parties, line items and clauses — even on layouts it has never seen — and scores its confidence per field.",
  },
  {
    label: "03 · Validate & sync",
    title: "Checked, then shipped",
    text: "Your rules match POs, flag duplicates and route exceptions. Approved records land in your systems automatically.",
  },
];

const fields = [
  { key: "po_number", value: "PO-7731" },
  { key: "buyer", value: "Acme Retail" },
  { key: "ship_to", value: "Warehouse B, Bay 4" },
  { key: "delivery_date", value: "2026-11-02" },
];

const statuses = ["Waiting for documents", "Extracting · 4 fields", "Validated · synced to ERP"];

/**
 * Pinned scroll story (desktop + motion allowed): the document stays put while
 * scrolling advances the steps and fills in the extracted fields.
 * Everywhere else the final state is shown as a normal stacked section.
 */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      className="on-dark scroll-mt-20 bg-ink py-20 text-paper lg:py-0"
    >
      <MotionScene scene="howItWorks" target="how-it-works" />
      <Container data-pin className="lg:py-20">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 id="how-title" className="h-section m-0">
            From inbox to ledger
            <br />
            in three steps.
          </h2>
          <p className="eyebrow m-0 hidden text-muted lg:block" aria-hidden="true">
            Scroll · step <span data-step-counter>03</span> / 03
          </p>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-14">
          {/* Document */}
          <div className="relative flex min-h-[420px] flex-col gap-4 rounded-[var(--radius-card)] bg-paper p-7 font-mono text-[13px] text-ink sm:p-9 lg:flex-1">
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-bold">Purchase Order</span>
              <span className="text-ink-3">page 1 / 2</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {fields.map((field) => (
                <div
                  key={field.key}
                  data-how-field
                  className="relative flex flex-col gap-1 rounded-lg border-2 border-ink bg-highlight p-2.5"
                >
                  <span className="text-[11px]">{field.key}</span>
                  <span>{field.value}</span>
                  <span
                    data-how-check
                    aria-hidden="true"
                    className="absolute top-2 right-2 inline-flex size-5 items-center justify-center rounded-full bg-ink text-highlight"
                  >
                    <CheckIcon size={10} />
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 flex flex-col gap-2" aria-hidden="true">
              <div className="h-2.5 rounded bg-[#dcded7]" />
              <div className="h-2.5 w-[86%] rounded bg-[#dcded7]" />
              <div className="h-2.5 w-[64%] rounded bg-[#dcded7]" />
              <div className="h-2.5 w-[78%] rounded bg-[#dcded7]" />
            </div>
            <div className="relative mt-auto h-11 self-start">
              {statuses.map((status, i) => (
                <span
                  key={status}
                  data-status
                  aria-hidden={i < statuses.length - 1 ? true : undefined}
                  className={`flex items-center gap-2.5 rounded-xl bg-ink px-3.5 py-3 whitespace-nowrap text-paper ${i < statuses.length - 1 ? "invisible absolute top-0 left-0" : ""}`}
                >
                  <span className="size-2 rounded-full bg-highlight" />
                  {status}
                </span>
              ))}
            </div>
          </div>

          {/* Steps */}
          <ol
            data-steps
            className="relative m-0 flex list-none flex-col gap-10 border-l-2 border-ink-line p-0 pl-7 lg:flex-1"
          >
            <span
              data-progress
              aria-hidden="true"
              className="absolute top-0 -left-[2px] hidden h-full w-[2px] origin-top bg-highlight lg:block"
            />
            {steps.map((step) => (
              <li key={step.label} data-step className="flex flex-col gap-2.5">
                <span className="eyebrow text-highlight">{step.label}</span>
                <h3 className="m-0 font-display text-[28px] font-semibold tracking-[-0.02em] lg:text-[32px]">
                  {step.title}
                </h3>
                <p className="m-0 max-w-md text-base leading-relaxed text-muted-2 lg:text-[17px]">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
