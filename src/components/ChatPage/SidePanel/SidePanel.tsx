import "@styles/Chat/SidePanel/SidePanel.scss";
import ChatRooms from "./ChatRooms";
import Favorited from "./Favorited";
import Logo from "./Logo";

function SidePanel() {
  return (
    <div id="menuToggle">
    <input type="checkbox" />
    <div className="hamburger">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <ul id="menu">
      <Favorited />
      <ChatRooms />
    </ul>
  </div>
  );
}

export default SidePanel;
