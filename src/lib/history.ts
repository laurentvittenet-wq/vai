import type { Mode } from "./modes";
import type { ToneId } from "./tones";
import type { IntensityLevel } from "./intensity";

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
    const res = await fetch("/api/history");
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.items) ? data.items : [];
  } catch {
    return [];
  }
}

export async function clearHistoryRemote(): Promise<void> {
  try {
    await fetch("/api/history", { method: "DELETE" });
  } catch {
    // Non-blocking: the UI already clears locally.
  }
}
