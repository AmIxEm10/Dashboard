import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Me contacter pour un projet, une mission ou un café.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Discutons"
        title="Parlons de votre projet — sans langue de bois."
        italicWord="sans langue de bois"
        description="Je réponds à tous les messages sous 48h ouvrées. Les meilleurs projets commencent souvent par une conversation sans engagement — expliquez-moi le contexte, je vous dirai honnêtement si je suis la bonne personne."
      />

      <section className="container-page grid gap-16 pb-24 lg:grid-cols-[2fr_1fr]">
        <ContactForm />

        <aside className="space-y-10">
          <div>
            <p className="eyebrow mb-4">— Canaux</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@alexdupont.dev"
                  className="group flex items-baseline justify-between border-b border-[color:var(--line)] pb-3 transition-colors hover:text-[color:var(--ember)]"
                >
                  <span className="display text-2xl">Email</span>
                  <span className="font-mono text-xs uppercase tracking-widest text-[color:var(--ink-muted)] group-hover:text-[color:var(--ember)]">
                    → hello@alexdupont.dev
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://cal.com"
                  className="group flex items-baseline justify-between border-b border-[color:var(--line)] pb-3 transition-colors hover:text-[color:var(--ember)]"
                >
                  <span className="display text-2xl">Call 30min</span>
                  <span className="font-mono text-xs uppercase tracking-widest text-[color:var(--ink-muted)] group-hover:text-[color:var(--ember)]">
                    → cal.com/alex
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  className="group flex items-baseline justify-between border-b border-[color:var(--line)] pb-3 transition-colors hover:text-[color:var(--ember)]"
                >
                  <span className="display text-2xl">LinkedIn</span>
                  <span className="font-mono text-xs uppercase tracking-widest text-[color:var(--ink-muted)] group-hover:text-[color:var(--ember)]">
                    → /in/alexdupont
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">— Ce que je cherche</p>
            <ul className="space-y-2 text-[color:var(--ink)]">
              <li className="flex gap-3">
                <span className="text-[color:var(--ember)]">✓</span>
                Missions freelance 2 — 6 mois
              </li>
              <li className="flex gap-3">
                <span className="text-[color:var(--ember)]">✓</span>
                Équipes petites et sérieuses
              </li>
              <li className="flex gap-3">
                <span className="text-[color:var(--ember)]">✓</span>
                Problèmes concrets, pas de hype
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">— Localisation</p>
            <p className="italic-serif text-xl text-[color:var(--ink)]">
              Paris · 48.8566°N, 2.3522°E
            </p>
            <p className="mt-2 text-sm text-[color:var(--ink-muted)]">
              Remote friendly, dispo pour 2 jours/semaine sur site sur Paris.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
