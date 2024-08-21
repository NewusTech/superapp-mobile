import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconDimensions({
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
      viewBox="0 0 20 21"
      fill="none"
      {...rest}
    >
      <Path
        d="M2.5 4.66667H11.6667M2.5 4.66667L4.16667 3M2.5 4.66667L4.16667 6.33333M11.6667 4.66667L10 6.33333M11.6667 4.66667L10 3M15.8333 8.83333V18M15.8333 8.83333L17.5 10.5M15.8333 8.83333L14.1667 10.5M15.8333 18L14.1667 16.3333M15.8333 18L17.5 16.3333M2.5 10.5C2.5 10.058 2.67559 9.63405 2.98816 9.32149C3.30072 9.00893 3.72464 8.83333 4.16667 8.83333H10C10.442 8.83333 10.866 9.00893 11.1785 9.32149C11.4911 9.63405 11.6667 10.058 11.6667 10.5V16.3333C11.6667 16.7754 11.4911 17.1993 11.1785 17.5118C10.866 17.8244 10.442 18 10 18H4.16667C3.72464 18 3.30072 17.8244 2.98816 17.5118C2.67559 17.1993 2.5 16.7754 2.5 16.3333V10.5Z"
        stroke={Colors[color]}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
