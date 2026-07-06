import type { Mode } from "./modes";
import type { ToneId } from "./tones";

export interface HistoryItem {
  id: string;
  mode: Mode;
  tone: ToneId;
  input: string;
  output: string;
  createdAt: number;
}

const STORAGE_KEY = "diplomatico:history";
const MAX_ITEMS = 30;

export function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHistory(items: HistoryItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
}

export function addHistoryItem(
  items: HistoryItem[],
  item: Omit<HistoryItem, "id" | "createdAt">
): HistoryItem[] {
  const next: HistoryItem[] = [
    { ...item, id: crypto.randomUUID(), createdAt: Date.now() },
    ...items,
  ].slice(0, MAX_ITEMS);
  saveHistory(next);
  return next;
}

export function clearHistory(): HistoryItem[] {
  saveHistory([]);
  return [];
}
