"use client";

interface MicButtonProps {
  isListening: boolean;
  isSupported: boolean;
  onClick: () => void;
  startLabel: string;
  stopLabel: string;
  unsupportedLabel: string;
}

export function MicButton({
  isListening,
  isSupported,
  onClick,
  startLabel,
  stopLabel,
  unsupportedLabel,
}: MicButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isSupported}
      title={isSupported ? (isListening ? stopLabel : startLabel) : unsupportedLabel}
      aria-pressed={isListening}
      className="press inline-flex items-center gap-1.5 rounded-[var(--radius-chip)] border px-2.5 py-1 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40"
      style={{
        fontWeight: "var(--fw-semibold)",
        borderColor: isListening ? "transparent" : "var(--border-strong)",
        background: isListening ? "var(--pop-soft)" : "var(--bg-surface-2)",
        color: isListening ? "var(--pop)" : "var(--text-primary)",
      }}
    >
      <span
        className="inline-block h-2 w-2 rounded-full"
        style={{
          background: isListening ? "var(--live)" : "var(--text-tertiary)",
          animation: isListening ? "podium-pulse 1.2s ease-in-out infinite" : "none",
        }}
      />
      {isListening ? stopLabel : startLabel}
    </button>
  );
}
