import * as React from "react";
import Svg, { Path } from "react-native-svg";

import { useAppTheme } from "@/context/theme-context";

import { IconProps } from "./icon.type";

export function IconStar({
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
      viewBox="0 0 14 14"
      fill="none"
      {...rest}
    >
      <Path
        d="M12.7017 5.98129L10.3582 8.00352L11.0722 11.0278C11.1116 11.1919 11.1014 11.3641 11.043 11.5225C10.9846 11.6809 10.8806 11.8185 10.744 11.9178C10.6075 12.0171 10.4446 12.0737 10.2759 12.0805C10.1072 12.0872 9.9403 12.0439 9.79624 11.9558L7.16624 10.3372L4.53469 11.9558C4.39065 12.0433 4.22393 12.0863 4.05553 12.0793C3.88712 12.0723 3.72456 12.0156 3.58831 11.9164C3.45205 11.8171 3.34821 11.6798 3.28984 11.5217C3.23148 11.3636 3.2212 11.1917 3.26031 11.0278L3.97692 8.00352L1.63336 5.98129C1.50592 5.87115 1.41375 5.7259 1.36837 5.56369C1.32299 5.40148 1.3264 5.2295 1.37818 5.06921C1.42996 4.90893 1.52781 4.76745 1.65952 4.66245C1.79122 4.55745 1.95094 4.49358 2.11874 4.47881L5.1914 4.23091L6.37672 1.36239C6.44088 1.20606 6.55008 1.07234 6.69043 0.978227C6.83079 0.884115 6.99596 0.833864 7.16494 0.833864C7.33393 0.833864 7.4991 0.884115 7.63945 0.978227C7.7798 1.07234 7.889 1.20606 7.95316 1.36239L9.13796 4.23091L12.2106 4.47881C12.3788 4.49303 12.5389 4.55655 12.6711 4.6614C12.8033 4.76626 12.9016 4.90779 12.9537 5.06827C13.0058 5.22875 13.0094 5.40103 12.964 5.56354C12.9186 5.72605 12.8263 5.87155 12.6986 5.98181L12.7017 5.98129Z"
        fill={Colors[color]}
      />
    </Svg>
  );
}
