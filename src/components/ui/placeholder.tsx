import { cn } from "@/lib/cn";

/** Clearly labelled stand-in for content that a real client would supply (logos, photos). */
export function Placeholder({
  label,
  className,
  tone = "light",
}: {
  label: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl border border-dashed font-mono text-xs",
        tone === "light" ? "border-dash text-ink-3" : "border-[#6b7079] text-muted",
        className,
      )}
    >
      {label}
    </div>
  );
}
