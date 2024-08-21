import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ImageProps,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Typography, View } from "@/components";
import {
  IconBedroom,
  IconChevronLeft,
  IconDimensions,
  IconStar,
} from "@/components/icons";
import RenderImg from "@/components/image/RenderImg";
import PartialFasilitas from "@/components/penginapan/PartialFasilitas";
import PartialKebijakan from "@/components/penginapan/PartialKebijakan";
import PartialLokasi from "@/components/penginapan/PartialLokasi";
import PartialsTentang from "@/components/penginapan/PartialsTentang";
import { useAppTheme } from "@/context/theme-context";
import { formatCurrency } from "@/utils/common";

export const PenginapanlImgDump: { imgUrl: ImageProps["source"] }[] = [
  { imgUrl: require("@/assets/images/penginapan/penginapan1.png") },
  { imgUrl: require("@/assets/images/penginapan/penginapan2.png") },
  { imgUrl: require("@/assets/images/penginapan/penginapan3.png") },
  { imgUrl: require("@/assets/images/penginapan/penginapan1.png") },
];

export default function DetailPenginapan() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const paddingHorizontal = 20;

  const [activeImg, setActiveImg] = useState<any>();
  const [activePopupImg, setActivePopupImg] = useState(false);

  const { Colors } = useAppTheme();

  const handleSelectedImg = (url: any) => {
    setActiveImg(url);
    setActivePopupImg(true);
  };

  const handleViewAllImage = () => {
    router.navigate("/penginapan/list-penginapan-image");
  };

  const handleLanjutPemesanan = () => {
    router.navigate("/penginapan/pesan-penginapan");
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.paper }}>
      <ScrollView>
        <View
          backgroundColor="paper"
          style={[
            style.container,
            { paddingTop: insets.top, paddingBottom: 20 },
          ]}
        >
          <View
            style={{
              height: "auto",
              gap: 5,
            }}
          >
            <View
              style={{
                position: "absolute",
                zIndex: 2,
                width: "100%",
                height: 40,
                padding: 10,
              }}
            >
              <Pressable
                style={{
                  backgroundColor: "white",
                  width: 26,
                  height: 26,
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => router.back()}
              >
                <IconChevronLeft height={21} width={21} />
              </Pressable>
            </View>
            <FlatList
              scrollEnabled={false}
              data={PenginapanlImgDump.slice(0, 1)} // Only render the main image
              renderItem={({ item }) => (
                <RenderImg
                  imgUrl={item.imgUrl}
                  height={200}
                  width={"100%"}
                  onPressImg={() => handleSelectedImg(item.imgUrl)}
                />
              )}
              style={style.mainImageContainer}
            />
            <FlatList
              horizontal
              scrollEnabled={false}
              data={PenginapanlImgDump.slice(0, 3)} // Only render the main image
              renderItem={({ item, index }) =>
                index === 2 ? (
                  <ImageBackground
                    source={PenginapanlImgDump.slice(0, -1)[0].imgUrl}
                    style={{
                      height: 120,
                      width: Dimensions.get("window").width / 3.07,
                    }}
                  >
                    <TouchableWithoutFeedback onPress={handleViewAllImage}>
                      <Typography
                        fontFamily="Poppins-Medium"
                        fontSize={14}
                        style={{
                          backgroundColor: "rgba(255 255 255 / 0.8)",
                          height: "100%",
                          width: "100%",
                          alignItems: "center",
                          textAlignVertical: "center",
                          textAlign: "center",
                        }}
                      >
                        2+ Lainnya
                      </Typography>
                    </TouchableWithoutFeedback>
                  </ImageBackground>
                ) : (
                  <RenderImg
                    height={120}
                    width={Dimensions.get("window").width / 3.07}
                    imgUrl={item.imgUrl}
                    onPressImg={() => handleSelectedImg(item.imgUrl)}
                  />
                )
              }
              contentContainerStyle={{ gap: 5 }}
              style={style.detailImageContainer}
            />
          </View>
        </View>
        {/* content */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: paddingHorizontal,
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Typography
              fontFamily="OpenSans-Bold"
              fontSize={16}
              numberOfLines={1}
            >
              Podomoro Golf View
            </Typography>
            <Typography
              fontFamily="OpenSans-Regular"
              fontSize={12}
              numberOfLines={1}
              color="quarternary"
            >
              Bogor, Jawa Barat
            </Typography>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: 20,
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <IconBedroom color="quarternary" />
                <Typography
                  fontFamily="OpenSans-Regular"
                  fontSize={12}
                  numberOfLines={1}
                  color="quarternary"
                >
                  2 Kamar
                </Typography>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <IconDimensions color="quarternary" />
                <View style={{ flexDirection: "row" }}>
                  <Typography
                    fontFamily="OpenSans-Regular"
                    fontSize={12}
                    numberOfLines={1}
                    color="quarternary"
                  >
                    36 m
                  </Typography>
                  <Typography
                    fontFamily="OpenSans-Regular"
                    fontSize={8}
                    style={{
                      textAlignVertical: "top",
                      position: "relative",
                      top: -2,
                    }}
                  >
                    2
                  </Typography>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 2,
              marginTop: 2,
              alignContent: "center",
            }}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <IconStar
                key={index}
                height={14}
                width={14}
                color={index < 5 ? "yellow" : "textsecondary"} // warna kuning untuk bintang aktif, abu-abu untuk bintang non-aktif
              />
            ))}
            <Typography
              fontFamily="OpenSans-Regular"
              fontSize={12}
              numberOfLines={1}
              color="quarternary"
            >
              (4,5)
            </Typography>
          </View>
        </View>
        <View
          style={{
            height: 7,
            backgroundColor: Colors.quarternary,
            marginVertical: 20,
            opacity: 0.1,
          }}
        />
        {/* Fasilitas */}
        <PartialFasilitas />
        <View
          style={{
            height: 7,
            backgroundColor: Colors.quarternary,
            marginVertical: 20,
            opacity: 0.1,
          }}
        />
        {/* Lokasi */}
        <PartialLokasi />
        <View
          style={{
            height: 7,
            backgroundColor: Colors.quarternary,
            marginVertical: 20,
            opacity: 0.1,
          }}
        />
        {/* Kebijakan */}
        <PartialKebijakan />
        <View
          style={{
            height: 7,
            backgroundColor: Colors.quarternary,
            marginVertical: 20,
            opacity: 0.1,
          }}
        />
        {/* Tentang */}
        <PartialsTentang />
      </ScrollView>
      <View
        style={[
          style.bottomContainer,
          {
            paddingBottom: 24 + insets.bottom,
            borderColor: Colors.outlineborder,
          },
        ]}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Typography fontFamily="OpenSans-Semibold" fontSize={16} color="main">
            {formatCurrency(500000)}
          </Typography>
          <Typography
            fontFamily="OpenSans-Regular"
            fontSize={14}
            color="textsecondary"
          >
            /malam
          </Typography>
        </View>
        <View style={{ flex: 1 }}>
          <Button disabled={false} onPress={handleLanjutPemesanan}>
            Pilih
          </Button>
        </View>
      </View>
      {/* Modal Foto */}
      <Modal
        animationType="fade"
        visible={activePopupImg}
        onRequestClose={() => setActivePopupImg(false)}
      >
        <TouchableWithoutFeedback onPress={() => setActivePopupImg(false)}>
          <BlurView
            intensity={100}
            blurReductionFactor={100}
            experimentalBlurMethod="dimezisBlurView"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <View
              style={{
                backgroundColor: "red",
                width: "auto",
                height: 210,
                marginHorizontal: 25,
                marginVertical: "auto",
                overflow: "hidden",
                borderRadius: 10,
              }}
            >
              <Image
                source={activeImg}
                style={{ height: "100%", width: "100%" }}
              />
            </View>
          </BlurView>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailImageContainer: {
    width: "100%",
    flexDirection: "row",
  },
  mainImageContainer: {
    backgroundColor: "transparent",
  },
  containerPopup: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    shadowRadius: 1,
    overflow: "hidden",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    borderTopWidth: 1,
  },
});
