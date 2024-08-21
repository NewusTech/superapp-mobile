import { Image } from "react-native";
import { useRouter } from "expo-router";

import { Appbar, Typography, View } from "@/components";
import PartialPesanan from "@/components/penginapan/PartialPesanan";
import { useAppTheme } from "@/context/theme-context";

export default function PesanPenginapan() {
  const router = useRouter();

  const { Colors } = useAppTheme();
  return (
    <View style={{ flex: 1 }} backgroundColor="paper">
      <Appbar
        title={"Prodomoro Golf View"}
        backgroundColor="paper"
        backIconPress={() => router.back()}
      />
      <View
        style={{
          backgroundColor:
            "linear-gradient(90deg, rgba(7,5,236,1) 0%, rgba(4,3,134,1) 100%)",
          marginHorizontal: 20,
          marginBottom: 40,
          marginTop: 20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          borderBottomRightRadius: 40,
          borderBottomLeftRadius: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 10,
          }}
        >
          <Image source={require("@/assets/images/apartments.png")} />
          <Typography
            fontFamily="Poppins-Medium"
            fontSize={14}
            color="paper"
            style={{ width: "90%" }}
          >
            Pesan sekarang juga!
          </Typography>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderWidth: 0.5,
            borderColor: Colors.textsecondary,
            borderRadius: 20,
            // margin: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
            elevation: 1,
            padding: 20,
          }}
        >
          <PartialPesanan />
        </View>
      </View>
    </View>
  );
}
