import { ReactNode } from "react";
import {
  StyleSheet,
  TouchableNativeFeedbackProps,
  TouchableWithoutFeedback,
} from "react-native";

import { Separator, Typography, View } from "@/components";
import { useAppTheme } from "@/context/theme-context";
import { formatDate, formatTime } from "@/utils/datetime";

export type TravelTicketItemProps = {
  originCity: string;
  originDepartureDate: Date;
  destinationCity: string;
  destinationDepartureDate: Date;
  departureDate: Date;
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
    icon,
    customHeader,
    customFooter,
    ...rest
  } = props;

  const { Colors } = useAppTheme();

  return (
    <TouchableWithoutFeedback {...rest}>
      <View style={[style.container, { borderColor: Colors.outlineborder }]}>
        {!!customHeader && (
          <>
            {customHeader}
            <View>
              <Separator />
            </View>
          </>
        )}

        <View style={style.contentContainer}>
          <View style={style.contentLeftWrapper}>
            <Typography color="textsecondary" fontSize={14} numberOfLines={1}>
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
            <Typography color="textsecondary" fontSize={14} numberOfLines={1}>
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

        {!!departureDate && (
          <View style={style.center}>
            <Typography fontFamily="OpenSans-Regular" fontSize={12}>
              {formatTime(departureDate)}
            </Typography>
          </View>
        )}

        {customFooter}
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 12,
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
});
