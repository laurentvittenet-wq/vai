import { hasValidSession } from "@/lib/access";

export const runtime = "nodejs";

const MAX_TEXT_LENGTH = 4000;
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";

const TOXICITY_SYSTEM_PROMPT = `Tu es un détecteur de toxicité pour des messages professionnels. On te donne un message ; évalue son niveau d'agressivité sur une échelle de 1 à 5 :
1 = agacement poli, 2 = tendu, 3 = agressif, 4 = toxique, 5 = faute professionnelle.
Réponds uniquement par le chiffre correspondant (1, 2, 3, 4 ou 5), sans aucun autre caractère, sans mot, sans ponctuation.`;

interface ToxicityRequestBody {
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
  if (!(await hasValidSession())) {
    return Response.json({ error: "Accès non autorisé." }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Le service d'analyse n'est pas encore configuré sur le serveur." },
      { status: 500 }
    );
  }

  let body: ToxicityRequestBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  const { text } = body;

  if (typeof text !== "string" || !text.trim()) {
    return Response.json({ error: "Le texte est vide." }, { status: 400 });
  }

  if (text.length > MAX_TEXT_LENGTH) {
    return Response.json(
      { error: `Le texte dépasse la limite de ${MAX_TEXT_LENGTH} caractères.` },
      { status: 400 }
    );
  }

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
        max_tokens: 8,
        system: TOXICITY_SYSTEM_PROMPT,
        messages: [{ role: "user", content: text }],
      }),
    });

    if (!anthropicRes.ok) {
      const errorBody = await anthropicRes.text();
      console.error("Anthropic API error", anthropicRes.status, errorBody);
      return Response.json(
        { error: "Le service d'analyse est momentanément indisponible." },
        { status: 502 }
      );
    }

    const data = (await anthropicRes.json()) as AnthropicResponse;
    const rawText = data.content?.find((block) => block.type === "text")?.text ?? "";
    const match = rawText.match(/[1-5]/);

    if (!match) {
      return Response.json(
        { error: "Analyse impossible : réponse inattendue du service." },
        { status: 502 }
      );
    }

    return Response.json({ score: Number(match[0]) });
  } catch (err) {
    console.error("Toxicity request failed", err);
    return Response.json(
      { error: "Erreur réseau lors de l'analyse de toxicité." },
      { status: 502 }
    );
  }
}
