import { Iconify } from "react-native-iconify";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconCIHide({ size = 24, color = "textprimary" }: IconProps) {
  const { Colors } = useAppTheme();

  return <Iconify icon="ci:hide" size={size} color={Colors[color]} />;
}
