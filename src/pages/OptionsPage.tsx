import { classNamesFunction, loadTheme, styled } from "@fluentui/react";
import React, { useEffect } from "react";
import { useMedia, useSearchParam } from "react-use";

import Login from "../components/Options/Login";
import { useLoginStatus } from "../hooks/useLoginStatus";
import { darkTheme } from "../theme/dark";
import { lightTheme } from "../theme/light";
import { styles } from "./Page.styles";
import { IPageProps, IPageStyleProps, IPageStyles } from "./Page.types";

const getClassNames = classNamesFunction<IPageStyleProps, IPageStyles>();

const OptionsPage: React.FC<IPageProps> = ({ theme, styles }) => {
  const isLogin = useLoginStatus();

  const accessToken = useSearchParam("accessToken");
  const refreshToken = useSearchParam("refreshToken");
  const isDark = useMedia("(prefers-color-scheme: dark)");

  useEffect(() => {
    if (isDark) {
      loadTheme(darkTheme);
    } else {
      loadTheme(lightTheme);
    }
  }, [isDark]);

  useEffect(() => {
    if (accessToken && refreshToken) {
      chrome.storage.sync.set(
        {
          accessToken,
          refreshToken
        },
        () => {
          window.history.replaceState({}, "", window.location.pathname);
        }
      );
    }
  }, [accessToken, refreshToken]);

  const classNames = getClassNames(styles, { theme: theme! });

  if (!isLogin) return <Login />;
  return (
    <div className={classNames.root}>
      {isLogin ? <div>配置页</div> : <Login />}
    </div>
  );
};

export default styled<IPageProps, IPageStyleProps, IPageStyles>(
  OptionsPage,
  styles
);
