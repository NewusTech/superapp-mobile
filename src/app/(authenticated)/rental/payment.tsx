import { useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, Button, Checkbox, Typography, View } from "@/components";
import { IconChevronRight } from "@/components/icons";
import ModalSwipe from "@/components/modal/ModalSwipe";
import { useAppTheme } from "@/context/theme-context";
import { PaymentComponent } from "@/features/payment/components";
import { useUserRentalPayload } from "@/features/rental/store/rental-store";
import { formatCurrency } from "@/utils/common";

export default function Payment() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    number | null
  >(null);

  const [tna, setTna] = useState(false);
  const [openModalTnc, setOpenModalTnc] = useState(false);
  const [modalDetailPenyewa, setModalDetailPenyewa] = useState(false);

  const userRent = useUserRentalPayload();

  const handleToEditDataPenyewa = () => {
    setModalDetailPenyewa(false);
    router.push({
      pathname: "/rental/detail-user-rent",
      params: {
        isEdit: "true",
      },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors.paper }]}>
      <Appbar
        title={"Pembayaran"}
        backgroundColor="paper"
        hasBorder={false}
        backIconPress={() => router.back()}
      />
      <ScrollView style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
        <View
          borderColor="outlineborder"
          style={[
            styles.contentContainer,
            {
              backgroundColor: Colors.paper,
              borderColor: Colors.outlineborder,
            },
          ]}
        >
          <Typography
            fontFamily="Poppins-Bold"
            fontSize={16}
            style={{ marginBottom: 1 }}
          >
            Toyota Haice Premio
          </Typography>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <View style={{ width: "50%" }}>
              <Typography fontFamily="Poppins-Light" fontSize={14}>
                Durasi Sewa
              </Typography>
              <Typography fontFamily="Poppins-Regular" fontSize={14}>
                3 Hari
              </Typography>
            </View>
            <View>
              <Typography fontFamily="Poppins-Light" fontSize={14}>
                Area
              </Typography>
              <Typography fontFamily="Poppins-Regular" fontSize={14}>
                Dalam Kota
              </Typography>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <Typography fontFamily="Poppins-Light" fontSize={14}>
                Rute
              </Typography>
              <Typography fontFamily="Poppins-Regular" fontSize={14}>
                Lampung - Jakarta
              </Typography>
            </View>
            <View style={{ width: "50%" }}>
              <Typography fontFamily="Poppins-Light" fontSize={14}>
                Alamat Penjemputan
              </Typography>
              <Typography fontFamily="Poppins-Regular" fontSize={14}>
                Jl. Pangeran Antasari Gg.Morotai
              </Typography>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <Typography fontFamily="Poppins-Light" fontSize={14}>
                Tanggal Mulai Sewa
              </Typography>
              <Typography fontFamily="Poppins-Regular" fontSize={14}>
                11/08/2024
              </Typography>
            </View>
            <View style={{ width: "50%" }}>
              <Typography fontFamily="Poppins-Light" fontSize={14}>
                Tanggal Selesai Sewa
              </Typography>
              <Typography fontFamily="Poppins-Regular" fontSize={14}>
                15/08/2024
              </Typography>
            </View>
          </View>
        </View>

        <Pressable onPress={() => setModalDetailPenyewa(true)}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            <Typography fontFamily="Poppins-Bold" fontSize={16}>
              Detail Informasi Penyewa
            </Typography>
          </View>
          <View
            style={{
              borderColor: Colors.outlineborder,
              borderWidth: 1,
              borderRadius: 20,
              width: "100%",
              padding: 10,
              paddingHorizontal: 20,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Typography fontFamily="Poppins-Bold" fontSize={18}>
                {userRent.nama}
              </Typography>
              <IconChevronRight width={26} height={26} color="main" />
            </View>
            <Typography fontFamily="Poppins-Regular" fontSize={16}>
              {userRent.no_telp}
              {"\n"}
              {userRent.email}
            </Typography>
          </View>
        </Pressable>

        <PaymentComponent
          style={{ marginTop: 10 }}
          selectedMethod={selectedPaymentMethod}
          onMethodSelected={setSelectedPaymentMethod}
        />
        <View style={{ marginVertical: 20 }}>
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
                  onPress={() => setOpenModalTnc(true)}
                >
                  Sytarat & Ketentuan
                </Typography>{" "}
                Rama Tranz
              </Typography>
            </View>
          </TouchableWithoutFeedback>
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
            {formatCurrency(1500000)}
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
          <Button>Bayar</Button>
        </View>
      </View>
      <ModalSwipe
        modalVisible={modalDetailPenyewa}
        setModalVisible={setModalDetailPenyewa}
      >
        <View
          style={{
            height: Dimensions.get("window").height / 3,
            gap: 5,
          }}
        >
          <Typography fontFamily="Poppins-Bold" fontSize={16}>
            Detail Penyewa
          </Typography>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Typography fontFamily="Poppins-Medium" fontSize={14}>
              Nama Lengkap
            </Typography>
            <Typography fontFamily="Poppins-Regular" fontSize={14}>
              {userRent.nama}
            </Typography>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Typography fontFamily="Poppins-Medium" fontSize={14}>
              NIK
            </Typography>
            <Typography fontFamily="Poppins-Regular" fontSize={14}>
              {userRent.nik}
            </Typography>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Typography fontFamily="Poppins-Medium" fontSize={14}>
              Email
            </Typography>
            <Typography fontFamily="Poppins-Regular" fontSize={14}>
              {userRent.email}
            </Typography>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Typography fontFamily="Poppins-Medium" fontSize={14}>
              Nomor Telepon
            </Typography>
            <Typography fontFamily="Poppins-Regular" fontSize={14}>
              {userRent.no_telp}
            </Typography>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography fontFamily="Poppins-Medium" fontSize={14}>
              Alamat
            </Typography>
            <Typography
              fontFamily="Poppins-Regular"
              fontSize={14}
              numberOfLines={2}
              style={{ width: "50%", textAlign: "right" }}
            >
              {userRent.alamat}
            </Typography>
          </View>
          <Button style={{ marginTop: 20 }} onPress={handleToEditDataPenyewa}>
            Edit Data Penyewa
          </Button>
        </View>
      </ModalSwipe>
      {openModalTnc && (
        <View style={styles.containerPopup}>
          <TouchableWithoutFeedback onPress={() => setOpenModalTnc(false)}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  buttonWrapper: {
    alignItems: "center",
  },
  warningWrapper: {
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 50,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    borderTopWidth: 1,
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
