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

export const RentalImgDump: { imgUrl: ImageProps["source"] }[] = [
  { imgUrl: require("@/assets/images/default_rent_car_2.png") },
  { imgUrl: require("@/assets/images/default_rent_car_2.png") },
  { imgUrl: require("@/assets/images/default_rent_car_2.png") },
  { imgUrl: require("@/assets/images/default_rent_car_2.png") },
];

export default function DetailRentalCar() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { Colors } = useAppTheme();

  const [activePopupImg, setActivePopupImg] = useState(false);

  const [activeImg, setActiveImg] = useState<any>();

  const handleSelectedImg = (url: any) => {
    setActiveImg(url);
    setActivePopupImg(true);
  };

  const handleViewAllImage = () => {
    router.navigate("/travel/partials/list-car-image");
  };

  const handleToDetailUserRentcar = () => {
    router.push("/rental/detail-user-rent");
  };

  const params = useLocalSearchParams<{
    id: string;
  }>();
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
              data={RentalImgDump.slice(0, 1)} // Only render the main image
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
              data={RentalImgDump.slice(0, 3)} // Only render the main image
              renderItem={({ item, index }) =>
                index === 2 ? (
                  <ImageBackground
                    source={RentalImgDump.slice(0, -1)[0].imgUrl}
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
          <View style={{ padding: 20, marginBottom: 20 }}>
            <Typography fontFamily="Poppins-Bold" fontSize={18}>
              Toyota Hiace Premio
            </Typography>
            <Typography
              fontFamily="Poppins-Regular"
              color="textsecondary"
              fontSize={14}
              style={{ textAlign: "justify" }}
            >
              Rama Trans menyediakan mobil rental dengan layanan prima, armada
              berkualitas, harga kompetitif, serta kenyamanan dan keamanan
              perjalanan yang terjamin.
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
                  Engine
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
                  Dex-Lite
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
                  16 Kursi
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
                  Diesel
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
                  -
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
                  Manual
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
                  // source={{
                  //   uri: activeImg,
                  // }}
                  source={activeImg}
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
