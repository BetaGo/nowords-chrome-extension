import { IMessage, MessageType } from "./Message";

export const fetch = (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
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
};
