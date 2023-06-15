import { getAllMessageList } from "@/firebase-actions/chatroom/chat/actions";
import { database } from "@/firebaseModule";
import { chatRoomIdState } from "@/recoil/recoil-store/store";
import styles from "@styles/Chat/Main/Message.module.scss";
import { onChildAdded, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

function Messages() {
  const roomId = useRecoilValue(chatRoomIdState);
  const [chatList, setChatList] = useState<any[]>([]);

  useEffect(() => {
    async function initMessages() {
      const res = await getAllMessageList(roomId);
      setChatList(res);
    }

    initMessages();

    const messagesRef = ref(database, "chat/" + roomId);
    onChildAdded(messagesRef, (message) => {
      initMessages();
    });
  }, [roomId]);

  useEffect(() => {
    console.log(chatList);
  }, [chatList]);

  return (
    <div className={styles["container"]}>
      {chatList.length > 0 &&
        chatList.map((chat: any) => {
          return <h6>{chat.content}</h6>;
        })}
    </div>
  );
}

export default Messages;
