import { database } from "@/firebaseModule";
import { child, get, push, ref, set } from "firebase/database";

const TABLE = "chat";

export interface Props {
  roomId: string;
  uid: string;
  name: string;
  content: string;
  image: string;
}

export const createMessage = async ({ roomId, uid, name, content, image }: Props) => {
  const currentTime = new Date().toUTCString();
  const chatRoomRef = ref(database, `${TABLE}/${roomId}`);
  const newChatRef = push(chatRoomRef);
  await set(newChatRef, {
    uid,
    name,
    content,
    image,
    timestamp: currentTime,
  });
};

export const getAllMessageList = async (roomId: string) => {
  try {
    const dbRef = ref(database);
    const result = await get(child(dbRef, `${TABLE}/${roomId}`));
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
