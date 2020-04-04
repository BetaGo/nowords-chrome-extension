import React, { useEffect, useState } from "react";
import { useLocation } from "react-use";

export const useLoginStatus = () => {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const state = useLocation();

  useEffect(() => {
    chrome.storage.sync.get({ accessToken: "", refreshToken: "" }, (items) => {
      if (items.accessToken && items.refreshToken) {
        setIsLogin(true);
        setLoading(false);
      } else {
        setIsLogin(false);
        setLoading(false);
      }
    });
  }, [state]);

  return { isLogin, loading };
};
