import { StyleSheet } from "react-native";

import { Separator, Typography, View } from "@/components";
import { IconClock } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";

export function PaymentStatusWaiting() {
  const { Colors } = useAppTheme();

  return (
    <View style={[styles.statusWrapper, { borderColor: Colors.outlineborder }]}>
      <View backgroundColor="textsecondary" style={styles.roundedIconWrapper}>
        <IconClock color="paper" size={40} />
      </View>

      <Typography fontFamily="Poppins-Bold" fontSize={20} color="textsecondary">
        Menunggu Pembayaran...
      </Typography>

      <Separator />

      <Typography
        color="textsecondary"
        fontSize={13}
        style={{ textAlign: "center" }}
      >
        Silahkan lakukan pembayaran dengan batas waktu yang telah ditentukan.
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  statusWrapper: {
    borderWidth: 1,
    borderRadius: 2,
    padding: 16,
    paddingVertical: 24,
    gap: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  roundedIconWrapper: {
    height: 80,
    width: 80,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
});
