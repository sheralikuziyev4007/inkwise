import type { GsapBundle } from "./gsap";
import type { MotionConditions } from "./use-motion";

/**
 * Animation setups for server-rendered sections. Each receives the shared GSAP
 * bundle and the section root; MotionScene runs it inside gsap.context +
 * matchMedia, so everything it creates is reverted automatically.
 */
export type Scene = (
  api: GsapBundle & { conditions: MotionConditions },
  root: HTMLElement,
) => void | (() => void);

export const hero: Scene = ({ gsap, conditions }, root) => {
  const el = root;
  const q = gsap.utils.selector(el);

  const { motionOk, desktop } = conditions;
  const stage = q<HTMLElement>("[data-hero-stage]")[0];
  if (!stage) return;

  if (!motionOk) {
    gsap.set(stage, { visibility: "visible" });
    return;
  }

  // Headline words rise via CSS from the first paint (WordReveal);
  // the document stage is choreographed here once JavaScript is ready.
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.set(stage, { visibility: "visible" })
    .from(q("[data-doc]"), { y: 24, rotate: 0, autoAlpha: 0, duration: 0.6 }, 0)
    .from(q("[data-panel]"), { x: 24, autoAlpha: 0, duration: 0.6 }, 0.15)
    .from(q("[data-row]"), { autoAlpha: 0, x: -8, duration: 0.3, stagger: 0.1 }, 0.9)
    .fromTo(
      q("[data-scan]"),
      { autoAlpha: 1, top: "8%" },
      { top: "92%", duration: 1.2, ease: "none" },
      0.55,
    )
    .to(q("[data-scan]"), { autoAlpha: 0, duration: 0.25 }, ">-0.05")
    .from(
      q("[data-field]"),
      { backgroundColor: "rgba(198,244,50,0)", duration: 0.25, stagger: 0.22 },
      0.65,
    )
    .from(
      q("[data-sync]"),
      { scale: 0.6, autoAlpha: 0, duration: 0.45, ease: "back.out(2)" },
      ">-0.1",
    );

  if (desktop) {
    tl.from(
      q("[data-connector]"),
      { scaleX: 0, duration: 0.35, stagger: 0.25, ease: "power2.inOut" },
      0.75,
    );
  }
};

export const howItWorks: Scene = ({ gsap, conditions: { motionOk, desktop } }, root) => {
  const el = root;
  const q = gsap.utils.selector(el);
  if (!motionOk) return;

  if (!desktop) {
    gsap.from(q("[data-step]"), {
      autoAlpha: 0,
      y: 20,
      stagger: 0.12,
      scrollTrigger: { trigger: q("[data-steps]")[0], start: "top 80%" },
    });
    return;
  }

  const stepEls = q<HTMLElement>("[data-step]");
  const statusEls = q<HTMLElement>("[data-status]");
  const fieldEls = q<HTMLElement>("[data-how-field]");
  const checks = q<HTMLElement>("[data-how-check]");

  gsap.set(stepEls.slice(1), { opacity: 0.6 });
  gsap.set(fieldEls, { autoAlpha: 0, scale: 0.94 });
  gsap.set(checks, { autoAlpha: 0, scale: 0.4 });
  gsap.set(statusEls[0] ?? [], { autoAlpha: 1 });
  gsap.set(statusEls.slice(1), { autoAlpha: 0, y: 8 });
  gsap.set(q("[data-progress]"), { scaleY: 1 / 3 });

  const counter = q<HTMLElement>("[data-step-counter]")[0];
  let current = 0;
  const syncCounter = (progress: number) => {
    const step = progress < 0.2 ? 1 : progress < 0.6 ? 2 : 3;
    if (counter && step !== current) {
      current = step;
      counter.textContent = `0${step}`;
    }
  };
  syncCounter(0);

  const tl = gsap.timeline({
    defaults: { ease: "power2.out", duration: 0.5 },
    onUpdate: () => syncCounter(tl.progress()),
    scrollTrigger: {
      trigger: q("[data-pin]")[0],
      start: "center center",
      end: "+=1800",
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
    },
  });

  tl.addLabel("extract", 0.4)
    .to(stepEls[0] ?? [], { opacity: 0.6 }, "extract")
    .to(stepEls[1] ?? [], { opacity: 1 }, "extract")
    .to(statusEls[0] ?? [], { autoAlpha: 0, y: -8 }, "extract")
    .to(statusEls[1] ?? [], { autoAlpha: 1, y: 0 }, "extract")
    .to(q("[data-progress]"), { scaleY: 2 / 3 }, "extract")
    .to(fieldEls, { autoAlpha: 1, scale: 1, stagger: 0.2 }, "extract+=0.1")
    .addLabel("sync", "+=0.5")
    .to(stepEls[1] ?? [], { opacity: 0.6 }, "sync")
    .to(stepEls[2] ?? [], { opacity: 1 }, "sync")
    .to(statusEls[1] ?? [], { autoAlpha: 0, y: -8 }, "sync")
    .to(statusEls[2] ?? [], { autoAlpha: 1, y: 0 }, "sync")
    .to(q("[data-progress]"), { scaleY: 1 }, "sync")
    .to(checks, { autoAlpha: 1, scale: 1, stagger: 0.1, ease: "back.out(2)" }, "sync+=0.1")
    .to({}, { duration: 0.4 });

  return () => {
    if (counter) counter.textContent = "03";
  };
};

export const useCases: Scene = ({ gsap, conditions: { motionOk, desktop } }, root) => {
  const el = root;
  const q = gsap.utils.selector(el);
  const viewport = q<HTMLElement>("[data-track-viewport]")[0];
  const track = q<HTMLElement>("[data-track]")[0];
  if (!motionOk || !desktop || !viewport || !track) return;

  gsap.set(viewport, { overflow: "visible" });
  const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

  gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      trigger: q("[data-hpin]")[0],
      start: "center center",
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });
};

export const strike: Scene = ({ gsap, conditions: { motionOk } }, root) => {
  if (!motionOk || !root) return;
  gsap.from(root.querySelectorAll("[data-strike]"), {
    scaleX: 0,
    ease: "none",
    stagger: 0.25,
    scrollTrigger: { trigger: root, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
  });
};

export const scenes = { hero, howItWorks, useCases, strike } as const;
export type SceneName = keyof typeof scenes;
