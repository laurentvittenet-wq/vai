import { AuthGate } from "@/components/AuthGate";
import { InformationsPage } from "@/components/InformationsPage";

export default function Informations() {
  return (
    <AuthGate>
      <InformationsPage />
    </AuthGate>
  );
}
