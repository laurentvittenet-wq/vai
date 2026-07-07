"use client";

interface PanicButtonProps {
  onClick: () => void;
}

export function PanicButton({ onClick }: PanicButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Sauver les meubles : génère un message de temporisation instantané"
      aria-label="Sauver les meubles"
      className="press inline-flex h-7 shrink-0 items-center gap-1 whitespace-nowrap rounded-[var(--radius-chip)] border px-2 text-[10px]"
      style={{
        borderColor: "var(--danger-soft)",
        background: "var(--danger-soft)",
        color: "var(--danger)",
        fontWeight: "var(--fw-semibold)",
      }}
    >
      🆘 Sauver les meubles
    </button>
  );
}
