"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

/**
 * Hero Header — content layer sitting above the global WebGL canvas.
 * GSAP orchestrates a staggered reveal on mount; the canvas handles
 * the 3D spring underneath.
 */
export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-reveal]", { opacity: 0, y: 40 });
      gsap.to("[data-reveal]", {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.15,
      });

      gsap.fromTo(
        "[data-scan]",
        { scaleY: 0, transformOrigin: "top" },
        { scaleY: 1, duration: 1.4, ease: "power3.inOut", delay: 0.4 },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative z-10 flex min-h-screen flex-col justify-end pb-24 pt-28 sm:pt-32"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 mask-fade-b" aria-hidden />
      <div className="radial-ignition pointer-events-none absolute inset-0 opacity-80" aria-hidden />

      {/* Vertical scan line — evokes metrology/calibration */}
      <span
        data-scan
        aria-hidden
        className="pointer-events-none absolute left-8 top-28 bottom-24 w-px bg-gradient-to-b from-transparent via-ignition/60 to-transparent sm:left-12"
      />

      <div className="container-page relative">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <div
              data-reveal
              className="mb-10 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-steel-400"
            >
              <span className="chip">
                <span className="h-1.5 w-1.5 rounded-full bg-ignition" />
                ISO 9001 · IATF 16949 · EN 9100
              </span>
              <span>— Precision engineering since 1902</span>
            </div>

            <h1
              data-reveal
              className="display text-[clamp(3rem,9vw,9.5rem)] text-balance"
            >
              La tension{" "}
              <span className="italic text-ignition">précise</span>
              <br />
              qui met le monde{" "}
              <span className="italic text-ignition">en mouvement.</span>
            </h1>

            <p
              data-reveal
              className="mt-10 max-w-xl text-lg leading-relaxed text-steel-300 text-pretty"
            >
              CGR International conçoit et produit des ressorts, pièces formées
              à froid et composants mécaniques de précision pour les secteurs
              les plus exigeants — automobile, aéronautique, médical, énergie.
              Quatre générations d'ingénierie condensées dans chaque spire.
            </p>

            <div data-reveal className="mt-12 flex flex-wrap items-center gap-4">
              <Link href="/industries" className="btn-primary">
                ✦ Explorer nos industries
              </Link>
              <Link href="/contact" className="btn-ghost">
                → Parler à un ingénieur
              </Link>
            </div>
          </div>

          {/* Right column — metrology-style readout */}
          <aside data-reveal className="lg:mb-4">
            <div className="rounded-2xl border border-[color:var(--line-strong)] bg-carbon-900/60 p-6 backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-steel-400">
                <span>Live · production floor</span>
                <span className="flex items-center gap-2 text-ignition">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-ignition" />
                  REC
                </span>
              </div>

              <dl className="grid grid-cols-2 gap-6">
                {[
                  { k: "Tolérance", v: "± 5 μm" },
                  { k: "Cycles testés", v: "10⁸" },
                  { k: "Sites", v: "15" },
                  { k: "Brevets", v: "48" },
                ].map((s) => (
                  <div key={s.k}>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-steel-400">
                      {s.k}
                    </dt>
                    <dd className="mt-1 font-mono text-3xl text-steel-100">
                      {s.v}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 border-t border-[color:var(--line)] pt-4 font-mono text-[10px] uppercase tracking-widest text-steel-400">
                Signal stable · 60 FPS · Calibré 17.04.2026
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom rail — scroll hint */}
        <div className="mt-24 flex items-end justify-between border-t border-[color:var(--line)] pt-6 font-mono text-[10px] uppercase tracking-widest text-steel-400">
          <span data-reveal>— Scroll pour comprimer le ressort</span>
          <span data-reveal>CGR.01 / Hero</span>
        </div>
      </div>
    </section>
  );
}
