"use client";

import { TONES, type ToneId } from "@/lib/tones";
import type { Lang } from "@/lib/i18n";

interface ToneSelectorProps {
  values: ToneId[];
  onChange: (tones: ToneId[]) => void;
  lang: Lang;
}

export function ToneSelector({ values, onChange, lang }: ToneSelectorProps) {
  const toggle = (id: ToneId) => {
    const active = values.includes(id);
    if (active) {
      if (values.length === 1) return; // toujours garder au moins une tonalité
      onChange(values.filter((v) => v !== id));
    } else {
      onChange([...values, id]);
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5" role="group">
      {TONES.map((tone) => {
        const active = values.includes(tone.id);
        return (
          <button
            key={tone.id}
            type="button"
            role="checkbox"
            aria-checked={active}
            title={tone.description[lang]}
            onClick={() => toggle(tone.id)}
            className="press inline-flex shrink-0 items-center gap-1 rounded-[var(--radius-chip)] border px-3 py-0.5 text-[10px] whitespace-nowrap transition-colors"
            style={{
              fontWeight: active ? "var(--fw-bold)" : "var(--fw-regular)",
              borderColor: "var(--border-strong)",
              background: "var(--bg-chip-flat)",
              color: active ? "var(--accent)" : "var(--text-primary)",
            }}
          >
            {active && (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            )}
            {tone.label[lang]}
          </button>
        );
      })}
    </div>
  );
}
