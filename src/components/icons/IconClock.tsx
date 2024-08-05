import { Iconify } from "react-native-iconify";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconClock({ size = 24, color = "textprimary" }: IconProps) {
  const { Colors } = useAppTheme();

  return (
    <Iconify icon="iconamoon:clock-light" size={size} color={Colors[color]} />
  );
}

// iconamoon:clock-light
