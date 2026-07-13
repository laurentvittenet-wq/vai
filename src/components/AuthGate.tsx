"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/lib/AuthContext";
import { Auth } from "./Auth";

export function AuthGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Auth />;
  return <>{children}</>;
}
