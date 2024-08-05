import * as React from "react";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconBuilding({
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
      <G clipPath="url(#clip0_672_1066)" fill={Colors[color]}>
        <Path d="M19.25 16.25h-.625V8.125a1.25 1.25 0 00-1.25-1.25h-5v-3.75a1.25 1.25 0 00-1.25-1.25h-7.5a1.25 1.25 0 00-1.25 1.25V16.25H1.75a.625.625 0 100 1.25h17.5a.624.624 0 100-1.25zm-9.375-5.625a.625.625 0 01-.625.625h-2.5a.625.625 0 110-1.25h2.5a.625.625 0 01.625.625zM5.5 5H8a.625.625 0 010 1.25H5.5A.625.625 0 015.5 5zm0 8.125H8a.625.625 0 110 1.25H5.5a.625.625 0 110-1.25zm6.875-5h5v8.125h-5V8.125z" />
        <Path d="M15.5 13.125h-1.25a.624.624 0 100 1.25h1.25a.624.624 0 100-1.25zM14.25 11.25h1.25a.624.624 0 100-1.25h-1.25a.624.624 0 100 1.25z" />
      </G>
      <Defs>
        <ClipPath id="clip0_672_1066">
          <Path fill="#fff" transform="translate(.5)" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
