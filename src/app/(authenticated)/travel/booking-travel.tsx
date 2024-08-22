import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  ImageProps,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Appbar,
  SectionWrapper,
  Separator,
  Typography,
  View,
} from "@/components";
import { IconChevronDown, IconChevronRight } from "@/components/icons";
import SelectTravelComponent from "@/components/travel/SelectTravelComponent";
import { AppColor } from "@/constants/Colors";
import { useAppTheme } from "@/context/theme-context";
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

  const panKeunggulan = useRef(new Animated.Value(0)).current;
  const [openKeunggulan, setOpenKeunggulan] = useState(false);

  const panKenali = useRef(new Animated.Value(0)).current;
  const [openKenali, setOpenKenali] = useState(false);

  const handleOpenKeunggulan = () => {
    if (openKeunggulan) {
      Animated.timing(panKeunggulan, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
      setOpenKeunggulan(false);
    } else {
      setOpenKeunggulan(true);
      Animated.timing(panKeunggulan, {
        toValue: 400,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };
  const handleOpenKenali = () => {
    if (openKenali) {
      Animated.timing(panKenali, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start();
      setOpenKenali(false);
    } else {
      setOpenKenali(true);
      Animated.timing(panKenali, {
        toValue: 150,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

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
        style={[style.headerBack, { height: insets.top + 170 }]}
      >
        <ImageBackground
          source={require("@/assets/images/header_banner_travel.png")}
          style={style.backgroundImage}
        />
      </View>

      <Appbar
        title={
          <Typography
            style={{
              textAlign: "center",
              width: "100%",
            }}
            fontFamily="Poppins-Medium"
            color="paper"
            fontSize={16}
          >
            Travel
          </Typography>
        }
        backgroundColor="transparent"
        hasBorder={false}
        colorSheme="dark"
        backIconPress={() => router.back()}
        variant="light"
      />
      <View
        style={{
          backgroundColor:
            "linear-gradient(90deg, rgba(7,5,236,1) 0%, rgba(4,3,134,1) 100%)",
          marginHorizontal: 20,
          marginBottom: 40,
          marginTop: 20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          borderBottomRightRadius: 40,
          borderBottomLeftRadius: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 10,
          }}
        >
          <Image source={require("@/assets/images/tickets.png")} />
          <Typography
            fontFamily="Poppins-Medium"
            fontSize={14}
            color="paper"
            style={{ width: "90%" }}
          >
            Pesan Tiket dengan Mudah dan Terjamin Secara Online.
          </Typography>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderWidth: 0.5,
            borderColor: AppColor.light.textsecondary,
            borderRadius: 20,
            // margin: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
            elevation: 1,
            padding: 34,
          }}
        >
          <SelectTravelComponent
            handleAfterSubmit={() => router.push("/travel/available-schedule")}
          />
        </View>
      </View>
      <SectionWrapper title="Langkah mudah untuk memesan travel">
        <TouchableOpacity
          style={{
            flexDirection: "row",
            gap: 5,
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "hidden",
            paddingHorizontal: 20,
            paddingVertical: 5,
          }}
          onPress={() =>
            router.navigate("/travel/partials/persyaratan-perjalanan")
          }
        >
          <Image source={require("@/assets/images/completed-task.png")} />
          <View
            style={{
              flexDirection: "column",
              width: Dimensions.get("window").width / 1.5,
            }}
          >
            <Typography fontFamily="Poppins-Medium" fontSize={14}>
              Cara memesan Travel
            </Typography>
            <Typography
              fontFamily="Poppins-Regular"
              fontSize={12}
              color="textsecondary"
            >
              Mari, cari tau mudahnya memesan tiket Travel di Rama Tranz dengan
              cepat dan nyaman.
            </Typography>
          </View>
          <IconChevronRight />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            gap: 5,
            justifyContent: "space-between",
            alignItems: "center",
            overflow: "hidden",
            paddingHorizontal: 20,
            paddingVertical: 5,
          }}
          onPress={() => router.navigate("/travel/partials/cara-memesan-tiket")}
        >
          <Image source={require("@/assets/images/compliant.png")} />
          <View
            style={{
              flexDirection: "column",
              width: Dimensions.get("window").width / 1.5,
            }}
          >
            <Typography fontFamily="Poppins-Medium" fontSize={14}>
              Persyaratan Perjalanan
            </Typography>
            <Typography
              fontFamily="Poppins-Regular"
              fontSize={12}
              color="textsecondary"
            >
              Check persyaratan yang telah disepakati oleh Rama Tranz untuk
              kenyamanan bersama
            </Typography>
          </View>
          <IconChevronRight />
        </TouchableOpacity>
      </SectionWrapper>
      <Separator style={{ marginVertical: 10 }} />
      <SectionWrapper title="Keunggulan pesan tiket Online di Rama Tranz">
        <View
          style={{
            flexDirection: "column",
            paddingHorizontal: 20,
            paddingVertical: 5,
            gap: 10,
          }}
        >
          <Typography fontFamily="Poppins-Medium" fontSize={14}>
            1. Pesan dari Mana Sana {"\n"}
            <Typography
              fontFamily="Poppins-Regular"
              fontSize={12}
              color="textsecondary"
              style={{ textAlign: "justify" }}
            >
              Anda dapat membeli tiket dari mana saja dan kapan saja, tanpa
              harus mengunjungi loket atau agen perjalanan. Ini memberi Anda
              fleksibilitas untuk merencanakan perjalanan dengan mudah dari
              rumah, kantor, atau bahkan saat bepergian.
            </Typography>
          </Typography>
          <Animated.View style={{ height: panKeunggulan, gap: 10 }}>
            <Typography fontFamily="Poppins-Medium" fontSize={14}>
              2. Pesan dari Mana Sana {"\n"}
              <Typography
                fontFamily="Poppins-Regular"
                fontSize={12}
                color="textsecondary"
                style={{ textAlign: "justify" }}
              >
                Anda dapat membeli tiket dari mana saja dan kapan saja, tanpa
                harus mengunjungi loket atau agen perjalanan. Ini memberi Anda
                fleksibilitas untuk merencanakan perjalanan dengan mudah dari
                rumah, kantor, atau bahkan saat bepergian.
              </Typography>
            </Typography>
            <Typography fontFamily="Poppins-Medium" fontSize={14}>
              3. Harga Murah {"\n"}
              <Typography
                fontFamily="Poppins-Regular"
                fontSize={12}
                color="textsecondary"
                style={{ textAlign: "justify" }}
              >
                Dapatkan tiket dengan harga yang terjangkau tanpa mengorbankan
                kualitas perjalanan. Kami berkomitmen memberikan nilai terbaik
                dengan tarif yang kompetitif, memungkinkan Anda untuk menikmati
                perjalanan yang nyaman dengan biaya yang efisien.
              </Typography>
            </Typography>
            <Typography fontFamily="Poppins-Medium" fontSize={14}>
              4. Layanan Customer Service 24 Jam {"\n"}
              <Typography
                fontFamily="Poppins-Regular"
                fontSize={12}
                color="textsecondary"
                style={{ textAlign: "justify" }}
              >
                Rama Tranz menawarkan layanan customer service 24 jam untuk
                memastikan Anda mendapatkan bantuan kapan saja. Tim kami siap
                menjawab pertanyaan, menangani masalah, dan memberikan solusi
                dengan cepat. Dengan dukungan yang selalu tersedia, Anda dapat
                merasa tenang dan nyaman selama perjalanan, mengetahui bahwa
                bantuan selalu dekat.
              </Typography>
            </Typography>
          </Animated.View>
          <TouchableOpacity
            style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            onPress={handleOpenKeunggulan}
          >
            <Typography fontFamily="Poppins-Medium" fontSize={12} color="main">
              Lihat Selengkapnya
            </Typography>
            <IconChevronDown color="main" />
          </TouchableOpacity>
        </View>
      </SectionWrapper>
      <Separator style={{ marginVertical: 10 }} />
      <SectionWrapper title="Kenali Lebih Jauh Kelas Travel di Rama Tranz">
        <View
          style={{
            flexDirection: "column",
            paddingHorizontal: 20,
            paddingVertical: 5,
            gap: 10,
          }}
        >
          <Typography fontFamily="Poppins-Medium" fontSize={14}>
            1. Toyota Hiace Premio {"\n"}
            <Typography
              fontFamily="Poppins-Regular"
              fontSize={12}
              color="textsecondary"
              style={{ textAlign: "justify" }}
            >
              Kelas ini menawarkan mobil Toyota Hiace Premio yang dirancang
              untuk memberikan kenyamanan maksimal. Dengan ruang yang luas,
              kursi yang nyaman, dan fasilitas premium, Toyota Hiace Premio
              ideal untuk perjalanan panjang atau grup besar yang mengutamakan
              kemewahan dan kualitas.
            </Typography>
          </Typography>
          <Animated.View style={{ height: panKenali, gap: 10 }}>
            <Typography fontFamily="Poppins-Medium" fontSize={14}>
              2. Toyata Hiace Commuter {"\n"}
              <Typography
                fontFamily="Poppins-Regular"
                fontSize={12}
                color="textsecondary"
                style={{ textAlign: "justify" }}
              >
                Untuk pilihan yang lebih ekonomis namun tetap nyaman, Toyota
                Hiace Commuter adalah opsi yang tepat. Kelas ini menyediakan
                ruang yang cukup untuk penumpang dengan fitur yang memadai,
                membuatnya cocok untuk perjalanan sehari-hari atau perjalanan
                jarak menengah dengan efisiensi biaya.
              </Typography>
            </Typography>
          </Animated.View>
          <TouchableOpacity
            style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            onPress={handleOpenKenali}
          >
            <Typography fontFamily="Poppins-Medium" fontSize={12} color="main">
              Lihat Selengkapnya
            </Typography>
            <IconChevronDown color="main" />
          </TouchableOpacity>
        </View>
      </SectionWrapper>
      <View style={{ marginVertical: 20 }} />
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
