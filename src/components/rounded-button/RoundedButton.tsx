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
    <TouchableWithoutFeedback {...rest} disabled={disabled}>
      <View style={style.container}>
        {disabled && (
          <View
            style={{
              position: "absolute",
              width: "100%",
              top: -5,
              left: 0,
              zIndex: 1,
            }}
          >
            <Typography
              fontFamily="OpenSans-Light"
              color="paper"
              fontSize={6}
              style={{
                backgroundColor: Colors.textsecondary,
                paddingHorizontal: 3,
                paddingVertical: 2.5,
                textAlign: "center",
                borderRadius: 100,
                width: "60%",
                marginLeft: "auto",
              }}
            >
              Soon
            </Typography>
          </View>
        )}
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
    justifyContent: "flex-end",
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
