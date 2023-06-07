import ChatRooms from "./ChatRooms";
import Favorited from "./Favorited";
import UserPanel from "./UserPanel";

function SidePanel() {
  return (
    <div
      style={{
        backgroundColor: "#2c2c2c",
        padding: "2rem",
        minHeight: "100vh",
        minWidth: "250px",
        color: "white",
      }}
    >
      <div style={{ border: "1px solid black", margin: "10px" }}>App Name</div>
      <UserPanel />
      <Favorited />
      <ChatRooms />
    </div>
  );
}

export default SidePanel;
