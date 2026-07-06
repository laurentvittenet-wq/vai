export type Mode = "reformulate" | "reply";

export function isMode(value: unknown): value is Mode {
  return value === "reformulate" || value === "reply";
}
