import { useState } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Appbar,
  Button,
  PageWrapper,
  Separator,
  Snackbar,
  TextInputV2,
  Typography,
  View,
} from "@/components";
import {
  IconPackageExport,
  IconPackageImport,
  IconSwap,
} from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { usePackageOrderPayload } from "@/features/package/stores/package-store";
import { usePostProcessPaymentMutation } from "@/features/payment/api/usePostProcessPaymentMutation";
import { PaymentComponent } from "@/features/payment/components";
import { formatCurrency } from "@/utils/common";

export default function PackagePaymentScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { Colors } = useAppTheme();

  // state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    number | null
  >(null);

  // store
  const packageOrderPayload = usePackageOrderPayload();

  // query & mutation
  const processPaymentMutation = usePostProcessPaymentMutation();

  // method
  const handleProcessPayment = () => {
    const paymentData = {};
    processPaymentMutation.mutate(paymentData, {
      onSuccess: () => {
        Snackbar.show({ message: "Order pesanan berhasil" });
        router.push({
          pathname: "/payment/status/[id]",
          params: {
            id: 13,
          },
        });
      },
      onError: () => {
        Snackbar.show({
          message: "Order pesanan gagal, coba setelah beberapa saat",
          variant: "danger",
        });
      },
    });
  };

  return (
    <PageWrapper
      isLoading={processPaymentMutation.isPending}
      backgroundColor="paper"
      style={styles.container}
    >
      <Appbar title="Pembayaran" backIconPress={() => router.back()} />

      <View style={styles.contentContainer}>
        <View
          style={[styles.destinationBox, { borderColor: Colors.outlineborder }]}
        >
          <View style={{ gap: 4 }}>
            <TextInputV2
              placeholder="Lampung"
              leadingIcon={
                <IconPackageImport width={20} height={20} color="main" />
              }
              value={packageOrderPayload?.from?.location?.nama}
              withBorder={false}
              asTouchable
            />
            <Typography>{packageOrderPayload?.from.form?.name}</Typography>
          </View>
          <Separator />
          <View style={{ gap: 4 }}>
            <TextInputV2
              placeholder="Palembang"
              leadingIcon={
                <IconPackageExport width={20} height={20} color="main" />
              }
              value={packageOrderPayload?.to?.location?.nama}
              withBorder={false}
              asTouchable
            />
            <Typography>{packageOrderPayload?.from.form?.name}</Typography>
          </View>

          <View backgroundColor="main" style={styles.destinationIconSwap}>
            <IconSwap width={20} height={20} color="paper" />
          </View>
        </View>

        <PaymentComponent
          onMethodSelected={setSelectedPaymentMethod}
          selectedMethod={selectedPaymentMethod}
        />
      </View>

      <View
        style={[
          styles.bottomContainer,
          {
            paddingBottom: 24 + insets.bottom,
            borderColor: Colors.outlineborder,
          },
        ]}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Typography fontFamily="OpenSans-Semibold" fontSize={16} color="main">
            {formatCurrency(80000)}
          </Typography>
          <Typography
            fontFamily="OpenSans-Regular"
            fontSize={14}
            color="textsecondary"
          >
            Total Harga
          </Typography>
        </View>
        <View style={{ flex: 1 }}>
          <Button
            onPress={handleProcessPayment}
            disabled={!selectedPaymentMethod}
          >
            Bayar
          </Button>
        </View>
      </View>
    </PageWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 30,
    gap: 30,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    borderTopWidth: 1,
  },
  destinationBox: {
    borderWidth: 1,
    borderRadius: 2,
    padding: 12,
    gap: 12,
    justifyContent: "center",
  },
  destinationIconSwap: {
    height: 40,
    width: 40,
    borderRadius: 99,
    position: "absolute",
    right: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
