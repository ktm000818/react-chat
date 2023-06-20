import CreateChatRoomModal from "@/commons/components/Modals/CreateChatRoomModal";
import { getAllChatRoomList } from "@/firebase-actions/chatroom/actions";
import {
  chatRoomIdState,
  chatRoomInfoState,
} from "@/recoil/recoil-store/store";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function ChatRooms() {
  const [data, setData] = useState<any[]>([]);
  const [chatRoomId, setChatRoomId] = useRecoilState(chatRoomIdState);
  const setChatRoomInfo = useSetRecoilState(chatRoomInfoState);

  useEffect(() => {
    async function getChatrooms() {
      const rooms = await getAllChatRoomList();
      setData(rooms);
    }

    getChatrooms();
  }, []);

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
          data.map((room: any) => {
            return (
              <div
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
