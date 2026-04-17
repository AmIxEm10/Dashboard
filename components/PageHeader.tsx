export default function PageHeader({
  eyebrow,
  title,
  italicWord,
  description,
}: {
  eyebrow?: string;
  title: string;
  italicWord?: string;
  description?: string;
}) {
  const parts = italicWord ? title.split(italicWord) : null;

  return (
    <header className="container-page relative pt-24 pb-16 sm:pt-32">
      <div className="radial-ember pointer-events-none absolute inset-x-0 top-0 h-[400px]" aria-hidden />
      <div className="relative">
        {eyebrow && <p className="eyebrow mb-6">— {eyebrow}</p>}
        <h1 className="display text-5xl text-balance text-[color:var(--ink)] sm:text-6xl lg:text-7xl">
          {parts ? (
            <>
              {parts[0]}
              <span className="italic-serif text-[color:var(--ember)]">
                {italicWord}
              </span>
              {parts[1]}
            </>
          ) : (
            title
          )}
        </h1>
        {description && (
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[color:var(--ink-muted)] text-pretty">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
