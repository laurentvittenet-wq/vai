"use client";

import type { Mode } from "@/lib/modes";
import type { Strings } from "@/lib/i18n";

interface ModeTabsProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
  t: Strings;
}

function WriteIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function ResponseIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 17 4 12l5-5" />
      <path d="M4 12h10a5 5 0 0 1 5 5v2" />
    </svg>
  );
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
        const color = active ? "var(--accent)" : "var(--text-strong)";
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-pressed={active}
            className="press flex items-center justify-center gap-2 rounded-[var(--radius-card)] border px-4 py-4 transition-colors"
            style={{
              borderColor: active ? "var(--accent-line)" : "var(--border)",
              background: active ? "var(--accent-soft)" : "var(--bg-surface)",
              boxShadow: active
                ? "var(--glow-accent-sm)"
                : "var(--shadow-sm), var(--edge-highlight)",
            }}
          >
            {tab.id === "reformulate" ? <WriteIcon color={color} /> : <ResponseIcon color={color} />}
            <span
              className="text-sm"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--fw-extrabold)",
                letterSpacing: "0.04em",
                color,
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
