import { CircularProgress, InputBase, CssBaseline } from "@material-ui/core";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import { Search as SearchIcon } from "@material-ui/icons";
import React, { useEffect, useState } from "react";

import { bingTranslate } from "../api/translate";
import { Word } from "../api/word";
import TransContent from "../components/Translate/TransContent";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: theme.palette.background.default,
      minWidth: 280,
      padding: theme.spacing(2),
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(
        theme.palette.type === "dark"
          ? theme.palette.common.white
          : theme.palette.common.black,
        0.15
      ),
      "&:hover": {
        backgroundColor: fade(
          theme.palette.type === "dark"
            ? theme.palette.common.white
            : theme.palette.common.black,
          0.25
        ),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: "100%",
    },
    progressWrapper: {
      marginTop: theme.spacing(2),
      textAlign: "center",
    },
    contentWrapper: {
      marginTop: theme.spacing(2),
    },
  })
);

const PopupPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [word, setWord] = useState<Word | null>(null);
  const [inputText, setInputText] = useState<string>("");

  const classes = useStyles();

  const translate = async (text: string) => {
    if (!text) return;
    setLoading(true);
    const word = await bingTranslate(text);
    setWord(word);
    setLoading(false);
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            autoFocus
            placeholder="Search Word"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            value={inputText}
            inputProps={{ "aria-label": "search word" }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                translate(inputText);
              }
            }}
          />
        </div>
        {loading && (
          <div className={classes.progressWrapper}>
            <CircularProgress />
          </div>
        )}
        {word && (
          <div className={classes.contentWrapper}>
            <TransContent word={word} variant="outlined" />
          </div>
        )}
      </div>
    </>
  );
};

export default PopupPage;
