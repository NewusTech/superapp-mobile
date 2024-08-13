import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, View } from "@/components";
import RentaCardlItem from "@/components/rental/RentaCardlItem";
import { useAppTheme } from "@/context/theme-context";

export default function RentalCarLists() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { Colors } = useAppTheme();
  return (
    <>
      <Appbar
        title={"Rental"}
        backgroundColor="paper"
        backIconPress={() => router.back()}
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.paper }}
      >
        <View style={style.container}>
          <RentaCardlItem />
        </View>
      </ScrollView>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
