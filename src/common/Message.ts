export enum MessageType {
  translateWord,
  playAudio,
  fetch
}

export interface IMessage<T = {}> {
  type: MessageType;
  payload: T;
}

export class FetchMessageResponse<T = {}> {
  constructor(public success: boolean, public data: T) {}
}
