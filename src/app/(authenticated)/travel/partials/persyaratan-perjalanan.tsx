import { FlatList, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, SectionWrapper, Typography, View } from "@/components";
import {
  IconBus,
  IconExclamantionMark,
  IconSuitcase,
} from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";

export default function PersyaratanPerjalanan() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { Colors } = useAppTheme();

  const dataKeberangkatan = [
    {
      data: "Penumpang sudah siap setidaknya 60 menit sebelum keberangkatan di titik keberangkatan yang telah ditentukan oleh agen. Keterlambatan penumpang dapat menyebabkan tiket dibatalkan secara sepihak dan tidak mendapatkan pengembalian dana.",
    },
    {
      data: "Pelanggan diwajibkan untuk menunjukkan e-tiket dan identitas yang berlaku (KTP/ Paspor/ SIM).",
    },
    {
      data: "Waktu keberangkatan yang tertera di aplikasi adalah waktu lokal di titik keberangkatan.",
    },
  ];
  const dataBarangBawaan = [
    {
      data: "Penumpang sudah siap setidaknya 60 menit sebelum keberangkatan di titik keberangkatan yang telah ditentukan oleh agen. Keterlambatan penumpang dapat menyebabkan tiket dibatalkan secara sepihak dan tidak mendapatkan pengembalian dana.",
    },
    {
      data: "Pelanggan diwajibkan untuk menunjukkan e-tiket dan identitas yang berlaku (KTP/ Paspor/ SIM).",
    },
    {
      data: "Waktu keberangkatan yang tertera di aplikasi adalah waktu lokal di titik keberangkatan.",
    },
  ];

  return (
    <ScrollView style={{ backgroundColor: Colors.paper }}>
      <Appbar
        title={"Cara Persyaratan Perjalanan"}
        backIconPress={() => router.back()}
      />
      <View style={{ paddingHorizontal: 25, paddingVertical: 20, gap: 10 }}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <IconBus color="main" />
          <Typography fontFamily="Poppins-Regular" fontSize={16} color="main">
            Keberangkatan
          </Typography>
        </View>
        <FlatList
          data={dataKeberangkatan}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item, index }) => {
            return (
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Typography fontFamily="Poppins-Regular" fontSize={12}>
                  {index + 1}.
                </Typography>
                <Typography
                  fontFamily="Poppins-Regular"
                  fontSize={12}
                  color="textsecondary"
                  style={{ width: "90%", textAlign: "justify" }}
                >
                  {item.data}
                </Typography>
              </View>
            );
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 25, paddingVertical: 10, gap: 10 }}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <IconSuitcase color="main" />
          <Typography fontFamily="Poppins-Regular" fontSize={16} color="main">
            Barang Bawaan
          </Typography>
        </View>
        <FlatList
          data={dataBarangBawaan}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item, index }) => {
            return (
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Typography fontFamily="Poppins-Regular" fontSize={12}>
                  {index + 1}.
                </Typography>
                <Typography
                  fontFamily="Poppins-Regular"
                  fontSize={12}
                  color="textsecondary"
                  style={{ width: "90%", textAlign: "justify" }}
                >
                  {item.data}
                </Typography>
              </View>
            );
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 25, paddingVertical: 10, gap: 10 }}>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <IconExclamantionMark color="main" />
          <Typography fontFamily="Poppins-Regular" fontSize={16} color="main">
            Himbauan
          </Typography>
        </View>
        <FlatList
          data={dataBarangBawaan}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item, index }) => {
            return (
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Typography fontFamily="Poppins-Regular" fontSize={12}>
                  {index + 1}.
                </Typography>
                <Typography
                  fontFamily="Poppins-Regular"
                  fontSize={12}
                  color="textsecondary"
                  style={{ width: "90%", textAlign: "justify" }}
                >
                  {item.data}
                </Typography>
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
}
