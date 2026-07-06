"use client";

import { useState } from "react";
import { ModeTabs } from "@/components/ModeTabs";
import { ToneSelector } from "@/components/ToneSelector";
import { MicButton } from "@/components/MicButton";
import { HistoryPanel } from "@/components/HistoryPanel";
import { STRINGS, type Lang } from "@/lib/i18n";
import type { Mode } from "@/lib/modes";
import type { ToneId } from "@/lib/tones";
import { useSpeechRecognition } from "@/lib/useSpeechRecognition";
import {
  addHistoryItem,
  clearHistory,
  loadHistory,
  type HistoryItem,
} from "@/lib/history";

const MAX_TEXT_LENGTH = 4000;

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const [mode, setMode] = useState<Mode>("reformulate");
  const [tone, setTone] = useState<ToneId>("serieux");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>(() => loadHistory());

  const t = STRINGS[lang];
  const speech = useSpeechRecognition(lang === "fr" ? "fr-FR" : "en-US");

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
        body: JSON.stringify({ mode, tone, text: inputText }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || t.errorGeneric);
        return;
      }
      setOutputText(data.result);
      setHistory(
        addHistoryItem(history, {
          mode,
          tone,
          input: inputText,
          output: data.result,
        })
      );
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
    setInputText(item.input);
    setOutputText(item.output);
    setHistoryOpen(false);
  };

  const handleClearHistory = () => {
    setHistory(clearHistory());
  };

  return (
    <div className="min-h-full bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{t.appName}</span>
            <span className="ml-2 text-xs text-zinc-400">{t.version}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setHistoryOpen(true)}
              className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600"
            >
              {t.historyBtn}
            </button>
            <button
              type="button"
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600"
            >
              {t.langBtn}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <section className="mb-10">
          <span className="mb-4 inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800 dark:bg-teal-900/50 dark:text-teal-300">
            {t.badge}
          </span>
          <h1 className="max-w-2xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            {t.heroTitle}
          </h1>
          <p className="mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">{t.heroSubtitle}</p>
        </section>

        <section className="mb-8">
          <ModeTabs mode={mode} onChange={setMode} t={t} />
        </section>

        <section className="mb-6">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {t.chooseTone}
          </h2>
          <ToneSelector value={tone} onChange={setTone} lang={lang} />
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {mode === "reformulate" ? t.inputLabelReformulate : t.inputLabelReply}
              </h3>
              <MicButton
                isListening={speech.isListening}
                isSupported={speech.isSupported}
                onClick={handleMicClick}
                startLabel={t.micStart}
                stopLabel={t.micStop}
                unsupportedLabel={t.micUnsupported}
              />
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value.slice(0, MAX_TEXT_LENGTH))}
              placeholder={
                mode === "reformulate" ? t.inputPlaceholderReformulate : t.inputPlaceholderReply
              }
              rows={10}
              className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-600"
            />
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-zinc-400">
                {inputText.length} / {MAX_TEXT_LENGTH} {t.charCount}
              </span>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? t.submitBtnLoading : t.submitBtn}
              </button>
            </div>
            {error && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>}
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {t.outputLabel}
              </h3>
              <button
                type="button"
                onClick={handleCopy}
                disabled={!outputText}
                className="rounded-full border border-zinc-300 px-3 py-1 text-sm font-medium text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300"
              >
                {copied ? t.copiedBtn : t.copyBtn}
              </button>
            </div>
            <div className="min-h-[16rem] whitespace-pre-wrap rounded-xl border border-zinc-100 bg-zinc-50 p-3 text-sm text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
              {outputText || <span className="italic text-zinc-400">{t.outputPlaceholder}</span>}
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
        t={t}
        lang={lang}
      />
    </div>
  );
}
