/// <reference types="chromium-extension-react-scripts" />

declare module "jsencrypt" {
  export class JSEncrypt {
    constructor();
    setPublicKey(pk: string): void;
    encrypt(key: string): string;
  }
}

declare module "react-shadow";
