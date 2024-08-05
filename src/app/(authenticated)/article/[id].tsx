import { useEffect } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";

import { Appbar, Snackbar, Typography, View } from "@/components";
import { useAppTheme } from "@/context/theme-context";
import { useGetArticleDetail } from "@/features/article/api/useGetArticleDetail";

export default function ArticleDetailScreen() {
  const router = useRouter();
  const { Colors } = useAppTheme();
  const params = useLocalSearchParams<{ id: string }>();

  const articleDetailQuery = useGetArticleDetail(params?.id);

  useEffect(() => {
    if (!params.id || articleDetailQuery.error) {
      Snackbar.show({ message: "Terjadi kesalahan", variant: "danger" });
      router.back();
    }
  }, [params.id, articleDetailQuery.error, router]);

  if (!params.id || articleDetailQuery.error) return null;

  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar backIconPress={() => router.back()} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={style.scrollContainer}
      >
        {articleDetailQuery.isFetching ? (
          <ArticlePlaceholder />
        ) : (
          <>
            <View style={style.center}>
              <Typography fontFamily="Poppins-Bold" fontSize={14}>
                {articleDetailQuery.data?.data.judul}
              </Typography>
            </View>
            <Image
              source={{
                uri: articleDetailQuery.data?.data.image_url,
              }}
              style={[
                style.articleImage,
                { backgroundColor: Colors.outlineborder },
              ]}
            />

            <RenderHTML
              systemFonts={[...defaultSystemFonts, "Poppins-Regular"]}
              contentWidth={Dimensions.get("screen").width - 48}
              source={{
                html: articleDetailQuery.data?.data.konten || "",
              }}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}

function ArticlePlaceholder() {
  const { Colors } = useAppTheme();

  return (
    <View style={{ gap: 34 }}>
      <View style={style.center}>
        <Placeholder width={"75%"} height={20} />
      </View>
      <Image
        style={[style.articleImage, { backgroundColor: Colors.outlineborder }]}
      />
      <View style={{ width: "100%", gap: 12 }}>
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder width={"50%"} />

        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder />
        <Placeholder width={"10%"} />
      </View>
    </View>
  );
}

function Placeholder({ height = 10, width = "100%" }: ViewStyle) {
  return <View backgroundColor="outlineborder" style={[{ height, width }]} />;
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    gap: 33,
  },
  articleImage: {
    width: "100%",
    height: 204,
    resizeMode: "cover",
  },
  center: {
    alignItems: "center",
  },
});
