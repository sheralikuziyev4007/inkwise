import { CtaBanner } from "@/components/sections/shared/cta-banner";
import { Hero } from "@/components/sections/home/hero";
import { HowItWorks } from "@/components/sections/home/how-it-works";
import { Integrations } from "@/components/sections/home/integrations";
import { LogoStrip } from "@/components/sections/home/logo-strip";
import { PricingPreview } from "@/components/sections/home/pricing-preview";
import { ProblemSolution } from "@/components/sections/home/problem-solution";
import { Testimonials } from "@/components/sections/home/testimonials";
import { UseCases } from "@/components/sections/home/use-cases";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <ProblemSolution />
      <HowItWorks />
      <UseCases />
      <Integrations />
      <Testimonials />
      <PricingPreview />
      <CtaBanner />
    </>
  );
}
