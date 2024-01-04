import InviteUserModalButton from "@/common/components/Buttons/InviteUserModalButton";
import { addFavorite, getIsFavoriteByRoomId, removeFavorite } from "@/firebase-actions/chatroom/favorites/actions";
import { chatRoomInfoState, userAuthState } from "@/recoil/recoil-store/store";
import styles from "@styles/Chat/MainPanel/MessageHeader.module.scss";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import UserPanel from "./UserPanel";

function MessagesHeader() {
  const user = useRecoilValue(userAuthState);
  const chatRoomInfo = useRecoilValue(chatRoomInfoState);
  const [isFavorite, setIsFavorite] = useState<any>(null);

  const getAndSetIsFavoriteRoom = useCallback(async () => {
    if (!user?.uid) {
      return;
    }
    const isFavorite = await getIsFavoriteByRoomId(user.uid, chatRoomInfo.roomId);
    setIsFavorite(isFavorite);
  }, [chatRoomInfo.roomId, user]);

  const toggleFavorite = () => {
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
  };

  useEffect(() => {
    getAndSetIsFavoriteRoom();
  }, [getAndSetIsFavoriteRoom]);

  return (
    <div className={styles["container"]}>
      <div className={styles["title-wrapper"]}>
        <span className={styles["title"]}>{chatRoomInfo.roomName}</span>
        <img src={isFavorite ? "filled_star.svg" : "star.svg"} alt="favorite" onClick={toggleFavorite} />
        <InviteUserModalButton chatRoomId={chatRoomInfo.roomId}>초대</InviteUserModalButton>
      </div>
      <UserPanel />
    </div>
  );
}

export default MessagesHeader;
