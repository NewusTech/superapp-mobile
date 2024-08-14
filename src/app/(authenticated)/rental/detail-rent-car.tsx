import { ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";

import {
  Appbar,
  Button,
  DateInputV2,
  SelectInputV2,
  TextInput,
  Typography,
  View,
} from "@/components";
import { IconCalendar, IconChevronDown } from "@/components/icons";
import { useAppTheme } from "@/context/theme-context";
import { formatCurrency } from "@/utils/common";
import { zodResolver } from "@hookform/resolvers/zod";

export const sewaRentSchema = z.object({
  duration: z.number(),
  area: z.string(),
  rute: z.string(),
  dateStart: z.date(),
  dateEnd: z.date(),
  alamat: z.string(),
});
export type SewaRent = z.infer<typeof sewaRentSchema>;

export default function DetailRentCar() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const maxDayRentDuration = 7;

  const { Colors } = useAppTheme();

  const { control, formState, handleSubmit, setValue } = useForm<SewaRent>({
    resolver: zodResolver(sewaRentSchema),
    mode: "all",
    defaultValues: {
      duration: 1,
      dateStart: new Date(),
      dateEnd: new Date(),
    },
  });

  const rentDuration = Array.from({ length: maxDayRentDuration }, (v, i) => ({
    title: i + 1,
  }));

  const dumpData = Array.from({ length: maxDayRentDuration }, (v, i) => ({
    title: "Dummy Data " + i,
  }));

  return (
    <View style={[styles.container, { backgroundColor: Colors.paper }]}>
      <Appbar
        title={"Detail Informasi Penyewa"}
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
            name="duration"
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
                data={dumpData}
                onSelect={(selectedItem) => field.onChange(selectedItem.title)}
                trailingIcon={
                  <IconChevronDown width={21} height={21} color="main" />
                }
              />
            )}
          />
          <Controller
            control={control}
            name="rute"
            render={({ field }) => (
              <SelectInputV2
                label="Rute *"
                placeholder="Pilih Rute"
                value={String(field.value)}
                data={dumpData}
                onSelect={(selectedItem) => field.onChange(selectedItem.title)}
                trailingIcon={
                  <IconChevronDown width={21} height={21} color="main" />
                }
              />
            )}
          />
          <Controller
            control={control}
            name="dateStart"
            render={({ field }) => (
              <DateInputV2
                withBorder
                placeholder={"Tanggal Mulai Sewa"}
                trailingIcon={
                  <IconCalendar width={21} height={21} color="main" />
                }
                onChange={(date) => field.onChange(date)}
                value={field.value}
              />
            )}
          />
          <Controller
            control={control}
            name="dateEnd"
            render={({ field }) => (
              <DateInputV2
                withBorder
                placeholder={"Tanggal Selesai Sewa"}
                trailingIcon={
                  <IconCalendar width={21} height={21} color="main" />
                }
                onChange={(date) => field.onChange(date)}
                value={field.value}
              />
            )}
          />
          <Controller
            control={control}
            name="alamat"
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
          <View>
            <Typography fontFamily="Poppins-Bold" fontSize={14}>
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
              {formatCurrency(1500000)}
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
            {formatCurrency(1500000)}
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
          <Button>Proses ke Pembayaran</Button>
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
