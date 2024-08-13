import React from "react";
import {
  ImageSourcePropType,
  Pressable,
  PressableProps,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import { useAppTheme } from "@/context/theme-context";

import { Button } from "../button/Button";
import { IconCar, IconGasPump, IconGitBranch, IconSeat } from "../icons";
import { Typography } from "../typography/Typography";

export type RentaCardlItemProps = {
  //   imgSource: ImageSourcePropType;
  //   title: string;
  //   subtitle: string;
  //   price: string;
  //   badgePromo?: boolean;
} & PressableProps;
export default function RentaCardlItem(props: RentaCardlItemProps) {
  const { ...rest } = props;
  const router = useRouter();

  const { Colors } = useAppTheme();

  const handleOnDetailRentalCard = () => {
    router.push("/rental/detail/1");
  };

  return (
    <Pressable {...rest}>
      {({ pressed }) => (
        <View
          style={{
            width: "100%",
            height: 450,
            overflow: "hidden",
            backgroundColor: Colors.paper,
            borderRadius: 20,
            borderWidth: 0.5,
            borderColor: Colors.outlineborder,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
            elevation: 1,
          }}
        >
          <View
            style={{ backgroundColor: "blue", width: "100%", height: "40%" }}
          ></View>
          <View
            style={{
              padding: 20,
            }}
          >
            <Typography fontFamily="Poppins-Bold" fontSize={18}>
              Toyota Hiace Premio
            </Typography>
            <Typography
              fontFamily="Poppins-Regular"
              fontSize={12}
              color="textsecondary"
              style={{ textAlign: "justify", marginBottom: 10 }}
            >
              Rama Trans menyediakan mobil rental dengan layanan prima, armada
              berkualitas, harga kompetitif, serta kenyamanan dan keamanan
              perjalanan yang terjamin.
            </Typography>
            {/* group spesifikasi */}
            <View
              style={{
                flexDirection: "row",
                gap: 40,
                marginBottom: 15,
              }}
            >
              {/* left */}
              <View style={{ flexDirection: "column", gap: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <IconCar width={24} height={24} color="main" />
                  <Typography
                    fontFamily="Poppins-Regular"
                    color="textsecondary"
                    fontSize={14}
                  >
                    Heatback
                  </Typography>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <IconGasPump width={24} height={24} color="main" />
                  <Typography
                    fontFamily="Poppins-Regular"
                    color="textsecondary"
                    fontSize={14}
                  >
                    Diesel
                  </Typography>
                </View>
              </View>
              {/* right */}
              <View style={{ flexDirection: "column", gap: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <IconSeat width={24} height={24} color="main" />
                  <Typography
                    fontFamily="Poppins-Regular"
                    color="textsecondary"
                    fontSize={14}
                  >
                    16 Kursi
                  </Typography>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <IconGitBranch width={24} height={24} color="main" />
                  <Typography
                    fontFamily="Poppins-Regular"
                    color="textsecondary"
                    fontSize={14}
                  >
                    Manual
                  </Typography>
                </View>
              </View>
            </View>
            {/* ./group spesifikasi */}
            <Button
              style={{ marginTop: "auto" }}
              onPress={handleOnDetailRentalCard}
            >
              Rental Mobil Sekarang
            </Button>
          </View>
        </View>
      )}
    </Pressable>
  );
}
