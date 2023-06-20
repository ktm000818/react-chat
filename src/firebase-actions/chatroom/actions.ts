import { database } from "@/firebaseModule";
import { child, get, ref, set } from "firebase/database";
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

const TABLE = "chatroom";

interface Member {
    image: string;
    name: string;
    superPermission: boolean;
    uid: string
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
  isFavorite?: true;
}

interface ChatRoomList {
  [name: string]: ChatRoom;
}

export const getAllChatRoomList: (uid: string) => Promise<ChatRoom[]> = async (uid) => {
  try {
    const dbRef = ref(database);
    const QueriedChatRoomList = await get(child(dbRef, `${TABLE}`));
    const chatRoomListVal: ChatRoomList = await QueriedChatRoomList.val();
    const favoritesList = await getFavoritesByUID(uid);
    let chatRoomListValCopy = Object.assign({}, chatRoomListVal);
    let result: ChatRoom[] = Object.values(chatRoomListValCopy);

    if (QueriedChatRoomList.exists()) {
      if(favoritesList){
        let _favoritesList = [...favoritesList];
        
        while(_favoritesList.length > 0){
          let favorite = _favoritesList.pop();
          
          if(!favorite){
            break;
          }else{
            for(let chatRoom in chatRoomListValCopy){
              if(chatRoomListValCopy[chatRoom].roomId === favorite.roomId){
                chatRoomListValCopy[chatRoom].isFavorite = true;
              }
            }
          }
        }

        return result;
      }else{
        return result;
      }
    }else{
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
