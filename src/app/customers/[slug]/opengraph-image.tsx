import { getCaseStudy, getCaseStudySlugs } from "@/lib/content/loaders";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Inkwise customer story";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  return renderOgImage({ eyebrow: "customer story", title: study?.meta.title ?? "Customer story" });
}
