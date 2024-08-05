import { useState } from "react";

import { useAppTheme } from "@/context/theme-context";
import { formatDate } from "@/utils/datetime";
import RNDateTimePicker, {
  BaseProps,
} from "@react-native-community/datetimepicker";

import { TextInputV2, TextInputV2Props } from "../text-input-v2/TextInputV2";

export type DateInputV2Props = {
  value: Date | string;
  onChange: (date: Date | undefined) => void;
} & Pick<
  TextInputV2Props,
  "placeholder" | "trailingIcon" | "leadingIcon" | "withBorder"
> &
  BaseProps;
export function DateInputV2(props: DateInputV2Props) {
  const {
    value,
    onChange = () => {},
    placeholder,
    trailingIcon,
    leadingIcon,
    withBorder = false,
  } = props;

  const [showDatePicker, setShowDatePicker] = useState(false);

  const { Colors } = useAppTheme();

  return (
    <>
      <TextInputV2
        trailingIcon={trailingIcon}
        leadingIcon={leadingIcon}
        value={formatDate(value)}
        placeholder={placeholder}
        onTouchablePress={() => setShowDatePicker(!showDatePicker)}
        asTouchable
        withBorder={withBorder}
      />

      {showDatePicker && (
        <RNDateTimePicker
          value={value || new Date()}
          mode="date"
          accentColor={Colors.main}
          onChange={(_, date) => {
            setShowDatePicker(false);
            onChange(date);
          }}
        />
      )}
    </>
  );
}
