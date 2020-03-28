import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import { initializeIcons } from "@uifabric/icons";

import TransTip from "./components/Translate/TransTip";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./common/graphql";

initializeIcons(chrome.runtime.getURL("/fonts/"));

const INJECT_ELEMENT_ID = "___NO__WORLD___";

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

  ReactDOM.render(
    <ApolloProvider client={client}>
      <TransTip top={top} left={left} text={text} />
    </ApolloProvider>,
    el
  );
};

const onMouseUp = (e: MouseEvent) => {
  const path = e.composedPath();
  if (path.length > 0) {
    const firstTagName = _.get(path, "[0].tagName", "");
    if (firstTagName === "INPUT" || firstTagName === "TEXTAREA") return;
    if (path.findIndex(e => _.get(e, "id") === INJECT_ELEMENT_ID) >= 0) return;
    let left = Math.min(e.clientX + 30, window.innerWidth - 30);
    let top = Math.max(0, e.clientY - 30);
    injectElement(top, left);
  }
};

document.addEventListener("mouseup", onMouseUp);
