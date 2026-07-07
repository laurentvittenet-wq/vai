import { getSupabaseClient } from "@/lib/supabase";
import type { HistoryItem } from "@/lib/history";

export const runtime = "nodejs";

const MAX_ITEMS = 30;

interface HistoryRow {
  id: string;
  mode: string;
  tone: string;
  intensity: string;
  input: string;
  output: string;
  created_at: string;
}

function toHistoryItem(row: HistoryRow): HistoryItem {
  return {
    id: row.id,
    mode: row.mode as HistoryItem["mode"],
    tone: row.tone as HistoryItem["tone"],
    intensity: row.intensity as HistoryItem["intensity"],
    input: row.input,
    output: row.output,
    createdAt: new Date(row.created_at).getTime(),
  };
}

export async function GET() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return Response.json({ items: [] as HistoryItem[] });
  }

  const { data, error } = await supabase
    .from("history_items")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(MAX_ITEMS);

  if (error) {
    console.error("Failed to load history", error);
    return Response.json({ error: "Impossible de charger l'historique." }, { status: 502 });
  }

  return Response.json({ items: (data as HistoryRow[]).map(toHistoryItem) });
}

export async function DELETE() {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return Response.json({ ok: true });
  }

  const { error } = await supabase
    .from("history_items")
    .delete()
    .not("id", "is", null);

  if (error) {
    console.error("Failed to clear history", error);
    return Response.json({ error: "Impossible de vider l'historique." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
