import { Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, View } from "@/components";

export default function InitialScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      backgroundColor="paper"
      style={[
        style.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <Image
        source={require("@/assets/images/logo-rama.png")}
        style={style.logo}
      />

      <View style={style.content}>
        <Button
          variant="secondary"
          onPress={() => router.push("/auth/register")}
        >
          Daftar
        </Button>
        <Button onPress={() => router.push("/auth/login")}>Masuk</Button>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    marginHorizontal: "auto",
    width: 192,
    height: 192,
  },
  content: {
    margin: 45,
    marginHorizontal: 24,
    gap: 16,
  },
});
