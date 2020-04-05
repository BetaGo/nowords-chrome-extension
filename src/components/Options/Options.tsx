import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { useSettings } from "../../hooks/useSettings";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 360,
      margin: "auto",
      textAlign: "center",
      padding: theme.spacing(2),
    },
  })
);

const Options = () => {
  const { settings, setSetting } = useSettings();

  const classes = useStyles();

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSetting("theme", event.target.value as any);
  };

  return (
    <div className={classes.root}>
      <Paper variant="outlined">
        <FormControl component="fieldset">
          <FormLabel component="legend">主题</FormLabel>
          <RadioGroup
            aria-label="theme"
            name="theme"
            value={settings?.theme || ""}
            onChange={handleThemeChange}
          >
            <FormControlLabel value="dark" control={<Radio />} label="暗色" />
            <FormControlLabel value="light" control={<Radio />} label="亮色" />
            <FormControlLabel
              value="auto"
              control={<Radio />}
              label="系统默认"
            />
          </RadioGroup>
        </FormControl>
      </Paper>
    </div>
  );
};

export default Options;
