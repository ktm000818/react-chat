export type Uid = {
  uid: string;
};

export type Room = {
  roomId: string;
  roomName: string;
};

export type Image = {
  image: string;
};

export type Message = Image & Uid & {
  content: string;
  name: string;
  timestamp: string;
};

export type Messages = Record<string, Message>;

/** Favorite */
export namespace FavoriteFamily {
  export type Favorite = Uid & Room;
  export type Favorites = Record<string, Favorite>;
};

/** User */
export type User = {
  image: string;
  isLogin: boolean;
  name: string;
  uid: string;
};
export type UserList = Record<string, User>;

/** Member */
export type Member = User & { superPermission: boolean };
export type Members = Record<string, Member>;

/** Chatroom */
export type ChatRoom = Uid & Room & {
  createdAt: string;
  description: string;
  members: Members;
}
export type ChatRoomList = Record<string, ChatRoom>;