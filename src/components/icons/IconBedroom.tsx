import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconBedroom({
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
        d="M6.66659 4.66663C6.24992 4.66663 5.83325 4.84163 5.50825 5.16663C5.18325 5.49163 4.99992 5.87496 4.99992 6.33329V8.83329C4.55825 8.83329 4.16659 8.99163 3.82492 9.32496C3.48325 9.65829 3.33325 10.0583 3.33325 10.5V14.6666H4.44992L4.99992 16.3333H5.83325L6.40825 14.6666H13.6333L14.1666 16.3333H14.9999L15.5499 14.6666H16.6666V10.5C16.6666 10.0583 16.5083 9.66663 16.1749 9.32496C15.8416 8.98329 15.4416 8.83329 14.9999 8.83329V6.33329C14.9999 5.87496 14.8333 5.49996 14.4916 5.16663C14.1499 4.83329 13.7499 4.66663 13.3333 4.66663M6.66659 6.33329H9.16658V8.83329H6.66659M10.8333 6.33329H13.3333V8.83329H10.8333M4.99992 10.5H14.9999V13H4.99992V10.5Z"
        fill={Colors[color]}
      />
    </Svg>
  );
}
