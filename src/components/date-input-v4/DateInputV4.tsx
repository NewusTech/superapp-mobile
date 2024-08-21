import { useState } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { Calendar, CalendarProps } from "react-native-calendars";

import { AppColor } from "@/constants/Colors";
import { useAppTheme } from "@/context/theme-context";
import { formatDateDMY } from "@/utils/datetime";

import { IconCross } from "../icons";
import { TextInputV2, TextInputV2Props } from "../text-input-v2/TextInputV2";
import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export type DateInputV4Props = {
  value: Date | string;
  onChange: (date: Date | undefined) => void;
  label?: string;
  disabledDates?: string[];
  minDate?: Date | string;
  width?: any;
} & Pick<
  TextInputV2Props,
  "placeholder" | "trailingIcon" | "leadingIcon" | "withBorder"
> &
  CalendarProps;
export type dateInnputV4DayProp = {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
};

export function DateInputV4(props: DateInputV4Props) {
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
    width = "auto",
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

  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <>
      <View
        style={{
          flexDirection: "column",
          gap: 5,
          width: width,
          padding: 10,
        }}
      >
        {label && (
          <Typography fontFamily="OpenSans-Medium" fontSize={16}>
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
          <TextInputV2
            trailingIcon={trailingIcon}
            leadingIcon={leadingIcon}
            value={value ? formatDateDMY(new Date(value)) : placeholder}
            placeholder={placeholder}
            onTouchablePress={() => setShowDatePicker(!showDatePicker)}
            asTouchable
            withBorder={false}
          />
        </View>
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
              onDayPress={(day: dateInnputV4DayProp) => {
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
