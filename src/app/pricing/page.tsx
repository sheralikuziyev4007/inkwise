import type { Metadata } from "next";

import { ComparisonTable } from "@/components/sections/pricing/comparison-table";
import { PricingFaq } from "@/components/sections/pricing/pricing-faq";
import { PricingPlans } from "@/components/sections/pricing/pricing-plans";
import { CtaBanner } from "@/components/sections/shared/cta-banner";
import { PageHero } from "@/components/sections/shared/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Pay for pages, not seats. Starter from $119/month billed yearly, Team from $399/month, Scale on custom terms.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <PageHero
        align="center"
        title={
          <>
            Pay for pages,
            <br />
            not seats.
          </>
        }
        lead="Invite your whole team. Every plan starts with a free 14-day pilot on your real documents."
      />
      <section aria-labelledby="plans-title" className="pb-24">
        <Container>
          <h2 id="plans-title" className="sr-only">
            Plans
          </h2>
          <PricingPlans centered />
        </Container>
      </section>
      <ComparisonTable />
      <PricingFaq />
      <CtaBanner
        title="Not sure which plan fits?"
        text="Tell us your monthly volume and we'll recommend a plan — or a pilot to measure it."
        cta={{ label: "Talk to us", href: "/contact" }}
      />
    </>
  );
}
