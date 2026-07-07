import { hasValidSession } from "@/lib/access";
import { AccessCodePage } from "@/components/AccessCodePage";
import { InformationsPage } from "@/components/InformationsPage";

export default async function Informations() {
  const authed = await hasValidSession();

  if (!authed) {
    return <AccessCodePage />;
  }

  return <InformationsPage />;
}
