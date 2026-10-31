import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
}

/** Heading row used by most sections: big title left, supporting text or control right. */
export function SectionHeader({
  id,
  title,
  description,
  aside,
  className,
  titleClassName,
  as: Heading = "h2",
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-10 flex flex-wrap items-end justify-between gap-6", className)}>
      <Heading id={id} className={cn("h-section m-0 max-w-3xl", titleClassName)}>
        {title}
      </Heading>
      {description ? (
        <p className="m-0 max-w-sm text-[17px] leading-relaxed text-ink-2">{description}</p>
      ) : null}
      {aside}
    </div>
  );
}
