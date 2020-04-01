import { IMessage, MessageType } from "./common/Message";

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            css: ["*"]
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});


chrome.runtime.onMessage.addListener(
  (message: IMessage<any>, sender, sendResponse) => {
    switch (message.type) {
      case MessageType.playAudio: {
        const audio = new Audio(message.payload);
        audio.play();
        return;
      }
      case MessageType.fetch: {
        const { resType, ...init } = message.payload;
        fetch(message.payload.input, init)
          .then(res => {
            switch (resType) {
              case "json":
                return res.json();
              case "blob":
                return res.blob();
              case "text":
                return res.text();
              default:
                return res.text();
            }
          })
          .then(d => {
            sendResponse(d);
          });
        return true;
      }
      case MessageType.openOptionsPage: {
        chrome.runtime.openOptionsPage();
        return;
      }
      default:
        break;
    }
  }
);

export {};
