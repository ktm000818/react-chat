import { database } from "@/firebaseModule";
import { chatRoomIdState } from "@/recoil/recoil-store/store";
import styles from "@styles/Chat/MainPanel/Users.module.scss";
import { get, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const CHATROOM = "chatroom";

interface Member {
  image: string;
  name: string;
  superPermission: boolean;
  uid: string;
}

export default function Users() {
  const [memberList, setMemberList] = useState<Array<Member>>([]);
  const chatRoomId = useRecoilValue(chatRoomIdState);

  useEffect(() => {
    initMemberList();
  }, []);

  const initMemberList = async () => {
    setMemberList(await getMemberList());
  };

  const getMemberList: () => Promise<Array<never>> | Promise<Array<Member>> = async () => {
    const memberListObj = await get(query(ref(database, `${CHATROOM}/${chatRoomId}/members`)));

    if (memberListObj.exists()) {
      return Object.values(memberListObj.val());
    } else {
      return [];
    }
  };

  return (
    <div className={styles["container"]}>
      {memberList.map((v) => (
        <div>{v.name}</div>
      ))}
    </div>
  );
}
