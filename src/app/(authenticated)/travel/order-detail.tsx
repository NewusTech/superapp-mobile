/* eslint-disable simple-import-sort/imports */
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, Button, Typography, View } from "@/components";
import { IconCarSide } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { TravelTicketItem } from "@/features/travel/components";
import {
  useTravelActions,
  useTravelPassenger,
  useTravelPointToPointPayload,
  useTravelSchedule,
  useTravelbookingPayload
} from "@/features/travel/store/travel-store";
import { formatCurrency } from "@/utils/common";

import { PassengerSeat } from "./add-passenger";
import { useMutation } from "@tanstack/react-query";
import { apiClientMock } from "@/apis/internal.api";
import { AxiosError } from "axios";
import { useGetPointToPointApi } from "@/features/travel/api/useGetPointToPointApi";

const usePostPesananMutation = () => {
  const { setPesananResponse } = useTravelActions();
  return useMutation({
    mutationFn: async (data) => {
      const response = await apiClientMock({
        method: "POST",
        url: "/api/pesanan/pesanan",
        data,
      });
      setPesananResponse(response.data);
      return response.data;
    },
    onError: (error: AxiosError) => {
      console.error("Error processing order:", error);
    },
  });
};


export default function TravelOrderDetailScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const router = useRouter();

  const { Colors } = useAppTheme();

  const travelSchedule = useTravelSchedule();
  const travelPassenger = useTravelPassenger();

  const handleNavigateToSeatSelection = (index: number) => {
    const routes = navigation.getState()?.routes;
    const prevRoute = routes[routes.length - 2];
    if (prevRoute.name === "travel/travel-detail") {
      router.replace({
        pathname: "/travel/seat-selection/[index]",
        params: {
          index,
        },
      });
    } else {
      router.push({
        pathname: "/travel/seat-selection/[index]",
        params: {
          index,
        },
      });
    }
  };

  const getPassengerSeat = useMemo(() => {
    let selectedSeat: PassengerSeat["seat"] = [];

    travelPassenger.forEach((passenger) => {
      selectedSeat = selectedSeat.concat(passenger.seat);
    });

    return selectedSeat;
  }, [travelPassenger]);


  const { mutate: postPesanan } = usePostPesananMutation();
  // const travelStore = useTravelbookingPayload()
  const pointToPointPayload = useTravelPointToPointPayload();
  const bookingPayload = useTravelbookingPayload();
  const pointToPointQuery = useGetPointToPointApi(bookingPayload);

  const handlerPesanan = () => {
    const data: any = pointToPointQuery?.data?.data.find(item => item.nama === pointToPointPayload?.from)

    const payload: any = {
      jadwal_id: travelSchedule?.id,
      no_kursi: travelPassenger.map((p) => p.seat).join(", "),
      nama: travelPassenger.map((p) => p.name).join(", "),
      no_telp: travelPassenger.map((p) => p.phoneNumber).join(", "),
      titik_jemput_id: data?.master_cabang_id,
      biaya_tambahan: 0,
      status: "Menunggu",
    };

    postPesanan(payload, {
      onSuccess: () => {
        router.push("/travel/payment");
      },
      onError: () => {
        // Tetap di halaman ini jika ada error
      },
    });
  };

  if (!travelSchedule) return null;

  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar title="Detail Pesanan" backIconPress={() => router.back()} />

      <View style={style.contentContainer}>
        <Typography fontFamily="Poppins-Bold" fontSize={16}>
          Perjalananmu
        </Typography>

        <TravelTicketItem
          departureDate={new Date(travelSchedule?.departureDate)}
          destinationCity={travelSchedule?.originCity}
          destinationDepartureDate={
            new Date(travelSchedule?.destinationDepartureDate)
          }
          originCity={travelSchedule?.destinationCity}
          originDepartureDate={new Date(travelSchedule?.originDepartureDate)}
          icon={<IconCarSide color="main" />}
          customHeader={
            <View>
              <Typography>
                {travelSchedule.carModel} {"\u2022"}{" "}
                {getPassengerSeat?.map((item) => item).join(", ")}
              </Typography>
            </View>
          }
          customFooter={
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignContent: "center",
              }}
            >
              <Typography>Titik Jemput</Typography>
              <Typography>Titik Antar</Typography>
            </View>
          }
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontFamily="Poppins-Bold" fontSize={16}>
            Daftar Penumpang
          </Typography>
          <Button
            onPress={() => router.push("/travel/add-passenger")}
            style={{ minHeight: 40, height: 40 }}
          >
            Tambah
          </Button>
        </View>

        {travelPassenger?.map((passenger, index) => (
          <View
            key={passenger.name}
            style={[
              style.passengerContainer,
              { borderColor: Colors.outlineborder },
            ]}
          >
            <View>
              <Typography
                fontFamily="Poppins-Bold"
                fontSize={16}
                numberOfLines={1}
              >
                {passenger.name}
              </Typography>
              <Typography color="textsecondary">
                {travelSchedule.carModel} {"\u2022"} {passenger.seat.join(", ")}
              </Typography>
            </View>

            <Button
              variant="secondary"
              onPress={() => handleNavigateToSeatSelection(index)}
            >
              Ganti kursi
            </Button>
          </View>
        ))}
      </View>

      <View
        style={[
          style.bottomContainer,
          {
            paddingBottom: 24 + insets.bottom,
            borderColor: Colors.outlineborder,
          },
        ]}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Typography fontFamily="OpenSans-Semibold" fontSize={16} color="main">
            {formatCurrency(
              travelSchedule?.price * (travelPassenger?.length || 0)
            )}
          </Typography>
          <Typography
            fontFamily="OpenSans-Regular"
            fontSize={14}
            color="textsecondary"
          >
            Total Harga
          </Typography>
        </View>
        <View style={{ flex: 1 }}>
          <Button onPressIn={handlerPesanan}>
            {"Proses ke" + `\n` + "Pembayaran"}
          </Button>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    borderTopWidth: 1,
  },
  passengerContainer: {
    borderWidth: 1,
    borderRadius: 2,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
