import { loadTheme } from "@fluentui/react";
import React, { useEffect } from "react";
import { useMedia, useSearchParam } from "react-use";

import Login from "../components/Options/Login";
import { useLoginStatus } from "../hooks/useLoginStatus";
import { darkTheme } from "../theme/dark";
import { lightTheme } from "../theme/light";

const OptionsPage = () => {
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

  if (!isLogin) return <Login />;
  return (
    <div>
      <div>配置页</div>
    </div>
  );
};

export default OptionsPage;
