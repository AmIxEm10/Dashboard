import type { Metadata } from "next";
import Link from "next/link";
import IndustriesScroller from "@/components/ui/IndustriesScroller";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Automobile, aéronautique, médical : trois secteurs où la précision de CGR International fait la différence.",
};

export default function IndustriesPage() {
  return (
    <>
      {/* Intro — keeps the hero/page header breathable before pinning */}
      <section className="relative z-10 flex min-h-[70vh] items-end pt-32 pb-16 sm:pt-36">
        <div className="container-page relative">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-steel-400">
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-ignition" />
              CGR.02 · Industries
            </span>
            <span>— 3 filières, un même atelier</span>
          </div>

          <h1 className="display mt-10 text-[clamp(3rem,9vw,9rem)] text-balance">
            Là où la matière{" "}
            <span className="italic text-ignition">
              devient fonction.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-steel-300 text-pretty">
            Faites défiler la page — les particules métalliques en suspension
            vont se rassembler, spire après spire, pour former les pièces
            critiques des trois industries que nous servons.
          </p>
        </div>
      </section>

      {/* Pinned scrollytelling — drives motion.industryFloat, which
          drives the particle morphing in the global canvas. */}
      <IndustriesScroller />

      {/* Outro — releases the pin, resets the scene on hero */}
      <section className="relative z-10 border-t border-[color:var(--line)] bg-carbon-950/80 py-32 backdrop-blur-sm">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-end">
          <p className="eyebrow">— Et ensuite</p>
          <div>
            <h2 className="display text-4xl text-balance sm:text-5xl lg:text-6xl">
              D'autres secteurs&nbsp;? Énergie, ferroviaire, luxe, défense —{" "}
              <span className="italic text-ignition">
                même exigence, mêmes équipes.
              </span>
            </h2>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                ✦ Lancer un projet
              </Link>
              <Link href="/" className="btn-ghost">
                ← Retour accueil
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
