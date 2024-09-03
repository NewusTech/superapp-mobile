import { useEffect, useState } from "react";
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
import { IconCalendar, IconChevronDown, IconClock } from "@/components/icons";
import Modals from "@/components/modal/Modals";
import { TimeInput } from "@/components/time-input/TimeInput";
import { useAppTheme } from "@/context/theme-context";
import { useGetBookDatesQuery } from "@/features/rental/api/useGetBookDatesQuery";
import {
  useRentActions,
  useRentalCarData,
} from "@/features/rental/store/rental-store";
import { formatCurrency, plusDay } from "@/utils/common";
import { formatDate } from "@/utils/datetime";
import { zodResolver } from "@hookform/resolvers/zod";

export type SewaRent = z.infer<typeof rentalCarQuerySchema>;

export default function DetailRentCar() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { Colors } = useAppTheme();

  const rentalCarData = useRentalCarData();

  const { setRentalPayload } = useRentActions();

  const getBookDatesQuery = useGetBookDatesQuery(
    rentalCarData?.id.toString() || "1"
  );

  const bookDatesData = getBookDatesQuery.isFetching
    ? []
    : getBookDatesQuery.data?.data || [];

  console.log(bookDatesData);

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
        time: new Date(),
      },
    });

  const [openDetailAllIn, setOpenDetailAllIn] = useState(false);

  const areaWatch = watch("area").toLocaleLowerCase();
  const durationWatch = watch("durasi_sewa");

  const tanggalMulai = watch("tanggal_mulai");

  let maxDayRentDuration =
    watch("area").toLocaleLowerCase() === "luar kota" ? 4 : 7;

  const calculateMaxRentDuration = () => {
    for (let i = 0; i < maxDayRentDuration; i++) {
      const checkDate = plusDay(tanggalMulai, i).toISOString().split("T")[0];
      if (bookDatesData.includes(checkDate)) {
        return i - 1; // Return durasi maksimal yang bisa dipilih
      }
    }
    return maxDayRentDuration; // Tidak ada tanggal terpesan dalam durasi yang dipilih
  };

  if (tanggalMulai) {
    maxDayRentDuration = calculateMaxRentDuration();
  }

  const handleSubmitForm = handleSubmit((data) => {
    setRentalPayload(data);
    console.log(data);
    router.push("/rental/payment");
  });

  // const dummyDisableDate = [
  //   "2024-8-24",
  //   "2024-8-25",
  //   "2024-8-27",
  //   "2024-8-28",
  //   "2024-9-19",
  //   "2024-9-20",
  // ];

  // const rentDuration = Array.from({ length: maxDayRentDuration }, (v, i) => ({
  //   title: i + (watch("area").toLocaleLowerCase() === "luar kota" ? 4 : 1),
  // }));

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

  // Fungsi untuk mengecek apakah tanggal dalam rentang tanggal yang dipesan
  const isDateInDisabledRange = (
    startDate: Date,
    duration: number,
    disabledDates: any[]
  ) => {
    for (let i = 0; i < duration; i++) {
      const checkDate = plusDay(startDate, i).toISOString().split("T")[0];
      if (disabledDates.includes(checkDate)) {
        return true;
      }
    }
    return false;
  };

  // Fungsi untuk mendapatkan durasi maksimal berdasarkan tanggal yang telah dipesan
  const getMaxRentDuration = (
    startDate: Date,
    maxDuration: number,
    disabledDates: any[]
  ) => {
    for (let i = 0; i < maxDuration; i++) {
      const checkDate = plusDay(startDate, i).toISOString().split("T")[0];
      if (disabledDates.includes(checkDate)) {
        return i; // Return durasi maksimal
      }
    }
    return maxDuration; // Tidak ada tanggal terpesan dalam durasi yang dipilih
  };

  const rentDuration = Array.from({ length: maxDayRentDuration }, (v, i) => ({
    title: i + (areaWatch.toLowerCase() === "luar kota" ? 4 : 1),
  }));

  const onHandleOpenAllIn = () => {
    const allIn = watch("all_in");
    setValue("all_in", allIn ? 0 : 1);
    if (allIn === 0) setOpenDetailAllIn(true);
  };

  useEffect(() => {
    if (areaWatch === "luar kota" && durationWatch < 4) {
      console.log(areaWatch);
      return setValue("durasi_sewa", 4);
    }
  }, [areaWatch, durationWatch, setValue]);

  // useEffect(() => {
  //   setValue("tanggal_selesai", plusDay(tanggalMulai, durationWatch));
  // }, [tanggalMulai, durationWatch, setValue]);

  useEffect(() => {
    if (!tanggalMulai) return;

    // Hitung tanggal selesai berdasarkan durasi sewa
    const tanggalSelesai = plusDay(tanggalMulai, durationWatch);
    setValue("tanggal_selesai", tanggalSelesai);

    // Cek apakah tanggal sewa berada dalam rentang tanggal yang telah dipesan
    if (isDateInDisabledRange(tanggalMulai, durationWatch, bookDatesData)) {
      alert("Pilih jadwal lain karena tanggal telah terpesan."); // Notifikasi
      setValue("durasi_sewa", 0); // Reset durasi sewa jika tanggal terpesan
    } else {
      const maxDuration = getMaxRentDuration(
        tanggalMulai,
        maxDayRentDuration,
        bookDatesData
      );
      if (durationWatch > maxDuration) {
        alert(
          `Durasi sewa maksimal hanya ${maxDuration} hari karena tanggal terpesan.`
        );
        setValue("durasi_sewa", maxDuration); // Set durasi maksimal
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tanggalMulai, durationWatch, setValue]);

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
                disabledDates={bookDatesData}
              />
            )}
          />
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
          <View style={{ gap: 10 }}>
            <Typography fontFamily="Poppins-Medium">
              Tanggal Selesai Sewa
            </Typography>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 15,
                borderWidth: 1,
                borderColor: Colors.outlineborder,
                borderRadius: 10,
                backgroundColor: Colors.outlineborder,
              }}
            >
              <Typography>
                {formatDate(plusDay(tanggalMulai, durationWatch))}
              </Typography>
              <IconCalendar width={21} height={21} color="main" />
            </View>
          </View>
          <Controller
            control={control}
            name="time"
            render={({ field }) => (
              <TimeInput
                withBorder
                label={"Jam Keberangkatan"}
                trailingIcon={
                  <View style={{ marginLeft: "auto" }}>
                    <IconClock width={21} height={21} color="main" />
                  </View>
                }
                onChange={(date) => field.onChange(date)}
                value={field.value}
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
          <Controller
            control={control}
            name="catatan_sopir"
            render={({ field }) => (
              <TextInput
                label="Catatan Untuk Sopir *"
                placeholder="Masukan alamat secara rinci seperti : blok rumah, gang dan no rumah"
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
          <TouchableWithoutFeedback onPress={onHandleOpenAllIn}>
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
          <Button
            disabled={!formState.isValid || durationWatch < 1}
            onPress={handleSubmitForm}
          >
            Proses ke Pembayaran
          </Button>
        </View>
      </View>
      <Modals
        modalVisible={openDetailAllIn}
        setModalVisible={setOpenDetailAllIn}
      >
        <Typography>
          Dengan layanan{" "}
          <Typography fontFamily="Poppins-Bold">"ALL IN"</Typography> Anda tidak
          perlu khawatir tentang biaya tambahan selama perjalanan.
          <Typography fontFamily="Poppins-Bold">
            {" "}
            Semua biaya seperti tol, tiket kapal, dan bahan bakar (BBM)
          </Typography>{" "}
          sudah termasuk dalam satu harga yang Anda bayarkan. Ini berarti Anda
          bisa menikmati perjalanan tanpa harus memikirkan pengeluaran ekstra,
          sehingga lebih nyaman dan praktis.
        </Typography>
      </Modals>
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
