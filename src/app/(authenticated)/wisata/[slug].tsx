import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { RentalCarData } from "@/apis/internal.api.type";
import { Loader, Typography, View } from "@/components";
import { IconChevronLeft } from "@/components/icons";
import RentaCardlItem from "@/components/rental/RentaCardlItem";
import { useAppTheme } from "@/context/theme-context";
import { useGetPariwisataSlugQuery } from "@/features/pariwisata/api/useGetPariwisataSlugQuery";
import { useGetRentalCarQuery } from "@/features/rental/api/useGetRentalCarQuery";
import { useRentActions } from "@/features/rental/store/rental-store";

export default function DetailWisata() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const params = useLocalSearchParams<{ slug: string }>();

  const { Colors } = useAppTheme();

  const { setRentalCarData } = useRentActions();

  const rentalCarQuery = useGetRentalCarQuery();

  const detailPariwisataQuery = useGetPariwisataSlugQuery(params.slug);

  const handleRentCar = (data: RentalCarData) => {
    setRentalCarData(data);
    router.push(`/rental/detail/${data.id}`);
  };

  const nikmatiPerjalanan = [
    {
      title: "Layanan kelas satu",
      image: require("@/assets/images/trophy.png"),
      desk: "Di mana kemewahan bertemu dengan perawatan luar biasa, menciptakan momen tak terlupakan dan melampaui semua harapan Anda.",
    },
    {
      title: "Stay Pergi 24 Jam",
      image: require("@/assets/images/traffic-light.png"),
      desk: "Dukungan yang andal saat Anda sangat membutuhkannya, membuat Anda tetap tenang dan percaya diri saat bepergian.",
    },
    {
      title: "Kualitas Terbaik",
      image: require("@/assets/images/best-price.png"),
      desk: "Membuka kecemerlangan yang terjangkau dengan meningkatkan kualitas sambil meminimalkan biaya untuk nilai maksimal",
    },
    {
      title: "Pengantaran Gratis",
      image: require("@/assets/images/driver.png"),
      desk: "Nikmati layanan penjemputan gratis, yang akan menambah kemudahan dalam pengalaman sewa mobil Anda.",
    },
  ];

  return (
    <View backgroundColor="paper" style={style.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          style.scrollContainer,
          { paddingBottom: insets.bottom + 50 },
        ]}
      >
        <View
          style={{
            position: "absolute",
            zIndex: 2,
            width: "100%",
            height: 40,
            padding: 10,
            top: insets.top + 5,
            left: insets.left + 5,
          }}
        >
          <Pressable
            style={{
              backgroundColor: "white",
              width: 26,
              height: 26,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => router.back()}
          >
            <IconChevronLeft height={21} width={21} />
          </Pressable>
        </View>
        <Image
          source={{ uri: detailPariwisataQuery.data?.data.image_url || "" }}
          style={{ width: "100%", height: 320 }}
        />
        <View
          style={{ paddingHorizontal: 25, flexDirection: "column", gap: 15 }}
        >
          <Typography
            style={{
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderColor: Colors.textsecondary,
            }}
            fontFamily="OpenSans-Semibold"
            fontSize={18}
            numberOfLines={1}
          >
            {detailPariwisataQuery.data?.data.judul}
          </Typography>
          <RenderHTML
            systemFonts={[...defaultSystemFonts, "Poppins-Regular"]}
            contentWidth={Dimensions.get("screen").width - 48}
            source={{
              html: detailPariwisataQuery.data?.data.konten || "",
            }}
          />
          {/*  */}
          <Typography
            style={{
              paddingBottom: 10,
            }}
            fontFamily="OpenSans-Semibold"
            fontSize={18}
            numberOfLines={3}
          >
            Nikmati Perjalanan Anda dengan Armada Kami
          </Typography>
          {nikmatiPerjalanan.map((data) => (
            <View style={{ flexDirection: "column", gap: 5 }}>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Image source={data.image} style={{ width: 24, height: 24 }} />
                <Typography
                  fontFamily="OpenSans-Semibold"
                  fontSize={16}
                  numberOfLines={1}
                >
                  {data.title}
                </Typography>
              </View>
              <Typography
                style={{}}
                fontFamily="OpenSans-Regular"
                fontSize={14}
                color="textsecondary"
              >
                {data.desk}
              </Typography>
            </View>
          ))}
        </View>
        <FlatList
          scrollEnabled={true}
          horizontal
          data={rentalCarQuery.data?.data}
          renderItem={({ item }) => {
            return (
              <RentaCardlItem
                width={Dimensions.get("window").width - 70}
                type={item.type}
                bagasi={item.bagasi}
                bahan_bakar={item.jumlah_kursi}
                jumlah_kursi={item.jumlah_kursi}
                transmisi={item.transmisi}
                deskripsi={item.deskripsi}
                handleOnDetailRentalCard={() => handleRentCar(item)}
              />
            );
          }}
          ListEmptyComponent={() => (
            <View style={style.emptyScheduleContainer}>
              {rentalCarQuery.isFetching ? (
                <Loader />
              ) : (
                <Typography fontFamily="Poppins-Medium">
                  Tidak mobil yang Direntalkan
                </Typography>
              )}
            </View>
          )}
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            gap: 16,
            padding: 20,
            paddingTop: 10,
            paddingBottom: insets.bottom + 20,
          }}
          snapToStart
          decelerationRate={"normal"}
          snapToInterval={Dimensions.get("window").width}
        />
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    gap: 33,
    width: "100%",
  },
  articleImage: {
    width: "100%",
    height: 204,
    resizeMode: "cover",
  },
  center: {
    alignItems: "center",
  },
  emptyScheduleContainer: {
    minHeight: 400,
    justifyContent: "center",
    alignItems: "center",
  },
});
