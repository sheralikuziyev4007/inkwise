import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { slugify } from "@/lib/content/slugify";

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  return "";
}

/** MDX h2 with a stable id so the table of contents can link to it. */
export function H2({ children, ...props }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2 id={slugify(textOf(children))} {...props}>
      {children}
    </h2>
  );
}
