import { Dimensions, Image, ImageBackground, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, TextInput, View } from "@/components";

export default function ForgotPasswordScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View backgroundColor="main" style={style.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("@/assets/images/auth-bg-2.jpeg")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />
      <View
        backgroundColor="paper"
        style={[
          style.contentContainer,
          {
            paddingBottom: insets.bottom + 8,
            minHeight: Dimensions.get("screen").height * (2 / 3),
          },
        ]}
      >
        <View style={style.formContainer}>
          <Image
            source={require("@/assets/images/logo-rama.png")}
            style={style.logo}
          />
          <TextInput
            label="Masukan email yang terdaftar"
            placeholder="Contoh@email.com"
            keyboardType="email-address"
          />
          <Button>Kirim</Button>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginTop: "auto",
    paddingTop: 54,
    paddingHorizontal: 35,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: "center",
  },
  formContainer: {
    gap: 54,
  },
  logo: {
    marginHorizontal: "auto",
    width: 151,
    height: 151,
  },
});
