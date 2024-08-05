import { createContext, PropsWithChildren, useContext } from "react";

import { AppColor } from "@/constants/Colors";
// import { useColorScheme } from "@/hooks/useColorScheme";

type ThemeContextProps = {
  Colors: (typeof AppColor)["light"];
};
export const AppThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export function AppThemeProvider(props: PropsWithChildren) {
  const { children } = props;

  // use color scheme if theme needed
  // const colorScheme = useColorScheme();
  const colorScheme = "light";

  return (
    <AppThemeContext.Provider
      value={{ Colors: AppColor[colorScheme ?? "light"] }}
    >
      {children}
    </AppThemeContext.Provider>
  );
}

export const useAppTheme = () => {
  const appThemeContext = useContext(AppThemeContext);

  if (!appThemeContext) {
    throw "Please use AppThemeProvider on your root component";
  }

  return appThemeContext;
};
