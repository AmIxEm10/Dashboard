import type { Metadata } from "next";
import KineticForm from "@/components/ui/KineticForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Ouvrez un projet avec CGR International — réponse technique sous 48h.",
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
            <span className="h-1.5 w-1.5 rounded-full bg-ignition" />
            CGR.05 · Contact
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-steel-400">
            — Un mail vaut mille plans
          </span>
        </div>

        <h1 className="display mt-10 text-[clamp(2.75rem,7vw,6.5rem)] text-balance">
          Parlez-nous de la{" "}
          <span className="italic text-ignition">pièce</span> —
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
                  className="grid h-12 w-12 place-items-center rounded-full border border-ignition/50 bg-ignition/10 font-mono text-xs text-ignition"
                >
                  CM
                </div>
                <div>
                  <div className="font-display text-lg text-steel-100">
                    Claire Mercier
                  </div>
                  <div className="mt-1 text-xs text-steel-400">
                    Responsable projets industriels
                  </div>
                  <a
                    href="mailto:projets@cgr-intl.example"
                    className="mt-3 inline-block font-mono text-xs text-ignition hover:underline"
                  >
                    projets@cgr-intl.example
                  </a>
                </div>
              </div>
            </div>

            <div>
              <p className="eyebrow">— Sites</p>
              <ul className="mt-4 grid gap-px bg-[color:var(--line)]">
                {sites.map((s) => (
                  <li
                    key={s.city}
                    className="flex items-center justify-between bg-[color:var(--bg)] py-4 font-mono text-xs"
                  >
                    <span className="text-steel-100">
                      {s.city},{" "}
                      <span className="text-steel-400">{s.country}</span>
                    </span>
                    <span className="uppercase tracking-widest text-steel-400">
                      {s.role}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-steel-400">
                15 sites · 4 continents · 3 200 collaborateurs
              </p>
            </div>

            <div className="rounded-sm border border-[color:var(--line-strong)] bg-carbon-900/60 p-6">
              <p className="eyebrow">— SLA réponse</p>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-mono text-4xl text-ignition">48h</span>
                <span className="text-xs text-steel-400">
                  — première analyse technique, chiffrée.
                </span>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-24 border-t border-[color:var(--line)] py-10 font-mono text-[10px] uppercase tracking-widest text-steel-400">
          © CGR International · Est. 1902 · Tous droits réservés.
        </div>
      </div>
    </section>
  );
}
