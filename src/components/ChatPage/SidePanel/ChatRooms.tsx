import CreateChatRoomModal from "@/commons/components/Modals/CreateChatRoomModal";
import { getAllChatRoomListByUID } from "@/firebase-actions/chatroom/actions";
import { database } from "@/firebaseModule";
import {
  chatRoomIdState,
  chatRoomInfoState,
  sessionState,
} from "@/recoil/recoil-store/store";
import { onChildAdded, onChildRemoved, ref } from "@firebase/database";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export default function ChatRooms() {
  const [data, setData] = useState<any[]>([]);
  const user = useRecoilValue(sessionState);
  const [chatRoomId, setChatRoomId] = useRecoilState(chatRoomIdState);
  const setChatRoomInfo = useSetRecoilState(chatRoomInfoState);

  useEffect(() => {
    async function getChatrooms() {
      const rooms = await getAllChatRoomListByUID(user.uid);
      setData(rooms);
    }

    const chatRoomsRef = ref(database, `user_chatroom/${user.uid}`);

    onChildAdded(chatRoomsRef, () => {
      getChatrooms();
    });
    onChildRemoved(chatRoomsRef, () => {
      getChatrooms();
    });
  }, [user.uid]);

  return (
    <div style={{ margin: 10, border: "1px solid black" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h6>Chat rooms</h6>
        <CreateChatRoomModal />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {data &&
          data.length > 0 &&
          data.map((room: any, index) => {
            return (
              <div
                key={index + "rooms"}
                style={{
                  textDecoration:
                    chatRoomId === room.roomId ? "underline" : "none",
                }}
                onClick={() => {
                  setChatRoomId(room.roomId);
                  setChatRoomInfo({
                    roomId: room.roomId,
                    roomName: room.roomName,
                  });
                }}
              >
                <h6>{room.roomName}</h6>
              </div>
            );
          })}
      </div>
    </div>
  );
}
