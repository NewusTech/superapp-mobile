import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { BlurView } from "expo-blur";
import { Image } from "react-native-svg";

import { View } from "../view/View";

export default function ModalViewImg({
  isActive,
  setActive,
  image,
}: {
  isActive: boolean;
  setActive: (value: boolean) => void;
  image: any;
}) {
  return (
    <>
      {isActive && (
        <View style={style.containerPopup}>
          <TouchableWithoutFeedback onPress={() => setActive(false)}>
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
                  source={image}
                  style={{ height: "100%" }}
                />
              </View>
            </BlurView>
          </TouchableWithoutFeedback>
        </View>
      )}
    </>
  );
}

const style = StyleSheet.create({
  containerPopup: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    shadowRadius: 1,
    overflow: "hidden",
  },
});
