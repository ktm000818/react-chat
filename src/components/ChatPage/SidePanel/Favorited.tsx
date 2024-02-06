import styles from "@styles/Chat/SidePanel/Favorited.module.scss";
import { getFavoritesByUID } from "@/firebase-actions/chatroom/favorites/actions";
import { database } from "@/firebaseModule";
import { chatRoomIdState, chatRoomInfoState, userAuthState } from "@/recoil/recoil-store/store";
import { FavoriteFamily } from "@/types";
import { onChildAdded, onChildRemoved, ref } from "firebase/database";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export default function Favorited() {
  const user = useRecoilValue(userAuthState);
  const [favorites, setFavorites] = useState<FavoriteFamily.Favorite[] | null>(null);
  const [chatRoomId, setChatRoomId] = useRecoilState(chatRoomIdState);
  const setChatRoomInfo = useSetRecoilState(chatRoomInfoState);

  const getAndSetFavorites = useCallback(async () => {
    if (!user) return;
    const rooms = await getFavoritesByUID(user.uid);
    setFavorites(rooms);
  }, [user]);

  const enterRoom = (room: FavoriteFamily.Favorite) => {
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
      {favorites && (
        <div className={styles["title-container"]}>
          <h6>Favorites</h6>
        </div>
      )}
      <div className={styles["favorite-container"]}>
        {(favorites || []).map((room: FavoriteFamily.Favorite, _) => (
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
