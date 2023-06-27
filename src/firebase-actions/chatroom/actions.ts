import { database } from "@/firebaseModule";
import { child, get, orderByChild, query, ref, set } from "firebase/database";
import { Favorite, getFavoritesByUID } from "./favorites/actions";

export interface Props {
  roomName: string;
  description: string;
  user: {
    image: string;
    name: string;
    uid: string;
  };
}

const CHATROOM = "chatroom";
const USER_CHATROOM = "user_chatroom";

interface Member {
  image: string;
  name: string;
  superPermission: boolean;
  uid: string;
}

interface Members {
  [name: string]: Member;
}

interface ChatRoom extends Favorite {
  createdAt: string;
  description: string;
  members: Members;
  roomId: string;
  roomName: string;
}

interface ChatRoomList {
  [name: string]: ChatRoom;
}

export const getAllChatRoomListByUID: (
  uid: string
) => Promise<ChatRoom[]> = async (uid) => {
  try {
    const dbRef = ref(database);
    const queryChatRoomOrderByCreatedAt = query(
      child(dbRef, `${USER_CHATROOM}/${uid}`),
      orderByChild("createdAt")
    );
    const QueriedChatRoomList = await get(queryChatRoomOrderByCreatedAt);
    const chatRoomListVal: ChatRoomList = await QueriedChatRoomList.val();

    console.log(chatRoomListVal);

    if (QueriedChatRoomList.exists()) {
      return Object.values(chatRoomListVal);
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const addChatRoom = async ({ user, roomName, description }: Props) => {
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
  const userRoomInfo = { ...defaultRoomInfo, isSuper: true };

  const roomListRef = ref(database, `${CHATROOM}/${NEW_ROOM_ID}`);
  const userRoomListRef = ref(
    database,
    `${USER_CHATROOM}/${user.uid}/${NEW_ROOM_ID}`
  );

  await set(roomListRef, defaultRoomInfo);
  await set(userRoomListRef, userRoomInfo);
};
