import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { z } from "zod";

import { Appbar, Button, TextInputV2, Typography, View } from "@/components";
import { useAppTheme } from "@/context/theme-context";
import {
  usePackageActions,
  usePackageOrderPayload,
} from "@/features/package/stores/package-store";
import { formatCurrency } from "@/utils/common";
import { zodResolver } from "@hookform/resolvers/zod";

const packageDetailSchema = z.object({
  departureDate: z.string(),
  arrivalDate: z.string(),
  packageType: z.string(),
  packageDescription: z.string(),
  totalWeight: z.string(),
});
export type PackageDetailPayload = z.infer<typeof packageDetailSchema>;
export default function PackageDetailFormScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { Colors } = useAppTheme();

  const { control, formState, handleSubmit } = useForm<PackageDetailPayload>({
    resolver: zodResolver(packageDetailSchema),
    mode: "all",
  });

  // stores
  const packageOrderPayload = usePackageOrderPayload();
  const { setPackageOrderPayload } = usePackageActions();

  const handleProceedToPayment = handleSubmit((data) => {
    setPackageOrderPayload({
      ...packageOrderPayload,
      orderDetail: data,
    });

    router.push("/package/payment");
  });

  return (
    <View backgroundColor="paper" style={styles.container}>
      <Appbar title="Detail Paket" backIconPress={() => router.back()} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={{ flexDirection: "row", gap: 16 }}>
          <InputWrapper
            title="Tanggal Dikirim"
            isMandatory
            containerStyle={{ flex: 1 }}
          >
            <Controller
              control={control}
              name="departureDate"
              render={({ field }) => (
                <TextInputV2
                  placeholder="HH/BB/TTTT"
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />
          </InputWrapper>
          <InputWrapper
            title="Tanggal Diterima"
            isMandatory
            containerStyle={{ flex: 1 }}
          >
            <Controller
              control={control}
              name="arrivalDate"
              render={({ field }) => (
                <TextInputV2
                  placeholder="HH/BB/TTTT"
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />
          </InputWrapper>
        </View>

        <InputWrapper title="Jenis Paket" isMandatory>
          <Controller
            control={control}
            name="packageType"
            render={({ field }) => (
              <TextInputV2
                placeholder="Masukan jenis paket"
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
        </InputWrapper>

        <InputWrapper title="Deskripsi Paket" isMandatory>
          <Controller
            control={control}
            name="packageDescription"
            render={({ field }) => (
              <TextInputV2
                placeholder="Deskripsi"
                value={field.value}
                onChangeText={field.onChange}
                numberOfLines={4}
              />
            )}
          />
        </InputWrapper>

        <View style={{ flexDirection: "row", gap: 16 }}>
          <InputWrapper
            title="Total Berat"
            isMandatory
            containerStyle={{ flex: 1 }}
          >
            <Controller
              control={control}
              name="totalWeight"
              render={({ field }) => (
                <TextInputV2
                  placeholder="Masukan Total Berat "
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />
          </InputWrapper>

          <View style={{ flex: 1 }} />
        </View>
      </ScrollView>

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
            disabled={!formState.isValid}
            onPress={handleProceedToPayment}
          >
            Bayar
          </Button>
        </View>
      </View>
    </View>
  );
}

type InputWrapperProps = {
  title: string;
  isMandatory?: boolean;
  containerStyle?: ViewProps["style"];
} & PropsWithChildren;
function InputWrapper({
  title,
  isMandatory = false,
  containerStyle,
  children,
}: InputWrapperProps) {
  return (
    <View style={[{ gap: 12 }, containerStyle]}>
      <Typography>
        {title}
        {isMandatory && <Typography color="dangerbase"> *</Typography>}
      </Typography>
      {children}
    </View>
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
});
