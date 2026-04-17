import Link from "next/link";

/**
 * Footer — industrial closer. OLED-black background, Geist Mono
 * typography, ignition-orange on hover. Certifications are the
 * primary asset here — they are what a B2B buyer scans for first.
 */

const certifications = [
  { id: "IATF 16949", label: "Automobile" },
  { id: "EN 9100", label: "Aéronautique" },
  { id: "ISO 13485", label: "Médical" },
  { id: "ISO 9001", label: "Qualité" },
  { id: "ISO 14001", label: "Environnement" },
  { id: "ISO 45001", label: "Sécurité" },
];

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Savoir-faire",
    links: [
      { href: "/expertises", label: "Expertises" },
      { href: "/industries", label: "Industries" },
      { href: "/innovation", label: "Innovation" },
    ],
  },
  {
    title: "Groupe",
    links: [
      { href: "/groupe", label: "Notre histoire" },
      { href: "/groupe/sites", label: "Sites & implantations" },
      { href: "/carrieres", label: "Carrières" },
    ],
  },
  {
    title: "Projet",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/devis", label: "Devis express" },
      { href: "/presse", label: "Presse" },
    ],
  },
];

const legal = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Politique de confidentialité" },
  { href: "/cgv", label: "CGV" },
  { href: "/cookies", label: "Cookies" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-24 border-t border-[color:var(--line)] bg-[#050507] text-steel-300">
      <div className="container-page py-20">
        {/* Top row — brand + pitch */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr] lg:items-start">
          <div>
            <Link
              href="/"
              aria-label="CGR International"
              className="inline-flex items-center gap-3"
            >
              <span
                aria-hidden
                className="grid h-10 w-10 place-items-center rounded-sm border border-steel-300/40 font-mono text-xs font-bold tracking-tighter"
              >
                CGR
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-steel-400">
                International · Est. 1902
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm text-steel-400 text-pretty">
              Leader mondial de l'ingénierie des ressorts, du formage à froid
              et des composants mécaniques de précision.
            </p>
            <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-steel-400">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-ignition" />
              15 sites · 4 continents · 3 200 collaborateurs
            </div>
          </div>

          {/* Navigation columns */}
          <nav
            aria-label="Pied de page"
            className="grid grid-cols-2 gap-10 sm:grid-cols-3"
          >
            {columns.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[10px] uppercase tracking-widest text-steel-400">
                  — {col.title}
                </p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <FooterLink href={l.href}>{l.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Certifications strip */}
        <div className="mt-16 border-t border-[color:var(--line)] pt-10">
          <p className="font-mono text-[10px] uppercase tracking-widest text-steel-400">
            — Certifications & référentiels
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-px bg-[color:var(--line)] sm:grid-cols-3 lg:grid-cols-6">
            {certifications.map((c) => (
              <li
                key={c.id}
                className="group flex flex-col gap-1 bg-[#050507] p-4 transition-colors hover:bg-carbon-950"
              >
                <span className="font-mono text-sm text-steel-100 transition-colors group-hover:text-ignition">
                  {c.id}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-steel-400">
                  {c.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-6 border-t border-[color:var(--line)] pt-8 font-mono text-[10px] uppercase tracking-widest text-steel-400 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {year} CGR International · Tous droits réservés.</span>
            {legal.map((l) => (
              <FooterLink key={l.href} href={l.href} subtle>
                {l.label}
              </FooterLink>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-ignition" />
            <span>Kinetic Precision · Build v0.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ──────────────────────────────────────────────────────────────
// Animated ignition-orange underline on hover (pure CSS, no JS)
// ──────────────────────────────────────────────────────────────
function FooterLink({
  href,
  children,
  subtle = false,
}: {
  href: string;
  children: React.ReactNode;
  subtle?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center transition-colors hover:text-ignition ${
        subtle
          ? "font-mono text-[10px] uppercase tracking-widest text-steel-400"
          : "font-mono text-sm text-steel-200"
      }`}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-ignition transition-transform duration-300 ease-out group-hover:scale-x-100"
        />
      </span>
    </Link>
  );
}
