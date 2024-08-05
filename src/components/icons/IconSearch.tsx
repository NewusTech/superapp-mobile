import * as React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconSearch({
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
      <G
        clipPath="url(#clip0_672_1097)"
        stroke={Colors[color]}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M9.063 15.625a6.562 6.562 0 100-13.125 6.562 6.562 0 000 13.125zM13.703 13.703L17.5 17.5" />
      </G>
      <Defs>
        <ClipPath id="clip0_672_1097">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
