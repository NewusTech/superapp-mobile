import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconChevronRight({
  width = 24,
  height = 24,
  color = "textprimary",
  ...rest
}: IconProps) {
  const { Colors } = useAppTheme();

  return (
    <Svg width={width} height={height} viewBox="0 0 25 26" fill="none">
      <Path
        d="M15.9147 13.0214L11.6426 17.2341L10.2387 15.809L13.0868 13.0013L10.279 10.1532L11.7031 8.74829L15.9147 13.0214Z"
        fill={Colors[color]}
      />
    </Svg>
  );
}
