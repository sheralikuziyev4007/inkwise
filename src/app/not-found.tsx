import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
  // Don't inherit the home page canonical from the root layout.
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <section className="on-dark bg-ink text-paper">
      <Container className="flex min-h-[70vh] flex-col gap-14 py-20 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-6 lg:flex-1">
          <p className="eyebrow m-0 text-highlight">Error 404 · field not found</p>
          <h1 className="h-display m-0 text-[clamp(3rem,6.4vw,6rem)]">
            We read this page twice. It isn&apos;t here.
          </h1>
          <p className="m-0 max-w-md text-lg leading-relaxed text-muted-2">
            The link may be old, or the page has moved. These might help:
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/" variant="light" size="lg">
              Back to home
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline-light" size="lg">
              Contact us
            </ButtonLink>
          </div>
        </div>
        <pre
          aria-hidden="true"
          className="m-0 overflow-x-auto rounded-[var(--radius-card)] bg-ink-raised p-7 font-mono text-[15px] leading-loose text-muted lg:flex-1"
        >
          {"{\n"}
          {'  "status": '}
          <span className="text-paper">404</span>
          {",\n"}
          {'  "content": '}
          <span className="rounded bg-highlight px-2 text-ink">null</span>
          {",\n"}
          {'  "confidence": '}
          <span className="text-paper">&quot;very high&quot;</span>
          {"\n}"}
        </pre>
      </Container>
    </section>
  );
}
