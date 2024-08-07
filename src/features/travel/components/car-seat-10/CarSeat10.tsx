import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from "react-native";
import { Path, Svg } from "react-native-svg";

import { Typography, View } from "@/components";
import { IconTruckDriver } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";

export type CarSeat10Props = {
  filled: string[];
  selected: string[];
  onSeatPress: (seatNumber: string) => void;
};
export function CarSeat10(props: CarSeat10Props) {
  const { filled = [], selected = [], onSeatPress = () => {} } = props;
  const { Colors } = useAppTheme();

  const getSeatStatus = (seatNumber: string): SeatItemProps["status"] => {
    if (filled.find((item) => item === seatNumber)) return "filled";

    if (selected.find((item) => item === seatNumber)) return "selected";

    return "available";
  };

  return (
    <View
      style={[
        styles.container,
        { borderColor: Colors.textsecondary, borderRadius: 15 },
      ]}
    >
      <View style={styles.row1}>
        <SeatItem
          seatNumber="1"
          status={getSeatStatus("1")}
          onPress={() => onSeatPress("1")}
        />
        <SeatItem seatNumber="driver" status="driver" />
      </View>

      <View style={styles.backSeat}>
        <View style={styles.door}>
          <LabelPintu />
        </View>
        <View style={{ alignItems: "flex-end", gap: 10 }}>
          <View style={{ flexDirection: "row", gap: 2 }}>
            <SeatItem
              seatNumber="4"
              status={getSeatStatus("4")}
              onPress={() => onSeatPress("4")}
            />
            <SeatItem
              seatNumber="3"
              status={getSeatStatus("3")}
              onPress={() => onSeatPress("3")}
            />
            <SeatItem
              seatNumber="2"
              status={getSeatStatus("2")}
              onPress={() => onSeatPress("2")}
            />
          </View>
          <View style={{ flexDirection: "row", gap: 14 }}>
            <SeatItem
              seatNumber="7"
              status={getSeatStatus("7")}
              onPress={() => onSeatPress("7")}
            />
            <View style={{ flexDirection: "row", gap: 2 }}>
              <SeatItem
                seatNumber="6"
                status={getSeatStatus("6")}
                onPress={() => onSeatPress("6")}
              />
              <SeatItem
                seatNumber="5"
                status={getSeatStatus("5")}
                onPress={() => onSeatPress("5")}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 14 }}>
            <SeatItem
              seatNumber="10"
              status={getSeatStatus("10")}
              onPress={() => onSeatPress("10")}
            />
            <View style={{ flexDirection: "row", gap: 2 }}>
              <SeatItem
                seatNumber="9"
                status={getSeatStatus("9")}
                onPress={() => onSeatPress("9")}
              />
              <SeatItem
                seatNumber="8"
                status={getSeatStatus("8")}
                onPress={() => onSeatPress("8")}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

type SeatItemProps = {
  seatNumber: string;
  status: "filled" | "selected" | "available" | "driver";
} & TouchableWithoutFeedbackProps;
function SeatItem(props: SeatItemProps) {
  const { seatNumber, status, disabled, ...rest } = props;

  return (
    <TouchableWithoutFeedback disabled={status === "filled"} {...rest}>
      <View
        style={styles.seatItem}
        backgroundColor={
          status === "driver"
            ? "transparent"
            : status === "filled"
              ? "quarternary"
              : status === "available"
                ? "main"
                : "secondary"
        }
      >
        <Typography color="paper">
          {status === "driver" ? (
            <IconTruckDriver color="main" size={32} />
          ) : (
            seatNumber
          )}
        </Typography>
      </View>
    </TouchableWithoutFeedback>
  );
}

function LabelPintu(props: any) {
  const { Colors } = useAppTheme();
  return (
    <Svg
      width={11}
      height={39}
      viewBox="0 0 11 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M.052 35.839c-.001-1.29.25-2.231.756-2.825.5-.597 1.22-.897 2.159-.898.423 0 .827.07 1.21.21.378.137.714.36 1.006.67.287.309.515.716.685 1.222.164.501.247 1.116.248 1.845l.002 1.217 3.93-.005.002 1.162-9.994.013-.004-2.611zm.992.108l.001 1.34 4.075-.005-.002-1.087c0-.639-.07-1.17-.207-1.593-.137-.428-.358-.75-.664-.963-.31-.214-.72-.32-1.231-.32-.665.001-1.16.214-1.483.638-.327.424-.49 1.087-.49 1.99zm8.995-5.932l-9.994.013-.001-1.162 9.994-.013.001 1.162zm-.015-11.723l.002 1.34-8.388 5.459v.054l.766-.049c.283-.018.586-.032.91-.042.318-.014.644-.021.977-.021l5.742-.008.001 1.08-9.994.013-.002-1.333 8.36-5.438v-.048c-.159.01-.384.02-.676.035l-.95.042c-.342.01-.659.014-.95.015l-5.79.007-.002-1.093 9.994-.013zm-.007-5.797l.001 1.169-8.968.011.004 3.145-1.026.001-.01-7.444 1.026-.002.004 3.131 8.969-.011zM.007.305L6.474.297c.707 0 1.336.142 1.887.429.552.281.988.71 1.308 1.283.315.574.473 1.294.474 2.16.002 1.235-.332 2.176-1.001 2.824-.67.644-1.564.966-2.685.967l-6.44.009-.001-1.17 6.473-.008c.848 0 1.502-.225 1.961-.672.46-.452.69-1.124.688-2.017 0-.611-.11-1.11-.33-1.497a2.062 2.062 0 00-.93-.867c-.402-.191-.865-.286-1.389-.285L.01 1.46.007.305z"
        fill={Colors.textprimary}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 10,
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 24,
  },
  seatItem: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 2,
  },
  backSeat: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  door: {
    borderWidth: 1,
    borderRadius: 2,
    paddingBottom: 30,
    paddingHorizontal: 4,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
