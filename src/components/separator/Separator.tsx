import { useAppTheme } from "@/context/theme-context";

import { Typography } from "../typography/Typography";
import { View, ViewProps } from "../view/View";

export type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
  thickness?: number;
  width?: any;
} & ViewProps;
export function Separator(props: SeparatorProps) {
  const {
    orientation = "horizontal",
    thickness = 1,
    style,
    width = "100%",
  } = props;

  const { Colors } = useAppTheme();

  return (
    <View
      style={[
        {
          width: orientation === "horizontal" ? width : thickness,
          height: orientation === "horizontal" ? thickness : width,
          backgroundColor: Colors.outlineborder,
        },
        style,
      ]}
    >
      <Typography>tes</Typography>
    </View>
  );
}
