export function FeatureCards({
  items
}: {
  items: Array<{ title: string; body: string; tile: string; ink: string; d: string }>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <article key={item.title} className="rounded-[1.4rem] border border-line bg-white p-5 shadow-soft">
          <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.tile} ${item.ink}`}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d={item.d} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h3 className="mt-4 text-base font-bold text-navy">{item.title}</h3>
          <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
        </article>
      ))}
    </div>
  );
}
