import { FlatList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, PromoListItem, TextInputV2, View } from "@/components";

import { PromoItemList } from "../travel/booking-travel";

export default function PromoScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      backgroundColor="paper"
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.searchPromoContainer} backgroundColor="paper">
        <View style={{ flex: 1 }}>
          <TextInputV2
            leadingIcon={<View style={{ height: 46 }} />}
            placeholder="Masukan Kode Promosi"
          />
        </View>

        <Button>Terapkan</Button>
      </View>

      <FlatList
        data={PromoItemList}
        renderItem={() => <PromoListItem />}
        style={{ flex: 1 }}
        contentContainerStyle={styles.promoListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  promoListContainer: {
    gap: 16,
    padding: 24,
    paddingTop: 8,
    flexGrow: 1,
  },
  searchPromoContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingTop: 70,
    gap: 4,
  },
});
