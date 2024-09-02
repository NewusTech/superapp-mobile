/* eslint-disable simple-import-sort/imports */
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const WebViewScreen = () => {
  const params = useLocalSearchParams<{
    link: string | any;
    kode_pesanan: string;
  }>();
  console.log("url", params?.link);

  const router = useRouter(); // Mendapatkan router untuk navigasi
  const hasNavigated = useRef(false); // Ref untuk melacak apakah navigasi sudah dilakukan

  const onNavigationStateChange = async (navState: any) => {
    if (
      navState.url.includes("admin-superapps.newus.id") ||
      (navState.url.includes("example.com") && !hasNavigated.current) // Pastikan hanya dijalankan sekali
    ) {
      hasNavigated.current = true; // Tandai navigasi telah dilakukan

      // Tunggu dismiss selesai sebelum push navigasi
      await router.dismissAll();

      if (params.kode_pesanan) {
        router.push(
          `/(authenticated)/order/detail/order-rental?kode_pesanan=${params.kode_pesanan}`
        );
      } else {
        router.push(`/(authenticated)/(tabs)/order?active_tab=riwayat`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: params?.link }}
        onNavigationStateChange={onNavigationStateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
  },
});

export default WebViewScreen;
