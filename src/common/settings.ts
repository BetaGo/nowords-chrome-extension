/**
 * Settings 仅允许有一个实例
 */
export class Settings {
  private static instance: Settings;

  private _settings: any;

  private constructor() {}

  load() {}
}
