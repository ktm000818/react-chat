import { auth, database } from "@/firebaseModule";
import { Updates } from "@/types";
import { get, query, ref, update } from "@firebase/database";

const CHATROOM = "chatroom";
const USER_CHATROOM = "user_chatroom";

type UpdateUserLoginState = (flag: boolean) => void;
export const updateUserLoginState: UpdateUserLoginState = async (flag) => {
  const uid = auth.currentUser?.uid;
  const dbRef = ref(database);
  const updates: Updates = {};

  if(!Boolean(uid)){
    if(flag) return console.error("로그인 에러!");
    if(!flag) return console.error("로그아웃 에러!");
  }

  type GetChatroomsIdListParticipatedIn = () => Promise<never[]> | Promise<string[]>;
  const getChatroomsIdListParticipatedIn: GetChatroomsIdListParticipatedIn = async () => {
    const chatroomParticipatedIn = await get(query(ref(database, `${USER_CHATROOM}/${uid}`)));
    if (chatroomParticipatedIn.exists()) {
      return Object.keys(chatroomParticipatedIn.val());
    } else {
      return [];
    }
  };

  const changeUserLoginState = (roomIdList: string[]) => {
    roomIdList.forEach((roomId) => {
      updates[`${CHATROOM}/${roomId}/members/${uid}/isLogin`] = flag;
    });
  };

  const chatroomIdList = await getChatroomsIdListParticipatedIn();
  if (chatroomIdList.length > 0) {
    changeUserLoginState(chatroomIdList);
  }

  updates[`users/${uid}/isLogin`] = flag;
  await update(dbRef, updates);
};
