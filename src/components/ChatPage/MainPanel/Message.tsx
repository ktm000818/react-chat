import { getAllMessageList } from "@/firebase-actions/chatroom/chat/actions";
import { database } from "@/firebaseModule";
import { chatRoomIdState } from "@/recoil/recoil-store/store";
import styles from "@styles/Chat/Main/Message.module.scss";
import { onChildAdded, ref } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

function Messages() {
  const containerRef = useRef<any>();

  const roomId = useRecoilValue(chatRoomIdState);
  const [chatList, setChatList] = useState<any[]>([]);

  const checkScrollBottom = () => {
    const chatArea = containerRef.current as HTMLDivElement;
    console.log(chatArea.clientHeight + chatArea.scrollTop);
    console.log(chatArea.scrollHeight);
    if (Math.round(chatArea.clientHeight + chatArea.scrollTop) <= chatArea.scrollHeight) {
      chatArea.scrollTo(0, chatArea.scrollHeight);
    }
  };

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
    checkScrollBottom();
  }, [chatList]);

  return (
    <div className={styles["container"]} ref={containerRef}>
      {chatList.length > 0 &&
        chatList.map((chat: any) => {
          return (
            <>
              <div style={{ display: "flex", height: "auto", padding: "10px 0px 10px 5px" }}>
                <div style={{ width: "70px", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <div style={{ width: 50, borderRadius: 50, overflow: "hidden" }}>
                    <img src={chat.image} alt="userPhoto" width={"100%"} height={"100%"} />
                  </div>
                </div>
                <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                  <div>
                    <h6 style={{ color: "whitesmoke" }}>{chat.name}</h6>
                  </div>
                  <div>
                    <span style={{ color: "whitesmoke" }}>{chat.content}</span>
                  </div>
                </div>
              </div>
              <hr style={{ padding: 0, marginBottom: 0, marginTop: 0 }} />
            </>
          );
        })}
    </div>
  );
}

export default Messages;
