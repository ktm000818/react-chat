import CreateChatRoomModal from "@/commons/components/Modals/CreateChatRoomModal";
import { getAllChatRoomList } from "@/firebase-actions/chatroom/actions";
import {
  addFavorite,
  removeFavorite,
} from "@/firebase-actions/chatroom/favorites/actions";
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
      const rooms = await getAllChatRoomList(user.uid);
      setData(rooms);
    }

    getChatrooms();

    const favoritesRef = ref(database, "favorites");
    onChildAdded(favoritesRef, () => {
      getChatrooms();
    });
    onChildRemoved(favoritesRef, (message) => {
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
                <img
                  src={room.isFavorite ? "filled_star.svg" : "star.svg"}
                  alt="favorite"
                  onClick={() => {
                    if (room.isFavorite) {
                      removeFavorite(room.roomId);
                    } else {
                      addFavorite(user.uid, room.roomId);
                    }
                  }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
