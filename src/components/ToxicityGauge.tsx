"use client";

import { useState } from "react";
import { getToxicityLevel } from "@/lib/toxicity";

interface ToxicityGaugeProps {
  text: string;
}

export function ToxicityGauge({ text }: ToxicityGaugeProps) {
  const [score, setScore] = useState<number | null>(null);
  const [analyzedText, setAnalyzedText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stale = analyzedText !== null && analyzedText !== text;
  const level = score !== null && !stale ? getToxicityLevel(score) : undefined;

  const handleAnalyze = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/toxicity", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Analyse impossible.");
        return;
      }
      setScore(data.score);
      setAnalyzedText(text);
    } catch {
      setError("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <div className="mb-1 flex items-center justify-between">
        <span
          className="text-[10px] uppercase"
          style={{ fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-caps)", color: "var(--text-tertiary)" }}
        >
          Thermomètre à venin
        </span>
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={loading || !text.trim()}
          className="press rounded-[var(--radius-chip)] border px-2 py-0.5 text-[10px] disabled:cursor-not-allowed disabled:opacity-50"
          style={{ borderColor: "var(--border-strong)", color: "var(--text-primary)" }}
        >
          {loading ? "Analyse…" : "Analyser"}
        </button>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--bg-surface-3)" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: level ? `${(level.score / 5) * 100}%` : "0%",
            background: level?.color ?? "transparent",
            boxShadow: level ? `0 0 8px ${level.color}` : "none",
          }}
        />
      </div>
      {level && (
        <div className="mt-1 text-[10px]" style={{ color: level.color, fontWeight: "var(--fw-semibold)" }}>
          {level.score}/5 — {level.label}
        </div>
      )}
      {error && (
        <div className="mt-1 text-[10px]" style={{ color: "var(--danger)" }}>
          {error}
        </div>
      )}
    </div>
  );
}
