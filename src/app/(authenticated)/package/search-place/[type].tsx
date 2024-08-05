import { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableHighlight } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GetDoorToDoorApiResponseSuccess } from "@/apis/internal.api.type";
import {
  Appbar,
  Button,
  Loader,
  RadioItem,
  SearchBox,
  Snackbar,
  Typography,
  View,
} from "@/components";
import { useAppTheme } from "@/context/theme-context";
import { useGetDoorToDoorQuery } from "@/features/package/api/useGetDoorToDoorQuery";
import {
  usePackageActions,
  usePackageOrderPayload,
} from "@/features/package/stores/package-store";
import useDebounce from "@/hooks/useDebounce";

const pageContent = {
  from: {
    title: "Ambil paket di mana?",
    placeholder: "Cari Lokasi Pengambilan Paket",
  },
  to: {
    title: "Kirim pake ke mana?",
    placeholder: "Cari Lokasi Pengiriman Paket",
  },
};

export default function SearchPlaceScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { Colors } = useAppTheme();

  const params = useLocalSearchParams<{ type: "to" | "from" }>();

  // state
  const [selectedPlace, setSelectedPlace] = useState<
    GetDoorToDoorApiResponseSuccess["data"][number] | null
  >(null);
  const [searchValue, setSearchValue] = useState("");

  const searchValueDebounce = useDebounce(searchValue, 1000);

  // stores
  const packageOrderPayload = usePackageOrderPayload();
  const { setPackageOrderPayload } = usePackageActions();

  // query & muatation
  const doorToDoorQuery = useGetDoorToDoorQuery({
    query: searchValueDebounce,
  });

  useEffect(() => {
    if (!params) {
      Snackbar.show({ message: "Something wrong" });
    }
  }, [params]);

  const handleProceedShipmentDetailForm = () => {
    if (!selectedPlace) return;

    setPackageOrderPayload({
      ...packageOrderPayload,
      [params.type]: {
        location: selectedPlace,
      },
    });

    router.push({
      pathname: "/package/shipment-detail-form/[pageType]",
      params: {
        pageType: params.type,
      },
    });
  };

  if (!params.type) return null;

  return (
    <View backgroundColor="paper" style={styles.container}>
      <Appbar
        title={pageContent[params.type].title}
        backIconPress={() => router.back()}
      />

      <View style={styles.contentContainer}>
        <SearchBox
          placeholder={pageContent[params.type].title}
          value={searchValue}
          onChangeText={setSearchValue}
          trailingIcon={
            doorToDoorQuery.isFetching ? <Loader size={16} /> : null
          }
        />

        <FlatList
          data={doorToDoorQuery.data?.data ?? []}
          renderItem={({ item }) => (
            <TouchableHighlight
              underlayColor={Colors.outlineborder}
              onPress={() => setSelectedPlace(item)}
            >
              <View backgroundColor="paper" style={styles.itemWrapper}>
                <RadioItem selected={item.nama === selectedPlace?.nama} />
                <Typography>{item.nama}</Typography>
              </View>
            </TouchableHighlight>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyListContainer}>
              {false ? (
                <Loader />
              ) : (
                <Typography fontFamily="Poppins-Medium">
                  Tidak ada data
                </Typography>
              )}
            </View>
          )}
          style={{ flex: 1, marginTop: 24 }}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>

      <View
        style={[
          styles.bottomActionContainer,
          {
            paddingBottom: insets.bottom + 24,
            borderColor: Colors.outlineborder,
          },
        ]}
      >
        <Button
          onPress={handleProceedShipmentDetailForm}
          disabled={!selectedPlace}
        >
          Lanjut
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  bottomActionContainer: {
    padding: 24,
    borderTopWidth: 1,
  },
  itemWrapper: {
    gap: 14,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  emptyListContainer: {
    minHeight: 400,
    justifyContent: "center",
    alignItems: "center",
  },
});
