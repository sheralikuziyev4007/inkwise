import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Inkwise",
    short_name: "Inkwise",
    description: "AI document automation for operations and finance teams.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2f3ef",
    theme_color: "#0d0f12",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
