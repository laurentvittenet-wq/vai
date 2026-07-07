"use client";

import { TONES, type ToneId } from "@/lib/tones";
import type { Lang } from "@/lib/i18n";

interface ToneSelectorProps {
  value: ToneId;
  onChange: (tone: ToneId) => void;
  lang: Lang;
}

export function ToneSelector({ value, onChange, lang }: ToneSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup">
      {TONES.map((tone) => {
        const active = tone.id === value;
        return (
          <button
            key={tone.id}
            type="button"
            role="radio"
            aria-checked={active}
            title={tone.description[lang]}
            onClick={() => onChange(tone.id)}
            className="press inline-flex items-center gap-1 rounded-[var(--radius-chip)] border px-3 py-1.5 text-xs transition-colors"
            style={{
              fontWeight: "var(--fw-semibold)",
              borderColor: active ? "transparent" : "var(--border-strong)",
              background: active ? "var(--accent)" : "var(--bg-surface-2)",
              color: active ? "var(--on-accent)" : "var(--text-primary)",
              boxShadow: active ? "var(--glow-accent-sm)" : "none",
            }}
          >
            {active && <span>✔️</span>}
            {tone.label[lang]}
          </button>
        );
      })}
    </div>
  );
}
