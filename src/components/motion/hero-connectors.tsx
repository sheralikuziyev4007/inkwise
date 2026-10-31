"use client";

import { useEffect } from "react";

/** Field indexes (in DOM order) that get a connector to the Extracted panel. */
const CONNECTED_FIELDS = [0, 1, 3];

/**
 * Draws each connector across the gap between the document and the panel,
 * level with its highlighted field.
 */
function layoutConnectors(stage: HTMLElement) {
  const fields = stage.querySelectorAll<HTMLElement>("[data-field]");
  const connectors = stage.querySelectorAll<HTMLElement>("[data-connector]");
  const panel = stage.querySelector<HTMLElement>("[data-panel]");
  const doc = stage.querySelector<HTMLElement>("[data-doc]");
  if (!panel || !doc) return;
  const base = stage.getBoundingClientRect();
  const panelLeft = panel.getBoundingClientRect().left - base.left;
  const docRight = doc.getBoundingClientRect().right - base.left;
  connectors.forEach((line, i) => {
    const field = fields[CONNECTED_FIELDS[i] ?? -1];
    if (!field) return;
    const r = field.getBoundingClientRect();
    const left = docRight + 4;
    const width = Math.max(0, panelLeft - left - 6);
    line.style.left = `${left}px`;
    line.style.top = `${r.top - base.top + r.height / 2}px`;
    line.style.width = `${width}px`;
    line.style.display = width < 8 ? "none" : "";
  });
}

/** Keeps the hero's dashed connectors aligned at any width (desktop only, no GSAP). */
export function HeroConnectors({ target }: { target: string }) {
  useEffect(() => {
    const stage = document.getElementById(target)?.querySelector<HTMLElement>("[data-hero-stage]");
    if (!stage) return;
    const mql = window.matchMedia("(min-width: 1024px)");
    let observer: ResizeObserver | null = null;
    const sync = () => {
      observer?.disconnect();
      observer = null;
      if (!mql.matches) return;
      const relayout = () => layoutConnectors(stage);
      relayout();
      observer = new ResizeObserver(relayout);
      observer.observe(stage);
      void document.fonts?.ready.then(relayout);
    };
    sync();
    mql.addEventListener("change", sync);
    return () => {
      mql.removeEventListener("change", sync);
      observer?.disconnect();
    };
  }, [target]);

  return null;
}
