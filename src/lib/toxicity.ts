export interface ToxicityLevel {
  score: number;
  label: string;
  color: string;
}

export const TOXICITY_LEVELS: ToxicityLevel[] = [
  { score: 1, label: "Agacement poli", color: "#00E676" },
  { score: 2, label: "Tendu", color: "#A3E635" },
  { score: 3, label: "Agressif", color: "#FACC15" },
  { score: 4, label: "Toxique", color: "#FB923C" },
  { score: 5, label: "Faute professionnelle", color: "#FF3B3B" },
];

export function getToxicityLevel(score: number): ToxicityLevel | undefined {
  return TOXICITY_LEVELS.find((level) => level.score === score);
}
