"use client";

import type { Mode } from "@/lib/modes";
import type { Strings } from "@/lib/i18n";

interface ModeTabsProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
  t: Strings;
}

export function ModeTabs({ mode, onChange, t }: ModeTabsProps) {
  const tabs: { id: Mode; title: string; desc: string }[] = [
    { id: "reformulate", title: t.modeReformulateTitle, desc: t.modeReformulateDesc },
    { id: "reply", title: t.modeReplyTitle, desc: t.modeReplyDesc },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {tabs.map((tab) => {
        const active = tab.id === mode;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-pressed={active}
            className="press rounded-[var(--radius-card)] border px-6 py-5 text-left transition-colors"
            style={{
              borderColor: active ? "var(--accent-line)" : "var(--border)",
              background: active ? "var(--accent-soft)" : "var(--bg-surface)",
              boxShadow: active
                ? "var(--glow-accent-sm)"
                : "var(--shadow-sm), var(--edge-highlight)",
            }}
          >
            <div
              className="text-lg"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--fw-bold)",
                color: active ? "var(--accent)" : "var(--text-strong)",
              }}
            >
              {tab.title}
            </div>
            <div className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
              {tab.desc}
            </div>
          </button>
        );
      })}
    </div>
  );
}
