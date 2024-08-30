import React from "react";
import {
  Image,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
} from "react-native";

import { useAppTheme } from "@/context/theme-context";

import { Button } from "../button/Button";
import { IconCar, IconGasPump, IconGitBranch, IconSeat } from "../icons";
import { Typography } from "../typography/Typography";

export type RentaCardlItemProps = {
  handleOnDetailRentalCard: () => void;
  type: string;
  bahan_bakar: string;
  jumlah_kursi: string;
  transmisi: string;
  bagasi: string;
  deskripsi: string;
  width?: any;
} & PressableProps;
export default function RentaCardlItem(props: RentaCardlItemProps) {
  const {
    id,
    type,
    bahan_bakar,
    jumlah_kursi,
    transmisi,
    bagasi,
    deskripsi,
    disabled,
    handleOnDetailRentalCard,
    width,
    ...rest
  } = props;

  const { Colors } = useAppTheme();

  return (
    <Pressable {...rest} onPress={handleOnDetailRentalCard}>
      {({ pressed }) => (
        <View
          style={{
            width: width ?? "100%",
            height: 500,
            overflow: "hidden",
            backgroundColor: Colors.paper,
            borderRadius: 20,
            borderWidth: 0.5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
            elevation: 1,
            borderColor:
              pressed && !disabled ? Colors.badgeMain : Colors.outlineborder,
          }}
        >
          {pressed && !disabled && (
            <View
              style={[
                style.container,
                style.mask,
                {
                  borderWidth: 0,
                  backgroundColor: Colors.textsecondary,
                },
              ]}
            />
          )}
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Typography
                fontFamily="Poppins-Bold"
                fontSize={18}
                style={{ textAlignVertical: "center" }}
              >
                {type}
              </Typography>
              <Typography
                fontSize={12}
                style={{
                  backgroundColor: "#F8D36B",
                  color: "#BF4F3F",
                  padding: 9,
                  borderRadius: 10,
                }}
              >
                2 Mobil Tersedia
              </Typography>
            </View>
            <Typography
              fontFamily="Poppins-Regular"
              fontSize={12}
              color="textsecondary"
              style={{ textAlign: "justify", marginBottom: 10 }}
            >
              {deskripsi}
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
                    {bahan_bakar}
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
                    {jumlah_kursi} Kursi
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

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 20,
    gap: 10,
  },
  mask: {
    width: "100%",
    height: "100%",
    zIndex: 2,
    opacity: 0.15,
    position: "absolute",
    top: 0,
    left: 0,
  },
});
