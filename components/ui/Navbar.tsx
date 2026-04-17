"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
          ? "border-b border-[color:var(--line)] bg-carbon-950/70 backdrop-blur-xl"
          : ""
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="CGR International">
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-sm border border-steel-300/40 font-mono text-[11px] font-bold tracking-tighter"
          >
            CGR
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-steel-400 sm:inline">
            International · Est. 1902
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2 font-mono text-xs uppercase tracking-widest text-steel-300 transition-colors hover:text-ignition"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-steel-400 lg:flex">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-ignition" />
            15 sites · 4 continents
          </div>
          <Link href="/devis" className="btn-ghost !py-2 !px-4">
            → Devis
          </Link>
        </div>
      </nav>
    </header>
  );
}
