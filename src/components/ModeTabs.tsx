"use client";

import type { Mode } from "@/lib/modes";
import type { Strings } from "@/lib/i18n";

interface ModeTabsProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
  t: Strings;
}

export function ModeTabs({ mode, onChange, t }: ModeTabsProps) {
  const tabs: { id: Mode; title: string }[] = [
    { id: "reformulate", title: t.modeReformulateTitle },
    { id: "reply", title: t.modeReplyTitle },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {tabs.map((tab) => {
        const active = tab.id === mode;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-pressed={active}
            className="press flex items-center justify-center rounded-[var(--radius-card)] border px-4 py-4 transition-colors"
            style={{
              borderColor: active ? "var(--accent-line)" : "var(--border)",
              background: active ? "var(--accent-soft)" : "var(--bg-surface)",
              boxShadow: active
                ? "var(--glow-accent-sm)"
                : "var(--shadow-sm), var(--edge-highlight)",
            }}
          >
            <span
              className="text-sm"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--fw-extrabold)",
                letterSpacing: "0.04em",
                color: active ? "var(--accent)" : "var(--text-strong)",
              }}
            >
              {tab.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
