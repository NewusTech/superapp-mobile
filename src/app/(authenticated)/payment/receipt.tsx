import { useRef } from "react";
import { Image, Platform, StyleSheet } from "react-native";
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import Barcode from "react-native-barcode-sked";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ViewShot from "react-native-view-shot";

import { Appbar, Button, Separator, Typography, View } from "@/components";
import { useAppTheme } from "@/context/theme-context";
import { useAuthProfile } from "@/features/auth/store/auth-store";
import { TravelTicketItem } from "@/features/travel/components";

export default function PaymentReceiptScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const receiptImgRef = useRef<ViewShot | null>();

  const { Colors } = useAppTheme();

  const userProfile = useAuthProfile();

  // methods
  const handleOnReceiptCapture = () => {
    async function saveFile(uri: string, filename: string, mimetype: string) {
      try {
        if (Platform.OS === "android") {
          const permissions =
            await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
          if (permissions.granted) {
            const base64 = await FileSystem.readAsStringAsync(uri, {
              encoding: FileSystem.EncodingType.Base64,
            });
            await FileSystem.StorageAccessFramework.createFileAsync(
              permissions.directoryUri,
              filename,
              mimetype
            )
              .then(async (uri) => {
                await FileSystem.writeAsStringAsync(uri, base64, {
                  encoding: FileSystem.EncodingType.Base64,
                });
              })
              .catch((e) => console.log(e));
          } else {
            Sharing.shareAsync(uri);
          }
        } else {
          Sharing.shareAsync(uri);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (receiptImgRef.current) {
      receiptImgRef.current.capture?.().then((uri) => {
        // console.log("do something with ", uri);
        saveFile(uri, "ticket.jpg", "image/jpeg");
      });
    }
  };

  return (
    <View backgroundColor="paper" style={styles.container}>
      <Appbar title="e-Ticket" backIconPress={() => router.back()} />

      <ViewShot
        ref={receiptImgRef}
        options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}
        style={[styles.contentContainer, { backgroundColor: Colors.paper }]}
      >
        <View
          style={[styles.receiptWrapper, { borderColor: Colors.outlineborder }]}
        >
          <View style={styles.headerWrapper}>
            <Image
              source={require("@/assets/images/logo-rama.png")}
              style={styles.logo}
            />
            <View>
              <Typography fontFamily="Poppins-Bold">RAMA TRANZ</Typography>
              <Typography fontFamily="Poppins-SemiBold" fontSize={12}>
                PT. RASYA MANDIRI TRANZ
              </Typography>
            </View>
          </View>

          <Separator />

          <StatusItem
            left={{
              label: "Nama",
              value: userProfile?.nama || "",
            }}
            right={{
              label: "Kode Pemesanan",
              value: "EESBH21200001088",
            }}
          />
          <StatusItem
            left={{
              label: "Nomor Telepon",
              value: userProfile?.nama || "",
            }}
            right={{
              label: "Kursi",
              value: "EESBH21200001088",
            }}
          />
          <StatusItem
            left={{
              label: "Mobil",
              value: userProfile?.nama || "",
            }}
            right={{
              label: "Harga",
              value: "EESBH21200001088",
            }}
          />

          <Separator />

          <TravelTicketItem />

          <Separator />

          <View style={styles.barcodeWrapper}>
            <Barcode value="Hello World" format="CODE128" height={64} />
            <Typography fontFamily="Poppins-Bold">EESBH21200001088</Typography>
          </View>
        </View>
      </ViewShot>

      <View
        style={[
          styles.bottomActionContainer,
          {
            paddingBottom: insets.bottom + 24,
            borderColor: Colors.outlineborder,
          },
        ]}
      >
        <Button onPress={handleOnReceiptCapture}>Unduh</Button>
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
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  receiptWrapper: {
    borderWidth: 1,
    borderRadius: 2,
    padding: 16,
    paddingVertical: 24,
    gap: 24,
    justifyContent: "center",
    // alignItems: "center",
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 38,
    width: "100%",
  },
  barcodeWrapper: {
    alignItems: "center",
  },
  logo: {
    width: 66,
    height: 66,
    resizeMode: "contain",
  },
  bottomActionContainer: {
    padding: 24,
    borderTopWidth: 1,
  },
});
