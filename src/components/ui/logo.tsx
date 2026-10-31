import { cn } from "@/lib/cn";

export function LogoMark({ size = 28, inverted = false }: { size?: number; inverted?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="24" height="24" rx="7" fill={inverted ? "#f2f3ef" : "#0d0f12"} />
      <path d="M8 18.5h12" stroke="#c6f432" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M9 10h10M9 14h6"
        stroke={inverted ? "#0d0f12" : "#f2f3ef"}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-display text-[22px] font-bold tracking-[-0.02em]",
        className,
      )}
    >
      <LogoMark inverted={inverted} />
      Inkwise
    </span>
  );
}
