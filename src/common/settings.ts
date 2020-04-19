import _ from "lodash";
import EventEmitter from "eventemitter3";

export type IConfigCallback = (v: ISettingsConfig) => void;

export type ISettingsConfig = {
  theme: "light" | "dark" | "auto";
};

export const defaultSettings: ISettingsConfig = {
  theme: "auto",
};

/**
 * Settings 仅允许有一个实例
 */
export class Settings {
  private static instance: Settings;

  private _settings: ISettingsConfig = defaultSettings;
  private _EE: EventEmitter;
  private readonly _changeEventName = "settingsChange";

  private constructor() {
    this._EE = new EventEmitter();
    this.loadSettings();
  }

  public static getInstance() {
    if (!Settings.instance) {
      Settings.instance = new Settings();
    }

    return Settings.instance;
  }

  loadSettings = () => {
    return new Promise((resolve) => {
      chrome.storage.sync.get({ settings: "" }, (items) => {
        try {
          this._settings = JSON.parse(items.settings);
        } catch (error) {
          this._settings = defaultSettings;
        }
        this._EE.emit(this._changeEventName, _.cloneDeep(this._settings));
        resolve(items.settings);
      });
    });
  };

  get<K extends keyof ISettingsConfig>(
    key: K,
    defaultValue: ISettingsConfig[K]
  ): ISettingsConfig[K] {
    return _.get(this._settings, key, defaultValue);
  }

  set<K extends keyof ISettingsConfig>(key: K, value: ISettingsConfig[K]) {
    _.set(this._settings, key, value);
    const settingsStr = JSON.stringify(this._settings);
    chrome.storage.sync.set(
      {
        settings: settingsStr,
      },
      () => {
        this._EE.emit(this._changeEventName, _.cloneDeep(this._settings));
      }
    );
  }

  getAll(): ISettingsConfig {
    return _.cloneDeep(this._settings);
  }

  addListener(cb: IConfigCallback) {
    this._EE.on(this._changeEventName, cb);
  }

  removeListener(cb: IConfigCallback) {
    this._EE.removeListener(this._changeEventName, cb);
  }

  removeAllListener() {
    this._EE.removeAllListeners();
  }
}
