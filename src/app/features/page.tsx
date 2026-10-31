import type { Metadata } from "next";

import { FeatureGrid } from "@/components/sections/features/feature-grid";
import { ReviewQueue } from "@/components/sections/features/review-queue";
import { Integrations } from "@/components/sections/home/integrations";
import { CtaBanner } from "@/components/sections/shared/cta-banner";
import { PageHero } from "@/components/sections/shared/page-hero";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Template-free extraction, confidence scores, validation rules, approvals, audit trail and native integrations.",
  alternates: { canonical: "/features" },
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title={
          <>
            Built for the <span className="marker">messy middle</span> of operations.
          </>
        }
        lead="Everything between “a document arrived” and “the record is in the system” — handled, checked and logged."
      />
      <FeatureGrid />
      <ReviewQueue />
      <div className="pt-24">
        <Integrations />
      </div>
      <CtaBanner title="See it on your own documents." />
    </>
  );
}
