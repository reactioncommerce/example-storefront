import { createMuiTheme } from "material-ui/styles";

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
    }
  },
  typography: {
    fontFamily: "Source Sans Pro, Helvetica Neue, Helvetica, sans-serif",
    fontSize: 16,
    fontWeightLight: 200,
    fontWeightRegular: 400,
    fontWeightBold: 700
  },
  overrides: {
    MuiTypography: {
      smallText: {
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1",
        color: "#777"
      }
    }
  }
});

export default theme;
