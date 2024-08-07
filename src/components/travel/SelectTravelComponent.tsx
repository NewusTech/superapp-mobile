import React, { useMemo, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Controller, useForm } from "react-hook-form";

import {
  TravelScheduleQuery,
  travelScheduleQuerySchema,
} from "@/apis/internal.api.type";
import { useAppTheme } from "@/context/theme-context";
import { useGetTravelBranch } from "@/features/travel/api/useGetTravelBranch";
import {
  useTravelActions,
  useTravelbookingPayload,
} from "@/features/travel/store/travel-store";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../button/Button";
import { DateInputV2 } from "../date-input-v2/DateInputV2";
import {
  IconCalendar,
  IconCarSide,
  IconChevronDown,
  IconSeat,
  IconSwap,
} from "../icons";
import InputSwitch from "../input-switch/InputSwitch";
import { SelectInputV2 } from "../select-input-v2/SelectInputV2";
import { Separator } from "../separator/Separator";
import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export default function SelectTravelComponent({
  handleAfterSubmit,
}: {
  handleAfterSubmit?: () => void;
}) {
  const { Colors } = useAppTheme();
  const maxChair = 8;

  const travelBookingPayload = useTravelbookingPayload();

  const [pulangPergi, setPulangPergi] = useState<boolean>(false);

  const { control, formState, handleSubmit, setValue, getValues } =
    useForm<TravelScheduleQuery>({
      defaultValues: {
        date: travelBookingPayload?.date || new Date(),
        seats: travelBookingPayload?.seats || 1,
        from: travelBookingPayload?.from,
        to: travelBookingPayload?.to,
      },
      resolver: zodResolver(travelScheduleQuerySchema),
      mode: "all",
    });

  const { setBookingPayload } = useTravelActions();

  const travelBranchQuery = useGetTravelBranch();

  const branchList = useMemo(() => {
    if (!travelBranchQuery.data) return [];
    return travelBranchQuery.data?.data.map((item) => ({
      title: item.nama,
    }));
  }, [travelBranchQuery.data]);

  const chairList = Array.from({ length: maxChair }, (v, i) => ({
    title: i + 1,
  }));

  const handleSwap = () => {
    const fromValue = getValues("from");
    const toValue = getValues("to");
    setValue("from", toValue);
    setValue("to", fromValue);
  };

  const handleSubmitForm = handleSubmit((data) => {
    setBookingPayload(data);
    handleAfterSubmit!();
  });

  return (
    <View backgroundColor="paper" style={[style.orderBox]}>
      <View
        style={[style.destinationBox, { borderColor: Colors.outlineborder }]}
      >
        <Controller
          control={control}
          name="from"
          render={({ field }) => (
            <SelectInputV2
              placeholder="Berangkat dari..."
              value={field.value}
              data={branchList}
              onSelect={(selectedItem) => field.onChange(selectedItem.title)}
              leadingIcon={
                <View>
                  <Typography fontFamily="OpenSans-Regular" fontSize={10}>
                    Dari
                  </Typography>
                  <IconCarSide width={21} height={21} color="main" />
                </View>
              }
              withBorder={false}
            />
          )}
        />
        <Separator />
        <Controller
          control={control}
          name="to"
          render={({ field }) => (
            <SelectInputV2
              placeholder="Menuju..."
              value={field.value}
              data={branchList}
              onSelect={(selectedItem) => field.onChange(selectedItem.title)}
              leadingIcon={
                <View>
                  <Typography fontFamily="OpenSans-Regular" fontSize={10}>
                    Ke
                  </Typography>
                  <View style={{ transform: [{ scaleX: -1 }] }}>
                    <IconCarSide width={21} height={21} color="main" />
                  </View>
                </View>
              }
              withBorder={false}
            />
          )}
        />

        <TouchableWithoutFeedback onPress={handleSwap}>
          <View backgroundColor="main" style={style.destinationIconSwap}>
            <IconSwap width={20} height={20} color="paper" />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <DateInputV2
            withBorder
            placeholder={"Tanggal Berangkat"}
            leadingIcon={<IconCalendar width={21} height={21} color="main" />}
            onChange={(date) => field.onChange(date)}
            value={field.value}
          />
        )}
      />
      <Controller
        control={control}
        name="seats"
        render={({ field }) => (
          <SelectInputV2
            placeholder="1 Sheat"
            suffix="Sheat"
            value={String(field.value)}
            data={chairList}
            onSelect={(selectedItem) => field.onChange(selectedItem.title)}
            leadingIcon={<IconSeat width={24} height={24} color="main" />}
            trailingIcon={
              <IconChevronDown width={21} height={21} color="main" />
            }
          />
        )}
      />
      <View>
        <InputSwitch
          label="Pulang Pergi"
          disable
          disableMessage="Coming Soon"
          value={false}
        />
      </View>

      <Button disabled={!formState.isValid} onPressIn={handleSubmitForm}>
        Cari
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  headerBack: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    position: "absolute",
    top: 0,
    width: "100%",
    overflow: "hidden",
  },
  orderBox: {
    margin: 24,
    gap: 16,
  },
  destinationBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    gap: 12,
    justifyContent: "center",
  },
  destinationIconSwap: {
    height: 40,
    width: 40,
    borderRadius: 99,
    position: "absolute",
    right: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableIconWrapper: {
    height: 24,
    width: 24,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
  listArticleContainer: {
    paddingHorizontal: 20,
    gap: 16,
    flexGrow: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
