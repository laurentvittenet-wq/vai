import { getAuthenticatedContext } from "@/lib/authServer";

export const runtime = "nodejs";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthenticatedContext(request);
  if (!auth) {
    return Response.json({ error: "Accès non autorisé." }, { status: 401 });
  }

  const { id } = await params;

  const { error } = await auth.supabase
    .from("peace_wall")
    .delete()
    .eq("id", id)
    .eq("user_id", auth.user.id);

  if (error) {
    console.error("Failed to delete peace wall item", error);
    return Response.json(
      { error: "Impossible de supprimer cet élément." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
