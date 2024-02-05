export namespace CreateMessage {
  export interface Props {
    roomId: string;
    uid: string;
    name: string;
    content: string;
    image: string;
  }
}

export interface Message {
  content: string;
  image: string;
  name: string;
  timestamp: string;
  uid: string;
}

export interface Messages {
  [name: string]: Message;
}
