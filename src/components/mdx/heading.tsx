import type { ComponentPropsWithoutRef } from "react";

import { slugify } from "@/lib/content/slugify";
import { textOf } from "@/lib/content/text-of";

/** MDX h2 with a stable id so the table of contents can link to it. */
export function H2({ children, ...props }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2 id={slugify(textOf(children))} {...props}>
      {children}
    </h2>
  );
}
