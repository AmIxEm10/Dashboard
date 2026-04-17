"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "@/lib/motion-store";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Industry = {
  code: string;
  name: string;
  lede: string;
  body: string;
  facts: [string, string][];
  clients: string[];
};

const industries: Industry[] = [
  {
    code: "01",
    name: "Automobile",
    lede: "Mouvement, sécurité, performance.",
    body:
      "Chaque véhicule moderne embarque 800 à 1 200 ressorts CGR. Injecteurs haute pression, prétensionneurs de ceintures, actuateurs de sièges, freinage régénératif — nos composants agissent au millième de seconde près, sur 10⁸ cycles, sans faiblir.",
    facts: [
      ["Tolérance géométrique", "± 5 μm"],
      ["Cycles garantis", "10⁸"],
      ["Références actives", "14 200"],
      ["Temps de cycle moyen", "1.2 s"],
    ],
    clients: ["Stellantis", "Renault", "Volkswagen", "Toyota", "Bosch"],
  },
  {
    code: "02",
    name: "Aéronautique",
    lede: "Tolérance zéro, altitude dix mille.",
    body:
      "Actuateurs cabine, verrouillage de trains d'atterrissage, nacelles de réacteurs. Notre filière aéronautique est certifiée EN 9100 et Part 21G — chaque pièce est traçable de la bobine de fil au numéro de série du moteur.",
    facts: [
      ["Certification", "EN 9100 · Part 21G"],
      ["Plage thermique", "−55 → +180 °C"],
      ["Matériaux qualifiés", "42"],
      ["Traçabilité", "100 %"],
    ],
    clients: ["Airbus", "Safran", "Thales", "Dassault Aviation", "Collins"],
  },
  {
    code: "03",
    name: "Médical",
    lede: "La précision au service du vivant.",
    body:
      "Implants orthopédiques, instruments chirurgicaux, dispositifs de microfluidique. Alliages biocompatibles (titane grade 23, Nitinol, MP35N), salles blanches ISO 7, et une confidentialité absolue sur les développements clients.",
    facts: [
      ["Salles blanches", "ISO 7"],
      ["Certification", "ISO 13485"],
      ["Alliages biocompatibles", "12"],
      ["NDA par défaut", "—"],
    ],
    clients: ["Confidentiel"],
  },
];

export default function IndustriesScroller() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!root.current) return;
    motion.industryFloat = 0;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: root.current!,
        start: "top top",
        end: "+=3600",
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          // 0 → 3 over the pinned scroll (chaos → auto → aero → médical)
          motion.industryFloat = self.progress * 3;

          // Active panel: 0 in [0, 1/3], 1 in [1/3, 2/3], 2 in [2/3, 1]
          const idx = Math.min(
            industries.length - 1,
            Math.floor(self.progress * industries.length + 0.0001),
          );
          setActive((prev) => (prev === idx ? prev : idx));
        },
      });

      return () => st.kill();
    }, root);

    return () => {
      ctx.revert();
      motion.industryFloat = 0;
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative h-screen w-full overflow-hidden"
      aria-label="Nos industries"
    >
      {/* Grid + glow bg (above canvas, below content) */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div className="radial-accent pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="container-page relative grid h-full grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* LEFT — text panels (cross-fading) */}
        <div className="relative h-[70vh]">
          {industries.map((ind, i) => (
            <article
              key={ind.code}
              aria-hidden={active !== i}
              className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ${
                active === i
                  ? "translate-y-0 opacity-100"
                  : active > i
                    ? "-translate-y-6 opacity-0"
                    : "translate-y-6 opacity-0"
              }`}
            >
              <div className="mb-6 flex items-baseline gap-4 font-mono text-xs uppercase tracking-widest">
                <span className="text-accent">
                  {ind.code} / {String(industries.length).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-[color:var(--line-strong)]" />
                <span className="text-ink-500">Industrie</span>
              </div>

              <h2 className="display text-5xl text-balance sm:text-6xl lg:text-7xl">
                {ind.name}
              </h2>
              <p className="italic mt-4 text-xl text-accent sm:text-2xl">
                {ind.lede}
              </p>

              <p className="mt-8 max-w-xl text-ink-500 text-pretty">
                {ind.body}
              </p>

              <dl className="mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-5">
                {ind.facts.map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-500">
                      {k}
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-bold text-brand">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-wrap gap-2">
                {ind.clients.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* RIGHT — progress rail + stage indicator (canvas renders behind) */}
        <div className="relative flex h-[70vh] flex-col justify-between">
          <div className="flex items-center justify-end gap-4 font-mono text-[10px] uppercase tracking-widest text-ink-500">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
            Forging · Live
          </div>

          <ol className="ml-auto w-fit space-y-6 text-right">
            {industries.map((ind, i) => (
              <li
                key={ind.code}
                className={`flex items-center justify-end gap-4 font-mono text-xs uppercase tracking-widest transition-colors ${
                  active === i
                    ? "text-accent"
                    : active > i
                      ? "text-brand"
                      : "text-ink-400"
                }`}
              >
                <span>{ind.name}</span>
                <span
                  className={`h-px transition-all ${
                    active === i
                      ? "w-16 bg-accent"
                      : active > i
                        ? "w-10 bg-brand/40"
                        : "w-6 bg-ink-300/40"
                  }`}
                />
                <span className="w-6 text-left text-ink-400">{ind.code}</span>
              </li>
            ))}
          </ol>

          <p className="text-right font-mono text-[10px] uppercase tracking-widest text-ink-500">
            Scroll ↓ pour forger la matière
          </p>
        </div>
      </div>
    </section>
  );
}
