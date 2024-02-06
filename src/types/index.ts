export namespace CreateMessage {
  export interface Props {
    roomId: string;
    uid: string;
    name: string;
    content: string;
    image: string;
  }
}

export namespace FavoriteFamily {
  export interface Favorite {
    uid: string;
    roomId: string;
    roomName: string;
  }

  export interface Favorites {
    [key: string]: Favorite;
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
