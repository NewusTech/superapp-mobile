import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { Appbar, Separator, Typography, View } from "@/components";
import { useAppTheme } from "@/context/theme-context";

export default function DetailPromo() {
  const router = useRouter();

  const { Colors } = useAppTheme();

  const onBackPress = () => {
    router.back();
  };

  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar title="Detail Promo" backIconPress={onBackPress} />
      <ScrollView>
        <View style={style.scrollContainer}>
          <View>
            <Typography
              color="main"
              fontFamily="Poppins-SemiBold"
              fontSize={16}
            >
              Diskon Travel Hingga 30%
            </Typography>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Typography fontFamily="Poppins-Regular">
                Berlaku hingga
              </Typography>
              <Typography fontFamily="Poppins-Regular">14 Juli 2024</Typography>
            </View>
          </View>
          <Separator />
          <Typography fontFamily="Poppins-Bold" fontSize={14}>
            Syarat & Ketentuan
          </Typography>
          <Typography fontFamily="Poppins-Regular" fontSize={12}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem incidunt veniam mollitia architecto qui magnam
            commodi, fugit corrupti minus blanditiis consequatur deserunt
            temporibus quos. Perferendis accusamus repellat maxime cupiditate?
            Ad eum blanditiis ullam ab qui, voluptates molestias sapiente
            adipisci, rerum optio tenetur inventore pariatur? Harum quo maiores
            officia ipsa at placeat minima exercitationem ab necessitatibus? Ad,
            quo quidem. Nostrum ut nihil culpa, iste iusto alias at amet
            adipisci facilis, impedit, eaque libero. Tempora eligendi architecto
            commodi dolorum aspernatur quidem error incidunt in, nihil, velit
            numquam libero totam facere temporibus debitis harum omnis!
            Dignissimos culpa omnis sequi fugiat, quod repudiandae ullam?
          </Typography>
        </View>
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
    padding: 20,
    gap: 10,
    flexDirection: "column",
  },
});
