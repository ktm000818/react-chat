import ChatRooms from "./ChatRooms";
import Favorited from "./Favorited";
import styles from "@styles/Chat/SidePanel/SidePanel.module.scss";
import Logo from "./Logo";

function SidePanel() {
  return (
    <div className={styles["container"]}>
      <Logo />
      <Favorited />
      <ChatRooms />
    </div>
  );
}

export default SidePanel;
