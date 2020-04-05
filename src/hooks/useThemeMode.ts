import React, { useCallback, useEffect, useState } from "react";
import { useMedia } from "react-use";

import { useSettings } from "./useSettings";

type IThemeMode = "dark" | "light";

export const useThemeMode = () => {
  const { settings } = useSettings();

  const isSystemDark = useMedia("(prefers-color-scheme: dark)");

  const getThemeMode = useCallback(() => {
    if (settings?.theme === "auto") {
      if (isSystemDark) {
        return "dark";
      } else {
        return "light";
      }
    } else {
      return settings?.theme;
    }
  }, [settings, isSystemDark]);

  const [themeMode, setThemeMode] = useState<IThemeMode | undefined>(
    getThemeMode()
  );

  useEffect(() => {
    const mode = getThemeMode();
    setThemeMode(mode);
  }, [getThemeMode, isSystemDark, settings]);

  return themeMode;
};
