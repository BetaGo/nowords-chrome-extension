import React from "react";
import {
  DefaultButton,
  FocusTrapCallout,
  Stack,
  FocusZone,
  PrimaryButton,
  Spinner
} from "office-ui-fabric-react";
import translateIcon from "./Translate.svg";
import TransContent from "./TransContent";

import styles from "./TransTip.module.scss";
import { useBingTranslate } from "../../hooks/translate/useBingTranslate";

interface ITranslateTipProps {
  top: number;
  left: number;
  text: string;
}

const TransTip: React.FC<ITranslateTipProps> = ({ top, left, text }) => {
  const { word, loading, reFetch } = useBingTranslate(text, false);
  const imgRef = React.useRef<HTMLImageElement>(null);
  return (
    <>
      <div
        style={{
          top,
          left
        }}
        className={styles.tip}
        onClick={() => {
          !loading && reFetch();
        }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <img
            ref={imgRef}
            src={chrome.runtime.getURL(translateIcon)}
            alt="translate icon"
          ></img>
        )}
      </div>
      {word ? (
        <div
          className={styles.content}
          style={{
            top,
            left: left + 30
          }}
        >
          <TransContent word={word} />
        </div>
      ) : null}
    </>
  );
};

export default TransTip;
