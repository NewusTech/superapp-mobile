import { StyleSheet } from "react-native";

import { Separator, Typography, View } from "@/components";
import { IconCross } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";

export function PaymentStatusFailed() {
  const { Colors } = useAppTheme();

  return (
    <View style={[styles.statusWrapper, { borderColor: Colors.outlineborder }]}>
      <View backgroundColor="dangerbase" style={styles.roundedIconWrapper}>
        <IconCross color="paper" size={32} />
      </View>

      <Typography fontFamily="Poppins-Bold" fontSize={20} color="dangerbase">
        Pembayaran Gagal!
      </Typography>

      <Separator />

      <Typography
        color="dangerbase"
        fontSize={13}
        style={{ textAlign: "center" }}
      >
        Pembayaran gagal karena melebihi batas waktu yang telah ditentukan,
        silahkan pesan kembali.
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
