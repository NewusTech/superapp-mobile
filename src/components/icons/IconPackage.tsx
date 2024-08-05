import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconPackage({
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
      viewBox="0 0 21 20"
      fill="none"
      {...rest}
    >
      <Path
        d="M17.975 5.168L11.1 1.406a1.24 1.24 0 00-1.2 0L3.025 5.17a1.25 1.25 0 00-.65 1.093v7.472a1.25 1.25 0 00.65 1.094L9.9 18.592a1.24 1.24 0 001.2 0l6.875-3.763a1.25 1.25 0 00.65-1.094v-7.47a1.25 1.25 0 00-.65-1.097zM10.5 2.5l6.277 3.438L14.45 7.21 8.173 3.773 10.5 2.5zm0 6.875L4.223 5.938l2.649-1.45 6.276 3.437-2.648 1.45zM3.625 7.031l6.25 3.42v6.703l-6.25-3.418V7.031zm13.75 6.702l-6.25 3.42v-6.698l2.5-1.368v2.788a.625.625 0 101.25 0V8.402l2.5-1.37v6.7z"
        fill={Colors[color]}
      />
    </Svg>
  );
}
