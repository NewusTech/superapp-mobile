import React from "react";
import { FlatList, RefreshControl, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RentalCarData } from "@/apis/internal.api.type";
import { Appbar, Loader, Typography, View } from "@/components";
import RentaCardlItem from "@/components/rental/RentaCardlItem";
import { useAppTheme } from "@/context/theme-context";
import { useGetRentalCarQuery } from "@/features/rental/api/useGetRentalCarQuery";
import { useRentActions } from "@/features/rental/store/rental-store";

export default function RentalCarLists() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { Colors } = useAppTheme();

  const { setRentalCarData } = useRentActions();

  const rentalCarQuery = useGetRentalCarQuery();

  const handleRentCar = (data: RentalCarData) => {
    setRentalCarData(data);
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
        refreshControl={
          <RefreshControl
            refreshing={rentalCarQuery.isFetching}
            onRefresh={rentalCarQuery.refetch}
          />
        }
      >
        <View style={[style.container]}>
          <FlatList
            scrollEnabled={false}
            data={rentalCarQuery.data?.data}
            renderItem={({ item }) => {
              return (
                <RentaCardlItem
                  type={item.type}
                  bagasi={item.bagasi}
                  bahan_bakar={item.jumlah_kursi}
                  jumlah_kursi={item.jumlah_kursi}
                  transmisi={item.transmisi}
                  handleOnDetailRentalCard={() => handleRentCar(item)}
                />
              );
            }}
            ListEmptyComponent={() => (
              <View style={style.emptyScheduleContainer}>
                {rentalCarQuery.isFetching ? (
                  <Loader />
                ) : (
                  <Typography fontFamily="Poppins-Medium">
                    Tidak mobil yang Direntalkan
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
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
  emptyScheduleContainer: {
    minHeight: 400,
    justifyContent: "center",
    alignItems: "center",
  },
});
