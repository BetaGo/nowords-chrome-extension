import { IMessage, MessageType } from "./Message";

export function simpleFetch<T = any>(
  input: RequestInfo,
  init: RequestInit & {
    resType: "blob" | "json" | "text";
  }
): Promise<T> {
  const message: IMessage = {
    type: MessageType.fetch,
    payload: {
      input,
      init
    }
  };
  return new Promise(resolve => {
    chrome.runtime.sendMessage(message, res => {
      resolve(res);
    });
  });
}
