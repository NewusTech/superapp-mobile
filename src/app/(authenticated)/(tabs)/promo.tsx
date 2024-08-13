import { FlatList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, PromoListItem, TextInputV2, View } from "@/components";
import { PromoItem } from "@/components/promo-item/PromoItem";

import { PromoItemList } from "../travel/booking-travel";

export default function PromoScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      backgroundColor="paper"
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
          padding: 20,
        }}
      >
        <PromoItem
          imgUrl={require("@/assets/images/promo/1.png")}
          width={326}
          borderRadius={20}
        />
      </View>
      <View style={[styles.searchPromoContainer]} backgroundColor="paper">
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
        renderItem={() => (
          <PromoListItem
            discount="30%"
            expired={new Date().toString()}
            detail="detail"
            kode_promo="PROMO_SSSS"
            label="Diskon Travel Hingga 30% "
            min_transaksi="Rp.1,000,000"
          />
        )}
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
    gap: 10,
  },
});
