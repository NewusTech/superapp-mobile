import { ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

import { Appbar, Button, TextInputV2, Typography, View } from "@/components";
import { useAppTheme } from "@/context/theme-context";
import {
  usePackageActions,
  usePackageOrderPayload,
} from "@/features/package/stores/package-store";
import { zodResolver } from "@hookform/resolvers/zod";

const pageContent = {
  from: {
    title: "Detail Pengambilan Paket",
    contentTitle: "Detail Pengirim",
  },
  to: {
    title: "Ambil paket di mana?",
    contentTitle: "Detail Penerima",
  },
};

const shipmentDetailFormSchema = z.object({
  name: z.string(),
  mobileNumber: z.string(),
  address: z.string(),
});
export type ShipmentDetailForm = z.infer<typeof shipmentDetailFormSchema>;
export default function ShipmentDetailFormScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { Colors } = useAppTheme();

  const params = useLocalSearchParams<{ pageType: "to" | "from" }>();

  const { control, formState, handleSubmit } = useForm<ShipmentDetailForm>({
    resolver: zodResolver(shipmentDetailFormSchema),
    mode: "all",
  });

  // store
  const packageOrderPayload = usePackageOrderPayload();
  const { setPackageOrderPayload } = usePackageActions();

  if (!params.pageType) return null;

  const handleSaveShipmentDetailForm = handleSubmit((data) => {
    setPackageOrderPayload({
      ...packageOrderPayload,
      [params.pageType]: {
        ...packageOrderPayload[params.pageType],
        form: data,
      },
    });

    const compare1 = params.pageType === "from" ? "to" : "from";

    if (packageOrderPayload?.[compare1]?.form) {
      router.push("/package/package-detail-form");
      return;
    } else {
      router.back();
      router.back();
    }
  });

  return (
    <View backgroundColor="paper" style={styles.container}>
      <Appbar
        title={pageContent[params.pageType].title}
        backIconPress={() => router.back()}
      />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.contentContainer}>
          <View
            style={[
              styles.locationContainer,
              { borderColor: Colors.outlineborder },
            ]}
          >
            <View style={styles.locationHeaderWrapper}>
              <Typography fontFamily="OpenSans-Bold">
                {packageOrderPayload?.[params.pageType].location?.nama}
              </Typography>

              <Button
                variant="secondary"
                style={{
                  backgroundColor: Colors.outlineborder,
                  borderColor: Colors.outlineborder,
                  minHeight: 20,
                }}
                onPress={() => router.back()}
              >
                <Typography
                  fontFamily="OpenSans-Bold"
                  fontSize={10}
                  color="main"
                >
                  Edit
                </Typography>
              </Button>
            </View>
            <Typography fontFamily="OpenSans-Light" fontSize={8}>
              {packageOrderPayload?.[params.pageType].location?.location}
            </Typography>
          </View>

          <View style={styles.formContainer}>
            <Typography fontFamily="OpenSans-Semibold">
              {pageContent[params.pageType].contentTitle}
              <Typography color="dangerbase"> *</Typography>
            </Typography>

            <View style={styles.formWrapper}>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <TextInputV2
                    placeholder="Nama Pengirim"
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="mobileNumber"
                render={({ field }) => (
                  <TextInputV2
                    placeholder="Masukkan Nomor Telepon"
                    leadingString="+62"
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="address"
                render={({ field }) => (
                  <TextInputV2
                    placeholder="Deskripsi"
                    numberOfLines={4}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.bottomActionContainer,
          {
            paddingBottom: insets.bottom + 24,
            borderColor: Colors.outlineborder,
          },
        ]}
      >
        <Button
          onPress={handleSaveShipmentDetailForm}
          disabled={!formState.isValid}
        >
          Simpan
        </Button>
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
    gap: 43,
  },
  locationContainer: {
    borderWidth: 1,
    padding: 24,
    borderRadius: 2,
    gap: 8,
  },
  locationHeaderWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  formContainer: {
    gap: 24,
  },
  formWrapper: {
    gap: 12,
  },
  bottomActionContainer: {
    padding: 24,
    borderTopWidth: 1,
  },
});
