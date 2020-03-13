import { MessageType, FetchMessageResponse } from "./common/Message";
import { bingTranslate } from "./api/translate";
import { Word } from "./api/word";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === MessageType.translateWord) {
    console.log("message", message);
    bingTranslate(message.payload).then(res => {
      console.log("res", res);
      sendResponse(new FetchMessageResponse<Word>(true, res));
    }).catch(e => {
      sendResponse(new FetchMessageResponse(false, e))
    });
    return true;
  }
});

export {};
