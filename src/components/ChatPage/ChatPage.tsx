import useLoginCheck from "@/custom-hooks/useLoginCheck";
import MainPanel from "./MainPanel/MainPanel";
import SidePanel from "./SidePanel/SidePanel";
import styles from "@styles/Chat/ChatPage.module.scss";

export default function ChatPage() {
  useLoginCheck();
  return (
    <div className={styles["container"]}>
      <div className={styles["side-wrapper"]}>
        <SidePanel />
      </div>
      <div className={styles["main-wrapper"]}>
        <MainPanel />
      </div>
    </div>
  );
}
