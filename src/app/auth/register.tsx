import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  PostRegisterPayload,
  postRegisterPayloadSchema,
} from "@/apis/internal.api.type";
import {
  Button,
  PageWrapper,
  Snackbar,
  TextInput,
  TextLink,
  Typography,
  View,
} from "@/components";
import { useAuthRegister } from "@/features/auth/api/useAuthRegister";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const registerMutation = useAuthRegister();

  const { control, formState, handleSubmit } = useForm<PostRegisterPayload>({
    defaultValues: {
      role_id: 3,
    },
    resolver: zodResolver(postRegisterPayloadSchema),
    mode: "all",
  });

  const handleRegister = handleSubmit((payload) => {
    registerMutation.mutate(payload, {
      onSuccess: (response) => {
        Snackbar.show({
          message: "Register berhasil, silahkan login dengan akun yg terdaftar",
        });

        router.replace("/auth/login");
      },
      onError: (error) => {
        const serverErrorString = error.response?.data?.error;
        Snackbar.show({
          message: `Register gagal${typeof serverErrorString === "string" && `, (${serverErrorString})`}`,
          variant: "danger",
        });
      },
    });
  });

  return (
    <PageWrapper style={{ flex: 1 }} isLoading={registerMutation.isPending}>
      <StatusBar style="light" />

      <ScrollView
        style={{ flex: 1, backgroundColor: "red" }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          backgroundColor="main"
          style={[style.container, { paddingTop: insets.top }]}
        >
          <ImageBackground
            source={require("@/assets/images/auth-bg-2.jpeg")}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            resizeMode="cover"
          />

          <View
            backgroundColor="paper"
            style={[
              style.contentContainer,
              { paddingBottom: insets.bottom + 37 },
            ]}
          >
            <View style={style.headerContainer}>
              <Typography fontFamily="Poppins-Bold" fontSize={24} color="main">
                Daftar
              </Typography>
              <Typography
                fontFamily="Poppins-Medium"
                fontSize={14}
                color="main"
              >
                buat akun baru anda!
              </Typography>
            </View>

            <View style={style.formContainer}>
              <Controller
                control={control}
                name="nama"
                render={({ field, fieldState }) => (
                  <TextInput
                    label="Nama *"
                    placeholder="Nama"
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                  <TextInput
                    label="Email *"
                    placeholder="Contoh@gmail.com"
                    keyboardType="email-address"
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="no_telp"
                render={({ field, fieldState }) => (
                  <TextInput
                    label="Nomor Telepon *"
                    placeholder="08276287687287"
                    keyboardType="number-pad"
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                  <TextInput
                    label="Kata Sandi *"
                    placeholder="Kata Sandi"
                    secureTextEntry
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="confirm_password"
                render={({ field, fieldState }) => (
                  <TextInput
                    label="Konfirmasi Kata Sandi *"
                    placeholder="Konfirmasi Kata Sandi"
                    secureTextEntry
                    value={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />

              <View style={style.alreadyHasAccountWrapper}>
                <Typography fontFamily="OpenSans-Regular" fontSize={12}>
                  Sudah punya akun?
                </Typography>

                <TextLink
                  label=" Masuk"
                  onPress={() => router.replace("/auth/login")}
                />
              </View>
            </View>
            <Button disabled={!formState.isValid} onPress={handleRegister}>
              Daftar
            </Button>
          </View>
        </View>
      </ScrollView>
    </PageWrapper>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: "auto",
    // paddingHorizontal: 35,
    minHeight: 100,
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 35,
    marginTop: "auto",
    // paddingTop: 54,
  },
  formContainer: {
    gap: 16,
    marginBottom: 40,
  },
  alreadyHasAccountWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
