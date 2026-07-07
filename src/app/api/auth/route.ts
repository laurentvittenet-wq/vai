import { NextResponse } from "next/server";
import { isValidAccessCode, getExpectedSessionToken, SESSION_COOKIE_NAME } from "@/lib/access";

export const runtime = "nodejs";

interface AuthRequestBody {
  code?: unknown;
}

export async function POST(request: Request) {
  let body: AuthRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const code = typeof body.code === "string" ? body.code.trim() : "";

  if (!isValidAccessCode(code)) {
    return NextResponse.json({ error: "Code incorrect." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, getExpectedSessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}
