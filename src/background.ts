import { MessageType, FetchMessageResponse, IMessage } from "./common/Message";
import { bingTranslate } from "./api/translate";
import { Word } from "./api/word";

chrome.runtime.onMessage.addListener(
  (message: IMessage<any>, sender, sendResponse) => {
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
        const audio = new Audio(message.payload);
        audio.play();
        return;
      }
      case MessageType.fetch: {
        sendResponse(fetch(message.payload.input, message.payload.init));
        return true;
      }
      default:
        break;
    }
  }
);

export {};
