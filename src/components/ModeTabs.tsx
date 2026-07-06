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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {tabs.map((tab) => {
        const active = tab.id === mode;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            aria-pressed={active}
            className={`rounded-2xl border-2 px-6 py-5 text-left transition-colors ${
              active
                ? "border-teal-500 bg-teal-100 dark:border-teal-400 dark:bg-teal-900/40"
                : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            }`}
          >
            <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {tab.title}
            </div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{tab.desc}</div>
          </button>
        );
      })}
    </div>
  );
}
