import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { OrderDetailResponseSuccess } from "@/apis/internal.api.type";
import { Appbar, Button, SectionWrapper, Typography, View } from "@/components";
import { IconCarSide, IconPinSharp, IconSeat } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { useGetOrderDetail } from "@/features/order/api/useGetOrderDetail";
import { TravelTicketItem } from "@/features/travel/components";
import { formatTimeString } from "@/utils/datetime";

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
    <>
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
              Detail Pesanan {params.kode_pesanan}
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
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
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
                  <Typography fontFamily="Poppins-Bold">
                    {formatTimeString(orderDetail?.pesanan.jam || "00:00:00")}
                  </Typography>
                  <View
                    style={{
                      flexDirection: "row",
                      alignContent: "center",
                      gap: 10,
                    }}
                  >
                    <IconPinSharp color="main" />
                    <Typography>Titik Antar</Typography>
                  </View>
                </View>
              }
            />
          </SectionWrapper>

          <SectionWrapper title="Daftar Penumpang">
            {orderDetail?.penumpang.map((penumpang) => (
              <View
                style={{
                  backgroundColor: Colors.paper,
                  borderWidth: 1,
                  borderColor: Colors.outlineborder,
                  padding: 10,
                  paddingHorizontal: 20,
                  borderRadius: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Typography fontFamily="Poppins-Bold" fontSize={18}>
                    {penumpang.nama}
                  </Typography>
                  <View style={{ flexDirection: "row", gap: 15 }}>
                    <Typography
                      fontFamily="Poppins-Regular"
                      color="textsecondary"
                    >
                      Nik {"\n"}
                      No Tlp.
                    </Typography>
                    <Typography
                      fontFamily="Poppins-Regular"
                      color="textsecondary"
                    >
                      {penumpang.nik} {"\n"}
                      {penumpang.no_telp}
                    </Typography>
                  </View>
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <IconSeat height={32} width={32} color="textsecondary" />
                  <Typography
                    fontFamily="Poppins-SemiBold"
                    fontSize={18}
                    color="textsecondary"
                  >
                    {penumpang.kursi}
                  </Typography>
                </View>
              </View>
            ))}
          </SectionWrapper>
        </View>
        {/*  */}
      </ScrollView>
      <View
        style={{
          backgroundColor: Colors.paper,
          height: "auto",
          marginTop: "auto",
          padding: 10,
        }}
      >
        <Button>Lanjutkan Pembayaran</Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
