import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useNavigation, useRouter } from "expo-router";

import { Loader, View } from "@/components";
import { useGetProfile } from "@/features/auth/api/useGetProfile";
import { useAuthActions } from "@/features/auth/store/auth-store";
import { getItem } from "@/libs/async-storage";

export default function InitialScreen() {
  const router = useRouter();
  const navigation = useNavigation<any>();

  const { setAccessToken, setProfile } = useAuthActions();

  const profileQuery = useGetProfile();

  useEffect(() => {
    const initAuth = async () => {
      const storageAccessToken = await getItem("accesstoken");

      if (storageAccessToken) {
        setAccessToken(storageAccessToken);
      } else {
        router.replace("/auth/initial");
      }
    };

    initAuth();
  }, [router, setAccessToken]);

  useEffect(() => {
    if (profileQuery.data) {
      navigation.reset({
        index: 0,
        routes: [{ name: "(authenticated)" }],
      });
      setProfile(profileQuery.data.data);
    } else if (profileQuery.error) {
      setAccessToken(null);
      router.replace("/auth/initial");
    }
  }, [
    profileQuery.data,
    profileQuery.error,
    router,
    navigation,
    setAccessToken,
    setProfile,
  ]);

  return (
    <View style={style.container}>
      <Loader />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
