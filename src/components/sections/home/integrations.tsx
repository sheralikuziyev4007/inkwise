"use client";

import Link from "next/link";
import { useId, useRef, useState, type ComponentType } from "react";

import { Container } from "@/components/ui/container";
import {
  ChartIcon,
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  ErpIcon,
  GridIcon,
  MailIcon,
  UsersIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { useMotion } from "@/lib/motion/use-motion";

interface Integration {
  name: string;
  Icon: ComponentType<{ size?: number }>;
  receives: string[];
}

export const integrations: Integration[] = [
  {
    name: "ERP",
    Icon: ErpIcon,
    receives: ["vendor.id", "po.number", "invoice.lines[]", "gl_code", "cost_center"],
  },
  {
    name: "Accounting",
    Icon: ChartIcon,
    receives: [
      "bill.vendor_id",
      "bill.number",
      "bill.lines[]",
      "bill.tax",
      "bill.due_date",
      "attachment.pdf",
    ],
  },
  {
    name: "Spreadsheets",
    Icon: GridIcon,
    receives: ["one row per document", "one column per field", "confidence"],
  },
  {
    name: "Data warehouse",
    Icon: DatabaseIcon,
    receives: ["documents", "fields", "corrections", "audit_events"],
  },
  {
    name: "CRM",
    Icon: UsersIcon,
    receives: ["account.name", "contract.term", "renewal_date", "owner"],
  },
  {
    name: "Email inbox",
    Icon: MailIcon,
    receives: ["→ ingest: attachments", "sender", "subject", "received_at"],
  },
  {
    name: "Cloud storage",
    Icon: CloudIcon,
    receives: ["→ ingest: new files", "folder", "→ export: filed originals"],
  },
  {
    name: "Webhooks & API",
    Icon: CodeIcon,
    receives: ["document.extracted", "document.approved", "JSON payload", "page image URL"],
  },
];

/** Tile grid; hovering, focusing or tapping a tile previews the fields that system receives. */
export function Integrations() {
  const [active, setActive] = useState(1);
  const previewId = useId();
  const preview = useRef<HTMLDivElement>(null);
  const current = integrations[active] ?? integrations[0]!;

  const firstRender = useRef(true);
  useMotion(
    preview,
    ({ gsap, conditions: { motionOk } }) => {
      // Animate chips only when the selection changes, not on page load.
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      if (!motionOk || !preview.current) return;
      gsap.from(preview.current.querySelectorAll("[data-chip]"), {
        autoAlpha: 0,
        y: 6,
        duration: 0.3,
        stagger: 0.04,
      });
    },
    { when: "now", deps: [active] },
  );

  return (
    <section id="integrations" aria-labelledby="int-title" className="scroll-mt-20 pt-10 pb-24">
      <Container className="flex flex-col gap-14 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-5 lg:flex-1">
          <h2 id="int-title" className="h-section m-0 text-[clamp(2.25rem,4.2vw,3.5rem)]">
            Plugs into the stack you already run.
          </h2>
          <p className="m-0 text-[17px] leading-relaxed text-ink-2">
            Native connectors for the systems ops and finance live in, plus a REST API and webhooks
            for everything else. Hover or tap a tile to see what it receives.
          </p>
          <Link
            href="/features#integrations"
            className="self-start py-2 font-semibold underline decoration-highlight decoration-[3px] underline-offset-4"
          >
            How integrations work →
          </Link>
        </div>
        <div className="flex flex-col gap-3 lg:flex-[1.4]">
          <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-4">
            {integrations.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.name}>
                  <button
                    type="button"
                    aria-pressed={isActive}
                    aria-controls={previewId}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={cn(
                      "flex h-[104px] w-full flex-col justify-between rounded-[var(--radius-tile)] p-4 text-left font-semibold transition-colors",
                      isActive
                        ? "bg-ink text-paper shadow-[0_0_0_3px_var(--color-highlight)]"
                        : "border border-line bg-sheet hover:border-ink",
                    )}
                  >
                    <span className={isActive ? "text-highlight" : ""}>
                      <item.Icon size={24} />
                    </span>
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
          <div
            id={previewId}
            ref={preview}
            aria-live="polite"
            className="on-dark flex min-h-[64px] flex-wrap items-center gap-x-5 gap-y-2 rounded-[var(--radius-tile)] bg-ink px-5 py-4 font-mono text-xs text-paper"
          >
            <span className="text-highlight">{current.name} receives →</span>
            {current.receives.map((field) => (
              <span key={field} data-chip>
                {field}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
