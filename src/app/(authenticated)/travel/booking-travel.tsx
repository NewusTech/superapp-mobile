import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  ImageBackground,
  ImageProps,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  TravelScheduleQuery,
  travelScheduleQuerySchema,
} from "@/apis/internal.api.type";
import {
  Appbar,
  Button,
  DateInputV2,
  SectionWrapper,
  SelectInputV2,
  Separator,
  Typography,
  View,
} from "@/components";
import {
  IconArrowRight,
  IconCalendar,
  IconCarSide,
  IconChevronDown,
  IconSeat,
  IconSwap,
} from "@/components/icons";
import InputSwitch from "@/components/input-switch/InputSwitch";
import { PromoItem } from "@/components/promo-item/PromoItem";
import SelectTravelComponent from "@/components/travel/SelectTravelComponent";
import { AppColor } from "@/constants/Colors";
import { useAppTheme } from "@/context/theme-context";
import { ArticleEmpty } from "@/features/article/components";
import { useGetTravelBranch } from "@/features/travel/api/useGetTravelBranch";
import { useTravelActions } from "@/features/travel/store/travel-store";
import { zodResolver } from "@hookform/resolvers/zod";

export const PromoItemList: { imgUrl: ImageProps["source"] }[] = [
  { imgUrl: require("@/assets/images/promo/1.png") },
  { imgUrl: require("@/assets/images/promo/2.png") },
  { imgUrl: require("@/assets/images/promo/3.png") },
  { imgUrl: require("@/assets/images/promo/4.png") },
];

export default function BookingTravelScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const maxChair = 8;

  const [pulangPergi, setPulangPergi] = useState<boolean>(false);

  const { Colors } = useAppTheme();

  const { setBookingPayload } = useTravelActions();

  const travelBranchQuery = useGetTravelBranch();

  const branchList = useMemo(() => {
    if (!travelBranchQuery.data) return [];
    return travelBranchQuery.data?.data.map((item) => ({
      title: item.nama,
    }));
  }, [travelBranchQuery.data]);

  const chairList = Array.from({ length: maxChair }, (v, i) => ({
    title: i + 1,
  }));

  const { control, formState, handleSubmit, setValue, getValues } =
    useForm<TravelScheduleQuery>({
      defaultValues: {
        date: new Date(),
        seats: 1,
      },
      resolver: zodResolver(travelScheduleQuerySchema),
      mode: "all",
    });

  const handleSubmitForm = handleSubmit((data) => {
    setBookingPayload(data);
    router.push("/travel/available-schedule");
  });

  useEffect(() => {
    setBookingPayload(undefined);
  }, [setBookingPayload]);

  const handleSwap = () => {
    const fromValue = getValues("from");
    const toValue = getValues("to");
    setValue("from", toValue);
    setValue("to", fromValue);
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.paper }}
    >
      <View
        backgroundColor="dangerbase"
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
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={PromoItemList}
          renderItem={({ item }) => <PromoItem imgUrl={item.imgUrl} />}
          style={{ width: "100%" }}
          ListEmptyComponent={() => <ArticleEmpty />}
          contentContainerStyle={style.listArticleContainer}
        />
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
