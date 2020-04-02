import {
  classNamesFunction,
  loadTheme,
  SearchBox,
  Spinner,
  styled
} from "@fluentui/react";
import React, { useEffect, useState } from "react";
import { useMedia } from "react-use";

import { bingTranslate } from "../api/translate";
import { Word } from "../api/word";
import TransContent from "../components/Translate/TransContent";
import { darkTheme } from "../theme/dark";
import { lightTheme } from "../theme/light";
import { styles } from "./Page.styles";
import { IPageProps, IPageStyleProps, IPageStyles } from "./Page.types";

const getClassNames = classNamesFunction<IPageStyleProps, IPageStyles>();

const PopupPage: React.FC<IPageProps> = ({ theme, styles }) => {
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

  const classNames = getClassNames(styles, { theme: theme! });

  return (
    <div className={classNames.root}>
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

export default styled<IPageProps, IPageStyleProps, IPageStyles>(
  PopupPage,
  styles
);
