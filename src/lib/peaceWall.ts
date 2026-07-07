export interface PeaceWallItem {
  id: string;
  scudText: string;
  diplomaticText: string;
  toneCategory: string;
  intensityLevel: string;
  likesCount: number;
  createdAt: number;
}

export interface SharePeaceWallInput {
  scudText: string;
  diplomaticText: string;
  toneCategory: string;
  intensityLevel: string;
}

export async function fetchPeaceWall(): Promise<PeaceWallItem[]> {
  try {
    const res = await fetch("/api/peace-wall");
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.items) ? data.items : [];
  } catch {
    return [];
  }
}

export async function sharePeaceWallItem(input: SharePeaceWallInput): Promise<boolean> {
  try {
    const res = await fetch("/api/peace-wall", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function likePeaceWallItem(id: string): Promise<number | null> {
  try {
    const res = await fetch(`/api/peace-wall/${encodeURIComponent(id)}/like`, {
      method: "PATCH",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.likesCount === "number" ? data.likesCount : null;
  } catch {
    return null;
  }
}
