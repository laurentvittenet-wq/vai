import { createClient } from "@/lib/supabase/server";
import { LoginPage } from "@/components/LoginPage";
import { DiplomaticoApp } from "@/components/DiplomaticoApp";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ auth_error?: string }>;
}) {
  const { auth_error } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <LoginPage authError={Boolean(auth_error)} />;
  }

  return <DiplomaticoApp userEmail={user.email ?? ""} />;
}
