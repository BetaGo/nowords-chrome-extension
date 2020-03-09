import React from "react";
import {
  DefaultButton,
  FocusTrapCallout,
  Stack,
  FocusZone,
  PrimaryButton
} from "office-ui-fabric-react";
import translateIcon from "./Translate.svg";
import TransContent from "./TransContent";

import styles from "./TransTip.module.scss";

interface ITranslateTipProps {
  top: number;
  left: number;
  text: string;
}

const TransTip: React.FC<ITranslateTipProps> = ({ top, left, text }) => {
  const [contentVisible, setContentVisible] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);
  console.log("contentVisible", contentVisible);
  return (
    <>
      <img
        ref={imgRef}
        style={{
          top,
          left
        }}
        className={styles.tip}
        src={chrome.runtime.getURL(translateIcon)}
        alt="translate icon"
        onClick={() => setContentVisible(true)}
      ></img>
      {contentVisible ? (
        <div
          className={styles.content}
          style={{
            top,
            left: left + 30
          }}
        >
          <TransContent text={text} />
        </div>
      ) : null}
    </>
  );
};

export default TransTip;
