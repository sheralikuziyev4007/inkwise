import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

/** External http(s) links open in a new tab; site paths, #anchors and mailto: stay in place. */
export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function Anchor({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  if (isExternalHref(href)) {
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
  }
  return <a href={href} {...props} />;
}
