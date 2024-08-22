import { ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  TouchableNativeFeedbackProps,
} from "react-native";

import { Separator, Typography, View } from "@/components";
import { AppColor } from "@/constants/Colors";
import { useAppTheme } from "@/context/theme-context";
import { formatDate, formatTimeString } from "@/utils/datetime";

export type TravelTicketItemProps = {
  originCity: string;
  originDepartureDate: Date;
  destinationCity: string;
  destinationDepartureDate: Date;
  departureDate?: Date;
  departureTime?: string;
  customHeader?: ReactNode;
  customFooter?: ReactNode;
  icon?: ReactNode;
} & TouchableNativeFeedbackProps;
export function TravelTicketItem(props: TravelTicketItemProps) {
  const {
    departureDate,
    destinationCity,
    destinationDepartureDate,
    originCity,
    originDepartureDate,
    departureTime,
    icon,
    customHeader,
    customFooter,
    disabled,
    ...rest
  } = props;

  const { Colors } = useAppTheme();

  return (
    <Pressable {...rest}>
      {({ pressed }) => (
        <>
          {pressed && !disabled && (
            <View
              style={[
                style.container,
                style.mask,
                {
                  borderWidth: 0,
                  backgroundColor: Colors.textsecondary,
                },
              ]}
            />
          )}
          <View
            style={[
              style.container,
              {
                backgroundColor: Colors.paper,
                borderColor:
                  pressed && !disabled
                    ? Colors.badgeMain
                    : Colors.outlineborder,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.0,
                elevation: 1,
              },
            ]}
          >
            {!!customHeader && (
              <>
                {customHeader}
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography fontFamily="Poppins-Bold" fontSize={10}>
                    Keberangkatan
                  </Typography>
                  <Separator
                    width="60%"
                    thickness={2}
                    style={{
                      backgroundColor: "transparent",
                      borderTopWidth: 1,
                      borderStyle: "dashed",
                      borderColor: AppColor.light.textsecondary,
                    }}
                  />
                  <Typography fontFamily="Poppins-Bold" fontSize={10}>
                    Tujuan
                  </Typography>
                </View>
              </>
            )}

            <View style={style.contentContainer}>
              <View style={style.contentLeftWrapper}>
                <Typography
                  color="textsecondary"
                  fontSize={14}
                  numberOfLines={1}
                >
                  {originCity}
                </Typography>
                <Typography color="textsecondary" fontSize={12}>
                  {formatDate(originDepartureDate, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Typography>
              </View>

              <View style={style.contentSeparatorIndicator}>
                <Separator style={{ position: "absolute" }} />
                <View
                  backgroundColor="paper"
                  style={[style.separatorPoint, { borderColor: Colors.main }]}
                />
                {icon}
                <View backgroundColor="main" style={style.separatorPoint} />
              </View>

              <View style={style.contentRightWrapper}>
                <Typography
                  color="textsecondary"
                  fontSize={14}
                  numberOfLines={1}
                >
                  {destinationCity}
                </Typography>
                <Typography color="textsecondary" fontSize={12}>
                  {formatDate(destinationDepartureDate, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Typography>
              </View>
            </View>

            {!!departureTime && (
              <View style={style.center}>
                <Typography fontFamily="Poppins-Regular" fontSize={12}>
                  {formatTimeString(departureTime)}
                </Typography>
              </View>
            )}

            {customFooter}
          </View>
        </>
      )}
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 20,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  center: {
    alignItems: "center",
  },
  contentSeparatorIndicator: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  separatorPoint: {
    height: 6,
    width: 6,
    borderWidth: 1.5,
    borderRadius: 99,
  },
  separatorDonuts: {
    height: 6,
    width: 6,
    borderRadius: 99,
  },
  contentLeftWrapper: {
    flex: 1,
    gap: 5,
  },
  contentRightWrapper: {
    flex: 1,
    alignItems: "flex-end",
    gap: 4,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
  },
  mask: {
    width: "100%",
    height: "100%",
    zIndex: 2,
    opacity: 0.15,
    position: "absolute",
    top: 0,
    left: 0,
  },
});
