import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Inkwise — Skilled people should make decisions.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "about",
    title: "Skilled people should make decisions.",
    highlight: "make decisions",
  });
}
