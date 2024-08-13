import React from "react";
import {
  FlatList,
  Image,
  ImageProps,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { View } from "@/components";
import { IconChevronLeft } from "@/components/icons";

const RentalImgDump: { imgUrl: ImageProps["source"] }[] = [
  { imgUrl: require("@/assets/images/promo/1.png") },
  { imgUrl: require("@/assets/images/promo/2.png") },
  { imgUrl: require("@/assets/images/promo/3.png") },
  { imgUrl: require("@/assets/images/promo/4.png") },
];

export default function DetailRentalCar() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const params = useLocalSearchParams<{
    id: string;
  }>();
  return (
    <View
      backgroundColor="paper"
      style={[style.container, { paddingTop: insets.top }]}
    >
      <View
        style={{
          height: 350,
        }}
      >
        <View
          style={{
            position: "absolute",
            zIndex: 2,
            width: "100%",
            height: 40,
            padding: 10,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "white",
              width: 26,
              height: 26,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => router.back()}
          >
            <IconChevronLeft height={21} width={21} />
          </Pressable>
        </View>
        <FlatList
          data={RentalImgDump.slice(0, 1)} // Only render the main image
          renderItem={({ item }) => (
            <RenderImg imgUrl={item.imgUrl} height={200} width={"100%"} />
          )}
          style={style.mainImageContainer}
        />
        <View style={style.detailImageContainer}>
          {RentalImgDump.map((item, index) => (
            <RenderImg
              key={index}
              height={100}
              width={60}
              imgUrl={item.imgUrl}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const RenderImg = ({
  imgUrl,
  height,
  width,
}: {
  imgUrl: ImageProps["source"];
  height: any;
  width: any;
}) => {
  return (
    <TouchableWithoutFeedback>
      <Image source={imgUrl} style={[style.image, { height, width }]} />
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailImageContainer: {
    height: 150,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "yellow",
  },
  mainImageContainer: {
    height: 220,
    backgroundColor: "red",
  },
  image: {
    width: "auto",
    resizeMode: "cover",
  },
});
