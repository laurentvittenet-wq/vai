"use client";

import { type ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

interface AppHeaderProps {
  active: "home" | "peace-wall" | "informations";
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
        <div className="flex items-center gap-1">
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
              <path d="M12 17v5" />
              <path d="M9 10.8a2 2 0 0 1-1.1 1.8l-1.8.9A2 2 0 0 0 5 15.3V17h14v-1.7a2 2 0 0 0-1.1-1.8l-1.8-.9a2 2 0 0 1-1.1-1.8V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1Z" />
            </svg>
          </Link>
          <Link
            href="/informations"
            title="Informations"
            aria-label="Informations"
            className="press inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-chip)]"
            style={{
              color: active === "informations" ? "var(--accent)" : "var(--text-secondary)",
              background: active === "informations" ? "var(--accent-soft)" : "transparent",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 11v5.5" />
              <circle cx="12" cy="7.8" r="0.1" fill="currentColor" stroke="currentColor" strokeWidth="2" />
            </svg>
          </Link>
        </div>

        <div className="flex items-center gap-1">
          {extraActions}
          <ThemeToggle />
          <button
            type="button"
            onClick={handleLogout}
            disabled={signingOut}
            title="Quitter"
            aria-label="Quitter"
            className="press inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-chip)] disabled:cursor-not-allowed disabled:opacity-60"
            style={{ color: "var(--danger)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
              <path d="M10 8l4 4-4 4" />
              <path d="M14 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
