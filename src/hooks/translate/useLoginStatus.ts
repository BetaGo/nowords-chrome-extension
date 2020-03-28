import React, { useEffect, useState } from "react";
import { useLocation } from "react-use";

export const useLoginStatus = () => {
  const [isLogin, setIsLogin] = useState(false);

  const state = useLocation();

  useEffect(() => {
    chrome.storage.sync.get({ accessToken: "", refreshToken: "" }, items => {
      if (items.accessToken && items.refreshToken) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, [state]);

  return isLogin;
};
