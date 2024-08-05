import * as React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconClipboard({
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
        clipPath="url(#clip0_1473_639)"
        stroke={Colors[color]}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M9.833 14.25h6M9.833 11.25h6M15.833 3.75h3.75a.75.75 0 01.75.75v15.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75V4.5a.75.75 0 01.75-.75h3.75" />
        <Path d="M9.083 6.75V6a3.75 3.75 0 017.5 0v.75h-7.5z" />
      </G>
      <Defs>
        <ClipPath id="clip0_1473_639">
          <Path fill="#fff" transform="translate(.833)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
