import React, { useEffect, useId, useRef, useState } from "react";
import { Message, getAllMessageList } from "@/firebase-actions/chatroom/chat/actions";
import { database } from "@/firebaseModule";
import { chatRoomIdState, sessionState } from "@/recoil/recoil-store/store";
import styles from "@styles/Chat/MainPanel/Message.module.scss";
import { onChildAdded, ref } from "firebase/database";
import { useRecoilValue } from "recoil";

function Messages() {
  const messageId = useId();
  const containerRef = useRef<any>();
  const user = useRecoilValue(sessionState);
  const roomId = useRecoilValue(chatRoomIdState);
  const [chatList, setChatList] = useState<Message[]>([]);

  const checkIsScrollButtom = () => {
    const chatArea = containerRef.current as HTMLDivElement;
    if (Math.round(chatArea.clientHeight + chatArea.scrollTop) <= chatArea.scrollHeight) {
      return false;
    } else {
      return true;
    }
  };

  const moveScrollBottom = () => {
    const chatArea = containerRef.current as HTMLDivElement;
    chatArea.scrollTo(0, chatArea.scrollHeight);
  };

  useEffect(() => {
    async function initMessages() {
      const res = await getAllMessageList(roomId);
      setChatList(res);
    }
    const messagesRef = ref(database, "chat/" + roomId);
    onChildAdded(messagesRef, () => {
      initMessages();
    });
  }, [roomId, user]);

  useEffect(() => {
    if (!checkIsScrollButtom()) {
      moveScrollBottom();
    }
  }, [chatList]);

  return (
    <div className={styles["container"]} ref={containerRef}>
      {(chatList || []).map((chat: Message, index: number) => {
        return (
          <React.Fragment key={messageId + index}>
            <div className={styles["chat-wrapper"]}>
              <div className={styles["image-wrapper"]}>
                <div className={styles["image"]}>
                  <img src={chat.image} alt="userPhoto" width={"100%"} height={"100%"} />
                </div>
              </div>
              <div className={styles["nickname-content-wrapper"]}>
                <span className={styles["nickname"]}>{chat.name}</span>
                <span className={styles["content"]}>{chat.content}</span>
              </div>
            </div>
            <hr className={styles["underline"]} />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Messages;
