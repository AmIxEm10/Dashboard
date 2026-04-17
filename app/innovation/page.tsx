import type { Metadata } from "next";
import Link from "next/link";
import InnovationViewer from "@/components/ui/InnovationViewer";

export const metadata: Metadata = {
  title: "Innovation — R&D, prototypage rapide, matériaux avancés",
  description:
    "Laboratoires R&D, simulation FEM, prototypage en moins de 4h : CGR International transforme un cahier des charges en pièce série. 84 brevets déposés, 12 labos actifs.",
  alternates: { canonical: "/innovation" },
  openGraph: {
    title: "Innovation CGR — R&D, prototypage rapide, matériaux avancés",
    description:
      "R&D, simulation FEM et prototypage rapide en moins de 4h. Découvrez l'atelier d'innovation CGR International en 3D manipulable.",
    url: "/innovation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Innovation CGR — R&D, prototypage rapide, matériaux avancés",
    description:
      "Atelier R&D et prototypage CGR International : 84 brevets, 12 labos, cycle proto < 4h.",
  },
};

const pillars = [
  {
    tag: "01 · R&D",
    title: "Alliages haute performance",
    body: "Aciers à mémoire, inconels, superalliages traités thermiquement en ligne. On teste, on mesure, on itère — chaque lot est tracé.",
  },
  {
    tag: "02 · Prototypage",
    title: "Du CAO au bon de commande",
    body: "Nos presses de formage sont reprogrammables en < 4h. Le prototype d'hier devient la pièce série de la semaine.",
  },
  {
    tag: "03 · Simulation",
    title: "Jumeau numérique par pièce",
    body: "FEM, crash, fatigue — chaque géométrie passe par un solveur dédié avant la moindre coupe de matière.",
  },
];

export default function InnovationPage() {
  return (
    <>
      {/* Viewer hero — the user physically manipulates an object */}
      <section className="relative z-10 pt-28 sm:pt-32">
        <div className="container-page">
          <div className="flex items-center gap-3">
            <span className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-ignition" />
              CGR.03 · Innovation
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-steel-400">
              — Cliquez. Tournez. Inspectez.
            </span>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <h1 className="display text-[clamp(2.75rem,7vw,6.5rem)] text-balance">
                La matière{" "}
                <span className="italic text-ignition">
                  se laisse manipuler.
                </span>
              </h1>
              <p className="mt-8 max-w-xl text-lg text-steel-300 text-pretty">
                Ce n'est pas une image. C'est un vrai objet en 3D — double
                hélice acier, cœur orange en ignition — tenue par le moteur
                physique de votre navigateur. Tournez-le à la souris.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[color:var(--line)] pt-8 max-w-md">
                {[
                  ["84", "brevets"],
                  ["12", "labos R&D"],
                  ["4h", "cycle proto"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-mono text-2xl text-ignition">{n}</div>
                    <div className="mt-1 text-xs uppercase tracking-widest text-steel-400">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Local WebGL viewer — its own Canvas so OrbitControls can
                capture pointer events without fighting page scroll. */}
            <div className="relative">
              <InnovationViewer />
              <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-steel-400">
                <span>● Manipulable · drag to rotate · scroll to zoom</span>
                <span>CGR.HELIX.04</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars — editorial grid, heavy hairlines */}
      <section className="relative z-10 mt-32 border-y border-[color:var(--line)] bg-carbon-950/60 py-24 backdrop-blur-sm">
        <div className="container-page">
          <p className="eyebrow">— Trois piliers, une seule exigence</p>
          <div className="mt-12 grid gap-px bg-[color:var(--line)] lg:grid-cols-3">
            {pillars.map((p) => (
              <article
                key={p.tag}
                className="group bg-[color:var(--bg)] p-8 transition-colors hover:bg-carbon-950/80"
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-steel-400">
                  <span>{p.tag}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-ignition transition-transform group-hover:scale-150" />
                </div>
                <h3 className="display mt-10 text-3xl text-balance">
                  {p.title}
                </h3>
                <p className="mt-6 text-sm text-steel-300 text-pretty">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA outro */}
      <section className="relative z-10 py-32">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-end">
          <p className="eyebrow">— Prêt à transformer une idée</p>
          <div>
            <h2 className="display text-4xl text-balance sm:text-5xl lg:text-6xl">
              Envoyez-nous un cahier des charges —{" "}
              <span className="italic text-ignition">
                on vous répond sous 48h.
              </span>
            </h2>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                ✦ Ouvrir un projet
              </Link>
              <Link href="/industries" className="btn-ghost">
                ← Voir les industries
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
