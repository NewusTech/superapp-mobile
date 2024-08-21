import { useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";

import {
  IconBathroom,
  IconBedroom,
  IconCookingPort,
  IconFamilyRoom,
  IconSmartAC,
} from "../icons";
import ModalSwipe from "../modal/ModalSwipe";
import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export default function PartialFasilitas() {
  const [modalFasilitas, setModalFasilitas] = useState(false);

  return (
    <View>
      <View style={{ paddingHorizontal: 20, gap: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            fontFamily="OpenSans-Bold"
            fontSize={16}
            numberOfLines={1}
          >
            Fasilitas
          </Typography>
          <TouchableOpacity style={{}} onPress={() => setModalFasilitas(true)}>
            <Typography
              fontFamily="Poppins-Medium"
              fontSize={12}
              color="main"
              style={{ textAlignVertical: "bottom" }}
            >
              Lihat Semua
            </Typography>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              justifyContent: "space-between",
            }}
          >
            <IconSmartAC color="quarternary" />
            <Typography
              fontFamily="OpenSans-Regular"
              fontSize={12}
              numberOfLines={1}
              color="quarternary"
            >
              AC
            </Typography>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              width: "50%",
            }}
          >
            <IconBathroom color="quarternary" />
            <Typography
              fontFamily="OpenSans-Regular"
              fontSize={12}
              numberOfLines={1}
              color="quarternary"
            >
              Kamar Mandi
            </Typography>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              width: "50%",
            }}
          >
            <IconFamilyRoom color="quarternary" />
            <Typography
              fontFamily="OpenSans-Regular"
              fontSize={12}
              numberOfLines={1}
              color="quarternary"
            >
              Ruang Keluarga
            </Typography>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              width: "50%",
            }}
          >
            <IconCookingPort color="quarternary" />
            <Typography
              fontFamily="OpenSans-Regular"
              fontSize={12}
              numberOfLines={1}
              color="quarternary"
            >
              Dapur
            </Typography>
          </View>
        </View>
      </View>
      {/* Modal Fasilitas */}
      <ModalSwipe
        modalVisible={modalFasilitas}
        setModalVisible={setModalFasilitas}
      >
        <View
          style={{
            flexDirection: "column",
            gap: 10,
            height: Dimensions.get("window").height - 300,
          }}
        >
          <Typography
            fontFamily="OpenSans-Bold"
            fontSize={16}
            numberOfLines={1}
          >
            Fasilitas
          </Typography>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              justifyContent: "space-between",
            }}
          >
            <Typography
              fontFamily="OpenSans-Regular"
              fontSize={12}
              numberOfLines={1}
              color="quarternary"
            >
              AC
            </Typography>
            <IconSmartAC color="quarternary" />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              justifyContent: "space-between",
            }}
          >
            <Typography
              fontFamily="OpenSans-Regular"
              fontSize={12}
              numberOfLines={1}
              color="quarternary"
            >
              Kamar Mandi
            </Typography>
            <IconBathroom color="quarternary" />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              justifyContent: "space-between",
            }}
          >
            <Typography
              fontFamily="OpenSans-Regular"
              fontSize={12}
              numberOfLines={1}
              color="quarternary"
            >
              Ruang Keluarga
            </Typography>
            <IconFamilyRoom color="quarternary" />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              justifyContent: "space-between",
            }}
          >
            <Typography
              fontFamily="OpenSans-Regular"
              fontSize={12}
              numberOfLines={1}
              color="quarternary"
            >
              Dapur
            </Typography>
            <IconCookingPort color="quarternary" />
          </View>
        </View>
      </ModalSwipe>
    </View>
  );
}
