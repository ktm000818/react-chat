import { auth, database } from "@/firebaseModule";
import { ChatRoom, ChatRoomList, Members, User } from "@/types";
import { equalTo, get, orderByChild, query, ref, set, update } from "firebase/database";

const CHATROOM = "chatroom";
const USER_CHATROOM = "user_chatroom";

export interface AddChatRoom {
  roomName: string;
  description: string;
  user: User;
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
  const membersChatroom: Members = {
    [user.uid]: {
      image: user.image,
      name: user.name,
      superPermission: true,
      uid: user.uid,
      isLogin: user.isLogin,
    },
  };
  const membersUserChatroom: Members = {
    [user.uid]: {
      image: user.image,
      name: user.name,
      superPermission: true,
      uid: user.uid,
    },
  };
  const roomInfo: ChatRoom = {
    roomId: NEW_ROOM_ID,
    roomName,
    description,
    createdAt: currentTime,
    updatedAt: 0,
    members: membersChatroom,
  };

  const userRoomInfo = { ...roomInfo, members: membersUserChatroom, isSuper: true, isFavorite: false };

  const roomListRef = ref(database, `${CHATROOM}/${NEW_ROOM_ID}`);
  await set(roomListRef, roomInfo);

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
  const currentChatRoomMembers = (await get(query(ref(database, `${USER_CHATROOM}/${currentUserUid}/${roomId}/members`)))).val();
  const copiedChatRoomInfo = (await get(query(ref(database, `${CHATROOM}/${roomId}`)))).val();

  user.forEach(async (user, _) => {
    const newUser = {
      image: user.image,
      name: user.name,
      uid: user.uid,
      superPermission: false,
    };

    const copiedUserChatRoominfoForCurrentAdmin = { ...copiedUserChatRoomInfo };
    copiedUserChatRoominfoForCurrentAdmin.members[user.uid] = newUser;
    const copiedUserChatRoominfoForCurrentUserNotAdmin = { ...copiedUserChatRoomInfo };
    copiedUserChatRoominfoForCurrentUserNotAdmin.isSuper = false;
    copiedUserChatRoominfoForCurrentUserNotAdmin.members[user.uid] = newUser;
    const copiedUserChatRoominfoForTarget = { ...copiedUserChatRoomInfo };
    copiedUserChatRoominfoForTarget.isSuper = false;
    copiedUserChatRoominfoForTarget.isFavorite = false;
    copiedUserChatRoominfoForTarget.members[user.uid] = newUser;

    const copiedChatRoomInfoForUpdate = { ...copiedChatRoomInfo };
    copiedChatRoomInfoForUpdate.members[user.uid] = { ...newUser, isLogin: user.isLogin };

    updates[`${CHATROOM}/${roomId}`] = copiedChatRoomInfoForUpdate;
    updates[`${USER_CHATROOM}/${user.uid}/${roomId}`] = copiedUserChatRoominfoForTarget;

    Object.keys(currentChatRoomMembers).forEach((member) => {
      if (member !== currentUserUid) {
        updates[`${USER_CHATROOM}/${member}/${roomId}`] = copiedUserChatRoominfoForCurrentUserNotAdmin;
      } else {
        updates[`${USER_CHATROOM}/${member}/${roomId}`] = copiedUserChatRoominfoForCurrentAdmin;
      }
    });
  });

  await update(ref(database), updates);
};
