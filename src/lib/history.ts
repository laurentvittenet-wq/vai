import type { Mode } from "./modes";
import type { ToneId } from "./tones";
import type { IntensityLevel } from "./intensity";
import { authFetch } from "./authFetch";

export interface HistoryItem {
  id: string;
  mode: Mode;
  tone: ToneId;
  intensity: IntensityLevel;
  input: string;
  output: string;
  createdAt: number;
}

export async function fetchHistory(): Promise<HistoryItem[]> {
  try {
    const res = await authFetch("/api/history");
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.items) ? data.items : [];
  } catch {
    return [];
  }
}

export async function clearHistoryRemote(): Promise<void> {
  try {
    await authFetch("/api/history", { method: "DELETE" });
  } catch {
    // Non-blocking: the UI already clears locally.
  }
}

export async function deleteHistoryItemRemote(id: string): Promise<void> {
  try {
    await authFetch(`/api/history/${encodeURIComponent(id)}`, { method: "DELETE" });
  } catch {
    // Non-blocking: the UI already removes it locally.
  }
}
