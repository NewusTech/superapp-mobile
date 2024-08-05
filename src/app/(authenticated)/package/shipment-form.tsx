import { useEffect } from "react";
import { FlatList, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Appbar,
  SectionWrapper,
  Separator,
  TextInputV2,
  Typography,
  View,
} from "@/components";
import {
  IconArrowRight,
  IconPackageExport,
  IconPackageImport,
  IconSwap,
} from "@/components/icons";
import { PromoItem } from "@/components/promo-item/PromoItem";
import { useAppTheme } from "@/context/theme-context";
import { ArticleEmpty } from "@/features/article/components";
import {
  usePackageActions,
  usePackageOrderPayload,
} from "@/features/package/stores/package-store";

import { PromoItemList } from "../travel/booking-travel";

export default function PackageShipmentFormScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { Colors } = useAppTheme();

  // store
  const packageOrderPayload = usePackageOrderPayload();
  const { setPackageOrderPayload } = usePackageActions();

  useEffect(() => {
    setPackageOrderPayload(undefined);
  }, [setPackageOrderPayload]);

  return (
    <View backgroundColor="paper" style={styles.container}>
      <View
        backgroundColor="main"
        style={[styles.headerBack, { height: insets.top + 106 }]}
      />

      <Appbar
        variant="light"
        title="Paket"
        backgroundColor="transparent"
        hasBorder={false}
        colorSheme="dark"
        backIconPress={() => router.back()}
      />

      <View
        backgroundColor="paper"
        style={[styles.shipmentBox, { borderColor: Colors.outlineborder }]}
      >
        <Typography fontFamily="Poppins-Medium" fontSize={16}>
          Mau kirim paket kemana?
        </Typography>

        <View
          style={[styles.destinationBox, { borderColor: Colors.outlineborder }]}
        >
          <TextInputV2
            placeholder="Lampung"
            leadingIcon={
              <View>
                <Typography fontFamily="OpenSans-Regular" fontSize={10}>
                  Dari
                </Typography>
                <IconPackageImport width={20} height={20} color="main" />
              </View>
            }
            value={packageOrderPayload?.from?.location?.nama}
            withBorder={false}
            asTouchable
            onTouchablePress={() =>
              router.push({
                pathname: "/package/search-place/[type]",
                params: {
                  type: "from",
                },
              })
            }
          />
          <Separator />
          <TextInputV2
            placeholder="Palembang"
            leadingIcon={
              <View>
                <Typography fontFamily="OpenSans-Regular" fontSize={10}>
                  Ke
                </Typography>
                <IconPackageExport width={20} height={20} color="main" />
              </View>
            }
            value={packageOrderPayload?.to?.location?.nama}
            withBorder={false}
            asTouchable
            onTouchablePress={() =>
              router.push({
                pathname: "/package/search-place/[type]",
                params: {
                  type: "to",
                },
              })
            }
          />

          <View backgroundColor="main" style={styles.destinationIconSwap}>
            <IconSwap width={20} height={20} color="paper" />
          </View>
        </View>
      </View>

      <SectionWrapper
        title="Langkah mudah untuk kirim paket"
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
          data={PromoItemList}
          renderItem={({ item }) => <PromoItem imgUrl={item.imgUrl} />}
          style={{ width: "100%" }}
          ListEmptyComponent={() => <ArticleEmpty />}
          contentContainerStyle={styles.listArticleContainer}
        />
      </SectionWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBack: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    position: "absolute",
    top: 0,
    width: "100%",
  },

  shipmentBox: {
    margin: 24,
    marginTop: 16,
    marginBottom: 32,
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderRadius: 2,
  },
  destinationBox: {
    borderWidth: 1,
    borderRadius: 2,
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
});
