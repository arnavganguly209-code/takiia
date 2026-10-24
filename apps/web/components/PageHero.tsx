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
    <section className="mx-auto max-w-4xl px-5 pb-10 pt-16">
      <p className="text-xs uppercase tracking-[0.28em] text-brass-400">{eyebrow}</p>
      <h1 className="mt-4 font-display text-4xl leading-tight text-parchment-50 sm:text-6xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-parchment-100/75">{lede}</p>
    </section>
  );
}
