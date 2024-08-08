import { useMemo, useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { Appbar, Loader, Tab, Typography, View } from "@/components";
import { IconCarSide, IconPackage } from "@/components/icons";
import { useGetOrderListQuery } from "@/features/order/api/useGetOrderListQuery";
import { TravelTicketItem } from "@/features/travel/components";

export default function OrderTabScreen() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("in-progress");
  const [activeFilter, setActiveFilter] = useState("travel");

  // query & mutation
  const orderListQuery = useGetOrderListQuery();

  // methods
  const isHistoryTab = activeTab === "history";
  const getOrderListByFilter =
    orderListQuery.data?.data
      .filter(
        (item) =>
          item.orderType === activeFilter &&
          (isHistoryTab
            ? new Date().getTime() > new Date(item.departureDate).getTime()
            : new Date().getTime() < new Date(item.departureDate).getTime())
      )
      .map((item) => ({
        ...item,
        isOrderActive: !isHistoryTab,
      })) || [];

  const hasActiveOrder = useMemo(() => {
    if (!orderListQuery.data?.data) return false;

    return (
      orderListQuery.data?.data.filter(
        (item) => new Date().getTime() < new Date(item.departureDate).getTime()
      ).length > 0
    );
  }, [orderListQuery.data?.data]);

  console.log(orderListQuery.data?.data);

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
              { key: "history", label: "Riwayat" },
              {
                key: "in-progress",
                label: "Dalam proses",
                indicator: hasActiveOrder,
              },
            ]}
            activeTab={activeTab}
            onPress={(key) => setActiveTab(key as string)}
          />

          <Tab
            tabs={[
              { key: "travel", label: "Travel" },
              { key: "paket", label: "Paket" },
            ]}
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
          data={getOrderListByFilter}
          renderItem={({ item }) => (
            <TravelTicketItem
              originCity={item.originCity}
              originDepartureDate={new Date(item.originDepartureDate)}
              destinationCity={item.destinationCity}
              destinationDepartureDate={new Date(item.destinationDepartureDate)}
              departureDate={new Date(item.departureDate)}
              icon={
                item.orderType === "paket" ? (
                  <IconPackage color="main" />
                ) : (
                  <IconCarSide color="main" />
                )
              }
              customHeader={
                item.isOrderActive ? (
                  <View style={{ alignItems: "center" }}>
                    <Typography
                      fontFamily="Poppins-Bold"
                      fontSize={10}
                      color={
                        item.status === "success"
                          ? "success"
                          : item.status === "waiting"
                            ? "textsecondary"
                            : "dangerbase"
                      }
                    >
                      {item.status === "success"
                        ? "Success"
                        : item.status === "waiting"
                          ? "Menunggu Pembayaran"
                          : "failed"}
                    </Typography>
                  </View>
                ) : null
              }
              disabled={!item.isOrderActive}
              onPress={() =>
                router.push({
                  pathname: "/payment/status/[id]",
                  params: {
                    id: item.id,
                  },
                })
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
  },
  emptyContainer: {
    height: 400,
    alignItems: "center",
    justifyContent: "center",
  },
});
