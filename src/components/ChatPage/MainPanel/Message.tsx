import React, { useEffect, useRef, useState } from "react";
import { Message, getAllMessageList } from "@/firebase-actions/chatroom/chat/actions";
import { database } from "@/firebaseModule";
import { chatRoomIdState, sessionState } from "@/recoil/recoil-store/store";
import styles from "@styles/Chat/Main/Message.module.scss";
import { onChildAdded, ref } from "firebase/database";
import { useRecoilValue } from "recoil";

function Messages() {
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
      {chatList.length > 0 &&
        chatList.map((chat: any, index) => {
          return (
            <React.Fragment key={index + "messages"}>
              <div
                style={{
                  display: "flex",
                  height: "auto",
                  padding: "10px 0px 10px 5px",
                }}
              >
                <div
                  style={{
                    width: "70px",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50,
                      overflow: "hidden",
                    }}
                  >
                    <img src={chat.image} alt="userPhoto" width={"100%"} height={"100%"} />
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    <h6 style={{ color: "whitesmoke" }}>{chat.name}</h6>
                  </div>
                  <div>
                    <span style={{ color: "whitesmoke" }}>{chat.content}</span>
                  </div>
                </div>
              </div>
              <hr style={{ padding: 0, marginBottom: 0, marginTop: 0 }} />
            </React.Fragment>
          );
        })}
    </div>
  );
}

export default Messages;
