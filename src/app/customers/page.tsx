import type { Metadata } from "next";

import { CaseStudyList } from "@/components/sections/customers/case-study-list";
import { CtaBanner } from "@/components/sections/shared/cta-banner";
import { PageHero } from "@/components/sections/shared/page-hero";
import { Container } from "@/components/ui/container";
import { getCaseStudies } from "@/lib/content/loaders";

export const metadata: Metadata = {
  title: "Customers",
  description: "How operations and finance teams use Inkwise to stop retyping documents.",
  alternates: { canonical: "/customers" },
};

export default async function CustomersPage() {
  const entries = await getCaseStudies();
  return (
    <>
      <PageHero eyebrow="Customers" title="Teams that stopped retyping." />
      <section aria-label="Customer stories" className="pb-24">
        <Container>
          <CaseStudyList entries={entries} />
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}
