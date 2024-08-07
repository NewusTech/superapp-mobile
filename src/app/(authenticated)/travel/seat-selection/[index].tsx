import { useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, Button, Typography, View } from "@/components";
import { IconCIChecklist } from "@/components/icons";
import { AppColorUnion } from "@/constants/Colors";
import { useAppTheme } from "@/context/theme-context";
import { useAuthProfile } from "@/features/auth/store/auth-store";
import { CarSeat10 } from "@/features/travel/components";
import {
  useTravelActions,
  useTravelPassenger,
  useTravelSchedule,
} from "@/features/travel/store/travel-store";

import { PassengerSeat } from "../add-passenger";

export default function SeatSelectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { Colors } = useAppTheme();

  const params = useLocalSearchParams<{
    index: string;
    sheats: string;
    selectAllSheats: string;
  }>();
  const passengerIndex = Number(params.index) || 0;
  const sheats = Number(params.sheats) || 1;
  const selectAllSheats = params.selectAllSheats === "true";

  const [selectedSeats, setSelectedSeat] = useState<string[]>([]);

  const userProfile = useAuthProfile();
  const traveSchedule = useTravelSchedule();
  const passengerList = useTravelPassenger();
  const { setPassenger } = useTravelActions();

  const getSeatTaken = useMemo(() => {
    let seatTakenTemp = traveSchedule?.seatTaken || [];
    passengerList.forEach((passenger, index) => {
      if (index !== passengerIndex) {
        seatTakenTemp = seatTakenTemp.concat(passenger.seat);
      }
    });

    return seatTakenTemp;
  }, [passengerIndex, passengerList, traveSchedule?.seatTaken]);

  const getUserSeatOwner = useMemo(() => {
    if (passengerList?.[passengerIndex]) {
      return `${passengerIndex + 1}. ${passengerList[passengerIndex].name}`;
    }

    return `1. ${userProfile?.nama}`;
  }, [passengerIndex, passengerList, userProfile?.nama]);

  const handleSelectSeat = (seatNumber: string) => {
    const limit = sheats;

    if (selectedSeats.find((seats) => seats === seatNumber)) {
      setSelectedSeat(selectedSeats.filter((seats) => seats !== seatNumber));
    } else {
      if (selectedSeats.length < limit) {
        setSelectedSeat([...selectedSeats, seatNumber]);
      }
    }
  };

  const onProceedNextPage = () => {
    const passengerListTemp: PassengerSeat[] = passengerList;

    if (passengerIndex === 0) {
      passengerListTemp[0] = {
        name: userProfile?.nama || "",
        phoneNumber: userProfile?.no_telp || "",
        seat: selectedSeats,
        nik: "",
        email: "",
      };
    } else if (passengerListTemp?.[passengerIndex]) {
      passengerListTemp[passengerIndex].seat = selectedSeats;
    }

    setPassenger(passengerListTemp);
    router.replace("/travel/order-detail");
  };

  const handleActionBack = () => {
    if (selectAllSheats) {
      return router.back();
    }
    router.replace("/travel/order-detail");
  };

  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar backIconPress={handleActionBack} title="Pilih Kursi" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={style.contentContainer}
      >
        <View
          style={[
            style.userInfoContainer,
            { borderColor: Colors.textsecondary, borderRadius: 10 },
          ]}
        >
          <View style={{ flex: 1, gap: 12 }}>
            <Typography fontFamily="Poppins-Bold" fontSize={16}>
              {selectAllSheats ? "Pilih Kursi" : getUserSeatOwner}
            </Typography>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Typography color="textsecondary">
                {traveSchedule?.carModel}
              </Typography>
              {selectedSeats.length > 0 && (
                <>
                  <View
                    backgroundColor="main"
                    style={{ height: 4, width: 4, borderRadius: 99 }}
                  />
                  <Typography color="textsecondary">
                    {selectedSeats
                      .map((item) => item)
                      .sort((a, b) => parseFloat(a) - parseFloat(b))
                      .join(", ")}
                  </Typography>
                </>
              )}
            </View>
          </View>

          <View
            style={{
              height: 16,
              width: 16,
              borderRadius: 99,
              justifyContent: "center",
              alignItems: "center",
            }}
            backgroundColor="secondary"
          >
            <IconCIChecklist color="paper" size={10} />
          </View>
        </View>

        <View style={style.seatDescriptionContainer}>
          <SeatDescription color="quarternary" label="Terisi" />
          <SeatDescription color="dangerbase" label="Terpilih" />
          <SeatDescription color="main" label="Tersedia" />
        </View>

        <View
          backgroundColor="dangerlight"
          style={[style.informationBanner, { borderRadius: 100 }]}
        >
          <Typography
            fontFamily="OpenSans-Semibold"
            fontSize={10}
            color="dangerbase"
          >
            WAJIB BELI UNTUK ANAK DIATAS USIA 7 TAHUN{" "}
          </Typography>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <CarSeat10
            filled={getSeatTaken}
            selected={selectedSeats.map((item) => item)}
            onSeatPress={handleSelectSeat}
          />
        </View>
      </ScrollView>

      <View
        style={[
          style.bottomActionContainer,
          {
            paddingBottom: insets.bottom + 24,
            borderColor: Colors.outlineborder,
          },
        ]}
      >
        <Button
          disabled={selectedSeats.length <= 0}
          onPress={onProceedNextPage}
        >
          Lanjutkan
        </Button>
      </View>
    </View>
  );
}

type SeatDescriptionProps = {
  label: string;
  color: AppColorUnion;
};
function SeatDescription({ label, color }: SeatDescriptionProps) {
  return (
    <View style={style.seatDescriptionItem}>
      <View backgroundColor={color} style={style.seatDescriptionIndicator} />
      <Typography fontFamily="OpenSans-Regular" fontSize={14}>
        {label}
      </Typography>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 24,
    gap: 24,
  },
  informationBanner: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 4,
    borderRadius: 2,
  },
  bottomActionContainer: {
    padding: 24,
    borderTopWidth: 1,
  },
  seatDescriptionContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seatDescriptionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  seatDescriptionIndicator: {
    height: 16,
    width: 16,
    borderRadius: 2,
  },
  userInfoContainer: {
    borderWidth: 1,
    borderRadius: 2,
    flexDirection: "row",
    gap: 12,
    padding: 12,
  },
});
