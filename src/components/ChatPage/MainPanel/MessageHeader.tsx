import UserPanel from "./UserPanel";

function MessagesHeader() {
  return (
    <div
      style={{
        color: "white",
        background: "#252525",
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        height: "100%",
      }}
    >
      <div> Chat room Name </div>
      <UserPanel />
    </div>
  );
}

export default MessagesHeader;
