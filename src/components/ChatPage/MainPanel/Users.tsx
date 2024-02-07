import { database } from "@/firebaseModule";
import { chatRoomIdState } from "@/recoil/recoil-store/store";
import styles from "@styles/Chat/MainPanel/Users.module.scss";
import { get, onChildAdded, onChildChanged, onChildRemoved, query, ref } from "firebase/database";
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
    onChildAdded(ref(database, `${CHATROOM}/${chatRoomId}/members`), initMemberList);
    onChildRemoved(ref(database, `${CHATROOM}/${chatRoomId}/members`), initMemberList);
    onChildChanged(ref(database, `${CHATROOM}/${chatRoomId}/members`), initMemberList);
  }, [chatRoomId]);

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
      {memberList.map((member, i) => (
        <div key={`${member.uid}_${i}`} className={styles["member-card"]}>
          <div className={styles["member-image-wrapper"]}>
            <img src={member.image} alt="" width={35} height={35} />
          </div>
          <div className={`${styles["connect-status"]} ${styles["online"]}`}></div>
          <span className={styles["member-name"]}>{member.name}</span>
        </div>
      ))}
    </div>
  );
}
