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
    <div className="grid grid-cols-2 gap-2" style={{ perspective: "700px" }}>
      {tabs.map((tab) => {
        const active = tab.id === mode;
        const color = active ? "var(--accent)" : "var(--text-strong)";
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-pressed={active}
            className="press glass-3d flex items-center justify-center gap-2 rounded-[var(--radius-card)] border px-4 py-4"
            style={{
              borderColor: active ? "rgba(0, 230, 118, 0.4)" : "rgba(255, 255, 255, 0.16)",
              background: active
                ? "linear-gradient(135deg, color-mix(in oklch, var(--accent) 32%, transparent) 0%, color-mix(in oklch, var(--accent) 6%, transparent) 100%)"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.02) 100%)",
              boxShadow: active
                ? "0 10px 24px color-mix(in oklch, var(--accent) 30%, transparent), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -8px 14px rgba(0,0,0,0.25)"
                : "0 8px 18px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -8px 14px rgba(0,0,0,0.2)",
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
