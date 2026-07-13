export type Mode = "reformulate" | "reply" | "correct";

export function isMode(value: unknown): value is Mode {
  return value === "reformulate" || value === "reply" || value === "correct";
}
