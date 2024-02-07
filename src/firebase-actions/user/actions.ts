import { auth, database } from "@/firebaseModule";
import { UserList } from "@/types";
import { get, query, ref } from "firebase/database";

const USERS = "users";
const USER_CHATROOM = "user_chatroom";

export const getUserList: () => Promise<UserList> = async () => {
  const userList = await get(query(ref(database, `${USERS}`)));
  if (userList.exists()) {
    return userList.val();
  } else {
    return [];
  }
};

const getMemberList: (roomId: string) => Promise<UserList> = async (roomId) => {
  const currentUid = auth.currentUser?.uid;
  const memberList = await get(query(ref(database, `${USER_CHATROOM}/${currentUid}/${roomId}/members`)));
  if (memberList.exists()) {
    return memberList.val();
  } else {
    return [];
  }
};

export const getUserListExceptChatroomMemberAndCurrUser: (roomId: string) => Promise<UserList> = async (roomId) => {
  const currentUid = auth.currentUser?.uid;

  if (!currentUid) {
    return {};
  }

  const userListExceptCurrentUser = { ...(await getUserList()) };
  const memberListExceptCurrentUser = { ...(await getMemberList(roomId)) };

  Object.keys(memberListExceptCurrentUser).forEach((uid) => {
    if (userListExceptCurrentUser[uid]) {
      delete userListExceptCurrentUser[uid];
    }
  });

  return userListExceptCurrentUser;
};
