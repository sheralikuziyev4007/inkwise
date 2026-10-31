import fs from "node:fs";
import path from "node:path";

import type { ComponentType } from "react";

import type { CaseStudyMeta, Entry, PostMeta } from "./types";

/*
 * Content lives in src/content/<collection>/<slug>.mdx. Each file exports a
 * typed `meta` object and its MDX body. Everything here runs at build time
 * (static generation), so reading the file system is safe.
 */

const CONTENT_DIR = path.join(process.cwd(), "src", "content");

type MdxModule<M> = { default: ComponentType; meta: M };

function listSlugs(collection: "customers" | "blog"): string[] {
  return fs
    .readdirSync(path.join(CONTENT_DIR, collection))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort();
}

async function loadCaseStudy(slug: string): Promise<MdxModule<CaseStudyMeta>> {
  return (await import(`@/content/customers/${slug}.mdx`)) as MdxModule<CaseStudyMeta>;
}

async function loadPost(slug: string): Promise<MdxModule<PostMeta>> {
  return (await import(`@/content/blog/${slug}.mdx`)) as MdxModule<PostMeta>;
}

const byDateDesc = <M extends { publishedAt: string }>(a: Entry<M>, b: Entry<M>) =>
  b.meta.publishedAt.localeCompare(a.meta.publishedAt);

export function getCaseStudySlugs() {
  return listSlugs("customers");
}

export function getPostSlugs() {
  return listSlugs("blog");
}

export async function getCaseStudies(): Promise<Entry<CaseStudyMeta>[]> {
  const entries = await Promise.all(
    getCaseStudySlugs().map(async (slug) => ({ slug, meta: (await loadCaseStudy(slug)).meta })),
  );
  return entries.sort(byDateDesc);
}

export async function getPosts(): Promise<Entry<PostMeta>[]> {
  const entries = await Promise.all(
    getPostSlugs().map(async (slug) => ({ slug, meta: (await loadPost(slug)).meta })),
  );
  return entries.sort(byDateDesc);
}

export async function getCaseStudy(slug: string) {
  if (!getCaseStudySlugs().includes(slug)) return null;
  const mod = await loadCaseStudy(slug);
  return { slug, meta: mod.meta, Content: mod.default };
}

export async function getPost(slug: string) {
  if (!getPostSlugs().includes(slug)) return null;
  const mod = await loadPost(slug);
  return { slug, meta: mod.meta, Content: mod.default };
}
