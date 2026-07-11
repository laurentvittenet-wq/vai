"use client";

import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

export function AccessCodePage() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorTick, setErrorTick] = useState(0);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, [errorTick]);

  const submitCode = async (code: string) => {
    setError(null);
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
        setErrorTick((t) => t + 1);
        setLoading(false);
        setDigits(Array(6).fill(""));
        return;
      }
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessaie.");
      setErrorTick((t) => t + 1);
      setLoading(false);
    }
  };

  const handleDigitChange = (index: number, raw: string) => {
    const value = raw.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = value;
    setDigits(next);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    const code = next.join("");
    if (code.length === 6) {
      submitCode(code);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      const next = [...digits];
      next[index - 1] = "";
      setDigits(next);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(6)
      .fill("")
      .map((_, i) => pasted[i] || "");
    setDigits(next);
    if (pasted.length === 6) {
      submitCode(pasted);
    } else {
      inputsRef.current[pasted.length]?.focus();
    }
  };

  return (
    <div
      className="relative flex min-h-full flex-col items-center justify-center overflow-hidden px-6 py-16"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="animate-rise relative flex flex-col items-center">
        <div
          className="overflow-hidden rounded-[var(--radius-lg)]"
          style={{
            width: 176,
            height: 176,
            animation: "podium-pulse 3.2s ease-in-out infinite",
          }}
        >
          <img src="/access-mascot.jpg" alt="Diplomatico" className="h-full w-full object-cover" />
        </div>
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

        <div
          key={errorTick}
          className={`surface-card mt-8 flex flex-col items-center gap-5 rounded-[var(--radius-card)] p-6 ${errorTick > 0 ? "shake" : ""}`}
        >
          <div className="flex gap-2">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={1}
                disabled={loading}
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="otp-input h-14 w-11 rounded-[var(--radius-input)] border text-center text-xl outline-none disabled:opacity-60"
                style={{
                  borderColor: error ? "var(--danger)" : "var(--border)",
                  background: "var(--bg-surface-3)",
                  color: "var(--text-strong)",
                  fontFamily: "var(--font-mono)",
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => submitCode(digits.join(""))}
            disabled={loading || digits.join("").length !== 6}
            className="press inline-flex items-center gap-2 rounded-[var(--radius-button)] px-6 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              background: "var(--accent)",
              color: "var(--on-accent)",
              fontWeight: "var(--fw-bold)",
              boxShadow: "var(--glow-accent-sm)",
            }}
          >
            {loading ? (
              <>
                <span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: "var(--on-accent)",
                        animation: `podium-pulse 1s ease-in-out ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </span>
                Vérification…
              </>
            ) : (
              "Déverrouiller"
            )}
          </button>
        </div>

        {error && (
          <p className="mt-4 max-w-sm text-center text-sm" style={{ color: "var(--danger)" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
