export function PageHero({
  eyebrow,
  title,
  lede
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <section className="bg-hero">
      <div className="mx-auto max-w-4xl px-5 pb-10 pt-12 sm:pt-16">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-500">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-navy sm:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{lede}</p>
      </div>
    </section>
  );
}
