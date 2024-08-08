import { PropsWithChildren, ReactNode } from "react";
import { StyleSheet } from "react-native";

import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export type SectionWrapperProps = {
  title: string;
  action?: ReactNode;
} & PropsWithChildren;
export function SectionWrapper(props: SectionWrapperProps) {
  const { title, action, children } = props;

  return (
    <View style={style.container}>
      <View style={style.headerWrapper}>
        <Typography fontFamily="Poppins-Bold" fontSize={14}>
          {title}
        </Typography>
        {action}
      </View>
      {children}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    gap: 10,
    width: "100%",
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
