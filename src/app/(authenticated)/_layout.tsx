import { useEffect } from "react";
import { Stack, useRouter } from "expo-router";

import { useAccessToken } from "@/features/auth/store/auth-store";

export default function AuthenticatedLayout() {
  const router = useRouter();

  const accessToken = useAccessToken();

  useEffect(() => {
    if (!accessToken) {
      router.replace("/auth/initial");
    }
  }, [accessToken, router]);

  if (!accessToken) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
