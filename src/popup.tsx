import { ApolloProvider } from "@apollo/react-hooks";
import { initializeIcons } from "@uifabric/icons";
import React from "react";
import ReactDOM from "react-dom";

import { authorizedClient } from "./common/graphql";
import PopupPage from "./pages/PopupPage";

import "./index.css";

initializeIcons(chrome.runtime.getURL("/fonts/"));

const App = () => (
  <ApolloProvider client={authorizedClient}>
    <PopupPage />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
