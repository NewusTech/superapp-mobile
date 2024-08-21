import { useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";

import { IconClock } from "../icons";
import ModalSwipe from "../modal/ModalSwipe";
import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export default function PartialKebijakan() {
  const [modalKebijakan, setModalKebijakan] = useState(false);

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
            Kebijakan
          </Typography>
          <TouchableOpacity style={{}} onPress={() => setModalKebijakan(true)}>
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
        <View style={{ flexDirection: "row", gap: 5 }}>
          <IconClock color="quarternary" />
          <View style={{ flexDirection: "column", gap: 5 }}>
            <Typography
              fontFamily="OpenSans-Bold"
              color="textprimary"
              fontSize={14}
            >
              Waktu Check In dan Check Out
            </Typography>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <Typography
                  fontFamily="OpenSans-Regular"
                  color="textprimary"
                  fontSize={14}
                >
                  Check In
                </Typography>
                <Typography
                  fontFamily="OpenSans-Regular"
                  color="textsecondary"
                  fontSize={14}
                >
                  13 : 00 - 23 : 59
                </Typography>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <Typography
                  fontFamily="OpenSans-Regular"
                  color="textprimary"
                  fontSize={14}
                >
                  Check Out
                </Typography>
                <Typography
                  fontFamily="OpenSans-Regular"
                  color="textsecondary"
                  fontSize={14}
                >
                  12 : 00
                </Typography>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* modal */}
      <ModalSwipe
        modalVisible={modalKebijakan}
        setModalVisible={setModalKebijakan}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            height: Dimensions.get("window").height - 300,
          }}
        >
          <View style={{ flexDirection: "column", gap: 5 }}>
            <Typography
              fontFamily="OpenSans-Bold"
              fontSize={16}
              numberOfLines={1}
            >
              Kebijakan
            </Typography>
            <View style={{ flexDirection: "row", gap: 10, marginVertical: 10 }}>
              <IconClock color="quarternary" />
              <View style={{ flexDirection: "column", gap: 5 }}>
                <Typography
                  fontFamily="OpenSans-Bold"
                  color="textprimary"
                  fontSize={14}
                >
                  Waktu Check In dan Check Out
                </Typography>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      gap: 5,
                    }}
                  >
                    <Typography
                      fontFamily="OpenSans-Regular"
                      color="textprimary"
                      fontSize={14}
                    >
                      Check In
                    </Typography>
                    <Typography
                      fontFamily="OpenSans-Regular"
                      color="textsecondary"
                      fontSize={14}
                    >
                      13 : 00 - 23 : 59
                    </Typography>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      gap: 5,
                    }}
                  >
                    <Typography
                      fontFamily="OpenSans-Regular"
                      color="textprimary"
                      fontSize={14}
                    >
                      Check Out
                    </Typography>
                    <Typography
                      fontFamily="OpenSans-Regular"
                      color="textsecondary"
                      fontSize={14}
                    >
                      12 : 00
                    </Typography>
                  </View>
                </View>
              </View>
            </View>
            <Typography
              fontFamily="OpenSans-Bold"
              color="textprimary"
              fontSize={14}
            >
              Deposit
            </Typography>
            <Typography
              fontFamily="OpenSans-Regular"
              color="textprimary"
              fontSize={14}
            >
              Lorem ipsum dolor sit amet consectetur.
            </Typography>
            <Typography
              fontFamily="OpenSans-Bold"
              color="textprimary"
              fontSize={14}
            >
              Umur
            </Typography>
            <Typography
              fontFamily="OpenSans-Regular"
              color="textprimary"
              fontSize={14}
            >
              Lorem ipsum dolor sit amet consectetur.
            </Typography>
            <Typography
              fontFamily="OpenSans-Bold"
              color="textprimary"
              fontSize={14}
            >
              Hewan Peliharaan
            </Typography>
            <Typography
              fontFamily="OpenSans-Regular"
              color="textprimary"
              fontSize={14}
            >
              Lorem ipsum dolor sit amet consectetur.
            </Typography>
          </View>
        </View>
      </ModalSwipe>
    </View>
  );
}
