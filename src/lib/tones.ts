export type ToneId =
  | "serieux"
  | "drole"
  | "sarcastique"
  | "chirurgical"
  | "decale"
  | "journalistique";

export interface Tone {
  id: ToneId;
  label: { fr: string; en: string };
  description: { fr: string; en: string };
}

export const TONES: Tone[] = [
  {
    id: "serieux",
    label: { fr: "Sérieux", en: "Serious" },
    description: {
      fr: "Ton posé, factuel et professionnel, sans humour.",
      en: "Calm, factual and professional tone, no humor.",
    },
  },
  {
    id: "drole",
    label: { fr: "Drôle", en: "Funny" },
    description: {
      fr: "Une touche d'humour léger et bienveillant.",
      en: "A touch of light, good-natured humor.",
    },
  },
  {
    id: "sarcastique",
    label: { fr: "Sarcastique", en: "Sarcastic" },
    description: {
      fr: "Ironie fine et élégante, jamais blessante ni insultante.",
      en: "Sharp, elegant irony, never hurtful or insulting.",
    },
  },
  {
    id: "chirurgical",
    label: { fr: "Chirurgical", en: "Surgical" },
    description: {
      fr: "Direct, précis, minimal, sans fioriture.",
      en: "Direct, precise, minimal, no frills.",
    },
  },
  {
    id: "decale",
    label: { fr: "Décalé", en: "Quirky" },
    description: {
      fr: "Formulation originale et inattendue, tout en restant claire.",
      en: "Original, unexpected phrasing, while staying clear.",
    },
  },
  {
    id: "journalistique",
    label: { fr: "Journalistique", en: "Journalistic" },
    description: {
      fr: "Neutre, factuel, structuré comme une dépêche de presse.",
      en: "Neutral, factual, structured like a press wire.",
    },
  },
];

export function getTone(id: string | undefined): Tone | undefined {
  return TONES.find((tone) => tone.id === id);
}
