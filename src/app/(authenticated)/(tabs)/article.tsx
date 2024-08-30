import {
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

import { Appbar, SectionWrapper, View } from "@/components";
import { useAppTheme } from "@/context/theme-context";
import { useGetArticleList } from "@/features/article/api/useGetArticleList";
import {
  ArticleEmpty,
  ArticleItem,
  ArticleItemPlaceholder,
  articleListPlaceholderData,
} from "@/features/article/components";
import { formatCurrency } from "@/utils/common";

import { pariwisataListQueryData } from "./home";

export default function ArticleTabScreen() {
  const router = useRouter();

  const { Colors } = useAppTheme();

  // const articleListQuery = useGetArticleList();
  // const articleListRecomendationQuery = useGetArticleList({
  //   type: "rekomendasi",
  // });

  // const handleRefresh = () => {
  //   articleListQuery.refetch();
  //   articleListRecomendationQuery.refetch();
  // };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.paper }}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={
      //       articleListQuery.isRefetching ||
      //       articleListRecomendationQuery.isRefetching
      //     }
      //     onRefresh={handleRefresh}
      //     progressViewOffset={20}
      //   />
      // }
    >
      <Appbar title="Explore" />

      <View style={[styles.contentContainer, { paddingHorizontal: 20 }]}>
        <SectionWrapper title="Rekomendasi untuk anda">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={
              // articleListQuery.isFetching
              //   ? articleListPlaceholderData
              //   : articleListQuery.data?.data || []
              pariwisataListQueryData
            }
            renderItem={({ item, index }) => (
              <ArticleItem
                width={Dimensions.get("window").width / 2.3 + index}
                badgeLocation={item.lokasi}
                imgSource={{ uri: item.image_url }}
                title={item.judul}
                subtitle={item.konten}
                rating={item.rating}
                onPress={() =>
                  router.push({
                    pathname: "/wisata/[id]",
                    params: {
                      id: item.id,
                    },
                  })
                }
              />
            )}
            style={{ width: "100%" }}
            ListEmptyComponent={() => <ArticleEmpty />}
            contentContainerStyle={styles.listArticleContainer}
            snapToStart
            decelerationRate={"normal"}
            snapToInterval={Dimensions.get("window").width / 2.3 + 19}
          />
        </SectionWrapper>

        <SectionWrapper title="Explore Pariwisata">
          <FlatList
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            data={
              // articleListQuery.isFetching
              //   ? articleListPlaceholderData
              //   : articleListQuery.data?.data || []
              pariwisataListQueryData
            }
            renderItem={({ item, index }) => (
              <ArticleItem
                style={{
                  marginHorizontal:
                    pariwisataListQueryData.length === index + 1 ? 10 : "auto",
                }}
                width={Dimensions.get("window").width / 2.5}
                badgeLocation={item.lokasi}
                imgSource={{ uri: item.image_url }}
                title={item.judul}
                subtitle={item.konten}
                rating={item.rating}
                onPress={() =>
                  router.push({
                    pathname: "/wisata/[id]",
                    params: {
                      id: item.id,
                    },
                  })
                }
              />
            )}
            style={{ width: "100%" }}
            ListEmptyComponent={() => <ArticleEmpty />}
            contentContainerStyle={styles.listArticleContainer}
          />
        </SectionWrapper>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 37,
    gap: 20,
  },
  sectionHeader: {},
  listArticleContainer: {
    gap: 16,
  },
});
