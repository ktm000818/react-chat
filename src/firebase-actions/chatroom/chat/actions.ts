import { database } from "@/firebaseModule";
import { Message, Messages, RoomSummary, Uid } from "@/types";
import { child, get, push, ref, set } from "firebase/database";

const CHAT = "chat";

export type CreateMessageProps = Omit<Uid & Omit<RoomSummary, 'roomName'> & {
  name: string;
  content: string;
  image: string;
  timestamp: string;
}, 'timestamp'>;

export const createMessage = async ({ roomId, uid, name, content, image }: CreateMessageProps) => {
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
