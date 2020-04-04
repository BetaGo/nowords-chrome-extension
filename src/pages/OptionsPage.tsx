import { CssBaseline } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useSearchParam } from "react-use";

import Login from "../components/Options/Login";
import { useLoginStatus } from "../hooks/useLoginStatus";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignContent: "center",
      justifyContent: "center",
      background: theme.palette.background.default,
      width: "100%",
      height: "100%",
    },
  })
);

const OptionsPage = () => {
  const { isLogin, loading: isLoadingLoginStatus } = useLoginStatus();

  const accessToken = useSearchParam("accessToken");
  const refreshToken = useSearchParam("refreshToken");
  const classes = useStyles();

  useEffect(() => {
    if (accessToken && refreshToken) {
      chrome.storage.sync.set(
        {
          accessToken,
          refreshToken,
        },
        () => {
          window.history.replaceState({}, "", window.location.pathname);
        }
      );
    }
  }, [accessToken, refreshToken]);

  if (isLoadingLoginStatus) return null;

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        {isLogin ? <div>配置页</div> : <Login />}
      </div>
    </>
  );
};

export default OptionsPage;
