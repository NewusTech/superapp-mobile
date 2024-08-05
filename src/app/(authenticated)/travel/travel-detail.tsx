import { useState } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Tab, Typography, View } from "@/components";
import { useAppTheme } from "@/context/theme-context";
import { useTravelSchedule } from "@/features/travel/store/travel-store";
import { formatCurrency } from "@/utils/common";
import { formatTime } from "@/utils/datetime";

export default function TravelDetailScreen() {
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const [activeTab, setActiveTab] = useState("description");

  const travelSchedule = useTravelSchedule();

  return (
    <View
      backgroundColor="paper"
      style={[style.container, { paddingTop: insets.top }]}
    >
      <Image
        source={{
          uri: travelSchedule?.img_url || "",
        }}
        style={style.image}
      />

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
                  Spesifikasi
                </Typography>
                <Typography fontFamily="Poppins-Medium" fontSize={13}>
                  Kapasitas kursi {travelSchedule?.carSeat}
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
          <Typography fontFamily="OpenSans-Semibold" fontSize={16} color="main">
            {formatCurrency(travelSchedule?.price || 0)}
          </Typography>
          <Typography
            fontFamily="OpenSans-Regular"
            fontSize={14}
            color="textsecondary"
          >
            Total Harga
          </Typography>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            onPressIn={() =>
              router.push({
                pathname: "/travel/seat-selection/[index]",
                params: {
                  index: 0,
                },
              })
            }
          >
            Pilih
          </Button>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 212,
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
});
