import Link from "next/link";

import { PricingPlans } from "@/components/sections/pricing/pricing-plans";
import { Container } from "@/components/ui/container";

export function PricingPreview() {
  return (
    <section aria-labelledby="p-title" className="py-24">
      <Container>
        <PricingPlans
          compact
          heading={
            <h2 id="p-title" className="h-section m-0 max-w-2xl text-[clamp(2.25rem,4.2vw,3.5rem)]">
              Pricing that scales with pages, not people.
            </h2>
          }
        />
        <p className="m-0 mt-6 text-center">
          <Link
            href="/pricing"
            className="inline-block py-2 font-semibold underline decoration-highlight decoration-[3px] underline-offset-4"
          >
            Compare all plans →
          </Link>
        </p>
      </Container>
    </section>
  );
}
