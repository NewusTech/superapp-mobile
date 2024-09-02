import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Appbar, SelectInputV2, Tab, Typography, View } from "@/components";
import { IconChevronDown } from "@/components/icons";
import PartialsOrderRental from "@/features/orders/PartialsOrderRental";
import PartialsOrderTravel from "@/features/orders/PartialsOrderTravel";

export default function OrderTabScreen() {
  const params = useLocalSearchParams<{
    active_tab: string;
  }>();

  const [activeTab, setActiveTab] = useState(
    () => params.active_tab || "Menunggu pembayaran"
  );

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

  const getStatusFilter = () => {
    return activeTab.toLocaleLowerCase() === "menunggu pembayaran"
      ? "menunggu"
      : statusFilter === "Status"
        ? ""
        : statusFilter === "Gagal"
          ? "kadaluarsa"
          : statusFilter;
  };

  useEffect(() => {
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
          <PartialsOrderTravel filterStatus={getStatusFilter()} />
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
