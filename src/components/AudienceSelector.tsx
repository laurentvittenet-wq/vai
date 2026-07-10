"use client";

import { AUDIENCES, type AudienceLevel } from "@/lib/audience";

interface AudienceSelectorProps {
  value: AudienceLevel;
  onChange: (level: AudienceLevel) => void;
}

export function AudienceSelector({ value, onChange }: AudienceSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup">
      {AUDIENCES.map((audience) => {
        const active = audience.id === value;
        return (
          <button
            key={audience.id}
            type="button"
            role="radio"
            aria-checked={active}
            title={audience.description}
            onClick={() => onChange(audience.id)}
            className="press rounded-[var(--radius-chip)] border px-3 py-0.5 text-[10px] transition-colors"
            style={{
              fontWeight: "var(--fw-semibold)",
              borderColor: active ? "transparent" : "var(--border-strong)",
              background: active ? "var(--accent)" : "var(--bg-surface-2)",
              color: active ? "var(--on-accent)" : "var(--text-primary)",
              boxShadow: active ? "var(--glow-accent-sm)" : "none",
            }}
          >
            {audience.label}
          </button>
        );
      })}
    </div>
  );
}
