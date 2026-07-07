"use client";

import { useState } from "react";
import { Logo } from "@/components/Logo";
import { GoogleIcon } from "@/components/GoogleIcon";
import { createClient } from "@/lib/supabase/client";

interface LoginPageProps {
  authError?: boolean;
}

export function LoginPage({ authError }: LoginPageProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    authError ? "La connexion a échoué. Réessaie." : null
  );

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (signInError) {
      setError(signInError.message);
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
        Diplomatico
      </h1>
      <p
        className="mt-2 max-w-sm text-center text-sm"
        style={{ color: "var(--text-secondary)" }}
      >
        Connecte-toi pour reformuler tes messages les plus létaux en versions
        civilisées.
      </p>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="press mt-8 inline-flex items-center gap-3 rounded-[var(--radius-button)] px-6 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-strong)",
          color: "var(--text-strong)",
          fontWeight: "var(--fw-semibold)",
        }}
      >
        <GoogleIcon />
        {loading ? "Connexion…" : "Continuer avec Google"}
      </button>

      {error && (
        <p className="mt-4 max-w-sm text-center text-sm" style={{ color: "var(--danger)" }}>
          {error}
        </p>
      )}
    </div>
  );
}
