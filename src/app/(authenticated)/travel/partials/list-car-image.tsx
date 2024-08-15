import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, Typography, View } from "@/components";
import RenderImg from "@/components/image/RenderImg";
import { useTravelSchedule } from "@/features/travel/store/travel-store";

import { RentalImgDump } from "../../rental/detail/[id]";

export default function ListCarImage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const travelSchedule = useTravelSchedule();

  const [activePopupImg, setActivePopupImg] = useState(false);

  const [activeImg, setActiveImg] = useState<any>();

  const handleSelectedImg = (url: any) => {
    setActiveImg(url);
    setActivePopupImg(true);
  };

  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar title={"Foto Lainnya"} backIconPress={() => router.back()} />
      <FlatList
        data={RentalImgDump}
        renderItem={({ item }) => {
          return (
            <RenderImg
              imgUrl={item.imgUrl}
              height={200}
              width={"100%"}
              onPressImg={() => handleSelectedImg(item.imgUrl)}
            />
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
      {/* // Modal Foto */}
      {activePopupImg && (
        <View style={style.containerPopup}>
          <TouchableWithoutFeedback onPress={() => setActivePopupImg(false)}>
            <BlurView
              intensity={100}
              blurReductionFactor={100}
              experimentalBlurMethod="dimezisBlurView"
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <View
                style={{
                  width: "auto",
                  height: 210,
                  marginHorizontal: 25,
                  marginVertical: "auto",
                  overflow: "hidden",
                  borderRadius: 10,
                }}
              >
                <Image
                  // source={{
                  //   uri: activeImg,
                  // }}
                  source={activeImg}
                  style={{ height: "100%" }}
                />
              </View>
            </BlurView>
          </TouchableWithoutFeedback>
        </View>
      )}
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
  containerPopup: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    shadowRadius: 1,
    overflow: "hidden",
  },
});
