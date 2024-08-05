import { ReactNode } from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

import { useAppTheme } from "@/context/theme-context";

import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  style?: ViewProps["style"];
} & PressableProps;

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    disabled = false,
    style,
    ...rest
  } = props;

  const { Colors } = useAppTheme();

  return (
    <Pressable disabled={disabled} {...rest}>
      {(pressable) => (
        <View
          style={[
            {
              borderColor: disabled ? Colors.outlineborder : Colors.main,
              backgroundColor:
                variant === "primary"
                  ? disabled
                    ? Colors.outlineborder
                    : Colors.main
                  : Colors.paper,
            },
            styles.container,
            style,
          ]}
        >
          <View style={styles.childrenWrapper}>
            {typeof children === "string" ? (
              <Typography
                fontFamily="OpenSans-Semibold"
                color={
                  variant === "primary"
                    ? "paper"
                    : disabled
                      ? "outlineborder"
                      : "main"
                }
                style={{ textAlign: "center" }}
              >
                {children}
              </Typography>
            ) : (
              children
            )}
          </View>
          {pressable.pressed && (
            <View
              style={[
                styles.mask,
                {
                  backgroundColor: `${Colors.main}${variant === "primary" ? "80" : "0D"}`,
                },
              ]}
            />
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    minHeight: 48,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    overflow: "hidden",
  },
  childrenWrapper: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 12,
  },
  mask: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
