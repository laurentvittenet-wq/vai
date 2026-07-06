"use client";

import type { HistoryItem } from "@/lib/history";
import type { Strings, Lang } from "@/lib/i18n";
import { TONES } from "@/lib/tones";

interface HistoryPanelProps {
  open: boolean;
  items: HistoryItem[];
  onClose: () => void;
  onClear: () => void;
  onSelect: (item: HistoryItem) => void;
  t: Strings;
  lang: Lang;
}

export function HistoryPanel({ open, items, onClose, onClear, onSelect, t, lang }: HistoryPanelProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={onClose}>
      <div
        className="flex h-full w-full max-w-md flex-col bg-white p-6 shadow-xl dark:bg-zinc-950"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{t.historyTitle}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-400"
          >
            {t.historyClose}
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.historyEmpty}</p>
        ) : (
          <div className="flex-1 space-y-3 overflow-y-auto">
            {items.map((item) => {
              const tone = TONES.find((tn) => tn.id === item.tone);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item)}
                  className="block w-full rounded-xl border border-zinc-200 p-3 text-left hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
                >
                  <div className="mb-1 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800">
                      {item.mode === "reformulate" ? t.modeReformulateTitle : t.modeReplyTitle}
                    </span>
                    {tone && (
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800">
                        {tone.label[lang]}
                      </span>
                    )}
                    <span>{new Date(item.createdAt).toLocaleString(lang === "fr" ? "fr-FR" : "en-US")}</span>
                  </div>
                  <p className="line-clamp-2 text-sm text-zinc-800 dark:text-zinc-200">{item.output}</p>
                </button>
              );
            })}
          </div>
        )}

        {items.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="mt-4 rounded-xl border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            {t.historyClear}
          </button>
        )}
      </div>
    </div>
  );
}
