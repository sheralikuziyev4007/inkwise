import { cn } from "@/lib/cn";
import type { LogoGlyph } from "@/lib/sample-data";

function Glyph({ glyph }: { glyph: LogoGlyph }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (glyph) {
    case "chevrons":
      return <path d="M4 6l7 6-7 6M12 6l7 6-7 6" {...common} />;
    case "hex":
      return <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z M12 8v8" {...common} />;
    case "orbit":
      return (
        <g {...common}>
          <circle cx="12" cy="12" r="4" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-25 12 12)" />
        </g>
      );
    case "stack":
      return <path d="M3 8l9-4 9 4-9 4zM3 12l9 4 9-4M3 16l9 4 9-4" {...common} />;
    case "leaf":
      return <path d="M5 19C5 10 10 5 20 4c0 10-5 15-14 15zM5 19l8-8" {...common} />;
    case "spark":
      return (
        <path
          d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"
          {...common}
        />
      );
  }
}

/** Wordmark for a fictional sample customer (glyph + name), drawn in currentColor. */
export function CompanyLogo({
  name,
  glyph,
  className,
}: {
  name: string;
  glyph: LogoGlyph;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display text-xl font-bold tracking-[-0.02em]",
        className,
      )}
      aria-label={`${name} (sample customer)`}
      role="img"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <Glyph glyph={glyph} />
      </svg>
      <span aria-hidden="true">{name}</span>
    </span>
  );
}
