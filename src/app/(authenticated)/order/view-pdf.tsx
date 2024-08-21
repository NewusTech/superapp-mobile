import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Iconify } from "react-native-iconify";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WebView from "react-native-webview";

import { Appbar, Snackbar, Typography } from "@/components";
import { IconDownload } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import downloadFile from "@/utils/downloadFile";

const ViewPdf = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{
    link: string | any;
    title: string;
    kode_pembayaran: string;
  }>();
  const insets = useSafeAreaInsets();

  const webViewRef = useRef<any>();

  const { Colors } = useAppTheme();

  // State untuk mengatur retry
  const [retry, setRetry] = useState(0);

  const [loading, setLoading] = useState(true); // State untuk mengatur loading
  const [error, setError] = useState(false); // State untuk mengatur error

  const handleDownload = async () => {
    try {
      await downloadFile(
        params.link,
        `${params.title}-${params.kode_pembayaran}`
      );
      Snackbar.show({
        message: "Berhasil Mendownload File",
      });
    } catch (error) {
      console.error(error);
      Snackbar.show({
        message: "Gagal Mendownload File",
        variant: "danger",
      });
    }
  };

  const uri =
    Platform.OS === "android"
      ? `https://docs.google.com/gview?embedded=true&url=${params.link}`
      : params.link;

  useEffect(() => {
    if (retry > 0) {
      setLoading(true);
      setError(false);
    }
  }, [retry]);

  if (!params.link) return router.back();

  return (
    <View style={styles.container}>
      <Appbar
        backIconPress={() => router.back()}
        title={
          <Typography
            fontFamily={"Poppins-Bold"}
            fontSize={16}
            color={"textprimary"}
            style={{
              textAlign: "left",
              width: "100%",
            }}
          >
            {params.title}
          </Typography>
        }
      />
      {loading && !error && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
      {error && (
        <Text style={styles.errorText}>Failed to load the document</Text>
      )}
      <WebView
        ref={webViewRef}
        source={{ uri }}
        style={{ flex: 1 }}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        renderError={() => (
          <View style={styles.container}>
            <Text style={styles.errorText}>
              Gagal memuat dokumen. Silakan coba lagi.
            </Text>
            <Button title="Retry" onPress={() => setRetry(retry + 1)} />
          </View>
        )}
      />
      <View
        style={{
          position: "absolute",
          bottom: insets.bottom + 50,
          right: insets.right + 20,
          gap: 10,
          flexDirection: "column",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Colors.paper,
            padding: 10,
            borderRadius: 100,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
          onPress={() => webViewRef?.current?.reload()}
        >
          <Iconify
            icon="material-symbols:refresh"
            size={24}
            color={Colors.quarternary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.main,
            padding: 10,
            borderRadius: 100,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
          onPress={handleDownload}
        >
          <IconDownload color="paper" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default ViewPdf;
