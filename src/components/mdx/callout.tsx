import type { ReactNode } from "react";

import { InfoIcon } from "@/components/ui/icons";

export function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="not-prose flex gap-3.5 rounded-2xl bg-highlight px-5 py-5 text-base leading-relaxed text-ink">
      <InfoIcon size={22} className="mt-0.5 flex-none" />
      <div>
        {title ? <strong className="block">{title}</strong> : null}
        {children}
      </div>
    </aside>
  );
}
