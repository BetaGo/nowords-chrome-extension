import { CircularProgress, Fab, RootRef } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TranslateIcon from "@material-ui/icons/Translate";
import React from "react";

import { useBingTranslate } from "../../hooks/translate/useBingTranslate";
import TransContent from "./TransContent";

interface ITranslateTipProps {
  top: number;
  left: number;
  text: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      zIndex: 2147483647,
    },
    wrapper: {
      position: "relative",
    },
    fabProgress: {
      position: "absolute",
      top: -6,
      left: -6,
      zIndex: 1,
    },
  })
);

const TransTip: React.FC<ITranslateTipProps> = ({ top, left, text }) => {
  const { word, loading, reFetch } = useBingTranslate(text, false);
  const [visible, setVisible] = React.useState<boolean>(false);
  const tipRef = React.useRef<Element>(null);

  const classes = useStyles();

  return (
    <ScopedCssBaseline>
      <div
        className={classes.root}
        style={{
          top,
          left,
        }}
      >
        <div className={classes.wrapper}>
          <RootRef rootRef={tipRef}>
            <Fab
              size="small"
              color="primary"
              onClick={() => {
                !loading && reFetch();
                !visible && setVisible(true);
              }}
            >
              <TranslateIcon />
            </Fab>
          </RootRef>
          {loading && (
            <CircularProgress size={52} className={classes.fabProgress} />
          )}
        </div>
      </div>
      <Popover
        onClose={() => setVisible(false)}
        open={!!(word && visible && !loading)}
        anchorEl={tipRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {word && <TransContent word={word} />}
      </Popover>
    </ScopedCssBaseline>
  );
};

export default TransTip;
