import { addFavorite, getIsFavoriteByRoomId, removeFavorite } from "@/firebase-actions/chatroom/favorites/actions";
import { chatRoomInfoState, sessionState } from "@/recoil/recoil-store/store";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import UserPanel from "./UserPanel";

function MessagesHeader() {
  const user = useRecoilValue(sessionState);
  const chatRoomInfo = useRecoilValue(chatRoomInfoState);
  const [isFavorite, setIsFavorite] = useState<any>(null);

  const getAndSetIsFavoriteRoom = useCallback(async () => {
    if (!user?.uid) {
      return;
    }
    const isFavorite = await getIsFavoriteByRoomId(user.uid, chatRoomInfo.roomId);
    setIsFavorite(isFavorite);
  }, [chatRoomInfo.roomId, user]);

  useEffect(() => {
    getAndSetIsFavoriteRoom();
  }, [getAndSetIsFavoriteRoom]);

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
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "1.5rem", marginRight: "10px" }}>{chatRoomInfo.roomName}</span>
        <img
          src={isFavorite ? "filled_star.svg" : "star.svg"}
          alt="favorite"
          onClick={() => {
            if (!user || !user.uid) {
              return;
            }
            if (isFavorite) {
              removeFavorite(user.uid, chatRoomInfo.roomId);
              setIsFavorite(false);
            } else {
              addFavorite(user.uid, chatRoomInfo);
              setIsFavorite(true);
            }
          }}
        />
      </div>
      <UserPanel />
    </div>
  );
}

export default MessagesHeader;
