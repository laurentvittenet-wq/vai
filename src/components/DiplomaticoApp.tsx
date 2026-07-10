"use client";

import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { ModeTabs } from "@/components/ModeTabs";
import { ToneSelector } from "@/components/ToneSelector";
import { IntensitySlider } from "@/components/IntensitySlider";
import { AudienceSelector } from "@/components/AudienceSelector";
import { MicButton } from "@/components/MicButton";
import { ResetButton } from "@/components/ResetButton";
import { TriggerWordList } from "@/components/TriggerWordList";
import { HistoryPanel } from "@/components/HistoryPanel";
import { STRINGS, type Lang } from "@/lib/i18n";
import type { Mode } from "@/lib/modes";
import { getTone, type ToneId } from "@/lib/tones";
import { DEFAULT_INTENSITY, type IntensityLevel } from "@/lib/intensity";
import { DEFAULT_AUDIENCE, type AudienceLevel } from "@/lib/audience";
import { useSpeechRecognition } from "@/lib/useSpeechRecognition";
import { sharePeaceWallItem } from "@/lib/peaceWall";
import {
  fetchHistory,
  clearHistoryRemote,
  deleteHistoryItemRemote,
  type HistoryItem,
} from "@/lib/history";

const MAX_TEXT_LENGTH = 4000;

// Masqué pour l'instant — remettre à true pour réafficher le bouton
// d'historique dans le header (la fonctionnalité reste intacte).
const SHOW_HISTORY_BUTTON = false;

interface ToneResult {
  toneId: ToneId;
  output: string;
  error?: string;
  copied: boolean;
  sharing: boolean;
  shared: boolean;
}

export function DiplomaticoApp() {
  const lang: Lang = "fr";
  const [mode, setMode] = useState<Mode>("reformulate");
  const [tones, setTones] = useState<ToneId[]>(["serieux"]);
  const [intensity, setIntensity] = useState<IntensityLevel>(DEFAULT_INTENSITY);
  const [audience, setAudience] = useState<AudienceLevel>(DEFAULT_AUDIENCE);
  const [inputText, setInputText] = useState("");
  const [results, setResults] = useState<ToneResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const t = STRINGS[lang];
  const speech = useSpeechRecognition("fr-FR");
  const showOutput = inputText.trim().length > 0 && (loading || results.length > 0);

  useEffect(() => {
    let cancelled = false;
    fetchHistory().then((items) => {
      if (!cancelled) setHistory(items);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleMicClick = () => {
    if (speech.isListening) {
      speech.stop();
      return;
    }
    speech.start((transcript) => {
      setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript).slice(0, MAX_TEXT_LENGTH));
    });
  };

  const handleSubmit = async () => {
    setError(null);
    if (!inputText.trim()) {
      setError(t.errorEmptyText);
      return;
    }

    setLoading(true);
    setResults(
      tones.map((toneId) => ({ toneId, output: "", copied: false, sharing: false, shared: false }))
    );
    try {
      const settled = await Promise.all(
        tones.map(async (toneId) => {
          try {
            const res = await fetch("/api/civilize", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ mode, tone: toneId, intensity, audience, text: inputText }),
            });
            const data = await res.json();
            if (!res.ok) {
              return { toneId, output: "", error: data.error || t.errorGeneric };
            }
            if (data.historyItem) {
              setHistory((prev) => [data.historyItem, ...prev]);
            }
            return { toneId, output: data.result as string };
          } catch {
            return { toneId, output: "", error: t.errorGeneric };
          }
        })
      );
      setResults(
        settled.map((r) => ({
          toneId: r.toneId,
          output: r.output,
          error: r.error,
          copied: false,
          sharing: false,
          shared: false,
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (toneId: ToneId) => {
    const item = results.find((r) => r.toneId === toneId);
    if (!inputText.trim() || !item?.output.trim() || item.sharing) return;
    setResults((prev) => prev.map((r) => (r.toneId === toneId ? { ...r, sharing: true } : r)));
    const ok = await sharePeaceWallItem({
      scudText: inputText,
      diplomaticText: item.output,
      toneCategory: toneId,
      intensityLevel: intensity,
    });
    setResults((prev) =>
      prev.map((r) => (r.toneId === toneId ? { ...r, sharing: false, shared: ok } : r))
    );
  };

  const handleCopy = async (toneId: ToneId) => {
    const item = results.find((r) => r.toneId === toneId);
    if (!item?.output) return;
    await navigator.clipboard.writeText(item.output);
    setResults((prev) => prev.map((r) => (r.toneId === toneId ? { ...r, copied: true } : r)));
    setTimeout(() => {
      setResults((prev) => prev.map((r) => (r.toneId === toneId ? { ...r, copied: false } : r)));
    }, 1500);
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setMode(item.mode);
    setTones([item.tone]);
    setIntensity(item.intensity || DEFAULT_INTENSITY);
    setInputText(item.input);
    setResults([{ toneId: item.tone, output: item.output, copied: false, sharing: false, shared: false }]);
    setHistoryOpen(false);
  };

  const handleClearHistory = async () => {
    setHistory([]);
    await clearHistoryRemote();
  };

  const handleDeleteHistoryItem = async (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    await deleteHistoryItemRemote(id);
  };

  const handleReset = () => {
    setInputText("");
    setResults([]);
    setError(null);
  };

  const historyButton = SHOW_HISTORY_BUTTON ? (
    <button
      type="button"
      onClick={() => setHistoryOpen(true)}
      title={t.historyBtn}
      aria-label={t.historyBtn}
      className="press inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius-chip)] border"
      style={{ borderColor: "var(--border-strong)", color: "var(--text-primary)" }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v5h5" />
        <path d="M3.05 13a9 9 0 1 0 2.13-6.36L3 8" />
        <path d="M12 7v5l4 2" />
      </svg>
    </button>
  ) : null;

  return (
    <div className="min-h-full" style={{ background: "var(--bg-base)" }}>
      <AppHeader active="home" extraActions={historyButton} />

      <main className="mx-auto max-w-5xl px-5 py-6">
        <section className="mb-6">
          <h1
            className="max-w-2xl text-xl sm:text-2xl"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--fw-extrabold)",
              lineHeight: "var(--lh-tight)",
              letterSpacing: "-0.02em",
              color: "var(--text-strong)",
            }}
          >
            Balance tes scuds,
            <br />
            je fournis les silencieux
            <span style={{ position: "relative", display: "inline-block", width: "0.5em" }}>
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: 4,
                  left: 6,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  boxShadow: "var(--glow-accent-sm)",
                }}
              />
            </span>
          </h1>
        </section>

        <section className="mb-5">
          <ModeTabs mode={mode} onChange={setMode} t={t} />
        </section>

        <section className="surface-card mb-5 rounded-[var(--radius-card)] p-4">
          <span
            className="mb-1.5 block text-[10px] uppercase"
            style={{ fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-caps)", color: "var(--text-strong)" }}
          >
            Choisis le destinataire
          </span>
          <AudienceSelector value={audience} onChange={setAudience} />
          <div className="mt-3">
            <h2
              className="mb-2 text-[10px] uppercase"
              style={{ fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-caps)", color: "var(--text-strong)" }}
            >
              {t.chooseTone}
            </h2>
            <ToneSelector values={tones} onChange={setTones} lang={lang} />
          </div>
          <div className="mt-3">
            <IntensitySlider value={intensity} onChange={setIntensity} lang={lang} label={t.chooseIntensity} />
          </div>
        </section>

        <section className={`grid grid-cols-1 gap-4 ${showOutput ? "lg:grid-cols-2" : ""}`}>
          <div className="surface-card rounded-[var(--radius-card)] p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3
                className="text-[10px] uppercase"
                style={{ fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-caps)", color: "var(--text-strong)" }}
              >
                {mode === "reformulate" ? t.inputLabelReformulate : t.inputLabelReply}
              </h3>
              <span className="text-[10px]" style={{ color: "var(--text-tertiary)" }}>
                {inputText.length} / {MAX_TEXT_LENGTH} {t.charCount}
              </span>
            </div>
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value.slice(0, MAX_TEXT_LENGTH))}
                placeholder={
                  mode === "reformulate" ? t.inputPlaceholderReformulate : t.inputPlaceholderReply
                }
                className="h-[150px] w-full resize-none overflow-y-auto rounded-[var(--radius-input)] border p-2.5 pr-16 text-xs outline-none"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-surface-3)",
                  color: "var(--text-primary)",
                }}
              />
              <div className="absolute right-2 top-2 flex items-center gap-1">
                <ResetButton onClick={handleReset} label={t.resetBtn} />
                <MicButton
                  isListening={speech.isListening}
                  isSupported={speech.isSupported}
                  onClick={handleMicClick}
                  startLabel={t.micStart}
                  stopLabel={t.micStop}
                  unsupportedLabel={t.micUnsupported}
                />
              </div>
            </div>
            <TriggerWordList text={inputText} />
            <div className="mt-3 flex justify-center">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                title={loading ? t.submitBtnLoading : t.submitBtn}
                aria-label={loading ? t.submitBtnLoading : t.submitBtn}
                className="press inline-flex items-center justify-center rounded-[var(--radius-button)] px-10 py-3 disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  background: "var(--accent)",
                  color: "var(--on-accent)",
                  boxShadow: "var(--glow-accent-sm)",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.5c.4 3.3 1.9 4.8 5.2 5.2-3.3.4-4.8 1.9-5.2 5.2-.4-3.3-1.9-4.8-5.2-5.2 3.3-.4 4.8-1.9 5.2-5.2Z" />
                  <path d="M19 13c.25 2 1 2.75 3 3-2 .25-2.75 1-3 3-.25-2-1-2.75-3-3 2-.25 2.75-1 3-3Z" />
                </svg>
              </button>
            </div>
            {error && (
              <p className="mt-2 text-xs" style={{ color: "var(--danger)" }}>
                {error}
              </p>
            )}
          </div>

          {showOutput && (
            <div className="flex flex-col gap-4">
              {results.map((item) => {
                const tone = getTone(item.toneId);
                return (
                  <div key={item.toneId} className="surface-card rounded-[var(--radius-card)] p-4">
                    <h3
                      className="mb-2 flex items-center gap-1.5 text-[10px] uppercase"
                      style={{ fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-caps)", color: "var(--text-strong)" }}
                    >
                      {t.outputLabel}
                      {tone && (
                        <span style={{ color: "var(--accent)" }}>· {tone.label[lang]}</span>
                      )}
                    </h3>
                    <div className="relative">
                      <div
                        className="h-[150px] overflow-y-auto whitespace-pre-wrap rounded-[var(--radius-input)] border p-2.5 pr-10 text-xs"
                        style={{
                          borderColor: item.error ? "var(--danger-soft)" : "var(--border)",
                          background: "var(--bg-surface-2)",
                          color: item.error ? "var(--danger)" : "var(--text-primary)",
                        }}
                      >
                        {item.error ? (
                          item.error
                        ) : item.output ? (
                          item.output
                        ) : (
                          <span className="italic" style={{ color: "var(--text-tertiary)" }}>
                            {t.submitBtnLoading}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.toneId)}
                        disabled={!item.output}
                        title={item.copied ? t.copiedBtn : t.copyBtn}
                        aria-label={item.copied ? t.copiedBtn : t.copyBtn}
                        className="press absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-[var(--radius-chip)] border disabled:cursor-not-allowed disabled:opacity-40"
                        style={{
                          borderColor: item.copied ? "var(--accent-line)" : "var(--border-strong)",
                          background: item.copied ? "var(--accent-soft)" : "var(--bg-surface-2)",
                          color: item.copied ? "var(--accent)" : "var(--text-secondary)",
                        }}
                      >
                        {item.copied ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                        ) : (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" />
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {item.output && (
                      <button
                        type="button"
                        onClick={() => handleShare(item.toneId)}
                        disabled={item.sharing || item.shared}
                        className="press mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-[var(--radius-chip)] border px-3 py-1.5 text-xs disabled:cursor-not-allowed"
                        style={{
                          borderColor: item.shared ? "var(--accent-line)" : "var(--border-strong)",
                          background: item.shared ? "var(--accent-soft)" : "transparent",
                          color: item.shared ? "var(--accent)" : "var(--text-primary)",
                          fontWeight: "var(--fw-semibold)",
                        }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 17v5" />
                          <path d="M9 10.8a2 2 0 0 1-1.1 1.8l-1.8.9A2 2 0 0 0 5 15.3V17h14v-1.7a2 2 0 0 0-1.1-1.8l-1.8-.9a2 2 0 0 1-1.1-1.8V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1Z" />
                        </svg>
                        {item.shared ? "Ajouté au Mur !" : item.sharing ? "Partage en cours…" : "Épingler"}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <HistoryPanel
        open={historyOpen}
        items={history}
        onClose={() => setHistoryOpen(false)}
        onClear={handleClearHistory}
        onSelect={handleHistorySelect}
        onDeleteItem={handleDeleteHistoryItem}
        t={t}
        lang={lang}
      />
    </div>
  );
}
