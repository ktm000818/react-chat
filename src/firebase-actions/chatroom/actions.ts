import { database } from "@/firebaseModule";
import { child, get, ref, set } from "firebase/database";

export interface Props {
  roomName: string;
  description: string;
  user: {
    image: string;
    name: string;
    uid: string;
  };
}

const TABLE = "chatroom";

export const getAllChatRoomList = async () => {
  try {
    const dbRef = ref(database);
    const result = await get(child(dbRef, `${TABLE}`));
    const resultVal = await result.val();

    if (result.exists()) {
      return Object.values(resultVal);
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const addChatRoom = async ({ user, roomName, description }: Props) => {
  const currentTime = new Date().toUTCString();
  const roomListRef = ref(database, `${TABLE}/${roomName}`);
  await set(roomListRef, {
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
    roomId: window.crypto.randomUUID(),
  });
};
