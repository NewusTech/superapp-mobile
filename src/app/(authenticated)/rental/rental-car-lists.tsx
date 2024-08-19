import React from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, Loader, Typography, View } from "@/components";
import RentaCardlItem from "@/components/rental/RentaCardlItem";
import { useAppTheme } from "@/context/theme-context";
import {
  rentalCarData,
  useRentActions,
} from "@/features/rental/store/rental-store";

export default function RentalCarLists() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { Colors } = useAppTheme();

  const { setRentalCarData } = useRentActions();

  const dataRentCarDummy: rentalCarData[] = [
    {
      id: "1",
      title: "Toyota Hiace Premio",
      bagasi: "Heatback",
      bahan_bakar: "Dex-Lite",
      body: "-",
      engine: "Diesel",
      seat: "16",
      transmisi: "Manual",
      harga: 1500000,
    },
    {
      id: "2",
      title: "Toyota Hiace Commuter",
      bagasi: "Heatback",
      bahan_bakar: "Dex-Lite",
      body: "-",
      engine: "Diesel",
      seat: "16",
      transmisi: "Manual",
      harga: 1800000,
    },
  ];

  const handleRentCar = (data: rentalCarData) => {
    setRentalCarData({
      id: data.id,
      title: data.title,
      bagasi: data.bagasi,
      bahan_bakar: data.bahan_bakar,
      body: data.body,
      engine: data.engine,
      seat: data.seat,
      transmisi: data.transmisi,
      harga: data.harga,
    });
    router.push(`/rental/detail/${data.id}`);
  };
  return (
    <>
      <Appbar
        title={"Rental"}
        backgroundColor="paper"
        backIconPress={() => router.back()}
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.paper }}
      >
        <View style={[style.container]}>
          <FlatList
            data={dataRentCarDummy}
            renderItem={({ item }) => {
              return (
                <RentaCardlItem
                  id={item.id}
                  title={item.title}
                  bagasi={item.bagasi}
                  bahan_bakar={item.bahan_bakar}
                  body={item.body}
                  engine={item.engine}
                  harga={item.harga}
                  seat={item.seat}
                  transmisi={item.transmisi}
                  handleOnDetailRentalCard={() => handleRentCar(item)}
                />
              );
            }}
            ListEmptyComponent={() => (
              <View style={style.emptyScheduleContainer}>
                {false ? (
                  <Loader />
                ) : (
                  <Typography fontFamily="Poppins-Medium">
                    Tidak ada jadwal
                  </Typography>
                )}
              </View>
            )}
            style={{ flex: 1 }}
            contentContainerStyle={{
              flexGrow: 1,
              gap: 16,
              padding: 20,
              paddingTop: 10,
              paddingBottom: insets.bottom + 20,
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  emptyScheduleContainer: {
    minHeight: 400,
    justifyContent: "center",
    alignItems: "center",
  },
});
