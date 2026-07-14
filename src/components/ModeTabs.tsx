"use client";

import type { Mode } from "@/lib/modes";
import type { Strings } from "@/lib/i18n";

function WriteIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function ResponseIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 17 4 12l5-5" />
      <path d="M4 12h10a5 5 0 0 1 5 5v2" />
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

interface ModeTabsProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
  t: Strings;
}

export function ModeTabs({ mode, onChange, t }: ModeTabsProps) {
  const tabs: { id: Mode; title: string; Icon: typeof WriteIcon }[] = [
    { id: "reformulate", title: t.modeReformulateTitle, Icon: WriteIcon },
    { id: "reply", title: t.modeReplyTitle, Icon: ResponseIcon },
    { id: "correct", title: t.modeCorrectTitle, Icon: CheckIcon },
  ];

  return (
    <div className="grid grid-cols-3 gap-1.5">
      {tabs.map(({ id, title, Icon }) => {
        const active = id === mode;
        const color = active ? "var(--on-accent)" : "var(--text-strong)";

        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={active}
            className={`tab-pill flex items-center justify-center gap-1 rounded-full py-1 pl-1.5 pr-2 ${active ? "tab-pill-active" : ""}`}
            style={{
              background: active ? "var(--gradient-cta)" : "var(--bg-input-flat)",
            }}
          >
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
              style={{
                background: active ? "var(--on-accent)" : "var(--text-strong)",
              }}
            >
              <Icon color={active ? "var(--accent)" : "var(--bg-base)"} />
            </span>
            <span
              className={active ? "text-[10px]" : "text-[8px]"}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--fw-extrabold)",
                letterSpacing: "0.02em",
                color,
              }}
            >
              {title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
