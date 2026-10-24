export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3 text-parchment-50">
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
        <rect x="1" y="1" width="32" height="32" rx="9" fill="#1b2720" stroke="#d4a04a" strokeWidth="1.4" />
        <path d="M9 11.5h16M17 11.5v12.2" stroke="#f7f1e4" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="24.2" cy="22.6" r="2.3" fill="#c46a2b" />
      </svg>
      {compact ? null : <span className="font-display text-2xl tracking-tight">Takiia</span>}
    </span>
  );
}
