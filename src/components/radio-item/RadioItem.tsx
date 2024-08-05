import { StyleSheet } from "react-native";

import { useAppTheme } from "@/context/theme-context";

import { View } from "../view/View";

export type RadioItemProps = {
  selected?: boolean;
};
export function RadioItem(props: RadioItemProps) {
  const { selected = false } = props;

  const { Colors } = useAppTheme();

  return (
    <View style={[styles.outerRing, { borderColor: Colors.textsecondary }]}>
      {selected && (
        <View backgroundColor="textsecondary" style={styles.innerRing} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerRing: {
    height: 16,
    width: 16,
    borderRadius: 99,
    borderWidth: 1,
    padding: 2,
  },
  innerRing: {
    borderRadius: 99,
    width: 10,
    height: 10,
  },
});
