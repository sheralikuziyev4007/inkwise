import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import type { Entry, PostMeta } from "@/lib/content/types";

import { BlogIndex, filterPosts } from "./blog-index";

const post = (slug: string, meta: Partial<PostMeta>): Entry<PostMeta> => ({
  slug,
  meta: {
    title: slug,
    excerpt: "",
    category: "Guides",
    publishedAt: "2026-10-01",
    readingMinutes: 3,
    author: "Inkwise Team",
    sections: [],
    ...meta,
  },
});

const posts = [
  post("matching", { title: "Three-way matching", category: "Guides", featured: true }),
  post("close", { title: "Month-end close", excerpt: "checklist", category: "Finance ops" }),
  post("scores", { title: "Confidence scores", category: "Engineering" }),
];

describe("filterPosts", () => {
  it("filters by category and case-insensitive text", () => {
    expect(filterPosts(posts, "", "All")).toHaveLength(3);
    expect(filterPosts(posts, "", "Engineering").map((p) => p.slug)).toEqual(["scores"]);
    expect(filterPosts(posts, "CHECKLIST", "All").map((p) => p.slug)).toEqual(["close"]);
    expect(filterPosts(posts, "matching", "Finance ops")).toHaveLength(0);
  });
});

describe("BlogIndex", () => {
  it("narrows results with the topic filter and shows an empty state", async () => {
    const user = userEvent.setup();
    render(<BlogIndex posts={posts} />);

    // Featured post is shown separately; the grid lists the other two.
    expect(screen.getAllByRole("link")).toHaveLength(3);

    await user.click(screen.getByRole("button", { name: "Engineering" }));
    expect(screen.getAllByRole("link")).toHaveLength(1);
    expect(screen.getByRole("link", { name: /confidence scores/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "All" }));
    await user.type(screen.getByLabelText("Search articles"), "zzz");
    expect(await screen.findByText(/No articles match/)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });
});
