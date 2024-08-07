import React, { useState } from "react";
import { StyleSheet, Switch } from "react-native";

import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export type InputSwitchProps = {
  label: string;
  value: boolean;
  disable?: boolean;
  disableMessage?: string;
  handleOnSwitch?: (value: boolean) => void;
};

export default function InputSwitch({
  label,
  value,
  disable = false,
  disableMessage = "is disabled",
  handleOnSwitch,
}: InputSwitchProps) {
  const [isEnabled, setIsEnabled] = useState(() => value);
  const toggleSwitch = () => {
    handleOnSwitch!(!isEnabled);
    setIsEnabled((previousState) => !previousState);
  };
  return (
    <View style={styles.container}>
      {disable && (
        <Typography
          fontFamily="OpenSans-Regular"
          fontSize={14}
          color={"textsecondary"}
          style={[styles.textInput, { marginEnd: "auto" }]}
        >
          {disableMessage}
        </Typography>
      )}
      <Typography
        fontFamily="OpenSans-Regular"
        fontSize={14}
        color={!disable ? "black" : "textsecondary"}
        style={styles.textInput}
      >
        {label}
      </Typography>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        disabled={disable}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  textInput: {},
});
