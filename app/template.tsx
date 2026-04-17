"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Route-transition shutter.
 *
 * template.tsx is re-mounted by the App Router on every client
 * navigation. We use that to play a quick "mechanical curtain" reveal
 * over the page content: two carbon panels (top + bottom) start
 * covering the viewport, then retract in opposite directions around a
 * thin ignition line, echoing the stamping press motif.
 *
 * The shutter is DOM-only (translateY + scaleY on GPU-composited
 * layers). No main-thread cost beyond the GSAP tween, no layout.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
      });

      tl.set(".shutter-top, .shutter-bottom", { yPercent: 0 })
        .set(".shutter-line", { scaleX: 0, transformOrigin: "left center" })
        .set(".shutter-label", { opacity: 0, y: 10 })

        // 1. ignition line scans across the screen
        .to(".shutter-line", { scaleX: 1, duration: 0.55 }, 0)
        // 2. label fades in, brand moment
        .to(".shutter-label", { opacity: 1, y: 0, duration: 0.35 }, 0.15)
        // 3. panels retract revealing the page
        .to(
          ".shutter-top",
          { yPercent: -100, duration: 0.9 },
          0.55,
        )
        .to(
          ".shutter-bottom",
          { yPercent: 100, duration: 0.9 },
          0.55,
        )
        .to(
          ".shutter-line",
          { scaleX: 0, transformOrigin: "right center", duration: 0.4 },
          0.7,
        )
        .to(".shutter-label", { opacity: 0, duration: 0.3 }, 0.55)
        // 4. finally, pull the whole wrapper out of flow
        .set(root.current, { pointerEvents: "none", display: "none" });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={root}
        className="pointer-events-none fixed inset-0 z-[100]"
        aria-hidden
      >
        <div className="shutter-top absolute inset-x-0 top-0 h-1/2 origin-top bg-brand will-change-transform">
          {/* top-left brand anchor visible during the transition */}
          <div className="absolute bottom-4 left-10 font-mono text-[10px] uppercase tracking-widest text-white/60">
            CGR · Chargement
          </div>
        </div>
        <div className="shutter-bottom absolute inset-x-0 bottom-0 h-1/2 origin-bottom bg-brand will-change-transform">
          {/* bottom-right telemetry */}
          <div className="absolute top-4 right-10 font-mono text-[10px] uppercase tracking-widest text-white/60">
            Calibré · 60 FPS
          </div>
        </div>

        {/* Thin accent scan line sitting exactly at the seam */}
        <div
          className="shutter-line absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-accent"
          aria-hidden
        />

        {/* Centered brand label, visible during the curtain */}
        <div className="shutter-label absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="font-display text-4xl font-extrabold tracking-tight text-white">
            CGR<span className="italic text-accent">.</span>
          </span>
        </div>
      </div>
      {children}
    </>
  );
}
