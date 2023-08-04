import { Favorite, getFavoritesByUID } from "@/firebase-actions/chatroom/favorites/actions";
import { database } from "@/firebaseModule";
import { chatRoomIdState, chatRoomInfoState, sessionState } from "@/recoil/recoil-store/store";
import { onChildAdded, onChildRemoved, ref } from "firebase/database";
import { useCallback, useEffect, Fragment, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styles from "@styles/Chat/SidePanel/Favorited.module.scss";

export default function Favorited() {
  const user = useRecoilValue(sessionState);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [chatRoomId, setChatRoomId] = useRecoilState(chatRoomIdState);
  const setChatRoomInfo = useSetRecoilState(chatRoomInfoState);

  const getAndSetFavorites = useCallback(async () => {
    if (!user) return;
    const rooms: Favorite[] = await getFavoritesByUID(user.uid);
    setFavorites(rooms);
  }, [user]);

  const enterRoom = (room: Favorite) => {
    setChatRoomId(room.roomId);
    setChatRoomInfo({
      roomId: room.roomId,
      roomName: room.roomName,
    });
  };

  useEffect(() => {
    if (!user) return;
    const userFavoritesRef = ref(database, `user_favorites/${user.uid}`);
    onChildAdded(userFavoritesRef, getAndSetFavorites);
    onChildRemoved(userFavoritesRef, getAndSetFavorites);
  }, [getAndSetFavorites, user]);

  return (
    <>
      <div className={styles["title-container"]}>
        <h6>Favorites</h6>
      </div>
      <div className={styles["favorite-container"]}>
        {(favorites || []).map((room: Favorite, _) => (
          <Fragment key={room.roomId}>
            <div
              style={{
                textDecoration: chatRoomId === room.roomId ? "underline" : "none",
              }}
              onClick={() => enterRoom(room)}
            >
              <span className={styles["favorite-name"]}>{room.roomName}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
}
