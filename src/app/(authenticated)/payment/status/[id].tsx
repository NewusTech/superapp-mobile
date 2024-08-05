import { useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, Button, Loader, Snackbar, View } from "@/components";
import { useAppTheme } from "@/context/theme-context";
import { useGetPaymentStatusDetail } from "@/features/payment/api/useGetPaymentStatusDetail";
import {
  PaymentStatusFailed,
  PaymentStatusSuccess,
  PaymentStatusWaiting,
  PaymentStatusWaitingVA,
} from "@/features/payment/components";
import { useHardwareBackpress } from "@/hooks/useHardwareBackPress";

export default function PaymentStatusScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const params = useLocalSearchParams<{ id: string }>();

  const { Colors } = useAppTheme();

  const handleOnBackPress = useCallback(() => {
    const routes = navigation.getState()?.routes;
    const prevRoute = routes[routes.length - 2];

    if (
      prevRoute.name === "travel/payment" ||
      prevRoute.name === "package/payment"
    ) {
      navigation.reset({
        index: 0,
        routes: [{ name: "(authenticated)" }],
      });
    } else {
      router.back();
    }
  }, [navigation, router]);

  useHardwareBackpress(handleOnBackPress);

  // query
  const paymentStatusQuery = useGetPaymentStatusDetail(params?.id || "");

  useEffect(() => {
    if (paymentStatusQuery.error) {
      Snackbar.show({
        message: "Terjadi kesalahan, coba kembali nanti",
        variant: "danger",
      });
      handleOnBackPress();
    }
  }, [handleOnBackPress, paymentStatusQuery.error]);

  return (
    <View backgroundColor="paper" style={styles.container}>
      <Appbar title="Status Pembayaran" backIconPress={handleOnBackPress} />

      <View style={styles.contentContainer}>
        {paymentStatusQuery.isFetching ? (
          <View
            style={{
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loader />
          </View>
        ) : paymentStatusQuery.data?.data.status === "success" ? (
          <PaymentStatusSuccess />
        ) : paymentStatusQuery.data?.data.status === "failed" ? (
          <PaymentStatusFailed />
        ) : paymentStatusQuery.data?.data.status === "waiting" ? (
          paymentStatusQuery.data?.data.type === "va" ? (
            <PaymentStatusWaitingVA data={paymentStatusQuery.data?.data} />
          ) : (
            <PaymentStatusWaiting />
          )
        ) : null}
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
        <Button onPress={() => router.back()}>Kembali ke Beranda</Button>
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
    gap: 24,
    padding: 24,
  },
  bottomActionContainer: {
    padding: 24,
    borderTopWidth: 1,
  },
});
