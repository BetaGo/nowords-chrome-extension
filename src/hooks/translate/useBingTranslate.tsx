import React from "react";
import { Word } from "../../api/word";
import {
  IMessage,
  MessageType,
  FetchMessageResponse
} from "../../common/Message";

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
    const message: IMessage = {
      type: MessageType.translateWord,
      payload: text
    };
    chrome.runtime.sendMessage(message, function(
      response: FetchMessageResponse<Word>
    ) {
      setLoading(false);
      if (response.success) {
        setWord(response.data);
      } else {
        setError(response.data);
      }
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
