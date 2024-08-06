const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};

export const AppColor = {
  light: {
    // app theme color
    white: "#FFFFFF",
    black: "#000000",
    main: "#0705EC",
    secondary: "#e34c1d",
    thirtiary: "#ec7f00",
    quarternary: "#5c5c5c",
    textprimary: "#141511",
    textsecondary: "#8c8d89",
    paper: "#FFFFFF",
    outlineborder: "#EEF0EB",
    bgsecondary: "#fafafa",
    dangerbase: "#e43b5e",
    dangerlight: "#fbe6eb",
    success: "#4ac582",
    yellow: "#fac700",
  },
  dark: {
    // app theme color
    white: "#FFFFF",
    black: "#000000",
    main: "#0705EC",
    secondary: "#e34c1d",
    thirtiary: "#ec7f00",
    quarternary: "#5c5c5c",
    textprimary: "#141511",
    textsecondary: "#8c8d89",
    paper: "#FFFFFF",
    outlineborder: "#EEF0EB",
    bgsecondary: "#fafafa",
    dangerbase: "#e43b5e",
    dangerlight: "#fbe6eb",
    success: "#4ac582",
    yellow: "#fac700",
  },
};

export type AppColorUnion = keyof (typeof AppColor)["light"];
