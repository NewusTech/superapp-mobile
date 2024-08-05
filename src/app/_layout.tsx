import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { appFonts, SnackbarRoot } from "@/components";
import { AppThemeProvider } from "@/context/theme-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { queryClient } from "@/libs/tanstack-query";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  // DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";

import "react-native-reanimated";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...appFonts,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        value={colorScheme === "dark" ? DefaultTheme : DefaultTheme}
      >
        <AppThemeProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "ios",
            }}
          />

          <SnackbarRoot />
        </AppThemeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
