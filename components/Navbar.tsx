"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Accueil", no: "01" },
  { href: "/about", label: "À propos", no: "02" },
  { href: "/projects", label: "Projets", no: "03" },
  { href: "/skills", label: "Compétences", no: "04" },
  { href: "/blog", label: "Notes", no: "05" },
  { href: "/contact", label: "Contact", no: "06" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--bg)]/75 backdrop-blur-xl">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-baseline gap-2"
          aria-label="Accueil"
        >
          <span className="display text-2xl font-semibold tracking-tight text-[color:var(--ink)]">
            Alex<span className="italic-serif text-[color:var(--ember)]"> Dupont</span>
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-[color:var(--ink-dim)] sm:inline">
            /{new Date().getFullYear()}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`group relative flex items-baseline gap-1.5 rounded-md px-3 py-2 text-sm transition-colors ${
                    active
                      ? "text-[color:var(--ink)]"
                      : "text-[color:var(--ink-muted)] hover:text-[color:var(--ink)]"
                  }`}
                >
                  <span className="font-mono text-[10px] text-[color:var(--ink-dim)]">
                    {link.no}
                  </span>
                  <span>{link.label}</span>
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-[color:var(--ember)]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden rounded-full border border-[color:var(--line-strong)] px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-[color:var(--ink)] transition-colors hover:border-[color:var(--ember)] hover:text-[color:var(--ember)] md:inline-flex"
          >
            → Écrire
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--line-strong)] md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="font-mono text-xs">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[color:var(--line)] md:hidden">
          <ul className="container-page flex flex-col py-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between border-b border-[color:var(--line)] py-3 text-sm"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-[10px] text-[color:var(--ink-dim)]">
                    {link.no}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
