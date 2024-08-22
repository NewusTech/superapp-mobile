import { RefreshControl } from "react-native";
import { ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Appbar, SectionWrapper, Typography, View } from "@/components";
import { Card } from "@/components/card/Card";
import { useAppTheme } from "@/context/theme-context";
import { useGetOrderRentalDetailQuery } from "@/features/order/api/useGetOrderRentalDetailQuery";
import { checkExpired, formatCurrency } from "@/utils/common";
import CountdownTimer from "@/utils/CountdownTimer";
import { formatDateDMY, formatLocalDate } from "@/utils/datetime";

export default function OrderRental() {
  const router = useRouter();
  const { Colors } = useAppTheme();

  const params = useLocalSearchParams<{
    kode_pesanan: string;
  }>();

  const orderDetailQuery = useGetOrderRentalDetailQuery(params.kode_pesanan);
  const orderDetail = orderDetailQuery.data?.data;

  const handleRefresh = () => {
    orderDetailQuery.refetch();
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.paper }}
        stickyHeaderIndices={[0]}
        refreshControl={
          <RefreshControl
            refreshing={orderDetailQuery.isRefetching}
            onRefresh={handleRefresh}
            progressViewOffset={20}
          />
        }
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
              Detail
            </Typography>
          }
        />
        {/*  */}
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            flexDirection: "column",
            gap: 10,
          }}
        >
          {/* Countdown */}
          {/* {checkExpired(
            orderDetail.pembayaran.expired_at,
            orderDetail.pembayaran.status
          ) && (
            <View
              style={{
                backgroundColor: Colors.dangerlight,
                width: "100%",
                padding: 5,
              }}
            >
              <CountdownTimer expirationTime={new Date().toDateString()} />
            </View>
          )} */}
          {/* ticket */}
          <View
            style={{
              flexDirection: "column",
              padding: 20,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: Colors.outlineborder,
            }}
          >
            <Typography
              fontFamily="Poppins-SemiBold"
              color={
                orderDetail?.status === "Sukses"
                  ? "success"
                  : orderDetail?.status === "Menunggu Pembayaran"
                    ? "textsecondary"
                    : "dangerbase"
              }
              fontSize={14}
            >
              Pembelian {orderDetail?.status}
            </Typography>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontFamily="Poppins-Bold" fontSize={18} color="main">
                Rental
              </Typography>
              <Typography
                fontFamily="Poppins-Medium"
                color="textsecondary"
                fontSize={14}
                style={{
                  textAlign: "left",
                  width: "50%",
                }}
              >
                {formatLocalDate(new Date(orderDetail?.created_at || ""))}
              </Typography>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Typography color="textsecondary">Nomor Pembayaran</Typography>
              <Typography
                style={{
                  textAlign: "left",
                  width: "50%",
                }}
              >
                {orderDetail?.kode_pembayaran || "-"}
              </Typography>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography color="textsecondary">Metode Pembayaran</Typography>
              <Typography
                style={{
                  textAlign: "left",
                  width: "50%",
                }}
              >
                {orderDetail?.metode || "-"}
              </Typography>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography color="textsecondary">Harga</Typography>
              <Typography
                style={{
                  textAlign: "left",
                  width: "50%",
                }}
              >
                {formatCurrency(parseInt(orderDetail?.nominal || "0", 10))}
              </Typography>
            </View>
          </View>
          {/* perjalanan */}
          <SectionWrapper title="Perjalanan">
            <Card disabled>
              <View style={{ flexDirection: "column", padding: 10 }}>
                <Typography fontFamily="Poppins-Bold" fontSize={16}>
                  {orderDetail?.mobil_type}
                </Typography>
                {/* 1 */}
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "column", width: "50%" }}>
                    <Typography
                      fontFamily="Poppins-Regular"
                      fontSize={14}
                      color="textsecondary"
                    >
                      Durasi Sewa
                    </Typography>
                    <Typography fontFamily="Poppins-Regular" fontSize={14}>
                      {orderDetail?.durasi_sewa} Hari
                    </Typography>
                  </View>
                  <View style={{ flexDirection: "column", width: "50%" }}>
                    <Typography
                      fontFamily="Poppins-Regular"
                      fontSize={14}
                      color="textsecondary"
                    >
                      Area
                    </Typography>
                    <Typography fontFamily="Poppins-Regular" fontSize={14}>
                      {orderDetail?.area} Hari
                    </Typography>
                  </View>
                </View>
                {/* 2 */}
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "column", width: "50%" }}>
                    <Typography
                      fontFamily="Poppins-Regular"
                      fontSize={14}
                      color="textsecondary"
                    >
                      Tanggal Mulai Sewa
                    </Typography>
                    <Typography fontFamily="Poppins-Regular" fontSize={14}>
                      {formatDateDMY(
                        new Date(orderDetail?.tanggal_awal_sewa || "")
                      )}
                    </Typography>
                  </View>
                  <View style={{ flexDirection: "column", width: "50%" }}>
                    <Typography
                      fontFamily="Poppins-Regular"
                      fontSize={14}
                      color="textsecondary"
                    >
                      Tanggal Selesai Sewa
                    </Typography>
                    <Typography fontFamily="Poppins-Regular" fontSize={14}>
                      {formatDateDMY(
                        new Date(orderDetail?.tanggal_akhir_sewa || "")
                      )}
                    </Typography>
                  </View>
                </View>
              </View>
            </Card>
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
        {/* {orderDetail.pembayaran.payment_link &&
          orderDetail.pembayaran.status === "Menunggu Pembayaran" && (
            <Button onPress={handleOnToPayment}>Lanjutkan Pembayaran</Button>
          )}
        {!orderDetail.pembayaran.payment_link && (
          <Button onPress={handleOnBeforePayment}>
            Lanjut Pilih Metode Pembayaran
          </Button>
        )} */}
      </View>
    </>
  );
}
