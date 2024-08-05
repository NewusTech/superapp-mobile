import * as React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconHome({
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
      <G clipPath="url(#clip0_1473_465)">
        <Path
          d="M22.833 19.5h-1.5v-8.672a1.472 1.472 0 00-.496-1.106l-7.5-6.816a1.49 1.49 0 00-2.016 0l-7.5 6.816a1.5 1.5 0 00-.488 1.106V19.5h-1.5a.75.75 0 100 1.5h21a.75.75 0 100-1.5zm-8.25 0h-4.5V15a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v4.5z"
          fill={Colors[color]}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1473_465">
          <Path fill="#fff" transform="translate(.333)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
