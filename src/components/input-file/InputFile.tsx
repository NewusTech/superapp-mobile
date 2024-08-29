import { useAppTheme } from "@/context/theme-context";

import { IconUpload } from "../icons";
import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export type InputFileProps = {
  label: string;
};

export default function InputFile(props: InputFileProps) {
  const { label } = props;
  const { Colors } = useAppTheme();
  return (
    <View style={{ gap: 5 }}>
      <Typography fontFamily="Poppins-Medium" fontSize={14}>
        {label}
      </Typography>
      <View
        style={{
          padding: 5,
          borderWidth: 1,
          borderRadius: 20,
          gap: 5,
          paddingVertical: 10,
          flexDirection: "column",
          borderColor: Colors.outlineborder,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconUpload />
        <Typography
          fontFamily="Poppins-Bold"
          color="textsecondary"
          fontSize={16}
        >
          Pilih Gambar
        </Typography>
        <Typography
          fontFamily="Poppins-Light"
          color="textsecondary"
          fontSize={14}
          style={{ textAlign: "center" }}
        >
          Supported formates: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
        </Typography>
      </View>
    </View>
  );
}
