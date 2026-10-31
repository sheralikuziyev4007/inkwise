import type { Metadata } from "next";

import { SplitReveal } from "@/components/motion/split-reveal";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { Container } from "@/components/ui/container";
import { CheckIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a 30-minute demo on your own documents. We reply within one business day.",
  alternates: { canonical: "/contact" },
};

const promises = [
  "30-minute live demo on your own files",
  "Pilot plan and pricing estimate",
  "No sales pressure, ever",
];

export default function ContactPage() {
  return (
    <Container className="flex flex-col gap-14 pt-16 pb-24 sm:pt-20 lg:flex-row lg:items-start lg:gap-16">
      <div className="flex flex-col gap-6 lg:flex-1">
        <SplitReveal className="h-display m-0 text-[clamp(2.75rem,5.4vw,4.75rem)] leading-[1.04]">
          Let&apos;s look at your <span className="marker">documents</span>.
        </SplitReveal>
        <p className="m-0 text-lg leading-relaxed text-ink-2">
          Tell us what you process today. We&apos;ll reply within one business day with a demo slot
          and a short checklist.
        </p>
        <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
          {promises.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="inline-flex size-7 items-center justify-center rounded-lg bg-ink text-highlight">
                <CheckIcon size={14} />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="m-0 border-t border-line pt-5 text-[15px] text-ink-2">
          Prefer email?{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-semibold text-ink underline decoration-highlight decoration-2 underline-offset-4"
          >
            {siteConfig.email}
          </a>
        </p>
      </div>
      <div className="rounded-[28px] border border-line bg-sheet p-6 sm:p-10 lg:flex-[1.2]">
        <ContactForm />
      </div>
    </Container>
  );
}
