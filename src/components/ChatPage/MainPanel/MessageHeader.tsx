import InviteUserModalButton from "@/common/components/Buttons/InviteUserModalButton";
import { addFavorite, getIsFavoriteByRoomId, removeFavorite } from "@/firebase-actions/chatroom/favorites/actions";
import { chatRoomInfoState, userAuthState } from "@/recoil/recoil-store/store";
import styles from "@styles/Chat/MainPanel/MessageHeader.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import UserPanel from "./UserPanel";
import { withChatRoomInfoComponent } from "@/hoc";
import SidePanel from "../SidePanel/SidePanel";

function MessagesHeader() {
  const user = useRecoilValue(userAuthState);
  const chatRoomInfo = useRecoilValue(chatRoomInfoState);
  const [isFavorite, setIsFavorite] = useState(false);
  const [hide, setHide] = useState(false);
  let sidePanelRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu: () => void = () => {
    setHide((hide) => {
      if (sidePanelRef.current) {
        if (hide) {
          sidePanelRef.current.style.display = "unset";
        } else {
          sidePanelRef.current.style.display = "none";
        }
      }
      return !hide;
    });
  };
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
    <>
      <div ref={sidePanelRef} className={`${styles["side-wrapper"]}`}>
        <SidePanel />
      </div>
      <div className={styles["container"]}>
        <div className={styles["menu-button"]} onClick={toggleMenu}>
          {hide ? "=" : "x"}
        </div>
        <div className={styles["title-wrapper"]}>
          {chatRoomInfo.roomId && (
            <>
              <span className={styles["title"]}>{chatRoomInfo.roomName}</span>
              <img className={styles["favorite-img"]} src={isFavorite ? "filled_star.svg" : "star.svg"} alt="favorite" onClick={toggleFavorite} />
              <InviteUserModalButton chatRoomId={chatRoomInfo.roomId}>Invite</InviteUserModalButton>
            </>
          )}
        </div>
        <UserPanel />
      </div>
    </>
  );
}

export default MessagesHeader;
