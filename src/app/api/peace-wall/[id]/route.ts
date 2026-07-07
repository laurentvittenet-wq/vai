import { getSupabaseClient } from "@/lib/supabase";
import { hasValidSession } from "@/lib/access";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await hasValidSession())) {
    return Response.json({ error: "Accès non autorisé." }, { status: 401 });
  }

  const { id } = await params;

  const supabase = getSupabaseClient();
  if (!supabase) {
    return Response.json({ ok: true });
  }

  const { error } = await supabase.from("peace_wall").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete peace wall item", error);
    return Response.json(
      { error: "Impossible de supprimer cet élément." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
