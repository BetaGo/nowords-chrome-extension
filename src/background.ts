import { MessageType, FetchMessageResponse } from "./common/Message";
import { bingTranslate } from "./api/translate";
import { Word } from "./api/word";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case MessageType.translateWord: {
      bingTranslate(message.payload)
        .then(res => {
          sendResponse(new FetchMessageResponse<Word>(true, res));
        })
        .catch(e => {
          sendResponse(new FetchMessageResponse(false, e));
        });
      return true;
    }
    case MessageType.playAudio: {
      var audio = new Audio(message.payload);
      audio.play();
      return;
    }
    default:
      break;
  }
});

export {};
