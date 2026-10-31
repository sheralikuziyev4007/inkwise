"use client";

import { useEffect, useRef, type DependencyList, type RefObject } from "react";

import { loadGsap, type GsapBundle } from "./gsap";
import { onIdle } from "./idle";
import { MEDIA, MOTION_CONDITIONS } from "./media";

export interface MotionConditions {
  motionOk: boolean;
  reduced: boolean;
  desktop: boolean;
}

export type MotionSetup = (
  api: GsapBundle & { conditions: MotionConditions },
) => void | (() => void);

interface UseMotionOptions {
  /** "now": start loading GSAP right after mount; "idle": wait for an idle period. */
  when?: "now" | "idle";
  deps?: DependencyList;
}

/**
 * The single entry point for animations.
 *
 * - Skips loading GSAP entirely for reduced-motion visitors.
 * - Runs `setup` inside gsap.context() scoped to `scope`, wrapped in gsap.matchMedia()
 *   so it re-runs (and cleans up) when breakpoints or motion preference change.
 * - Reverts every tween, ScrollTrigger and pin on unmount or dependency change,
 *   which is what keeps route changes leak-free.
 */
export function useMotion(
  scope: RefObject<HTMLElement | null>,
  setup: MotionSetup,
  { when = "idle", deps = [] }: UseMotionOptions = {},
) {
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    if (window.matchMedia(MEDIA.reduced).matches) return;
    let cancelled = false;
    let revert: (() => void) | undefined;

    const start = () => {
      void loadGsap().then((api) => {
        if (cancelled || !scope.current) return;
        const ctx = api.gsap.context(() => {
          const mm = api.gsap.matchMedia();
          mm.add(MOTION_CONDITIONS, (c) =>
            setupRef.current({ ...api, conditions: c.conditions as unknown as MotionConditions }),
          );
        }, scope.current);
        revert = () => ctx.revert();
      });
    };

    const cancelSchedule = when === "now" ? (start(), () => {}) : onIdle(start);

    return () => {
      cancelled = true;
      cancelSchedule();
      revert?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
