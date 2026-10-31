"use client";

import { useEffect, useRef } from "react";

import { scenes, type SceneName } from "@/lib/motion/scenes";
import { useMotion } from "@/lib/motion/use-motion";

interface MotionSceneProps {
  scene: SceneName;
  /** id of the server-rendered element the scene animates. */
  target: string;
  when?: "now" | "idle";
}

/**
 * Renders nothing; attaches a named animation scene to a server-rendered
 * section. Keeping section markup in Server Components means React doesn't
 * ship or run component code for it — only this tiny controller hydrates.
 */
export function MotionScene({ scene, target, when = "idle" }: MotionSceneProps) {
  const root = useRef<HTMLElement | null>(null);

  // Runs before useMotion's effect (same component, declaration order).
  useEffect(() => {
    root.current = document.getElementById(target);
  }, [target]);

  useMotion(
    root,
    (api) => {
      if (root.current) return scenes[scene](api, root.current);
    },
    { when, deps: [scene, target] },
  );

  return null;
}
