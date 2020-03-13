export enum MessageType {
  translateWord
}

export class Message<T = {}> {
  constructor(public type: MessageType, public payload: T) {}
}

export class FetchMessageResponse<T = {}> {
  constructor(public success: boolean, public data: T) {}
}
