import type { ComponentType } from "react";

import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import {
  ClockIcon,
  DocumentIcon,
  LockIcon,
  RoutingIcon,
  RulesIcon,
  ShieldCheckIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/cn";

interface Feature {
  title: string;
  text: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  tone: "ink" | "sheet" | "highlight" | "paper";
}

const features: Feature[] = [
  {
    title: "Any layout, no templates",
    text: "New supplier, new format? Inkwise reads it the first time. No zones to draw, no rules to maintain.",
    Icon: DocumentIcon,
    tone: "ink",
  },
  {
    title: "Confidence per field",
    text: "Low-confidence values go to a review queue. Everything else flows through untouched.",
    Icon: ShieldCheckIcon,
    tone: "sheet",
  },
  {
    title: "Validation rules",
    text: "Match to POs, catch duplicates, check tax maths and vendor details before anything is posted.",
    Icon: RulesIcon,
    tone: "highlight",
  },
  {
    title: "Approvals & routing",
    text: "Send exceptions to the right owner by amount, vendor or department. Approve from email or your team chat.",
    Icon: RoutingIcon,
    tone: "sheet",
  },
  {
    title: "Audit trail",
    text: "Every value links back to the exact spot on the page, with who changed what and when.",
    Icon: ClockIcon,
    tone: "sheet",
  },
  {
    title: "Security by default",
    text: "SSO, role-based access and encryption at rest and in transit. EU or US data residency.",
    Icon: LockIcon,
    tone: "paper",
  },
];

const tones: Record<Feature["tone"], string> = {
  ink: "on-dark bg-ink text-paper",
  sheet: "border border-line bg-sheet",
  highlight: "bg-highlight",
  paper: "bg-paper-2",
};

export function FeatureGrid() {
  return (
    <section aria-label="Feature overview" className="pb-24">
      <Container>
        <Reveal stagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, text, Icon, tone }) => (
            <article
              key={title}
              data-reveal-item
              className={cn(
                "flex min-h-[280px] flex-col justify-between gap-6 rounded-[var(--radius-card)] p-8",
                tones[tone],
              )}
            >
              <Icon size={32} className={tone === "ink" ? "text-highlight" : undefined} />
              <div>
                <h2 className="m-0 mb-2.5 font-display text-[28px] font-bold tracking-[-0.02em]">
                  {title}
                </h2>
                <p
                  className={cn(
                    "m-0 leading-relaxed",
                    tone === "ink"
                      ? "text-muted-2"
                      : tone === "highlight"
                        ? "text-ink"
                        : "text-ink-2",
                  )}
                >
                  {text}
                </p>
              </div>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
