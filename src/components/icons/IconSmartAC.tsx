import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconSmartAC({
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
        d="M7 12H17M18 7H18.009M6.8 18C6.8 18 7.6 19.875 6 21M17.2 18C17.2 18 16.4 19.875 18 21M12 18V21M16 3C18.339 3 19.508 3 20.362 3.536C20.8075 3.81584 21.1842 4.19251 21.464 4.638C22 5.492 22 6.66 22 9C22 11.34 22 12.508 21.463 13.362C21.1836 13.8069 20.8077 14.1832 20.363 14.463C19.507 15 18.338 15 16 15H8C5.661 15 4.492 15 3.638 14.463C3.19273 14.1837 2.81608 13.8078 2.536 13.363C2 12.507 2 11.338 2 9C2 6.662 2 5.492 2.536 4.638C2.81584 4.19251 3.19251 3.81584 3.638 3.536C4.492 3 5.66 3 8 3H16Z"
        stroke={Colors[color]}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
