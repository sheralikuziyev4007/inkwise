import { isValidElement, type ReactNode } from "react";

/** Plain text of a React node tree, e.g. `Using <code>sum()</code>` → "Using sum()". */
export function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}
