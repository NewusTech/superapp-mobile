import { useEffect, useMemo, useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { Appbar, Button, Loader, Tab, Typography, View } from "@/components";
import { IconCarSide, IconPackage } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { useGetOrderListQuery } from "@/features/order/api/useGetOrderListQuery";
import { TravelTicketItem } from "@/features/travel/components";
import { formatLocalDate, formatTimeString } from "@/utils/datetime";

export default function OrderTabScreen() {
  const router = useRouter();

  const { Colors } = useAppTheme();

  const [activeTab, setActiveTab] = useState("Menunggu pembayaran");
  const [activeFilter, setActiveFilter] = useState("travel");

  // query & mutation
  const orderListQuery = useGetOrderListQuery(activeFilter);

  // methods
  // const isHistoryTab = activeTab === "Menunggu Pembayaran";

  const handleDetailPesanan = (kode_pesanan: string) => {
    router.push({
      pathname: "/(authenticated)/order/detail-order",
      params: {
        kode_pesanan: kode_pesanan,
      },
    });
  };

  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar
        title={
          <Typography
            fontFamily={"Poppins-Bold"}
            fontSize={16}
            color={"textprimary"}
            style={{
              textAlign: "center",
              width: "100%",
            }}
          >
            Pesanan
          </Typography>
        }
      />
      <View style={style.contenContainer}>
        <View style={style.tabContainer}>
          <Tab
            tabs={[
              { key: "", label: "Riwayat" },
              {
                key: "Menunggu pembayaran",
                label: "Dalam proses",
                // indicator: hasActiveOrder,
              },
            ]}
            activeTab={activeTab}
            onPress={(key) => setActiveTab(key as string)}
          />

          <Tab
            tabs={[{ key: "travel", label: "Travel" }]}
            activeTab={activeFilter}
            onPress={(key) => setActiveFilter(key as string)}
            variant="button"
          />
        </View>

        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={orderListQuery.isRefetching}
              onRefresh={() => orderListQuery.refetch()}
              progressViewOffset={20}
            />
          }
          data={orderListQuery.data?.data}
          renderItem={({ item }) => (
            <TravelTicketItem
              disabled
              originCity={item.kota_asal}
              originDepartureDate={new Date(item.tanggal)}
              destinationCity={item.kota_tujuan}
              destinationDepartureDate={new Date(item.tanggal)}
              icon={<IconCarSide color="main" />}
              customHeader={
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ alignItems: "flex-start" }}>
                    <Typography
                      fontFamily="Poppins-Bold"
                      fontSize={14}
                      color={"black"}
                    >
                      {formatLocalDate(new Date())}
                    </Typography>
                    <Typography
                      fontFamily="Poppins-Regular"
                      fontSize={12}
                      color={"textsecondary"}
                    >
                      {item.kode_pesanan}
                    </Typography>
                  </View>
                  <Typography
                    fontFamily="Poppins-Bold"
                    fontSize={14}
                    color={"black"}
                  >
                    {formatTimeString(item.jam || "00:00:00")}
                  </Typography>
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
                    fontFamily="Poppins-Regular"
                    fontSize={11}
                    color={"paper"}
                    style={{
                      backgroundColor:
                        item.status === "Sukses"
                          ? Colors.success
                          : item.status.toLocaleLowerCase() ===
                              "menunggu pembayaran"
                            ? Colors.textsecondary
                            : Colors.dangerbase,
                      borderRadius: 100,
                      padding: 5,
                      paddingHorizontal: 10,
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
              {orderListQuery.isFetching ? (
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

        {/* <TravelTicketItem
          originCity={"From"}
          originDepartureDate={new Date()}
          destinationCity={"To"}
          destinationDepartureDate={new Date()}
          icon={<IconCarSide color="main" />}
          customHeader={
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ alignItems: "flex-start" }}>
                <Typography
                  fontFamily="Poppins-Bold"
                  fontSize={14}
                  color={"black"}
                >
                  {formatLocalDate(new Date())}
                </Typography>
                <Typography
                  fontFamily="Poppins-Regular"
                  fontSize={12}
                  color={"textsecondary"}
                >
                  TR-20240808152805-8506
                </Typography>
              </View>
              <Typography
                fontFamily="Poppins-Bold"
                fontSize={14}
                color={"black"}
              >
                {formatTime(new Date())}
              </Typography>
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
                fontFamily="Poppins-Regular"
                fontSize={14}
                color={"black"}
              >
                Menunggu Pembayaran
              </Typography>
              <Button
                style={{ paddingHorizontal: 10 }}
                onPress={() => handleDetailPesanan("TRX")}
              >
                Detail
              </Button>
            </View>
          }
        /> */}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  contenContainer: {
    paddingVertical: 15,
    padding: 24,
    paddingBottom: 0,
    gap: 24,
    flex: 1,
  },
  tabContainer: {
    gap: 10,
  },
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
