import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projets",
  description: "Sélection de projets réalisés entre 2022 et 2025.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projets · 2022 — 2025"
        title="Un archipel de produits, pensés pour durer."
        italicWord="produits"
        description="Sélection de travaux personnels et missions client. Chaque projet est documenté par un cas d'étude détaillé — contexte, contraintes, décisions, ce qui a marché, ce qui n'a pas."
      />
      <section className="container-page pb-24">
        <div className="border-b border-[color:var(--line-strong)] pb-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[color:var(--ink-muted)]">
            {projects.length} projets · classés du plus récent au plus ancien
          </p>
        </div>
        <div>
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
