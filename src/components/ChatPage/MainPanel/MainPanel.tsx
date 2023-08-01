import Messages from "./Message";
import MessageForm from "./MessageForm";
import MessagesHeader from "./MessageHeader";
import Users from "./Users";
import styles from "@styles/Chat/MainPanel/MainPanel.module.scss";

function MainPanel() {
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <MessagesHeader />
      </div>
      <div className={styles["body"]}>
        <div className={styles["message-with-users-wrapper"]}>
          <Messages />
          <Users />
        </div>
        <div className={styles["message-form-wrapper"]}>
          <MessageForm />
        </div>
      </div>
    </div>
  );
}

export default MainPanel;
