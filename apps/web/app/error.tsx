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
      <h1 className="text-4xl font-semibold text-navy">This page failed to render</h1>
      <p className="mt-4 text-muted">{error.message}</p>
      <button type="button" onClick={reset} className="btn-primary mt-6">
        Try again
      </button>
    </section>
  );
}
