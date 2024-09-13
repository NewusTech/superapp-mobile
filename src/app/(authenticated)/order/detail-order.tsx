import { useEffect, useState } from "react";
import { Image, RefreshControl, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Iconify } from "react-native-iconify";

import {
  Appbar,
  Button,
  Loader,
  SectionWrapper,
  Snackbar,
  Typography,
  View,
} from "@/components";
import { IconCarSide, IconPinSharp, IconSeat } from "@/components/icons";
import InputFileImage from "@/components/input-file/InputFileImage";
import { useAppTheme } from "@/context/theme-context";
import { useGetOrderTravelDetail } from "@/features/order/api/useGetOrderTravelDetail";
import { usePostUploadBuktiPembayranMutation } from "@/features/order/api/usePostUploadBuktiPembayranMutation";
import { TravelTicketItem } from "@/features/travel/components";
import { checkExpired, formatCurrency } from "@/utils/common";
import CountdownTimer from "@/utils/CountdownTimer";
import { formatLocalDate, formatTime } from "@/utils/datetime";

export default function DetailOrder() {
  const router = useRouter();
  const { Colors } = useAppTheme();

  const params = useLocalSearchParams<{
    kode_pesanan: string;
  }>();

  const [fileBukti, setFileBukti] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const orderDetailQuery = useGetOrderTravelDetail(params.kode_pesanan);
  const orderDetail = orderDetailQuery.data?.data;

  const uploadBuktiTransferMutation = usePostUploadBuktiPembayranMutation();

  const handleUploadBuktiTransfer = () => {
    setIsLoading(true);

    // Prepare the FormData
    const formData = new FormData();

    // Menambahkan gambar
    const bukti: any = {
      name: "image_bukti_transfer",
      type: "image/jpeg", // Pastikan MIME type sesuai
      uri: fileBukti,
    };

    formData.append("bukti", bukti);

    uploadBuktiTransferMutation.mutate(
      {
        data: formData,
        kode_pembayaran: orderDetail?.pembayaran.kode_pembayaran || "",
      },
      {
        onSuccess: (res: any) => {
          console.log(res, "res");
          Snackbar.show({ message: "Berhasil upload bukti pembayaran" });
          handleRefresh();
          setIsLoading(false);
        },
        onError: (res) => {
          Snackbar.show({
            message: "Upload bukti transfer gagal, " + res.message,
            variant: "danger",
          });
          console.error(res);
          setIsLoading(false);
        },
      }
    );
  };

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
        kode_pesanan: orderDetail?.pesanan.kode_pesanan,
      },
    });
  };

  const handleRefresh = () => {
    orderDetailQuery.refetch();
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

  const handleToPaymentTranser = () => {
    router.push({
      pathname: "/payment/transfer/bri",
      params: {
        no_rek: orderDetail?.pembayaran.no_rek || "000000000000000",
        kode_pemesanan: params.kode_pesanan,
        tipe: "travel",
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
          {checkExpired(
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
                  : orderDetail?.pembayaran.status === "Gagal"
                    ? "dangerbase"
                    : orderDetail.pembayaran.status === "Menunggu Verifikasi"
                      ? "main"
                      : "textsecondary"
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
                {orderDetail.pembayaran.kode_pembayaran || "-"}
              </Typography>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Typography color="textsecondary">Waktu Pemesanan</Typography>
              <Typography
                style={{
                  textAlign: "left",
                  width: "50%",
                }}
              >
                {formatTime(new Date(orderDetail.pembayaran.created_at))} WIB
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
              icon={<IconCarSide color="main" width={32} height={32} />}
              destinationTime={orderDetail.pesanan.jam_tiba || "00.00"}
              originTime={orderDetail.pesanan.jam_berangkat || "00.00"}
              estimationTime={orderDetail.pesanan.estimasi || "0"}
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
                        width: "45%",
                        overflow: "hidden",
                      }}
                    >
                      <IconPinSharp color="main" />
                      <Typography fontFamily="Poppins-Regular" fontSize={12}>
                        {orderDetail?.pesanan.titik_jemput}
                      </Typography>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 1,
                        width: "45%",
                        overflow: "hidden",
                      }}
                    >
                      <IconPinSharp color="main" />
                      <Typography
                        fontFamily="Poppins-Regular"
                        fontSize={12}
                        numberOfLines={2}
                        style={{ width: "80%" }}
                      >
                        {orderDetail?.pesanan.titik_antar}
                      </Typography>
                    </View>
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

          {orderDetail.pembayaran.status.toLowerCase() !== "gagal" && (
            <SectionWrapper title="Bukti Pembayaran">
              {orderDetail.pembayaran.bukti_url && (
                <Image
                  source={{
                    uri: orderDetail.pembayaran.bukti_url,
                  }}
                  style={{
                    height: 250,
                    width: "100%",
                    borderRadius: 20,
                  }}
                />
              )}
              {!orderDetail.pembayaran.bukti_url && (
                <View
                  style={{
                    paddingHorizontal: 10,
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <InputFileImage
                    label="Upload Bukti Pembayaran"
                    image={fileBukti}
                    setImage={setFileBukti}
                  />
                  <Button
                    onPress={handleUploadBuktiTransfer}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader color="paper" />
                    ) : (
                      <Typography color="paper">
                        Upload bukti transfter
                      </Typography>
                    )}
                  </Button>
                </View>
              )}
            </SectionWrapper>
          )}
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
          orderDetail.pembayaran.status.toLowerCase() ===
            "menunggu pembayaran" && (
            <Button onPress={handleOnToPayment}>Lanjutkan Pembayaran</Button>
          )}
        {!orderDetail.pembayaran.payment_link &&
          orderDetail.pembayaran.status.toLowerCase() !== "gagal" &&
          orderDetail.pembayaran.metode?.split("-")[0].toLowerCase() !==
            "transfer" && (
            <Button onPress={handleOnBeforePayment}>
              Lanjut Pilih Metode Pembayaran
            </Button>
          )}
        {orderDetail.pembayaran.no_rek !== "-" &&
          orderDetail.pembayaran.status.toLowerCase() ===
            "menunggu pembayaran" &&
          orderDetail.pembayaran.metode &&
          orderDetail.pembayaran.metode?.toLowerCase() !==
            "payment gateway" && (
            <Button onPress={handleToPaymentTranser}>
              <Typography color="paper" fontFamily="OpenSans-Medium">
                Lihat Cara Pembayaran {orderDetail.pembayaran.metode || "-"}
              </Typography>
            </Button>
          )}
      </View>
    </>
  );
}
