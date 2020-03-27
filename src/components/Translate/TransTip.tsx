import { Callout, Spinner } from "office-ui-fabric-react";
import React from "react";

import { useBingTranslate } from "../../hooks/translate/useBingTranslate";
import TransContent from "./TransContent";
import translateIcon from "./Translate.svg";
import styles from "./TransTip.module.scss";

interface ITranslateTipProps {
  top: number;
  left: number;
  text: string;
}

const TransTip: React.FC<ITranslateTipProps> = ({ top, left, text }) => {
  const { word, loading, reFetch } = useBingTranslate(text, false);
  const [visible, setVisible] = React.useState<boolean>(false);
  const tipRef = React.useRef<HTMLDivElement>(null);
  return (
    <>
      <div
        style={{
          top,
          left
        }}
        ref={tipRef}
        className={styles.tip}
        onClick={() => {
          !loading && reFetch();
          !visible && setVisible(true);
        }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <img
            src={chrome.runtime.getURL(translateIcon)}
            alt="translate icon"
          ></img>
        )}
      </div>
      {word && visible && !loading ? (
        <Callout
          className={styles.callout}
          role="translate dialog"
          gapSpace={10}
          target={tipRef.current}
          onDismiss={() => setVisible(false)}
        >
          <TransContent word={word} />
        </Callout>
      ) : null}
    </>
  );
};

export default TransTip;
