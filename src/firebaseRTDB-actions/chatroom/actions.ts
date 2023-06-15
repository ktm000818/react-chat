import { database } from "@/firebaseModule";
import { push, ref, set, child, get } from "firebase/database";

export interface Props {
  roomName: string;
  description: string;
}

const TABLE = "chatroom";

export const getAllChatRoomList = async () => {
  try {
    const dbRef = ref(database);
    const result = await get(child(dbRef, `${TABLE}`));
    const resultVal = await result.val();

    if(result.exists()){
      return Object.values(resultVal);
    }else{
      return [];
    }
  } catch (error) {
    return [];
  }
}

export const addChatRoom = async ({ roomName, description }: Props) => {
  const currentTime = new Date().toUTCString();
  const postListRef = ref(database, `${TABLE}/${roomName}`);
  await set(postListRef, {
      roomName,
      description,
      createdAt: currentTime,
      updatedAt: null,
      lastMessage: null,
      members: [],
      roomId: window.crypto.randomUUID(),
  });
};
