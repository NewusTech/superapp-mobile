import {
  Dimensions,
  Image,
  ImageProps,
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
} from "react-native";

export type PromoItemProps = {
  imgUrl: ImageProps["source"];
  height?: any;
  width?: any;
  borderRadius?: any;
} & TouchableHighlightProps;
export function PromoItem(props: PromoItemProps) {
  // const { imgUrl, height = 187, width = 326, ...rest } = props;
  const {
    imgUrl,
    height = 187,
    width = Dimensions.get("window").width,
    borderRadius = 0,
    ...rest
  } = props;

  return (
    <TouchableHighlight {...rest}>
      <Image
        source={imgUrl}
        style={[
          styles.container,
          { height, width, resizeMode: "stretch", borderRadius },
        ]}
      />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    resizeMode: "cover",
    // borderRadius: 10,
  },
});
