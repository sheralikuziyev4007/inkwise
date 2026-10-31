import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Inkwise — Built for the messy middle of operations.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "features",
    title: "Built for the messy middle of operations.",
    highlight: "messy middle",
  });
}
