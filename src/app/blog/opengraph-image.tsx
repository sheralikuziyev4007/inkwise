import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Inkwise — Notes from the back office.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "blog",
    title: "Notes from the back office.",
    highlight: "back office",
  });
}
