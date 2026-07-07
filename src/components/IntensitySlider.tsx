"use client";

import { INTENSITIES, intensityIndex, type IntensityLevel } from "@/lib/intensity";
import type { Lang } from "@/lib/i18n";

interface IntensitySliderProps {
  value: IntensityLevel;
  onChange: (level: IntensityLevel) => void;
  lang: Lang;
  label: string;
}

export function IntensitySlider({ value, onChange, lang, label }: IntensitySliderProps) {
  const index = intensityIndex(value);
  const pct = (index / (INTENSITIES.length - 1)) * 100;

  return (
    <div>
      <input
        type="range"
        min={0}
        max={INTENSITIES.length - 1}
        step={1}
        value={index}
        onChange={(e) => onChange(INTENSITIES[Number(e.target.value)].id)}
        className="gauge-range"
        style={{
          background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${pct}%, var(--bg-surface-3) ${pct}%, var(--bg-surface-3) 100%)`,
        }}
        aria-label={label}
      />
      <div className="mt-1 flex justify-between text-[10px]" style={{ color: "var(--text-tertiary)" }}>
        {INTENSITIES.map((intensity) => (
          <span
            key={intensity.id}
            style={{
              color: intensity.id === value ? "var(--accent)" : "var(--text-tertiary)",
              fontWeight: intensity.id === value ? "var(--fw-semibold)" : "var(--fw-regular)",
            }}
          >
            {intensity.label[lang]}
          </span>
        ))}
      </div>
    </div>
  );
}
