import { useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { Calendar, CalendarProps } from "react-native-calendars";

import { AppColor } from "@/constants/Colors";
import { useAppTheme } from "@/context/theme-context";
import { formatDate } from "@/utils/datetime";

import { IconCross } from "../icons";
import { TextInputV2, TextInputV2Props } from "../text-input-v2/TextInputV2";
import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export type DateInputV3Props = {
  value: Date | string;
  onChange: (date: Date | undefined) => void;
  label?: string;
  disabledDates?: string[];
  minDate?: Date | string;
} & Pick<
  TextInputV2Props,
  "placeholder" | "trailingIcon" | "leadingIcon" | "withBorder"
> &
  CalendarProps;
export type dateInnputV3DayProp = {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
};

export function DateInputV3(props: DateInputV3Props) {
  const {
    value,
    onChange = () => {},
    placeholder,
    trailingIcon,
    leadingIcon,
    withBorder = false,
    label,
    disabledDates,
    minDate,
  } = props;

  const { Colors } = useAppTheme();
  const extracDate = (date: any) => new Date(date).toISOString().split("T")[0];

  const markedDates = disabledDates?.reduce((acc: any, date: any) => {
    acc[extracDate(date)] = {
      disabled: true,
      disableTouchEvent: true,
      selected: true,
      selectedColor: Colors.outlineborder,
    };
    return acc;
  }, {});

  console.log(value.toString());

  const [showDatePicker, setShowDatePicker] = useState(false);

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
          value={formatDate(new Date(value))}
          placeholder={placeholder}
          onTouchablePress={() => setShowDatePicker(!showDatePicker)}
          asTouchable
          withBorder={false}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showDatePicker}
        onRequestClose={() => {
          setShowDatePicker(!showDatePicker);
        }}
      >
        <BlurView
          intensity={100}
          blurReductionFactor={100}
          experimentalBlurMethod="dimezisBlurView"
          style={styles.centeredView}
        >
          <View style={styles.modalView}>
            <Pressable onPress={() => setShowDatePicker(false)}>
              <IconCross size={12} />
            </Pressable>
            <Calendar
              minDate={minDate || new Date()}
              onDayPress={(day: dateInnputV3DayProp) => {
                setShowDatePicker(false);
                onChange(new Date(day.dateString));
              }}
              markedDates={{
                [extracDate(value)]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: "orange",
                },
                ...markedDates,
              }}
            />
            {disabledDates && (
              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                <View
                  style={[
                    styles.rounded,
                    { backgroundColor: Colors.outlineborder },
                  ]}
                />
                <Typography
                  fontFamily="Poppins-Regular"
                  fontSize={12}
                  style={{ textAlignVertical: "center" }}
                >
                  Telah Terpesan
                </Typography>
              </View>
            )}
          </View>
        </BlurView>
      </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  rounded: {
    height: 20,
    width: 20,
    borderRadius: 100,
  },
});
