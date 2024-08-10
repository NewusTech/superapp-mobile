import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  PostLoginPayload,
  postLoginPayloadSchema,
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
import { DEVELOPMENT_MODE } from "@/constants/Constant";
import { useAuthLogin } from "@/features/auth/api/useAuthLogin";
import { useAuthActions } from "@/features/auth/store/auth-store";
import { setItem } from "@/libs/async-storage";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const navigation = useNavigation<any>();

  // store
  const { setAccessToken, setProfile } = useAuthActions();

  const loginMutation = useAuthLogin();

  const { control, handleSubmit, formState } = useForm<PostLoginPayload>({
    defaultValues: {
      email: DEVELOPMENT_MODE ? "test9@gmail.com" : "",
      password: DEVELOPMENT_MODE ? "123456" : "",
      // email: "test9@gmail.com",
      // password: "123456",
    },
    resolver: zodResolver(postLoginPayloadSchema),
    mode: "all",
  });

  const handleLoginMutation = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: async (response) => {
        setAccessToken(response.data.token);
        setProfile(response.data);

        await setItem("accesstoken", response.data.token);
        await setItem("profile", response.data);

        Snackbar.show({
          message: "Login berhasil!",
        });

        navigation.reset({
          index: 0,
          routes: [{ name: "(authenticated)" }],
        });
      },
      onError: () => {
        Snackbar.show({
          message: "Login gagal, email atau password tidak sesuai",
        });
      },
    });
  });

  return (
    <PageWrapper backgroundColor="main" isLoading={loginMutation.isPending}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("@/assets/images/auth-bg-2.jpeg")}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />
      <ScrollView
        style={style.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          backgroundColor="paper"
          style={[style.content, { paddingBottom: insets.bottom + 37 }]}
        >
          <Image
            source={require("@/assets/images/adaptive-icon.png")}
            style={style.logo}
          />
          <Typography fontFamily="Poppins-Bold" fontSize={16}>
            Silahkan Masuk!
          </Typography>

          <View style={style.formContainer}>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Email"
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
              name="password"
              render={({ field, fieldState }) => (
                <TextInput
                  label="Kata Sandi"
                  placeholder="Kata Sandi"
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  errorMessage={fieldState.error?.message}
                  secureTextEntry
                />
              )}
            />
          </View>
          <View style={style.forgotPasswordWrapper}>
            <TextLink
              label="Lupa Kata Sandi?"
              onPress={() => router.push("/auth/forgot-password")}
            />
          </View>

          <Button disabled={!formState.isValid} onPress={handleLoginMutation}>
            Masuk
          </Button>
        </View>
      </ScrollView>
    </PageWrapper>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: "auto",
    paddingTop: 24,
    paddingHorizontal: 35,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  formContainer: {
    marginTop: 30,
    gap: 36,
  },
  forgotPasswordWrapper: {
    marginBottom: 20,
    marginTop: 16,
    alignItems: "flex-end",
  },
  logo: {
    marginHorizontal: "auto",
    width: 350,
    height: 190,
    marginBottom: 20,
  },
});
