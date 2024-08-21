import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconCookingPort({
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
        d="M12 4.6875C11.625 4.6875 11.25 4.875 10.5 5.25L11.0085 6.77545C8.4218 6.90122 5.28562 7.50187 4.62563 8.57812H19.3737C19.045 8.04272 18.1037 7.62497 16.9219 7.32478V6.32812H16.0781V7.13747C15.0842 6.94495 13.9969 6.82434 12.9915 6.77545L13.5 5.25C12.75 4.875 12.375 4.6875 12 4.6875ZM4.5 9.42188V10.0781H2.57812V10.9219H4.5V18C4.5 18.75 5.25 19.5 6 19.5H18C18.75 19.5 19.5 18.75 19.5 18V10.9219H21.4219V10.0781H19.5V9.42188H4.5Z"
        fill={Colors[color]}
      />
    </Svg>
  );
}
