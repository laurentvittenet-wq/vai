"use client";

import { useEffect, useState } from "react";
import {
  fetchPeaceWall,
  likePeaceWallItem,
  deletePeaceWallItem,
  type PeaceWallItem,
} from "@/lib/peaceWall";

export function PeaceWallGallery() {
  const [items, setItems] = useState<PeaceWallItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [liking, setLiking] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    fetchPeaceWall().then((data) => {
      if (!cancelled) {
        setItems(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleFlip = (id: string) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleLike = async (id: string) => {
    if (liking.has(id)) return;
    setLiking((prev) => new Set(prev).add(id));
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likesCount: item.likesCount + 1 } : item))
    );
    const newCount = await likePeaceWallItem(id);
    setLiking((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    if (newCount !== null) {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, likesCount: newCount } : item))
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (deleting.has(id)) return;
    setDeleting((prev) => new Set(prev).add(id));
    const ok = await deletePeaceWallItem(id);
    if (ok) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setDeleting((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-[var(--radius-card)] border"
            style={{ borderColor: "var(--border)", background: "var(--bg-surface-2)" }}
          />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
        Rien pour l&apos;instant. Les premières transformations partagées apparaîtront ici.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const isFlipped = flipped.has(item.id);
        return (
          <div
            key={item.id}
            className="surface-card relative flex flex-col gap-2.5 rounded-[var(--radius-card)] p-4"
          >
            <button
              type="button"
              onClick={() => handleDelete(item.id)}
              disabled={deleting.has(item.id)}
              title="Supprimer ce scud"
              aria-label="Supprimer ce scud"
              className="press absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-[var(--radius-full)] text-xs disabled:cursor-not-allowed disabled:opacity-50"
              style={{ color: "var(--text-tertiary)" }}
            >
              ✕
            </button>
            <div style={{ perspective: "1000px" }}>
              <button
                type="button"
                onClick={() => toggleFlip(item.id)}
                title={isFlipped ? "Cliquer pour revenir au scud" : "Cliquer pour voir la proposition"}
                className="block w-full text-left"
                style={{ height: "9rem" }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transition: "transform 0.5s",
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  <div
                    className="text-xs"
                    style={{
                      position: "absolute",
                      inset: 0,
                      overflowY: "auto",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      borderRadius: "var(--radius-input)",
                      border: "1px solid var(--border)",
                      background: "var(--bg-surface-3)",
                      color: "var(--text-primary)",
                      padding: "0.625rem",
                    }}
                  >
                    <span
                      className="mb-1 block text-[10px] uppercase"
                      style={{ fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-caps)", color: "var(--text-tertiary)" }}
                    >
                      Le scud
                    </span>
                    {item.scudText}
                  </div>
                  <div
                    className="text-xs"
                    style={{
                      position: "absolute",
                      inset: 0,
                      overflowY: "auto",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      borderRadius: "var(--radius-input)",
                      border: "1px solid var(--border)",
                      background: "var(--bg-surface-2)",
                      color: "var(--text-primary)",
                      padding: "0.625rem",
                    }}
                  >
                    <span
                      className="mb-1 block text-[10px] uppercase"
                      style={{ fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-caps)", color: "var(--accent)" }}
                    >
                      Version Diplomatico
                    </span>
                    {item.diplomaticText}
                  </div>
                </div>
              </button>
            </div>
            <div className="mt-auto flex items-center justify-between pt-1">
              <div className="flex flex-wrap gap-1">
                <span
                  className="rounded-[var(--radius-chip)] px-2 py-0.5 text-[10px]"
                  style={{ background: "var(--bg-surface-3)", color: "var(--text-secondary)" }}
                >
                  {item.toneCategory}
                </span>
                <span
                  className="rounded-[var(--radius-chip)] px-2 py-0.5 text-[10px]"
                  style={{ background: "var(--bg-surface-3)", color: "var(--text-secondary)" }}
                >
                  {item.intensityLevel}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleLike(item.id)}
                className="press inline-flex items-center gap-1 rounded-[var(--radius-chip)] border px-2 py-1 text-xs"
                style={{ borderColor: "var(--border-strong)", color: "var(--text-primary)" }}
              >
                ❤️ {item.likesCount}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
