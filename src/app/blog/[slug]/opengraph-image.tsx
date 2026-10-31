import { getPost, getPostSlugs } from "@/lib/content/loaders";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Inkwise blog article";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return renderOgImage({
    eyebrow: post?.meta.category ?? "blog",
    title: post?.meta.title ?? "Inkwise blog",
  });
}
