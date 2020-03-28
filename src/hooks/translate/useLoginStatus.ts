import React, { useEffect, useState } from "react";

export const useLoginStatus = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get({ accessToken: "" }, items => {
      if (items.accessToken) {
        setIsLogin(true);
      }
    });
  }, []);

  return isLogin;
};
