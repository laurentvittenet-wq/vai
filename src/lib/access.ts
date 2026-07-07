import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const DEFAULT_ACCESS_CODE = "160374";
const DEFAULT_SESSION_SECRET = "diplomatico-default-secret-change-me";

export const SESSION_COOKIE_NAME = "diplomatico_session";

/**
 * Single source of truth for the current access code. Env-based for now;
 * swap the body for a DB lookup once the admin page manages it.
 */
export function getAccessCode(): string {
  return process.env.ACCESS_CODE || DEFAULT_ACCESS_CODE;
}

function getSigningSecret(): string {
  return process.env.SESSION_SECRET || DEFAULT_SESSION_SECRET;
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export function isValidAccessCode(code: string): boolean {
  return /^\d{6}$/.test(code) && safeEqual(code, getAccessCode());
}

/** Deterministic session token tied to the signing secret — not forgeable without it. */
export function getExpectedSessionToken(): string {
  return createHmac("sha256", getSigningSecret()).update("diplomatico-session").digest("hex");
}

export async function hasValidSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return false;
  return safeEqual(token, getExpectedSessionToken());
}
