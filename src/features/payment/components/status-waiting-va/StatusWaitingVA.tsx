import { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";

import { GetPaymentStatusResponseSuccess } from "@/apis/internal.api.type";
import { Separator, Typography, View } from "@/components";
import { IconChevronDown } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { useCountdown } from "@/hooks/useCountdown";

export type PaymentStatusWaitingVAProps = {
  data: GetPaymentStatusResponseSuccess["data"];
};

const vaPaymentTutorial = [
  {
    title: "Petunjuk Transfer mBanking",
    data: ["Tutorial 1", "Tutorial 2"],
  },
  {
    title: "Petunjuk Transfer iBanking",
    data: ["Tutorial 2 1", "Tutorial 2 2"],
  },
  {
    title: "Petunjuk Transer ATM",
    data: ["Tutorial 3 1", "Tutorial 3 2"],
  },
];
const targetDate = new Date().getTime() + 300 * 1000;
export function PaymentStatusWaitingVA(props: PaymentStatusWaitingVAProps) {
  // const { data } = props;

  const { Colors } = useAppTheme();

  const timeLeft = useCountdown(new Date(targetDate));

  const [openedTutorialIndex, setOpenedTutorialIndex] = useState<number[]>([]);

  const handleOpenTutorialIndex = (index: number) => {
    if (openedTutorialIndex.includes(index)) {
      setOpenedTutorialIndex(
        openedTutorialIndex.filter((idx) => idx !== index)
      );
    } else {
      setOpenedTutorialIndex([...openedTutorialIndex, index]);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.countdownWrapper, { borderColor: Colors.secondary }]}
      >
        <Typography fontFamily="Poppins-Light" color="secondary">
          Waktu Pembayaran:{" "}
          {`${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`}
        </Typography>
      </View>

      <View
        style={[styles.contentWrapper, { borderColor: Colors.outlineborder }]}
      >
        <Typography fontFamily="OpenSans-Semibold">Bank Transfer</Typography>

        <Separator />

        <Typography>No. Rekening</Typography>
        <TouchableWithoutFeedback>
          <View style={styles.vaNumberWrapper}>
            <Typography fontSize={20} color="main">
              8801 8017 2837 389
            </Typography>
            <Typography fontFamily="OpenSans-Semibold" color="secondary">
              Salin
            </Typography>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View
        style={[styles.contentWrapper, { borderColor: Colors.outlineborder }]}
      >
        {vaPaymentTutorial.map((tutorial, index) => (
          <View key={index} style={styles.tutorialItemWrapper}>
            <TouchableWithoutFeedback
              onPress={() => handleOpenTutorialIndex(index)}
            >
              <View style={styles.tutorialTitleWrapper}>
                <Typography>{tutorial.title}</Typography>
                <View
                  style={{
                    transform: [
                      {
                        rotateX: openedTutorialIndex.includes(index)
                          ? "180deg"
                          : "0deg",
                      },
                    ],
                  }}
                >
                  <IconChevronDown />
                </View>
              </View>
            </TouchableWithoutFeedback>

            {openedTutorialIndex.includes(index) &&
              tutorial.data.map((item, itemIndex) => (
                <Typography
                  key={itemIndex}
                >{`${itemIndex + 1}. ${item}`}</Typography>
              ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  countdownWrapper: {
    borderWidth: 1,
    marginHorizontal: 40,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  contentWrapper: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 2,
    gap: 16,
  },
  vaNumberWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tutorialTitleWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tutorialItemWrapper: {
    gap: 8,
  },
});
