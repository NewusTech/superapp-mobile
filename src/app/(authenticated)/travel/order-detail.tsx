/* eslint-disable simple-import-sort/imports */
import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Appbar, Button, Snackbar, Typography, View } from "@/components";
import { IconCarSide, IconSeat, IconUserCard } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { TravelTicketItem } from "@/features/travel/components";
import {
  usePassengerOneSameOnUser,
  useTravelActions,
  useTravelPassenger,
  useTravelPointToPointPayload,
  useTravelSchedule,
} from "@/features/travel/store/travel-store";
import { formatCurrency } from "@/utils/common";

import { useMutation } from "@tanstack/react-query";
import { apiClientMock } from "@/apis/internal.api";
import { useAuthProfile } from "@/features/auth/store/auth-store";
import InputSwitch from "@/components/input-switch/InputSwitch";
import { PassengerSeat } from "./passenger/[index]";

const usePostPesananMutation = () => {
  const { setPesananResponse } = useTravelActions();
  return useMutation({
    mutationFn: async (data) => {
      console.log(data);
      const response = await apiClientMock({
        method: "POST",
        url: "/api/pesanan/pesanan",
        data,
      });
      setPesananResponse(response.data);
      return response.data;
    },
    onError: (error: any) => {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        console.error("Error processing order:", errorMessage);
        // Anda bisa menambahkan notifikasi UI di sini, seperti alert atau toast
        alert(errorMessage);
      } else {
        console.error("Error processing order:", error.message);
      }
    },
  });
};

export default function TravelOrderDetailScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const router = useRouter();

  const { Colors } = useAppTheme();

  const userProfile = useAuthProfile();
  const travelSchedule = useTravelSchedule();
  const travelPassenger = useTravelPassenger();
  const passengerOneSameOnUser = usePassengerOneSameOnUser();

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
  const handleNavigateToPassangerEdit = (index: number) => {
    const routes = navigation.getState()?.routes;
    const prevRoute = routes[routes.length - 2];
    if (prevRoute.name === "travel/travel-detail") {
      router.replace({
        pathname: "/travel/passenger/[index]",
        params: {
          index,
        },
      });
    } else {
      router.push({
        pathname: "/travel/passenger/[index]",
        params: {
          index,
        },
      });
    }
  };

  const getPassengerSeat = useMemo(() => {
    let selectedSeat: string[] = [];

    travelPassenger.forEach((passenger) => {
      selectedSeat = selectedSeat.concat(passenger.no_kursi);
    });

    return selectedSeat;
  }, [travelPassenger]);

  const { mutate: postPesanan } = usePostPesananMutation();
  const pointToPointPayload = useTravelPointToPointPayload();
  const passengerList = useTravelPassenger();
  const { setPassenger, setPassengerOneSameOnUser } = useTravelActions();

  const handlerPesanan = () => {
    if (passengerList.some((data) => data.nik.trim() === "")) {
      Snackbar.show({
        message: "Data Penumpang Harus Terisi Semua",
      });
      return;
    }
    const payload: any = {
      jadwal_id: travelSchedule?.id,
      titik_jemput_id: pointToPointPayload?.from?.id,
      titik_antar_id: pointToPointPayload?.to?.id,
      nama: userProfile?.nama,
      nik: userProfile?.nik || "23423423",
      email: userProfile?.email,
      no_telp: userProfile?.no_telp,
      penumpang: passengerList,
    };

    postPesanan(payload, {
      onSuccess: (data) => {
        router.dismissAll();
        console.log(data.data.kode_pesanan);
        router.push({
          pathname: "/travel/payment",
          params: {
            kode_pesanan: data.data.kode_pesanan,
          },
        });
      },
      onError: () => {
        // Tetap di halaman ini jika ada error
      },
    });
  };

  const handlePassangerOneSameOnUser = (value: any) => {
    const passengerListTemp: PassengerSeat[] = passengerList;
    if (value) {
      if (passengerListTemp?.[0]) {
        passengerListTemp[0].email = userProfile?.email || " ";
        passengerListTemp[0].nama = userProfile?.nama || "Penumpang 1";
        passengerListTemp[0].nik = userProfile?.nik || "";
        passengerListTemp[0].no_telp = userProfile?.no_telp || "";
        console.log(passengerList[0]);
      }
    } else {
      passengerListTemp[0].email = "";
      passengerListTemp[0].nama = "Penumpang 1";
      passengerListTemp[0].nik = "";
      passengerListTemp[0].no_telp = "";
      console.log(passengerList[0]);
    }
    setPassenger(passengerListTemp);
    setPassengerOneSameOnUser(value);
    console.log({ value });
  };

  if (!travelSchedule) return router.back();

  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar title="Detail Pesanan" backIconPress={() => router.back()} />
      <ScrollView>
        <View style={style.contentContainer}>
          <Typography fontFamily="Poppins-Bold" fontSize={16}>
            Perjalananmu
          </Typography>
          <TravelTicketItem
            disabled
            departureDate={new Date(travelSchedule?.departureDate)}
            destinationCity={travelSchedule?.originCity}
            destinationDepartureDate={
              new Date(travelSchedule?.destinationDepartureDate)
            }
            originCity={travelSchedule?.destinationCity}
            originDepartureDate={new Date(travelSchedule?.originDepartureDate)}
            icon={<IconCarSide color="main" />}
            customHeader={
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography>
                  {travelSchedule.carModel} {"\u2022"}{" "}
                  {getPassengerSeat?.map((item) => item).join(", ")}
                </Typography>
                <Typography
                  fontFamily="Poppins-Bold"
                  fontSize={12}
                  color="main"
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.main,
                    padding: 5,
                    width: 90,
                    textAlign: "center",
                    textAlignVertical: "center",
                    borderRadius: 100,
                    marginLeft: "auto",
                  }}
                >
                  Pergi
                </Typography>
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
              Kontak Pemesan
            </Typography>
          </View>
          <View
            style={{
              borderColor: Colors.outlineborder,
              borderWidth: 1,
              borderRadius: 20,
              width: "100%",
              padding: 10,
              paddingHorizontal: 20,
            }}
          >
            <Typography fontFamily="Poppins-Bold" fontSize={18}>
              {userProfile?.nama}
            </Typography>
            <Typography fontFamily="Poppins-Regular" fontSize={16}>
              {userProfile?.no_telp}
              {"\n"}
              {userProfile?.email}
            </Typography>
          </View>
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
          </View>
          {travelPassenger?.map((passenger, index) => (
            <View
              key={passenger.nama}
              style={{
                borderWidth: 1,
                borderColor: Colors.outlineborder,
                borderRadius: 20,
                flexDirection: "column",
                padding: 12,
              }}
            >
              {index === 0 && (
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBlockColor: Colors.outlineborder,
                    paddingLeft: 5,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Typography
                    style={{
                      height: "auto",
                      textAlignVertical: "center",
                      marginRight: "auto",
                    }}
                  >
                    Sama dengan pemesan
                  </Typography>
                  <InputSwitch
                    label=""
                    value={passengerOneSameOnUser}
                    handleOnSwitch={handlePassangerOneSameOnUser}
                  />
                </View>
              )}
              <View style={[style.passengerContainer]}>
                <View>
                  <Typography
                    fontFamily="Poppins-Bold"
                    fontSize={16}
                    numberOfLines={1}
                  >
                    {passenger.nama}
                  </Typography>
                  <Typography color="textsecondary">
                    {travelSchedule.carModel} {"\u2022"} {passenger.no_kursi}
                  </Typography>
                </View>

                <Pressable
                  onPress={() => handleNavigateToSeatSelection(index)}
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.outlineborder,
                    height: 48,
                    width: 48,
                    padding: 10,
                    borderRadius: 100,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "auto",
                    marginRight: 10,
                    overflow: "hidden",
                  }}
                >
                  <IconSeat height={24} width={38} color="main" />
                </Pressable>
                <Pressable
                  onPress={() => handleNavigateToPassangerEdit(index)}
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.outlineborder,
                    height: 48,
                    width: 48,
                    padding: 10,
                    borderRadius: 100,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <IconUserCard height={24} width={24} color="main" />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View
        style={[
          style.bottomContainer,
          {
            paddingBottom: 24 + insets.bottom,
            borderColor: Colors.outlineborder,
            backgroundColor: Colors.paper,
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
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
});
