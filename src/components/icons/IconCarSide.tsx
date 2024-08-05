import * as React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconCarSide({
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
      viewBox="0 0 27 28"
      fill="none"
      {...rest}
    >
      <G clipPath="url(#clip0_672_1056)">
        <Path
          d="M19.284 7l3.682 5.333h2.454c1.363 0 2.455 1.187 2.455 2.667v4h-2.454c0 1.06-.388 2.078-1.079 2.828-.69.75-1.627 1.172-2.603 1.172-.977 0-1.913-.421-2.604-1.172-.69-.75-1.078-1.767-1.078-2.828h-7.364c0 1.06-.388 2.078-1.078 2.828C8.925 22.578 7.988 23 7.01 23c-.976 0-1.913-.421-2.603-1.172-.69-.75-1.078-1.767-1.078-2.828H.875v-4c0-1.48 1.092-2.667 2.455-2.667L7.01 7h12.273zm-6.75 2H7.932l-2.32 3.333h6.922V9zm1.841 0v3.333h6.308L18.363 9h-3.988zm-7.364 8c-.488 0-.956.21-1.301.586-.346.375-.54.884-.54 1.414 0 .53.194 1.04.54 1.414A1.77 1.77 0 007.01 21c.489 0 .957-.21 1.302-.586.345-.375.54-.884.54-1.414 0-.53-.195-1.04-.54-1.414A1.77 1.77 0 007.011 17zm14.728 0c-.489 0-.957.21-1.302.586-.345.375-.54.884-.54 1.414 0 .53.195 1.04.54 1.414a1.77 1.77 0 001.302.586c.488 0 .956-.21 1.301-.586.346-.375.54-.884.54-1.414 0-.53-.194-1.04-.54-1.414A1.77 1.77 0 0021.74 17z"
          fill={Colors[color]}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_672_1056">
          <Path fill="#fff" transform="translate(0 .5)" d="M0 0H27V27H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
