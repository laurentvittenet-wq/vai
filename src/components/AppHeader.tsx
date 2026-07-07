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
            title="Accueil"
            aria-label="Accueil"
            className="press inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-chip)]"
            style={{
              color: active === "home" ? "var(--accent)" : "var(--text-secondary)",
              background: active === "home" ? "var(--accent-soft)" : "transparent",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
            </svg>
          </Link>
          <Link
            href="/mur-de-la-paix"
            title="Mur de la paix"
            aria-label="Mur de la paix"
            className="press inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-chip)]"
            style={{
              color: active === "peace-wall" ? "var(--accent)" : "var(--text-secondary)",
              background: active === "peace-wall" ? "var(--accent-soft)" : "transparent",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v6" />
              <path d="M8 8h8l1.5 5.5a1 1 0 0 1-1 1.5H7.5a1 1 0 0 1-1-1.5L8 8Z" />
              <path d="M12 15v7" />
            </svg>
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
