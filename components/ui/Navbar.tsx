"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BrandSwoosh from "./BrandSwoosh";

const links = [
  { href: "/expertises", label: "Expertises" },
  { href: "/industries", label: "Industries" },
  { href: "/innovation", label: "Innovation" },
  { href: "/groupe", label: "Le Groupe" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        scrolled
          ? "border-b border-[color:var(--line)] bg-paper/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="CGR International — Accueil"
        >
          <span
            aria-hidden
            className="relative grid h-9 w-12 place-items-center"
          >
            <span className="font-display text-[15px] font-extrabold tracking-tight text-brand">
              CGR
            </span>
            <BrandSwoosh
              className="pointer-events-none absolute -inset-x-1 -inset-y-1 h-[calc(100%+8px)] w-[calc(100%+8px)]"
              strokeWidth={7}
              opacity={0.85}
            />
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-ink-500 sm:inline">
            Form&nbsp;your&nbsp;world.
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative rounded-md px-3 py-2 font-mono text-xs uppercase tracking-widest text-ink-700 transition-colors hover:text-accent"
              >
                <span className="relative">
                  {link.label}
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-500 lg:flex">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
            15 sites · 4 continents
          </div>
          <Link href="/devis" className="btn-primary !py-2 !px-4">
            → Devis
          </Link>
        </div>
      </nav>
    </header>
  );
}
