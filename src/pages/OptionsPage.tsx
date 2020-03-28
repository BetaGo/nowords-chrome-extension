import React, { useEffect } from "react";
import { useSearchParam } from "react-use";
import Login from "../components/Options/Login";
import { useLoginStatus } from "../hooks/translate/useLoginStatus";

const OptionsPage = () => {
  const isLogin = useLoginStatus();

  const accessToken = useSearchParam("accessToken");
  const refreshToken = useSearchParam("refreshToken");

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
