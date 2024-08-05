import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconCalendar({
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
      <Path
        d="M16.25 3.125H3.75a.625.625 0 00-.625.625v12.5c0 .345.28.625.625.625h12.5c.345 0 .625-.28.625-.625V3.75a.625.625 0 00-.625-.625zM13.75 1.875v2.5M6.25 1.875v2.5M3.125 6.875h13.75"
        stroke={Colors[color]}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.188 10h2.187l-1.25 1.563a1.25 1.25 0 11-.883 2.132M11.25 10.938L12.5 10v4.063"
        stroke={Colors[color]}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
