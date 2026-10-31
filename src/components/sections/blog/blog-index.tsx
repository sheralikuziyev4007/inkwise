"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";

import { SearchIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/content/format";
import type { Entry, PostMeta } from "@/lib/content/types";

import { PostCard } from "./post-card";

const categories = ["All", "Guides", "Finance ops", "Product updates", "Engineering"] as const;
type Category = (typeof categories)[number];

export function filterPosts(posts: Entry<PostMeta>[], query: string, category: Category) {
  const q = query.trim().toLowerCase();
  return posts.filter((post) => {
    if (category !== "All" && post.meta.category !== category) return false;
    if (!q) return true;
    return `${post.meta.title} ${post.meta.excerpt}`.toLowerCase().includes(q);
  });
}

export function BlogIndex({ posts }: { posts: Entry<PostMeta>[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const deferredQuery = useDeferredValue(query);

  const featured = posts.find((p) => p.meta.featured);
  const showFeatured = Boolean(featured) && category === "All" && !deferredQuery;
  const results = useMemo(
    () =>
      filterPosts(posts, deferredQuery, category).filter(
        (p) => !(showFeatured && p.slug === featured?.slug),
      ),
    [posts, deferredQuery, category, showFeatured, featured],
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "min-h-11 rounded-full px-[18px] py-2.5 text-[15px] transition-colors",
                category === c
                  ? "bg-ink font-semibold text-paper"
                  : "border-[1.5px] border-ink font-medium hover:bg-ink/5",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex w-full flex-col gap-1.5 sm:w-80">
          <label htmlFor="blog-search" className="text-sm font-semibold">
            Search articles
          </label>
          <div className="flex h-[50px] items-center gap-2.5 rounded-full border-[1.5px] border-ink bg-sheet px-4 focus-within:shadow-[0_0_0_3px_var(--color-highlight)]">
            <SearchIcon size={18} />
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. invoice matching"
              className="min-w-0 flex-1 bg-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {showFeatured && featured ? (
        <Link
          href={`/blog/${featured.slug}`}
          className="group flex flex-wrap overflow-hidden rounded-[28px] border border-line bg-sheet no-underline"
        >
          <div
            aria-hidden="true"
            className="flex min-h-[300px] flex-[1_1_480px] items-center justify-center bg-ink p-10 font-mono text-sm leading-loose text-muted"
          >
            <div>
              <span className="text-highlight">match</span>(invoice, po) →<br />
              &nbsp;&nbsp;amount <span className="rounded bg-highlight px-1.5 text-ink">ok</span>
              <br />
              &nbsp;&nbsp;vendor <span className="rounded bg-highlight px-1.5 text-ink">ok</span>
              <br />
              &nbsp;&nbsp;quantity{" "}
              <span className="rounded border border-muted px-1.5">review</span>
            </div>
          </div>
          <div className="flex flex-[1_1_400px] flex-col justify-center gap-4 p-8 sm:p-10">
            <span className="eyebrow text-xs text-ink-3">
              Featured · {featured.meta.category} · {featured.meta.readingMinutes} min read
            </span>
            <h2 className="m-0 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] font-bold tracking-[-0.03em] group-hover:underline">
              {featured.meta.title}
            </h2>
            <p className="m-0 text-[17px] leading-relaxed text-ink-2">{featured.meta.excerpt}</p>
            <span className="text-sm text-ink-3">
              {featured.meta.author} ·{" "}
              <time dateTime={featured.meta.publishedAt}>
                {formatDate(featured.meta.publishedAt)}
              </time>
            </span>
          </div>
        </Link>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {results.length} {results.length === 1 ? "article" : "articles"} found
      </p>
      {results.length > 0 ? (
        <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
          {results.map((post, i) => (
            <li key={post.slug} className="flex">
              <PostCard entry={post} tone={(i % 3) as 0 | 1 | 2} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-[var(--radius-card)] border border-dashed border-dash p-10 text-center text-ink-2">
          No articles match “{deferredQuery}”.{" "}
          <button
            type="button"
            className="font-semibold underline decoration-highlight decoration-2 underline-offset-4"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
