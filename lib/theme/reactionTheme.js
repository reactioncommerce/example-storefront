import { createMuiTheme } from "material-ui/styles";
import green from "material-ui/colors/green";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ff0000",
      main: "#ff0000",
      dark: "#ff0000"
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700]
    },
    error: {
      main: "red"
    }
  },
  typography: {
    fontFamily: "Source Sans Pro, Helvetica Neue, Helvetica, sans-serif",
    fontSize: 16,
    fontWeightLight: 200,
    fontWeightRegular: 400,
    fontWeightBold: 700
  }
});

export default theme;
