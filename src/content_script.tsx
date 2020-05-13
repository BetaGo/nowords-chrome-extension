import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "@material-ui/core";
import {
  createGenerateClassName,
  StylesProvider,
} from "@material-ui/core/styles";
import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";

import { authorizedClient } from "./common/graphql";
import ShadowDom from "./components/ShadowDom/ShadowDom";
import TransTip from "./components/Translate/TransTip";
import { useThemeMode } from "./hooks/useThemeMode";
import { csMaterialDarkTheme } from "./theme/dark";
import { csMaterialLightTheme } from "./theme/light";

const INJECT_ELEMENT_ID = "___NO__WORLD___";

interface IContentScriptAppProps {
  top: number;
  left: number;
  text: string;
  onRemove: () => void;
}

const generateClassName = createGenerateClassName({
  productionPrefix: "NoWord",
  seed: "___NO__WORLD___",
});

const App: React.FC<IContentScriptAppProps> = ({
  top,
  left,
  text,
  onRemove,
}) => {
  const themeMode = useThemeMode();
  return (
    <ApolloProvider client={authorizedClient}>
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider
          theme={
            themeMode === "dark" ? csMaterialDarkTheme : csMaterialLightTheme
          }
        >
          <ShadowDom>
            <TransTip top={top} left={left} text={text} onRemove={onRemove} />
          </ShadowDom>
        </ThemeProvider>
      </StylesProvider>
    </ApolloProvider>
  );
};

const injectElement = (top: number, left: number) => {
  const selection = document.getSelection();
  let el = document.getElementById(INJECT_ELEMENT_ID);

  const text = selection?.toString().trim() || "";

  const removeElement = () => {
    if (el) {
      ReactDOM.unmountComponentAtNode(el);
      el.remove();
      el = null;
    }
  };

  if (!text || text.length === 0) {
    removeElement();
    return;
  }

  // 仅支持英文翻译
  if (!/\w+/.test(text)) {
    removeElement();
    return;
  }

  if (el) {
    if (el.getAttribute("data-text") !== text) {
      removeElement();
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

  ReactDOM.render(
    <App top={top} left={left} text={text} onRemove={removeElement} />,
    el
  );
};

const onMouseUp = (e: MouseEvent) => {
  const path = e.composedPath();
  if (path.length > 0) {
    const firstTagName = _.get(path, "[0].tagName", "");
    if (firstTagName === "INPUT" || firstTagName === "TEXTAREA") return;
    if (path.findIndex((e) => _.get(e, "id") === INJECT_ELEMENT_ID) >= 0) {
      return;
    }
    let left = Math.min(e.clientX + 30, window.innerWidth - 30);
    let top = Math.max(0, e.clientY - 30);

    setTimeout(() => {
      injectElement(top, left);
    }, 0);
  }
};

document.addEventListener("mouseup", onMouseUp);
