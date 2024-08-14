import { useEffect } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  ImageProps,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, SectionWrapper, View } from "@/components";
import { IconArrowRight } from "@/components/icons";
import { PromoItem } from "@/components/promo-item/PromoItem";
import SelectTravelComponent from "@/components/travel/SelectTravelComponent";
import { AppColor } from "@/constants/Colors";
import { useAppTheme } from "@/context/theme-context";
import { ArticleEmpty } from "@/features/article/components";
import { useTravelActions } from "@/features/travel/store/travel-store";

export const PromoItemList: { imgUrl: ImageProps["source"] }[] = [
  { imgUrl: require("@/assets/images/promo/1.png") },
  { imgUrl: require("@/assets/images/promo/2.png") },
  { imgUrl: require("@/assets/images/promo/3.png") },
  { imgUrl: require("@/assets/images/promo/4.png") },
];

export default function BookingTravelScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { Colors } = useAppTheme();

  const { setBookingPayload } = useTravelActions();

  useEffect(() => {
    setBookingPayload(undefined);
  }, [setBookingPayload]);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.paper }}
    >
      <View
        backgroundColor="paper"
        style={[style.headerBack, { height: insets.top + 130 }]}
      >
        <ImageBackground
          source={require("@/assets/images/header_banner_travel.png")}
          style={style.backgroundImage}
        />
      </View>

      <Appbar
        title={"Travel"}
        backgroundColor="transparent"
        hasBorder={false}
        colorSheme="dark"
        backIconPress={() => router.back()}
        variant="light"
      />

      <View
        style={{
          backgroundColor: "white",
          borderWidth: 0.5,
          borderColor: AppColor.light.textsecondary,
          borderRadius: 20,
          margin: 20,
        }}
      >
        <SelectTravelComponent
          handleAfterSubmit={() => router.push("/travel/available-schedule")}
        />
      </View>

      <SectionWrapper
        title="Langkah mudah untuk memesan travel"
        action={
          <TouchableWithoutFeedback
            onPress={() => router.push("/(tabs)/article")}
          >
            <View
              style={[
                style.touchableIconWrapper,
                { backgroundColor: Colors.bgsecondary },
              ]}
            >
              <IconArrowRight height={20} width={20} color="main" />
            </View>
          </TouchableWithoutFeedback>
        }
      >
        <View
          style={{
            marginBottom: insets.bottom + 10,
            marginTop: 20,
            marginHorizontal: 20,
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={PromoItemList}
            renderItem={({ item }) => <PromoItem imgUrl={item.imgUrl} />}
            style={{
              width: "100%",
            }}
            ListEmptyComponent={() => <ArticleEmpty />}
            snapToAlignment="start"
            decelerationRate={"normal"}
            snapToInterval={Dimensions.get("window").width}
          />
        </View>
      </SectionWrapper>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  headerBack: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    position: "absolute",
    top: 0,
    width: "100%",
    overflow: "hidden",
  },
  orderBox: {
    margin: 24,
    marginTop: 16,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderRadius: 10,
  },
  destinationBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    gap: 12,
    justifyContent: "center",
  },
  destinationIconSwap: {
    height: 40,
    width: 40,
    borderRadius: 99,
    position: "absolute",
    right: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableIconWrapper: {
    height: 24,
    width: 24,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
  listArticleContainer: {
    paddingHorizontal: 20,
    gap: 16,
    flexGrow: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
