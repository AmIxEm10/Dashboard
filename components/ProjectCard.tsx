import Link from "next/link";
import type { Project } from "@/lib/data";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const accent = project.accent ?? "var(--ember)";
  return (
    <article
      className="group relative flex flex-col overflow-hidden border-t border-[color:var(--line)] py-10 transition-colors"
      style={{ "--accent": accent } as React.CSSProperties}
    >
      <div className="flex items-baseline justify-between gap-6 pb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-[color:var(--ink-dim)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-[color:var(--ink-dim)]">
          {project.year} · {project.role}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start">
        <div>
          <h3 className="display text-4xl sm:text-5xl lg:text-6xl text-[color:var(--ink)] transition-colors group-hover:text-[var(--accent)]">
            {project.title}
          </h3>
        </div>

        <div className="flex flex-col gap-6">
          <p className="max-w-2xl text-lg leading-relaxed text-[color:var(--ink-muted)] text-pretty">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            {project.url && (
              <Link
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs uppercase tracking-widest text-[color:var(--ink)] hover:text-[var(--accent)]"
              >
                → Voir en ligne
              </Link>
            )}
            {project.repo && (
              <Link
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs uppercase tracking-widest text-[color:var(--ink)] hover:text-[var(--accent)]"
              >
                → Code source
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
