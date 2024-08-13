import { ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

import { Appbar, Button, TextInput, View } from "@/components";
import { useAppTheme } from "@/context/theme-context";
import { zodResolver } from "@hookform/resolvers/zod";

export const userRentSchema = z.object({
  nama: z.string(),
  nik: z.string(),
  email: z.string().email(),
  no_telp: z.string(),
  alamat: z.string(),
});
export type UserRent = z.infer<typeof userRentSchema>;

export default function DetailUserRent() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { Colors } = useAppTheme();

  const { control, formState, handleSubmit, setValue } = useForm<UserRent>({
    resolver: zodResolver(userRentSchema),
    mode: "all",
  });

  //   const handleSubmitForm = handleSubmit((data) => {
  //     router.push("/travel/detail-rent-car");
  //   });

  return (
    <View style={[styles.container, { backgroundColor: Colors.paper }]}>
      <Appbar
        title={"Detail Informasi Penyewa"}
        backgroundColor="paper"
        hasBorder={false}
        backIconPress={() => router.back()}
      />
      <ScrollView style={{ paddingVertical: 20 }}>
        <View
          borderColor="outlineborder"
          style={[
            styles.contentContainer,
            {
              backgroundColor: Colors.paper,
              borderColor: Colors.outlineborder,
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
          <View style={styles.buttonWrapper}>
            <Button
              onPress={() => router.push("/rental/detail-rent-car")}
              // disabled={!formState.isValid}
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
