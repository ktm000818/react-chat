import { auth, database } from "@/firebaseModule";
import { equalTo, get, orderByChild, push, query, ref, set, update } from "firebase/database";
import { Favorite } from "./favorites/actions";
import { UserAuthState } from "@/types";

const CHATROOM = "chatroom";
const USER_CHATROOM = "user_chatroom";

interface User {
  image: string;
  name: string;
  uid: string;
}

export interface AddChatRoom {
  roomName: string;
  description: string;
  user: User;
}

interface Member {
  image: string;
  name: string;
  superPermission: boolean;
  uid: string;
}

interface Members {
  [name: string]: Member;
}

export interface ChatRoom extends Favorite {
  createdAt: string;
  description: string;
  members: Members;
  roomId: string;
  roomName: string;
}

interface ChatRoomList {
  [name: string]: ChatRoom;
}

export const getAllChatRoomListByUID: (uid: string | undefined) => Promise<ChatRoom[]> = async (uid) => {
  if (!uid) {
    return [];
  }
  try {
    const queryChatRoomOrderByCreatedAt = query(
      ref(database, `${USER_CHATROOM}/${uid}`),
      orderByChild("isFavorite"),
      equalTo(false)
    );
    const QueriedChatRoomList = await get(queryChatRoomOrderByCreatedAt);
    const chatRoomListVal: ChatRoomList = await QueriedChatRoomList.val();

    if (QueriedChatRoomList.exists()) {
      return Object.values(chatRoomListVal);
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const addChatRoom = async ({ user, roomName, description }: AddChatRoom) => {
  const currentTime = new Date().getTime();
  const NEW_ROOM_ID = window.crypto.randomUUID();
  const defaultRoomInfo = {
    roomName,
    description,
    createdAt: currentTime,
    updatedAt: null,
    lastMessage: null,
    members: {
      [user.uid]: {
        image: user.image,
        name: user.name,
        superPermission: true,
      },
    },
    roomId: NEW_ROOM_ID,
    // isFavorite: false,
  };
  const userRoomInfo = { ...defaultRoomInfo, isSuper: true };

  const roomListRef = ref(database, `${CHATROOM}/${NEW_ROOM_ID}`);
  const userRoomListRef = ref(database, `${USER_CHATROOM}/${user.uid}/${NEW_ROOM_ID}`);

  await set(roomListRef, defaultRoomInfo);
  await set(userRoomListRef, userRoomInfo);
};
// user: User, roomId: string
export const inviteUserToChatRoom = async (user: User[], roomId: string) => {
  const currentUserUid = auth.currentUser?.uid;

  if(!currentUserUid){
    return false;
  }
  // const newUserRoom = {
  //   roomId,
  //   name: user.name,
  // };
  // const roomListRef = ref(database, `${CHATROOM}/${roomId}/members`);
  // const userRoomListRef = ref(database, `${USER_CHATROOM}/${user.uid}/${roomId}/members`);
  // const invitedUserRoomListRef = ref(database, `${USER_CHATROOM}/${user.uid}/${roomId}/members`);
  console.log((await get(query(ref(database, `${CHATROOM}/${roomId}`)))).val());

  const updates: any = {};

  user.forEach(async (user, _) => {
    const userRoomListRef = ref(database, `${USER_CHATROOM}/${user.uid}/${roomId}`);
    const copiedRoomInfo = (await get(query(ref(database, `${USER_CHATROOM}/${currentUserUid}/${roomId}`)))).val();
    copiedRoomInfo.isSuper = false;
    copiedRoomInfo.isFavorite = false;

    await set(userRoomListRef, copiedRoomInfo);

    const newUser = {
      image: user.image,
      name: user.name,
      uid: user.uid,
      superPermission: false,
    };

    updates[`${CHATROOM}/${roomId}/members/${user.uid}`] = newUser;
    updates[`${USER_CHATROOM}/${user.uid}/${roomId}/members`] = newUser;
  });

  await update(ref(database), updates);

  // await push(roomListRef, newUser);
  // await push(userRoomListRef, newUser);
};
