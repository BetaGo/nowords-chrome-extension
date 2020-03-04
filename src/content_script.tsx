import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

const INJECT_ELEMENT_ID = "___NO__WORLD___";

const injectElement = () => {
  const selection = document.getSelection();

  if (!selection || selection.rangeCount === 0) return;

  const selectionRange = selection.getRangeAt(0);
  const selectionRect = selectionRange.getBoundingClientRect();

  if (selectionRect.x === 0 && selectionRect.y === 0) return;

  const q = selection.toString().trim() || "";

  let el = document.getElementById(INJECT_ELEMENT_ID);

  ReactDOM.render(
    <div
      style={{
        position: "fixed",
        top: selectionRect.top,
        left: selectionRect.left,
        padding: "1em",
        background: "green"
      }}
    >
      {q}
    </div>,
    el
  );
};

const onMouseUp = (e: MouseEvent) => {
  const path = e.composedPath();
  if (path.length > 0) {
    const firstTagName = _.get(path, "[0].tagName", "");
    if (firstTagName === "INPUT" || firstTagName === "TEXTAREA") return;
    if (path.findIndex(e => _.get(e, "id") === INJECT_ELEMENT_ID) >= 0) return;
    injectElement();
  }
};

document.addEventListener("mouseup", onMouseUp);
