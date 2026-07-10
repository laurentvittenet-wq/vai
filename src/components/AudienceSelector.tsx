"use client";

import { AUDIENCES, type AudienceLevel } from "@/lib/audience";

interface AudienceSelectorProps {
  value: AudienceLevel;
  onChange: (level: AudienceLevel) => void;
}

export function AudienceSelector({ value, onChange }: AudienceSelectorProps) {
  return (
    <div className="no-scrollbar flex justify-center gap-1.5 overflow-x-auto pb-1" role="radiogroup">
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
            className="press inline-flex shrink-0 items-center rounded-[var(--radius-chip)] border px-3 py-0.5 text-[10px] whitespace-nowrap transition-colors"
            style={{
              fontWeight: "var(--fw-semibold)",
              borderColor: "var(--border-strong)",
              background: "var(--bg-surface-2)",
              color: active ? "var(--accent)" : "var(--text-primary)",
            }}
          >
            {audience.label}
          </button>
        );
      })}
    </div>
  );
}
