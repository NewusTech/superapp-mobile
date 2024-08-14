import { FlatList, RefreshControl, ScrollView, StyleSheet } from "react-native";
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

export default function ArticleTabScreen() {
  const router = useRouter();

  const { Colors } = useAppTheme();

  const articleListQuery = useGetArticleList();
  const articleListRecomendationQuery = useGetArticleList({
    type: "rekomendasi",
  });

  const handleRefresh = () => {
    articleListQuery.refetch();
    articleListRecomendationQuery.refetch();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.paper }}
      refreshControl={
        <RefreshControl
          refreshing={
            articleListQuery.isRefetching ||
            articleListRecomendationQuery.isRefetching
          }
          onRefresh={handleRefresh}
          progressViewOffset={20}
        />
      }
    >
      <Appbar title="Explor" />

      <View style={styles.contentContainer}>
        <SectionWrapper title="Rekomendasi untuk anda">
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={
              articleListRecomendationQuery.isFetching
                ? articleListPlaceholderData
                : articleListRecomendationQuery.data?.data || []
            }
            renderItem={({ item }) =>
              articleListRecomendationQuery.isFetching ? (
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

        <SectionWrapper title="Explore Pariwisata">
          <FlatList
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            data={
              articleListQuery.isFetching
                ? articleListPlaceholderData
                : articleListQuery.data?.data || []
            }
            renderItem={({ item, index }) =>
              articleListQuery.isFetching ? (
                <ArticleItemPlaceholder />
              ) : (
                <ArticleItem
                  style={{
                    marginHorizontal:
                      articleListQuery.data?.data.length === index + 1
                        ? 20
                        : "auto",
                  }}
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
