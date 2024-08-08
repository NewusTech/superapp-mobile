import { Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Typography, View } from "@/components";

export default function InitialScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleTncPress = () => {
    router.push("/public-screen/screen-tnc");
  };
  const handlePpPress = () => {
    router.push("/public-screen/privacy-policy");
  };

  return (
    <View
      backgroundColor="paper"
      style={[
        style.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <Image
        source={require("@/assets/images/adaptive-icon.png")}
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
      <Typography
        fontFamily="Poppins-Regular"
        color="textsecondary"
        fontSize={12}
        style={{ margin: 20, marginTop: "auto", textAlign: "center" }}
      >
        By using this app, you agree to Ramatranz{" "}
        <Typography
          fontFamily="Poppins-Bold"
          color="main"
          fontSize={12}
          onPress={handleTncPress}
        >
          {" "}
          Terms and Conditions{" "}
        </Typography>{" "}
        and acknowledge that you have read and understood our{" "}
        <Typography
          fontFamily="Poppins-Bold"
          color="main"
          fontSize={12}
          onPress={handlePpPress}
        >
          {" "}
          Privacy Policy.
        </Typography>
      </Typography>
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
    width: 350,
    height: 190,
    marginTop: "auto",
  },
  content: {
    margin: 10,
    marginHorizontal: 24,
    gap: 16,
  },
});
