import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core";

import { authorizedClient } from "./common/graphql";
import OptionsPage from "./pages/OptionsPage";

import { materialDarkTheme } from "./theme/dark";
import { materialLightTheme } from "./theme/light";
import { useMedia } from "react-use";

import "./index.css";

const App = () => {
  const isDark = useMedia("(prefers-color-scheme: dark)");
  return (
    <ApolloProvider client={authorizedClient}>
      <ThemeProvider theme={isDark ? materialDarkTheme : materialLightTheme}>
        <OptionsPage />
      </ThemeProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
