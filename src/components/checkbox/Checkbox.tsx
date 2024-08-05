import { StyleSheet } from "react-native";

import { useAppTheme } from "@/context/theme-context";

import { IconCIChecklist } from "../icons";
import { View } from "../view/View";

export type CheckboxProps = {
  selected?: boolean;
};
export function Checkbox(props: CheckboxProps) {
  const { selected = false } = props;

  const { Colors } = useAppTheme();

  return (
    <View
      backgroundColor={selected ? "secondary" : "paper"}
      style={[styles.container, { borderColor: Colors.outlineborder }]}
    >
      {selected && <IconCIChecklist size={8} color="paper" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 2,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
