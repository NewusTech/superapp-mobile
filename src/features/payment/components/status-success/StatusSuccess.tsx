import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { Button, Separator, Typography, View } from "@/components";
import { IconCIChecklist, IconDownload } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";

export function PaymentStatusSuccess() {
  const router = useRouter();

  const { Colors } = useAppTheme();

  return (
    <View style={[styles.statusWrapper, { borderColor: Colors.outlineborder }]}>
      <View backgroundColor="success" style={styles.roundedIconWrapper}>
        <IconCIChecklist color="paper" size={40} />
      </View>

      <Typography fontFamily="Poppins-Bold" fontSize={20}>
        Pembayaran Sukses!
      </Typography>

      <Separator />

      <StatusItem
        left={{
          label: "Nomor Pembayaran",
          value: "INV567489240UI",
        }}
        right={{
          label: "Metode Pembayaran",
          value: "Bank Transfer",
        }}
      />
      <StatusItem
        left={{
          label: "Tanggal",
          value: "INV567489240UI",
        }}
        right={{
          label: "Waktu",
          value: "Bank Transfer",
        }}
      />
      <StatusItem
        left={{
          label: "Jumlah Dibayarkan",
          value: "INV567489240UI",
        }}
        right={{
          label: "Status",
          value: "Bank Transfer",
        }}
      />

      <Separator />

      <View style={{ width: "100%" }}>
        <Button
          variant="secondary"
          style={{
            backgroundColor: Colors.bgsecondary,
            borderColor: Colors.bgsecondary,
          }}
          onPress={() => router.push("/payment/receipt")}
        >
          <IconDownload color="main" />
          <Typography fontFamily="Poppins-Bold" color="main">
            Unduh
          </Typography>
        </Button>
      </View>
    </View>
  );
}

type StatusItemProps = {
  left: {
    label: string;
    value: string;
  };
  right: {
    label: string;
    value: string;
  };
};
function StatusItem({ left, right }: StatusItemProps) {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Typography color="textsecondary">{left.label}</Typography>
        <Typography fontFamily="Poppins-Bold" fontSize={16}>
          {left.value}
        </Typography>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Typography color="textsecondary">{right.label}</Typography>
        <Typography fontFamily="Poppins-Bold" fontSize={16}>
          {right.value}
        </Typography>
      </View>
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
