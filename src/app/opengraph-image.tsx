import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Inkwise — Paperwork in. Clean data out.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "document automation",
    title: "Paperwork in. Clean data out.",
    highlight: "Clean data",
  });
}
