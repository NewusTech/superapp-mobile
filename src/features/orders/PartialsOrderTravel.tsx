import { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { Button, Loader, Typography, View } from "@/components";
import { IconCarSide } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { checkExpired } from "@/utils/common";
import CountdownTimer from "@/utils/CountdownTimer";
import {
  formatDate,
  formatLocalDate,
  formatTime,
  formatTimeString,
} from "@/utils/datetime";

import { useGetOrderListTravelQuery } from "../order/api/useGetOrderListTravelQuery";
import { TravelTicketItem } from "../travel/components";

type partialOrderTravel = {
  filterStatus: string;
};

export default function PartialsOrderTravel(props: partialOrderTravel) {
  const { filterStatus } = props;

  const router = useRouter();

  const { Colors } = useAppTheme();

  // query & mutation
  const orderListTravelQuery = useGetOrderListTravelQuery(filterStatus);

  const handleRefresh = () => {
    orderListTravelQuery.refetch();
  };

  const handleDetailPesanan = (kode_pesanan: string) => {
    router.push({
      pathname: "/(authenticated)/order/detail-order",
      params: {
        kode_pesanan: kode_pesanan,
      },
    });
  };

  useEffect(() => {
    orderListTravelQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={orderListTravelQuery.isRefetching}
          onRefresh={handleRefresh}
          progressViewOffset={20}
        />
      }
      data={
        filterStatus === ""
          ? orderListTravelQuery.data?.data.filter(
              (d) => d.status.toLowerCase() !== "menunggu pembayaran"
            )
          : orderListTravelQuery.data?.data
      }
      renderItem={({ item }) => (
        <TravelTicketItem
          originCity={item.kota_asal}
          originDepartureDate={new Date(item.tanggal)}
          destinationCity={item.kota_tujuan}
          destinationDepartureDate={new Date(item.tanggal)}
          icon={<IconCarSide color="main" />}
          onPress={() => handleDetailPesanan(item.kode_pesanan)}
          customHeader={
            <View
              style={{
                flexDirection: "column",
              }}
            >
              {checkExpired(item.expired_at, item.status) && (
                <View
                  style={{
                    paddingBottom: 8,
                    borderBottomWidth: 0.5,
                    borderColor: Colors.textsecondary,
                    marginBottom: 5,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: Colors.dangerlight,
                      width: "100%",
                      padding: 5,
                    }}
                  >
                    <CountdownTimer
                      expirationTime={item.expired_at}
                      handleAfterExpired={handleRefresh}
                    />
                  </View>
                </View>
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    fontFamily="Poppins-Bold"
                    fontSize={14}
                    color={"black"}
                  >
                    {formatLocalDate(new Date(item.created_at))}
                  </Typography>
                  <Typography
                    fontFamily="Poppins-Regular"
                    fontSize={12}
                    color={"textsecondary"}
                  >
                    {item.kode_pesanan}
                  </Typography>
                  <Typography
                    fontFamily="Poppins-Regular"
                    fontSize={12}
                    color={"textsecondary"}
                  >
                    Waktu pemesanan : {formatTime(new Date(item.created_at))}{" "}
                    WIB
                  </Typography>
                </View>
                <View
                  style={{
                    alignItems: "flex-end",
                    flexDirection: "column",
                    gap: 5,
                  }}
                >
                  <Typography
                    fontFamily="OpenSans-Bold"
                    fontSize={14}
                    color={"black"}
                  >
                    Keberangkatan
                  </Typography>
                  <Typography
                    fontFamily="OpenSans-Medium"
                    fontSize={12}
                    color={"black"}
                  >
                    {formatDate(new Date(item.tanggal), {
                      weekday: "long",
                    })}
                    {", "}
                    {formatTimeString(item.jam || "00:00:00")} WIB
                  </Typography>
                </View>
              </View>
            </View>
          }
          customFooter={
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                fontFamily="Poppins-Bold"
                fontSize={12}
                color={"paper"}
                style={{
                  color:
                    item.status === "Sukses"
                      ? Colors.success
                      : item.status.toLocaleLowerCase() ===
                          "menunggu pembayaran"
                        ? Colors.textsecondary
                        : Colors.dangerbase,
                }}
              >
                {item.status}
              </Typography>
              <Button
                style={{ paddingHorizontal: 10 }}
                onPress={() => handleDetailPesanan(item.kode_pesanan)}
              >
                Detail
              </Button>
            </View>
          }
        />
      )}
      ListEmptyComponent={() => (
        <View style={style.emptyContainer}>
          {orderListTravelQuery.isFetching ? (
            <Loader />
          ) : (
            <Typography fontFamily="OpenSans-Semibold">
              Belum ada pesanan
            </Typography>
          )}
        </View>
      )}
      contentContainerStyle={style.listContentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
}

const style = StyleSheet.create({
  listContentContainer: {
    flexGrow: 1,
    gap: 16,
    paddingBottom: 20,
  },
  emptyContainer: {
    height: 400,
    alignItems: "center",
    justifyContent: "center",
  },
});
