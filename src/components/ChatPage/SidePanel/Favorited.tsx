import { getFavoritesByUID } from "@/firebase-actions/chatroom/favorites/actions";
import { database } from "@/firebaseModule";
import {
  chatRoomIdState,
  chatRoomInfoState,
  sessionState,
} from "@/recoil/recoil-store/store";
import { onChildAdded, onChildRemoved, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export default function Favorited() {
  const user = useRecoilValue(sessionState);
  const [favRooms, setFavRooms] = useState<any>([]);
  const [chatRoomId, setChatRoomId] = useRecoilState(chatRoomIdState);
  const setChatRoomInfo = useSetRecoilState(chatRoomInfoState);

  useEffect(() => {
    async function getIsFavorite() {
      const rooms = await getFavoritesByUID(user.uid);
      setFavRooms(rooms);
    }

    const userFavoritesRef = ref(database, `user_favorites/${user.uid}`);

    onChildAdded(userFavoritesRef, () => {
      getIsFavorite();
    });
    onChildRemoved(userFavoritesRef, () => {
      getIsFavorite();
    });
  }, []);
  return (
    <>
      Favorites
      <div style={{ margin: 10, border: "1px solid black" }}>
        {favRooms &&
          favRooms.map((room: any, index: number) => (
            <>
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
            </>
          ))}
      </div>
    </>
  );
}
