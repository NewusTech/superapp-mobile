import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconSwap({
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
      viewBox="0 0 20 20"
      fill="none"
      {...rest}
    >
      <Path
        d="M8.75 13.75l-2.5 2.5-2.5-2.5M6.25 3.75v12.5M11.25 6.25l2.5-2.5 2.5 2.5M13.75 16.25V3.75"
        stroke={Colors[color]}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
