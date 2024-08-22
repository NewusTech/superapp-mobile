import { useState } from "react";
import { ScrollView, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { BlurView } from "expo-blur";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PostProcessPaymentPayload } from "@/apis/internal.api.type";
import {
  Appbar,
  Button,
  Checkbox,
  PageWrapper,
  SectionWrapper,
  Snackbar,
  Typography,
  View,
} from "@/components";
import { IconCarSide, IconPinSharp, IconSeat } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { useGetOrderTravelDetail } from "@/features/order/api/useGetOrderTravelDetail";
import { usePostProcessPaymentMutation } from "@/features/payment/api/usePostProcessPaymentMutation";
import { PaymentComponent } from "@/features/payment/components";
import { TravelTicketItem } from "@/features/travel/components";
import { getPesananResponse } from "@/features/travel/store/travel-store";
import { formatCurrency } from "@/utils/common";
import { formatTimeString } from "@/utils/datetime";

export default function TravelPaymentScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { Colors } = useAppTheme();

  const params = useLocalSearchParams<{
    kode_pesanan: string;
  }>();

  // state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    number | null
  >(null);
  const [tna, setTna] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const orderDetailQuery = useGetOrderTravelDetail(params.kode_pesanan);
  const orderDetail = orderDetailQuery.data?.data;

  // query & mutation
  const processPaymentMutation = usePostProcessPaymentMutation();
  const pesananResponse = getPesananResponse();
  console.log(pesananResponse, "tessss");

  // method
  const handleProcessPayment = () => {
    const processPaymentData: PostProcessPaymentPayload = {
      orderCode: params.kode_pesanan,
      metode_id: selectedPaymentMethod?.toString() || "1",
    };

    processPaymentMutation.mutate(processPaymentData, {
      onSuccess: (res) => {
        console.log(res, "res");
        router.dismissAll();
        Snackbar.show({ message: "Order pesanan berhasil" });
        router.push({
          pathname: "/travel/link-transaction",
          params: {
            link: res.data.payment_url,
          },
        });
      },
      onError: () => {
        Snackbar.show({
          message: "Order pesanan gagal, coba setelah beberapa saat",
          variant: "danger",
        });
      },
    });
  };

  return (
    <PageWrapper
      isLoading={processPaymentMutation.isPending}
      backgroundColor="paper"
      style={styles.container}
    >
      <Appbar title="Pembayaran" backIconPress={() => router.back()} />
      <ScrollView horizontal={false}>
        <View style={styles.contentContainer}>
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
                    {formatTimeString(
                      orderDetail?.pesanan.jam_berangkat || "00:00:00"
                    )}
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

          <PaymentComponent
            selectedMethod={selectedPaymentMethod}
            onMethodSelected={setSelectedPaymentMethod}
          />
          <TouchableWithoutFeedback onPress={() => setTna((prev) => !prev)}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Checkbox selected={tna} />
              <Typography fontFamily="Poppins-Regular" fontSize={12}>
                Saya Menyetuji{" "}
                <Typography
                  fontFamily="Poppins-Regular"
                  fontSize={12}
                  color="main"
                  onPress={() => setOpenModal(true)}
                >
                  Sytarat & Ketentuan
                </Typography>{" "}
                Rama Tranz
              </Typography>
            </View>
          </TouchableWithoutFeedback>

          <View backgroundColor="dangerlight" style={styles.warningWrapper}>
            <Typography
              fontFamily="OpenSans-Regular"
              fontSize={10}
              color="dangerbase"
            >
              Mohon diperhatikan, setiap pembelian tiket tidak dapat
              dikembalikan. Pastikan untuk mempertimbangkan dengan baik sebelum
              membeli.
            </Typography>
          </View>
        </View>
      </ScrollView>
      <View
        style={[
          styles.bottomContainer,
          {
            paddingBottom: 24 + insets.bottom,
            borderColor: Colors.outlineborder,
          },
        ]}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Typography fontFamily="OpenSans-Semibold" fontSize={16} color="main">
            {formatCurrency(
              parseInt(orderDetail?.pembayaran.nominal || "0", 10)
            )}
          </Typography>
          <Typography
            fontFamily="OpenSans-Regular"
            fontSize={14}
            color="textsecondary"
          >
            Total Harga
          </Typography>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            disabled={!selectedPaymentMethod || !tna}
            onPressIn={handleProcessPayment}
          >
            Bayar
          </Button>
        </View>
      </View>
      {openModal && (
        <View style={styles.containerPopup}>
          <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
            <BlurView
              intensity={100}
              blurReductionFactor={100}
              experimentalBlurMethod="dimezisBlurView"
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.paper,
                  width: "auto",
                  height: "auto",
                  borderWidth: 1,
                  borderColor: Colors.outlineborder,
                  padding: 20,
                  marginHorizontal: 50,
                  marginVertical: "auto",
                  overflow: "hidden",
                  borderRadius: 10,
                }}
              >
                <Typography fontFamily="Poppins-Bold">
                  Syarat dan Ketentuan
                </Typography>
                <Typography fontFamily="Poppins-Regular">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Ipsam similique quae, eaque harum accusantium quis pariatur
                  assumenda. Omnis culpa temporibus cum alias distinctio dolorem
                  veniam laborum quibusdam sit minima aperiam natus quod nostrum
                  assumenda nemo, reprehenderit eaque fuga soluta. Accusantium
                  dolore sunt dolores nulla. Aliquam aut tenetur voluptatem,
                  facilis laborum debitis alias eaque voluptatum dolores
                  accusamus numquam officiis doloremque possimus quis autem
                  perferendis fugiat, molestias odio. Animi totam at inventore
                  corrupti. Laboriosam laudantium eveniet enim pariatur tenetur
                  unde molestias omnis officiis sunt quis ipsum labore illo,
                  earum animi quam eius aspernatur magni, dolores repellat eaque
                  corporis, eum placeat at ducimus.
                </Typography>
              </View>
            </BlurView>
          </TouchableWithoutFeedback>
        </View>
      )}
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    borderTopWidth: 1,
  },
  warningWrapper: {
    borderRadius: 2,
    padding: 10,
  },
  paymentContainer: {
    borderWidth: 1,
    borderRadius: 2,
    padding: 12,
  },
  paymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  loadingContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  containerPopup: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    shadowRadius: 1,
    overflow: "hidden",
  },
});
