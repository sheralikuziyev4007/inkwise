import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Inkwise — Let's look at your documents.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "contact",
    title: "Let's look at your documents.",
    highlight: "documents",
  });
}
