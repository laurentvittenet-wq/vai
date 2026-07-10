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
        const isWrite = tab.id === "reformulate";
        const color = active ? "var(--on-accent)" : "var(--text-strong)";

        const label = (
          <span
            className={active ? "text-[11px]" : "text-[9px]"}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--fw-extrabold)",
              letterSpacing: "0.04em",
              color,
            }}
          >
            {tab.title}
          </span>
        );
        const iconCircle = (
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
            style={{
              background: active ? "var(--on-accent)" : "var(--text-strong)",
            }}
          >
            {isWrite ? (
              <WriteIcon color={active ? "var(--accent)" : "var(--bg-base)"} />
            ) : (
              <ResponseIcon color={active ? "var(--accent)" : "var(--bg-base)"} />
            )}
          </span>
        );

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-pressed={active}
            className={`neo-brutal flex items-center justify-between gap-2 rounded-full py-1 ${isWrite ? "pl-1.5 pr-5" : "pl-5 pr-1.5"} ${active ? "neo-brutal-active" : ""}`}
            style={{
              background: active ? "var(--gradient-cta)" : "var(--bg-surface-3)",
            }}
          >
            {isWrite ? (
              <>
                {iconCircle}
                {label}
              </>
            ) : (
              <>
                {label}
                {iconCircle}
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
