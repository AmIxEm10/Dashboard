import Link from "next/link";

const social = [
  { href: "https://github.com", label: "GitHub" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://twitter.com", label: "Twitter" },
  { href: "mailto:hello@alexdupont.dev", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-[color:var(--line)] pt-16 pb-10">
      <div className="container-page grid gap-12 lg:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="eyebrow mb-4">— Contact</p>
          <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-balance">
            Un projet{" "}
            <span className="italic-serif text-[color:var(--ember)]">
              qui mérite
            </span>{" "}
            d'exister&nbsp;?
          </h2>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-baseline gap-3 font-mono text-xs uppercase tracking-widest text-[color:var(--ink)] hover:text-[color:var(--ember)]"
          >
            <span>→ hello@alexdupont.dev</span>
          </Link>
        </div>

        <nav aria-label="Navigation">
          <p className="eyebrow mb-4">— Site</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-[color:var(--ember)]">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-[color:var(--ember)]">
                Projets
              </Link>
            </li>
            <li>
              <Link href="/skills" className="hover:text-[color:var(--ember)]">
                Compétences
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[color:var(--ember)]">
                Notes
              </Link>
            </li>
            <li>
              <a
                href="/cv-alex-dupont.pdf"
                className="hover:text-[color:var(--ember)]"
              >
                Télécharger le CV ↓
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4">— Réseaux</p>
          <ul className="space-y-2 text-sm">
            {social.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[color:var(--ember)]"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page mt-16 flex flex-col items-start justify-between gap-4 border-t border-[color:var(--line)] pt-6 font-mono text-[10px] uppercase tracking-widest text-[color:var(--ink-dim)] sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} — Alex Dupont, Paris (48.8566°N)</p>
        <p>Cousu main avec Next.js + Tailwind</p>
      </div>
    </footer>
  );
}
