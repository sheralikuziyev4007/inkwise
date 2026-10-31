import { MotionScene } from "@/components/motion/motion-scene";
import { cn } from "@/lib/cn";

const cases = [
  {
    title: "Invoices",
    fields: "vendor · invoice_no · tax · line_items · total · due_date",
    tone: "highlight",
  },
  {
    title: "Contracts",
    fields: "parties · term · renewal · notice_period · liability_cap",
    tone: "sheet",
  },
  {
    title: "Purchase orders",
    fields: "po_number · buyer · ship_to · sku · quantity · price",
    tone: "ink",
  },
  {
    title: "Onboarding forms",
    fields: "legal_name · tax_id · bank_details · signatory",
    tone: "sheet",
  },
  {
    title: "Delivery notes",
    fields: "carrier · tracking · received_qty · signed_by",
    tone: "paper",
  },
  { title: "Receipts", fields: "merchant · date · category · vat · amount", tone: "sheet" },
] as const;

const toneClass: Record<(typeof cases)[number]["tone"], string> = {
  highlight: "bg-highlight text-ink",
  sheet: "border border-line bg-sheet text-ink",
  ink: "on-dark bg-ink text-paper",
  paper: "bg-paper-2 text-ink",
};

/**
 * Horizontal scroll section. Desktop + motion: the section pins and vertical
 * scroll moves the card track sideways. Touch/mobile/reduced motion: a native,
 * keyboard-scrollable row with scroll-snap.
 */
export function UseCases() {
  return (
    <section id="use-cases" aria-labelledby="uc-title" className="overflow-x-clip py-24">
      <MotionScene scene="useCases" target="use-cases" />
      <div data-hpin>
        <div className="mx-auto mb-10 flex w-full max-w-7xl flex-wrap items-end justify-between gap-6 px-5 sm:px-8">
          <h2 id="uc-title" className="h-section m-0">
            One engine.
            <br />
            Every document type.
          </h2>
          <p className="eyebrow m-0 flex items-center gap-2.5 text-ink-3" aria-hidden="true">
            <span className="lg:hidden">Swipe</span>
            <span className="hidden lg:inline">Keep scrolling</span>
            <svg
              width="28"
              height="14"
              viewBox="0 0 28 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path d="M1 7h25M20 1l6 6-6 6" />
            </svg>
          </p>
        </div>
        <section
          data-track-viewport
          aria-label="Supported document types"
          tabIndex={0}
          className="snap-x snap-mandatory [scrollbar-width:thin] overflow-x-auto pb-4 lg:pb-0"
        >
          <ul
            data-track
            className="m-0 flex w-max list-none gap-5 p-0 px-5 sm:px-8 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]"
          >
            {cases.map((item, i) => (
              <li
                key={item.title}
                className={cn(
                  "flex h-[340px] w-[280px] snap-start flex-col justify-between rounded-[var(--radius-card)] p-7 sm:h-[420px] sm:w-[360px] sm:p-8",
                  toneClass[item.tone],
                )}
              >
                <span className={cn("font-mono text-[13px]", item.tone === "ink" && "text-muted")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="m-0 font-display text-[34px] leading-[1.02] font-bold tracking-[-0.03em] sm:text-[40px]">
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "m-0 font-mono text-[13px] leading-[1.7]",
                      item.tone === "ink"
                        ? "text-muted"
                        : item.tone === "highlight"
                          ? "text-ink"
                          : "text-ink-2",
                    )}
                  >
                    {item.fields}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
