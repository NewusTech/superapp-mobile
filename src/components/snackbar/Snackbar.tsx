import { StyleSheet } from "react-native";
import RNToast, {
  ToastHideParams,
  ToastProps,
  ToastShowParams,
} from "react-native-toast-message";

import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export type SnackbarProps = {
  message: string;
  variant?: "neutral" | "danger";
};
export function SnackbarRoot(props: ToastProps) {
  const { config, ...rest } = props;

  return (
    <RNToast
      config={{
        ...config,
        custom_toast: ({ props: toastProps }: { props: SnackbarProps }) => {
          const { message, variant = "neutral" } = toastProps;

          return (
            <View style={styles.container}>
              <View
                backgroundColor={variant === "neutral" ? "paper" : "dangerbase"}
                style={styles.snackbarWrapper}
              >
                <Typography
                  fontFamily="Poppins-Regular"
                  fontSize={12}
                  color={variant === "neutral" ? "textprimary" : "paper"}
                >
                  {message}
                </Typography>
              </View>
            </View>
          );
        },
      }}
      type="custom_toast"
      position="top"
      {...rest}
    />
  );
}

export const Snackbar = {
  show: (
    params: Omit<ToastShowParams, "props" | "text1" | "text2" | "type"> &
      SnackbarProps
  ) => {
    const { message = "", variant } = params;
    RNToast.show({
      ...params,
      props: {
        message,
        variant,
      },
    });
  },
  hide: (params: ToastHideParams) => {
    RNToast.hide(params);
  },
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  snackbarWrapper: {
    width: "100%",
    padding: 12,
    borderRadius: 4,
    elevation: 3,
    shadowColor: "black",
    shadowOpacity: 0.12,
    shadowOffset: {
      height: 2,
      width: 2,
    },
  },
});
