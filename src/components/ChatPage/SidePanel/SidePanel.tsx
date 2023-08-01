import ChatRooms from "./ChatRooms";
import Favorited from "./Favorited";

function SidePanel() {
  return (
    <>
      <div
        style={{
          backgroundColor: "#2c2c2c",
          padding: "2rem",
          minHeight: "100vh",
          minWidth: "250px",
          color: "white",
        }}
      >
        <div style={{ padding: "10px", backgroundColor: "#66ff00", fontSize: "2rem", textAlign: "center", marginBottom: "30px" }}>
          <span style={{ textShadow: "1px 1px black", fontWeight: "bold" }}>RELACKS</span>
        </div>
        {/* <UserPanel /> */}
        <Favorited />
        <ChatRooms />
      </div>
    </>
  );
}

export default SidePanel;
