import { useRecoilValue } from "recoil";
import UserPanel from "./UserPanel";
import { chatRoomInfoState } from "@/recoil/recoil-store/store";

function MessagesHeader() {
  const chatRoomInfo = useRecoilValue(chatRoomInfoState);
  return (
    <div
      style={{
        color: "white",
        background: "#252525",
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        height: "100%",
      }}
    >
      <div> {chatRoomInfo.roomName} </div>
      <UserPanel />
    </div>
  );
}

export default MessagesHeader;
