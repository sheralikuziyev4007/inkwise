import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { WordReveal } from "@/components/motion/word-reveal";
import { PostCard } from "@/components/sections/blog/post-card";
import { ReadingProgress } from "@/components/sections/blog/reading-progress";
import { TableOfContents } from "@/components/sections/customers/table-of-contents";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { formatDate } from "@/lib/content/format";
import { getPost, getPosts, getPostSlugs } from "@/lib/content/loaders";
import { articleJsonLd } from "@/lib/structured-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.excerpt,
      publishedTime: post.meta.publishedAt,
      authors: [post.meta.author],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const { meta, Content } = post;
  const related = (await getPosts()).filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <JsonLd data={articleJsonLd(slug, meta)} />
      <ReadingProgress targetId="article-body" />
      <article>
        <Container as="header" className="flex max-w-4xl flex-col gap-6 pt-16 pb-12 sm:pt-20">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-3">
            <ol className="m-0 flex list-none gap-2 p-0">
              <li>
                <Link href="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{meta.category}</li>
            </ol>
          </nav>
          <WordReveal className="h-display m-0 text-[clamp(2.5rem,5vw,4.25rem)] leading-none">
            {meta.title}
          </WordReveal>
          <p className="m-0 text-xl leading-relaxed text-ink-2">{meta.excerpt}</p>
          <p className="m-0 flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] text-ink-2">
            <strong className="text-ink">{meta.author}</strong>
            <time dateTime={meta.publishedAt}>{formatDate(meta.publishedAt)}</time>
            <span>{meta.readingMinutes} min read</span>
            <span className="rounded-full border border-ink px-2.5 py-1 font-mono text-xs">
              {meta.category}
            </span>
          </p>
        </Container>

        <Container className="flex flex-col gap-12 pb-24 lg:flex-row lg:gap-16">
          <div className="lg:w-56 lg:flex-none">
            <TableOfContents sections={meta.sections} />
          </div>
          <div id="article-body" className="prose-ink max-w-[720px] min-w-0 flex-1">
            <Content />
          </div>
        </Container>
      </article>

      {related.length > 0 ? (
        <section aria-labelledby="related-title" className="bg-paper-2 py-20">
          <Container className="flex flex-col gap-7">
            <h2
              id="related-title"
              className="m-0 font-display text-4xl font-bold tracking-[-0.03em]"
            >
              Keep reading
            </h2>
            <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug} className="flex">
                  <PostCard entry={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  );
}
