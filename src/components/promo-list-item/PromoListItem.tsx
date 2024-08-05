import { StyleSheet, TouchableWithoutFeedback } from "react-native";

import { useAppTheme } from "@/context/theme-context";

import { Button } from "../button/Button";
import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export function PromoListItem() {
  const { Colors } = useAppTheme();

  return (
    <TouchableWithoutFeedback>
      <View
        backgroundColor="paper"
        style={[styles.container, { borderColor: Colors.outlineborder }]}
      >
        <View>
          <Typography fontSize={18} fontFamily="Poppins-SemiBold">
            30%
          </Typography>
        </View>

        <View style={styles.contentWrapper}>
          <View>
            <Typography
              color="main"
              fontFamily="Poppins-SemiBold"
              fontSize={16}
            >
              Diskon Travel Hingga 30%
            </Typography>
            <Typography fontFamily="Poppins-Regular">
              Min. pembelian Rp.1,000,000
            </Typography>
          </View>

          <View style={styles.contentBottomWrapper}>
            <Typography fontSize={12} color="textsecondary" style={{ flex: 1 }}>
              Berlaku hingga Jul 14,2024
            </Typography>

            <Button style={{ height: 30, minHeight: 30, maxHeight: 30 }}>
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
