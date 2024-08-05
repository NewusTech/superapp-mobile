import * as React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconPromo({
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
      viewBox="0 0 25 24"
      fill="none"
      {...rest}
    >
      <G
        clipPath="url(#clip0_1473_470)"
        stroke={Colors[color]}
        strokeWidth={1.5}
      >
        <Path
          d="M11.503 2.428l-7.566 1.51-1.509 7.565a.75.75 0 00.206.675l9.788 9.787a.74.74 0 001.06 0l8.484-8.484a.74.74 0 000-1.06l-9.788-9.787a.75.75 0 00-.675-.206z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8.25 7.875a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          fill={Colors[color]}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1473_470">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
