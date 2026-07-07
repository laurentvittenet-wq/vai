import { getSupabaseClient } from "@/lib/supabase";
import { hasValidSession } from "@/lib/access";

export const runtime = "nodejs";

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await hasValidSession())) {
    return Response.json({ error: "Accès non autorisé." }, { status: 401 });
  }

  const { id } = await params;

  const supabase = getSupabaseClient();
  if (!supabase) {
    return Response.json({ error: "Service indisponible." }, { status: 500 });
  }

  const { data: current, error: fetchError } = await supabase
    .from("peace_wall")
    .select("likes_count")
    .eq("id", id)
    .single();

  if (fetchError || !current) {
    return Response.json({ error: "Élément introuvable." }, { status: 404 });
  }

  const nextLikes = (current.likes_count as number) + 1;

  const { data, error } = await supabase
    .from("peace_wall")
    .update({ likes_count: nextLikes })
    .eq("id", id)
    .select("likes_count")
    .single();

  if (error || !data) {
    console.error("Failed to like peace wall item", error);
    return Response.json({ error: "Impossible d'enregistrer le like." }, { status: 502 });
  }

  return Response.json({ likesCount: data.likes_count as number });
}
