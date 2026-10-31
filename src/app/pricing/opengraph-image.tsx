import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Inkwise — Pay for pages, not seats.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "pricing",
    title: "Pay for pages, not seats.",
    highlight: "pages",
  });
}
