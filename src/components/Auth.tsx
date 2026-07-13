"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "@/lib/AuthContext";

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
    <div
      className="relative flex min-h-full flex-col items-center justify-center overflow-hidden px-6 py-16"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="animate-rise relative flex flex-col items-center">
        <div
          className="overflow-hidden rounded-[var(--radius-lg)]"
          style={{ width: 176, height: 176, animation: "podium-pulse 3.2s ease-in-out infinite" }}
        >
          <img src="/access-mascot.jpg" alt="Diplomatico" className="h-full w-full object-cover" />
        </div>
        <h1
          className="mt-6 text-center text-2xl"
          style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-extrabold)", color: "var(--text-strong)" }}
        >
          Diplomatico
        </h1>
        <p className="mt-1 max-w-sm text-center text-xs" style={{ color: "var(--text-tertiary)" }}>
          Balance tes scuds, je fournis les silencieux.
        </p>
        <p className="mt-2 max-w-sm text-center text-sm" style={{ color: "var(--text-secondary)" }}>
          {mode === "signin" ? "Connecte-toi pour continuer." : "Crée un compte pour continuer."}
        </p>

        <form
          onSubmit={handleSubmit}
          className="surface-card mt-8 flex w-72 flex-col gap-4 rounded-[var(--radius-card)] p-6"
        >
          <label className="flex flex-col gap-1.5 text-left text-sm" style={{ color: "var(--text-secondary)" }}>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-[var(--radius-input)] border px-3 py-2 text-sm outline-none"
              style={{ borderColor: "var(--border)", background: "var(--bg-surface-3)", color: "var(--text-strong)" }}
            />
          </label>

          <label className="flex flex-col gap-1.5 text-left text-sm" style={{ color: "var(--text-secondary)" }}>
            Mot de passe
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-[var(--radius-input)] border px-3 py-2 text-sm outline-none"
              style={{ borderColor: "var(--border)", background: "var(--bg-surface-3)", color: "var(--text-strong)" }}
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
            className="press mt-1 inline-flex items-center justify-center rounded-[var(--radius-button)] px-6 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              background: "var(--accent)",
              color: "var(--on-accent)",
              fontWeight: "var(--fw-bold)",
              boxShadow: "var(--glow-accent-sm)",
            }}
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
            className="text-xs underline"
            style={{ color: "var(--text-tertiary)" }}
          >
            {mode === "signin" ? "Pas de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
