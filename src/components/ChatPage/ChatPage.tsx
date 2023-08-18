import useLoginCheck from "@/custom-hooks/useLoginCheck";
import MainPanel from "./MainPanel/MainPanel";
import SidePanel from "./SidePanel/SidePanel";
import styles from "@styles/Chat/ChatPage.module.scss";
import { useRecoilValue } from "recoil";
import { chatRoomInfoState } from "@/recoil/recoil-store/store";
import MainPanelWithoutChatRoom from "./MainPanel/MainPanelWithoutChatRoom";

export default function ChatPage() {
  useLoginCheck();
  const chatRoomInfo = useRecoilValue(chatRoomInfoState);
  return (
    <div className={styles["container"]}>
      <div className={styles["side-wrapper"]}>
        <SidePanel />
      </div>
      <div className={styles["main-wrapper"]}>
        {!chatRoomInfo.roomId && <MainPanelWithoutChatRoom />}
        {chatRoomInfo.roomId && <MainPanel />}
      </div>
    </div>
  );
}
