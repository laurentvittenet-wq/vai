"use client";

import { AUDIENCES, type AudienceLevel } from "@/lib/audience";

interface AudienceSelectorProps {
  value: AudienceLevel | null;
  onChange: (level: AudienceLevel) => void;
}

export function AudienceSelector({ value, onChange }: AudienceSelectorProps) {
  return (
    <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1" role="radiogroup">
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
            {audience.label}
          </button>
        );
      })}
    </div>
  );
}
