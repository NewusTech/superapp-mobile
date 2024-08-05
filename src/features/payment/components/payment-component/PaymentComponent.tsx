import {
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import { Checkbox, Loader, Typography, View } from "@/components";
import { useAppTheme } from "@/context/theme-context";

import { useGetPaymentMethodQuery } from "../../api/useGetPaymentMethodQuery";

export type PaymentComponentProps = {
  selectedMethod: any;
  onMethodSelected: (id: number) => void;
};
export function PaymentComponent(props: PaymentComponentProps) {
  const { selectedMethod, onMethodSelected } = props;

  const { Colors } = useAppTheme();

  // query & mutation
  const paymentMethodQuery = useGetPaymentMethodQuery();

  return (
    <View style={{ gap: 16 }}>
      <Typography fontFamily="Poppins-Bold" fontSize={16}>
        Metode Pembayaran
      </Typography>

      <View
        style={[styles.paymentContainer, { borderColor: Colors.outlineborder }]}
      >
        {paymentMethodQuery.isFetching ? (
          <View style={styles.loadingContainer}>
            <Loader />
          </View>
        ) : (
          <FlatList
            data={paymentMethodQuery.data?.data}
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
                    <Typography>{item.metode}</Typography>
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
