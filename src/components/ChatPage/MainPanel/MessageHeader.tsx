import { useRecoilValue } from "recoil";
import UserPanel from "./UserPanel";
import { chatRoomInfoState, sessionState } from "@/recoil/recoil-store/store";
import { database } from "@/firebaseModule";
import { onChildAdded, onChildRemoved, ref } from "firebase/database";
import { getAllChatRoomListByUID } from "@/firebase-actions/chatroom/actions";
import {
  addFavorite,
  getIsFavoriteByRoomId,
  removeFavorite,
} from "@/firebase-actions/chatroom/favorites/actions";
import { useEffect, useState } from "react";

function MessagesHeader() {
  const user = useRecoilValue(sessionState);
  const chatRoomInfo = useRecoilValue(chatRoomInfoState);

  const [isFavorite, setIsFavorite] = useState<any>(null);

  useEffect(() => {
    async function getIsFavorite() {
      const isFavorite = await getIsFavoriteByRoomId(
        user.uid,
        chatRoomInfo.roomId
      );
      setIsFavorite(isFavorite);
    }

    const userFavoritesRef = ref(database, `user_favorites/${user.uid}`);

    onChildAdded(userFavoritesRef, () => {
      getIsFavorite();
    });
    onChildRemoved(userFavoritesRef, () => {
      getIsFavorite();
    });
  }, [chatRoomInfo.roomId]);
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
      <div>
        <h5>{chatRoomInfo.roomName}</h5>
        <img
          src={isFavorite ? "filled_star.svg" : "star.svg"}
          alt="favorite"
          onClick={() => {
            if (isFavorite) {
              removeFavorite(user.uid, chatRoomInfo.roomId);
            } else {
              addFavorite(user.uid, chatRoomInfo);
            }
          }}
        />
      </div>
      <UserPanel />
    </div>
  );
}

export default MessagesHeader;
