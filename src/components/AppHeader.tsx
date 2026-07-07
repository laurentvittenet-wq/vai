"use client";

import { type ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

interface AppHeaderProps {
  active: "home" | "peace-wall";
  extraActions?: ReactNode;
}

export function AppHeader({ active, extraActions }: AppHeaderProps) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const handleLogout = async () => {
    setSigningOut(true);
    await fetch("/api/auth", { method: "DELETE" });
    router.refresh();
  };

  return (
    <header style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-surface)" }}>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <div className="flex items-center gap-2">
          <Logo size={26} />
          <div>
            <span
              className="text-sm"
              style={{ fontFamily: "var(--font-display)", fontWeight: "var(--fw-extrabold)", color: "var(--text-strong)" }}
            >
              Diplomatico
            </span>
            <span className="ml-1.5 text-[10px]" style={{ color: "var(--text-tertiary)" }}>
              v1.0
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="press rounded-[var(--radius-chip)] px-3 py-1.5 text-xs"
            style={{
              fontWeight: "var(--fw-semibold)",
              color: active === "home" ? "var(--accent)" : "var(--text-secondary)",
              background: active === "home" ? "var(--accent-soft)" : "transparent",
            }}
          >
            Accueil
          </Link>
          <Link
            href="/mur-de-la-paix"
            className="press rounded-[var(--radius-chip)] px-3 py-1.5 text-xs"
            style={{
              fontWeight: "var(--fw-semibold)",
              color: active === "peace-wall" ? "var(--accent)" : "var(--text-secondary)",
              background: active === "peace-wall" ? "var(--accent-soft)" : "transparent",
            }}
          >
            Mur de la paix
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {extraActions}
          <button
            type="button"
            onClick={handleLogout}
            disabled={signingOut}
            title="Verrouiller"
            aria-label="Verrouiller"
            className="press inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius-chip)] border disabled:cursor-not-allowed disabled:opacity-60"
            style={{ borderColor: "var(--danger-soft)", color: "var(--danger)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
