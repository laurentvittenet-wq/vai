import { getSupabaseClient } from "@/lib/supabase";
import { getAuthenticatedUser } from "@/lib/authServer";

export const runtime = "nodejs";

const MAX_ITEMS = 60;
const MAX_TEXT_LENGTH = 4000;

interface PeaceWallRow {
  id: string;
  scud_text: string;
  diplomatic_text: string;
  tone_category: string;
  intensity_level: string;
  likes_count: number;
  created_at: string;
}

function toPeaceWallItem(row: PeaceWallRow) {
  return {
    id: row.id,
    scudText: row.scud_text,
    diplomaticText: row.diplomatic_text,
    toneCategory: row.tone_category,
    intensityLevel: row.intensity_level,
    likesCount: row.likes_count,
    createdAt: new Date(row.created_at).getTime(),
  };
}

export async function GET(request: Request) {
  if (!(await getAuthenticatedUser(request))) {
    return Response.json({ error: "Accès non autorisé." }, { status: 401 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return Response.json({ items: [] });
  }

  const { data, error } = await supabase
    .from("peace_wall")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(MAX_ITEMS);

  if (error) {
    console.error("Failed to load peace wall", error);
    return Response.json({ error: "Impossible de charger le mur de la paix." }, { status: 502 });
  }

  return Response.json({ items: (data as PeaceWallRow[]).map(toPeaceWallItem) });
}

interface SharePeaceWallBody {
  scudText?: unknown;
  diplomaticText?: unknown;
  toneCategory?: unknown;
  intensityLevel?: unknown;
}

export async function POST(request: Request) {
  if (!(await getAuthenticatedUser(request))) {
    return Response.json({ error: "Accès non autorisé." }, { status: 401 });
  }

  let body: SharePeaceWallBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const { scudText, diplomaticText, toneCategory, intensityLevel } = body;

  if (typeof scudText !== "string" || !scudText.trim() || scudText.length > MAX_TEXT_LENGTH) {
    return Response.json({ error: "Texte original invalide." }, { status: 400 });
  }
  if (
    typeof diplomaticText !== "string" ||
    !diplomaticText.trim() ||
    diplomaticText.length > MAX_TEXT_LENGTH
  ) {
    return Response.json({ error: "Texte reformulé invalide." }, { status: 400 });
  }
  if (typeof toneCategory !== "string" || !toneCategory.trim()) {
    return Response.json({ error: "Tonalité invalide." }, { status: 400 });
  }
  if (typeof intensityLevel !== "string" || !intensityLevel.trim()) {
    return Response.json({ error: "Intensité invalide." }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return Response.json(
      { error: "Le service de persistance n'est pas configuré." },
      { status: 500 }
    );
  }

  const { error } = await supabase.from("peace_wall").insert({
    scud_text: scudText,
    diplomatic_text: diplomaticText,
    tone_category: toneCategory,
    intensity_level: intensityLevel,
  });

  if (error) {
    console.error("Failed to share peace wall item", error);
    return Response.json({ error: "Impossible de partager sur le mur de la paix." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
