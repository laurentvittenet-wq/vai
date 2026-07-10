export type AudienceLevel = "pair" | "superieur" | "hierarchie" | "ami" | "administration";

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
  {
    id: "hierarchie",
    label: "Hiérarchie",
    description: "Ton manager, ton N+1, ton N+2 : respect de la ligne hiérarchique, sans flagornerie.",
  },
  {
    id: "ami",
    label: "Ami(e)",
    description: "Un·e pote : ton direct et décontracté, zéro filtre corporate.",
  },
  {
    id: "administration",
    label: "Administration",
    description: "Impôts, CAF, sécu... : clarté, précision et formules d'usage administratives.",
  },
];

export const DEFAULT_AUDIENCE: AudienceLevel = "pair";

export function getAudience(id: string | undefined): Audience | undefined {
  return AUDIENCES.find((audience) => audience.id === id);
}
