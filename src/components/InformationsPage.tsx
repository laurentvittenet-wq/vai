"use client";

import { AppHeader } from "@/components/AppHeader";
import { TONES } from "@/lib/tones";
import { EXAMPLE_SCUD, TONE_EXAMPLES_APPUYE } from "@/lib/toneExamples";

export function InformationsPage() {
  return (
    <div className="min-h-full" style={{ background: "var(--bg-base)" }}>
      <AppHeader active="informations" />

      <main className="mx-auto max-w-5xl px-5 py-6">
        <section className="mb-6">
          <span
            className="mb-2 inline-block rounded-[var(--radius-chip)] px-2.5 py-0.5 text-[10px]"
            style={{ background: "var(--accent-soft)", color: "var(--accent)", fontWeight: "var(--fw-semibold)" }}
          >
            Guide
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
            Informations
          </h1>
          <p className="mt-2 max-w-xl text-sm" style={{ color: "var(--text-secondary)" }}>
            Ce que signifie chaque tonalité, et à quoi elle ressemble en pratique.
          </p>
        </section>

        <section className="surface-card mb-6 rounded-[var(--radius-card)] p-4">
          <h2
            className="mb-3 text-[10px] uppercase"
            style={{ fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-caps)", color: "var(--text-strong)" }}
          >
            Les tonalités
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {TONES.map((tone) => (
              <div
                key={tone.id}
                className="rounded-[var(--radius-input)] border p-3"
                style={{ borderColor: "var(--border)", background: "var(--bg-surface-2)" }}
              >
                <span
                  className="mb-1 inline-block rounded-[var(--radius-chip)] px-2 py-0.5 text-[10px]"
                  style={{ background: "var(--accent-soft)", color: "var(--accent)", fontWeight: "var(--fw-semibold)" }}
                >
                  {tone.label.fr}
                </span>
                <p className="text-xs" style={{ color: "var(--text-primary)" }}>
                  {tone.description.fr}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="surface-card rounded-[var(--radius-card)] p-4">
          <h2
            className="mb-1 text-[10px] uppercase"
            style={{ fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-caps)", color: "var(--text-strong)" }}
          >
            Exemple à intensité Appuyé
          </h2>
          <p className="mb-3 text-xs italic" style={{ color: "var(--text-tertiary)" }}>
            &quot;{EXAMPLE_SCUD}&quot;
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {TONES.map((tone) => (
              <div
                key={tone.id}
                className="rounded-[var(--radius-input)] border p-3"
                style={{ borderColor: "var(--border)", background: "var(--bg-surface-2)" }}
              >
                <span
                  className="mb-1 inline-block rounded-[var(--radius-chip)] px-2 py-0.5 text-[10px]"
                  style={{ background: "var(--bg-surface-3)", color: "var(--text-secondary)" }}
                >
                  {tone.label.fr}
                </span>
                <p className="text-xs" style={{ color: "var(--text-primary)" }}>
                  {TONE_EXAMPLES_APPUYE[tone.id]}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
