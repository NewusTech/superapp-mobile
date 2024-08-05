import { Iconify } from "react-native-iconify";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconTruckDriver({
  size = 24,
  color = "textprimary",
}: IconProps) {
  const { Colors } = useAppTheme();

  return (
    <Iconify
      icon="healthicons:truck-driver"
      size={size}
      color={Colors[color]}
    />
  );
}
