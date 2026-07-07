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
  onDeleteItem: (id: string) => void;
  t: Strings;
  lang: Lang;
}

export function HistoryPanel({
  open,
  items,
  onClose,
  onClear,
  onSelect,
  onDeleteItem,
  t,
  lang,
}: HistoryPanelProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: "var(--bg-overlay)" }}
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-md flex-col p-6"
        style={{
          background: "var(--bg-surface)",
          boxShadow: "var(--shadow-lg)",
          borderLeft: "1px solid var(--border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2
            className="text-base"
            style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-bold)", color: "var(--text-strong)" }}
          >
            {t.historyTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="press rounded-[var(--radius-chip)] border px-3 py-1 text-xs"
            style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
          >
            {t.historyClose}
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            {t.historyEmpty}
          </p>
        ) : (
          <div className="flex-1 space-y-3 overflow-y-auto">
            {items.map((item) => {
              const tone = TONES.find((tn) => tn.id === item.tone);
              return (
                <div
                  key={item.id}
                  className="relative rounded-[var(--radius-md)] border"
                  style={{ borderColor: "var(--border)", background: "var(--bg-surface-2)" }}
                >
                  <button
                    type="button"
                    onClick={() => onSelect(item)}
                    className="press block w-full p-3 pr-9 text-left"
                  >
                    <div
                      className="mb-1 flex items-center gap-2 text-xs"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      <span
                        className="rounded-[var(--radius-chip)] px-2 py-0.5"
                        style={{ background: "var(--bg-surface-3)", color: "var(--text-secondary)" }}
                      >
                        {item.mode === "reformulate" ? t.modeReformulateTitle : t.modeReplyTitle}
                      </span>
                      {tone && (
                        <span
                          className="rounded-[var(--radius-chip)] px-2 py-0.5"
                          style={{ background: "var(--bg-surface-3)", color: "var(--text-secondary)" }}
                        >
                          {tone.label[lang]}
                        </span>
                      )}
                      <span>{new Date(item.createdAt).toLocaleString(lang === "fr" ? "fr-FR" : "en-US")}</span>
                    </div>
                    <p className="line-clamp-2 text-xs" style={{ color: "var(--text-primary)" }}>
                      {item.output}
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteItem(item.id);
                    }}
                    title={t.historyDeleteItem}
                    aria-label={t.historyDeleteItem}
                    className="press absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-[var(--radius-full)] text-xs"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {items.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="press mt-4 rounded-[var(--radius-md)] border px-4 py-1.5 text-xs"
            style={{
              fontWeight: "var(--fw-semibold)",
              borderColor: "var(--danger-soft)",
              color: "var(--danger)",
              background: "var(--danger-soft)",
            }}
          >
            {t.historyClear}
          </button>
        )}
      </div>
    </div>
  );
}
