"use client";

interface ResetButtonProps {
  onClick: () => void;
  label: string;
}

export function ResetButton({ onClick, label }: ResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="press inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius-chip)] border"
      style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)", background: "var(--bg-surface-2)" }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    </button>
  );
}
