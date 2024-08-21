import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconBathroom({
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
        d="M21 14V15C21 16.91 19.93 18.57 18.35 19.41L19 22H17L16.5 20H7.5L7 22H5L5.65 19.41C4.8494 18.9849 4.1797 18.3498 3.71282 17.5729C3.24594 16.7959 2.99951 15.9064 3 15V14H2V12H20V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4C18.5 4 18.12 4.34 18 4.79C18.63 5.33 19 6.13 19 7H13C13 6.20435 13.3161 5.44129 13.8787 4.87868C14.4413 4.31607 15.2044 4 16 4H16.17C16.58 2.84 17.69 2 19 2C19.7956 2 20.5587 2.31607 21.1213 2.87868C21.6839 3.44129 22 4.20435 22 5V14H21ZM19 14H5V15C5 15.7956 5.31607 16.5587 5.87868 17.1213C6.44129 17.6839 7.20435 18 8 18H16C16.7956 18 17.5587 17.6839 18.1213 17.1213C18.6839 16.5587 19 15.7956 19 15V14Z"
        fill={Colors[color]}
      />
    </Svg>
  );
}
