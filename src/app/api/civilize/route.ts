import { isMode } from "@/lib/modes";
import { buildSystemPrompt } from "@/lib/prompts";
import { getTone } from "@/lib/tones";

export const runtime = "nodejs";

const MAX_TEXT_LENGTH = 4000;
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

interface CivilizeRequestBody {
  mode?: unknown;
  tone?: unknown;
  text?: unknown;
}

interface AnthropicContentBlock {
  type: string;
  text?: string;
}

interface AnthropicResponse {
  content?: AnthropicContentBlock[];
}

export async function POST(request: Request) {
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

  const { mode, tone: toneId, text } = body;

  if (!isMode(mode)) {
    return Response.json({ error: "Mode invalide." }, { status: 400 });
  }

  const tone = getTone(typeof toneId === "string" ? toneId : undefined);
  if (!tone) {
    return Response.json({ error: "Tonalité invalide." }, { status: 400 });
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

  const systemPrompt = buildSystemPrompt(mode, tone);

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
        max_tokens: 1024,
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

    return Response.json({ result: result.trim() });
  } catch (err) {
    console.error("Civilize request failed", err);
    return Response.json(
      { error: "Erreur réseau lors de l'appel au service de reformulation." },
      { status: 502 }
    );
  }
}
