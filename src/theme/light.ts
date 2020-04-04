import { createTheme } from "@fluentui/react";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles";

export const lightTheme = createTheme({
  palette: {
    themePrimary: "#eb4559",
    themeLighterAlt: "#fef7f8",
    themeLighter: "#fcdfe2",
    themeLight: "#f9c4ca",
    themeTertiary: "#f38b97",
    themeSecondary: "#ed596a",
    themeDarkAlt: "#d33d4f",
    themeDark: "#b23442",
    themeDarker: "#832631",
    neutralLighterAlt: "#faf9f8",
    neutralLighter: "#f3f2f1",
    neutralLight: "#edebe9",
    neutralQuaternaryAlt: "#e1dfdd",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c6c4",
    neutralTertiary: "#a19f9d",
    neutralSecondary: "#605e5c",
    neutralPrimaryAlt: "#3b3a39",
    neutralPrimary: "#323130",
    neutralDark: "#201f1e",
    black: "#000000",
    white: "#ffffff"
  }
});

export const materialLightTheme = createMuiTheme({
  palette: {
    secondary: {
      main: "#127bc4",
      light: "rgb(65, 149, 207)",
      dark: "rgb(12, 86, 137)",
      contrastText: "#fff"
    },
    type: "light",
    background: {
      default: "#fff"
    },
    primary: {
      main: "#d63947",
      light: "rgb(222, 96, 107)",
      dark: "rgb(149, 39, 49)",
      contrastText: "#fff"
    }
  }
});
