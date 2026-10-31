import type { MetadataRoute } from "next";

import { getCaseStudies, getPosts } from "@/lib/content/loaders";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/features",
    "/pricing",
    "/customers",
    "/blog",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
  const [studies, posts] = await Promise.all([getCaseStudies(), getPosts()]);
  return [
    ...staticRoutes,
    ...studies.map((s) => ({
      url: `${siteConfig.url}/customers/${s.slug}`,
      lastModified: s.meta.publishedAt,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...posts.map((p) => ({
      url: `${siteConfig.url}/blog/${p.slug}`,
      lastModified: p.meta.publishedAt,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
