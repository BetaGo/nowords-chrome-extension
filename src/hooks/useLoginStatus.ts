import { useState, useLayoutEffect, useRef } from "react";

export const useLoginStatus = () => {
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const storageChangeListenerRef = useRef((changes: any) => {
    const accessTokenChange = changes.accessToken;
    if (accessTokenChange) {
      if (accessTokenChange.oldValue && !accessTokenChange.newValue) {
        setIsLogin(false);
      } else if (!accessTokenChange.oldValue && accessTokenChange.newValue) {
        setIsLogin(true);
      }
    }
  });

  const logout = () => {
    chrome.storage.sync.set({ accessToken: "", refreshToken: "" });
  };

  useLayoutEffect(() => {
    chrome.storage.sync.get({ accessToken: "", refreshToken: "" }, (items) => {
      if (items.accessToken && items.refreshToken) {
        setIsLogin(true);
        setLoading(false);
      } else {
        setIsLogin(false);
        setLoading(false);
      }
    });

    const listener = storageChangeListenerRef.current;
    chrome.storage.onChanged.addListener(listener);

    return () => chrome.storage.onChanged.removeListener(listener);
  }, []);

  return { isLogin, loading, logout };
};
