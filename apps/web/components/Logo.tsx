import Image from "next/image";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-navy">
      <Image
        src="/brand/takiia-logo.png"
        alt=""
        width={160}
        height={48}
        className={compact ? "h-8 w-auto" : "h-10 w-auto"}
        priority
      />
      {compact ? <span className="sr-only">Takiia</span> : null}
    </span>
  );
}
