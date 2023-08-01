import { getFavoritesByUID } from "@/firebase-actions/chatroom/favorites/actions";
import { database } from "@/firebaseModule";
import { chatRoomIdState, chatRoomInfoState, favoritesListState, sessionState } from "@/recoil/recoil-store/store";
import { onChildAdded, onChildRemoved, ref } from "firebase/database";
import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export default function Favorited() {
  const user = useRecoilValue(sessionState);
  const [favorites, setFavorites] = useRecoilState(favoritesListState);
  const [chatRoomId, setChatRoomId] = useRecoilState(chatRoomIdState);
  const setChatRoomInfo = useSetRecoilState(chatRoomInfoState);

  const getAndSetFavorites = useCallback(async () => {
    if (!user) {
      return;
    }
    const rooms = await getFavoritesByUID(user.uid);
    setFavorites(rooms);
  }, [setFavorites, user]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const userFavoritesRef = ref(database, `user_favorites/${user.uid}`);
    onChildAdded(userFavoritesRef, () => {
      getAndSetFavorites();
    });
    onChildRemoved(userFavoritesRef, () => {
      getAndSetFavorites();
    });
  }, [getAndSetFavorites, user]);

  return (
    <>
      Favorites
      <div style={{ margin: 10 }}>
        {favorites &&
          favorites.map((room: any, index: number) => (
            <>
              <div
                key={index + "rooms"}
                style={{
                  textDecoration: chatRoomId === room.roomId ? "underline" : "none",
                }}
                onClick={() => {
                  setChatRoomId(room.roomId);
                  setChatRoomInfo({
                    roomId: room.roomId,
                    roomName: room.roomName,
                  });
                }}
              >
                <span style={{ cursor: "pointer" }}>{room.roomName}</span>
              </div>
            </>
          ))}
      </div>
    </>
  );
}
