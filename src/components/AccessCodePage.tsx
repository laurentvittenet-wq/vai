"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

export function AccessCodePage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!/^\d{6}$/.test(code)) {
      setError("Entre les 6 chiffres du code d'accès.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Code incorrect.");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessaie.");
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-full flex-col items-center justify-center px-6 py-16"
      style={{ background: "var(--bg-base)" }}
    >
      <Logo size={56} />
      <h1
        className="mt-6 text-center text-2xl"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: "var(--fw-extrabold)",
          color: "var(--text-strong)",
        }}
      >
        Diplomatic
        <span style={{ position: "relative", display: "inline-block" }}>
          o
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 1,
              right: -3,
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "var(--glow-accent-sm)",
            }}
          />
        </span>
      </h1>
      <p className="mt-1 max-w-sm text-center text-xs" style={{ color: "var(--text-tertiary)" }}>
        Balance tes scuds, je fournis les silencieux.
      </p>
      <p className="mt-2 max-w-sm text-center text-sm" style={{ color: "var(--text-secondary)" }}>
        Accès restreint. Entre le code à 6 chiffres pour continuer.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col items-center gap-3">
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="••••••"
          className="w-64 rounded-[var(--radius-input)] border px-4 py-3 text-center text-2xl outline-none"
          style={{
            borderColor: "var(--border)",
            background: "var(--bg-surface-3)",
            color: "var(--text-strong)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.4em",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="press mt-2 rounded-[var(--radius-button)] px-6 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            background: "var(--accent)",
            color: "var(--on-accent)",
            fontWeight: "var(--fw-bold)",
            boxShadow: "var(--glow-accent-sm)",
          }}
        >
          {loading ? "Vérification…" : "Déverrouiller"}
        </button>
      </form>

      {error && (
        <p className="mt-4 max-w-sm text-center text-sm" style={{ color: "var(--danger)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
