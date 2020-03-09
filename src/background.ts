import { MessageType } from "./common/Message";
import { bingTranslate } from "./api/translate";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === MessageType.translateWord) {
    console.log("message", message);
    bingTranslate(message.payload).then(res => {
      console.log("res", res);
      sendResponse(res);
    });
    return true;
  }
});

export {};
