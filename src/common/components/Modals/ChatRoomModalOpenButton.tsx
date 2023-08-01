import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Props, addChatRoom } from "@/firebase-actions/chatroom/actions";
import { useRecoilValue } from "recoil";
import { sessionState } from "@/recoil/recoil-store/store";

function ChatRoomModalOpenButton() {
  const user = useRecoilValue(sessionState);
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClickAdd = async () => {
    if (!user || !user?.uid || !user?.displayName || !user?.photoURL) {
      return false;
    }
    const data: Props = {
      roomName: roomName,
      description: description,
      user: {
        uid: user.uid,
        name: user.displayName,
        image: user.photoURL,
      },
    };
    await addChatRoom(data);

    alert("채팅방 생성 완료!");
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{ padding: "0px 6px", marginLeft: "10px" }}>
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Chat Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Room Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Room Name" onChange={({ target }) => setRoomName(target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={6} type="text" placeholder="description" onChange={({ target }) => setDescription(target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClickAdd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChatRoomModalOpenButton;
