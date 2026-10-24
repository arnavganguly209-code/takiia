import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-lg px-5 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">404</p>
      <h1 className="mt-4 text-5xl font-semibold text-navy">That route is not part of Takiia.</h1>
      <Link href="/" className="btn-primary mt-6">
        Back to the homepage
      </Link>
    </section>
  );
}
