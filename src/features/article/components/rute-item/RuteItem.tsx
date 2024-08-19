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

export type RuteItemProps = {
  imgSource: ImageSourcePropType;
  title: string;
  price: string;
  badgePromo?: boolean;
  width?: number | "auto" | any;
  height?: number | "auto" | any;
} & PressableProps;
export function RuteItem(props: RuteItemProps) {
  const {
    title,
    imgSource,
    price,
    badgePromo,
    width = 155,
    height = 220,
    ...rest
  } = props;

  const { Colors } = useAppTheme();

  return (
    <Pressable {...rest} style={{}}>
      {({ pressed }) => (
        <View
          style={[
            style.container,
            {
              height,
              width,
              borderColor: Colors.outlineborder,
              backgroundColor: Colors.paper,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 1.0,
              elevation: 1,
            },
          ]}
        >
          {pressed && (
            <View
              style={{
                backgroundColor: Colors.outlineborder,
                width: "100%",
                height: "100%",
                zIndex: 2,
                opacity: 0.25,
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          )}
          {badgePromo && (
            <View
              style={{
                width: "100%",
                height: 30,
                position: "absolute",
                zIndex: 1,
                top: 0,
                left: 0,
              }}
            >
              <Typography
                fontFamily="Poppins-Medium"
                fontSize={10}
                numberOfLines={2}
                color="paper"
                style={{
                  height: 30,
                  width: "50%",
                  borderBottomRightRadius: 20,
                  textAlign: "center",
                  textAlignVertical: "center",
                  backgroundColor: Colors.badgeWaring,
                }}
              >
                Hot Promo
              </Typography>
            </View>
          )}
          <Image
            source={imgSource}
            style={[style.image, { backgroundColor: Colors.bgsecondary }]}
          />
          <View style={style.contentWrapper}>
            <Typography
              fontFamily="Poppins-SemiBold"
              fontSize={13}
              numberOfLines={2}
            >
              {title}
            </Typography>
            <View style={{ flexDirection: "column", marginTop: "auto" }}>
              <Typography
                fontFamily="Poppins-Light"
                fontSize={10}
                color="textsecondary"
                numberOfLines={1}
              >
                Mulai dari
              </Typography>
              <Typography
                fontFamily="Poppins-Regular"
                fontSize={12}
                color="secondary"
                numberOfLines={1}
              >
                {price}
              </Typography>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
}

export function RuteItemEmpty() {
  return (
    <View backgroundColor="outlineborder" style={style.containerItemEmpty}>
      <Typography fontFamily="Poppins-Regular">
        Belum ada Rute yang tersedia
      </Typography>
    </View>
  );
}

const style = StyleSheet.create({
  containerItemEmpty: {
    flex: 1,
    padding: 24,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    borderWidth: 0.5,
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
    paddingTop: 5,
    justifyContent: "space-between",
  },
  placeholder: {},
});
