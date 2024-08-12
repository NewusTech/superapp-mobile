/* eslint-disable simple-import-sort/imports */
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import * as Linking from "expo-linking";
import { getPesananResponse } from "@/features/travel/store/travel-store";

const WebViewScreen = () => {
  const params = useLocalSearchParams<{ link: string | any }>();
  console.log("url", params?.link);

  const extractTransactionId = (url: string) => {
    const urlObj = new URL(url);
    const urlParams = new URLSearchParams(urlObj.search);
    return urlParams.get("transaction_id"); // Ganti 'transaction_id' dengan nama parameter yang sesuai dari URL redirect Midtrans
  };

  const pesananResponse = getPesananResponse();

  const onNavigationStateChange = (navState: any) => {
    if (
      navState.url.includes("admin-superapps.newus.id") ||
      navState.url.includes("example.com")
    ) {
      // const deepLinkUrl = Linking.createURL(`/payment/${pesananResponse?.data?.kode_pesanan}`)
      const deepLinkUrl = Linking.createURL(`/(authenticated)/(tabs)/order`);
      Linking.openURL(deepLinkUrl);
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
