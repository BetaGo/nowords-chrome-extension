import { StylesProvider } from "@material-ui/core/styles";
import { Jss } from "jss";
import React from "react";

const ShadowJss: React.FC<{ jss?: Jss }> = ({ jss, children }) => {
  if (!jss) return null;
  return <StylesProvider jss={jss}>{children}</StylesProvider>;
};

export default ShadowJss;
