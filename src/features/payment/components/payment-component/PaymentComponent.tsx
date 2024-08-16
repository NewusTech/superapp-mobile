import {
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewProps as RNViewProps,
} from "react-native";

import { Checkbox, Loader, Typography, View } from "@/components";
import { useAppTheme } from "@/context/theme-context";

import { useGetPaymentMethodQuery } from "../../api/useGetPaymentMethodQuery";

export type PaymentComponentProps = {
  selectedMethod: any;
  onMethodSelected: (id: number) => void;
} & RNViewProps;
export function PaymentComponent(props: PaymentComponentProps) {
  const { selectedMethod, onMethodSelected, ...rest } = props;

  const { Colors } = useAppTheme();

  // query & mutation
  const paymentMethodQuery = useGetPaymentMethodQuery();
  console.log({ paymentMethodQuery });

  return (
    <View style={{ gap: 5 }} {...rest}>
      <Typography fontFamily="Poppins-Bold" fontSize={16}>
        Metode Pembayaran
      </Typography>

      <View
        style={[
          styles.paymentContainer,
          { borderColor: Colors.outlineborder, borderRadius: 20 },
        ]}
      >
        {paymentMethodQuery.isFetching ? (
          <View style={styles.loadingContainer}>
            <Loader />
          </View>
        ) : (
          <>
            <Typography fontFamily="Poppins-Bold" fontSize={12}>
              Dompet Digital
            </Typography>
            <FlatList
              data={paymentMethodQuery.data?.data.payment_gateway}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  onPress={() => onMethodSelected(item.id)}
                >
                  <View style={styles.paymentItem}>
                    <Image
                      source={{ uri: item.img }}
                      style={{ height: 30, width: 30, resizeMode: "center" }}
                    />
                    <View style={{ flex: 1 }}>
                      <Typography>{item.nama}</Typography>
                      <Typography
                        fontFamily="OpenSans-Regular"
                        fontSize={10}
                        color="textsecondary"
                      >
                        {item.keterangan}
                      </Typography>
                    </View>
                    <Checkbox selected={item.id === selectedMethod} />
                  </View>
                </TouchableWithoutFeedback>
              )}
              ListEmptyComponent={() => (
                <View style={styles.loadingContainer}>
                  <Typography fontFamily="OpenSans-Semibold">
                    Tidak ada data
                  </Typography>
                </View>
              )}
            />
            <Typography fontFamily="Poppins-Bold" fontSize={12}>
              Bank Transfer
            </Typography>
            <FlatList
              data={paymentMethodQuery.data?.data.bank_transfer}
              renderItem={({ item }) => (
                <TouchableWithoutFeedback
                  onPress={() => onMethodSelected(item.id)}
                >
                  <View style={styles.paymentItem}>
                    <Image
                      source={{ uri: item.img }}
                      style={{ height: 30, width: 30, resizeMode: "center" }}
                    />
                    <View style={{ flex: 1 }}>
                      <Typography>{item.nama}</Typography>
                      <Typography
                        fontFamily="OpenSans-Regular"
                        fontSize={10}
                        color="textsecondary"
                      >
                        {item.keterangan}
                      </Typography>
                    </View>
                    <Checkbox selected={item.id === selectedMethod} />
                  </View>
                </TouchableWithoutFeedback>
              )}
              ListEmptyComponent={() => (
                <View style={styles.loadingContainer}>
                  <Typography fontFamily="OpenSans-Semibold">
                    Tidak ada data
                  </Typography>
                </View>
              )}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paymentContainer: {
    borderWidth: 1,
    borderRadius: 2,
    padding: 12,
  },
  paymentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    paddingVertical: 10,
  },
  loadingContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
});
