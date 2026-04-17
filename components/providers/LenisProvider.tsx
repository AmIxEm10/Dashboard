"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { installMotionTracking, motion } from "@/lib/motion-store";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Lenis smooth scroll, wired into GSAP's ticker so ScrollTrigger-based
 * reveals stay in lockstep with the smoothed scroll. We also bridge
 * scroll into our shared motion store so the WebGL scene reacts.
 */
export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    installMotionTracking();

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    const onScroll = ({
      scroll,
      velocity,
    }: {
      scroll: number;
      velocity: number;
    }) => {
      motion.scrollY = scroll;
      motion.scrollProgress = Math.min(
        1,
        Math.max(0, scroll / window.innerHeight),
      );
      // Lenis velocity is in px/ms-ish; square-root keeps the dynamic
      // range usable for visual effects without clipping on fast flings.
      motion.scrollVelocity = Math.min(1, Math.abs(velocity) * 0.02);
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    // Drive Lenis with GSAP's ticker — single rAF source for the page
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
