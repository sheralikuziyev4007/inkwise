"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { CompanyLogo } from "@/components/ui/company-logo";
import { DocIllustration } from "@/components/ui/doc-illustration";
import { companyByName } from "@/lib/sample-data";
import { cn } from "@/lib/cn";
import type { CaseStudyMeta, Entry } from "@/lib/content/types";

const filters = ["All", "Logistics", "Manufacturing", "Healthcare"] as const;
type Filter = (typeof filters)[number];

export function CaseStudyList({ entries }: { entries: Entry<CaseStudyMeta>[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const featured = entries.find((e) => e.meta.featured);
  const visible = useMemo(
    () => entries.filter((e) => filter === "All" || e.meta.industry === filter),
    [entries, filter],
  );

  return (
    <div className="flex flex-col gap-12">
      {featured && filter === "All" ? (
        <Link
          href={`/customers/${featured.slug}`}
          className="group on-dark flex flex-wrap items-end justify-between gap-10 rounded-[28px] bg-ink p-8 text-paper no-underline sm:p-12"
        >
          <div className="flex flex-[1_1_480px] flex-col gap-5">
            <CompanyLogo
              name={companyByName(featured.meta.company).name}
              glyph={companyByName(featured.meta.company).glyph}
              className="text-paper"
            />
            <h2 className="m-0 font-display text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.02] font-bold tracking-[-0.03em]">
              {featured.meta.title}
            </h2>
            <span className="font-semibold text-highlight">
              Read the story{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
          </div>
          <dl className="m-0 grid flex-[0_1_380px] grid-cols-2 gap-3">
            {featured.meta.stats.slice(0, 2).map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col-reverse rounded-2xl p-5",
                  i === 0 ? "bg-highlight text-ink" : "bg-ink-raised",
                )}
              >
                <dt className={cn("text-sm", i === 0 ? "text-ink" : "text-muted")}>{stat.label}</dt>
                <dd className="m-0 font-display text-4xl font-bold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Link>
      ) : null}

      <div className="flex flex-col gap-6">
        <p className="m-0 text-sm text-ink-3">
          Sample case studies — companies and figures are illustrative.
        </p>
        <div role="group" aria-label="Filter by industry" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "min-h-11 rounded-full px-[18px] py-2.5 text-[15px] transition-colors",
                filter === f
                  ? "bg-ink font-semibold text-paper"
                  : "border-[1.5px] border-ink font-medium hover:bg-ink/5",
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {visible.length} {visible.length === 1 ? "story" : "stories"} shown
        </p>
        <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((entry, i) => (
            <li key={entry.slug} className="flex">
              <Link
                href={`/customers/${entry.slug}`}
                className="group flex w-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-sheet no-underline transition-shadow hover:shadow-[0_0_0_3px_var(--color-ink)]"
              >
                <div
                  className={cn(
                    "relative flex h-52 items-center justify-center overflow-hidden px-10 pt-6",
                    ["bg-paper-2", "bg-highlight", "bg-ink"][i % 3],
                  )}
                >
                  <DocIllustration
                    kind={entry.meta.docKind}
                    tilt={i % 2 ? 3 : -3}
                    className="w-full max-w-[240px] translate-y-4 transition-transform duration-500 group-hover:translate-y-1 group-hover:scale-[1.03]"
                  />
                  <span
                    className={cn("absolute top-4 left-5", i % 3 === 2 ? "text-paper" : "text-ink")}
                  >
                    <CompanyLogo
                      name={companyByName(entry.meta.company).name}
                      glyph={companyByName(entry.meta.company).glyph}
                      className="text-base"
                    />
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <span className="eyebrow text-ink-3">
                    {entry.meta.industry} · {entry.meta.documents}
                  </span>
                  <h3 className="m-0 font-display text-2xl leading-[1.15] font-bold tracking-[-0.02em]">
                    {entry.meta.title}
                  </h3>
                  <span className="mt-auto font-semibold">
                    Read story{" "}
                    <span className="inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
