import {
  FlatList,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  RoundedButton,
  SearchBox,
  SectionWrapper,
  Typography,
  View,
} from "@/components";
import {
  IconArrowRight,
  IconBasket,
  IconBuilding,
  IconCar,
  IconCarSide,
  IconPackage,
} from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { useGetArticleList } from "@/features/article/api/useGetArticleList";
import {
  ArticleEmpty,
  ArticleItem,
  ArticleItemPlaceholder,
  articleListPlaceholderData,
} from "@/features/article/components";
import { useAuthProfile } from "@/features/auth/store/auth-store";
import { formatCurrency } from "@/utils/common";

export default function HomeTabScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const userProfile = useAuthProfile();

  const articleListQuery = useGetArticleList();

  const handleRefresh = () => {
    articleListQuery.refetch();
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.paper }}
        stickyHeaderIndices={[0]}
        refreshControl={
          <RefreshControl
            refreshing={articleListQuery.isRefetching}
            onRefresh={handleRefresh}
            progressViewOffset={20}
          />
        }
      >
        <View
          backgroundColor="main"
          style={[styles.headerContainer, { height: insets.top + 106 }]}
        >
          <View style={[styles.headerWrapper, { paddingTop: insets.top + 20 }]}>
            <SearchBox placeholder="Cari disini..." />
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.contentGreetingWrapper}>
            <Typography fontFamily="Poppins-Bold" fontSize={14}>
              Hi, {userProfile?.nama}
            </Typography>
          </View>
          <View style={styles.actionButtonWrapper}>
            <RoundedButton
              label="Travel"
              icon={<IconCar width={24} height={24} color="paper" />}
              iconColor="main"
              onPress={() => router.push("/travel/booking-travel")}
            />
            <RoundedButton
              label="Paket"
              icon={<IconPackage width={24} height={24} color="paper" />}
              iconColor="secondary"
              onPress={() => router.push("/package/shipment-form")}
            />
            <RoundedButton
              label="Rental"
              icon={<IconCarSide width={24} height={24} color="paper" />}
              iconColor="dangerbase"
              disabled
            />
            <RoundedButton
              label="Oleh-oleh"
              icon={<IconBasket width={24} height={24} color="paper" />}
              iconColor="thirtiary"
              disabled
            />
            <RoundedButton
              label="Hotel"
              icon={<IconBuilding width={24} height={24} color="paper" />}
              iconColor="quarternary"
              disabled
            />
          </View>
        </View>

        <SectionWrapper
          title="Artikel"
          action={
            <TouchableWithoutFeedback
              onPress={() => router.push("/(tabs)/article")}
            >
              <View
                style={[
                  styles.touchableIconWrapper,
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
            data={
              articleListQuery.isFetching
                ? articleListPlaceholderData
                : articleListQuery.data?.data || []
            }
            renderItem={({ item }) =>
              articleListQuery.isFetching ? (
                <ArticleItemPlaceholder />
              ) : (
                <ArticleItem
                  imgSource={{ uri: item.image_url }}
                  title={item.judul}
                  subtitle={item.konten}
                  price={formatCurrency(item.harga)}
                  onPress={() =>
                    router.push({
                      pathname: "/article/[id]",
                      params: {
                        id: item.id,
                      },
                    })
                  }
                />
              )
            }
            style={{ width: "100%" }}
            ListEmptyComponent={() => <ArticleEmpty />}
            contentContainerStyle={styles.listArticleContainer}
          />
        </SectionWrapper>

        <View style={{ height: 80 }} />
      </ScrollView>

      <View style={styles.promoBannerContainer}>
        <ImageBackground
          source={require("@/assets/images/promo/promo-banner.jpg")}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
          }}
          resizeMode="cover"
        />
        <View style={styles.promoBannerContent}>
          <Typography color="paper" fontSize={16} fontFamily="Poppins-Bold">
            Promo
          </Typography>
          <Typography color="paper">
            Nikmati perjalanan anda dengan berbagai promo menarik dari kami!
          </Typography>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    width: "100%",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: "hidden",
  },
  headerWrapper: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 0,
    marginBottom: 43,
  },
  contentGreetingWrapper: {
    padding: 12,
    gap: 20,
  },
  actionButtonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
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
  promoBannerContainer: {
    height: 117,
    width: "100%",
    borderTopLeftRadius: 2,
    justifyContent: "center",
    borderTopRightRadius: 2,
  },
  promoBannerContent: {
    justifyContent: "center",
    padding: 16,
  },
});
