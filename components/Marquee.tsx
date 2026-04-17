const words = [
  "TypeScript",
  "Next.js",
  "React",
  "Postgres",
  "Design systems",
  "Accessibilité",
  "Performance",
  "tRPC",
  "GraphQL",
  "Rust",
  "Observabilité",
  "Produit",
];

export default function Marquee() {
  const doubled = [...words, ...words];
  return (
    <div className="marquee overflow-hidden border-y border-[color:var(--line)] py-6">
      <div className="marquee-track gap-10 whitespace-nowrap">
        {doubled.map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-mono text-sm uppercase tracking-widest text-[color:var(--ink-muted)]"
          >
            <span className="text-[color:var(--ember)]">✦</span>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
