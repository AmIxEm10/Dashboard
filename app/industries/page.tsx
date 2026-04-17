import type { Metadata } from "next";
import Link from "next/link";
import IndustriesScroller from "@/components/ui/IndustriesScroller";

export const metadata: Metadata = {
  title: "Industries — Automobile, Aéronautique, Médical",
  description:
    "CGR International livre des ressorts et pièces mécaniques de précision pour l'automobile (IATF 16949), l'aéronautique (EN 9100) et le médical (ISO 13485). Découvrez nos trois filières.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Industries CGR — Automobile, Aéronautique, Médical",
    description:
      "Trois filières critiques, un même atelier : ressorts et composants mécaniques de précision certifiés IATF 16949, EN 9100, ISO 13485.",
    url: "/industries",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries CGR — Automobile, Aéronautique, Médical",
    description:
      "Ressorts et composants de précision pour l'automobile, l'aéronautique et le médical — certifications IATF 16949, EN 9100, ISO 13485.",
  },
};

export default function IndustriesPage() {
  return (
    <>
      {/* Intro — keeps the hero/page header breathable before pinning */}
      <section className="relative z-10 flex min-h-[70vh] items-end pt-32 pb-16 sm:pt-36">
        <div className="container-page relative">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-ink-500">
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              CGR.02 · Industries
            </span>
            <span>— 3 filières, un même atelier</span>
          </div>

          <h1 className="display mt-10 text-[clamp(3rem,9vw,9rem)] text-balance">
            Là où la matière{" "}
            <span className="italic text-accent">devient fonction.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-ink-500 text-pretty">
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
      <section className="relative z-10 border-t border-[color:var(--line)] bg-paper-soft py-32">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-end">
          <p className="eyebrow">— Et ensuite</p>
          <div>
            <h2 className="display text-4xl text-balance sm:text-5xl lg:text-6xl">
              D'autres secteurs&nbsp;? Énergie, ferroviaire, luxe, défense —{" "}
              <span className="italic text-accent">
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
