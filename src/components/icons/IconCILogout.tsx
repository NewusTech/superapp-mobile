import * as React from "react";
import { Iconify } from "react-native-iconify";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconCILogout({
  size = 24,
  color = "textprimary",
  ...rest
}: IconProps) {
  const { Colors } = useAppTheme();

  return <Iconify icon="ci:log-out" size={size} color={Colors[color]} />;
}
