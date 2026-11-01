import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { slugify } from "@/lib/content/slugify";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How the Inkwise demo site handles the details you type into its forms.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "This is a demo",
    body: "Inkwise is a concept brand built as a portfolio project. There is no company, sales team or backend behind this site.",
  },
  {
    title: "What happens to form data",
    body: "The contact and newsletter forms validate your input in the browser and then stop. Nothing is sent to a server, stored or shared with anyone.",
  },
  {
    title: "Cookies and tracking",
    body: "The site sets no cookies and loads no analytics, advertising or third-party tracking scripts. Fonts are served from the same domain.",
  },
  {
    title: "Questions",
    body: `If you have questions about how this site was built, contact the author through the link in the footer. The address ${siteConfig.email} is a placeholder and does not receive mail.`,
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy notice"
        lead="Short version: nothing you type here leaves your browser."
      />
      <Container className="max-w-3xl pb-24">
        <div className="prose-ink">
          {sections.map((section) => (
            <section key={section.title} aria-labelledby={slugify(section.title)}>
              <h2 id={slugify(section.title)}>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          <p>
            <Link href="/contact">Back to the contact form</Link>
          </p>
        </div>
      </Container>
    </>
  );
}
