import { Dimensions, FlatList, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, Typography, View } from "@/components";
import { useAppTheme } from "@/context/theme-context";

export default function CaraMemesanTiket() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { Colors } = useAppTheme();

  const dataCaraMemesan = [
    {
      title: "Buka Aplikasi ramatranz.co.od",
      detail:
        "Pilih Bus & Travel di homepage. Lalu, pilih tiket untuk sekali jalan atau pulang pergi.",
      img: "",
    },
    {
      title: "Isi detail perjalanan",
      detail:
        "Pilih Bus & Travel di homepage. Lalu, pilih tiket untuk sekali jalan atau pulang pergi.",
      img: "",
    },
    {
      title: "Pilih travel",
      detail:
        "Pilih Bus & Travel di homepage. Lalu, pilih tiket untuk sekali jalan atau pulang pergi.",
      img: "",
    },
    {
      title: "Check foto, fasilitas dan rute",
      detail:
        "Pilih Bus & Travel di homepage. Lalu, pilih tiket untuk sekali jalan atau pulang pergi.",
      img: "",
    },
    {
      title: "Isi detail pemesanan",
      detail:
        "Pilih Bus & Travel di homepage. Lalu, pilih tiket untuk sekali jalan atau pulang pergi.",
      img: "",
    },
    {
      title: "Lanjut ke pembayaran",
      detail:
        "Pilih Bus & Travel di homepage. Lalu, pilih tiket untuk sekali jalan atau pulang pergi.",
      img: "",
    },
  ];

  return (
    <>
      <Appbar
        title={"Cara memesan travel"}
        backIconPress={() => router.back()}
      />
      <ScrollView
        style={{
          backgroundColor: Colors.paper,
        }}
      >
        <Image
          source={require("@/assets/images/banner_ramatrans.png")}
          style={{
            resizeMode: "stretch",
            width: Dimensions.get("window").width,
            height: 150,
          }}
        />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 20,
          }}
        >
          <FlatList
            scrollEnabled={false}
            data={dataCaraMemesan}
            contentContainerStyle={{
              gap: 20,
            }}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    flexDirection: "column",
                    gap: 10,
                    width: "90%",
                    marginHorizontal: "auto",
                  }}
                >
                  <Image
                    source={require("@/assets/images/elementor-placeholder-image.png")}
                    style={{
                      resizeMode: "stretch",
                      width: 200,
                      height: 120,
                      borderRadius: 10,
                      marginHorizontal: "auto",
                    }}
                  />
                  <Typography
                    fontFamily="Poppins-Bold"
                    fontSize={14}
                    style={{ textAlign: "center" }}
                  >
                    {index + 1}. {item.title}
                  </Typography>
                  <Typography
                    fontFamily="Poppins-Regular"
                    fontSize={12}
                    color="textsecondary"
                    style={{ textAlign: "justify" }}
                  >
                    {item.detail}
                  </Typography>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}
