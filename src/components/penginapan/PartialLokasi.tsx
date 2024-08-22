import { Dimensions, Linking, TouchableOpacity } from "react-native";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";

import { useAppTheme } from "@/context/theme-context";

import { Typography } from "../typography/Typography";
import { View } from "../view/View";

export default function PartialLokasi() {
  const { Colors } = useAppTheme();

  const handloToMaps = () => {
    Linking.openURL(`https://maps.app.goo.gl/ARvpZxCoxnJm3hY86`);
  };

  return (
    <View style={{ paddingHorizontal: 20, gap: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontFamily="OpenSans-Bold" fontSize={16} numberOfLines={1}>
          Lokasi
        </Typography>
        <TouchableOpacity style={{}} onPress={handloToMaps}>
          <Typography
            fontFamily="Poppins-Medium"
            fontSize={12}
            color="main"
            style={{ textAlignVertical: "bottom" }}
          >
            Lihat Map
          </Typography>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          height: 150,
          backgroundColor: Colors.textsecondary,
          overflow: "hidden",
        }}
      ></View>
      <Typography fontFamily="OpenSans-Regular" fontSize={16} numberOfLines={2}>
        Jalan Raya, Bojong Nangka, Kec. Gn. Putri, Kabupaten Bogor, Jawa Barat 
      </Typography>
    </View>
  );
}
