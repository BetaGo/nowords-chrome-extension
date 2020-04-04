import { createTheme } from "@fluentui/react";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles";

export const darkTheme = createTheme({
  palette: {
    themePrimary: "#eb4559",
    themeLighterAlt: "#090303",
    themeLighter: "#260b0e",
    themeLight: "#46141a",
    themeTertiary: "#8d2934",
    themeSecondary: "#ce3c4d",
    themeDarkAlt: "#ed5567",
    themeDark: "#ef6e7d",
    themeDarker: "#f4939e",
    neutralLighterAlt: "#232323",
    neutralLighter: "#2c2c2c",
    neutralLight: "#3b3b3b",
    neutralQuaternaryAlt: "#444444",
    neutralQuaternary: "#4b4b4b",
    neutralTertiaryAlt: "#6a6a6a",
    neutralTertiary: "#f3f3f3",
    neutralSecondary: "#f5f5f5",
    neutralPrimaryAlt: "#f7f7f7",
    neutralPrimary: "#eeeeee",
    neutralDark: "#fbfbfb",
    black: "#fdfdfd",
    white: "#1a1a1a"
  }
});

export const materialDarkTheme = createMuiTheme({
  palette: {
    secondary: {
      main: "#127bc4",
      light: "rgb(65, 149, 207)",
      dark: "rgb(12, 86, 137)",
      contrastText: "#fff"
    },
    type: "dark",
    background: {
      default: "#121212"
    },
    primary: {
      main: "#d63947",
      light: "rgb(222, 96, 107)",
      dark: "rgb(149, 39, 49)",
      contrastText: "#fff"
    }
  }
});
