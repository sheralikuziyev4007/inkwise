import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Inkwise — Teams that stopped retyping.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "customers",
    title: "Teams that stopped retyping.",
    highlight: "stopped retyping",
  });
}
