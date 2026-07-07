export type IntensityLevel = "leger" | "modere" | "appuye";

export interface Intensity {
  id: IntensityLevel;
  label: { fr: string; en: string };
  description: { fr: string; en: string };
}

export const INTENSITIES: Intensity[] = [
  {
    id: "leger",
    label: { fr: "Léger", en: "Light" },
    description: {
      fr: "Touche discrète, à peine perceptible.",
      en: "A discreet touch, barely noticeable.",
    },
  },
  {
    id: "modere",
    label: { fr: "Modéré", en: "Moderate" },
    description: {
      fr: "Dosage équilibré, le ton est clairement présent.",
      en: "Balanced dosage, the tone is clearly present.",
    },
  },
  {
    id: "appuye",
    label: { fr: "Appuyé", en: "Strong" },
    description: {
      fr: "Poussé au maximum, assumé sans retenue.",
      en: "Pushed to the max, fully committed.",
    },
  },
];

export const DEFAULT_INTENSITY: IntensityLevel = "modere";

export function getIntensity(id: string | undefined): Intensity | undefined {
  return INTENSITIES.find((i) => i.id === id);
}

export function intensityIndex(id: IntensityLevel): number {
  return INTENSITIES.findIndex((i) => i.id === id);
}
