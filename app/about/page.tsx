import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { experiences } from "@/lib/data";

export const metadata: Metadata = {
  title: "À propos",
  description: "Parcours, expérience et approche d'Alex Dupont.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="À propos"
        title="Ingénieur produit, artisan du web."
        italicWord="Ingénieur produit"
        description="Six ans à concevoir des produits web — du MVP griffonné sur un coin de table aux plateformes qui encaissent des milliers d'utilisateurs. J'aime les interfaces qui disparaissent et le code qu'on comprend au premier coup d'œil."
      />

      <section className="container-page grid gap-16 pb-24 lg:grid-cols-[2fr_1fr]">
        <div>
          <p className="eyebrow mb-6">— Portrait</p>
          <div className="display space-y-8 text-2xl leading-snug text-[color:var(--ink)] text-pretty sm:text-3xl">
            <p>
              Basé à Paris, je travaille avec des équipes produit pour concevoir
              des applications web{" "}
              <span className="italic-serif text-[color:var(--ember)]">
                robustes et humaines
              </span>
              . Mon approche : comprendre le problème avant de coder, livrer
              petit et souvent, mesurer l'impact.
            </p>
            <p className="text-[color:var(--ink-muted)]">
              Je m'intéresse particulièrement aux architectures type-safe,
              aux design systems réutilisables et à l'observabilité en
              production. Je contribue à l'open source et je partage mes
              apprentissages sur{" "}
              <a href="/blog" className="italic-serif text-[color:var(--ember)] underline-offset-4 hover:underline">
                mes notes
              </a>
              .
            </p>
            <p className="text-[color:var(--ink-muted)]">
              En dehors du clavier : photo argentique, trail dans les
              Vosges, et un goût prononcé pour les fermentations lactiques.
            </p>
          </div>
        </div>

        <aside className="sticky top-24 h-fit border-t border-[color:var(--line-strong)] pt-6">
          <p className="eyebrow mb-6">— En bref</p>
          <dl className="space-y-4 font-mono text-xs uppercase tracking-widest">
            {[
              ["Basé à", "Paris, FR"],
              ["Expérience", "6 ans"],
              ["Langues", "FR · EN"],
              ["Disponibilité", "Q2 2025"],
              ["Format", "Freelance / CDI"],
              ["Stack", "TS · Next · Postgres"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-4 border-b border-[color:var(--line)] pb-3"
              >
                <dt className="text-[color:var(--ink-muted)]">{k}</dt>
                <dd className="text-[color:var(--ink)]">{v}</dd>
              </div>
            ))}
          </dl>
          <a
            href="/cv-alex-dupont.pdf"
            className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[color:var(--ember)] hover:underline"
          >
            ↓ Télécharger le CV
          </a>
        </aside>
      </section>

      <section className="border-t border-[color:var(--line)] py-24 sm:py-32">
        <div className="container-page">
          <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_2fr]">
            <p className="eyebrow">— Parcours</p>
            <h2 className="display text-4xl text-balance sm:text-5xl lg:text-6xl">
              Sept ans, trois chapitres,{" "}
              <span className="italic-serif text-[color:var(--ember)]">
                une obsession
              </span>
              &nbsp;: l'interface qui marche du premier coup.
            </h2>
          </div>
          <ol className="space-y-0">
            {experiences.map((exp, i) => (
              <li
                key={`${exp.company}-${exp.period}`}
                className="grid gap-6 border-t border-[color:var(--line)] py-10 lg:grid-cols-[120px_1fr_2fr] lg:items-start"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-[color:var(--ink-dim)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-[color:var(--ember)]">
                    {exp.period}
                  </p>
                  <h3 className="display mt-3 text-2xl text-[color:var(--ink)] sm:text-3xl">
                    {exp.role}
                  </h3>
                  <p className="mt-1 italic-serif text-lg text-[color:var(--ink-muted)]">
                    {exp.company}
                    {exp.location && ` · ${exp.location}`}
                  </p>
                </div>
                <p className="max-w-xl text-[color:var(--ink-muted)] text-pretty">
                  {exp.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
