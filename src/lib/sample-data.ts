/*
 * Sample content for the concept site. Every company, person and figure here is
 * invented for this portfolio project and labelled as a sample in the UI.
 */

export type LogoGlyph = "chevrons" | "hex" | "orbit" | "stack" | "leaf" | "spark";

export interface SampleCompany {
  name: string;
  industry: string;
  glyph: LogoGlyph;
}

export const sampleCompanies: SampleCompany[] = [
  { name: "Corvane", industry: "Logistics", glyph: "chevrons" },
  { name: "Hallmere", industry: "Manufacturing", glyph: "hex" },
  { name: "Velmora", industry: "Healthcare", glyph: "leaf" },
  { name: "Tessaro", industry: "Food distribution", glyph: "orbit" },
  { name: "Quillon", industry: "Retail", glyph: "stack" },
  { name: "Dravik", industry: "Construction", glyph: "spark" },
];

export function companyByName(name: string): SampleCompany {
  return sampleCompanies.find((c) => c.name === name) ?? sampleCompanies[0]!;
}

export interface SampleTestimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const testimonials: SampleTestimonial[] = [
  {
    quote:
      "We used to keep two people on invoice entry the whole last week of the month. Now they review exceptions on Monday morning and the close is done by Wednesday.",
    name: "Maya Okafor",
    role: "Head of Accounts Payable",
    company: "Corvane Logistics",
  },
  {
    quote:
      "The confidence scores sold it for our auditors. Every number links back to the exact spot on the page.",
    name: "Daniel Ruiz",
    role: "Procurement Lead",
    company: "Hallmere Components",
  },
];

export const homeStats = [
  { value: "18 hrs", label: "of manual entry saved per week" },
  { value: "99.1%", label: "field-level extraction accuracy" },
  { value: "4 days", label: "faster month-end close" },
];

export const aboutFacts = [
  { value: "2022", label: "founded" },
  { value: "34", label: "people" },
  { value: "9", label: "countries" },
];

export const team = [
  { name: "Aiden Marsh", role: "Co-founder, CEO" },
  { name: "Sofia Lindqvist", role: "Co-founder, CTO" },
  { name: "Tomás Ferreira", role: "Head of Product" },
];
