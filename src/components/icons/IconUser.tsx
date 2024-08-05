import * as React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconUser({
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
        clipPath="url(#clip0_1473_484)"
        stroke={Colors[color]}
        strokeWidth={1.5}
      >
        <Path d="M12.667 15a6 6 0 100-12 6 6 0 000 12z" strokeMiterlimit={10} />
        <Path
          d="M3.573 20.25a10.5 10.5 0 0118.187 0"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1473_484">
          <Path fill="#fff" transform="translate(.667)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
