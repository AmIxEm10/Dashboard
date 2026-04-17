"use client";

import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";

/**
 * Preloader — the intentional "cold start" of the site.
 *
 * We lean on drei's <useProgress> (backed by Three.js' DefaultLoadingManager)
 * so HDRIs, GLTFs and any textured assets feed the bar naturally.
 * A minimum dwell time keeps the boot sequence readable even when the
 * network has nothing to report (procedural scenes finish instantly).
 *
 * Exit is a two-blade mechanical shutter with a wind-up dip, then a
 * power4 punch outward — reads as "machinery unlocking", not as a fade.
 */

const MIN_DWELL_MS = 1200;

export default function Preloader() {
  const { progress, active } = useProgress();

  const [displayed, setDisplayed] = useState(0);
  const [done, setDone] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const mountedAt = useRef(0);
  useEffect(() => {
    mountedAt.current = performance.now();
  }, []);

  // ── Smooth the raw progress number so it feels like a machine dial
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setDisplayed((prev) => {
        const diff = progress - prev;
        if (Math.abs(diff) < 0.2) return progress;
        return prev + diff * 0.12;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  // ── Mirror displayed progress onto the bar (direct DOM write)
  useEffect(() => {
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${displayed / 100})`;
    }
  }, [displayed]);

  // ── Trigger shutter once assets are ready AND min dwell elapsed
  useEffect(() => {
    if (done) return;
    if (active || progress < 100) return;

    const elapsed = performance.now() - mountedAt.current;
    const wait = Math.max(0, MIN_DWELL_MS - elapsed);

    const id = window.setTimeout(() => {
      const reduced = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const tl = gsap.timeline({ onComplete: () => setDone(true) });

      if (reduced) {
        tl.to([topRef.current, bottomRef.current, counterRef.current], {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        });
        return;
      }

      // 1. Counter lifts + fades — the machine "locks in" the reading
      tl.to(
        counterRef.current,
        {
          opacity: 0,
          y: -12,
          duration: 0.35,
          ease: "power3.in",
        },
        0,
      );

      // 2. Wind-up: blades dip inward 1vh — a pre-load "clunk"
      tl.to(
        topRef.current,
        { yPercent: 2, duration: 0.18, ease: "power2.in" },
        0.1,
      );
      tl.to(
        bottomRef.current,
        { yPercent: -2, duration: 0.18, ease: "power2.in" },
        0.1,
      );

      // 3. Release: blades eject with a mechanical spring
      tl.to(
        topRef.current,
        {
          yPercent: -102,
          duration: 0.85,
          ease: "power4.in",
        },
        0.3,
      );
      tl.to(
        bottomRef.current,
        {
          yPercent: 102,
          duration: 0.85,
          ease: "power4.in",
        },
        0.3,
      );
    }, wait);

    return () => window.clearTimeout(id);
  }, [active, progress, done]);

  // ── Lock body scroll while the preloader is up
  useEffect(() => {
    if (done) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [done]);

  if (done) return null;

  const pct = Math.round(displayed);
  const pctStr = String(pct).padStart(3, "0");

  return (
    <div
      aria-hidden
      className="pointer-events-auto fixed inset-0 z-[100]"
    >
      {/* Two shutter blades — brand navy with subtle paper grain */}
      <div
        ref={topRef}
        className="absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-brand will-change-transform"
      >
        <Grain />
        <CornerMarkers side="top" />
      </div>
      <div
        ref={bottomRef}
        className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-brand will-change-transform"
      >
        <Grain />
        <CornerMarkers side="bottom" />
      </div>

      {/* Counter — sits on top, fades out just before the shutters fly */}
      <div
        ref={counterRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
      >
        <div className="flex w-full max-w-md flex-col items-start gap-6">
          <div className="flex w-full items-center justify-between font-mono text-[10px] uppercase tracking-widest text-white/60">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
              CGR · Form your world.
            </span>
            <span>{active ? "▸ Streaming" : "▸ Ready"}</span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-display text-[clamp(4rem,12vw,8rem)] font-bold leading-none text-accent">
              {pctStr}
            </span>
            <span className="font-mono text-lg text-white/50">/ 100</span>
          </div>

          <div className="w-full">
            <div className="relative h-px w-full bg-white/20">
              <div
                ref={barRef}
                className="absolute inset-0 origin-left bg-accent"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <div className="mt-3 flex w-full items-center justify-between font-mono text-[10px] uppercase tracking-widest text-white/60">
              <span>Matériaux · shaders · hdri</span>
              <span className="text-white/80">BOOT.SEQ.04</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-left build tag — "it's a real machine" detail */}
      <div className="pointer-events-none absolute bottom-6 left-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-white/60">
        <span>▣ CGR International · Est. 1902</span>
      </div>
      <div className="pointer-events-none absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-widest text-white/60">
        Form your world. · v0.5
      </div>
    </div>
  );
}

// ── Tiny scan-line grain, inline to keep this file self-contained
function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
      style={{
        background:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)",
      }}
    />
  );
}

function CornerMarkers({ side }: { side: "top" | "bottom" }) {
  const marks =
    side === "top"
      ? ["left-4 top-4 border-l border-t", "right-4 top-4 border-r border-t"]
      : [
          "left-4 bottom-4 border-l border-b",
          "right-4 bottom-4 border-r border-b",
        ];
  return (
    <>
      {marks.map((c) => (
        <span
          key={c}
          aria-hidden
          className={`pointer-events-none absolute h-3 w-3 border-accent/80 ${c}`}
        />
      ))}
    </>
  );
}
