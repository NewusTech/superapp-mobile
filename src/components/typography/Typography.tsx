import { Text, TextProps } from "react-native";

import { AppColorUnion } from "@/constants/Colors";
import { useAppTheme } from "@/context/theme-context";
import {
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_500Medium,
  OpenSans_500Medium_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
} from "@expo-google-fonts/open-sans";
import {
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
} from "@expo-google-fonts/poppins";

export type TypographyProps = {
  fontFamily?: keyof typeof appFonts;
  color?: AppColorUnion;
  fontSize?: number;
} & TextProps;

export const appFonts = {
  "OpenSans-Light": OpenSans_300Light,
  "OpenSans-LightItalic": OpenSans_300Light_Italic,
  "OpenSans-Regular": OpenSans_400Regular,
  "OpenSans-RegularItalic": OpenSans_400Regular_Italic,
  "OpenSans-Medium": OpenSans_500Medium,
  "OpenSans-MediumItalic": OpenSans_500Medium_Italic,
  "OpenSans-Semibold": OpenSans_600SemiBold,
  "OpenSans-SemiboldItalic": OpenSans_600SemiBold_Italic,
  "OpenSans-Bold": OpenSans_700Bold,
  "OpenSans-BoldItalic": OpenSans_700Bold_Italic,
  "Poppins-Light": Poppins_300Light,
  "Poppins-LightItalic": Poppins_300Light_Italic,
  "Poppins-Regular": Poppins_400Regular,
  "Poppins-RegularItalic": Poppins_400Regular_Italic,
  "Poppins-Medium": Poppins_500Medium,
  "Poppins-MediumItalic": Poppins_500Medium_Italic,
  "Poppins-SemiBold": Poppins_600SemiBold,
  "Poppins-SemiBoldItalic": Poppins_600SemiBold_Italic,
  "Poppins-Bold": Poppins_700Bold,
  "Poppins-BoldItalic": Poppins_700Bold_Italic,
};

export function Typography(props: TypographyProps) {
  const {
    children,
    color = "textprimary",
    fontFamily = "OpenSans-Regular",
    fontSize = 14,
    style,
    ...rest
  } = props;

  const { Colors } = useAppTheme();

  return (
    <Text
      style={[
        { fontFamily, color: Colors[color as AppColorUnion], fontSize },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
