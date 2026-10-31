"use client";

import { useMemo, useSyncExternalStore } from "react";

import { MEDIA } from "./media";

function subscribe(query: string) {
  return (onChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
}

/** SSR-safe media query hook. Returns `serverValue` during server rendering. */
export function useMediaQuery(query: string, serverValue = false): boolean {
  const sub = useMemo(() => subscribe(query), [query]);
  return useSyncExternalStore(
    sub,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery(MEDIA.reduced);
}
