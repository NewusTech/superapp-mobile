/* eslint-disable simple-import-sort/imports */
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Appbar, Typography } from "@/components";

const ViewPdf = () => {
  const router = useRouter();

  const params = useLocalSearchParams<{ link: string | any; title: string }>();
  console.log("url", params?.link);

  if (!params.link) return;

  return (
    <View style={styles.container}>
      <Appbar
        backIconPress={() => router.back()}
        title={
          <Typography
            fontFamily={"Poppins-Bold"}
            fontSize={16}
            color={"textprimary"}
            style={{
              textAlign: "left",
              width: "100%",
            }}
          >
            {params.title}
          </Typography>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default ViewPdf;
