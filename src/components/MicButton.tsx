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
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        isListening
          ? "border-red-400 bg-red-50 text-red-600 dark:border-red-500 dark:bg-red-950/40 dark:text-red-400"
          : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600"
      }`}
    >
      <span
        className={`inline-block h-2 w-2 rounded-full ${
          isListening ? "animate-pulse bg-red-500" : "bg-zinc-400 dark:bg-zinc-600"
        }`}
      />
      {isListening ? stopLabel : startLabel}
    </button>
  );
}
