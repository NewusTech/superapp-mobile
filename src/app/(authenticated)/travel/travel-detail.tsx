import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Tab, Typography, View } from "@/components";
import { IconChevronLeft } from "@/components/icons";
import RenderImg from "@/components/image/RenderImg";
import { useAppTheme } from "@/context/theme-context";
import {
  useTravelbookingPayload,
  useTravelSchedule,
} from "@/features/travel/store/travel-store";
import { formatCurrency } from "@/utils/common";
import { formatTime } from "@/utils/datetime";

import { RentalImgDump } from "../rental/detail/[id]";

export default function TravelDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const [activeTab, setActiveTab] = useState("description");

  const [activePopupImg, setActivePopupImg] = useState(false);
  const [activeImg, setActiveImg] = useState<any>();

  const travelSchedule = useTravelSchedule();
  const travelBookingPayload = useTravelbookingPayload();

  const handleSelectedImg = (url: any) => {
    setActiveImg(url);
    setActivePopupImg(true);
  };

  const handleViewAllImage = () => {
    router.navigate("/travel/partials/list-car-image");
  };

  return (
    <>
      <View
        backgroundColor="paper"
        style={[style.container, { paddingTop: insets.top }]}
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
        <View style={{ flex: 1 }}>
          <View style={style.tabHeaderContainer}>
            <Tab
              tabs={[
                { key: "description", label: "Deskripsi" },
                { key: "rute", label: "Rute" },
                { key: "ticket", label: "Tiket" },
              ]}
              activeTab={activeTab}
              onPress={(key) => setActiveTab(key as string)}
            />
          </View>
          <View style={style.tabContentContainer}>
            {activeTab === "description" && (
              <View style={{ gap: 24 }}>
                <View>
                  <Typography
                    fontFamily="Poppins-Medium"
                    fontSize={14}
                    color="textsecondary"
                  >
                    Tipe Mobil
                  </Typography>
                  <Typography fontFamily="Poppins-Medium" fontSize={13}>
                    {travelSchedule?.carModel}
                  </Typography>
                </View>
                <View>
                  <Typography
                    fontFamily="Poppins-Medium"
                    fontSize={14}
                    color="textsecondary"
                  >
                    Kursi
                  </Typography>
                  <Typography fontFamily="Poppins-Medium" fontSize={13}>
                    {travelSchedule?.carSeat}
                  </Typography>
                </View>
                <View>
                  <Typography
                    fontFamily="Poppins-Medium"
                    fontSize={14}
                    color="textsecondary"
                  >
                    Fasilitas
                  </Typography>
                  <Typography fontFamily="Poppins-Medium" fontSize={13}>
                    {travelSchedule?.fasilitas || "-"}
                  </Typography>
                </View>
              </View>
            )}

            {activeTab === "rute" && (
              <View
                style={[
                  style.routeContainer,
                  { borderColor: Colors.outlineborder },
                ]}
              >
                <View style={style.routeTitle}>
                  <Typography
                    fontFamily="Poppins-Medium"
                    fontSize={8}
                    style={{ textAlign: "center" }}
                  >
                    Jam{`\n`}Berangkat
                  </Typography>
                  <Typography fontFamily="Poppins-Medium" fontSize={8}>
                    {travelSchedule?.departureDate &&
                      formatTime(new Date(travelSchedule?.departureDate))}
                  </Typography>
                </View>

                <View style={{ flexDirection: "row", gap: 10 }}>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginHorizontal: 5,
                      width: 1,
                      backgroundColor: Colors.outlineborder,
                    }}
                  >
                    <View
                      style={{
                        height: 12,
                        width: 12,
                        borderWidth: 1,
                        borderColor: Colors.main,
                        backgroundColor: Colors.paper,
                        borderRadius: 99,
                      }}
                    />
                    <View
                      style={{
                        height: 12,
                        width: 12,
                        borderWidth: 1,
                        backgroundColor: Colors.main,
                        borderRadius: 99,
                      }}
                    />
                  </View>
                  <View style={{ gap: 24 }}>
                    <View>
                      <Typography fontFamily="Poppins-Medium" fontSize={13}>
                        {travelSchedule?.originCity}
                      </Typography>
                      <Typography fontFamily="Poppins-Light" fontSize={12}>
                        Titik jemput
                      </Typography>
                    </View>
                    <View>
                      <Typography fontFamily="Poppins-Medium" fontSize={13}>
                        {travelSchedule?.destinationCity}
                      </Typography>
                      <Typography fontFamily="Poppins-Light" fontSize={12}>
                        Titik jemput
                      </Typography>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {activeTab === "ticket" && (
              <View style={{ gap: 12 }}>
                <Typography fontFamily="Poppins-SemiBold" fontSize={14}>
                  Syarat & Ketentuan
                </Typography>

                <RenderHTML
                  systemFonts={[...defaultSystemFonts, "Poppins-Regular"]}
                  contentWidth={Dimensions.get("screen").width - 48}
                  baseStyle={{
                    fontSize: 13,
                    color: Colors.textsecondary,
                  }}
                  source={{
                    html: travelSchedule?.syarat_dan_ketentuan || "",
                  }}
                />
              </View>
            )}
          </View>
        </View>

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
            <Typography
              fontFamily="OpenSans-Semibold"
              fontSize={16}
              color="main"
            >
              {formatCurrency(travelSchedule?.price || 0)}
            </Typography>
            <Typography
              fontFamily="OpenSans-Regular"
              fontSize={14}
              color="textsecondary"
            >
              Total per-tiket
            </Typography>
          </View>
          <View style={{ flex: 1 }}>
            <Button
              onPressIn={() =>
                router.push({
                  pathname: "/travel/seat-selection/[index]",
                  params: {
                    sheats: travelBookingPayload?.seats,
                    selectAllSheats: "true",
                  } as any,
                })
              }
            >
              Pilih
            </Button>
          </View>
        </View>
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
                  backgroundColor: "red",
                  width: "auto",
                  height: 210,
                  marginHorizontal: 25,
                  marginVertical: "auto",
                  overflow: "hidden",
                  borderRadius: 10,
                }}
              >
                <Image source={activeImg} style={{ height: "100%" }} />
              </View>
            </BlurView>
          </TouchableWithoutFeedback>
        </View>
      )}

      {/* end */}
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "auto",
    height: "60%",
    resizeMode: "cover",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    borderTopWidth: 1,
  },
  tabHeaderContainer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  tabContentContainer: {
    flex: 1,
    padding: 24,
  },
  routeTitle: {
    alignItems: "center",
  },
  routeContainer: {
    padding: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 2,
  },
  containerPopup: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    shadowRadius: 1,
    overflow: "hidden",
  },
  detailImageContainer: {
    width: "100%",
    flexDirection: "row",
  },
  mainImageContainer: {
    backgroundColor: "transparent",
  },
});
