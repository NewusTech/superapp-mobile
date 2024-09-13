import React, { useRef, useState } from "react";
import {
  Animated,
  Clipboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Appbar, Button, Snackbar, Typography, View } from "@/components";
import { Card } from "@/components/card/Card";
import { IconChevronDown } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";

const viaAtm = [
  "Masukkan kartu ATM dan PIN kamu",
  "Pilih Menu Transaksi Lain",
  "Pilih Menu Pembayaran",
  "Pilih Menu Lain-lain",
  "Pilih Menu BRIVA",
  "Masukkan Nomor Virtual Account, (contoh: 10339XXXXXXXXXXX)",
  "Pilih Ya",
  "Ambil struk pembayaran kamu",
  "Pembayaran selesai",
];
const viaMbank = [
  "Login BRI Mobile",
  "Pilih Mobile Banking BRI",
  "Pilih Menu Pembayaran",
  "Pilih Menu BRIVA",
  ,
  "Masukkan Nomor Virtual Account, (contoh: 10339XXXXXXXXXXX)",
  "Klik Kirim",
  "Masukkan PIN Mobile",
  "Klik Kirim",
  "Struk pembayaran akan ditampilkan",
  "Pembayaran selesai",
];
const viaIbank = [
  "Login Internet Banking",
  "Pilih Pembayaran",
  "Pilih BRIVA",
  "Masukkan Nomor Virtual Account, (contoh: 10339XXXXXXXXXXX)",
  "Klik Kirim",
  "Masukkan Kata Sandi",
  "Masukkan mToken",
  "Klik Kirim",
  "Struk pembayaran akan ditampilkan",
  "Pembayaran selesai",
];

export default function TransferBri() {
  const params = useLocalSearchParams<{
    no_rek: string;
    kode_pemesanan: string;
    tipe: "rental" | "travel";
  }>();
  const { Colors } = useAppTheme();
  const router = useRouter();

  const panAtm = useRef(new Animated.Value(0)).current;
  const [openAtm, setOpenAtm] = useState(false);

  const panMbank = useRef(new Animated.Value(0)).current;
  const [openMbank, setOpenMbank] = useState(false);

  const panIbank = useRef(new Animated.Value(0)).current;
  const [openIbank, setOpenIbank] = useState(false);

  const handleToDetail = () => {
    if (params.tipe === "travel") {
      router.replace({
        pathname: "/(authenticated)/order/detail-order",
        params: {
          kode_pesanan: params.kode_pemesanan,
        },
      });
    }
    if (params.tipe === "rental") {
      router.replace({
        pathname: "/order/detail/order-rental",
        params: {
          kode_pesanan: params.kode_pemesanan,
        },
      });
    }
  };

  const handleOnpenAtm = () => {
    if (openAtm) {
      Animated.timing(panAtm, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
      setOpenAtm(false);
    } else {
      setOpenAtm(true);
      Animated.timing(panAtm, {
        toValue: 200,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };
  const handleOnpenMbank = () => {
    if (openMbank) {
      Animated.timing(panMbank, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
      setOpenMbank(false);
    } else {
      setOpenMbank(true);
      Animated.timing(panMbank, {
        toValue: 220,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleOnpenIbank = () => {
    if (openIbank) {
      Animated.timing(panIbank, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
      setOpenIbank(false);
    } else {
      setOpenIbank(true);
      Animated.timing(panIbank, {
        toValue: 220,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleCopyToClipBoard = () => {
    Clipboard.setString(params.no_rek);
    Snackbar.show({
      message: "Berhasil Mengcopy ke Clipboard",
    });
  };
  return (
    <View
      backgroundColor="paper"
      style={{ flex: 1, backgroundColor: Colors.paper }}
    >
      <Appbar
        title={"Transfer BRI"}
        backgroundColor="paper"
        backIconPress={() => router.back()}
      />
      <ScrollView
        contentContainerStyle={{
          flexDirection: "column",
          paddingHorizontal: 20,
          width: "100%",
          paddingVertical: 20,
          gap: 15,
        }}
      >
        <Card style={{ width: "100%" }} disabled>
          <View
            style={{ paddingHorizontal: 20, flexDirection: "column", gap: 5 }}
          >
            <Typography
              fontFamily="OpenSans-Semibold"
              fontSize={16}
              style={{
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: Colors.outlineborder,
              }}
            >
              Bank Transfer BRI
            </Typography>
            <Typography style={{ marginTop: 10 }}>No. rekening</Typography>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Typography
                fontFamily="OpenSans-Semibold"
                color="main"
                fontSize={21}
                style={{}}
              >
                {params.no_rek}
              </Typography>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={handleCopyToClipBoard}
              >
                <Typography
                  color="secondary"
                  fontFamily="OpenSans-Semibold"
                  fontSize={16}
                  style={{ textAlignVertical: "center" }}
                >
                  Salin
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
        {/* cara bayar via atm */}
        <Card style={{ width: "100%" }} disabled>
          <View
            style={{ paddingHorizontal: 10, flexDirection: "column", gap: 5 }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", justifyContent: "space-between" }}
              onPress={handleOnpenAtm}
            >
              <Typography fontFamily="OpenSans-Semibold" fontSize={14}>
                Cara Bayar via ATM
              </Typography>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={handleOnpenAtm}
              >
                <IconChevronDown width={18} height={18} />
              </TouchableOpacity>
            </TouchableOpacity>
            <Animated.View style={{ height: panAtm, marginTop: 10 }}>
              {viaAtm.map((data, i) => (
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Typography fontFamily="Poppins-Regular" fontSize={12}>
                    {i + 1}.
                  </Typography>
                  <Typography
                    fontFamily="Poppins-Regular"
                    fontSize={12}
                    style={{ width: "93%" }}
                  >
                    {data}
                  </Typography>
                </View>
              ))}
            </Animated.View>
          </View>
        </Card>
        {/* cara bayar va mobile banking */}
        <Card style={{ width: "100%" }} disabled>
          <View
            style={{ paddingHorizontal: 10, flexDirection: "column", gap: 5 }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", justifyContent: "space-between" }}
              onPress={handleOnpenMbank}
            >
              <Typography fontFamily="OpenSans-Semibold" fontSize={14}>
                Cara Bayar via ATM
              </Typography>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={handleOnpenMbank}
              >
                <IconChevronDown width={18} height={18} />
              </TouchableOpacity>
            </TouchableOpacity>
            <Animated.View style={{ height: panMbank, marginTop: 10 }}>
              {viaMbank.map((data, i) => (
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Typography fontFamily="Poppins-Regular" fontSize={12}>
                    {i + 1}.
                  </Typography>
                  <Typography
                    fontFamily="Poppins-Regular"
                    fontSize={12}
                    style={{ width: "93%" }}
                  >
                    {data}
                  </Typography>
                </View>
              ))}
            </Animated.View>
          </View>
        </Card>
        {/* cara bayar va internet banking */}
        <Card style={{ width: "100%" }} disabled>
          <View
            style={{ paddingHorizontal: 10, flexDirection: "column", gap: 5 }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row", justifyContent: "space-between" }}
              onPress={handleOnpenIbank}
            >
              <Typography fontFamily="OpenSans-Semibold" fontSize={14}>
                Cara Bayar via ATM
              </Typography>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={handleOnpenIbank}
              >
                <IconChevronDown width={18} height={18} />
              </TouchableOpacity>
            </TouchableOpacity>
            <Animated.View style={{ height: panIbank, marginTop: 10 }}>
              {viaIbank.map((data, i) => (
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Typography fontFamily="Poppins-Regular" fontSize={12}>
                    {i + 1}.
                  </Typography>
                  <Typography
                    fontFamily="Poppins-Regular"
                    fontSize={12}
                    style={{ width: "93%" }}
                  >
                    {data}
                  </Typography>
                </View>
              ))}
            </Animated.View>
          </View>
        </Card>

        <Button style={{}} onPress={handleToDetail}>
          Kembali Ke Histori
        </Button>
      </ScrollView>
    </View>
  );
}
