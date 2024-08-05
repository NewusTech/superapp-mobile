import { Modal, StyleSheet } from "react-native";

import { useAppTheme } from "@/context/theme-context";

import { Loader } from "../loader/Loader";
import { View, ViewProps } from "../view/View";

export type PageWrapperProps = {
  isLoading?: boolean;
} & ViewProps;
export function PageWrapper(props: PageWrapperProps) {
  const { isLoading = false, children, style, ...rest } = props;

  const { Colors } = useAppTheme();

  return (
    <View style={[styles.container, style]} {...rest}>
      {children}

      <Modal
        visible={isLoading}
        style={{ flex: 1 }}
        statusBarTranslucent
        transparent
        animationType="fade"
      >
        <View
          style={[
            styles.modalViewContainer,
            { backgroundColor: Colors.textprimary + "80" },
          ]}
        >
          <Loader />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalViewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
