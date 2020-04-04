import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "@material-ui/core";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import { useMedia } from "react-use";

import { authorizedClient } from "./common/graphql";
import TransTip from "./components/Translate/TransTip";
import { materialDarkTheme } from "./theme/dark";
import { materialLightTheme } from "./theme/light";

const INJECT_ELEMENT_ID = "___NO__WORLD___";

interface IContentScriptAppProps {
  top: number;
  left: number;
  text: string;
}

const generateClassName = createGenerateClassName({
  productionPrefix: "NoWord",
  seed: "__no__word__extension__",
});

const App: React.FC<IContentScriptAppProps> = ({ top, left, text }) => {
  const isDark = useMedia("(prefers-color-scheme: dark)");
  return (
    <ApolloProvider client={authorizedClient}>
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={isDark ? materialDarkTheme : materialLightTheme}>
          <TransTip top={top} left={left} text={text} />
        </ThemeProvider>
      </StylesProvider>
    </ApolloProvider>
  );
};

const injectElement = (top: number, left: number) => {
  const selection = document.getSelection();
  let el = document.getElementById(INJECT_ELEMENT_ID);

  if (!selection || selection.rangeCount === 0) {
    if (el) el.remove();
    el = null;
    return;
  }

  const text = selection.toString().trim() || "";

  if (text.length === 0) {
    if (el) el.remove();
    el = null;
    return;
  }

  if (el) {
    if (el.getAttribute("data-text") !== text) {
      el.remove();
      el = null;
    } else {
      return;
    }
  }

  if (!el) {
    el = document.createElement("div");
    el.setAttribute("id", INJECT_ELEMENT_ID);
    el.setAttribute("data-text", text);

    document.body.appendChild(el);
  }

  ReactDOM.render(<App top={top} left={left} text={text} />, el);
};

const onMouseUp = (e: MouseEvent) => {
  const path = e.composedPath();
  if (path.length > 0) {
    const firstTagName = _.get(path, "[0].tagName", "");
    if (firstTagName === "INPUT" || firstTagName === "TEXTAREA") return;
    if (path.findIndex((e) => _.get(e, "id") === INJECT_ELEMENT_ID) >= 0)
      return;
    let left = Math.min(e.clientX + 30, window.innerWidth - 30);
    let top = Math.max(0, e.clientY - 30);
    injectElement(top, left);
  }
};

document.addEventListener("mouseup", onMouseUp);
