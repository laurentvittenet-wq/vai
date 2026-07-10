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
    <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1" role="group">
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
              fontWeight: "var(--fw-semibold)",
              borderColor: "var(--border-strong)",
              background: "var(--bg-surface-2)",
              color: active ? "var(--accent)" : "var(--text-primary)",
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
