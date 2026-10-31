/**
 * Absolute site URL for canonical links, Open Graph, sitemap and JSON-LD.
 * Order: explicit env var → Vercel production domain → Vercel preview URL → localhost.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  const url = explicit ?? (vercel ? `https://${vercel}` : "http://localhost:3000");
  return url.replace(/\/$/, "");
}

export const siteConfig = {
  name: "Inkwise",
  tagline: "Paperwork in. Clean data out.",
  description:
    "Inkwise reads invoices, contracts and forms, then sends verified fields straight into your ERP, accounting and ops tools.",
  url: resolveSiteUrl(),
  email: "hello@inkwise.example",
  author: {
    name: "Sherali Kuziyev",
    url: process.env.NEXT_PUBLIC_AUTHOR_URL ?? "https://www.upwork.com",
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Customers", href: "/customers" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Product",
    items: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Integrations", href: "/features#integrations" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Customers", href: "/customers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
