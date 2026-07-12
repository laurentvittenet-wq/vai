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
      className="press inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-chip)] border"
      style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)", background: "var(--bg-surface-2)" }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 21-4.3-4.3a1 1 0 0 1 0-1.4l9.6-9.6a1 1 0 0 1 1.4 0l5.6 5.6a1 1 0 0 1 0 1.4L13 21" />
        <path d="M22 21H7" />
        <path d="m5 11 9 9" />
      </svg>
    </button>
  );
}
