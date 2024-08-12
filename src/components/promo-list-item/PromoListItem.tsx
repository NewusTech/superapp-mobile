import { Clipboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useRouter } from "expo-router";

import { useAppTheme } from "@/context/theme-context";
import { formatLocalDate } from "@/utils/datetime";

import { Button } from "../button/Button";
import { Snackbar } from "../snackbar/Snackbar";
import { Typography } from "../typography/Typography";
import { View } from "../view/View";

type PromoListItemType = {
  discount: string;
  label: string;
  min_transaksi: string;
  detail: string;
  expired: string;
  kode_promo: string;
};

export function PromoListItem(data: PromoListItemType) {
  const router = useRouter();

  const { Colors } = useAppTheme();

  const handleDetailPesanan = () => {
    router.push(`/(authenticated)/promo/${data.kode_promo}`);
  };

  const copyToClipboard = () => {
    Clipboard.setString(data.kode_promo);
    Snackbar.show({
      message: "Berhasil Menyalin Kode Promosi " + data.kode_promo,
      variant: "neutral",
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleDetailPesanan}>
      <View
        backgroundColor="paper"
        style={[
          styles.container,
          { borderColor: Colors.outlineborder, borderRadius: 20 },
        ]}
      >
        <View>
          <Typography fontSize={18} fontFamily="Poppins-SemiBold">
            {data.discount}
          </Typography>
        </View>

        <View style={styles.contentWrapper}>
          <View>
            <Typography
              color="main"
              fontFamily="Poppins-SemiBold"
              fontSize={16}
            >
              {data.label}
            </Typography>
            <Typography fontFamily="Poppins-Regular">
              Min. pembelian {data.min_transaksi}
            </Typography>
          </View>

          <View style={styles.contentBottomWrapper}>
            <Typography fontSize={12} color="textsecondary" style={{ flex: 1 }}>
              Berlaku hingga {formatLocalDate(new Date(data.expired))}
            </Typography>

            <Button
              style={{ height: 30, minHeight: 30, maxHeight: 30 }}
              onPress={copyToClipboard}
            >
              Salin
            </Button>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    gap: 16,
    borderWidth: 1,
    alignItems: "center",
  },
  contentWrapper: {
    flex: 1,
    gap: 8,
  },
  contentBottomWrapper: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
});
