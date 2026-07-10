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
import type { ToneId } from "@/lib/tones";
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

export function DiplomaticoApp() {
  const lang: Lang = "fr";
  const [mode, setMode] = useState<Mode>("reformulate");
  const [tone, setTone] = useState<ToneId>("serieux");
  const [intensity, setIntensity] = useState<IntensityLevel>(DEFAULT_INTENSITY);
  const [audience, setAudience] = useState<AudienceLevel>(DEFAULT_AUDIENCE);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [sharing, setSharing] = useState(false);
  const [shared, setShared] = useState(false);

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
    setShared(false);
    try {
      const res = await fetch("/api/civilize", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mode, tone, intensity, audience, text: inputText }),
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

  const handleShare = async () => {
    if (!inputText.trim() || !outputText.trim() || sharing) return;
    setSharing(true);
    const ok = await sharePeaceWallItem({
      scudText: inputText,
      diplomaticText: outputText,
      toneCategory: tone,
      intensityLevel: intensity,
    });
    setSharing(false);
    setShared(ok);
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
    setShared(false);
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
            <ToneSelector value={tone} onChange={setTone} lang={lang} />
          </div>
          <div className="mt-3">
            <IntensitySlider value={intensity} onChange={setIntensity} lang={lang} label={t.chooseIntensity} />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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

          <div className="surface-card rounded-[var(--radius-card)] p-4">
            <h3
              className="mb-2 text-[10px] uppercase"
              style={{ fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-caps)", color: "var(--text-strong)" }}
            >
              {t.outputLabel}
            </h3>
            <div className="relative">
              <div
                className="h-[150px] overflow-y-auto whitespace-pre-wrap rounded-[var(--radius-input)] border p-2.5 pr-10 text-xs"
                style={{ borderColor: "var(--border)", background: "var(--bg-surface-2)", color: "var(--text-primary)" }}
              >
                {outputText}
              </div>
              <button
                type="button"
                onClick={handleCopy}
                disabled={!outputText}
                title={copied ? t.copiedBtn : t.copyBtn}
                aria-label={copied ? t.copiedBtn : t.copyBtn}
                className="press absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-[var(--radius-chip)] border disabled:cursor-not-allowed disabled:opacity-40"
                style={{
                  borderColor: copied ? "var(--accent-line)" : "var(--border-strong)",
                  background: copied ? "var(--accent-soft)" : "var(--bg-surface-2)",
                  color: copied ? "var(--accent)" : "var(--text-secondary)",
                }}
              >
                {copied ? (
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
            {outputText && (
              <button
                type="button"
                onClick={handleShare}
                disabled={sharing || shared}
                className="press mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-[var(--radius-chip)] border px-3 py-1.5 text-xs disabled:cursor-not-allowed"
                style={{
                  borderColor: shared ? "var(--accent-line)" : "var(--border-strong)",
                  background: shared ? "var(--accent-soft)" : "transparent",
                  color: shared ? "var(--accent)" : "var(--text-primary)",
                  fontWeight: "var(--fw-semibold)",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 17v5" />
                  <path d="M9 10.8a2 2 0 0 1-1.1 1.8l-1.8.9A2 2 0 0 0 5 15.3V17h14v-1.7a2 2 0 0 0-1.1-1.8l-1.8-.9a2 2 0 0 1-1.1-1.8V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1Z" />
                </svg>
                {shared ? "Ajouté au Mur !" : sharing ? "Partage en cours…" : "Épingler"}
              </button>
            )}
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
