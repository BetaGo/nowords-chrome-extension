import "./index.css";

import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";

import { authorizedClient } from "./common/graphql";
import { useThemeMode } from "./hooks/useThemeMode";
import PopupPage from "./pages/PopupPage";
import { materialDarkTheme } from "./theme/dark";
import { materialLightTheme } from "./theme/light";

const App = () => {
  const themeMode = useThemeMode();
  return (
    <ApolloProvider client={authorizedClient}>
      <ThemeProvider
        theme={themeMode === "dark" ? materialDarkTheme : materialLightTheme}
      >
        <PopupPage />
      </ThemeProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
