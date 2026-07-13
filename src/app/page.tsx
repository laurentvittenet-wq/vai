import { AuthGate } from "@/components/AuthGate";
import { DiplomaticoApp } from "@/components/DiplomaticoApp";

export default function Home() {
  return (
    <AuthGate>
      <DiplomaticoApp />
    </AuthGate>
  );
}
