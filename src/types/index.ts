export type Uid = { uid: string };
export type IndexedUid = string;
export type MessageId = string;
export type Image = { image: string };
export type RoomId = string;

/** Room */
export type RoomSummary = { roomId: string; roomName: string };
type RoomDetail = { createdAt: number; description: string; members: Members };
export type ChatRoom = RoomSummary & RoomDetail;
export type ChatRoomList = Record<RoomId, ChatRoom>;
export type UserChatRoom = RoomSummary & RoomDetail & { isFavorite: boolean; isSuper: boolean };
export type UserChatRoomList = Record<RoomId, UserChatRoom>;

/** Message */
export type Message = Image & Uid & { content: string; name: string; timestamp: string };
export type Messages = Record<MessageId, Message>;

/** Favorite */
export namespace FavoriteFamily {
  export type Favorite = Uid & RoomSummary;
  export type Favorites = Record<RoomId, Favorite>;
}

/** User */
export type User = { image: string; isLogin: boolean; name: string; uid: string };
export type UserList = Record<IndexedUid, User>;

/** Member */
export type Member = User & { superPermission: boolean };
export type Members = Record<IndexedUid, Member>;
