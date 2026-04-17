"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Expertise = {
  code: string;
  title: string;
  body: string;
  tags: string[];
};

const items: Expertise[] = [
  {
    code: "01",
    title: "Ressorts de précision",
    body:
      "Ressorts hélicoïdaux, de torsion et de compression — de 0,1 à 30 mm de diamètre de fil. Performances garanties sur 10⁸ cycles, pour l'automobile et l'industrie lourde.",
    tags: ["Automobile", "Ferroviaire", "Industrie"],
  },
  {
    code: "02",
    title: "Formage à froid",
    body:
      "Mise en forme sans chauffe pour préserver la structure moléculaire du métal. Composants complexes à haute résistance, géométries impossibles en usinage classique.",
    tags: ["Aéronautique", "Défense", "Énergie"],
  },
  {
    code: "03",
    title: "Composants mécaniques",
    body:
      "Assemblages mécatroniques, pièces découpées-pliées, soudures laser. Du prototype à la série, intégrés dans nos centres de production.",
    tags: ["Médical", "Électronique", "Luxe"],
  },
  {
    code: "04",
    title: "Ingénierie & simulation",
    body:
      "Équipes R&D dédiées, bancs de test sur-mesure, simulations fatigue et éléments finis. Nous co-développons avec vos équipes dès la phase concept.",
    tags: ["R&D", "Simulation", "Co-design"],
  },
];

export default function Expertises() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="expertises"
      className="relative z-10 border-t border-[color:var(--line)] bg-paper-soft py-28 sm:py-36"
    >
      <div className="container-page">
        <div className="mb-20 grid gap-8 lg:grid-cols-[1fr_2fr]">
          <p className="eyebrow">— 02. Expertises</p>
          <div>
            <h2 className="display text-5xl text-balance sm:text-6xl lg:text-7xl">
              Quatre métiers, une même{" "}
              <span className="italic text-accent">obsession</span>&nbsp;: la
              matière maîtrisée.
            </h2>
            <p className="mt-8 max-w-2xl text-lg text-ink-500 text-pretty">
              Nos équipes conçoivent, testent et produisent des composants
              invisibles mais critiques. Ils arment les ceintures de
              sécurité, les injecteurs, les actuateurs aéronautiques, les
              implants médicaux.
            </p>
          </div>
        </div>

        <ul className="grid gap-px bg-paper-line md:grid-cols-2">
          {items.map((item) => (
            <li
              key={item.code}
              data-card
              className="group relative flex flex-col gap-6 bg-paper p-8 transition-colors hover:bg-paper-elev sm:p-10"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-accent">
                  {item.code} /
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-500 transition-colors group-hover:text-accent">
                  → Explorer
                </span>
              </div>

              <h3 className="display text-3xl text-brand sm:text-4xl">
                {item.title}
              </h3>

              <p className="max-w-lg text-ink-500 text-pretty">{item.body}</p>

              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                {item.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>

              {/* Corner marks */}
              <span className="pointer-events-none absolute left-4 top-4 h-3 w-3 border-l border-t border-ink-300/40" />
              <span className="pointer-events-none absolute right-4 top-4 h-3 w-3 border-r border-t border-ink-300/40" />
              <span className="pointer-events-none absolute left-4 bottom-4 h-3 w-3 border-l border-b border-ink-300/40" />
              <span className="pointer-events-none absolute right-4 bottom-4 h-3 w-3 border-r border-b border-ink-300/40" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
