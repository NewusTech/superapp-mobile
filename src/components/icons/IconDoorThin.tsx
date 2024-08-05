import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconDoorThin({
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
      viewBox="0 0 24 24"
      fill="none"
      {...rest}
    >
      <Path
        d="M21.75 20.625h-2.625V3.75A1.125 1.125 0 0018 2.625H6A1.125 1.125 0 004.875 3.75v16.875H2.25a.375.375 0 100 .75h19.5a.375.375 0 000-.75zM5.625 3.75A.375.375 0 016 3.375h12a.375.375 0 01.375.375v16.875H5.625V3.75zm9.75 8.625a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        fill={Colors[color]}
      />
    </Svg>
  );
}
