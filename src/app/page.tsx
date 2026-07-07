import { hasValidSession } from "@/lib/access";
import { AccessCodePage } from "@/components/AccessCodePage";
import { DiplomaticoApp } from "@/components/DiplomaticoApp";

export default async function Home() {
  const authed = await hasValidSession();

  if (!authed) {
    return <AccessCodePage />;
  }

  return <DiplomaticoApp />;
}
