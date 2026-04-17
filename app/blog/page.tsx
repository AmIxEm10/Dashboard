import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { posts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Essais et retours d'expérience sur l'architecture front, les design systems et la vie en équipe produit.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Notes & essais"
        title="Des idées qui ont pris le temps de mûrir."
        italicWord="mûrir"
        description="Un carnet public, mis à jour quand j'ai vraiment quelque chose à dire. Zéro quota hebdo, zéro SEO fluff."
      />

      <section className="container-page pb-24">
        <div className="flex items-baseline justify-between border-b border-[color:var(--line-strong)] pb-4 font-mono text-[10px] uppercase tracking-widest text-[color:var(--ink-muted)]">
          <span>{posts.length} articles</span>
          <span>classés du plus récent</span>
        </div>
        <ul>
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-4 border-b border-[color:var(--line)] py-10 sm:grid-cols-[60px_1fr_200px] sm:items-baseline sm:gap-10"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-[color:var(--ink-dim)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="display text-3xl text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--ember)] sm:text-4xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-[color:var(--ink-muted)] text-pretty">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-widest text-[color:var(--ink-muted)]">
                    <span>
                      {new Date(post.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                    <span>·</span>
                    <span className="text-[color:var(--ember)]">{post.tag}</span>
                  </div>
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-[color:var(--ink)] transition-colors group-hover:text-[color:var(--ember)] sm:text-right">
                  → Lire
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
