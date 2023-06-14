import CreateChatRoomModal from "@/commons/components/Modals/CreateChatRoomModal";
import { getAllChatRoomList } from "@/firebaseRTDB-actions/chatroom/actions";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function ChatRooms() {
  const [openCreateChatRoomModal, setOpenCreateChatRoomModal] = useState(false);
  const chatRoomList = getAllChatRoomList();
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
      <div style={{ display: "flex", flexDirection: "column" }}></div>
    </div>
  );
}
