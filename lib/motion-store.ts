"use client";

/**
 * Zero-dep motion store shared between DOM and the WebGL scene.
 *
 * We keep mouse/scroll state in plain refs (no React re-renders): the R3F
 * render loop reads them each frame via useFrame. This keeps calculations
 * off the React reconciler and the main thread stays free for GSAP and
 * Lenis.
 */

type MotionState = {
  mouseX: number; // normalized -1 → 1
  mouseY: number; // normalized -1 → 1
  scrollProgress: number; // 0 → 1 across the hero
  scrollY: number; // raw pixel offset
  pointerActive: boolean;
};

export const motion: MotionState = {
  mouseX: 0,
  mouseY: 0,
  scrollProgress: 0,
  scrollY: 0,
  pointerActive: false,
};

let installed = false;

export function installMotionTracking() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  const onPointerMove = (e: PointerEvent) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    motion.mouseX = (e.clientX / w) * 2 - 1;
    motion.mouseY = -((e.clientY / h) * 2 - 1);
    motion.pointerActive = true;
  };

  const onPointerLeave = () => {
    motion.pointerActive = false;
  };

  const onScroll = () => {
    const y = window.scrollY;
    motion.scrollY = y;
    // hero spans roughly 100vh, lerp progress across first viewport
    motion.scrollProgress = Math.min(1, Math.max(0, y / window.innerHeight));
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerleave", onPointerLeave, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
