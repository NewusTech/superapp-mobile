import {
  Dimensions,
  Image,
  Linking,
  Pressable,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, Typography, View } from "@/components";
import { PromoItem } from "@/components/promo-item/PromoItem";
import { useAppTheme } from "@/context/theme-context";

export default function NewPackageScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { Colors } = useAppTheme();

  const handloToWa = () => {
    Linking.openURL(`http://api.whatsapp.com/send?phone=+6281315395019`);
  };

  return (
    <View backgroundColor="paper" style={{ flex: 1 }}>
      <ScrollView stickyHeaderIndices={[0]}>
        <Appbar
          title="Paket"
          hasBorder={false}
          backIconPress={() => router.back()}
        />
        <View
          style={{
            width: "100%",
            padding: 20,
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <PromoItem
            imgUrl={require("@/assets/images/promo/4.png")}
            width={Dimensions.get("window").width - 40}
            borderRadius={20}
          />
        </View>
        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              marginBottom: 20,
              alignItems: "center",
            }}
          >
            <Image source={require("@/assets/images/delivery-truck.png")} />
            <Typography fontFamily="Poppins-Bold" fontSize={18}>
              Lampung - Palembang
            </Typography>
          </View>
          <Typography fontFamily="Poppins-Medium" fontSize={14}>
            • Pengiriman: Antar ke loket
          </Typography>
          <Typography fontFamily="Poppins-Medium" fontSize={14}>
            • Penerimaan: Ambil di loket tujuan
          </Typography>
          <Typography fontFamily="Poppins-Medium" fontSize={14}>
            • Jadwal: Mengikuti jadwal keberangkatan travel
          </Typography>
        </View>
        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              marginBottom: 20,
              alignItems: "center",
            }}
          >
            <Image source={require("@/assets/images/home-delivery.png")} />
            <Typography fontFamily="Poppins-Bold" fontSize={18}>
              Lampung - Jakarta
            </Typography>
          </View>
          <Typography fontFamily="Poppins-Medium" fontSize={14}>
            • Pengiriman: Antar ke loket
          </Typography>
          <Typography fontFamily="Poppins-Medium" fontSize={14}>
            • Penerimaan: Diantar ke alamat penerima
          </Typography>
          <Typography fontFamily="Poppins-Medium" fontSize={14}>
            • Jadwal: Hanya keberangkatan malam hari
          </Typography>
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          height: 90,
          padding: 20,
          gap: 5,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#938CFF",
        }}
      >
        <Typography fontFamily="Poppins-Medium" fontSize={14} color="paper">
          Silahkan hubungi admin kami
        </Typography>
        <Pressable
          style={{ flexDirection: "row", gap: 10 }}
          onPress={handloToWa}
        >
          <Image source={require("@/assets/images/phone-call 1.png")} />
          <Typography fontFamily="Poppins-Medium" fontSize={14} color="paper">
            +6281315395019
          </Typography>
        </Pressable>
      </View>
    </View>
  );
}
