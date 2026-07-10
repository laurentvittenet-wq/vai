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
  const label = isSupported ? (isListening ? stopLabel : startLabel) : unsupportedLabel;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isSupported}
      title={label}
      aria-label={label}
      aria-pressed={isListening}
      className="press relative inline-flex h-6 w-6 items-center justify-center rounded-[var(--radius-chip)] border transition-colors disabled:cursor-not-allowed disabled:opacity-40"
      style={{
        borderColor: isListening ? "transparent" : "var(--border-strong)",
        background: isListening ? "var(--pop-soft)" : "var(--bg-surface-2)",
        color: isListening ? "var(--pop)" : "var(--text-secondary)",
      }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <path d="M12 19v3" />
      </svg>
      {isListening && (
        <span
          aria-hidden="true"
          className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--live)", animation: "podium-pulse 1.2s ease-in-out infinite" }}
        />
      )}
    </button>
  );
}
