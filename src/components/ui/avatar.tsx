import { cn } from "@/lib/cn";

const tones = ["bg-highlight text-ink", "bg-sheet text-ink", "bg-ink-raised text-paper"] as const;

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** Monogram avatar — used instead of photos of real people. */
export function Avatar({
  name,
  size = 48,
  tone = 0,
  className,
}: {
  name: string;
  size?: number;
  tone?: 0 | 1 | 2;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      className={cn(
        "inline-flex flex-none items-center justify-center rounded-full font-display font-bold tracking-[-0.02em]",
        tones[tone],
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}

export function SampleBadge({
  children = "Sample",
  className,
}: {
  children?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-current px-2 py-0.5 font-mono text-[11px] tracking-[0.02em] uppercase opacity-80",
        className,
      )}
    >
      {children}
    </span>
  );
}
