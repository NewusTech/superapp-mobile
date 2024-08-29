import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

import { Appbar, Button, TextInput, Typography, View } from "@/components";
import { IconUpload } from "@/components/icons";
import InputFile from "@/components/input-file/InputFile";
import { useAppTheme } from "@/context/theme-context";
import {
  useRentActions,
  useUserRentalPayload,
} from "@/features/rental/store/rental-store";
import { zodResolver } from "@hookform/resolvers/zod";

export const userRentSchema = z.object({
  nama: z.string(),
  nik: z.string().min(16, "NIK Minimal 16 Digits"),
  email: z.string().email(),
  no_telp: z.string().min(8, "Nomor Telepon Minimal 8 Digit"),
  alamat: z.string(),
  username_ig: z.string(),
  username_fb: z.string(),
});
export type UserRent = z.infer<typeof userRentSchema>;

export default function DetailUserRent() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;

  const params = useLocalSearchParams<{
    isEdit: string;
  }>();

  const { Colors } = useAppTheme();

  //store
  const userRent = useUserRentalPayload();
  const { setUserRentalPayload } = useRentActions();

  const {
    control,
    formState,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
  } = useForm<UserRent>({
    resolver: zodResolver(userRentSchema),
    mode: "all",
  });

  const handleSubmitForm = handleSubmit((data) => {
    console.log(data);
    setUserRentalPayload(data);
    if (params.isEdit === "true") return router.back();
    router.push("/rental/detail-rent-car");
  });

  useEffect(() => {
    setValue("nama", userRent?.nama || "tes");
    setValue("email", userRent?.email || "tes@tes.com");
    setValue("nik", userRent?.nik || "1234567890123456");
    setValue("no_telp", userRent?.no_telp || "1234567890");
    setValue("alamat", userRent?.alamat || "123");
    setValue("username_fb", userRent?.alamat || "ramatranz");
    setValue("username_ig", userRent?.alamat || "ramatranz");
  }, [userRent, setValue]);

  const emailValue = watch("email");

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue && !emailRegex.test(emailValue)) {
      setError("email", {
        type: "manual",
        message:
          "Email tidak valid. Harus berisi '@' dan diakhiri dengan '.com'.",
      });
    }
  }, [emailValue, setError, clearErrors]);

  return (
    <View style={[styles.container, { backgroundColor: Colors.paper }]}>
      <Appbar
        title={"Detail Informasi Penyewa"}
        backgroundColor="paper"
        hasBorder={false}
        backIconPress={() => router.back()}
      />
      <ScrollView
        style={{ paddingVertical: 20, marginBottom: insets.bottom + 20 }}
      >
        <View
          borderColor="outlineborder"
          style={[
            styles.contentContainer,
            {
              backgroundColor: Colors.paper,
              borderColor: Colors.outlineborder,
              marginBottom: insets.bottom + 20,
            },
          ]}
        >
          <Controller
            control={control}
            name="nama"
            render={({ field }) => (
              <TextInput
                label="Nama *"
                placeholder="Nama"
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
              />
            )}
          />
          <Controller
            control={control}
            name="nik"
            render={({ field }) => (
              <TextInput
                label="NIK *"
                inputMode="numeric"
                maxLength={16}
                placeholder="NIK"
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                errorMessage={formState?.errors?.nik?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextInput
                label="Email *"
                inputMode="email"
                placeholder="Email"
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                errorMessage={formState?.errors?.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="no_telp"
            render={({ field }) => (
              <TextInput
                inputMode="numeric"
                maxLength={13}
                label="Nomor Telepon *"
                placeholder="Nomor Telepon"
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                errorMessage={formState?.errors?.no_telp?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="alamat"
            render={({ field }) => (
              <TextInput
                label="Alamat Lengkap *"
                placeholder="Jl.alamat"
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                borderRadius={20}
                numberOfLines={5}
                textAlignVertical="top"
                multiline={true}
              />
            )}
          />
          <Controller
            control={control}
            name="username_ig"
            render={({ field }) => (
              <TextInput
                label="Username Instagram *"
                placeholder="ramatranz"
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                borderRadius={20}
              />
            )}
          />
          <Controller
            control={control}
            name="username_fb"
            render={({ field }) => (
              <TextInput
                label="Username Facebook *"
                placeholder="ramatranz"
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                borderRadius={20}
              />
            )}
          />

          <InputFile label="Masukan Foto KTP" />
          <InputFile label="Masukan Swafoto" />

          <View
            style={[styles.buttonWrapper, { marginBottom: insets.bottom + 10 }]}
          >
            <Button
              disabled={!formState.isValid || !emailRegex.test(emailValue)}
              onPress={handleSubmitForm}
              style={{ height: 45, width: 120 }}
            >
              Simpan
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginHorizontal: 24,
    borderWidth: 1,
    borderRadius: 20,
    padding: 12,
    gap: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  buttonWrapper: {
    alignItems: "center",
  },
});
