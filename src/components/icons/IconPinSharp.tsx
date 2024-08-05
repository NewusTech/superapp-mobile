import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconPinSharp({
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
        d="M13.742 3.867a3.242 3.242 0 10-3.984 3.156v11.102l.742 1.25.742-1.25V7.023a3.253 3.253 0 002.5-3.156zm-2.305-.234a.82.82 0 110-1.64.82.82 0 010 1.64z"
        fill={Colors[color]}
      />
    </Svg>
  );
}
