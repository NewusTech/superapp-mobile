import { useEffect, useState } from "react";
import { FlatList, RefreshControl, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import {
  Appbar,
  Button,
  Loader,
  SelectInputV2,
  Tab,
  Typography,
  View,
} from "@/components";
import { IconCarSide, IconChevronDown } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { useGetOrderListTravelQuery } from "@/features/order/api/useGetOrderListTravelQuery";
import PartialsOrderRental from "@/features/orders/PartialsOrderRental";
import { TravelTicketItem } from "@/features/travel/components";
import { formatLocalDate, formatTimeString } from "@/utils/datetime";

export default function OrderTabScreen() {
  const router = useRouter();

  const { Colors } = useAppTheme();

  const [activeTab, setActiveTab] = useState("Menunggu pembayaran");
  const [activeFilter, setActiveFilter] = useState("travel");

  const [statusFilter, setStatusFilter] = useState("Status");

  const statusFilterData = [
    {
      title: "Status",
    },
    {
      title: "Sukses",
    },
    {
      title: "Gagal",
    },
  ];

  const handleDetailPesanan = (kode_pesanan: string) => {
    router.push({
      pathname: "/(authenticated)/order/detail-order",
      params: {
        kode_pesanan: kode_pesanan,
      },
    });
  };
  const getStatusFilter = () => {
    return activeTab.toLocaleLowerCase() === "menunggu pembayaran"
      ? "menunggu"
      : statusFilter === "Status"
        ? ""
        : statusFilter === "Gagal"
          ? "kadaluarsa"
          : statusFilter;
  };

  // query & mutation
  const orderListTravelQuery = useGetOrderListTravelQuery(getStatusFilter());

  useEffect(() => {
    if (activeFilter.toLocaleLowerCase() === "travel") {
      orderListTravelQuery.refetch();
    }
    if (activeTab.toLocaleLowerCase() === "menunggu pembayaran") {
      setStatusFilter("Status");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, activeTab, activeFilter, setStatusFilter]);

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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Tab
              tabs={[
                { key: "travel", label: "Travel" },
                { key: "rental", label: "Rental" },
                { key: "penginapan", label: "Penginapan" },
              ]}
              activeTab={activeFilter}
              onPress={(key) => setActiveFilter(key as string)}
              variant="button"
            />

            <View style={{ marginHorizontal: 10 }}>
              <SelectInputV2
                disabled={
                  activeTab.toLocaleLowerCase() === "menunggu pembayaran"
                }
                placeholder="Filter"
                value={statusFilter}
                data={statusFilterData}
                onSelect={(selectedItem) =>
                  setStatusFilter(selectedItem.title.toString())
                }
                trailingIcon={<IconChevronDown color="main" />}
                withBorder
                borderRadius={100}
                padding={2}
                paddingHorizontal={12}
              />
            </View>
          </ScrollView>
        </View>

        {/* Travel */}
        {activeFilter.toLowerCase() === "travel" && (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={orderListTravelQuery.isRefetching}
                onRefresh={() => orderListTravelQuery.refetch()}
                progressViewOffset={20}
              />
            }
            data={orderListTravelQuery.data?.data}
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
                    </View>
                    <View
                      style={{
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                        flexDirection: "column",
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
                        {formatTimeString(item.jam || "00:00:00")}
                      </Typography>
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
        )}
        {/* Rental */}
        {activeFilter.toLowerCase() === "rental" && (
          <PartialsOrderRental filterStatus={getStatusFilter()} />
        )}
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
