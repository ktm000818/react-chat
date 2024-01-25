import { withChatRoomInfoComponent } from "@/hoc";
import styles from "@styles/Chat/MainPanel/MainPanel.module.scss";
import Messages from "./Message";
import MessageForm from "./MessageForm";
import MessagesHeader from "./MessageHeader";
import Users from "./Users";

const Body = () => (
  <>
    <div className={styles["message-with-users-wrapper"]}>
      <Messages />
      <Users />
    </div>
    <div className={styles["message-form-wrapper"]}>
      <MessageForm />
    </div>
  </>
);

const HOCBody = withChatRoomInfoComponent(Body, () => <div>안녕하세요</div>);

function MainPanel() {
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <MessagesHeader />
      </div>
      <div className={styles["body"]}>
        <HOCBody />
      </div>
    </div>
  );
}

export default MainPanel;
