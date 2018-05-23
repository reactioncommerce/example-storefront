import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
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
      default: "1px solid #5e7480"
    },
    reaction: {
      activeElementBorderColor: "#94E8D1",
      activeElementBackground: "#E6E6E6",
      bestseller: "#8CE0C9",
      borderColor: "#CCCCCC"
    }
  },
  borderRadii: {
    default: 2
  },
  spacing: {
    unithalf: 4
  },
  typography: {
    fontFamily: "Source Sans Pro, Helvetica Neue, Helvetica, sans-serif",
    fontSize: 16,
    fontWeightLight: 200,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 700
  }
});

export default theme;
