import { ReactNode, useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableNativeFeedbackProps,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TravelScheduleResponseSuccess } from "@/apis/internal.api.type";
import {
  Appbar,
  Button,
  Loader,
  Snackbar,
  Typography,
  View,
} from "@/components";
import {
  IconCarSide,
  IconIcArrowRight,
  IconPinSharp,
} from "@/components/icons";
import SelectTravelComponent from "@/components/travel/SelectTravelComponent";
import { AppColor } from "@/constants/Colors";
import { useGetTravelSchedule } from "@/features/travel/api/useGetSchedule";
import { TravelTicketItem } from "@/features/travel/components";
import {
  useTravelActions,
  useTravelbookingPayload,
  useTravelPointToPointPayload,
} from "@/features/travel/store/travel-store";
import { formatCurrency } from "@/utils/common";
import { formatDate } from "@/utils/datetime";

export default function TravelOptionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [openPopupRute, setOpenPopupRute] = useState(false);

  const travelBookingPayload = useTravelbookingPayload();
  const pointToPointPayload = useTravelPointToPointPayload();
  const { setPointToPointPayload, setTravelSchedule } = useTravelActions();
  const { setPassenger, setPassengerOneSameOnUser } = useTravelActions();

  const travelScheduleQuery = useGetTravelSchedule({
    from: travelBookingPayload?.from || "",
    to: travelBookingPayload?.to || "",
    date: travelBookingPayload?.date as Date,
    seats: travelBookingPayload?.seats || 1,
  });

  const _disablePoint =
    !travelScheduleQuery.data || travelScheduleQuery.data?.data.length <= 0;

  const handleSelectSchedule = (
    travelSchedule: TravelScheduleResponseSuccess["data"][number]
  ) => {
    if (travelSchedule.carSeat - travelSchedule.seatTaken.length <= 0) {
      Snackbar.show({
        message: "Kursi sudah habis",
      });
      return;
    }

    if (!pointToPointPayload?.from || !pointToPointPayload.to) {
      Snackbar.show({
        message:
          "Pilih alamat pada Door to Door/Point to Point terlebih dahulu",
      });
      return;
    }
    setTravelSchedule(travelSchedule);
    setPassenger([]);
    setPassengerOneSameOnUser(false);
    router.push("/travel/travel-detail");
  };

  // reset pointToPointPaylaod and pessanger to make sure it fresh data
  useEffect(() => {
    setPointToPointPayload({
      from: undefined,
      to: undefined,
    });
  }, [setPointToPointPayload, setPassenger]);

  console.log({ pointToPointPayload });

  return (
    <View backgroundColor="paper" style={style.container}>
      <Appbar
        title={
          <View style={{ display: "flex", flexDirection: "column" }}>
            <View style={style.headerWrapper}>
              <Typography
                fontFamily="Poppins-Bold"
                fontSize={16}
                style={{ textAlign: "left" }}
                numberOfLines={1}
              >
                {travelBookingPayload?.from}
              </Typography>
              <IconIcArrowRight height={15} width={15} />
              <Typography
                fontFamily="Poppins-Bold"
                fontSize={16}
                style={{ marginEnd: "auto" }}
                numberOfLines={1}
              >
                {travelBookingPayload?.to}
              </Typography>
            </View>
          </View>
        }
        subtitle={
          <View style={style.subtitleHeaderContainer}>
            <Typography
              fontFamily="OpenSans-Regular"
              fontSize={14}
              color="textsecondary"
            >
              {travelBookingPayload?.seats} Kursi
            </Typography>
            <Button
              style={{
                borderRadius: 100,
                paddingLeft: 10,
                paddingEnd: 10,
                minHeight: 10,
              }}
              onPress={() => setOpenPopupRute(true)}
            >
              Ubah
            </Button>
          </View>
        }
        backIconPress={() => router.back()}
      />
      <View style={style.contentHeaderContainer}>
        <View style={style.headerTitleWrapper}>
          <Typography fontFamily="Poppins-Bold" fontSize={14} color={"main"}>
            {formatDate(travelBookingPayload?.date)}
          </Typography>
          <View backgroundColor="main" style={style.indicator} />
        </View>
        <View
          style={[
            style.destinationOptionWrapper,
            { height: "auto", overflow: "hidden" },
          ]}
        >
          <TouchableWithIcon
            style={{ width: 80, overflow: "scroll" }}
            icon={
              <IconPinSharp
                width={20}
                height={20}
                color={_disablePoint ? "main" : "paper"}
              />
            }
            width={90}
            label={pointToPointPayload?.from?.point || "Titik Jemput"}
            disabled={_disablePoint}
            onPress={() =>
              router.push({
                pathname: "/travel/form-point-to-point/[pageType]",
                params: {
                  pageType: "from",
                  cabang: travelBookingPayload?.from,
                },
              })
            }
          />
          <TouchableWithIcon
            icon={
              <IconPinSharp
                width={20}
                height={20}
                color={_disablePoint ? "main" : "paper"}
              />
            }
            width={90}
            label={pointToPointPayload?.to?.point || "Titik Antar"}
            disabled={_disablePoint}
            onPress={() =>
              router.push({
                pathname: "/travel/form-point-to-point/[pageType]",
                params: {
                  pageType: "to",
                  cabang: travelBookingPayload?.to,
                },
              })
            }
          />
        </View>
      </View>

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={travelScheduleQuery.isFetching}
            onRefresh={travelScheduleQuery.refetch}
          />
        }
        data={travelScheduleQuery.data?.data || []}
        renderItem={({ item }) => {
          const availableSeat = item.carSeat - item.seatTaken.length;
          return (
            <TravelTicketItem
              departureTime={item.departureTime}
              destinationCity={item.destinationCity}
              destinationDepartureDate={new Date(item.destinationDepartureDate)}
              originCity={item.originCity}
              originDepartureDate={new Date(item.originDepartureDate)}
              onPress={() => handleSelectSchedule(item)}
              icon={<IconCarSide color="main" />}
              customHeader={
                <ScheduleHeader item={item} availableSeat={availableSeat} />
              }
              customFooter={
                item.transitionCity.trim() !== "" ? (
                  <Typography
                    fontFamily="OpenSans-Medium"
                    fontSize={14}
                    style={{ textAlign: "center" }}
                    color="textsecondary"
                  >
                    Transit di Lampung
                  </Typography>
                ) : null
              }
            />
          );
        }}
        ListEmptyComponent={() => (
          <View style={style.emptyScheduleContainer}>
            {travelScheduleQuery.isFetching ? (
              <Loader />
            ) : (
              <Typography fontFamily="Poppins-Medium">
                Tidak ada jadwal
              </Typography>
            )}
          </View>
        )}
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          gap: 16,
          padding: 20,
          paddingTop: 10,
          paddingBottom: insets.bottom + 20,
        }}
      />
      {openPopupRute && (
        <View style={style.containerPopup}>
          <TouchableWithoutFeedback onPress={() => setOpenPopupRute(false)}>
            <BlurView
              intensity={100}
              blurReductionFactor={100}
              experimentalBlurMethod="dimezisBlurView"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </TouchableWithoutFeedback>
          <View style={style.containerPopupItem}>
            <SelectTravelComponent
              handleAfterSubmit={() => setOpenPopupRute(false)}
            />
          </View>
        </View>
      )}
    </View>
  );
}

type ScheduleHeaderProps = {
  item: TravelScheduleResponseSuccess["data"][number];
  availableSeat: number;
};
function ScheduleHeader({ item, availableSeat }: ScheduleHeaderProps) {
  return (
    <View style={style.headerContainer}>
      <View style={style.leftHeaderWrapper}>
        <Typography color="main">{item.carModel}</Typography>
        <View backgroundColor="main" style={style.point} />
        <Typography color="main">{item.carSeat}</Typography>
      </View>

      <View style={style.rightHeaderWrapper}>
        <Typography color="main" fontFamily="OpenSans-Semibold" fontSize={16}>
          {formatCurrency(item.price)}
        </Typography>
        <Typography
          color={
            availableSeat <= 0 || availableSeat < item.carSeat / 2
              ? "dangerbase"
              : "success"
          }
          fontFamily="OpenSans-Regular"
          fontSize={14}
        >
          {availableSeat <= 0
            ? "Tidak tersedia"
            : availableSeat > item.carSeat / 2
              ? "Tersedia"
              : `${availableSeat} kursi lagi`}
        </Typography>
      </View>
    </View>
  );
}

type TouchableIconWithIconProps = {
  icon: ReactNode;
  label: string;
  width?: any;
  height?: any;
} & TouchableNativeFeedbackProps;
function TouchableWithIcon({
  icon,
  label,
  disabled,
  width,
  height,
  ...rest
}: TouchableIconWithIconProps) {
  return (
    <TouchableWithoutFeedback disabled={disabled} {...rest}>
      <View
        backgroundColor={disabled ? "paper" : "main"}
        borderColor="main"
        style={[style.touchableContainer, { width: width, height: height }]}
      >
        {icon}
        <Typography
          fontFamily="Poppins-Bold"
          fontSize={12}
          color={disabled ? "main" : "paper"}
          numberOfLines={1}
        >
          {label}
        </Typography>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentHeaderContainer: {
    padding: 20,
    paddingBottom: 10,
    gap: 10,
  },
  headerTitleWrapper: {
    alignItems: "center",
    gap: 8,
    flexGrow: 0,
  },
  indicator: {
    marginHorizontal: 4,
    height: 4,
    width: 120,
    borderTopLeftRadius: 99,
    borderTopRightRadius: 99,
  },
  destinationOptionWrapper: {
    flexDirection: "row",
    gap: 10,
  },
  touchableContainer: {
    padding: 10,
    paddingEnd: 20,
    gap: 2,
    flexGrow: 1,
    borderWidth: 1,
    borderRadius: 100,
    flexDirection: "row",
    overflow: "hidden",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  emptyScheduleContainer: {
    minHeight: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
  },
  leftHeaderWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rightHeaderWrapper: {
    alignItems: "flex-end",
    gap: 4,
  },
  point: {
    height: 4,
    width: 4,
    borderRadius: 99,
  },
  subtitleHeaderContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
    paddingLeft: 60,
    paddingRight: 20,
  },
  containerPopup: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    shadowRadius: 1,
    overflow: "hidden",
  },
  containerPopupItem: {
    backgroundColor: "white",
    marginTop: "auto",
    borderWidth: 1,
    borderColor: AppColor.light.textsecondary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
