import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  PressableProps,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import { useAppTheme } from "@/context/theme-context";
import { rentalCarData } from "@/features/rental/store/rental-store";

import { Button } from "../button/Button";
import { IconCar, IconGasPump, IconGitBranch, IconSeat } from "../icons";
import { Typography } from "../typography/Typography";

export type RentaCardlItemProps = {
  handleOnDetailRentalCard: () => void;
} & PressableProps &
  rentalCarData;
export default function RentaCardlItem(props: RentaCardlItemProps) {
  const {
    id,
    title,
    engine,
    seat,
    transmisi,
    bagasi,
    handleOnDetailRentalCard,
    ...rest
  } = props;
  const router = useRouter();

  const { Colors } = useAppTheme();

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
            style={{
              backgroundColor: Colors.paper,
              width: "100%",
              height: "40%",
            }}
          >
            <Image
              source={require("@/assets/images/default_rent_car.png")}
              style={{ objectFit: "contain" }}
            />
          </View>
          <View
            style={{
              padding: 20,
            }}
          >
            <Typography fontFamily="Poppins-Bold" fontSize={18}>
              {title}
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
                    {bagasi}
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
                    {engine}
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
                    {seat} Kursi
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
                    {transmisi}
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
