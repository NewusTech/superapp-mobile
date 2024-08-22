import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { useAppTheme } from "@/context/theme-context";
import { calculateDaysBetween, formatCurrency, plusDay } from "@/utils/common";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../button/Button";
import { DateInputV4 } from "../date-input-v4/DateInputV4";
import { SelectInputV2 } from "../select-input-v2/SelectInputV2";
import { Separator } from "../separator/Separator";
import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export type PesananPenginapan = {
  tanggal_mulai: Date;
  tanggal_selesai: Date;
};

export const PesananPenginapanSchema = z.object({
  tanggal_mulai: z.date(),
  tanggal_selesai: z.date(),
});

export default function PartialPesanan() {
  const { Colors } = useAppTheme();

  const dummyDisableDate = ["2024-8-24", "2024-8-25", "2024-8-27", "2024-8-28"];

  const { control, formState, handleSubmit, setValue, watch } =
    useForm<PesananPenginapan>({
      defaultValues: {
        tanggal_mulai: new Date(),
        tanggal_selesai: new Date(),
      },
      resolver: zodResolver(PesananPenginapanSchema),
      mode: "all",
    });

  const calculate = () => {
    const biayaSewa = 500000;
    const lamaSewa = calculateDaysBetween(
      watch("tanggal_mulai"),
      watch("tanggal_selesai")
    );

    return biayaSewa * lamaSewa;
  };

  const tanggalMulai = watch("tanggal_mulai");

  useEffect(() => {
    if (tanggalMulai) {
      setValue("tanggal_selesai", plusDay(tanggalMulai, 1)); // Set nilai tanggal_selesai
    }
  }, [tanggalMulai, setValue]);

  return (
    <View style={{ gap: 15 }}>
      <View
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: Colors.textsecondary,
          padding: 15,
          flexDirection: "column",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <Typography fontFamily="OpenSans-Bold" fontSize={16}>
          Podomoro Golf View
        </Typography>
        <View style={{ flexDirection: "row" }}>
          <Typography
            fontFamily="OpenSans-Regular"
            fontSize={14}
            numberOfLines={1}
            color="quarternary"
          >
            2 Kamar, 36 m
          </Typography>
          <Typography
            fontFamily="OpenSans-Regular"
            fontSize={8}
            style={{
              textAlignVertical: "top",
              position: "relative",
              top: -2,
            }}
          >
            2
          </Typography>
        </View>
        <Separator />
        <Typography
          fontFamily="OpenSans-Medium"
          fontSize={14}
          color="secondary"
        >
          {formatCurrency(500000)}/malam
        </Typography>
      </View>
      <View style={{ flexDirection: "column", gap: 5 }}>
        <Typography
          fontFamily="Poppins-Regular"
          fontSize={14}
          color="textsecondary"
        >
          Tanggal
        </Typography>
        <View
          style={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor: Colors.textsecondary,
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 5,
            paddingHorizontal: 10,
          }}
        >
          <Controller
            control={control}
            name="tanggal_mulai"
            render={({ field }) => (
              <DateInputV4
                disabledDates={dummyDisableDate}
                label="Check In"
                placeholder={"DD/MM/YYYY"}
                onChange={(date) => field.onChange(date)}
                value={field.value}
                width={"45%"}
              />
            )}
          />
          <View
            style={{
              width: 1,
              backgroundColor: Colors.textsecondary,
            }}
          />
          <Controller
            control={control}
            name="tanggal_selesai"
            render={({ field }) => (
              <DateInputV4
                disabledDates={dummyDisableDate}
                minDate={plusDay(watch("tanggal_mulai"), 1).toDateString()}
                label="Check Out"
                placeholder={"DD/MM/YYYY"}
                onChange={(date) => field.onChange(date)}
                value={field.value}
                width={"45%"}
              />
            )}
          />
        </View>
      </View>
      <View style={{ flexDirection: "column", gap: 5 }}>
        <Typography
          fontFamily="Poppins-Regular"
          fontSize={14}
          color="textsecondary"
        >
          Total
        </Typography>
        <View
          style={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor: Colors.textsecondary,
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 5,
            paddingHorizontal: 10,
          }}
        >
          <View style={{ padding: 10, width: "45%" }}>
            <Typography fontFamily="Poppins-Medium" fontSize={16}>
              Hari
            </Typography>
            <Typography fontFamily="Poppins-Regular" fontSize={14}>
              {calculateDaysBetween(
                watch("tanggal_mulai"),
                watch("tanggal_selesai")
              )}{" "}
              Malam
            </Typography>
          </View>
          <View
            style={{
              width: 1,
              backgroundColor: Colors.textsecondary,
            }}
          />
          <View style={{ padding: 10, width: "45%" }}>
            <Typography fontFamily="Poppins-Medium" fontSize={16} color="main">
              Total
            </Typography>
            <Typography
              fontFamily="Poppins-Medium"
              fontSize={14}
              color="secondary"
            >
              {formatCurrency(calculate())}
            </Typography>
          </View>
        </View>
      </View>
      <Button>Pesan Sekarang</Button>
    </View>
  );
}
