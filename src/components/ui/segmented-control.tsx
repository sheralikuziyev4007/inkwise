"use client";

import { cn } from "@/lib/cn";

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
  badge?: string;
}

interface SegmentedControlProps<T extends string> {
  label: string;
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  tone?: "light" | "dark";
  className?: string;
}

/** Toggle-button group (aria-pressed), e.g. the monthly/yearly billing switch. */
export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  tone = "light",
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex rounded-full p-1",
        tone === "light" ? "bg-paper-2" : "bg-ink-raised",
        className,
      )}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "min-h-11 flex-1 rounded-full px-5 py-2.5 text-[15px] font-semibold whitespace-nowrap transition-colors",
              active ? "bg-ink text-paper" : "text-ink hover:bg-black/5",
            )}
          >
            {option.label}
            {option.badge ? (
              <span className={cn("ml-1.5", active ? "text-highlight" : "text-ink-2")}>
                {option.badge}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
