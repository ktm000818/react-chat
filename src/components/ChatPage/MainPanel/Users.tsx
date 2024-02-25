import { database } from "@/firebaseModule";
import { chatRoomIdState } from "@/recoil/recoil-store/store";
import { Member, Members } from "@/types";
import styles from "@styles/Chat/MainPanel/Users.module.scss";
import { get, onChildAdded, onChildChanged, onChildRemoved, query, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const CHATROOM = "chatroom";

export default function Users() {
  const [memberList, setMemberList] = useState<Array<Member>>([]);
  const chatRoomId = useRecoilValue(chatRoomIdState);

  useEffect(() => {
    type GetMemberList = () => Promise<Array<never>> | Promise<Array<Member>>;
    const getMemberList: GetMemberList = async () => {
      const memberListObj = await get(query(ref(database, `${CHATROOM}/${chatRoomId}/members`)));

      if (memberListObj.exists()) {
        return Object.values(memberListObj.val() as Members);
      } else {
        return [];
      }
    };

    const initMemberList = async () => {
      setMemberList(await getMemberList());
    };

    initMemberList();
    onChildAdded(ref(database, `${CHATROOM}/${chatRoomId}/members`), initMemberList);
    onChildRemoved(ref(database, `${CHATROOM}/${chatRoomId}/members`), initMemberList);
    onChildChanged(ref(database, `${CHATROOM}/${chatRoomId}/members`), initMemberList);
  }, [chatRoomId]);

  return (
    <div className={styles["container"]}>
      {memberList.map((member, i) => (
        <div key={`${member.uid}_${i}`} className={styles["member-card"]}>
          <div className={styles["member-image-wrapper"]}>
            <img src={member.image} alt="" width={35} height={35} />
          </div>
          <div className={`${styles["connect-status"]} ${member.isLogin ? styles["online"] : styles["offline"]}`}></div>
          <span className={styles["member-name"]}>{member.name}</span>
        </div>
      ))}
    </div>
  );
}
