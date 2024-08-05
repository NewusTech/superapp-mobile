import { ReactNode } from "react";
import {
  StyleSheet,
  TouchableNativeFeedbackProps,
  TouchableWithoutFeedback,
} from "react-native";

import { AppColorUnion } from "@/constants/Colors";
import { useAppTheme } from "@/context/theme-context";

import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export type RoundedButtonProps = {
  label: string;
  icon: ReactNode;
  iconColor: AppColorUnion | "transparent";
} & TouchableNativeFeedbackProps;
export function RoundedButton(props: RoundedButtonProps) {
  const {
    label = "",
    icon = null,
    iconColor = "transparent",
    disabled = false,
    ...rest
  } = props;

  const { Colors } = useAppTheme();

  return (
    <TouchableWithoutFeedback {...rest}>
      <View style={style.container}>
        <View
          style={[
            style.iconWrapper,
            { backgroundColor: Colors[iconColor as AppColorUnion] },
          ]}
        >
          {icon}

          {disabled && (
            <View
              style={[
                style.disabledMask,
                { backgroundColor: Colors.paper + "80" },
              ]}
            />
          )}
        </View>

        <Typography
          fontFamily="OpenSans-Regular"
          fontSize={12}
          numberOfLines={1}
        >
          {label}
        </Typography>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: {
    width: 65,
    gap: 8,
    alignItems: "center",
  },
  iconWrapper: {
    height: 48,
    width: 48,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  disabledMask: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});
