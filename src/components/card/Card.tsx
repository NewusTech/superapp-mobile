import {
  Pressable,
  StyleSheet,
  TouchableNativeFeedbackProps,
} from "react-native";

import { View } from "@/components";
import { useAppTheme } from "@/context/theme-context";

type CardProps = {
  children: React.ReactNode;
} & TouchableNativeFeedbackProps;
export function Card(props: CardProps) {
  const { disabled, children, ...rest } = props;

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
            {children}
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
