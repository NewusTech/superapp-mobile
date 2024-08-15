import {
  Image,
  ImageProps,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const RenderImg = ({
  imgUrl,
  height,
  width,
  borderRadius = 0,
  onPressImg,
}: {
  imgUrl: ImageProps["source"];
  height: any;
  width: any;
  borderRadius?: any;
  onPressImg?: () => void;
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPressImg}>
      <Image
        source={imgUrl}
        style={[style.image, { height, width, borderRadius }]}
      />
    </TouchableWithoutFeedback>
  );
};

export default RenderImg;

const style = StyleSheet.create({
  image: {
    width: "auto",
    resizeMode: "cover",
  },
});
