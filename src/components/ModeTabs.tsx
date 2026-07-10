"use client";

import type { Mode } from "@/lib/modes";
import type { Strings } from "@/lib/i18n";
import { ReformulerIcon } from "@/components/ReformulerIcon";

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
    <div className="grid grid-cols-2 gap-2">
      {tabs.map((tab) => {
        const active = tab.id === mode;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-pressed={active}
            title={tab.id === "reformulate" ? tab.title : undefined}
            aria-label={tab.id === "reformulate" ? tab.title : undefined}
            className="press rounded-[var(--radius-card)] border px-4 py-3 text-left transition-colors"
            style={{
              borderColor: active ? "var(--accent-line)" : "var(--border)",
              background: active ? "var(--accent-soft)" : "var(--bg-surface)",
              boxShadow: active
                ? "var(--glow-accent-sm)"
                : "var(--shadow-sm), var(--edge-highlight)",
            }}
          >
            <div className="flex items-center justify-between gap-2">
              {tab.id === "reformulate" ? (
                <ReformulerIcon size={20} strokeWidth={2} color={active ? "var(--accent)" : "var(--text-strong)"} />
              ) : (
                <span
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "var(--fw-bold)",
                    color: active ? "var(--accent)" : "var(--text-strong)",
                  }}
                >
                  {tab.title}
                </span>
              )}
              {active && (
                <span className="text-xs" style={{ color: "var(--accent)" }}>
                  ✔️
                </span>
              )}
            </div>
            <div className="mt-0.5 text-xs" style={{ color: "var(--text-secondary)" }}>
              {tab.desc}
            </div>
          </button>
        );
      })}
    </div>
  );
}
