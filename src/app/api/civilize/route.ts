import { isMode } from "@/lib/modes";
import { buildSystemPrompt } from "@/lib/prompts";
import { getTone, type Tone } from "@/lib/tones";
import { DEFAULT_INTENSITY, getIntensity, type Intensity } from "@/lib/intensity";
import { DEFAULT_AUDIENCE, getAudience, type Audience } from "@/lib/audience";
import { getSupabaseClient } from "@/lib/supabase";
import { hasValidSession } from "@/lib/access";
import type { HistoryItem } from "@/lib/history";

export const runtime = "nodejs";

const MAX_TEXT_LENGTH = 4000;
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

interface CivilizeRequestBody {
  mode?: unknown;
  tone?: unknown;
  intensity?: unknown;
  audience?: unknown;
  text?: unknown;
}

interface AnthropicContentBlock {
  type: string;
  text?: string;
}

interface AnthropicResponse {
  content?: AnthropicContentBlock[];
}

async function persistHistoryItem(
  item: Omit<HistoryItem, "id" | "createdAt">
): Promise<HistoryItem> {
  const supabase = getSupabaseClient();
  const fallback: HistoryItem = { ...item, id: crypto.randomUUID(), createdAt: Date.now() };

  if (!supabase) {
    return fallback;
  }

  const { data, error } = await supabase
    .from("history_items")
    .insert({
      mode: item.mode,
      tone: item.tone,
      intensity: item.intensity,
      input: item.input,
      output: item.output,
    })
    .select("*")
    .single();

  if (error || !data) {
    console.error("Failed to persist history item", error);
    return fallback;
  }

  return {
    id: data.id as string,
    mode: data.mode as HistoryItem["mode"],
    tone: data.tone as HistoryItem["tone"],
    intensity: data.intensity as HistoryItem["intensity"],
    input: data.input as string,
    output: data.output as string,
    createdAt: new Date(data.created_at as string).getTime(),
  };
}

export async function POST(request: Request) {
  if (!(await hasValidSession())) {
    return Response.json({ error: "Accès non autorisé." }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        error:
          "Le service de reformulation n'est pas encore configuré sur le serveur (ANTHROPIC_API_KEY manquante).",
      },
      { status: 500 }
    );
  }

  let body: CivilizeRequestBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const { mode, tone: toneId, intensity: intensityId, audience: audienceId, text } = body;

  if (!isMode(mode)) {
    return Response.json({ error: "Mode invalide." }, { status: 400 });
  }

  let tone: Tone | null = null;
  let intensity: Intensity | null = null;
  let audience: Audience | null = null;

  if (mode !== "correct") {
    tone = getTone(typeof toneId === "string" ? toneId : undefined) ?? null;
    if (!tone) {
      return Response.json({ error: "Tonalité invalide." }, { status: 400 });
    }

    intensity = getIntensity(
      typeof intensityId === "string" ? intensityId : DEFAULT_INTENSITY
    ) ?? null;
    if (!intensity) {
      return Response.json({ error: "Intensité invalide." }, { status: 400 });
    }

    audience = getAudience(
      typeof audienceId === "string" ? audienceId : DEFAULT_AUDIENCE
    ) ?? null;
    if (!audience) {
      return Response.json({ error: "Destinataire invalide." }, { status: 400 });
    }
  }

  if (typeof text !== "string" || !text.trim()) {
    return Response.json({ error: "Le texte est vide." }, { status: 400 });
  }

  if (text.length > MAX_TEXT_LENGTH) {
    return Response.json(
      { error: `Le texte dépasse la limite de ${MAX_TEXT_LENGTH} caractères.` },
      { status: 400 }
    );
  }

  const systemPrompt = buildSystemPrompt(mode, tone, intensity, audience);

  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: "user", content: text }],
      }),
    });

    if (!anthropicRes.ok) {
      const errorBody = await anthropicRes.text();
      console.error("Anthropic API error", anthropicRes.status, errorBody);
      return Response.json(
        { error: "Le service de reformulation est momentanément indisponible." },
        { status: 502 }
      );
    }

    const data = (await anthropicRes.json()) as AnthropicResponse;
    const result = data.content?.find((block) => block.type === "text")?.text ?? "";

    if (!result.trim()) {
      return Response.json(
        { error: "Le service n'a renvoyé aucun résultat exploitable." },
        { status: 502 }
      );
    }

    const trimmedResult = result.trim();
    const historyItem =
      mode !== "correct" && tone && intensity
        ? await persistHistoryItem({
            mode,
            tone: tone.id,
            intensity: intensity.id,
            input: text,
            output: trimmedResult,
          })
        : null;

    return Response.json({ result: trimmedResult, historyItem });
  } catch (err) {
    console.error("Civilize request failed", err);
    return Response.json(
      { error: "Erreur réseau lors de l'appel au service de reformulation." },
      { status: 502 }
    );
  }
}
