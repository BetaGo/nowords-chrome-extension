import React from "react";

import { bingTranslate } from "../../api/translate";
import { Word } from "../../api/word";

/**
 *
 * @param text 要翻译的文本
 * @param autoFetch 是否在挂载时自动获取数据, 默认自动获取
 */
export const useBingTranslate = (text: string, autoFetch = true) => {
  const [word, setWord] = React.useState<Word | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>({});

  const fetchData = React.useCallback(() => {
    setLoading(true);
    bingTranslate(text)
      .then(word => {
        setWord(word);
      })
      .catch(e => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [text]);

  React.useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  return {
    loading,
    word,
    error,
    reFetch: fetchData
  };
};
