import { getSupabaseClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const supabase = getSupabaseClient();
  if (!supabase) {
    return Response.json({ ok: true });
  }

  const { error } = await supabase.from("history_items").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete history item", error);
    return Response.json(
      { error: "Impossible de supprimer cet élément." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
