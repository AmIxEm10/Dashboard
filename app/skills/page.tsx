import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { skillGroups } from "@/lib/data";

export const metadata: Metadata = {
  title: "Compétences",
  description: "Stack technique et méthodologie d'Alex Dupont.",
};

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Boîte à outils"
        title="Outils, langages, obsessions."
        italicWord="obsessions"
        description="Une cartographie honnête : ce que je manie tous les jours, ce que je déploie ponctuellement, et les sujets qui me tiennent éveillé la nuit."
      />

      <section className="container-page pb-24">
        <div className="space-y-20">
          {skillGroups.map((group, idx) => (
            <div
              key={group.title}
              className="grid gap-10 border-t border-[color:var(--line-strong)] pt-10 lg:grid-cols-[1fr_2fr]"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[color:var(--ink-dim)]">
                  {String(idx + 1).padStart(2, "0")} / {String(skillGroups.length).padStart(2, "0")}
                </p>
                <h2 className="display mt-4 text-4xl sm:text-5xl">
                  {group.title}
                </h2>
                <p className="mt-4 max-w-sm text-[color:var(--ink-muted)]">
                  {group.summary}
                </p>
              </div>

              <ul className="space-y-5">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <div className="flex items-baseline justify-between gap-4">
                      <div>
                        <p className="display text-xl sm:text-2xl text-[color:var(--ink)]">
                          {item.name}
                        </p>
                        {item.note && (
                          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-[color:var(--ink-muted)]">
                            {item.note}
                          </p>
                        )}
                      </div>
                      <span className="font-mono text-xs uppercase tracking-widest text-[color:var(--ink-muted)]">
                        {item.level}%
                      </span>
                    </div>
                    <div className="mt-3 h-px w-full overflow-hidden bg-[color:var(--line)]">
                      <div
                        className="h-full bg-[color:var(--ember)] transition-[width] duration-1000"
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-24 grid gap-10 border-t border-[color:var(--line-strong)] pt-10 lg:grid-cols-[1fr_2fr]">
          <p className="eyebrow">— Ce que j'évite</p>
          <div className="display text-3xl leading-snug text-[color:var(--ink-muted)] text-pretty sm:text-4xl">
            Les architectures inutilement complexes. Les abstractions
            prématurées. Les technos choisies pour le CV plutôt que pour le
            problème. Les roadmaps où personne ne sait plus pourquoi on fait
            quoi.
          </div>
        </div>
      </section>
    </>
  );
}
