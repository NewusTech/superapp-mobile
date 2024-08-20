import { useEffect } from "react";
import { ScrollView, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

import { rentalCarQuerySchema } from "@/apis/internal.api.type";
import {
  Appbar,
  Button,
  Checkbox,
  DateInputV3,
  SelectInputV2,
  TextInput,
  Typography,
  View,
} from "@/components";
import { IconCalendar, IconChevronDown } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import {
  useRentActions,
  useRentalCarData,
} from "@/features/rental/store/rental-store";
import { formatCurrency } from "@/utils/common";
import { zodResolver } from "@hookform/resolvers/zod";

export type SewaRent = z.infer<typeof rentalCarQuerySchema>;

export default function DetailRentCar() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { Colors } = useAppTheme();

  const rentalCarData = useRentalCarData();

  const { setRentalPayload } = useRentActions();

  const { control, formState, handleSubmit, setValue, watch } =
    useForm<SewaRent>({
      resolver: zodResolver(rentalCarQuerySchema),
      mode: "all",
      defaultValues: {
        durasi_sewa: 1,
        all_in: 0,
        area: "Dalam Kota",
        tanggal_mulai: new Date(),
        tanggal_selesai: new Date(),
      },
    });

  const maxDayRentDuration =
    watch("area").toLocaleLowerCase() === "luar kota" ? 4 : 7;

  const handleSubmitForm = handleSubmit((data) => {
    setRentalPayload(data);
    console.log(data);
    router.push("/rental/payment");
  });

  const dummyDisableDate = ["2024-8-24", "2024-8-25", "2024-8-27", "2024-8-28"];

  const rentDuration = Array.from({ length: maxDayRentDuration }, (v, i) => ({
    title: i + (watch("area").toLocaleLowerCase() === "luar kota" ? 4 : 1),
  }));

  const areList = [
    {
      title: "Dalam Kota",
    },
    {
      title: "Luar Kota",
    },
  ];

  const calculatePrice = () => {
    const durationPrice = watch("durasi_sewa");
    const allInPrice =
      (watch("all_in")
        ? Number.parseFloat(rentalCarData?.biaya_all_in || "0")
        : 0) * durationPrice;
    const carPrice = Number.parseFloat(rentalCarData?.biaya_sewa || "0");
    return carPrice * durationPrice + allInPrice;
  };

  const areaWatch = watch("area").toLocaleLowerCase();
  const durationWatch = watch("durasi_sewa");
  useEffect(() => {
    if (areaWatch === "luar kota" && durationWatch < 4) {
      console.log(areaWatch);
      return setValue("durasi_sewa", 4);
    }
  }, [areaWatch, durationWatch, setValue]);

  return (
    <View style={[styles.container, { backgroundColor: Colors.paper }]}>
      <Appbar
        title={"Detail Sewa & Rental Mobil"}
        backgroundColor="paper"
        hasBorder={false}
        backIconPress={() => router.back()}
      />
      <ScrollView style={{ paddingVertical: 20 }}>
        <View
          borderColor="outlineborder"
          style={[
            styles.contentContainer,
            {
              backgroundColor: Colors.paper,
              borderColor: Colors.outlineborder,
            },
          ]}
        >
          <Controller
            control={control}
            name="durasi_sewa"
            render={({ field }) => (
              <SelectInputV2
                label="Durasi Sewa *"
                placeholder="Pilih Durasi Sewa"
                suffix="Hari"
                value={String(field.value)}
                data={rentDuration}
                onSelect={(selectedItem) => field.onChange(selectedItem.title)}
                trailingIcon={
                  <IconChevronDown width={21} height={21} color="main" />
                }
              />
            )}
          />
          <Controller
            control={control}
            name="area"
            render={({ field }) => (
              <SelectInputV2
                label="Area *"
                placeholder="Pilih Area"
                value={String(field.value)}
                data={areList}
                onSelect={(selectedItem) => field.onChange(selectedItem.title)}
                trailingIcon={
                  <IconChevronDown width={21} height={21} color="main" />
                }
              />
            )}
          />
          <Controller
            control={control}
            name="tanggal_mulai"
            render={({ field }) => (
              <DateInputV3
                withBorder
                label={"Tanggal Mulai Sewa"}
                trailingIcon={
                  <View style={{ marginLeft: "auto" }}>
                    <IconCalendar width={21} height={21} color="main" />
                  </View>
                }
                onChange={(date) => field.onChange(date)}
                value={field.value}
                disabledDates={dummyDisableDate}
              />
            )}
          />
          <Controller
            control={control}
            name="tanggal_selesai"
            render={({ field }) => (
              <DateInputV3
                minDate={new Date(watch("tanggal_mulai")).toISOString()}
                withBorder
                label={"Tanggal Selesai Sewa"}
                trailingIcon={
                  <View style={{ marginLeft: "auto" }}>
                    <IconCalendar width={21} height={21} color="main" />
                  </View>
                }
                onChange={(date) => field.onChange(date)}
                value={field.value}
                disabledDates={dummyDisableDate}
              />
            )}
          />
          <Controller
            control={control}
            name="alamat_keberangkatan"
            render={({ field }) => (
              <TextInput
                label="Alamat Keberangkatan *"
                placeholder="Jl.alamat"
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                borderRadius={20}
                numberOfLines={5}
                textAlignVertical="top"
                multiline={true}
              />
            )}
          />
          <TouchableWithoutFeedback
            onPress={() => setValue("all_in", watch("all_in") ? 0 : 1)}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Checkbox
                selected={Boolean(watch("all_in"))}
                width={18}
                height={18}
              />
              <Typography fontFamily="Poppins-Medium" fontSize={12}>
                ALL IN{" "}
                <Typography fontFamily="Poppins-Regular" fontSize={12}>
                  (Tol, Kapal dan Solar)
                </Typography>{" "}
                {formatCurrency(
                  Number.parseFloat(rentalCarData?.biaya_all_in || "0")
                )}
                /hari
              </Typography>
            </View>
          </TouchableWithoutFeedback>
          <View>
            <Typography fontFamily="Poppins-Medium" fontSize={14}>
              Harga/ Hari
            </Typography>
            <Typography
              fontFamily="Poppins-Regular"
              style={{
                backgroundColor: Colors.outlineborder,
                width: "100%",
                paddingVertical: 10,
                paddingHorizontal: 20,
                textAlignVertical: "center",
                borderRadius: 100,
              }}
            >
              {formatCurrency(
                Number.parseFloat(rentalCarData?.biaya_sewa || "0") || 0
              )}
            </Typography>
          </View>
        </View>
        <View backgroundColor="dangerlight" style={styles.warningWrapper}>
          <Typography
            fontFamily="OpenSans-Regular"
            fontSize={10}
            color="dangerbase"
          >
            Mohon diperhatikan, setiap pembelian tiket tidak dapat dikembalikan.
            Pastikan untuk mempertimbangkan dengan baik sebelum membeli.
          </Typography>
        </View>
      </ScrollView>
      <View
        style={[
          styles.bottomContainer,
          {
            paddingBottom: 24 + insets.bottom,
            borderColor: Colors.outlineborder,
          },
        ]}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Typography fontFamily="OpenSans-Semibold" fontSize={16} color="main">
            {formatCurrency(calculatePrice())}
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
          <Button disabled={!formState.isValid} onPress={handleSubmitForm}>
            Proses ke Pembayaran
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    marginHorizontal: 24,
    borderWidth: 1,
    borderRadius: 20,
    padding: 12,
    gap: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  buttonWrapper: {
    alignItems: "center",
  },
  warningWrapper: {
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 50,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    borderTopWidth: 1,
  },
});
