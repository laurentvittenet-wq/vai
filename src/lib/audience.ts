export type AudienceLevel = "pair" | "superieur";

export interface Audience {
  id: AudienceLevel;
  label: string;
  description: string;
}

export const AUDIENCES: Audience[] = [
  {
    id: "pair",
    label: "Collègue",
    description: "Coopération et horizontalité : on parle d'égal à égal, esprit d'équipe.",
  },
  {
    id: "superieur",
    label: "Client",
    description: "Diplomatie absolue : formalisme, déférence et respect des codes corporate.",
  },
];

export const DEFAULT_AUDIENCE: AudienceLevel = "pair";

export function getAudience(id: string | undefined): Audience | undefined {
  return AUDIENCES.find((audience) => audience.id === id);
}
