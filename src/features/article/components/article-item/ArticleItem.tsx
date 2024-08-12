import {
  Image,
  ImageSourcePropType,
  Pressable,
  PressableProps,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { GetArticleResponseSuccess } from "@/apis/internal.api.type";
import { Typography, View } from "@/components";
import { useAppTheme } from "@/context/theme-context";

export type ArticleItemProps = {
  imgSource: ImageSourcePropType;
  title: string;
  subtitle: string;
  price: string;
} & PressableProps;
export function ArticleItem(props: ArticleItemProps) {
  const { title, imgSource, subtitle, price, ...rest } = props;

  const { Colors } = useAppTheme();

  return (
    <Pressable {...rest}>
      {() => (
        <View style={[style.container, { borderColor: Colors.outlineborder }]}>
          <Image
            source={imgSource}
            style={[style.image, { backgroundColor: Colors.bgsecondary }]}
          />

          <View style={style.contentWrapper}>
            <Typography
              fontFamily="OpenSans-Regular"
              fontSize={14}
              numberOfLines={1}
            >
              {title}
            </Typography>
            <View>
              <Typography
                fontFamily="OpenSans-Regular"
                fontSize={12}
                color="textsecondary"
                numberOfLines={1}
              >
                {subtitle.replace(/<[^>]*>?/gm, "")}
              </Typography>
              {/* <Typography
                fontFamily="OpenSans-Semibold"
                fontSize={16}
                numberOfLines={1}
              >
                {price}
              </Typography> */}
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
}

export const articleListPlaceholderData = [
  {},
  {},
  {},
] as GetArticleResponseSuccess["data"];
export function ArticleItemPlaceholder() {
  const { Colors } = useAppTheme();

  return (
    <View
      style={[
        style.container,
        { borderColor: Colors.outlineborder, marginHorizontal: "auto" },
      ]}
    >
      <Image style={[style.image, { backgroundColor: Colors.bgsecondary }]} />

      <View style={style.contentWrapper}>
        <Placeholder width={"90%"} height={16} />
        <View style={{ gap: 4 }}>
          <Placeholder />
          <Placeholder height={16} width={"70%"} />
        </View>
      </View>
    </View>
  );
}

function Placeholder({ height = 10, width = "50%" }: ViewStyle) {
  return (
    <View
      backgroundColor="outlineborder"
      style={[style.placeholder, { height, width }]}
    />
  );
}

const style = StyleSheet.create({
  container: {
    width: 155,
    height: 200,
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 123,
    resizeMode: "cover",
  },
  contentWrapper: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  placeholder: {},
});
