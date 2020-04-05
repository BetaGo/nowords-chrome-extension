import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  Typography,
  CardProps,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MicIcon from "@material-ui/icons/Mic";
import React from "react";

import { Word } from "../../api/word";
import { MessageType } from "../../common/Message";
import Operation from "./Operation";

type ITransContentProps = Partial<CardProps> & {
  word: Word;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 350,
      maxWidth: 500,
      maxHeight: 600,
      overflow: "auto",

      "& .NoWord-MuiCardHeader-root": {
        paddingBottom: 0,
      },
    },
  })
);

const TransContent: React.FC<ITransContentProps> = ({ word, ...restProps }) => {
  const classes = useStyles();

  const playWordAudio = (audioUrl: string) => {
    chrome.runtime.sendMessage({
      type: MessageType.playAudio,
      payload: audioUrl,
    });
  };

  return (
    <Card className={classes.root} {...restProps}>
      <CardHeader
        action={<Operation word={word.text} />}
        title={word.text}
        subheader={
          <div>
            {word.phonetic.en && (
              <Typography color="textSecondary" variant="body2">
                <span>EN:</span>
                {word.phonetic.en.text && (
                  <span>【{word.phonetic.en.text}】</span>
                )}
                {word.phonetic.en.mediaUrl && (
                  <IconButton
                    size="small"
                    onClick={() => playWordAudio(word.phonetic.en!.mediaUrl!)}
                  >
                    <MicIcon />
                  </IconButton>
                )}
              </Typography>
            )}
            {word.phonetic.us && (
              <Typography color="textSecondary" variant="body2">
                <span>US:</span>
                {word.phonetic.us.text && (
                  <span>【{word.phonetic.us.text}】</span>
                )}
                {word.phonetic.us.mediaUrl && (
                  <IconButton
                    size="small"
                    onClick={() => playWordAudio(word.phonetic.us!.mediaUrl!)}
                  >
                    <MicIcon />
                  </IconButton>
                )}
              </Typography>
            )}
          </div>
        }
      />
      <CardContent>
        {word.means.length !== 0 ? (
          word.means.map((v) => (
            <Typography variant="body2" gutterBottom>
              <Grid container justify="center" alignItems="center">
                <Grid item xs={2}>
                  <Chip label={v.label} size="small" color="secondary" />{" "}
                </Grid>
                <Grid item xs={10}>
                  {v.content.join("；")}
                </Grid>
              </Grid>
            </Typography>
          ))
        ) : (
          <Typography>对不起,没有查到相关翻译.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TransContent;
