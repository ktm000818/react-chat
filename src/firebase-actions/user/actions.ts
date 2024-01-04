import { database } from "@/firebaseModule";
import { get, query, ref } from "firebase/database";

const TABLE = 'users';

interface User {
    image: string;
    isLogin: boolean;
    name: string;    
}

export interface UserList {
    [key: string]: User
}

export const getUserList: () => Promise<UserList> = async () => {
    const userList = await get(query(ref(database, `${TABLE}`)));
    if(userList.exists()){
        return userList.val();
    }else{
        return [];
    }
}