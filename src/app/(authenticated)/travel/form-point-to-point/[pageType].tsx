import { useState } from "react";
import { FlatList, StyleSheet, TouchableHighlight } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Appbar,
  Button,
  Loader,
  RadioItem,
  Typography,
  View,
} from "@/components";
import { AppColor } from "@/constants/Colors";
import { useAppTheme } from "@/context/theme-context";
import { useGetPointToPointApi } from "@/features/travel/api/useGetPointToPointApi";
import {
  useTravelActions,
  useTravelbookingPayload,
  useTravelPointToPointPayload,
} from "@/features/travel/store/travel-store";

export default function FormPoinToPointScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{
    pageType: "from" | "to";
  }>();

  const pageType = params.pageType || "from";
  const { Colors } = useAppTheme();

  const [selectedPoint, setSelectedPoint] = useState("");

  const pointToPointPayload = useTravelPointToPointPayload();
  const bookingPayload = useTravelbookingPayload();
  const { setPointToPointPayload } = useTravelActions();

  console.log({ bookingPayload, pointToPointPayload });

  const pointToPointQuery = useGetPointToPointApi({
    point: bookingPayload?.[pageType]?.toLowerCase() || "",
  });

  const handleSavePoint = () => {
    setPointToPointPayload({
      ...pointToPointPayload,
      [pageType]: selectedPoint,
    });
    router.back();
  };

  return (
    <View backgroundColor="paper" style={styles.container}>
      <Appbar
        title={`Pilih Titik ${pageType === "from" ? "Jemput" : "Antar"}`}
        backIconPress={() => router.back()}
        hasBorder={false}
      />

      <FlatList
        data={pointToPointQuery.data?.data ?? []}
        ListHeaderComponent={() => (
          <View backgroundColor="outlineborder" style={styles.headerContainer}>
            <Typography
              fontFamily="OpenSans-Semibold"
              fontSize={12}
              color="textsecondary"
            >
              {pageType === "from"
                ? "Titik jemput yang tersedia"
                : "Titik antar yang tersedia"}
            </Typography>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableHighlight
            underlayColor={Colors.outlineborder}
            onPress={() => setSelectedPoint(item.nama)}
          >
            <View backgroundColor="paper" style={styles.itemWrapper}>
              <RadioItem selected={item.nama === selectedPoint} />
              <Typography>{item.nama}</Typography>
            </View>
          </TouchableHighlight>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyListContainer}>
            {pointToPointQuery.isFetching ? (
              <Loader />
            ) : (
              <Typography fontFamily="Poppins-Medium">
                Tidak ada data
              </Typography>
            )}
          </View>
        )}
        style={{ marginTop: 24 }}
      />
      <View style={styles.containerNote}>
        <Typography style={[styles.textNote, { fontWeight: "bold" }]}>
          Catatan :
        </Typography>
        <Typography style={styles.textNote}>
          Jika alamat penjemputan Anda tidak tersedia di titik jemput kami, akan
          ada tambahan biaya. Silakan pilih titik jemput terdekat atau hubungi
          admin di 085764156224 untuk bantuan lebih lanjut.
        </Typography>
      </View>
      <View
        style={[
          styles.bottomActionContainer,
          { paddingBottom: insets.bottom + 16 },
        ]}
      >
        <Button onPress={handleSavePoint} disabled={!selectedPoint}>
          Pilih
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 40,
    paddingVertical: 12,
    marginBottom: 16,
  },
  bottomActionContainer: {
    paddingHorizontal: 40,
    paddingTop: 12,
  },
  itemWrapper: {
    gap: 14,
    padding: 8,
    paddingHorizontal: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  emptyListContainer: {
    minHeight: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  containerNote: {
    backgroundColor: AppColor.light.dangerlight,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    marginBottom: 50,
    display: "flex",
    flexDirection: "column",
  },
  textNote: {
    color: AppColor.dark.dangerbase,
  },
});
