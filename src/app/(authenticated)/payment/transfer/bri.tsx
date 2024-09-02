import React, { useRef } from "react";
import {
  Animated,
  Clipboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, Typography, View } from "@/components";
import { Card } from "@/components/card/Card";
import { IconChevronDown } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";

export default function TransferBri() {
  const params = useLocalSearchParams<{
    no_rek: string;
  }>();
  const { Colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const panAtm = useRef(new Animated.Value(0)).current;

  //   const handleOnpenAtm = () => {
  //     if (openKeunggulan) {
  //       Animated.timing(panKeunggulan, {
  //         toValue: 0,
  //         duration: 150,
  //         useNativeDriver: false,
  //       }).start();
  //       setOpenKeunggulan(false);
  //     } else {
  //       setOpenKeunggulan(true);
  //       Animated.timing(panKeunggulan, {
  //         toValue: 400,
  //         duration: 150,
  //         useNativeDriver: false,
  //       }).start();
  //     }
  //   };

  const handleCopyToClipBoard = () => {
    Clipboard.setString(params.no_rek);
  };
  return (
    <View
      backgroundColor="paper"
      style={{ flex: 1, backgroundColor: Colors.paper }}
    >
      <Appbar
        title={"Transfer BRI"}
        backgroundColor="paper"
        backIconPress={() => router.back()}
      />
      <ScrollView
        contentContainerStyle={{
          flexDirection: "column",
          paddingHorizontal: 20,
          width: "100%",
          paddingVertical: 20,
          gap: 15,
        }}
      >
        <Card style={{ width: "100%" }} disabled>
          <View
            style={{ paddingHorizontal: 20, flexDirection: "column", gap: 5 }}
          >
            <Typography
              fontFamily="OpenSans-Semibold"
              fontSize={16}
              style={{
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderColor: Colors.outlineborder,
              }}
            >
              Bank Transfer BRI
            </Typography>
            <Typography style={{ marginTop: 10 }}>No. rekening</Typography>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Typography
                fontFamily="OpenSans-Semibold"
                color="main"
                fontSize={21}
                style={{}}
              >
                {params.no_rek}
              </Typography>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={handleCopyToClipBoard}
              >
                <Typography
                  color="secondary"
                  fontFamily="OpenSans-Semibold"
                  fontSize={16}
                  style={{ textAlignVertical: "center" }}
                >
                  Salin
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
        {/* cara bayar via atm */}
        <Card style={{ width: "100%" }} disabled>
          <View
            style={{ paddingHorizontal: 20, flexDirection: "column", gap: 5 }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Typography fontFamily="OpenSans-Semibold" fontSize={14}>
                Cara Bayar via ATM
              </Typography>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconChevronDown width={18} height={18} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
