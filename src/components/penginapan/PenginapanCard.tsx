import { Image, Pressable, PressableProps, StyleSheet } from "react-native";

import { useAppTheme } from "@/context/theme-context";
import { formatCurrency } from "@/utils/common";

import { IconBedroom, IconDimensions, IconMaps, IconStar } from "../icons";
import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export type ArticleItemProps = {
  onPress?: () => void;
} & PressableProps;

export default function PenginapanCard(props: ArticleItemProps) {
  const { onPress } = props;

  const { Colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          flexDirection: "column",
          borderRadius: 20,
          backgroundColor: Colors.paper,
          overflow: "hidden",
          height: 280,
          borderWidth: 0.5,
          borderColor: pressed ? Colors.main : Colors.outlineborder,
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
      {({ pressed }) => (
        <>
          {pressed && (
            <View
              style={[
                style.container,
                style.mask,
                {
                  borderWidth: 0,
                  backgroundColor: Colors.textsecondary,
                  opacity: 0.1,
                },
              ]}
            />
          )}
          {true && (
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
                color="paper"
                style={{
                  height: 30,
                  width: "30%",
                  borderBottomRightRadius: 20,
                  textAlign: "center",
                  textAlignVertical: "center",
                  backgroundColor: Colors.secondary,
                }}
              >
                Apartemen
              </Typography>
            </View>
          )}
          <Image
            source={require("@/assets/images/apartDefault.png")}
            style={{ width: "100%", height: "55%" }}
          />
          <View style={{ paddingHorizontal: 20, paddingVertical: 10, gap: 5 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography
                fontFamily="OpenSans-Bold"
                fontSize={16}
                numberOfLines={1}
                style={{ width: "72%" }}
              >
                Podomoro Golf View{" "}
              </Typography>
              <View
                style={{
                  flexDirection: "row",
                  gap: 2,
                  marginTop: 2,
                }}
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <IconStar
                    key={index}
                    height={14}
                    width={14}
                    color={index < 5 ? "yellow" : "textsecondary"} // warna kuning untuk bintang aktif, abu-abu untuk bintang non-aktif
                  />
                ))}
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <IconMaps color="quarternary" />
                <Typography
                  fontFamily="OpenSans-Regular"
                  fontSize={12}
                  numberOfLines={1}
                  style={{ width: "72%" }}
                  color="quarternary"
                >
                  Bogor, Jawa Barat
                </Typography>
              </View>
              <Typography
                fontFamily="OpenSans-Regular"
                fontSize={12}
                numberOfLines={1}
                color="quarternary"
              >
                (4,5)
              </Typography>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                gap: 20,
                alignItems: "center",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <IconBedroom color="quarternary" />
                <Typography
                  fontFamily="OpenSans-Regular"
                  fontSize={12}
                  numberOfLines={1}
                  color="quarternary"
                >
                  2 Kamar
                </Typography>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <IconDimensions color="quarternary" />
                <View style={{ flexDirection: "row" }}>
                  <Typography
                    fontFamily="OpenSans-Regular"
                    fontSize={12}
                    numberOfLines={1}
                    color="quarternary"
                  >
                    36 m
                  </Typography>
                  <Typography
                    fontFamily="OpenSans-Regular"
                    fontSize={8}
                    style={{
                      textAlignVertical: "top",
                      position: "relative",
                      top: -2,
                    }}
                  >
                    2
                  </Typography>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Typography
                  fontFamily="OpenSans-Medium"
                  fontSize={16}
                  numberOfLines={1}
                  style={{ width: "72%" }}
                  color="secondary"
                >
                  {formatCurrency(100000)}
                  <Typography
                    fontFamily="OpenSans-Regular"
                    fontSize={16}
                    numberOfLines={1}
                    color="textsecondary"
                  >
                    {" "}
                    /malam
                  </Typography>
                </Typography>
              </View>
              <Typography
                fontFamily="OpenSans-Regular"
                fontSize={16}
                numberOfLines={1}
                color="success"
              >
                Tersedia
              </Typography>
            </View>
          </View>
        </>
      )}
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 20,
    gap: 10,
  },
  mask: {
    width: "100%",
    height: "100%",
    zIndex: 2,
    opacity: 0.15,
    position: "absolute",
    top: 0,
    left: 0,
  },
});
