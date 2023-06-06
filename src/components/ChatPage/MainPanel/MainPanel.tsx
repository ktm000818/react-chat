import Messages from "./Message";
import MessageForm from "./MessageForm";
import MessagesHeader from "./MessageHeader";

function MainPanel() {
  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        padding: "2rem",
        height: "100vh",
        color: "black",
      }}
    >
      <MessagesHeader />
      <Messages />
      <MessageForm />
    </div>
  );
}

export default MainPanel;
