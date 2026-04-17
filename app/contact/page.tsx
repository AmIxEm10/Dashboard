import type { Metadata } from "next";
import KineticForm from "@/components/ui/KineticForm";

export const metadata: Metadata = {
  title: "Contact — Ouvrez un projet industriel",
  description:
    "Contactez les équipes projet CGR International pour un cahier des charges industriel. Première analyse technique chiffrée sous 48h. 15 sites, 4 continents.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact CGR International — Réponse projet sous 48h",
    description:
      "Envoyez votre cahier des charges — nos équipes projet reviennent vers vous sous 48h avec une première analyse technique chiffrée.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact CGR International — Réponse projet sous 48h",
    description:
      "Cahier des charges industriel ? Réponse technique chiffrée sous 48h par l'équipe projets CGR International.",
  },
};

const sites = [
  { city: "Saint-Yorre", country: "France", role: "Siège & R&D" },
  { city: "Blois", country: "France", role: "Formage à froid" },
  { city: "Kunshan", country: "Chine", role: "Automobile APAC" },
  { city: "Saltillo", country: "Mexique", role: "Amérique du Nord" },
];

export default function ContactPage() {
  return (
    <section className="relative z-10 pt-28 sm:pt-32">
      <div className="container-page">
        <div className="flex items-center gap-3">
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            CGR.05 · Contact
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-500">
            — Un mail vaut mille plans
          </span>
        </div>

        <h1 className="display mt-10 text-[clamp(2.75rem,7vw,6.5rem)] text-balance">
          Parlez-nous de la{" "}
          <span className="italic text-accent">pièce</span> —
          <br />
          on s'occupe du reste.
        </h1>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          {/* Form */}
          <div className="border-t border-[color:var(--line-strong)] pt-10">
            <KineticForm />
          </div>

          {/* Sidebar — sites, direct contacts */}
          <aside className="flex flex-col gap-10 border-t border-[color:var(--line-strong)] pt-10">
            <div>
              <p className="eyebrow">— Équipe projet</p>
              <div className="mt-4 flex items-start gap-4">
                <div
                  aria-hidden
                  className="grid h-12 w-12 place-items-center rounded-full border border-accent/50 bg-accent/10 font-mono text-xs font-semibold text-accent"
                >
                  CM
                </div>
                <div>
                  <div className="font-display text-lg font-semibold text-brand">
                    Claire Mercier
                  </div>
                  <div className="mt-1 text-xs text-ink-500">
                    Responsable projets industriels
                  </div>
                  <a
                    href="mailto:projets@cgr-intl.example"
                    className="mt-3 inline-block font-mono text-xs text-accent hover:underline"
                  >
                    projets@cgr-intl.example
                  </a>
                </div>
              </div>
            </div>

            <div>
              <p className="eyebrow">— Sites</p>
              <ul className="mt-4 grid gap-px bg-paper-line">
                {sites.map((s) => (
                  <li
                    key={s.city}
                    className="flex items-center justify-between bg-paper py-4 px-4 font-mono text-xs"
                  >
                    <span className="text-brand">
                      {s.city},{" "}
                      <span className="text-ink-500">{s.country}</span>
                    </span>
                    <span className="uppercase tracking-widest text-ink-500">
                      {s.role}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-ink-500">
                15 sites · 4 continents · 3 200 collaborateurs
              </p>
            </div>

            <div className="rounded-sm border border-[color:var(--line-strong)] bg-paper-soft p-6 shadow-brand-sm">
              <p className="eyebrow">— SLA réponse</p>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-display text-4xl font-bold text-accent">
                  48h
                </span>
                <span className="text-xs text-ink-500">
                  — première analyse technique, chiffrée.
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
