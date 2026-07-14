"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "@/lib/AuthContext";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Auth() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setSubmitting(true);

    const result = mode === "signin" ? await signIn(email, password) : await signUp(email, password);

    if (result.error) {
      setError(result.error);
    } else if (mode === "signup") {
      setInfo("Compte créé ! Vérifie ta boîte mail pour confirmer ton adresse avant de te connecter.");
    }
    setSubmitting(false);
  }

  return (
    <div className="diplomatico-bg relative flex min-h-full flex-col items-center overflow-hidden px-4 py-16">
      <div className="fixed right-4 top-4 z-10">
        <ThemeToggle />
      </div>

      <div className="animate-rise relative z-10 flex flex-col items-center gap-5 text-center">
        <div className="flex items-center gap-2">
          <Logo size={28} />
          <span
            className="text-lg"
            style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-bold)", color: "var(--text-strong)" }}
          >
            Diplomatico
          </span>
        </div>

        <div
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm"
          style={{ borderColor: "var(--border)", background: "var(--bg-surface)", color: "var(--text-secondary)" }}
        >
          <span className="size-1.5 rounded-full" style={{ background: "var(--accent)" }} />
          Balance tes scuds, je fournis les silencieux
        </div>

        <h1
          className="max-w-sm text-2xl sm:text-3xl"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--fw-extrabold)",
            lineHeight: "var(--lh-tight)",
            letterSpacing: "-0.02em",
            color: "var(--text-strong)",
          }}
        >
          Reformule sans jamais te trahir
        </h1>
        <p className="max-w-sm text-sm" style={{ color: "var(--text-secondary)" }}>
          {mode === "signin" ? "Connecte-toi pour continuer." : "Crée un compte pour continuer."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-[var(--radius-card)] border p-6 text-left"
          style={{ borderColor: "var(--border)", background: "var(--bg-surface)" }}
        >
          <label className="flex flex-col gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
            Email
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-[var(--radius-input)] border bg-transparent px-3 py-2 text-sm outline-none transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--text-strong)" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
            Mot de passe
            <input
              type="password"
              required
              minLength={6}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-[var(--radius-input)] border bg-transparent px-3 py-2 text-sm outline-none transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--text-strong)" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </label>

          {error && (
            <p className="text-sm" style={{ color: "var(--danger)" }}>
              {error}
            </p>
          )}
          {info && (
            <p className="text-sm" style={{ color: "var(--success)" }}>
              {info}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="press mt-1 inline-flex items-center justify-center rounded-[var(--radius-button)] px-6 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
            style={{ background: "var(--accent)", color: "var(--on-accent)", fontWeight: "var(--fw-semibold)" }}
          >
            {mode === "signin" ? "Se connecter" : "S'inscrire"}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setInfo(null);
            }}
            className="text-center text-xs underline underline-offset-2"
            style={{ color: "var(--text-tertiary)" }}
          >
            {mode === "signin" ? "Pas de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
