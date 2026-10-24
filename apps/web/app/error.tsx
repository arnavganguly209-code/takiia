"use client";

export default function ErrorState({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto max-w-lg px-5 py-24 text-center">
      <h1 className="font-display text-4xl">This page failed to render</h1>
      <p className="mt-4 text-parchment-100/70">{error.message}</p>
      <button type="button" onClick={reset} className="mt-6 rounded-full bg-copper-500 px-5 py-2">
        Try again
      </button>
    </section>
  );
}
