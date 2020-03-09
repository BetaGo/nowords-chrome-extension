export enum MessageType {
  translateWord
}

export class Message<T> {
  constructor(public type: MessageType, public payload: T) {}
}
