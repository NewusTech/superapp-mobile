import {
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
} & TouchableHighlightProps;
export function PromoItem(props: PromoItemProps) {
  const { imgUrl, height = 187, width = 326, ...rest } = props;

  return (
    <TouchableHighlight {...rest}>
      <Image source={imgUrl} style={[styles.container, { height, width }]} />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    resizeMode: "cover",
    borderRadius: 10,
  },
});
