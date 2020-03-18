import React from "react";
import { Text } from "office-ui-fabric-react";

import { Word } from "../../api/word";
import styles from "./TransContent.module.scss";

const TransContent: React.FC<{ word: Word }> = ({ word }) => {
  if (!word.means.length) {
    return <div className={styles.root}>对不起,没有查到相关翻译.</div>;
  }
  return (
    <div className={styles.root}>
      <Text variant="xLarge">{word.text}</Text>
      <div className={styles.block}>
        {word.phonetic.en && (
          <Text block variant="medium">
            <span>EN:</span>
            {word.phonetic.en.text && <span>【{word.phonetic.en.text}】</span>}
          </Text>
        )}
        {word.phonetic.us && (
          <Text block variant="medium">
            <span>US:</span>
            {word.phonetic.us.text && <span>【{word.phonetic.us.text}】</span>}
          </Text>
        )}
      </div>
      {word.means.length !== 0 && (
        <div className={`${styles.block} ${styles.means}`}>
          <Text block variant="large">
            单词释义:
          </Text>
          {word.means.map(v => (
            <Text block variant="medium" className={styles.row}>
              <span className={styles.label}>{v.label}</span>
              <span>{v.content.join("；")}</span>
            </Text>
          ))}
        </div>
      )}
      {word.advancedMeans.length !== 0 && (
        <div className={styles.block}>
          <Text block variant="large">
            详细释义:
          </Text>
          {word.advancedMeans.map(v => (
            <div className={styles.row}>
              <Text block variant="mediumPlus">
                {v.label}
              </Text>
              <div>
                {v.content.map(c => (
                  <Text block variant="medium">
                    <div>{c.mean}</div>
                    {c.sample && <div>{c.sample}</div>}
                    {c.translatedSample && <div>{c.translatedSample}</div>}
                  </Text>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransContent;
