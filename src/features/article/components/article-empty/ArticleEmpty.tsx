import { StyleSheet } from "react-native";

import { Typography, View } from "@/components";

export function ArticleEmpty() {
  return (
    <View backgroundColor="outlineborder" style={styles.container}>
      <Typography fontFamily="Poppins-Regular">Belum ada artikel</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
