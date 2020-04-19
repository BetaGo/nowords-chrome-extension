import { useState, useRef, useLayoutEffect } from "react";

import { Settings, ISettingsConfig, IConfigCallback } from "../common/settings";

export const useSettings = () => {
  const settingsInstanceRef = useRef<Settings>(Settings.getInstance());

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

  useLayoutEffect(() => {
    const settingsInstance = settingsInstanceRef.current;
    settingsInstance.addListener(handleSettingsChange);

    return () => settingsInstance.removeListener(handleSettingsChange);
  }, []);

  return { settings: allSettings, setSetting };
};
