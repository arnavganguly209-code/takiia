import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-lg px-5 py-24 text-center">
      <p className="text-xs uppercase tracking-[0.28em] text-brass-400">404</p>
      <h1 className="mt-4 font-display text-5xl">That route is not part of Takiia.</h1>
      <Link href="/" className="mt-6 inline-block text-copper-400">
        Back to the homepage
      </Link>
    </section>
  );
}
