import { useState } from "react";
import Button from "react-bootstrap/Button";
import ChatRoomAddingModal from "../Modals/ChatRoomAddingModal";

export default function ChatRoomModalOpenButton() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{ padding: "0px 6px", marginLeft: "10px" }}>
        +
      </Button>
      <ChatRoomAddingModal show={show} close={handleClose} />
    </>
  );
}
