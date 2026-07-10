export type ToneId =
  | "serieux"
  | "drole"
  | "sarcastique"
  | "chirurgical"
  | "decale"
  | "journalistique"
  | "passif_agressif_elegant"
  | "poetique"
  | "crise_contractuel"
  | "didactique";

export interface Tone {
  id: ToneId;
  label: { fr: string; en: string };
  description: { fr: string; en: string };
}

export const TONES: Tone[] = [
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
    id: "didactique",
    label: { fr: "Didactique", en: "Didactic" },
    description: {
      fr: "Explique pas à pas, pédagogique et clair, comme pour transmettre un savoir sans jamais infantiliser.",
      en: "Explains step by step, clear and pedagogical, like passing on knowledge without ever being condescending.",
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
    id: "crise_contractuel",
    label: { fr: "Gestion de crise", en: "Crisis management" },
    description: {
      fr: "Ton totalement froid, factuel et juridiquement prudent : aucun engagement de responsabilité contractuelle, on désamorce le conflit sans rien concéder sur le fond.",
      en: "Fully cold, factual and legally cautious tone: no admission of contractual liability, defuses the conflict without conceding anything on substance.",
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
  {
    id: "passif_agressif_elegant",
    label: { fr: "Passif-agressif élégant", en: "Elegant passive-aggressive" },
    description: {
      fr: "Poli en surface, l'agacement se devine entre les lignes, jamais dit frontalement.",
      en: "Polite on the surface, the irritation shows between the lines, never stated head-on.",
    },
  },
  {
    id: "poetique",
    label: { fr: "Poétique", en: "Poetic" },
    description: {
      fr: "Langage imagé, métaphores et rythme : on dit les choses avec grâce et sensibilité, sans jamais perdre le fond.",
      en: "Imagery-rich language, metaphors and rhythm: things are said with grace and sensitivity, without ever losing the substance.",
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
    id: "serieux",
    label: { fr: "Sérieux", en: "Serious" },
    description: {
      fr: "Ton posé, factuel et professionnel, sans humour.",
      en: "Calm, factual and professional tone, no humor.",
    },
  },
];

export function getTone(id: string | undefined): Tone | undefined {
  return TONES.find((tone) => tone.id === id);
}
