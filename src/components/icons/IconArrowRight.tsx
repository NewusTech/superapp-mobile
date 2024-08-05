import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconArrowRight({
  width = 24,
  height = 24,
  color = "textprimary",
  ...rest
}: IconProps) {
  const { Colors } = useAppTheme();

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 11 11"
      fill="none"
      {...rest}
    >
      <Path
        d="M5.572 8.356L8.75 5.178 5.572 2M2 5.178h6"
        stroke={Colors[color]}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
