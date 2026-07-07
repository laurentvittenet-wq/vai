export type AudienceLevel = "subordonne" | "pair" | "superieur";

export interface Audience {
  id: AudienceLevel;
  label: string;
  description: string;
}

export const AUDIENCES: Audience[] = [
  {
    id: "subordonne",
    label: "Collaborateur",
    description: "Clarté et leadership bienveillant : on donne une direction sans écraser.",
  },
  {
    id: "pair",
    label: "Pair / Collègue",
    description: "Coopération et horizontalité : on parle d'égal à égal, esprit d'équipe.",
  },
  {
    id: "superieur",
    label: "N+2 / Client",
    description: "Diplomatie absolue : formalisme, déférence et respect des codes corporate.",
  },
];

export const DEFAULT_AUDIENCE: AudienceLevel = "pair";

export function getAudience(id: string | undefined): Audience | undefined {
  return AUDIENCES.find((audience) => audience.id === id);
}
