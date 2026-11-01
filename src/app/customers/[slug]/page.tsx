import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { WordReveal } from "@/components/motion/word-reveal";
import { TableOfContents } from "@/components/sections/customers/table-of-contents";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { SampleBadge } from "@/components/ui/avatar";
import { CompanyLogo } from "@/components/ui/company-logo";
import { companyByName } from "@/lib/sample-data";
import { getCaseStudies, getCaseStudy, getCaseStudySlugs } from "@/lib/content/loaders";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.meta.title,
    description: study.meta.summary,
    alternates: { canonical: `/customers/${slug}` },
    openGraph: { type: "article", title: study.meta.title, description: study.meta.summary },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();
  const { meta, Content } = study;

  const all = await getCaseStudies();
  const index = all.findIndex((e) => e.slug === slug);
  const next = all[(index + 1) % all.length];

  const facts = [
    { label: "Industry", value: meta.industry },
    { label: "Team size", value: meta.teamSize },
    { label: "Documents", value: meta.documents },
    { label: "Stack", value: meta.stack },
  ];

  return (
    <article>
      <header className="on-dark bg-ink pt-16 pb-24 text-paper">
        <Container className="flex flex-col gap-7">
          <Link
            href="/customers"
            className="inline-flex items-center gap-2 self-start py-1 text-[15px] text-muted hover:text-paper"
          >
            <ArrowLeftIcon size={16} /> All customers
          </Link>
          <div className="flex flex-wrap items-center gap-4">
            <CompanyLogo
              name={companyByName(meta.company).name}
              glyph={companyByName(meta.company).glyph}
              className="text-2xl text-paper"
            />
            <SampleBadge className="text-muted">Sample case study</SampleBadge>
          </div>
          <WordReveal className="h-display m-0 max-w-5xl text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[0.98]">
            {meta.title}
          </WordReveal>
          <dl className="m-0 flex flex-wrap gap-x-10 gap-y-4">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1">
                <dt className="eyebrow text-xs text-muted">{fact.label}</dt>
                <dd className="m-0 font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </header>

      <Container className="-mt-10">
        <dl className="m-0 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-3">
          {meta.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col-reverse p-7 ${i === 0 ? "bg-highlight" : "bg-sheet"}`}
            >
              <dt className={i === 0 ? "text-[15px]" : "text-[15px] text-ink-2"}>{stat.label}</dt>
              <dd className="m-0 font-display text-5xl font-bold tracking-[-0.03em]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <Container className="flex flex-col gap-12 py-20 lg:flex-row lg:gap-16">
        <div className="lg:w-56 lg:flex-none">
          <TableOfContents sections={meta.sections} />
        </div>
        <div className="prose-ink max-w-[720px] min-w-0 flex-1">
          <Content />
          <p className="!mt-12 border-t border-line pt-5 text-sm text-ink-3">
            Inkwise is a concept brand built for a portfolio project. This customer, its people and
            its figures are illustrative samples.
          </p>
        </div>
      </Container>

      {next && next.slug !== slug ? (
        <section aria-label="Next story" className="bg-highlight py-16">
          <Container className="flex flex-wrap items-center justify-between gap-6">
            <Link
              href={`/customers/${next.slug}`}
              className="max-w-3xl font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-bold tracking-[-0.03em] hover:underline"
            >
              Next story: {next.meta.title} →
            </Link>
            <ButtonLink href="/contact" size="lg" data-magnetic>
              Book a demo
            </ButtonLink>
          </Container>
        </section>
      ) : null}
    </article>
  );
}
