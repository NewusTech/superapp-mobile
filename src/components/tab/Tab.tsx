import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from "react-native";

import { useAppTheme } from "@/context/theme-context";

import { Typography } from "../typography/Typography";
import { View } from "../view/View";

type TabItem = {
  key: string;
  label: string;
  indicator?: boolean;
};
export type TabProps = TouchableWithoutFeedbackProps & {
  tabs: TabItem[];
  variant?: "button" | "thin";
  activeTab: TabItem["key"];
  onPress: (key: TabItem["key"]) => void;
};
export function Tab(props: TabProps) {
  const { tabs, activeTab, variant = "thin", onPress = () => {} } = props;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={style.container}>
        {tabs.map(({ key, label, indicator, ...rest }) => (
          <TouchableWithoutFeedback
            key={key}
            onPress={() => onPress(key)}
            {...rest}
          >
            <View>
              {variant === "thin" && (
                <TabItemThin
                  label={label}
                  indicator={indicator}
                  isActive={activeTab === key}
                />
              )}
              {variant === "button" && (
                <TabItemButton
                  label={label}
                  indicator={indicator}
                  isActive={activeTab === key}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </ScrollView>
  );
}

function TabItemThin({
  label,
  indicator,
  isActive,
}: Omit<TabItem, "key"> & { isActive: boolean }) {
  return (
    <View style={style.touchableContainer}>
      <Typography
        fontFamily="Poppins-Bold"
        fontSize={12}
        color={isActive ? "main" : "textprimary"}
      >
        {label}
      </Typography>

      {isActive && <View backgroundColor="main" style={style.indicator} />}

      {indicator && (
        <View backgroundColor="dangerbase" style={style.indicatorPoint} />
      )}
    </View>
  );
}

function TabItemButton({
  label,
  isActive,
}: Omit<TabItem, "key" | "indicator"> & { isActive: boolean }) {
  const { Colors } = useAppTheme();

  return (
    <View
      backgroundColor={isActive ? "main" : "transparent"}
      style={[
        style.touchableContainerButton,
        { borderColor: isActive ? Colors.main : Colors.outlineborder },
      ]}
    >
      <Typography
        fontFamily="OpenSans-Regular"
        fontSize={14}
        color={isActive ? "paper" : "textprimary"}
        style={{ textAlignVertical: "center" }}
      >
        {label}
      </Typography>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  touchableContainer: {
    minWidth: 50,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  touchableContainerButton: {
    // minWidth: 80,
    // minHeight: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  indicator: {
    height: 2,
    borderRadius: 99,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  indicatorPoint: {
    width: 6,
    height: 6,
    position: "absolute",
    top: 3,
    right: -7,
    borderRadius: 99,
  },
});
