import React, { useEffect, useState, useRef } from "react";

import { Settings, ISettingsConfig, IConfigCallback } from "../common/settings";

export const useSettings = () => {
  const settingsInstanceRef = useRef<Settings | null>(null);

  const [allSettings, setAllSettings] = useState<ISettingsConfig | undefined>(
    settingsInstanceRef.current?.getAll()
  );

  const handleSettingsChange: IConfigCallback = (data) => {
    setAllSettings(data);
  };

  function setSetting<K extends keyof ISettingsConfig>(
    key: K,
    value: ISettingsConfig[K]
  ) {
    settingsInstanceRef.current?.set(key, value);
  }

  useEffect(() => {
    settingsInstanceRef.current = Settings.getInstance();
    settingsInstanceRef.current.addListener(handleSettingsChange);
    return () =>
      settingsInstanceRef.current?.removeListener(handleSettingsChange);
  }, []);

  return { settings: allSettings, setSetting };
};
