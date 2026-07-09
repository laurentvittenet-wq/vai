"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

type AuthMode = "login" | "signup";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSignup = mode === "signup";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isSignup && !firstName.trim()) {
      setError("Dis-nous au moins comment t'appeler.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError("Cette adresse email ne passe pas le civilisateur.");
      return;
    }
    if (password.length < 6) {
      setError("6 caractères minimum, on n'est pas des sauvages.");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => router.push("/"), 800);
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "var(--bg-base)" }}>
      {/* Decorative atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full"
        style={{
          background: "radial-gradient(closest-side, var(--accent-soft), transparent)",
          filter: "blur(20px)",
          animation: "drift 14s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -right-32 h-[36rem] w-[36rem] rounded-full"
        style={{
          background: "radial-gradient(closest-side, var(--pop-soft), transparent)",
          filter: "blur(20px)",
          animation: "drift 18s ease-in-out infinite reverse",
        }}
      />
      <div aria-hidden="true" className="bg-grid-dots pointer-events-none absolute inset-0 opacity-[0.35]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col lg:flex-row">
        {/* Marketing panel */}
        <div className="hidden flex-1 flex-col justify-center px-12 py-16 lg:flex">
          <div className="mb-8 flex items-center gap-2.5">
            <Logo size={34} />
            <span
              style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-extrabold)", color: "var(--text-strong)" }}
              className="text-lg"
            >
              Diplomatico
            </span>
          </div>

          <h1
            className="max-w-md text-3xl"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: "var(--fw-extrabold)",
              lineHeight: "var(--lh-tight)",
              letterSpacing: "-0.02em",
              color: "var(--text-strong)",
            }}
          >
            Connecte-toi. Tes scuds restent sous silencieux.
          </h1>
          <p className="mt-3 max-w-sm text-sm" style={{ color: "var(--text-secondary)" }}>
            Retrouve ton historique de reformulations et continue à dire les choses… autrement.
          </p>

          {/* Floating demo card */}
          <div
            className="surface-card relative mt-10 max-w-sm -rotate-2 rounded-[var(--radius-card)] p-4"
            style={{ boxShadow: "var(--shadow-lg), var(--edge-highlight)" }}
          >
            <span
              className="absolute -right-2 -top-2 inline-flex items-center gap-1 rounded-[var(--radius-chip)] px-2.5 py-1 text-[10px]"
              style={{ background: "var(--accent)", color: "var(--on-accent)", fontWeight: "var(--fw-bold)", boxShadow: "var(--glow-accent-sm)" }}
            >
              <span style={{ animation: "podium-pulse 1.8s ease-in-out infinite" }}>✨</span>
              Civilisé
            </span>
            <p
              className="rounded-[var(--radius-input)] border p-2.5 text-xs line-through"
              style={{ borderColor: "var(--border)", background: "var(--bg-surface-3)", color: "var(--text-tertiary)" }}
            >
              &ldquo;T&apos;es vraiment un boulet.&rdquo;
            </p>
            <div className="my-2 text-center text-xs" style={{ color: "var(--accent)" }}>
              ↓
            </div>
            <p
              className="rounded-[var(--radius-input)] border p-2.5 text-xs"
              style={{ borderColor: "var(--accent-line)", background: "var(--accent-soft)", color: "var(--text-primary)" }}
            >
              &ldquo;Je pense qu&apos;on gagnerait en efficacité ensemble.&rdquo;
            </p>
          </div>

          <div
            className="mt-10 flex gap-6"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}
          >
            <div>
              <div className="text-sm" style={{ color: "var(--text-strong)", fontWeight: "var(--fw-bold)" }}>
                12 480
              </div>
              <div className="text-[10px]">messages sauvés</div>
            </div>
            <div>
              <div className="text-sm" style={{ color: "var(--text-strong)", fontWeight: "var(--fw-bold)" }}>
                0
              </div>
              <div className="text-[10px]">email regretté</div>
            </div>
            <div>
              <div className="text-sm" style={{ color: "var(--text-strong)", fontWeight: "var(--fw-bold)" }}>
                100%
              </div>
              <div className="text-[10px]">toi</div>
            </div>
          </div>
        </div>

        {/* Auth panel */}
        <div className="flex flex-1 items-center justify-center px-5 py-12 lg:px-12">
          <div className="w-full max-w-sm">
            <div className="mb-6 flex items-center justify-center gap-2 lg:hidden">
              <Logo size={28} />
              <span
                style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-extrabold)", color: "var(--text-strong)" }}
                className="text-base"
              >
                Diplomatico
              </span>
            </div>

            <div
              className="surface-card rounded-[var(--radius-card)] p-6"
              style={{ boxShadow: "var(--shadow-lg), var(--edge-highlight)" }}
            >
              {success ? (
                <div className="py-6 text-center">
                  <div className="mb-3 text-3xl">✅</div>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-bold)", color: "var(--text-strong)" }}>
                    Te voilà civilisé·e.
                  </p>
                  <p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                    Redirection en cours…
                  </p>
                </div>
              ) : (
                <>
                  <div
                    className="mb-5 grid grid-cols-2 gap-1 rounded-[var(--radius-chip)] p-1"
                    style={{ background: "var(--bg-surface-2)" }}
                  >
                    {(["login", "signup"] as AuthMode[]).map((m) => {
                      const active = mode === m;
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => {
                            setMode(m);
                            setError(null);
                          }}
                          aria-pressed={active}
                          className="press rounded-[var(--radius-chip)] py-2 text-xs transition-colors"
                          style={{
                            background: active ? "var(--accent)" : "transparent",
                            color: active ? "var(--on-accent)" : "var(--text-secondary)",
                            fontWeight: "var(--fw-bold)",
                            boxShadow: active ? "var(--glow-accent-sm)" : "none",
                          }}
                        >
                          {m === "login" ? "Connexion" : "Inscription"}
                        </button>
                      );
                    })}
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
                    {isSignup && (
                      <label className="flex flex-col gap-1.5">
                        <span
                          className="text-[10px] uppercase"
                          style={{ fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-caps)", color: "var(--text-tertiary)" }}
                        >
                          Prénom
                        </span>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Ton prénom"
                          className="field-input w-full rounded-[var(--radius-input)] border p-2.5 text-sm outline-none"
                          style={{ borderColor: "var(--border)", background: "var(--bg-surface-3)", color: "var(--text-primary)" }}
                        />
                      </label>
                    )}

                    <label className="flex flex-col gap-1.5">
                      <span
                        className="text-[10px] uppercase"
                        style={{ fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-caps)", color: "var(--text-tertiary)" }}
                      >
                        Email
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="toi@exemple.com"
                        className="field-input w-full rounded-[var(--radius-input)] border p-2.5 text-sm outline-none"
                        style={{ borderColor: "var(--border)", background: "var(--bg-surface-3)", color: "var(--text-primary)" }}
                      />
                    </label>

                    <label className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[10px] uppercase"
                          style={{ fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-caps)", color: "var(--text-tertiary)" }}
                        >
                          Mot de passe
                        </span>
                        {!isSignup && (
                          <button
                            type="button"
                            className="text-[10px]"
                            style={{ color: "var(--accent)", fontWeight: "var(--fw-semibold)" }}
                          >
                            Oublié ?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="field-input w-full rounded-[var(--radius-input)] border p-2.5 pr-10 text-sm outline-none"
                          style={{ borderColor: "var(--border)", background: "var(--bg-surface-3)", color: "var(--text-primary)" }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs"
                          style={{ color: "var(--text-tertiary)" }}
                        >
                          {showPassword ? "🙈" : "👁️"}
                        </button>
                      </div>
                    </label>

                    {error && (
                      <p className="text-xs" style={{ color: "var(--danger)" }}>
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="press mt-1 inline-flex items-center justify-center rounded-[var(--radius-button)] px-4 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                      style={{
                        background: "var(--accent)",
                        color: "var(--on-accent)",
                        fontWeight: "var(--fw-bold)",
                        boxShadow: "var(--glow-accent-sm)",
                      }}
                    >
                      {loading ? (isSignup ? "Création…" : "Connexion…") : isSignup ? "Créer mon compte" : "Se connecter"}
                    </button>
                  </form>

                  <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1" style={{ background: "var(--border)" }} />
                    <span className="text-[10px]" style={{ color: "var(--text-tertiary)" }}>
                      ou continue avec
                    </span>
                    <div className="h-px flex-1" style={{ background: "var(--border)" }} />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="press rounded-[var(--radius-button)] border py-2 text-xs"
                      style={{ borderColor: "var(--border-strong)", color: "var(--text-primary)", fontWeight: "var(--fw-semibold)" }}
                    >
                      Google
                    </button>
                    <button
                      type="button"
                      className="press rounded-[var(--radius-button)] border py-2 text-xs"
                      style={{ borderColor: "var(--border-strong)", color: "var(--text-primary)", fontWeight: "var(--fw-semibold)" }}
                    >
                      Apple
                    </button>
                  </div>

                  <p className="mt-5 text-center text-xs" style={{ color: "var(--text-secondary)" }}>
                    {isSignup ? "Déjà un compte ?" : "Pas encore de compte ?"}{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode(isSignup ? "login" : "signup");
                        setError(null);
                      }}
                      style={{ color: "var(--accent)", fontWeight: "var(--fw-semibold)" }}
                    >
                      {isSignup ? "Se connecter" : "Créer un compte"}
                    </button>
                  </p>
                </>
              )}
            </div>

            <p className="mt-4 text-center text-[10px]" style={{ color: "var(--text-tertiary)" }}>
              En continuant, tu acceptes nos CGU et notre politique de confidentialité.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
