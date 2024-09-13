import { ActivityIndicator } from "react-native";

import { AppColorUnion } from "@/constants/Colors";
import { useAppTheme } from "@/context/theme-context";

export type LoaderProp = {
  color?: AppColorUnion;
  size?: number;
};

export function Loader(props: LoaderProp) {
  const { size = 44, color = "main" } = props;

  const { Colors } = useAppTheme();

  return <ActivityIndicator color={Colors[color]} size={size} />;
}
