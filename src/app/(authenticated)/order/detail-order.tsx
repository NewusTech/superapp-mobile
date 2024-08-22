import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Iconify } from "react-native-iconify";

import {
  Appbar,
  Button,
  SectionWrapper,
  Snackbar,
  Typography,
  View,
} from "@/components";
import { IconCarSide, IconPinSharp, IconSeat } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { useGetOrderDetail } from "@/features/order/api/useGetOrderDetail";
import { TravelTicketItem } from "@/features/travel/components";
import { formatCurrency } from "@/utils/common";
import { formatLocalDate, formatTimeString } from "@/utils/datetime";
import downloadFile from "@/utils/downloadFile";

export default function DetailOrder() {
  const router = useRouter();
  const { Colors } = useAppTheme();

  const params = useLocalSearchParams<{
    kode_pesanan: string;
  }>();

  const orderDetailQuery = useGetOrderDetail(params.kode_pesanan);
  const orderDetail = orderDetailQuery.data?.data;

  const handleOnBeforePayment = () => {
    router.push({
      pathname: "/travel/payment",
      params: {
        kode_pesanan: params.kode_pesanan,
      },
    });
  };

  const handleOnToPayment = () => {
    router.dismissAll();
    router.push({
      pathname: "/travel/link-transaction",
      params: {
        link: orderDetail?.pembayaran.payment_link,
      },
    });
  };

  const handleRefresh = () => {
    orderDetailQuery.refetch();
  };

  const checExpired = (expirationTime: string, status: string) => {
    if (status !== "Menunggu Pembayaran") {
      return false;
    }
    return new Date(expirationTime).getTime() - new Date().getTime() > 0;
  };

  const handleToViewTiket = async () => {
    router.push({
      pathname: "/order/view-pdf",
      params: {
        link: orderDetail?.pembayaran.link_tiket,
        title: "e-Tiket",
        kode_pembayaran: orderDetail?.pembayaran.kode_pembayaran,
      },
    });
  };

  const handleToViewInvoice = async () => {
    router.push({
      pathname: "/order/view-pdf",
      params: {
        link: orderDetail?.pembayaran.link_invoice,
        title: "Invoice",
        kode_pembayaran: orderDetail?.pembayaran.kode_pembayaran,
      },
    });
  };

  useEffect(() => {
    if (orderDetailQuery.error) {
      Snackbar.show({
        message: "Terjadi kesalahan, coba kembali nanti",
        variant: "danger",
      });
      router.back();
    }
  }, [orderDetailQuery.error, router]);

  console.log(orderDetail);

  if (!orderDetail) return router.back();

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
          {checExpired(
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
              <CountdownTimer
                expirationTime={orderDetail.pembayaran.expired_at}
              />
            </View>
          )}
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
                orderDetail?.pembayaran.status === "Sukses"
                  ? "success"
                  : orderDetail?.pembayaran.status === "Menunggu Pembayaran"
                    ? "textsecondary"
                    : "dangerbase"
              }
              fontSize={14}
            >
              Pembelian {orderDetail?.pembayaran.status}
            </Typography>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography fontFamily="Poppins-Bold" fontSize={18} color="main">
                Travel
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
                {formatLocalDate(new Date(orderDetail.pembayaran.created_at))}
              </Typography>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography color="textsecondary">Nomor Pembayaran</Typography>
              <Typography
                style={{
                  textAlign: "left",
                  width: "50%",
                }}
              >
                {orderDetail.pembayaran.kode_pembayaran || "-"}
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
                {orderDetail.pembayaran.metode || "-"}
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
                {formatCurrency(
                  parseInt(orderDetail?.pembayaran.nominal || "0", 10)
                )}
              </Typography>
            </View>
            {!orderDetailQuery.isFetching &&
              orderDetail.pembayaran.status === "Sukses" && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 10,
                    gap: 5,
                  }}
                >
                  <Button
                    style={{
                      width: 150,
                      alignItems: "center",
                      borderColor: Colors.textsecondary,
                    }}
                    variant="secondary"
                    onPress={handleToViewTiket}
                  >
                    <Iconify
                      icon="mingcute:pdf-line"
                      size={24}
                      color={Colors.main}
                    />
                    <Typography fontFamily="Poppins-Regular" color="main">
                      e-tiket
                    </Typography>
                  </Button>
                  <Button style={{ width: 150 }} onPress={handleToViewInvoice}>
                    <Iconify
                      icon="mingcute:pdf-line"
                      size={24}
                      color={Colors.paper}
                    />
                    <Typography fontFamily="Poppins-Regular" color="paper">
                      Invoice
                    </Typography>
                  </Button>
                </View>
              )}
          </View>
          {/* perjalanan */}
          <SectionWrapper title="Perjalanan">
            <TravelTicketItem
              disabled
              destinationCity={orderDetail?.pesanan.kota_tujuan || ""}
              destinationDepartureDate={
                new Date(orderDetail?.pesanan.tanggal || "2024-08-10")
              }
              originCity={orderDetail?.pesanan.kota_asal || ""}
              originDepartureDate={
                new Date(orderDetail?.pesanan.tanggal || "2024-08-10")
              }
              icon={<IconCarSide color="main" />}
              customHeader={
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography fontFamily="Poppins-Regular" color="dangerbase">
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
                <View style={{ flexDirection: "column" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: 1,
                        width: "40%",
                        overflow: "hidden",
                      }}
                    >
                      <IconPinSharp color="main" />
                      <Typography fontFamily="Poppins-Regular" fontSize={12}>
                        {orderDetail?.pesanan.titik_jemput}
                      </Typography>
                    </View>
                    <Typography fontFamily="Poppins-Bold">
                      {/* {formatTimeString(orderDetail?.pesanan.jam || "00:00:00")} */}
                      6 Jam
                    </Typography>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 1,
                        width: "40%",
                        overflow: "hidden",
                      }}
                    >
                      <IconPinSharp color="main" />
                      <Typography fontFamily="Poppins-Regular" fontSize={12}>
                        {orderDetail?.pesanan.titik_antar}
                      </Typography>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 10,
                    }}
                  >
                    <Typography fontFamily="Poppins-Bold" fontSize={8}>
                      Estimasi waktu : {formatTimeString("10:00:00")} WIB
                    </Typography>
                    <Typography fontFamily="Poppins-Bold" fontSize={8}>
                      Estimasi waktu : {formatTimeString("16:00:00")} WIB
                    </Typography>
                  </View>
                </View>
              }
            />
          </SectionWrapper>

          <SectionWrapper title="Daftar Penumpang">
            {orderDetail?.penumpang.map((penumpang) => (
              <View
                key={penumpang.nama}
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
        {orderDetail.pembayaran.payment_link &&
          orderDetail.pembayaran.status === "Menunggu Pembayaran" && (
            <Button onPress={handleOnToPayment}>Lanjutkan Pembayaran</Button>
          )}
        {!orderDetail.pembayaran.payment_link && (
          <Button onPress={handleOnBeforePayment}>
            Lanjut Pilih Metode Pembayaran
          </Button>
        )}
      </View>
    </>
  );
}

const CountdownTimer = ({
  expirationTime,
  handleAfterExpired,
}: {
  expirationTime: string;
  handleAfterExpired?: () => void;
}) => {
  const calculateTimeLeft = () => {
    const difference =
      new Date(expirationTime).getTime() - new Date().getTime();
    let timeLeft = {} as any;

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expirationTime]);

  return (
    <Typography
      fontFamily="Poppins-Regular"
      color="dangerbase"
      style={{ textAlign: "center" }}
      fontSize={12}
    >
      Selesaikan Pembayaran Dalam {String(timeLeft.hours).padStart(2, "0")} :{" "}
      {String(timeLeft.minutes).padStart(2, "0")} :{" "}
      {String(timeLeft.seconds).padStart(2, "0")}
    </Typography>
  );
};

const styles = StyleSheet.create({});
