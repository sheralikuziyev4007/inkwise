import fs from "node:fs";
import path from "node:path";

import { slugify } from "./slugify";

/*
 * Each MDX file lists its section headings in `meta.sections` for the table of
 * contents. This guards against the list and the `## ` headings drifting apart.
 */
const CONTENT_DIR = path.join(process.cwd(), "src", "content");

const files = ["blog", "customers"].flatMap((collection) =>
  fs
    .readdirSync(path.join(CONTENT_DIR, collection))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(collection, file)),
);

function metaSections(source: string): string[] {
  const list = /sections:\s*\[([\s\S]*?)\]/.exec(source)?.[1] ?? "";
  return [...list.matchAll(/"([^"]+)"/g)].map((match) => match[1] ?? "");
}

function headings(source: string): string[] {
  return [...source.matchAll(/^## (.+)$/gm)].map((match) =>
    (match[1] ?? "").replace(/[`*_]/g, "").trim(),
  );
}

describe("MDX table of contents", () => {
  it("finds content files", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)("%s lists the same sections as its headings", (file) => {
    const source = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    expect(metaSections(source).map(slugify)).toEqual(headings(source).map(slugify));
  });
});
