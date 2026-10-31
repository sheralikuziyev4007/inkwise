export type BillingPeriod = "monthly" | "yearly";
export type PlanId = "starter" | "team" | "scale";

export interface Plan {
  id: PlanId;
  name: string;
  /** USD per month when billed monthly; null = custom quote. */
  monthly: number | null;
  /** USD per month when billed yearly; null = custom quote. */
  yearly: number | null;
  pagesPerMonth: number | null;
  /** USD per page above the included volume. */
  overage: number | null;
  summary: string;
  features: string[];
  cta: { label: string; href: string };
  popular?: boolean;
}

/** Yearly billing discount shown on the toggle. */
export const YEARLY_DISCOUNT_PERCENT = 20;

/*
 * Price points sit inside the range of published per-page IDP plans
 * (~$0.10–0.15 per page at 1–5k pages/month) so the demo reads as realistic.
 */
export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthly: 149,
    yearly: 119,
    pagesPerMonth: 1000,
    overage: 0.12,
    summary: "For small teams automating their first document workflow.",
    features: [
      "1,000 pages / month",
      "3 document types",
      "Email & upload ingest",
      "Spreadsheet export",
    ],
    cta: { label: "Start free pilot", href: "/contact" },
  },
  {
    id: "team",
    name: "Team",
    monthly: 499,
    yearly: 399,
    pagesPerMonth: 5000,
    overage: 0.08,
    summary: "Approval rules, every connector and priority support.",
    features: [
      "5,000 pages / month",
      "Unlimited document types",
      "All connectors + REST API",
      "Approval rules & review queue",
    ],
    cta: { label: "Book a demo", href: "/contact" },
    popular: true,
  },
  {
    id: "scale",
    name: "Scale",
    monthly: null,
    yearly: null,
    pagesPerMonth: null,
    overage: null,
    summary: "Volume pricing, SSO and a dedicated success manager.",
    features: [
      "Custom page volume",
      "SSO & SCIM",
      "Custom-trained models",
      "Dedicated manager & SLA",
    ],
    cta: { label: "Talk to sales", href: "/contact" },
  },
];

export function getPlan(id: PlanId): Plan {
  const plan = plans.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  return plan;
}

/** Monthly price for the chosen billing period, or null for custom plans. */
export function priceFor(plan: Plan, period: BillingPeriod): number | null {
  return period === "yearly" ? plan.yearly : plan.monthly;
}

/** Total charged per year for a plan on the chosen period. */
export function annualTotal(plan: Plan, period: BillingPeriod): number | null {
  const price = priceFor(plan, period);
  return price === null ? null : price * 12;
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
}

export function billingNote(plan: Plan, period: BillingPeriod): string {
  const total = annualTotal(plan, period);
  if (total === null) return "Annual contract, volume pricing";
  return period === "yearly"
    ? `per month, billed ${formatUsd(total)} yearly`
    : "billed monthly, cancel anytime";
}

export interface ComparisonRow {
  feature: string;
  values: Record<PlanId, string>;
}

export interface ComparisonGroup {
  title: string;
  rows: ComparisonRow[];
}

export const comparison: ComparisonGroup[] = [
  {
    title: "Extraction",
    rows: [
      { feature: "Pages per month", values: { starter: "1,000", team: "5,000", scale: "Custom" } },
      {
        feature: "Extra pages",
        values: { starter: "$0.12 / page", team: "$0.08 / page", scale: "Volume rate" },
      },
      {
        feature: "Document types",
        values: { starter: "3", team: "Unlimited", scale: "Unlimited" },
      },
      {
        feature: "Confidence scores",
        values: { starter: "Included", team: "Included", scale: "Included" },
      },
      { feature: "Custom-trained models", values: { starter: "—", team: "—", scale: "Included" } },
    ],
  },
  {
    title: "Workflow",
    rows: [
      { feature: "Review queue", values: { starter: "—", team: "Included", scale: "Included" } },
      { feature: "Approval rules", values: { starter: "—", team: "Up to 20", scale: "Unlimited" } },
      {
        feature: "Native connectors",
        values: { starter: "Spreadsheets", team: "All", scale: "All + custom" },
      },
      {
        feature: "REST API & webhooks",
        values: { starter: "—", team: "Included", scale: "Included" },
      },
    ],
  },
  {
    title: "Security & support",
    rows: [
      {
        feature: "Audit trail",
        values: { starter: "30 days", team: "1 year", scale: "Unlimited" },
      },
      { feature: "SSO / SCIM", values: { starter: "—", team: "—", scale: "Included" } },
      {
        feature: "Support",
        values: { starter: "Email", team: "Priority", scale: "Dedicated + SLA" },
      },
    ],
  },
];

export const pricingFaq: { question: string; answer: string }[] = [
  {
    question: "What counts as a page?",
    answer:
      "One side of one document. A three-page PDF invoice uses three pages. Blank pages are not counted.",
  },
  {
    question: "What happens if we go over our page limit?",
    answer:
      "Nothing stops. Extra pages are billed at your plan's overage rate ($0.12 on Starter, $0.08 on Team), and we'll suggest a better plan if it saves you money.",
  },
  {
    question: "Can we switch plans later?",
    answer: "Yes. Upgrades apply immediately; downgrades apply from the next billing period.",
  },
  {
    question: "How does the free pilot work?",
    answer:
      "For 14 days you get Team features on up to 500 pages of your real documents. No credit card required.",
  },
  {
    question: "Where is our data stored?",
    answer:
      "In EU or US data centers, encrypted at rest and in transit. Scale customers choose the region.",
  },
];
