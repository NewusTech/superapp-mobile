import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconBasket({
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
        d="M16.582 7.972H4.418a1.637 1.637 0 00-1.279.62 1.62 1.62 0 00-.302 1.383l1.304 5.34a3.245 3.245 0 001.167 1.727 3.27 3.27 0 001.98.666h6.423a3.27 3.27 0 001.98-.666 3.245 3.245 0 001.167-1.727l1.304-5.34a1.617 1.617 0 00-.87-1.84 1.637 1.637 0 00-.712-.163m-9.34 3.245v3.245m3.26-3.245v3.245m3.26-3.245v3.245m2.447-6.49a5.667 5.667 0 00-1.672-4.017A5.72 5.72 0 0010.5 2.292a5.72 5.72 0 00-4.035 1.663 5.666 5.666 0 00-1.67 4.017"
        stroke={Colors[color]}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
