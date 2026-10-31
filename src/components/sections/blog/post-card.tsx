import Link from "next/link";

import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/content/format";
import type { Entry, PostMeta } from "@/lib/content/types";

const tones = ["border border-line bg-sheet", "bg-highlight", "on-dark bg-ink text-paper"] as const;

export function PostCard({ entry, tone = 0 }: { entry: Entry<PostMeta>; tone?: 0 | 1 | 2 }) {
  const { meta, slug } = entry;
  const dark = tone === 2;
  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        "group flex min-h-[260px] w-full flex-col gap-3.5 rounded-[var(--radius-card)] p-7 no-underline transition-shadow hover:shadow-[0_0_0_3px_var(--color-ink)]",
        tones[tone],
      )}
    >
      <span
        className={cn(
          "eyebrow text-xs",
          dark ? "text-muted" : tone === 1 ? "text-ink" : "text-ink-3",
        )}
      >
        {meta.category} · {meta.readingMinutes} min
      </span>
      <h3 className="m-0 font-display text-[26px] leading-[1.15] font-bold tracking-[-0.02em]">
        {meta.title}
      </h3>
      <p
        className={cn(
          "m-0 text-[15px] leading-relaxed",
          dark ? "text-muted-2" : tone === 1 ? "text-ink" : "text-ink-2",
        )}
      >
        {meta.excerpt}
      </p>
      <span
        className={cn(
          "mt-auto text-sm",
          dark ? "text-muted" : tone === 1 ? "text-ink" : "text-ink-3",
        )}
      >
        {meta.author} · <time dateTime={meta.publishedAt}>{formatDate(meta.publishedAt)}</time>
      </span>
    </Link>
  );
}
