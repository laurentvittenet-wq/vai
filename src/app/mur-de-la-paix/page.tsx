import { AuthGate } from "@/components/AuthGate";
import { PeaceWallPage } from "@/components/PeaceWallPage";

export default function MurDeLaPaix() {
  return (
    <AuthGate>
      <PeaceWallPage />
    </AuthGate>
  );
}
