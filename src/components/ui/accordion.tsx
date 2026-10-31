"use client";

import { useId, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

import { MinusIcon, PlusIcon } from "./icons";

export interface AccordionItem {
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Index open on first render; -1 for none. */
  defaultOpen?: number;
  headingLevel?: "h3" | "h4";
  className?: string;
}

/** Single-open disclosure list (WAI-ARIA accordion pattern). Height eases via CSS grid rows. */
export function Accordion({
  items,
  defaultOpen = 0,
  headingLevel = "h3",
  className,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();
  const Heading = headingLevel;

  return (
    <div className={cn("border-t border-ink", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-button-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.question} className="border-b border-line-2">
            <Heading className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold"
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className={cn(
                    "inline-flex size-8 flex-none items-center justify-center rounded-full border-[1.5px] border-ink transition-colors",
                    isOpen && "bg-highlight",
                  )}
                >
                  {isOpen ? <MinusIcon size={16} /> : <PlusIcon size={16} />}
                </span>
              </button>
            </Heading>
            <section
              id={panelId}
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="max-w-2xl pb-5 text-base leading-relaxed text-ink-2">
                  {item.answer}
                </div>
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
}
