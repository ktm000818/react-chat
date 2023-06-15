import CreateChatRoomModal from "@/commons/components/Modals/CreateChatRoomModal";
import { getAllChatRoomList } from "@/firebaseRTDB-actions/chatroom/actions";
import { useEffect, useState } from "react";

export default function ChatRooms() {
  const [data, setData] = useState<any[]>([]);
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
            return <h6>{room.roomName}</h6>;
          })}
      </div>
    </div>
  );
}
