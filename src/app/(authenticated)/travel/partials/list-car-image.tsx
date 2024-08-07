import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, Typography, View } from "@/components";
import { useTravelSchedule } from "@/features/travel/store/travel-store";

export default function ListCarImage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const travelSchedule = useTravelSchedule();

  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar title={"Foto Lainnya"} backIconPress={() => router.back()} />
      <FlatList
        data={[]}
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback>
              <Image
                source={{
                  uri: "",
                }}
                style={[style.image, { marginBottom: 1 }]}
              />
            </TouchableWithoutFeedback>
          );
        }}
        ListEmptyComponent={() => (
          <Typography fontFamily="Poppins-Medium">Tidak ada Gambar</Typography>
        )}
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          gap: 16,
          padding: 20,
          paddingTop: 10,
          paddingBottom: insets.bottom + 20,
        }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "auto",
    height: 215,
    resizeMode: "cover",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  emptyScheduleContainer: {
    minHeight: 400,
    justifyContent: "center",
    alignItems: "center",
  },
});
