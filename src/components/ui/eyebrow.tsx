import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow m-0", className)}>{children}</p>;
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-current px-3 py-1.5 font-mono text-xs",
        className,
      )}
    >
      {children}
    </span>
  );
}
