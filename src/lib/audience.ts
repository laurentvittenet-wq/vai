export type AudienceLevel = "pair" | "superieur" | "hierarchie" | "ami";

export interface Audience {
  id: AudienceLevel;
  label: string;
  description: string;
}

export const AUDIENCES: Audience[] = [
  {
    id: "ami",
    label: "Ami(e)",
    description: "Un·e pote : ton direct et décontracté, zéro filtre corporate.",
  },
  {
    id: "superieur",
    label: "Client",
    description: "Diplomatie absolue : formalisme, déférence et respect des codes corporate.",
  },
  {
    id: "pair",
    label: "Collègue",
    description: "Coopération et horizontalité : on parle d'égal à égal, esprit d'équipe.",
  },
  {
    id: "hierarchie",
    label: "Hiérarchie",
    description: "Ton manager, ton N+1, ton N+2 : respect de la ligne hiérarchique, sans flagornerie.",
  },
];

export const DEFAULT_AUDIENCE: AudienceLevel = "ami";

export function getAudience(id: string | undefined): Audience | undefined {
  return AUDIENCES.find((audience) => audience.id === id);
}
