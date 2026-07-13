import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Validates the Supabase access token sent by the client and returns the user
 * plus a Supabase client scoped to that token — so RLS policies relying on
 * auth.uid() (per-user data isolation) are actually enforced. Returns null if
 * the request isn't authenticated.
 */
export async function getAuthenticatedContext(
  request: Request
): Promise<{ user: { id: string }; supabase: SupabaseClient } | null> {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return null;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;

  return { user: data.user, supabase };
}
