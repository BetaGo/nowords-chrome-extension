import { loadTheme, SearchBox, Spinner } from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { useMedia } from "react-use";

import { bingTranslate } from "../api/translate";
import { Word } from "../api/word";
import TransContent from "../components/Translate/TransContent";
import { darkTheme } from "../theme/dark";
import { lightTheme } from "../theme/light";

const PopupPage = () => {
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState<Word | null>(null);
  const isDark = useMedia("(prefers-color-scheme: dark)");

  useEffect(() => {
    if (isDark) {
      loadTheme(darkTheme);
    } else {
      loadTheme(lightTheme);
    }
  }, [isDark]);

  const translate = async (text: string) => {
    setLoading(true);
    const word = await bingTranslate(text);
    setWord(word);
    setLoading(false);
  };

  return (
    <div>
      <SearchBox
        styles={{ root: { width: 260 } }}
        placeholder="Search Word"
        onSearch={translate}
      />
      {loading && <Spinner label="loading" />}
      {word && <TransContent word={word} />}
    </div>
  );
};

export default PopupPage;
