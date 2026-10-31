"use client";

import type { ReactNode } from "react";

import { MagneticButtons } from "./magnetic-buttons";
import { SmoothScroll } from "./smooth-scroll";

export function MotionProviders({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      {children}
      <MagneticButtons />
    </SmoothScroll>
  );
}
