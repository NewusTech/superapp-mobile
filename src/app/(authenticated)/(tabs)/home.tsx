import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  PanResponder,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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
} from "@/features/article/components";
import { HotelItem } from "@/features/article/components/hotel-item/HotelItem";
import {
  RuteItem,
  RuteItemEmpty,
} from "@/features/article/components/rute-item/RuteItem";
import { useAuthProfile } from "@/features/auth/store/auth-store";
import { useGetPariwisata } from "@/features/pariwisata/api/useGetPariwisata";
import { useGetTravelBranch } from "@/features/travel/api/useGetTravelBranch";
import { useGetTravelRute } from "@/features/travel/api/useGetTravelRutes";
import { useTravelActions } from "@/features/travel/store/travel-store";
import { formatCurrency } from "@/utils/common";
import { useRoute } from "@react-navigation/native";

import { PromoItemList } from "../travel/booking-travel";

// export const pariwisataListQueryData = [
//   {
//     slug: "pantai-rio-beach",
//     judul: "Pantai Rio Beach",
//     lokasi: "Kalianda",
//     sub_judul: "Snorkling & Explore",
//     rating: 5,
//     konten: "<p> lorem ipsum dolor sit amet. </p>",
//     image_url:
//       "https://akcdn.detik.net.id/community/media/visual/2024/06/22/pantai-rio-by-the-beach_169.jpeg",
//     id: 1,
//   },
//   {
//     slug: "tegal-mas-island",
//     judul: "Tegal Mas Island",
//     lokasi: "Pesawaran",
//     sub_judul: "Snorkling & Explore",
//     rating: 4,
//     konten: "<p> lorem ipsum dolor sit amet. </p>",
//     image_url:
//       "https://liborantrip.com/wp-content/uploads/2021/01/WhatsApp-Image-2021-01-01-at-10.21.57-1.jpeg",
//     id: 2,
//   },
//   {
//     slug: "pantai-rio-beach",
//     judul: "Pantai Rio Beach",
//     lokasi: "Kalianda",
//     sub_judul: "Snorkling & Explore",
//     rating: 5,
//     konten: "<p> lorem ipsum dolor sit amet. </p>",
//     image_url:
//       "https://akcdn.detik.net.id/community/media/visual/2024/06/22/pantai-rio-by-the-beach_169.jpeg",
//     id: 3,
//   },
//   {
//     slug: "tegal-mas-island",
//     judul: "Tegal Mas Island",
//     lokasi: "Pesawaran",
//     sub_judul: "Snorkling & Explore",
//     rating: 4,
//     konten: "<p> lorem ipsum dolor sit amet. </p>",
//     image_url:
//       "https://liborantrip.com/wp-content/uploads/2021/01/WhatsApp-Image-2021-01-01-at-10.21.57-1.jpeg",
//     id: 4,
//   },
// ];

export default function HomeTabScreen() {
  const router = useRouter();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const scrollViewRef = useRef(null);
  const haightHeaderContent = Dimensions.get("window").height / 2.3;

  const userProfile = useAuthProfile();

  const getPariwisataQuery = useGetPariwisata();

  const ruteListQuery = useGetTravelRute();

  const travelBranchQuery = useGetTravelBranch();

  const { setBookingPayload } = useTravelActions();

  const [activeFilter, setActiveFilter] = useState("Lampung");

  const [scollViewEnable, setScollViewEnable] = useState(false);

  const switchImg = (kota: string) => {
    switch (kota) {
      case "lampung":
        return "https://upload.wikimedia.org/wikipedia/id/thumb/9/9e/Tugu_Adipura_%28Tugu_Gajah%29_Bandar_Lampung.JPG/640px-Tugu_Adipura_%28Tugu_Gajah%29_Bandar_Lampung.JPG";

      case "palembang":
        return "https://investasiproperti.id/wp-content/uploads/2023/06/jembatan-ampera-di-palembang-800x503.jpg";

      case "jakarta":
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKGttJIb19rPnSrEA8WeZM45k8yUJugVJDOw&s";

      case "bogor":
        return "https://bobobox.com/blog/wp-content//uploads/2023/09/julukan-kota-bogor.webp";

      case "karawang":
        return "https://awsimages.detik.net.id/community/media/visual/2023/10/05/tugu-padi-icon-perkotaan-karawang_169.jpeg?w=600&q=90";

      case "cikarang":
        return "https://cdn.idntimes.com/content-images/post/20230131/2020-02-18-7e57646b7de3972a21d81f2a1b79e41a_600x400.jpg";

      case "cileungsi":
        return "https://rumahsaya.bca.co.id/media/rumahsaya/Images/Web/c998ab73-255b-ef11-910e-005056aa44b9";

      case "cibinong":
        return "https://cdn.antaranews.com/cache/1200x800/2021/12/24/IMG_20211224_183657_1.jpg";

      case "daya murni":
        return "https://awsimages.detik.net.id/community/media/visual/2023/10/05/tugu-padi-icon-perkotaan-karawang_169.jpeg?w=600&q=90";

      case "depok":
        return "https://asset.kompas.com/crops/_NRrco8g6CTluqwWLyguXb4SRhg=/98x0:944x564/750x500/data/photo/2021/12/02/61a8d64decf69.jpg";

      default:
        return "https://www.djkn.kemenkeu.go.id/files/images/2020/08/gerbang_kota_metro.jpg";
    }
  };

  const branchList = useMemo(() => {
    if (!travelBranchQuery.data) return [];
    return travelBranchQuery.data?.data.map((item) => ({
      title: item.nama,
    }));
  }, [travelBranchQuery.data]);

  const ruteListQueryFilter = ruteListQuery.data?.data
    .filter((data) => data.kota_asal === activeFilter)
    .map((data) => ({
      ...data,
      img: switchImg(data.kota_asal.toLowerCase()),
    }));

  const handleRefresh = useCallback(() => {
    getPariwisataQuery.refetch();
  }, [getPariwisataQuery]);

  useEffect(() => {
    // handleRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ScrollView
        style={{ flexGrow: 1, backgroundColor: Colors.paper }}
        refreshControl={
          <RefreshControl
            refreshing={getPariwisataQuery.isRefetching}
            onRefresh={handleRefresh}
            progressViewOffset={20}
          />
        }
      >
        <View style={[styles.headerContainer, { height: "100%" }]}>
          <ImageBackground
            source={require("@/assets/images/hear_banner_home.png")}
            style={[
              styles.headerWrapper,
              {
                paddingTop: insets.top + 20,
                height: haightHeaderContent,
                gap: 10,
                paddingBottom: 40,
                justifyContent: "center",
              },
            ]}
          >
            <SearchBox placeholder="Cari disini..." />

            <View
              style={{
                backgroundColor: "rgba(255,255,255,0.8)",
                width: Dimensions.get("window").width - 50,
                height: 150,
                marginTop: 20,
                borderRadius: 20,
                overflow: "hidden",
                paddingHorizontal: 20,
                marginHorizontal: "auto",
              }}
            >
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
                  onPress={() => router.push("/package/new-package-screen")}
                />
                <RoundedButton
                  label="Rental"
                  icon={<IconCarSide width={24} height={24} color="paper" />}
                  iconColor="dangerbase"
                  onPress={() => router.push("/rental/rental-car-lists")}
                />
                <RoundedButton
                  label="Penginapan"
                  icon={<IconBuilding width={24} height={24} color="paper" />}
                  iconColor="quarternary"
                  onPress={() => router.push("/penginapan/penginapan-list")}
                />
              </View>
            </View>
          </ImageBackground>
          <View
            style={{
              backgroundColor: Colors.paper,
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
              paddingTop: 20,
              top: -35,
              position: "relative",
              width: "100%",
            }}
          >
            <View style={{}}>
              <View
                style={{
                  paddingLeft: 20,
                  marginBottom: 10,
                  flexDirection: "column",
                }}
              >
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Image source={require("@/assets/images/map1.png")} />
                  <Typography fontFamily="Poppins-Bold" fontSize={16}>
                    Rute
                  </Typography>
                </View>
                <Typography
                  fontFamily="Poppins-Regular"
                  fontSize={12}
                  color="textsecondary"
                >
                  Nikmati Rute Perjalanan Kami dari Jakarta ke Bandar Lampung
                  dan Palembang.
                </Typography>
              </View>
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
                data={ruteListQueryFilter}
                renderItem={({ item, index }) =>
                  ruteListQuery.isFetching ? (
                    <ArticleItemPlaceholder />
                  ) : (
                    <RuteItem
                      badgePromo
                      width={Dimensions.get("window").width / 2.3}
                      imgSource={{
                        uri: item.img,
                      }}
                      title={`${item.kota_asal} - ${item.kota_tujuan}`}
                      price={formatCurrency(item.harga)}
                      onPress={() => {
                        setBookingPayload({
                          date: new Date(),
                          from: item.kota_asal,
                          to: item.kota_tujuan,
                          seats: 1,
                        });
                        router.push("/travel/booking-travel");
                      }}
                    />
                  )
                }
                style={{ width: "100%" }}
                ListEmptyComponent={() => <RuteItemEmpty />}
                contentContainerStyle={styles.listArticleContainer}
                snapToStart
                decelerationRate={"normal"}
                snapToInterval={Dimensions.get("window").width / 2.3 + 19}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  paddingLeft: 20,
                  marginBottom: 10,
                  flexDirection: "column",
                }}
              >
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Typography fontFamily="Poppins-Bold" fontSize={16}>
                    Jelajahi Wisata Bersama Kami
                  </Typography>
                  <Image
                    source={require("@/assets/images/emoticon_star.png")}
                  />
                </View>
                <Typography
                  fontFamily="Poppins-Regular"
                  fontSize={12}
                  color="textsecondary"
                >
                  Nikmati Perjalanan dengan Kami ke berabagai wisata pilihan
                  anda.
                </Typography>
              </View>
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
                data={getPariwisataQuery.data?.data}
                renderItem={({ item, index }) =>
                  getPariwisataQuery.isFetching ? (
                    <ArticleItemPlaceholder />
                  ) : (
                    <ArticleItem
                      width={Dimensions.get("window").width / 2.3 + index}
                      badgeLocation={item.lokasi}
                      imgSource={{ uri: item.image_url }}
                      title={item.judul}
                      subtitle={item.konten}
                      rating={item.rating}
                      onPress={() =>
                        router.push({
                          pathname: "/wisata/" + item.slug,
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
                snapToInterval={Dimensions.get("window").width / 2.3 + 19}
              />
            </View>
            <View style={{ marginTop: 10, paddingLeft: 20 }}>
              <View
                style={{
                  marginBottom: 10,
                  flexDirection: "column",
                }}
              >
                <View
                  style={{ flexDirection: "row", gap: 10, paddingRight: 20 }}
                >
                  <Typography fontFamily="Poppins-Bold" fontSize={16}>
                    Temukan Penginapan Ideal Bersama Kami!{" "}
                    <Image source={require("@/assets/images/bedroom.png")} />
                  </Typography>
                </View>
                <Typography
                  fontFamily="Poppins-Regular"
                  fontSize={12}
                  color="textsecondary"
                >
                  Nikmati Pengalaman Menginap yang Tak Terlupakan di Berbagai
                  Lokasi Pilihan.
                </Typography>
              </View>
              <HotelItem
                badge="Apartemen"
                width={Dimensions.get("window").width - 40}
                imgSource={require("@/assets/images/tmp_img.png")}
                location="Bogor, Jawa Barat"
                rating={4.5}
                star={5}
                title="Podomoro Golf View "
                onPress={() => router.navigate("/penginapan/penginapan-list")}
              />
            </View>
            <View
              style={{
                marginBottom: insets.bottom,
                marginTop: 20,
                marginHorizontal: 20,
                gap: 10,
              }}
            >
              <Typography fontFamily="Poppins-Bold" fontSize={16}>
                Berbagai promo menarik dari kami..
              </Typography>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={PromoItemList}
                renderItem={({ item }) => (
                  <PromoItem
                    imgUrl={item.imgUrl}
                    width={326}
                    borderRadius={20}
                  />
                )}
                style={{ width: "100%" }}
                ListEmptyComponent={() => <ArticleEmpty />}
                snapToStart
                decelerationRate={"normal"}
                snapToInterval={336}
                contentContainerStyle={{ gap: 10 }}
              />
            </View>
          </View>
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
    // marginBottom: 43,
  },
  contentGreetingWrapper: {
    paddingTop: 25,
    paddingHorizontal: 15,
    gap: 20,
  },
  actionButtonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
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
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
