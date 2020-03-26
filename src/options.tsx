import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import ReactDOM from "react-dom";

import { authorizedClient } from "./common/graphql";
import OptionsPage from "./pages/OptionsPage";

const App = () => (
  <ApolloProvider client={authorizedClient}>
    <OptionsPage />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
