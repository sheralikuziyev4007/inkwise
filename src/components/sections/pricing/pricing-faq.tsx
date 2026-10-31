import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { pricingFaq } from "@/lib/pricing";

export function PricingFaq() {
  return (
    <section aria-labelledby="faq-title" className="pb-24">
      <Container className="flex flex-col gap-10 lg:flex-row lg:gap-12">
        <h2 id="faq-title" className="h-section m-0 text-[clamp(2rem,3.6vw,3rem)] lg:w-1/3">
          Questions, answered.
        </h2>
        <Accordion
          className="lg:flex-1"
          items={pricingFaq.map((f) => ({ question: f.question, answer: f.answer }))}
        />
      </Container>
    </section>
  );
}
