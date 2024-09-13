import { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { Button, Loader, Separator, Typography, View } from "@/components";
import { Card } from "@/components/card/Card";
import { useAppTheme } from "@/context/theme-context";
import { checkExpired } from "@/utils/common";
import CountdownTimer from "@/utils/CountdownTimer";
import { formatDate, formatTime } from "@/utils/datetime";

import { useGetOrderRentalQuery } from "../order/api/useGetOrderRentalQuery";

type partialOrderRental = {
  filterStatus: string;
};

export default function PartialsOrderRental(props: partialOrderRental) {
  const { filterStatus } = props;

  const router = useRouter();

  const { Colors } = useAppTheme();

  const orderListRentalQuery = useGetOrderRentalQuery(filterStatus);

  const handleToOrderDetail = (kode_pesanan: string) => {
    router.push({
      pathname: "/order/detail/order-rental",
      params: {
        kode_pesanan: kode_pesanan,
      },
    });
  };

  const handleRefresh = () => {
    orderListRentalQuery.refetch();
  };

  useEffect(() => {
    orderListRentalQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus]);

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={orderListRentalQuery.isRefetching}
          onRefresh={handleRefresh}
          progressViewOffset={20}
        />
      }
      data={
        filterStatus === ""
          ? orderListRentalQuery.data?.data.filter(
              (d) => d.status.toLowerCase() !== "menunggu pembayaran"
            )
          : orderListRentalQuery.data?.data
      }
      renderItem={({ item }) => (
        <Card onPress={() => handleToOrderDetail(item.kode_pembayaran)}>
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
          <Typography fontFamily="Poppins-Bold" fontSize={14}>
            {formatDate(new Date(item.created_at))}
          </Typography>
          <Typography
            fontFamily="Poppins-Regular"
            fontSize={10}
            color="textsecondary"
          >
            {item.kode_pembayaran}
          </Typography>
          <Typography
            fontFamily="Poppins-Regular"
            fontSize={12}
            color={"textsecondary"}
          >
            Waktu pemesanan : {formatTime(new Date(item.created_at))} WIB
          </Typography>
          <Separator
            thickness={2}
            style={{
              backgroundColor: "transparent",
              borderTopWidth: 1,
              borderStyle: "dashed",
              borderColor: Colors.textsecondary,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography fontFamily="Poppins-Regular" fontSize={14}>
              {item.mobil_type}
            </Typography>
            <Typography fontFamily="Poppins-Regular" fontSize={14}>
              {item.area}
            </Typography>
          </View>
          <Typography fontFamily="Poppins-Regular" fontSize={14}>
            {formatDate(new Date(item.tanggal_awal_sewa), {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            -{" "}
            {formatDate(new Date(item.tanggal_akhir_sewa), {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Typography>
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
                    : item.status === "Gagal"
                      ? Colors.dangerbase
                      : item.status === "Menunggu Verifikasi"
                        ? Colors.main
                        : Colors.textsecondary,
              }}
            >
              {item.status}
            </Typography>
            <Button
              style={{ paddingHorizontal: 10 }}
              onPress={() => handleToOrderDetail(item.kode_pembayaran)}
            >
              Detail
            </Button>
          </View>
        </Card>
      )}
      ListEmptyComponent={() => (
        <View style={style.emptyContainer}>
          {orderListRentalQuery.isFetching ? (
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
