import { auth, database } from "@/firebaseModule";
import { equalTo, get, orderByChild, query, ref, set, update } from "firebase/database";
import { Favorite } from "./favorites/actions";

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

interface Member extends User {
  superPermission: boolean;
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
    const queryChatRoomOrderByCreatedAt = query(ref(database, `${USER_CHATROOM}/${uid}`), orderByChild("isFavorite"), equalTo(false));
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
  };

  const userRoomInfo = { ...defaultRoomInfo, isSuper: true, isFavorite: false };

  const roomListRef = ref(database, `${CHATROOM}/${NEW_ROOM_ID}`);
  await set(roomListRef, defaultRoomInfo);

  const userRoomListRef = ref(database, `${USER_CHATROOM}/${user.uid}/${NEW_ROOM_ID}`);
  await set(userRoomListRef, userRoomInfo);
};

export const inviteUserToChatRoom = async (user: User[], roomId: string) => {
  const currentUserUid = auth.currentUser?.uid;

  if (!currentUserUid) {
    return false;
  }

  const updates: any = {};
  const copiedUserChatRoomInfo = (await get(query(ref(database, `${USER_CHATROOM}/${currentUserUid}/${roomId}`)))).val();
  const copiedChatRoomInfo = (await get(query(ref(database, `${CHATROOM}/${roomId}`)))).val();

  user.forEach(async (user, _) => {
    const newUser = {
      image: user.image,
      name: user.name,
      uid: user.uid,
      superPermission: false,
    };

    const copiedUserChatRoominfoForCurrentUser = ({ ...copiedUserChatRoomInfo }.members[user.uid] = newUser);
    const copiedUserChatRoominfoForTarget = { ...copiedUserChatRoomInfo };
    copiedUserChatRoominfoForTarget.isSuper = false;
    copiedUserChatRoominfoForTarget.isFavorite = false;
    copiedUserChatRoominfoForTarget.members[user.uid] = newUser;
    const copiedChatRoomInfoForUpdate = ({ ...copiedChatRoomInfo }.members[user.uid] = newUser);

    updates[`${CHATROOM}/${roomId}`] = copiedChatRoomInfoForUpdate;
    updates[`${USER_CHATROOM}/${user.uid}/${roomId}`] = copiedUserChatRoominfoForTarget;
    updates[`${USER_CHATROOM}/${currentUserUid}/${roomId}`] = copiedUserChatRoominfoForCurrentUser;
  });

  await update(ref(database), updates);
};
