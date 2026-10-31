import fs from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontDir = path.join(process.cwd(), "node_modules", "@fontsource");

async function loadFonts() {
  const [display, body] = await Promise.all([
    fs.readFile(
      path.join(fontDir, "bricolage-grotesque/files/bricolage-grotesque-latin-700-normal.woff"),
    ),
    fs.readFile(path.join(fontDir, "inter/files/inter-latin-400-normal.woff")),
  ]);
  return [
    { name: "Bricolage", data: display, weight: 700 as const, style: "normal" as const },
    { name: "Inter", data: body, weight: 400 as const, style: "normal" as const },
  ];
}

interface OgOptions {
  eyebrow: string;
  title: string;
  /** Word or phrase inside the title to draw with the highlighter. */
  highlight?: string;
}

/** Branded Open Graph card shared by every route. */
export async function renderOgImage({ eyebrow, title, highlight }: OgOptions) {
  const fonts = await loadFonts();
  const parts = highlight && title.includes(highlight) ? title.split(highlight) : [title];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f2f3ef",
        padding: "64px 72px",
        fontFamily: "Inter",
        color: "#0d0f12",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#0d0f12",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 6,
              padding: "0 12px",
            }}
          >
            <div style={{ height: 4, width: 26, background: "#f2f3ef", borderRadius: 2 }} />
            <div style={{ height: 4, width: 16, background: "#f2f3ef", borderRadius: 2 }} />
            <div style={{ height: 6, width: 28, background: "#c6f432", borderRadius: 3 }} />
          </div>
          <span style={{ fontFamily: "Bricolage", fontSize: 40, letterSpacing: -1 }}>Inkwise</span>
        </div>
        <span
          style={{
            fontSize: 22,
            border: "2px solid #0d0f12",
            borderRadius: 999,
            padding: "8px 20px",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {eyebrow}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          fontFamily: "Bricolage",
          fontSize: title.length > 60 ? 64 : 76,
          lineHeight: 1,
          letterSpacing: -3,
        }}
      >
        {parts.length === 2 ? (
          <>
            <span>{parts[0]}</span>
            <span style={{ background: "#c6f432", padding: "0 12px", borderRadius: 12 }}>
              {highlight}
            </span>
            <span>{parts[1]}</span>
          </>
        ) : (
          <span>{title}</span>
        )}
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#3a3f47" }}
      >
        <span>AI document automation for operations &amp; finance teams</span>
        <span>Concept project</span>
      </div>
    </div>,
    { ...ogSize, fonts },
  );
}
