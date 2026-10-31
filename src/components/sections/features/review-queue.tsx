"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CheckIcon } from "@/components/ui/icons";

const queue = [
  { id: "tax", field: "tax_amount", reason: "low confidence", read: "1,O48.32", fix: "1,048.32" },
  { id: "vendor", field: "vendor_id", reason: "possible duplicate", read: "V-1182", fix: "V-1182" },
  { id: "po", field: "po_match", reason: "amount differs", read: "12,480.00", fix: "12,480.00" },
];

/** Interactive mock of the review queue: accept the corrected value, move to the next item. */
export function ReviewQueue() {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState(queue[0]!.fix);
  const done = index >= queue.length;
  const item = queue[Math.min(index, queue.length - 1)]!;

  const next = () => {
    const nextIndex = index + 1;
    setIndex(nextIndex);
    const nextItem = queue[nextIndex];
    if (nextItem) setValue(nextItem.fix);
  };

  return (
    <section aria-labelledby="rq-title" className="on-dark bg-ink py-24 text-paper">
      <Container className="flex flex-col gap-14 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-5 lg:flex-1">
          <p className="eyebrow m-0 text-highlight">Human-in-the-loop</p>
          <h2 id="rq-title" className="h-section m-0 text-[clamp(2.25rem,4.2vw,3.5rem)]">
            Review only what needs a human.
          </h2>
          <p className="m-0 text-[17px] leading-relaxed text-muted-2">
            The review queue shows the document and the extracted value side by side. One click to
            accept, one edit to correct — and Inkwise learns from it. Try it.
          </p>
        </div>
        <div className="flex flex-col gap-4 rounded-[var(--radius-card)] bg-ink-raised p-5 sm:flex-row lg:flex-[1.4]">
          <div
            aria-hidden="true"
            className="flex min-h-[260px] flex-col gap-2.5 rounded-xl bg-paper p-5 font-mono text-xs text-ink sm:flex-1"
          >
            <b className="font-display text-lg">INVOICE</b>
            <div className="h-2 rounded bg-[#dcded7]" />
            <div className="h-2 w-[70%] rounded bg-[#dcded7]" />
            <div className="self-start rounded-md border-2 border-ink bg-highlight px-2 py-1.5">
              {item.field}: {item.read}
            </div>
            <div className="h-2 w-[85%] rounded bg-[#dcded7]" />
            <div className="h-2 w-[55%] rounded bg-[#dcded7]" />
          </div>
          <div className="flex flex-col gap-2.5 sm:flex-[1.15]">
            <div className="flex justify-between text-[13px]">
              <span className="font-semibold" aria-live="polite">
                {done ? "Queue clear" : `Needs review · ${queue.length - index}`}
              </span>
              <span className="text-muted">INV-20431</span>
            </div>
            {done ? (
              <div className="flex flex-1 flex-col items-start justify-center gap-4 rounded-xl bg-ink p-5">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-highlight text-ink">
                  <CheckIcon size={18} />
                </span>
                <p className="m-0 text-[15px]">All fields verified and synced.</p>
                <Button
                  variant="outline-light"
                  onClick={() => {
                    setIndex(0);
                    setValue(queue[0]!.fix);
                  }}
                >
                  Reset demo
                </Button>
              </div>
            ) : (
              <form
                className="flex flex-col gap-2.5 rounded-xl bg-ink p-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  next();
                }}
              >
                <span className="font-mono text-xs text-muted">
                  {item.field} · {item.reason}
                </span>
                <label htmlFor="rq-value" className="text-[13px]">
                  Corrected value
                </label>
                <input
                  id="rq-value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="h-11 rounded-[10px] border-[1.5px] border-highlight bg-ink-raised px-3 font-mono text-paper"
                />
                <div className="flex gap-2">
                  <Button type="submit" variant="highlight" className="flex-1">
                    Accept
                  </Button>
                  <Button variant="outline-light" className="flex-1" onClick={next}>
                    Skip
                  </Button>
                </div>
              </form>
            )}
            {queue.slice(index + 1).map((q) => (
              <div
                key={q.id}
                className="flex justify-between rounded-xl bg-ink px-4 py-3 font-mono text-xs text-muted"
              >
                <span>
                  {q.field} · {q.reason}
                </span>
                <span aria-hidden="true">→</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
