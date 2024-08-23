import { useState } from "react";
import { StyleSheet } from "react-native";

import { AppColor } from "@/constants/Colors";
import { useAppTheme } from "@/context/theme-context";
import RNDateTimePicker, {
  BaseProps,
} from "@react-native-community/datetimepicker";

import { TextInputV2, TextInputV2Props } from "../text-input-v2/TextInputV2";
import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export type TimeInputProps = {
  value: Date;
  onChange: (date: Date | undefined) => void;
  label?: string;
} & Pick<
  TextInputV2Props,
  "placeholder" | "trailingIcon" | "leadingIcon" | "withBorder"
> &
  BaseProps;
export function TimeInput(props: TimeInputProps) {
  const {
    value,
    onChange = () => {},
    placeholder,
    trailingIcon,
    leadingIcon,
    withBorder = false,
    label,
  } = props;

  const [showDatePicker, setShowDatePicker] = useState(false);

  const { Colors } = useAppTheme();

  return (
    <>
      {label && (
        <Typography fontFamily="Poppins-Medium" fontSize={14}>
          {label}
        </Typography>
      )}
      <View
        style={[
          styles.container,
          {
            borderWidth: withBorder ? 1 : 0,
            borderColor: Colors.outlineborder,
            padding: withBorder ? 12 : 0,
          },
        ]}
      >
        {placeholder && (
          <Typography
            fontFamily="OpenSans-Regular"
            fontSize={12}
            color={value ? "textprimary" : "textsecondary"}
            style={styles.textPlaceholder}
          >
            {placeholder}
          </Typography>
        )}
        <TextInputV2
          trailingIcon={trailingIcon}
          leadingIcon={leadingIcon}
          value={`${value.getHours()} : ${value.getMinutes()}`}
          placeholder={placeholder}
          onTouchablePress={() => setShowDatePicker(!showDatePicker)}
          asTouchable
          withBorder={false}
        />
      </View>

      {showDatePicker && (
        <RNDateTimePicker
          value={value}
          mode="time"
          accentColor={Colors.main}
          onChange={(_, date) => {
            setShowDatePicker(false);
            onChange(date);
            console.log(date);
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 5,
    flexDirection: "column",
    alignItems: "flex-start",
    borderRadius: 10,
  },
  textPlaceholder: {
    flex: 1,
    color: AppColor.light.textsecondary,
  },
  dropdownItemStyle: {
    padding: 8,
    borderRadius: 2,
  },
});
