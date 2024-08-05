import { ReactNode } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

import { useAppTheme } from "@/context/theme-context";

import { IconSearch } from "../icons/IconSearch";
import { View } from "../view/View";

export type SearchBoxProps = {
  trailingIcon?: ReactNode;
} & TextInputProps;
export function SearchBox(props: SearchBoxProps) {
  const { trailingIcon, ...rest } = props;

  const { Colors } = useAppTheme();

  return (
    <View
      backgroundColor="paper"
      style={[style.container, { borderColor: Colors.outlineborder }]}
    >
      <IconSearch width={20} height={20} color="textsecondary" />
      <TextInput
        style={{ flex: 1 }}
        placeholderTextColor={Colors.textsecondary}
        {...rest}
      />
      {trailingIcon}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: 45,
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 12,
    borderWidth: 1,
  },
  textInput: {
    fontSize: 14,
    fontFamily: "OpenSans-Regular",
  },
});
