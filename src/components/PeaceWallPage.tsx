"use client";

import { AppHeader } from "@/components/AppHeader";
import { PeaceWallGallery } from "@/components/PeaceWallGallery";

export function PeaceWallPage() {
  return (
    <div className="min-h-full" style={{ background: "var(--bg-base)" }}>
      <AppHeader active="peace-wall" />

      <main className="mx-auto max-w-5xl px-5 py-6">
        <section className="mb-6">
          <span
            className="mb-2 inline-block rounded-[var(--radius-chip)] px-2.5 py-0.5 text-[10px]"
            style={{ background: "var(--accent-soft)", color: "var(--accent)", fontWeight: "var(--fw-semibold)" }}
          >
            Anonyme
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
            Le Mur de la Paix
          </h1>
          <p className="mt-2 max-w-xl text-sm" style={{ color: "var(--text-secondary)" }}>
            Des scuds désamorcés, partagés anonymement par l&apos;équipe. Clique sur un scud flouté pour le révéler.
          </p>
        </section>

        <PeaceWallGallery />
      </main>
    </div>
  );
}
