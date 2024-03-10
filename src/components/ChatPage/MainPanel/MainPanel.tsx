import { withChatRoomInfoComponent } from "@/hoc";
import styles from "@styles/Chat/MainPanel/MainPanel.module.scss";
import Messages from "./Message";
import MessageForm from "./MessageForm";
import MessagesHeader from "./MessageHeader";
import Users from "./Users";

const Body = () => (
  <>
    <div className={styles["message-with-users-wrapper"]}>
      <div className={styles["messages-wrapper"]}>
        <Messages />
      </div>
      <div className={styles["users-wrapper"]}>
        <Users />
      </div>
    </div>
    <div className={styles["message-form-wrapper"]}>
      <MessageForm />
    </div>
  </>
);

const HOCBody = withChatRoomInfoComponent(Body, () => <div className={styles["no-room-body"]}>방을 생성하거나 참여해주세요!</div>);

function MainPanel() {
  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["header"]}>
          <MessagesHeader />
        </div>
        <div className={styles["body"]}>
          <HOCBody />
        </div>
        <div style={{ position: "absolute", width: "1px", height: "calc(100% + 1px)" }}></div>
      </div>
    </>
  );
}

export default MainPanel;
