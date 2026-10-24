import Link from "next/link";

export function SetupState({
  title,
  body,
  href = "/security"
}: {
  title: string;
  body: string;
  href?: string;
}) {
  return (
    <section className="rounded-[1.6rem] border border-line bg-white p-8 shadow-soft">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-500">Not configured</p>
      <h1 className="mt-3 text-3xl font-bold text-navy">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{body}</p>
      <Link href={href} className="btn-secondary mt-6">
        Read current limits
      </Link>
    </section>
  );
}
