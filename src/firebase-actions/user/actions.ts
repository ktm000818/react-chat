import { auth, database } from "@/firebaseModule";
import { get, query, ref } from "firebase/database";

const TABLE = "users";

export interface User {
  image: string;
  isLogin?: boolean;
  name: string;
  uid: string;
}

export interface UserList {
  [key: string]: User;
}

export const getUserList: () => Promise<UserList> = async () => {
  const userList = await get(query(ref(database, `${TABLE}`)));
  if (userList.exists()) {
    return userList.val();
  } else {
    return [];
  }
};

export const getUserListExceptCurrentUser: () => Promise<UserList> = async () => {
  if (!auth.currentUser?.uid) {
    return [];
  }

  const currentUid = auth.currentUser?.uid;

  const userList = await get(query(ref(database, `${TABLE}`)));
  if (userList.exists()) {
    const userListExceptCurrentUser = { ...userList.val() };
    delete userListExceptCurrentUser[currentUid];

    return userListExceptCurrentUser;
  } else {
    return [];
  }
};
