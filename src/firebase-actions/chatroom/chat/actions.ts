import { database } from "@/firebaseModule";
import { child, get, push, ref, set } from "firebase/database";

const CHAT = "chat";

export interface Props {
  roomId: string;
  uid: string;
  name: string;
  content: string;
  image: string;
}

export const createMessage = async ({ roomId, uid, name, content, image }: Props) => {
  const currentTime = new Date().toUTCString();
  const chatRoomRef = ref(database, `${CHAT}/${roomId}`);
  const newChatRef = push(chatRoomRef);
  await set(newChatRef, {
    uid,
    name,
    content,
    image,
    timestamp: currentTime,
  });
};

export interface Message {
  content: string;
  image: string;
  name: string;
  timestamp: string;
  uid: string;
}

interface Messages {
  [name: string]: Message;
}

export const getAllMessageList: (roomId: string) => Promise<Message[]> = async (roomId: string) => {
  try {
    const dbRef = ref(database);
    const messagesResult = await get(child(dbRef, `${CHAT}/${roomId}`));
    const messagesResultVal: Messages = await messagesResult.val();

    if (messagesResult.exists()) {
      return Object.values(messagesResultVal);
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};
