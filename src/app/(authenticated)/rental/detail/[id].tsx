import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ImageProps,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Typography, View } from "@/components";
import { IconChevronLeft } from "@/components/icons";
import RenderImg from "@/components/image/RenderImg";
import { useAppTheme } from "@/context/theme-context";
import {
  useRentActions,
  useRentalCarData,
} from "@/features/rental/store/rental-store";

export const RentalImgDump: { imgUrl: ImageProps["source"] }[] = [
  { imgUrl: require("@/assets/images/rental/rent_car_1.png") },
  { imgUrl: require("@/assets/images/rental/rent_car_2.jpg") },
  { imgUrl: require("@/assets/images/rental/rent_car_3.jpg") },
  { imgUrl: require("@/assets/images/rental/rent_car_4.jpg") },
];

export default function DetailRentalCar() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { Colors } = useAppTheme();

  const [activePopupImg, setActivePopupImg] = useState(false);

  const [activeImg, setActiveImg] = useState<any>();

  const rentalCarData = useRentalCarData();

  const handleSelectedImg = (url: any) => {
    setActiveImg(url);
    setActivePopupImg(true);
  };
  const { setUserRentalPayload } = useRentActions();

  const handleViewAllImage = () => {
    router.navigate("/travel/partials/list-car-image");
  };

  const handleToDetailUserRentcar = () => {
    router.push("/rental/detail-user-rent");
    setUserRentalPayload({
      alamat: "",
      email: "",
      nama: "",
      nik: "",
      no_telp: "",
      username_fb: "",
      username_ig: "",
      image_ktp: "",
      image_swafoto: "",
    });
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
              data={rentalCarData?.images.slice(0, 1)} // Only render the main image
              renderItem={({ item }) => (
                <RenderImg
                  imgUrl={{ uri: item.image_url }}
                  height={200}
                  width={"100%"}
                  onPressImg={() => handleSelectedImg(item.image_url || "")}
                />
              )}
              style={style.mainImageContainer}
            />
            <FlatList
              horizontal
              scrollEnabled={false}
              data={rentalCarData?.images.slice(0, 3)} // Only render the main image
              renderItem={({ item, index }) =>
                index === 2 ? (
                  <ImageBackground
                    source={{
                      uri: rentalCarData?.images.slice(0, -1)[0].image_url,
                    }}
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
                    imgUrl={{ uri: item.image_url }}
                    onPressImg={() => handleSelectedImg(item.image_url)}
                  />
                )
              }
              contentContainerStyle={{ gap: 5 }}
              style={style.detailImageContainer}
            />
          </View>
          <View style={{ padding: 20, marginBottom: 20 }}>
            <Typography fontFamily="Poppins-Bold" fontSize={18}>
              {rentalCarData?.type}
            </Typography>
            <Typography
              fontFamily="Poppins-Regular"
              color="textsecondary"
              fontSize={14}
              style={{ textAlign: "justify" }}
            >
              {rentalCarData?.deskripsi}
            </Typography>
            <Typography
              fontFamily="Poppins-Bold"
              fontSize={16}
              style={{ marginVertical: 10 }}
            >
              Spesifikasi
            </Typography>
            <View style={{ flexDirection: "column" }}>
              {/* col 1 */}
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: Colors.textsecondary,
                  flexDirection: "row",
                }}
              >
                <Typography
                  fontFamily="Poppins-Medium"
                  fontSize={16}
                  style={{
                    marginVertical: 10,
                    width: Dimensions.get("window").width / 2.5,
                  }}
                >
                  Body
                </Typography>
                <Typography
                  fontFamily="Poppins-Bold"
                  fontSize={16}
                  style={{
                    marginVertical: 10,
                    width: 10,
                    marginHorizontal: 10,
                  }}
                >
                  :
                </Typography>
                <Typography
                  fontFamily="Poppins-Regular"
                  fontSize={16}
                  color="textsecondary"
                  style={{
                    marginVertical: 10,
                    width: "100%",
                  }}
                >
                  -
                </Typography>
              </View>
              {/* col 2 */}
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: Colors.textsecondary,
                  flexDirection: "row",
                }}
              >
                <Typography
                  fontFamily="Poppins-Medium"
                  fontSize={16}
                  style={{
                    marginVertical: 10,
                    width: Dimensions.get("window").width / 2.5,
                  }}
                >
                  BBM
                </Typography>
                <Typography
                  fontFamily="Poppins-Bold"
                  fontSize={16}
                  style={{
                    marginVertical: 10,
                    width: 10,
                    marginHorizontal: 10,
                  }}
                >
                  :
                </Typography>
                <Typography
                  fontFamily="Poppins-Regular"
                  fontSize={16}
                  color="textsecondary"
                  style={{
                    marginVertical: 10,
                    width: "100%",
                  }}
                >
                  {rentalCarData?.bahan_bakar}
                </Typography>
              </View>
              {/* col 3 */}
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: Colors.textsecondary,
                  flexDirection: "row",
                }}
              >
                <Typography
                  fontFamily="Poppins-Medium"
                  fontSize={16}
                  style={{
                    marginVertical: 10,
                    width: Dimensions.get("window").width / 2.5,
                  }}
                >
                  Seat
                </Typography>
                <Typography
                  fontFamily="Poppins-Bold"
                  fontSize={16}
                  style={{
                    marginVertical: 10,
                    width: 10,
                    marginHorizontal: 10,
                  }}
                >
                  :
                </Typography>
                <Typography
                  fontFamily="Poppins-Regular"
                  fontSize={16}
                  color="textsecondary"
                  style={{
                    marginVertical: 10,
                    width: "100%",
                  }}
                >
                  {rentalCarData?.jumlah_kursi} Kursi
                </Typography>
              </View>
              {/* col 4 */}
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: Colors.textsecondary,
                  flexDirection: "row",
                }}
              >
                <Typography
                  fontFamily="Poppins-Medium"
                  fontSize={16}
                  style={{
                    marginVertical: 10,
                    width: Dimensions.get("window").width / 2.5,
                  }}
                >
                  Mesin
                </Typography>
                <Typography
                  fontFamily="Poppins-Bold"
                  fontSize={16}
                  style={{
                    marginVertical: 10,
                    width: 10,
                    marginHorizontal: 10,
                  }}
                >
                  :
                </Typography>
                <Typography
                  fontFamily="Poppins-Regular"
                  fontSize={16}
                  color="textsecondary"
                  style={{
                    marginVertical: 10,
                    width: "100%",
                  }}
                >
                  {rentalCarData?.mesin}
                </Typography>
              </View>
              {/* col 5 */}
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: Colors.textsecondary,
                  flexDirection: "row",
                }}
              >
                <Typography
                  fontFamily="Poppins-Medium"
                  fontSize={16}
                  style={{
                    marginVertical: 10,
                    width: Dimensions.get("window").width / 2.5,
                  }}
                >
                  Bagasi
                </Typography>
                <Typography
                  fontFamily="Poppins-Bold"
                  fontSize={16}
                  style={{
                    marginVertical: 10,
                    width: 10,
                    marginHorizontal: 10,
                  }}
                >
                  :
                </Typography>
                <Typography
                  fontFamily="Poppins-Regular"
                  fontSize={16}
                  color="textsecondary"
                  style={{
                    marginVertical: 10,
                    width: "100%",
                  }}
                >
                  {`${rentalCarData?.bagasi} ${rentalCarData?.kapasitas_bagasi}`}
                </Typography>
              </View>
              {/* col 6 */}
              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: Colors.textsecondary,
                  flexDirection: "row",
                }}
              >
                <Typography
                  fontFamily="Poppins-Medium"
                  fontSize={16}
                  style={{
                    marginVertical: 10,
                    width: Dimensions.get("window").width / 2.5,
                  }}
                >
                  Transmisi
                </Typography>
                <Typography
                  fontFamily="Poppins-Bold"
                  fontSize={16}
                  style={{
                    marginVertical: 10,
                    width: 10,
                    marginHorizontal: 10,
                  }}
                >
                  :
                </Typography>
                <Typography
                  fontFamily="Poppins-Regular"
                  fontSize={16}
                  color="textsecondary"
                  style={{
                    marginVertical: 10,
                    width: "100%",
                  }}
                >
                  {rentalCarData?.transmisi}
                </Typography>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{ padding: 20 }}>
        <Button onPress={handleToDetailUserRentcar}>
          Rental Mobil Sekarang
        </Button>
      </View>
      {/* // Modal Foto */}
      {activePopupImg && (
        <View style={style.containerPopup}>
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
                  width: "auto",
                  height: 210,
                  marginHorizontal: 25,
                  marginVertical: "auto",
                  overflow: "hidden",
                  borderRadius: 10,
                }}
              >
                <Image
                  source={{
                    uri: activeImg,
                  }}
                  style={{ height: "100%" }}
                />
              </View>
            </BlurView>
          </TouchableWithoutFeedback>
        </View>
      )}
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
});
