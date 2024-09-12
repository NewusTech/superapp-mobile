import { useState } from "react";
import { Image, RefreshControl } from "react-native";
import { ScrollView } from "react-native";
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
import { Card } from "@/components/card/Card";
import InputFileImage from "@/components/input-file/InputFileImage";
import { useAppTheme } from "@/context/theme-context";
import { useGetOrderRentalDetailQuery } from "@/features/order/api/useGetOrderRentalDetailQuery";
import { usePostUploadBuktiPembayaranRentalMutation } from "@/features/order/api/usePostUploadBuktiPembayaranRentalMutation";
import { checkExpired, formatCurrency } from "@/utils/common";
import CountdownTimer from "@/utils/CountdownTimer";
import { formatDateDMY, formatLocalDate, formatTime } from "@/utils/datetime";

export default function OrderRental() {
  const router = useRouter();
  const { Colors } = useAppTheme();

  const params = useLocalSearchParams<{
    kode_pesanan: string;
  }>();

  const [fileBukti, setFileBukti] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const orderDetailQuery = useGetOrderRentalDetailQuery(params.kode_pesanan);
  const orderDetail = orderDetailQuery.data?.data;

  const uploadBuktiTransferMutation =
    usePostUploadBuktiPembayaranRentalMutation();

  const handleRefresh = () => {
    orderDetailQuery.refetch();
  };

  const handleOnToPayment = () => {
    router.dismissAll();
    router.push({
      pathname: "/travel/link-transaction",
      params: {
        link: orderDetail?.payment_link,
        kode_pesanan: orderDetail?.kode_pembayaran,
      },
    });
  };

  const handleToPaymentTranser = () => {
    router.push({
      pathname: "/payment/transfer/bri",
      params: {
        no_rek: orderDetail?.no_rek || "000000000000000",
        kode_pemesanan: orderDetail?.kode_pembayaran,
        tipe: "rental",
      },
    });
  };

  const handleToViewTiket = async () => {
    router.push({
      pathname: "/order/view-pdf",
      params: {
        link: orderDetail?.link_tiket,
        title: "E-Voucher Rental",
        kode_pembayaran: orderDetail?.kode_pembayaran,
      },
    });
  };

  const handleToViewInvoice = async () => {
    router.push({
      pathname: "/order/view-pdf",
      params: {
        link: orderDetail?.link_invoice,
        title: "Invoice Rental",
        kode_pembayaran: orderDetail?.kode_pembayaran,
      },
    });
  };

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
        kode_pembayaran: orderDetail?.kode_pembayaran || "",
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
          {checkExpired(orderDetail?.expired_at, orderDetail?.status) && (
            <View
              style={{
                backgroundColor: Colors.dangerlight,
                width: "100%",
                padding: 5,
              }}
            >
              <CountdownTimer expirationTime={orderDetail.expired_at} />
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
                orderDetail?.status === "Sukses"
                  ? "success"
                  : orderDetail?.status === "Gagal"
                    ? "dangerbase"
                    : orderDetail.status === "Menunggu Verifikasi"
                      ? "main"
                      : "textsecondary"
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
                alignItems: "flex-start",
              }}
            >
              <Typography color="textsecondary">Waktu Pemesanan</Typography>
              <Typography
                fontFamily="Poppins-Regular"
                style={{
                  textAlign: "left",
                  width: "50%",
                }}
              >
                {formatTime(new Date(orderDetail.created_at))}
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
            {!orderDetailQuery.isFetching &&
              orderDetail.status.toLowerCase() === "sukses" && (
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
                      E-Voucher
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
                <Typography
                  fontFamily="Poppins-Regular"
                  fontSize={14}
                  color="textsecondary"
                >
                  Alamat Penjemputan
                </Typography>
                <Typography fontFamily="Poppins-Regular" fontSize={14}>
                  {orderDetail?.alamat_keberangkatan || "-"}
                </Typography>
              </View>
            </Card>
          </SectionWrapper>

          {orderDetail.status.toLowerCase() !== "gagal" && (
            <SectionWrapper title="Bukti Pembayaran">
              {orderDetail.bukti_url && (
                <Image
                  source={{
                    uri: orderDetail.bukti_url,
                  }}
                  style={{
                    height: 250,
                    width: "100%",
                    borderRadius: 20,
                  }}
                />
              )}
              {!orderDetail.bukti_url && (
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
        {orderDetail?.payment_link &&
          orderDetail?.status.toLowerCase() === "menunggu pembayaran" && (
            <Button onPress={handleOnToPayment}>Lanjutkan Pembayaran</Button>
          )}
        {orderDetail.no_rek !== "-" &&
          orderDetail?.status.toLowerCase() === "menunggu pembayaran" &&
          orderDetail.metode.toLowerCase() !== "payment gateway" && (
            <Button onPress={handleToPaymentTranser}>
              <Typography color="paper" fontFamily="OpenSans-Medium">
                Lanjutkan Pembayaran {orderDetail.metode || "-"}
              </Typography>
            </Button>
          )}
      </View>
    </>
  );
}
