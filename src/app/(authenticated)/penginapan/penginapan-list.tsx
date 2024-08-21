import { useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { Appbar, Tab, Typography, View } from "@/components";
import PenginapanCard from "@/components/penginapan/PenginapanCard";
import { useAppTheme } from "@/context/theme-context";

export default function PenginapanList() {
  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState("Apartemen");

  const { Colors } = useAppTheme();

  const penginapanTipeList = [
    {
      title: "Apartemen",
    },
    {
      title: "Rumah",
    },
  ];

  return (
    <ScrollView style={{ backgroundColor: Colors.paper }}>
      <Appbar
        title={"Penginapan"}
        backgroundColor="paper"
        backIconPress={() => router.back()}
      />
      <View style={styles.container} backgroundColor="paper">
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Typography fontFamily="Poppins-Medium" fontSize={16}>
            Menginap dengan Nyaman
          </Typography>
          <Image source={require("@/assets/images/sleeping.png")} />
        </View>
        <Typography
          fontFamily="Poppins-Regular"
          fontSize={12}
          color="textsecondary"
        >
          Yuk temukan tempat istirahat yang sempurna untuk Anda!
        </Typography>
        <View style={styles.tabContainer}>
          <Tab
            tabs={[
              ...penginapanTipeList.map((b) => {
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
        <View style={{ marginVertical: 5 }} />
        <PenginapanCard
          onPress={() => router.navigate("/penginapan/detail-penginapan")}
        />
        <View style={{ marginVertical: 5 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tabContainer: {
    marginTop: 10,
  },
});
