import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, RefreshControl, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  RoundedButton,
  SearchBox,
  SectionWrapper,
  Tab,
  Typography,
  View,
} from "@/components";
import {
  IconBasket,
  IconBuilding,
  IconCar,
  IconCarSide,
  IconPackage,
} from "@/components/icons";
import { PromoItem } from "@/components/promo-item/PromoItem";
import { useAppTheme } from "@/context/theme-context";
import { useGetArticleList } from "@/features/article/api/useGetArticleList";
import {
  ArticleEmpty,
  ArticleItem,
  ArticleItemPlaceholder,
  articleListPlaceholderData,
} from "@/features/article/components";
import { RuteItem } from "@/features/article/components/rute-item/RuteItem";
import { useAuthProfile } from "@/features/auth/store/auth-store";
import { useGetTravelBranch } from "@/features/travel/api/useGetTravelBranch";
import { formatCurrency } from "@/utils/common";

import { PromoItemList } from "../travel/booking-travel";

export default function HomeTabScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const userProfile = useAuthProfile();

  const articleListQuery = useGetArticleList();

  const travelBranchQuery = useGetTravelBranch();

  const [activeFilter, setActiveFilter] = useState("Lampung");

  const branchList = useMemo(() => {
    if (!travelBranchQuery.data) return [];
    return travelBranchQuery.data?.data.map((item) => ({
      title: item.nama,
    }));
  }, [travelBranchQuery.data]);

  const handleRefresh = useCallback(() => {
    articleListQuery.refetch();
  }, [articleListQuery]);

  useEffect(() => {
    handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
              disabled
            />
            <RoundedButton
              label="Rental"
              icon={<IconCarSide width={24} height={24} color="paper" />}
              iconColor="dangerbase"
              onPress={() => router.push("/rental/rental-car-lists")}
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
        <SectionWrapper title="Rute">
          <View style={styles.tabContainer}>
            <Tab
              tabs={[
                ...branchList.map((b) => {
                  return {
                    key: b.title,
                    label: b.title,
                  };
                }),
              ]}
              activeTab={activeFilter}
              onPress={(key) => setActiveFilter(key as string)}
              variant="button"
            />
          </View>
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
                <RuteItem
                  badgePromo
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
            snapToStart
            decelerationRate={"normal"}
            snapToInterval={175}
          />
        </SectionWrapper>
        <View style={{ height: 10 }} />
        <SectionWrapper title="Pariwisata">
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
            snapToStart
            decelerationRate={"normal"}
            snapToInterval={175}
          />
        </SectionWrapper>
        <View
          style={{
            marginBottom: insets.bottom + 10,
            marginTop: 20,
            marginHorizontal: 20,
            // borderRadius: 20,
            // overflow: "hidden",
          }}
        >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={PromoItemList}
            renderItem={({ item }) => (
              <PromoItem imgUrl={item.imgUrl} width={326} borderRadius={20} />
            )}
            style={{ width: "100%" }}
            ListEmptyComponent={() => <ArticleEmpty />}
            snapToStart
            decelerationRate={"normal"}
            snapToInterval={336}
            contentContainerStyle={{ gap: 10 }}
          />
        </View>
      </ScrollView>
    </>
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
    paddingVertical: 10,
    gap: 16,
    flexGrow: 1,
  },
  tabContainer: {
    marginLeft: 20,
  },
});
