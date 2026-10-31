"use client";

import { useEffect, type ReactNode } from "react";

// Module scope survives client-side navigations, so the very first load is skipped.
let hasNavigated = false;

/**
 * Rendered from app/template.tsx, which remounts on every navigation.
 * After the first load, an ink panel covers the new page and wipes upward
 * (CSS keyframes, 450ms; disabled when the visitor prefers reduced motion).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const animate = hasNavigated;

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <>
      {animate ? <div aria-hidden="true" className="page-wipe" /> : null}
      {children}
    </>
  );
}
