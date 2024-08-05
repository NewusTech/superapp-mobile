import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

import { useAppTheme } from "@/context/theme-context";

export function Loader(props: ActivityIndicatorProps) {
  const { size = 44 } = props;

  const { Colors } = useAppTheme();

  return <ActivityIndicator color={Colors.main} size={size} />;
}
