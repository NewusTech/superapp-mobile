import { Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Typography, View } from "@/components";
import { useAppTheme } from "@/context/theme-context";

export default function DetailWisata() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { Colors } = useAppTheme();
  return (
    <ScrollView>
      <View style={{ flex: 1, flexDirection: "column", gap: 5 }}>
        <Image
          source={require("@/assets/images/default-pariwisata.png")}
          style={{ width: "100%", height: 300, position: "absolute" }}
        />
        <Typography fontFamily="Poppins-Medium" fontSize={14}>
          Wisata Tegal Mas Island
        </Typography>
        <Typography fontFamily="Poppins-Regular" fontSize={14}>
          Tegal Mas Island adalah pulau wisata di Teluk Lampung, Lampung, yang
          terkenal dengan pantai berpasir putih, air laut jernih, dan
          pemandangan alam indah. Pulau ini menawarkan aktivitas snorkeling,
          diving, serta penginapan unik, menjadikannya destinasi favorit untuk
          liburan eksotis yang mudah diakses dari Bandar Lampung
        </Typography>
        <Typography fontFamily="Poppins-Medium" fontSize={14} numberOfLines={2}>
          Nikmati Perjalanan Anda dengan Armada Kami
        </Typography>
      </View>
    </ScrollView>
  );
}
