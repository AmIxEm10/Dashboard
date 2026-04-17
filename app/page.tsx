import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import Marquee from "@/components/Marquee";
import { projects, testimonials, posts } from "@/lib/data";

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="radial-ember pointer-events-none absolute inset-x-0 top-0 h-[700px]" aria-hidden />
        <div className="container-page relative pt-16 pb-24 sm:pt-24 lg:pt-28">
          <div className="flex items-center justify-between gap-4 border-b border-[color:var(--line)] pb-6 font-mono text-[10px] uppercase tracking-widest text-[color:var(--ink-muted)]">
            <span>— Portfolio · Édition 2025</span>
            <span className="hidden sm:inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-flicker rounded-full bg-[color:var(--ember)]" />
              Disponible · Q2 2025
            </span>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <h1 className="display text-[clamp(3rem,9vw,9.5rem)] text-balance text-[color:var(--ink)]">
              Je conçois{" "}
              <span className="italic-serif text-[color:var(--ember)]">
                des produits
              </span>
              <br />
              web qui ne{" "}
              <span className="italic-serif text-[color:var(--ember)]">
                vieillissent
              </span>{" "}
              pas.
            </h1>
            <p className="max-w-sm text-sm leading-relaxed text-[color:var(--ink-muted)] lg:pb-6">
              Alex Dupont — développeur full stack basé à Paris. Six ans à
              façonner des interfaces qui respectent le temps de ceux qui les
              utilisent.
            </p>
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-4">
            <Link href="/projects" className="btn-primary">
              ✦ Voir les projets
            </Link>
            <Link href="/contact" className="btn-ghost">
              → Discutons
            </Link>
            <a
              href="/cv-alex-dupont.pdf"
              className="font-mono text-xs uppercase tracking-widest text-[color:var(--ink-muted)] hover:text-[color:var(--ink)]"
            >
              ↓ CV (PDF)
            </a>
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-2 gap-8 border-t border-[color:var(--line)] pt-10 sm:grid-cols-4">
            {[
              { k: "06", v: "années d'exp." },
              { k: "40+", v: "projets livrés" },
              { k: "14", v: "clients heureux" },
              { k: "∞", v: "cafés bus" },
            ].map((s) => (
              <div key={s.v}>
                <p className="display text-4xl text-[color:var(--ink)] sm:text-5xl">
                  {s.k}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[color:var(--ink-muted)]">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee />

      {/* INTRO */}
      <section className="container-page py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <p className="eyebrow">— 01. Intro</p>
          </div>
          <div className="max-w-3xl">
            <p className="display text-3xl leading-tight text-[color:var(--ink)] sm:text-4xl lg:text-5xl text-pretty">
              Je travaille avec des équipes produit pour transformer des idées
              floues en interfaces{" "}
              <span className="italic-serif text-[color:var(--ember)]">
                précises, rapides, accessibles
              </span>
              . Du premier prototype jusqu'aux versions qui tiennent sous
              charge.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "Design systems",
                "Architecture full-stack",
                "Performance",
                "Accessibilité",
                "Observabilité",
              ].map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="container-page">
        <div className="flex items-end justify-between gap-4 border-b border-[color:var(--line-strong)] pb-6">
          <div>
            <p className="eyebrow">— 02. Sélection</p>
            <h2 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">
              Projets{" "}
              <span className="italic-serif text-[color:var(--ember)]">
                récents
              </span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden font-mono text-xs uppercase tracking-widest hover:text-[color:var(--ember)] sm:inline-flex"
          >
            → Tous
          </Link>
        </div>
        <div>
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-page py-24 sm:py-32">
        <p className="eyebrow mb-6">— 03. Paroles</p>
        <h2 className="display mb-16 text-4xl text-balance sm:text-5xl lg:text-6xl">
          Ce qu'en disent{" "}
          <span className="italic-serif text-[color:var(--ember)]">
            celles & ceux
          </span>{" "}
          avec qui j'ai travaillé.
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className="flex flex-col justify-between gap-6 border-t border-[color:var(--line-strong)] pt-6"
            >
              <blockquote className="display text-xl leading-snug text-[color:var(--ink)] text-pretty">
                <span className="text-[color:var(--ember)]">“</span>
                {t.quote}
                <span className="text-[color:var(--ember)]">”</span>
              </blockquote>
              <figcaption>
                <p className="font-mono text-xs uppercase tracking-widest text-[color:var(--ink)]">
                  {t.author}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[color:var(--ink-muted)]">
                  {t.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* NOTES */}
      <section className="container-page py-24 sm:py-32">
        <div className="flex items-end justify-between gap-4 border-b border-[color:var(--line-strong)] pb-6">
          <div>
            <p className="eyebrow">— 04. Écrits</p>
            <h2 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl">
              Notes &{" "}
              <span className="italic-serif text-[color:var(--ember)]">
                essais
              </span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden font-mono text-xs uppercase tracking-widest hover:text-[color:var(--ember)] sm:inline-flex"
          >
            → Tous
          </Link>
        </div>
        <ul className="divide-y divide-[color:var(--line)]">
          {latestPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 py-8 sm:grid sm:grid-cols-[100px_1fr_auto] sm:items-baseline sm:gap-8"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-[color:var(--ink-muted)]">
                  {new Date(post.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "short",
                  })}
                </span>
                <h3 className="display text-2xl text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--ember)] sm:text-3xl">
                  {post.title}
                </h3>
                <span className="chip sm:ml-auto">{post.tag}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
