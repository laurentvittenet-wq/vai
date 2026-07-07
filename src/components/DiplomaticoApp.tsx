"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { ModeTabs } from "@/components/ModeTabs";
import { ToneSelector } from "@/components/ToneSelector";
import { IntensitySlider } from "@/components/IntensitySlider";
import { MicButton } from "@/components/MicButton";
import { ResetButton } from "@/components/ResetButton";
import { HistoryPanel } from "@/components/HistoryPanel";
import { STRINGS, type Lang } from "@/lib/i18n";
import type { Mode } from "@/lib/modes";
import type { ToneId } from "@/lib/tones";
import { DEFAULT_INTENSITY, type IntensityLevel } from "@/lib/intensity";
import { useSpeechRecognition } from "@/lib/useSpeechRecognition";
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

export function DiplomaticoApp() {
  const router = useRouter();
  const lang: Lang = "fr";
  const [mode, setMode] = useState<Mode>("reformulate");
  const [tone, setTone] = useState<ToneId>("serieux");
  const [intensity, setIntensity] = useState<IntensityLevel>(DEFAULT_INTENSITY);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [signingOut, setSigningOut] = useState(false);

  const t = STRINGS[lang];
  const speech = useSpeechRecognition("fr-FR");

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
    setOutputText("");
    try {
      const res = await fetch("/api/civilize", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mode, tone, intensity, text: inputText }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t.errorGeneric);
        return;
      }
      setOutputText(data.result);
      if (data.historyItem) {
        setHistory((prev) => [data.historyItem, ...prev]);
      }
    } catch {
      setError(t.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setMode(item.mode);
    setTone(item.tone);
    setIntensity(item.intensity || DEFAULT_INTENSITY);
    setInputText(item.input);
    setOutputText(item.output);
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
    setOutputText("");
    setError(null);
  };

  const handleLogout = async () => {
    setSigningOut(true);
    await fetch("/api/auth", { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="min-h-full" style={{ background: "var(--bg-base)" }}>
      <header style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-surface)" }}>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2">
            <Logo size={26} />
            <div>
              <span
                className="text-sm"
                style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-extrabold)", color: "var(--text-strong)" }}
              >
                {t.appName}
              </span>
              <span className="ml-1.5 text-[10px]" style={{ color: "var(--text-tertiary)" }}>
                {t.version}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {SHOW_HISTORY_BUTTON && (
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
            )}
            <button
              type="button"
              onClick={handleLogout}
              disabled={signingOut}
              title="Verrouiller"
              aria-label="Verrouiller"
              className="press inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius-chip)] border disabled:cursor-not-allowed disabled:opacity-60"
              style={{ borderColor: "var(--danger-soft)", color: "var(--danger)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-6">
        <section className="mb-6">
          <span
            className="mb-2 inline-block rounded-[var(--radius-chip)] px-2.5 py-0.5 text-[10px]"
            style={{ background: "var(--accent-soft)", color: "var(--accent)", fontWeight: "var(--fw-semibold)" }}
          >
            {t.badge}
          </span>
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
            {t.heroTitle}
          </h1>
          <p className="mt-2 max-w-xl text-sm" style={{ color: "var(--text-secondary)" }}>
            {t.heroSubtitle}
          </p>
        </section>

        <section className="mb-5">
          <ModeTabs mode={mode} onChange={setMode} t={t} />
        </section>

        <section className="surface-card mb-5 rounded-[var(--radius-card)] p-4">
          <h2
            className="mb-2 text-[10px] uppercase"
            style={{ fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-caps)", color: "var(--text-tertiary)" }}
          >
            {t.chooseTone}
          </h2>
          <ToneSelector value={tone} onChange={setTone} lang={lang} />
          <div className="mt-3">
            <IntensitySlider value={intensity} onChange={setIntensity} lang={lang} label={t.chooseIntensity} />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="surface-card rounded-[var(--radius-card)] p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3
                className="text-[10px] uppercase"
                style={{ fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-caps)", color: "var(--text-tertiary)" }}
              >
                {mode === "reformulate" ? t.inputLabelReformulate : t.inputLabelReply}
              </h3>
              <div className="flex items-center gap-2">
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
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value.slice(0, MAX_TEXT_LENGTH))}
              placeholder={
                mode === "reformulate" ? t.inputPlaceholderReformulate : t.inputPlaceholderReply
              }
              rows={8}
              className="w-full resize-none rounded-[var(--radius-input)] border p-2.5 text-xs outline-none"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg-surface-3)",
                color: "var(--text-primary)",
              }}
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px]" style={{ color: "var(--text-tertiary)" }}>
                {inputText.length} / {MAX_TEXT_LENGTH} {t.charCount}
              </span>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="press inline-flex items-center gap-2 rounded-[var(--radius-button)] px-4 py-1.5 text-xs disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  background: "var(--accent)",
                  color: "var(--on-accent)",
                  fontWeight: "var(--fw-bold)",
                  boxShadow: "var(--glow-accent-sm)",
                }}
              >
                {loading ? t.submitBtnLoading : t.submitBtn}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-xs" style={{ color: "var(--danger)" }}>
                {error}
              </p>
            )}
          </div>

          <div className="surface-card rounded-[var(--radius-card)] p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3
                className="text-[10px] uppercase"
                style={{ fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-caps)", color: "var(--text-tertiary)" }}
              >
                {t.outputLabel}
              </h3>
              <button
                type="button"
                onClick={handleCopy}
                disabled={!outputText}
                className="press rounded-[var(--radius-chip)] border px-2.5 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-40"
                style={{ borderColor: "var(--border-strong)", color: "var(--text-primary)", fontWeight: "var(--fw-semibold)" }}
              >
                {copied ? t.copiedBtn : t.copyBtn}
              </button>
            </div>
            <div
              className="min-h-[14rem] whitespace-pre-wrap rounded-[var(--radius-input)] border p-2.5 text-xs"
              style={{ borderColor: "var(--border)", background: "var(--bg-surface-2)", color: "var(--text-primary)" }}
            >
              {outputText || (
                <span className="italic" style={{ color: "var(--text-tertiary)" }}>
                  {t.outputPlaceholder}
                </span>
              )}
            </div>
          </div>
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
