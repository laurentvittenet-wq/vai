"use client";

import { useEffect, useState } from "react";
import { fetchPeaceWall, likePeaceWallItem, type PeaceWallItem } from "@/lib/peaceWall";

export function PeaceWallGallery() {
  const [items, setItems] = useState<PeaceWallItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [liking, setLiking] = useState<Set<string>>(new Set());

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

  const toggleReveal = (id: string) => {
    setRevealed((prev) => {
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
        const isRevealed = revealed.has(item.id);
        return (
          <div key={item.id} className="surface-card flex flex-col gap-2.5 rounded-[var(--radius-card)] p-4">
            <div>
              <span
                className="text-[10px] uppercase"
                style={{ fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-caps)", color: "var(--text-tertiary)" }}
              >
                Le scud
              </span>
              <button
                type="button"
                onClick={() => toggleReveal(item.id)}
                title={isRevealed ? "Cliquer pour flouter à nouveau" : "Cliquer pour révéler"}
                className="mt-1 block w-full rounded-[var(--radius-input)] border p-2.5 text-left text-xs"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--bg-surface-3)",
                  color: "var(--text-primary)",
                  filter: isRevealed ? "none" : "blur(5px)",
                  transition: "filter var(--dur-instant) var(--ease-out)",
                }}
              >
                {item.scudText}
              </button>
            </div>
            <div>
              <span
                className="text-[10px] uppercase"
                style={{ fontWeight: "var(--fw-semibold)", letterSpacing: "var(--ls-caps)", color: "var(--accent)" }}
              >
                Version Diplomatico
              </span>
              <p
                className="mt-1 rounded-[var(--radius-input)] border p-2.5 text-xs"
                style={{ borderColor: "var(--border)", background: "var(--bg-surface-2)", color: "var(--text-primary)" }}
              >
                {item.diplomaticText}
              </p>
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
