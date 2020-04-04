import "./index.css";

import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "@material-ui/core";
import { initializeIcons } from "@uifabric/icons";
import React from "react";
import ReactDOM from "react-dom";
import { useMedia } from "react-use";

import { authorizedClient } from "./common/graphql";
import PopupPage from "./pages/PopupPage";
import { materialDarkTheme } from "./theme/dark";
import { materialLightTheme } from "./theme/light";

initializeIcons(chrome.runtime.getURL("/fonts/"));

const App = () => {
  const isDark = useMedia("(prefers-color-scheme: dark)");
  return (
    <ApolloProvider client={authorizedClient}>
      <ThemeProvider theme={isDark ? materialDarkTheme : materialLightTheme}>
        <PopupPage />
      </ThemeProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
