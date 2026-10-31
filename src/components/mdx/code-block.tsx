"use client";

import { useRef, useState, type ComponentPropsWithoutRef } from "react";

/** Fenced code block (MDX `pre`) with a copy-to-clipboard button. */
export function CodeBlock(props: ComponentPropsWithoutRef<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const text = ref.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="group relative">
      <pre
        ref={ref}
        tabIndex={0}
        {...props}
        className="overflow-x-auto rounded-2xl bg-ink p-5 pr-20 font-mono text-sm leading-[1.7] text-paper"
      />
      <button
        type="button"
        onClick={copy}
        className="absolute top-3 right-3 min-h-9 rounded-full bg-ink-raised px-3 py-1.5 font-mono text-xs text-paper opacity-100 transition-opacity focus-visible:outline-highlight sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100"
      >
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
