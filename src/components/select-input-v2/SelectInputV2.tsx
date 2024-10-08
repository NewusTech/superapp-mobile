import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import { useAppTheme } from "@/context/theme-context";

import { Typography } from "../typography/Typography";
import { View } from "../view/View";

type DataItem = {
  title: string | number;
};
export type SelectInputV2Props = {
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  withBorder?: boolean;
  borderRadius?: number;
  gap?: number;
  padding?: number;
  paddingHorizontal?: number;
  data: DataItem[];
  onSelect: (selectedItem: DataItem, index: number) => void;
  value: string | number;
  placeholder?: string;
  suffix?: string;
  label?: string;
  disabled?: boolean;
};
export function SelectInputV2(props: SelectInputV2Props) {
  const {
    leadingIcon,
    trailingIcon,
    value,
    withBorder = true,
    borderRadius = 10,
    gap = 12,
    padding = 8,
    paddingHorizontal = padding,
    data = [],
    onSelect = () => {},
    placeholder = "",
    suffix = "",
    label,
    disabled = false,
  } = props;

  const { Colors } = useAppTheme();

  return (
    <SelectDropdown
      disabled={disabled}
      data={data}
      onSelect={onSelect}
      renderButton={(selected, isOpened) => (
        <View style={{ gap: 5 }}>
          {label && (
            <Typography fontFamily="Poppins-Medium" fontSize={14}>
              {label}
            </Typography>
          )}
          <View
            // backgroundColor={selected ? "outlineborder" : "paper"}
            style={[
              styles.container,
              {
                borderWidth: withBorder ? 1 : 0,
                borderColor: Colors.outlineborder,
                padding: withBorder ? padding : 0,
                paddingHorizontal,
                borderRadius,
                gap,
                backgroundColor: disabled
                  ? Colors.outlineborder
                  : "transparent",
              },
            ]}
          >
            {leadingIcon}
            <Typography
              fontFamily="OpenSans-Regular"
              fontSize={14}
              color={value ? "black" : "textsecondary"}
              style={styles.textInput}
            >
              {value || placeholder} {" " + suffix}
            </Typography>

            {trailingIcon}
          </View>
        </View>
      )}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={[
              styles.dropdownItemStyle,
              {
                // ...(isSelected && { backgroundColor: "#D2D9DF" }),
              },
            ]}
          >
            <Typography>
              {item.title} {suffix}
            </Typography>
          </View>
        );
      }}
      dropdownStyle={{
        backgroundColor: Colors.paper,
        transform: [{ translateY: -20 }],
      }}
      dropdownOverlayColor="transparent"
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
  },
  dropdownItemStyle: {
    padding: 8,
    borderRadius: 2,
  },
});
