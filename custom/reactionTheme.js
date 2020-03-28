/**
 * There are two theme files. This is for all MaterialUI components.
 * The other theme file is `componentTheme.js`
 */
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  layout: {
    mainContentMaxWidth: "1440px",
    mainLoginMaxWidth: "1024px"
  },
  palette: {
    primary: {
      light: "#26B0F9",
      main: "#1999DD",
      dark: "#172F3C",
      contrastText: "#FFFFFF"
    },
    secondary: {
      light: "#5d8ea9",
      main: "#5E7480",
      dark: "#1D1D1D",
      contrastText: "#000000"
    },
    background: {
      default: "#ffffff"
    },
    error: {
      light: "#E54F5D",
      main: "#CD3F4C",
      dark: "#3C1F21",
      contrastText: "#FFFFFF"
    },
    action: {
      hover: "#f5f5f5",
      selected: "#f5f5f5"
    },
    colors: {
      buttonBorderColor: "#5e7480"
    },
    borders: {
      default: "1px solid #e6e6e6"
    },
    reaction: {
      activeElementBorderColor: "#94E8D1",
      activeElementBackground: "#E6E6E6",
      badges: {
        bestseller: "#8CE0C9",
        sale: "#E54F5D"
      },
      borderColor: "#CCCCCC",
      buttonBorderRadius: 2,
      // grey scale
      black: "#000000",
      black95: "#0d0d0d",
      black90: "#1a1a1a",
      black85: "#262626",
      black80: "#333333",
      black75: "#404040",
      black70: "#4d4d4d",
      black65: "#595959",
      black60: "#666666",
      black55: "#737373",
      black50: "#808080",
      black45: "#8c8c8c",
      black40: "#999999",
      black35: "#a6a6a6",
      black30: "#b3b3b3",
      black25: "#bfbfbf",
      black20: "#cccccc",
      black15: "#d9d9d9",
      black10: "#e6e6e6",
      black05: "#f5f5f5",
      black02: "#fafafa",
      white: "#ffffff",
      // medium colors
      reactionBlue: "#1999dd",
      reactionBlue100: "#ecf8fe",
      reactionBlue200: "#d6e5ed",
      reactionBlue300: "#26b0f9",
      reactionBlue400: "#067ebe",
      reactionBlue500: "#285268",
      reactionBlue600: "#172f3c",
      coolGrey: "#5e7480",
      coolGrey100: "#e3ebf0",
      coolGrey200: "#d5d5d5",
      coolGrey300: "#5d8ea9",
      coolGrey400: "#3c5d6f",
      coolGrey500: "#3c3c3c",
      coolGrey600: "#1d1d1d",
      // dark colors
      forestGreen: "#158562",
      forestGreen100: "#dcfaf1",
      forestGreen200: "#b4ddc1",
      forestGreen300: "#0db781",
      forestGreen400: "#066144",
      forestGreen500: "#285749",
      forestGreen600: "#1e4035",
      darkBlue: "#23566d",
      darkBlue100: "#d9ebf3",
      darkBlue200: "#c4d3da",
      darkBlue300: "#135471",
      darkBlue400: "#103a4d",
      darkBlue500: "#333f45",
      darkBlue600: "#242c30",
      // support colors
      yellow: "#3fc95f",
      yellow100: "#fcf3dc",
      yellow200: "#e9e1cb",
      yellow300: "#fdda79",
      yellow400: "#fbc120",
      yellow500: "#a2832d",
      yellow600: "#7a6322",
      red: "#cd3f4c",
      red100: "#ffeeef",
      red200: "#f0e8e9",
      red300: "#e54f5d",
      red400: "#bc1d2b",
      red500: "#5e3033",
      red600: "#3c1f21",
      pageLoading: {
        innerColor: "#1999dd",
        outerColor: "rgba(9.80392156862745%,59.99999999999995%,86.66666666666667%,0.122)"
      },
      teal: "#8ce0c9",
      teal100: "#edfdf8",
      teal200: "#d9ece6",
      teal300: "#a3f2dc",
      teal400: "#55e4be",
      teal500: "#447467",
      teal600: "#34584f"
    }
  },
  borderRadii: {
    default: 2
  },
  boxShadow: {
    depth0: "none",
    depth1: "0 0 1rem -0.5rem #808080",
    depth2: "0 0 1rem #808080"
  },
  typography: {
    fontFamily: "Source Sans Pro, Helvetica Neue, Helvetica, sans-serif",
    fontSize: 16,
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    subtitle2: {
      fontSize: 14,
      color: "#737373"
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
      color: "#595959"
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 600,
      color: "#3c3c3c"
    }
  }
});

export default theme;
