import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconChevronRight({
  width = 24,
  height = 25,
  color = "textprimary",
  ...rest
}: IconProps) {
  const { Colors } = useAppTheme();

  return (
    <Svg width={width} height={height} viewBox="0 0 24 25" fill="none">
      <G clip-path="url(#clip0_3020_850)">
        <Path
          d="M9 5.17859L16.5 12.6786L9 20.1786"
          stroke={Colors[color]}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
    </Svg>
  );
}
