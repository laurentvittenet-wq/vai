import { hasValidSession } from "@/lib/access";
import { AccessCodePage } from "@/components/AccessCodePage";
import { PeaceWallPage } from "@/components/PeaceWallPage";

export default async function MurDeLaPaix() {
  const authed = await hasValidSession();

  if (!authed) {
    return <AccessCodePage />;
  }

  return <PeaceWallPage />;
}
