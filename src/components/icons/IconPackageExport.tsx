import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconPackageExport({
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
        d="M3.333 6.25v7.5L10 17.5V10M3.333 6.25L10 2.5l6.667 3.75m-13.334 0L10 10m6.667-3.75V10m0-3.75L10 10m2.5 5h5.833m0 0l-2.5-2.5m2.5 2.5l-2.5 2.5"
        stroke={Colors[color]}
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
