import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { OrderDetailResponseSuccess } from "@/apis/internal.api.type";
import { Appbar, SectionWrapper, Typography, View } from "@/components";
import { IconCarSide, IconPinSharp } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { useGetOrderDetail } from "@/features/order/api/useGetOrderDetail";
import { TravelTicketItem } from "@/features/travel/components";

export default function DetailOrder() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const params = useLocalSearchParams<{
    kode_pesanan: string;
  }>();

  const orderDetailQuery = useGetOrderDetail(params.kode_pesanan);
  const orderDetail = orderDetailQuery.data?.data;

  console.log(orderDetail);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.paper }}
      stickyHeaderIndices={[0]}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={articleListQuery.isRefetching}
      //     onRefresh={handleRefresh}
      //     progressViewOffset={20}
      //   />
      // }
    >
      <Appbar
        backIconPress={() => router.back()}
        title={
          <Typography
            fontFamily={"Poppins-Bold"}
            fontSize={16}
            color={"textprimary"}
            style={{
              textAlign: "left",
              width: "100%",
            }}
          >
            Detail Pesanan
          </Typography>
        }
      />
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          flexDirection: "column",
          gap: 10,
        }}
      >
        <SectionWrapper title="Perjalanan">
          <TravelTicketItem
            destinationCity={orderDetail?.pesanan.kota_tujuan || ""}
            destinationDepartureDate={
              new Date(orderDetail?.pesanan.tanggal || "")
            }
            originCity={orderDetail?.pesanan.kota_asal || ""}
            originDepartureDate={new Date(orderDetail?.pesanan.tanggal || "")}
            icon={<IconCarSide color="main" />}
            customHeader={
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography>
                  {orderDetail?.pesanan.mobil} {"\u2022"}{" "}
                  {orderDetail?.pesanan.kursi
                    .map((item: any) => item)
                    .join(", ")}
                </Typography>
                <Typography
                  fontFamily="Poppins-Bold"
                  fontSize={12}
                  color="main"
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.main,
                    padding: 5,
                    width: 90,
                    textAlign: "center",
                    textAlignVertical: "center",
                    borderRadius: 100,
                    marginLeft: "auto",
                  }}
                >
                  Pergi
                </Typography>
              </View>
            }
            customFooter={
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    gap: 10,
                  }}
                >
                  <IconPinSharp color="main" />
                  <Typography>Titik Jemput</Typography>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    gap: 10,
                    marginLeft: "auto",
                  }}
                >
                  <IconPinSharp color="main" />
                  <Typography>Titik Antar</Typography>
                </View>
              </View>
            }
          />
        </SectionWrapper>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
